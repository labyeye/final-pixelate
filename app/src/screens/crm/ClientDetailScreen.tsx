import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clientsAPI } from '../../api';
import {
  Card,
  Row,
  Divider,
  LoadingSpinner,
  Button,
  Input,
} from '../../components/common';
import { Colors, Typography, Spacing, Border } from '../../theme';
import { CRMStackParams } from '../../navigation/types';

type Route = RouteProp<CRMStackParams, 'ClientDetail'>;

const Field = ({ label, value }: { label: string; value?: string }) =>
  value ? (
    <Row justify="space-between" style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </Row>
  ) : null;

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

const ClientDetailScreen = () => {
  const { params } = useRoute<Route>();
  const navigation = useNavigation<any>();
  const qc = useQueryClient();
  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: client, isLoading } = useQuery({
    queryKey: ['client', params.id],
    queryFn: () => clientsAPI.getById(params.id).then(r => r.data),
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => clientsAPI.update(params.id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['client', params.id] });
      qc.invalidateQueries({ queryKey: ['clients'] });
      setShowEdit(false);
    },
    onError: () => Alert.alert('Error', 'Failed to update client'),
  });

  const deleteMutation = useMutation({
    mutationFn: () => clientsAPI.delete(params.id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['clients'] });
      navigation.goBack();
    },
    onError: () => Alert.alert('Error', 'Failed to delete client'),
  });

  const openEdit = () => {
    setForm({
      name: client?.name || '',
      email: client?.email || '',
      phone: client?.phone || '',
      address: client?.address || '',
      city: client?.city || '',
      state: client?.state || '',
      pin: client?.pin || '',
      hasGst: !!client?.hasGst,
      gstCompanyName: client?.gstCompanyName || '',
      gstNumber: client?.gstNumber || '',
      gstAddress: client?.gstAddress || '',
      loginEmail: client?.loginEmail || '',
      loginPassword: '',
      product: client?.product || 'none',
      externalTenantId: client?.externalTenantId || '',
    });
    setShowEdit(true);
  };

  const confirmDelete = () => {
    Alert.alert('Delete Client', `Remove "${client?.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteMutation.mutate() },
    ]);
  };

  if (isLoading) return <LoadingSpinner />;
  if (!client)
    return (
      <View style={styles.center}>
        <Text>Client not found</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.heroCard} shadow="lg">
          <View style={styles.avatarBlock}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {(client.name || 'C').charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
          <Text style={styles.heroName}>{client.name}</Text>
          {client.email ? (
            <Text style={styles.heroEmail}>{client.email}</Text>
          ) : null}
          {client.phone ? (
            <Text style={styles.heroPhone}>{client.phone}</Text>
          ) : null}
        </Card>

        <Card style={styles.detailCard}>
          <Text style={styles.sectionTitle}>CONTACT DETAILS</Text>
          <Divider style={{ marginVertical: Spacing.sm }} />
          <Field label="City" value={client.city} />
          <Field label="State" value={client.state} />
          <Field label="PIN" value={client.pin} />
          <Field label="Address" value={client.address} />
        </Card>

        {client.hasGst && (
          <Card style={styles.detailCard}>
            <Text style={styles.sectionTitle}>GST INFORMATION</Text>
            <Divider style={{ marginVertical: Spacing.sm }} />
            <Field label="Company" value={client.gstCompanyName} />
            <Field label="GST No." value={client.gstNumber} />
            <Field label="GST Address" value={client.gstAddress} />
          </Card>
        )}

        {client.loginEmail && (
          <Card style={styles.detailCard}>
            <Text style={styles.sectionTitle}>PORTAL ACCESS</Text>
            <Divider style={{ marginVertical: Spacing.sm }} />
            <Field label="Login Email" value={client.loginEmail} />
            <Row>
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>PORTAL ACTIVE</Text>
              </View>
            </Row>
          </Card>
        )}

        <Row gap={Spacing.sm} style={{ marginTop: Spacing.sm }}>
          <Button
            label="EDIT CLIENT"
            variant="outline"
            onPress={openEdit}
            style={{ flex: 1 }}
          />
          <Button
            label="DELETE CLIENT"
            variant="destructive"
            onPress={confirmDelete}
            loading={deleteMutation.isPending}
            style={{ flex: 1 }}
          />
        </Row>
      </ScrollView>

      <Modal visible={showEdit} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <Row justify="space-between" align="center" style={styles.modalHeader}>
            <Text style={styles.modalTitle}>EDIT CLIENT</Text>
            <TouchableOpacity onPress={() => setShowEdit(false)}>
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
              label="NEW PASSWORD (leave blank to keep existing)"
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
              label={updateMutation.isPending ? 'SAVING...' : 'SAVE CHANGES'}
              onPress={() => {
                if (!form.name.trim()) {
                  Alert.alert('Error', 'Name required');
                  return;
                }
                const data: any = { ...form };
                if (!data.loginPassword) delete data.loginPassword;
                updateMutation.mutate(data);
              }}
              loading={updateMutation.isPending}
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
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { padding: Spacing.base, paddingBottom: 24 },
  heroCard: {
    padding: Spacing.xl,
    marginBottom: Spacing.sm,
    alignItems: 'center',
  },
  avatarBlock: { marginBottom: Spacing.md },
  avatar: {
    width: 72,
    height: 72,
    backgroundColor: Colors.primary,
    borderWidth: Border.widthBold,
    borderColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: Typography['4xl'],
    fontWeight: Typography.black,
    color: Colors.white,
  },
  heroName: {
    fontSize: Typography['2xl'],
    fontWeight: Typography.black,
    color: Colors.foreground,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  heroEmail: {
    fontSize: Typography.base,
    color: Colors.primary,
    fontWeight: Typography.bold,
    marginTop: 4,
    textAlign: 'center',
  },
  heroPhone: {
    fontSize: Typography.base,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 2,
    textAlign: 'center',
  },
  detailCard: { padding: Spacing.md, marginBottom: Spacing.sm },
  sectionTitle: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 1.5,
  },
  field: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  fieldLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.semiBold,
    color: Colors.mutedForeground,
  },
  fieldValue: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.foreground,
    flex: 1,
    textAlign: 'right',
  },
  activeBadge: {
    backgroundColor: Colors.success,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: Border.width,
    borderColor: Colors.border,
    marginTop: Spacing.sm,
  },
  activeBadgeText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 0.5,
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

export default ClientDetailScreen;
