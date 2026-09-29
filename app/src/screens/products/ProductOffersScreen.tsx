import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  Alert,
  Switch,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react-native';
import { productsAPI } from '../../api';
import { useAuth } from '../../context/AuthContext';
import {
  Card,
  Row,
  StatCard,
  StatusBadge,
  FilterChips,
  RowActions,
  Input,
  Button,
  EmptyState,
  LoadingSpinner,
} from '../../components/common';
import { Colors, Typography, Spacing } from '../../theme';
import { MoreStackParams } from '../../navigation/types';
import { fmtDate, apiError } from './shared';

type DiscountType = 'bonus_months' | 'flat_rate' | 'percent_off';

const offerStatus = (o: any) => {
  if (!o.isActive) return 'inactive';
  if (o.expiresAt && new Date(o.expiresAt) < new Date()) return 'expired';
  if (o.usedCount >= o.maxUses) return 'exhausted';
  return 'active';
};

const offerValue = (o: any) => {
  if (o.discountType === 'flat_rate') return `₹${o.flatRate ?? 0}/student`;
  if (o.discountType === 'percent_off') return `${o.percentOff ?? 0}% off`;
  return `+${o.bonusMonths ?? 0} bonus month(s)`;
};

const emptyForm = {
  code: '',
  description: '',
  discountType: 'bonus_months' as DiscountType,
  bonusMonths: '1',
  flatRate: '',
  percentOff: '',
  maxUses: '100',
  expiresAt: '',
  isActive: true,
};

// Offer codes for Nest HR / Nest Leads (bonus months, editable, usage log) and
// coupons for Nest Play (bonus months / flat rate / percent off, toggle only).
const ProductOffersScreen = () => {
  const { product } =
    useRoute<RouteProp<MoreStackParams, 'ProductOffers'>>().params;
  const isPlay = product === 'play';
  const { user } = useAuth();
  const qc = useQueryClient();
  const key = ['product-offers', product];

  const [editing, setEditing] = useState<any | null>(null); // {} = new
  const [form, setForm] = useState(emptyForm);
  const [usagesFor, setUsagesFor] = useState<any | null>(null);
  const set = (k: keyof typeof emptyForm, v: any) =>
    setForm(f => ({ ...f, [k]: v }));

  const { data: offers = [], isLoading, isRefetching, refetch } = useQuery({
    queryKey: key,
    queryFn: () =>
      productsAPI
        .getOffers(product)
        .then(r => (isPlay ? r.data?.data : r.data?.offers) ?? []),
  });

  const { data: usages = [], isLoading: usagesLoading } = useQuery({
    queryKey: ['offer-usages', product, usagesFor?._id],
    enabled: !!usagesFor,
    queryFn: () =>
      productsAPI
        .getOffer(product, usagesFor._id)
        .then(r => r.data?.offer?.usages ?? r.data?.usages ?? []),
  });

  const onError = (e: any) => Alert.alert('Error', apiError(e, 'Request failed'));
  const refresh = () => qc.invalidateQueries({ queryKey: key });

  const save = useMutation({
    mutationFn: () => {
      const expiresAt = form.expiresAt
        ? new Date(form.expiresAt).toISOString()
        : undefined;
      if (editing?._id) {
        return productsAPI.updateOffer(product, editing._id, {
          description: form.description,
          bonusMonths: Number(form.bonusMonths),
          maxUses: Number(form.maxUses),
          isActive: form.isActive,
          ...(expiresAt ? { expiresAt } : {}),
        });
      }
      const body: Record<string, any> = {
        code: form.code.trim().toUpperCase(),
        description: form.description || undefined,
        maxUses: Number(form.maxUses),
        expiresAt,
      };
      if (isPlay) {
        body.discountType = form.discountType;
        if (form.discountType === 'bonus_months') body.bonusMonths = Number(form.bonusMonths);
        if (form.discountType === 'flat_rate') body.flatRate = Number(form.flatRate);
        if (form.discountType === 'percent_off') body.percentOff = Number(form.percentOff);
      } else {
        body.bonusMonths = Number(form.bonusMonths);
        body.createdByEmail = user?.email;
      }
      return productsAPI.createOffer(product, body);
    },
    onSuccess: () => {
      refresh();
      setEditing(null);
    },
    onError,
  });

  const toggle = useMutation({
    mutationFn: (o: any) =>
      productsAPI.updateOffer(product, o._id, { isActive: !o.isActive }),
    onSuccess: refresh,
    onError,
  });

  const remove = useMutation({
    mutationFn: (id: string) => productsAPI.deleteOffer(product, id),
    onSuccess: refresh,
    onError,
  });

  const openForm = (o?: any) => {
    setForm(
      o
        ? {
            ...emptyForm,
            code: o.code,
            description: o.description ?? '',
            bonusMonths: String(o.bonusMonths ?? 1),
            maxUses: String(o.maxUses ?? 100),
            expiresAt: o.expiresAt ? o.expiresAt.slice(0, 10) : '',
            isActive: o.isActive,
          }
        : { ...emptyForm, maxUses: isPlay ? '200' : '100' },
    );
    setEditing(o ?? {});
  };

  const submit = () => {
    if (!editing?._id && !form.code.trim()) {
      return Alert.alert('Code required', 'Enter an offer code.');
    }
    if (form.expiresAt && isNaN(new Date(form.expiresAt).getTime())) {
      return Alert.alert('Invalid date', 'Use the format YYYY-MM-DD.');
    }
    save.mutate();
  };

  const confirmDelete = (o: any) =>
    Alert.alert('Delete offer', `Delete ${o.code}? This cannot be undone.`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => remove.mutate(o._id) },
    ]);

  if (isLoading) return <LoadingSpinner />;

  const activeCount = offers.filter((o: any) => offerStatus(o) === 'active').length;
  const used = offers.reduce((s: number, o: any) => s + (o.usedCount ?? 0), 0);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <FlatList
        data={offers}
        keyExtractor={o => o._id}
        contentContainerStyle={styles.content}
        refreshing={isRefetching}
        onRefresh={refetch}
        ListHeaderComponent={
          <>
            <View style={styles.grid}>
              <StatCard label={isPlay ? 'Coupons' : 'Offers'} value={offers.length} />
              <StatCard label="Active" value={activeCount} />
              <StatCard label="Redemptions" value={used} />
            </View>
            <Button
              label={isPlay ? '+ New coupon' : '+ New offer code'}
              onPress={() => openForm()}
              style={styles.addBtn}
            />
          </>
        }
        ListEmptyComponent={
          <EmptyState title="No offer codes yet" subtitle="Create one to get started" />
        }
        renderItem={({ item: o }) => (
          <Card
            style={styles.card}
            shadow="sm"
            onPress={isPlay ? undefined : () => setUsagesFor(o)}
          >
            <Row justify="space-between" align="flex-start">
              <View style={{ flex: 1 }}>
                <Row gap={8}>
                  <Text style={styles.code}>{o.code}</Text>
                  <StatusBadge status={offerStatus(o)} />
                </Row>
                {o.description ? <Text style={styles.desc}>{o.description}</Text> : null}
              </View>
              <Switch
                value={!!o.isActive}
                onValueChange={() => toggle.mutate(o)}
                trackColor={{ true: Colors.primary, false: Colors.gray300 }}
                thumbColor={Colors.white}
              />
            </Row>
            <Row justify="space-between" style={{ marginTop: Spacing.sm }}>
              <Text style={styles.meta}>
                {offerValue(o)} · {o.usedCount ?? 0}/{o.maxUses} used
                {o.expiresAt ? ` · Expires ${fmtDate(o.expiresAt)}` : ''}
              </Text>
              {!isPlay && (
                <RowActions onEdit={() => openForm(o)} onDelete={() => confirmDelete(o)} />
              )}
            </Row>
          </Card>
        )}
      />

      {/* Create / edit */}
      <Modal visible={!!editing} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <Row justify="space-between" style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {editing?._id ? `Edit ${editing.code}` : isPlay ? 'New coupon' : 'New offer code'}
            </Text>
            <TouchableOpacity onPress={() => setEditing(null)} hitSlop={10}>
              <X size={20} color={Colors.foreground} />
            </TouchableOpacity>
          </Row>
          <ScrollView contentContainerStyle={styles.modalContent} keyboardShouldPersistTaps="handled">
            {!editing?._id && (
              <Input
                label="Code *"
                value={form.code}
                onChangeText={v => set('code', v.toUpperCase())}
                autoCapitalize="characters"
                placeholder="LAUNCH50"
              />
            )}
            <Input
              label="Description"
              value={form.description}
              onChangeText={v => set('description', v)}
              placeholder="What this offer gives"
              multiline
            />
            {isPlay && !editing?._id && (
              <>
                <Text style={styles.label}>Discount type</Text>
                <FilterChips
                  value={form.discountType}
                  onChange={v => set('discountType', v)}
                  options={[
                    { label: 'Bonus months', value: 'bonus_months' },
                    { label: 'Flat rate', value: 'flat_rate' },
                    { label: 'Percent off', value: 'percent_off' },
                  ]}
                  style={{ marginBottom: Spacing.md }}
                />
              </>
            )}
            {(!isPlay || form.discountType === 'bonus_months') && (
              <Input label="Bonus months" value={form.bonusMonths} onChangeText={v => set('bonusMonths', v)} keyboardType="number-pad" />
            )}
            {isPlay && form.discountType === 'flat_rate' && (
              <Input label="Flat rate (₹ per student)" value={form.flatRate} onChangeText={v => set('flatRate', v)} keyboardType="number-pad" />
            )}
            {isPlay && form.discountType === 'percent_off' && (
              <Input label="Percent off" value={form.percentOff} onChangeText={v => set('percentOff', v)} keyboardType="number-pad" />
            )}
            <Input label="Max uses" value={form.maxUses} onChangeText={v => set('maxUses', v)} keyboardType="number-pad" />
            <Input
              label="Expires on (optional)"
              value={form.expiresAt}
              onChangeText={v => set('expiresAt', v)}
              placeholder="YYYY-MM-DD"
            />
            {editing?._id && (
              <Row justify="space-between" style={{ marginBottom: Spacing.md }}>
                <Text style={styles.label}>Active</Text>
                <Switch
                  value={form.isActive}
                  onValueChange={v => set('isActive', v)}
                  trackColor={{ true: Colors.primary, false: Colors.gray300 }}
                  thumbColor={Colors.white}
                />
              </Row>
            )}
            <Button
              label={editing?._id ? 'Save changes' : 'Create'}
              onPress={submit}
              loading={save.isPending}
              fullWidth
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Usage log (HR / Leads only) */}
      <Modal visible={!!usagesFor} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <Row justify="space-between" style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Usages · {usagesFor?.code}</Text>
            <TouchableOpacity onPress={() => setUsagesFor(null)} hitSlop={10}>
              <X size={20} color={Colors.foreground} />
            </TouchableOpacity>
          </Row>
          {usagesLoading ? (
            <LoadingSpinner />
          ) : (
            <FlatList
              data={usages}
              keyExtractor={(_, i) => String(i)}
              contentContainerStyle={styles.modalContent}
              ListEmptyComponent={<EmptyState title="No usages yet" />}
              renderItem={({ item: u }) => (
                <Card style={styles.card}>
                  <Text style={styles.code}>{u.companyName ?? u.tenantName}</Text>
                  <Text style={styles.meta}>{u.userEmail}</Text>
                  <Text style={styles.meta}>
                    {u.invoiceNumber} · {fmtDate(u.usedAt)}
                  </Text>
                </Card>
              )}
            />
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  addBtn: { marginVertical: Spacing.base },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  code: {
    fontSize: Typography.base,
    fontWeight: Typography.bold,
    color: Colors.foreground,
    letterSpacing: 0.3,
  },
  desc: { fontSize: Typography.sm, color: Colors.gray700, marginTop: 4 },
  meta: { fontSize: Typography.sm, color: Colors.mutedForeground, flexShrink: 1 },
  label: {
    fontSize: Typography.sm,
    fontWeight: Typography.semiBold,
    color: Colors.foreground,
    marginBottom: 6,
  },
  modal: { flex: 1, backgroundColor: Colors.background },
  modalHeader: {
    padding: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.card,
  },
  modalTitle: {
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    color: Colors.foreground,
  },
  modalContent: { padding: Spacing.base },
});

export default ProductOffersScreen;
