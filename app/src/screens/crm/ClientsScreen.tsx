import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clientsAPI } from '../../api';
import {
  Card,
  Row,
  SearchBar,
  Button,
  Input,
  EmptyState,
  LoadingSpinner,
  FilterChips,
  SortButton,
  RowActions,
} from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';
import { CRMStackParams } from '../../navigation/types';

type Nav = NativeStackNavigationProp<CRMStackParams>;

const CITY_ALL = { label: 'All', value: 'all' };
const SORT_OPTIONS = [
  { label: 'Newest first', value: 'newest' },
  { label: 'Name A-Z', value: 'name' },
];
const PRODUCTS = [
  { label: 'None', value: 'none' },
  { label: 'Nest HR', value: 'nesthr' },
  { label: 'Nest Leads', value: 'nestleads' },
  { label: 'Nest Sports', value: 'nestsports' },
];

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pin: '',
  hasGst: false,
  gstCompanyName: '',
  gstNumber: '',
  gstAddress: '',
  loginEmail: '',
  loginPassword: '',
  product: 'none',
  externalTenantId: '',
};

const ClientsScreen = () => {
  const navigation = useNavigation<Nav>();
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const {
    data: clients = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['clients'],
    queryFn: () => clientsAPI.getAll().then(r => r.data),
  });

  const addMutation = useMutation({
    mutationFn: (data: any) => clientsAPI.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['clients'] });
      closeForm();
    },
    onError: () => Alert.alert('Error', 'Failed to add client'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      clientsAPI.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['clients'] });
      closeForm();
    },
    onError: () => Alert.alert('Error', 'Failed to update client'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => clientsAPI.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['clients'] }),
  });

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setShowAdd(true);
  };

  const openEdit = (item: any) => {
    setEditing(item);
    setForm({
      name: item.name || '',
      email: item.email || '',
      phone: item.phone || '',
      address: item.address || '',
      city: item.city || '',
      state: item.state || '',
      pin: item.pin || '',
      hasGst: !!item.hasGst,
      gstCompanyName: item.gstCompanyName || '',
      gstNumber: item.gstNumber || '',
      gstAddress: item.gstAddress || '',
      loginEmail: item.loginEmail || '',
      loginPassword: '',
      product: item.product || 'none',
      externalTenantId: item.externalTenantId || '',
    });
    setShowAdd(true);
  };

  const closeForm = () => {
    setShowAdd(false);
    setEditing(null);
    setForm(EMPTY_FORM);
  };

  const confirmDelete = (item: any) => {
    Alert.alert('Delete Client', `Remove "${item.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () =>
          deleteMutation.mutate(String(item._id || item.id)),
      },
    ]);
  };

  const handleSubmit = () => {
    if (!form.name.trim()) {
      Alert.alert('Error', 'Name required');
      return;
    }
    const data: any = { ...form };
    if (editing && !data.loginPassword) delete data.loginPassword;
    if (editing) {
      updateMutation.mutate({ id: String(editing._id || editing.id), data });
    } else {
      addMutation.mutate(data);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const cityOptions = [
    CITY_ALL,
    ...Array.from(
      new Set(
        (Array.isArray(clients) ? clients : [])
          .map((c: any) => c.city)
          .filter(Boolean),
      ),
    ).map((c: any) => ({ label: c, value: c })),
  ];

  let filtered = Array.isArray(clients)
    ? clients.filter(
        (c: any) =>
          (!search ||
            c.name?.toLowerCase().includes(search.toLowerCase()) ||
            c.email?.toLowerCase().includes(search.toLowerCase()) ||
            c.phone?.includes(search)) &&
          (cityFilter === 'all' || c.city === cityFilter),
      )
    : [];

  filtered = [...filtered].sort((a: any, b: any) => {
    if (sort === 'name') return (a.name || '').localeCompare(b.name || '');
    const da = new Date(a.createdAt || 0).getTime();
    const db = new Date(b.createdAt || 0).getTime();
    return db - da;
  });

  const saving = addMutation.isPending || updateMutation.isPending;

  if (isLoading) return <LoadingSpinner />;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search clients..."
        />
        <FilterChips
          options={cityOptions}
          value={cityFilter}
          onChange={setCityFilter}
        />
        <Row
          justify="space-between"
          align="center"
          style={{ marginBottom: Spacing.sm }}
        >
          <Text style={styles.countLabel}>{filtered.length} CLIENTS</Text>
          <Row gap={8} align="center">
            <SortButton options={SORT_OPTIONS} value={sort} onChange={setSort} />
            <TouchableOpacity style={styles.addBtn} onPress={openCreate}>
              <Text style={styles.addBtnText}>+ ADD</Text>
            </TouchableOpacity>
          </Row>
        </Row>
        <FlatList
          style={{ flex: 1 }}
          data={filtered}
          keyExtractor={item => String(item._id || item.id)}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primary}
            />
          }
          ListEmptyComponent={
            <EmptyState
              title="No Clients"
              subtitle="Add your first client"
              action={{ label: '+ Add Client', onPress: openCreate }}
            />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ClientDetail', {
                  id: String(item._id || item.id),
                })
              }
              activeOpacity={0.85}
            >
              <Card style={styles.card} shadow="sm">
                <Row align="center" gap={Spacing.md}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {(item.name || 'C').charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.clientName}>{item.name}</Text>
                    {item.email ? (
                      <Text style={styles.clientEmail}>{item.email}</Text>
                    ) : null}
                    {item.phone ? (
                      <Text style={styles.clientPhone}>{item.phone}</Text>
                    ) : null}
                    {item.city ? (
                      <Text style={styles.clientCity}>{item.city}</Text>
                    ) : null}
                  </View>
                  {item.hasGst ? (
                    <View style={styles.gstBadge}>
                      <Text style={styles.gstText}>GST</Text>
                    </View>
                  ) : null}
                  <RowActions
                    onEdit={() => openEdit(item)}
                    onDelete={() => confirmDelete(item)}
                  />
                </Row>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>

      <Modal
        visible={showAdd}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modal}>
          <Row
            justify="space-between"
            align="center"
            style={styles.modalHeader}
          >
            <Text style={styles.modalTitle}>
              {editing ? 'EDIT CLIENT' : 'ADD CLIENT'}
            </Text>
            <TouchableOpacity onPress={closeForm}>
              <Text style={styles.modalClose}>✕ CANCEL</Text>
            </TouchableOpacity>
          </Row>
          <ScrollView style={styles.modalContent} contentContainerStyle={{ paddingBottom: Spacing.xl }}>
            <Input
              label="NAME *"
              value={form.name}
              onChangeText={v => setForm(p => ({ ...p, name: v }))}
              placeholder="Client name"
            />
            <Input
              label="EMAIL"
              value={form.email}
              onChangeText={v => setForm(p => ({ ...p, email: v }))}
              placeholder="email@company.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="PHONE"
              value={form.phone}
              onChangeText={v => setForm(p => ({ ...p, phone: v }))}
              placeholder="+91 98765 43210"
              keyboardType="phone-pad"
            />
            <Input
              label="ADDRESS"
              value={form.address}
              onChangeText={v => setForm(p => ({ ...p, address: v }))}
              placeholder="Street address"
              multiline
            />
            <Input
              label="CITY"
              value={form.city}
              onChangeText={v => setForm(p => ({ ...p, city: v }))}
              placeholder="Mumbai"
            />
            <Input
              label="STATE"
              value={form.state}
              onChangeText={v => setForm(p => ({ ...p, state: v }))}
              placeholder="Maharashtra"
            />
            <Input
              label="PIN"
              value={form.pin}
              onChangeText={v => setForm(p => ({ ...p, pin: v }))}
              placeholder="400001"
              keyboardType="number-pad"
            />

            <Text style={styles.pickLabel}>PORTAL LOGIN</Text>
            <Input
              label="LOGIN EMAIL"
              value={form.loginEmail}
              onChangeText={v => setForm(p => ({ ...p, loginEmail: v }))}
              placeholder="client@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label={editing ? 'NEW PASSWORD (leave blank to keep existing)' : 'PASSWORD'}
              value={form.loginPassword}
              onChangeText={v => setForm(p => ({ ...p, loginPassword: v }))}
              placeholder="Min. 6 characters"
              autoCapitalize="none"
              secureTextEntry
            />

            <Text style={styles.pickLabel}>PRODUCT</Text>
            <View style={styles.platformRow}>
              {PRODUCTS.map(p => (
                <TouchableOpacity
                  key={p.value}
                  style={[
                    styles.platformChip,
                    form.product === p.value && styles.platformChipActive,
                  ]}
                  onPress={() => setForm(prev => ({ ...prev, product: p.value }))}
                >
                  <Text
                    style={[
                      styles.platformChipText,
                      form.product === p.value && styles.platformChipTextActive,
                    ]}
                  >
                    {p.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {form.product !== 'none' && (
              <Input
                label="TENANT / COMPANY ID"
                value={form.externalTenantId}
                onChangeText={v => setForm(p => ({ ...p, externalTenantId: v }))}
                placeholder="ID from the product's own database"
              />
            )}

            <Row justify="space-between" align="center" style={styles.gstToggleRow}>
              <Text style={styles.pickLabel}>HAS GST</Text>
              <TouchableOpacity
                style={[styles.toggle, form.hasGst && styles.toggleActive]}
                onPress={() => setForm(p => ({ ...p, hasGst: !p.hasGst }))}
              >
                <Text style={[styles.toggleText, form.hasGst && styles.toggleTextActive]}>
                  {form.hasGst ? 'YES' : 'NO'}
                </Text>
              </TouchableOpacity>
            </Row>
            {form.hasGst && (
              <>
                <Input
                  label="GST COMPANY NAME"
                  value={form.gstCompanyName}
                  onChangeText={v => setForm(p => ({ ...p, gstCompanyName: v }))}
                  placeholder="Company name on GST"
                />
                <Input
                  label="GST NUMBER"
                  value={form.gstNumber}
                  onChangeText={v => setForm(p => ({ ...p, gstNumber: v }))}
                  placeholder="22AAAAA0000A1Z5"
                  autoCapitalize="characters"
                />
                <Input
                  label="GST ADDRESS"
                  value={form.gstAddress}
                  onChangeText={v => setForm(p => ({ ...p, gstAddress: v }))}
                  placeholder="Registered GST address"
                />
              </>
            )}

            <Button
              label={saving ? 'SAVING...' : editing ? 'SAVE CHANGES' : 'ADD CLIENT'}
              onPress={handleSubmit}
              loading={saving}
              fullWidth
              size="lg"
              style={{ marginTop: Spacing.base }}
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.base, paddingBottom: 0 },
  countLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 0.5,
  },
  addBtn: {
    backgroundColor: Colors.secondary,
    borderWidth: Border.widthBold,
    borderColor: Colors.black,
    paddingHorizontal: 14,
    paddingVertical: 6,
    ...Shadows.sm,
  },
  addBtnText: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 0.5,
  },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  avatar: {
    width: 44,
    height: 44,
    backgroundColor: Colors.primary,
    borderWidth: Border.width,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: Typography.xl,
    fontWeight: Typography.black,
    color: Colors.white,
  },
  cardInfo: { flex: 1 },
  clientName: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  clientEmail: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 1,
  },
  clientPhone: {
    fontSize: Typography.sm,
    color: Colors.primary,
    fontWeight: Typography.bold,
    marginTop: 1,
  },
  clientCity: {
    fontSize: Typography.xs,
    color: Colors.gray500,
    fontWeight: Typography.medium,
    marginTop: 1,
  },
  gstBadge: {
    backgroundColor: Colors.success,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  gstText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.white,
  },
  modal: { flex: 1, backgroundColor: Colors.background },
  modalHeader: {
    padding: Spacing.base,
    borderBottomWidth: Border.widthBold,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: Typography['2xl'],
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: 1,
  },
  modalClose: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.destructive,
    letterSpacing: 0.5,
  },
  modalContent: { padding: Spacing.base },
  pickLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: 0.5,
    marginBottom: 8,
    marginTop: Spacing.sm,
  },
  platformRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: Spacing.base,
    flexWrap: 'wrap',
  },
  platformChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: Border.width,
    borderColor: Colors.border,
  },
  platformChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  platformChipText: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.foreground,
  },
  platformChipTextActive: { color: Colors.white },
  gstToggleRow: { marginTop: Spacing.sm, marginBottom: Spacing.sm },
  toggle: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: Border.width,
    borderColor: Colors.border,
  },
  toggleActive: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  toggleText: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  toggleTextActive: { color: Colors.white },
});

export default ClientsScreen;
