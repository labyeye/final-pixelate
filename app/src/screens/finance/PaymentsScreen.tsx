import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentsAPI, invoicesAPI } from '../../api';
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
import { format } from 'date-fns';

const MODES = ['Bank Transfer', 'UPI', 'Cash', 'Cheque', 'Card'];

const MODE_FILTERS = [
  { label: 'All', value: 'all' },
  ...MODES.map(m => ({ label: m, value: m })),
];

const SORT_OPTIONS = [
  { label: 'Newest first', value: 'newest' },
  { label: 'Amount high-low', value: 'amount' },
  { label: 'Client A-Z', value: 'client' },
];

const EMPTY_FORM = {
  clientName: '',
  invoiceId: '',
  amount: '',
  mode: 'Bank Transfer',
  date: '',
  remarks: '',
};

const PaymentsScreen = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [modeFilter, setModeFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payments'],
    queryFn: () => paymentsAPI.getAll().then(r => r.data),
  });

  const { data: invoices = [] } = useQuery({
    queryKey: ['invoices-lookup'],
    queryFn: () => invoicesAPI.getAll().then(r => r.data),
  });

  const addMutation = useMutation({
    mutationFn: (data: any) => paymentsAPI.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['payments'] });
      closeForm();
    },
    onError: () => Alert.alert('Error', 'Failed to add payment'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      paymentsAPI.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['payments'] });
      closeForm();
    },
    onError: () => Alert.alert('Error', 'Failed to update payment'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => paymentsAPI.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['payments'] }),
  });

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setShowAdd(true);
  };

  const openEdit = (item: any) => {
    setEditing(item);
    setForm({
      clientName: item.clientName || '',
      invoiceId: item.invoiceId || '',
      amount: String(item.amount ?? ''),
      mode: item.mode || 'Bank Transfer',
      date: item.date || '',
      remarks: item.remarks || item.notes || '',
    });
    setShowAdd(true);
  };

  const closeForm = () => {
    setShowAdd(false);
    setEditing(null);
    setForm(EMPTY_FORM);
  };

  const confirmDelete = (item: any) => {
    Alert.alert('Delete Payment', `Remove payment from "${item.clientName}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteMutation.mutate(item._id),
      },
    ]);
  };

  const handleSubmit = () => {
    if (!form.clientName.trim() || !form.amount) {
      Alert.alert('Error', 'Client and amount required');
      return;
    }
    const data = { ...form, amount: Number(form.amount) };
    if (editing) {
      updateMutation.mutate({ id: editing._id, data });
    } else {
      addMutation.mutate(data);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  let filtered = Array.isArray(payments)
    ? payments.filter(
        (p: any) =>
          (!search ||
            p.clientName?.toLowerCase().includes(search.toLowerCase())) &&
          (modeFilter === 'all' || p.mode === modeFilter),
      )
    : [];

  filtered = [...filtered].sort((a: any, b: any) => {
    if (sort === 'client')
      return (a.clientName || '').localeCompare(b.clientName || '');
    if (sort === 'amount') return (b.amount || 0) - (a.amount || 0);
    const da = new Date(a.date || a.createdAt || 0).getTime();
    const db = new Date(b.date || b.createdAt || 0).getTime();
    return db - da;
  });

  const total = filtered.reduce((s: number, p: any) => s + (p.amount || 0), 0);
  const saving = addMutation.isPending || updateMutation.isPending;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>TOTAL RECEIVED</Text>
          <Text style={styles.summaryValue}>
            ₹{total.toLocaleString('en-IN')}
          </Text>
        </Card>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search payments..."
        />
        <FilterChips
          options={MODE_FILTERS}
          value={modeFilter}
          onChange={setModeFilter}
        />
        <Row
          justify="space-between"
          align="center"
          style={{ marginBottom: Spacing.sm }}
        >
          <Text style={styles.count}>{filtered.length} PAYMENTS</Text>
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
          keyExtractor={(item, i) => String(item._id || i)}
          ListEmptyComponent={
            <EmptyState
              title="No Payments"
              subtitle="Record incoming payments"
              action={{ label: '+ Add Payment', onPress: openCreate }}
            />
          }
          renderItem={({ item }) => (
            <Card
              style={[
                styles.card,
                { borderLeftColor: Colors.success, borderLeftWidth: 4 },
              ]}
              shadow="sm"
            >
              <Row justify="space-between" align="flex-start">
                <View style={styles.left}>
                  <Text style={styles.clientName}>{item.clientName}</Text>
                  {item.mode ? (
                    <Text style={styles.mode}>via {item.mode}</Text>
                  ) : null}
                  {item.date || item.createdAt ? (
                    <Text style={styles.date}>
                      {format(
                        new Date(item.date || item.createdAt),
                        'dd MMM yyyy',
                      )}
                    </Text>
                  ) : null}
                  {item.remarks || item.notes ? (
                    <Text style={styles.notes}>{item.remarks || item.notes}</Text>
                  ) : null}
                </View>
                <Text style={styles.amount}>
                  ₹{(item.amount || 0).toLocaleString('en-IN')}
                </Text>
              </Row>
              <Row justify="flex-end" style={{ marginTop: Spacing.sm }}>
                <RowActions
                  onEdit={() => openEdit(item)}
                  onDelete={() => confirmDelete(item)}
                />
              </Row>
            </Card>
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
              {editing ? 'EDIT PAYMENT' : 'ADD PAYMENT'}
            </Text>
            <TouchableOpacity onPress={closeForm}>
              <Text style={styles.modalClose}>✕ CANCEL</Text>
            </TouchableOpacity>
          </Row>
          <ScrollView style={styles.modalContent} contentContainerStyle={{ paddingBottom: 40 }}>
            <Input
              label="CLIENT NAME *"
              value={form.clientName}
              onChangeText={v => setForm(p => ({ ...p, clientName: v }))}
              placeholder="Client name"
            />
            <Input
              label="AMOUNT (₹) *"
              value={form.amount}
              onChangeText={v => setForm(p => ({ ...p, amount: v }))}
              keyboardType="numeric"
            />
            <Input
              label="DATE (YYYY-MM-DD)"
              value={form.date}
              onChangeText={v => setForm(p => ({ ...p, date: v }))}
              placeholder="2025-02-01"
            />
            <Input
              label="NOTES"
              value={form.remarks}
              onChangeText={v => setForm(p => ({ ...p, remarks: v }))}
              placeholder="Payment reference..."
            />
            <Text style={styles.pickLabel}>LINK TO INVOICE</Text>
            <View style={styles.modeRow}>
              {(Array.isArray(invoices) ? invoices : []).map((inv: any) => {
                const id = String(inv._id || inv.id);
                const label = `${inv.clientName || 'Client'}${
                  inv.invoiceNumber ? ` #${inv.invoiceNumber}` : ''
                }`;
                return (
                  <TouchableOpacity
                    key={id}
                    style={[
                      styles.modeChip,
                      form.invoiceId === id && styles.modeChipActive,
                    ]}
                    onPress={() =>
                      setForm(p => ({
                        ...p,
                        invoiceId: p.invoiceId === id ? '' : id,
                        clientName: inv.clientName || p.clientName,
                      }))
                    }
                  >
                    <Text
                      style={[
                        styles.modeChipText,
                        form.invoiceId === id && styles.modeChipTextActive,
                      ]}
                    >
                      {label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text style={styles.pickLabel}>PAYMENT MODE</Text>
            <View style={styles.modeRow}>
              {MODES.map(m => (
                <TouchableOpacity
                  key={m}
                  style={[
                    styles.modeChip,
                    form.mode === m && styles.modeChipActive,
                  ]}
                  onPress={() => setForm(p => ({ ...p, mode: m }))}
                >
                  <Text
                    style={[
                      styles.modeChipText,
                      form.mode === m && styles.modeChipTextActive,
                    ]}
                  >
                    {m}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Button
              label={saving ? 'SAVING...' : editing ? 'SAVE CHANGES' : 'ADD PAYMENT'}
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
  summaryCard: {
    marginBottom: Spacing.sm,
    padding: Spacing.md,
    backgroundColor: Colors.success,
    borderColor: Colors.black,
  },
  summaryLabel: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.white,
    opacity: 0.8,
    letterSpacing: 1,
  },
  summaryValue: {
    fontSize: Typography['3xl'],
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: -1,
    marginTop: 4,
  },
  count: {
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
  left: { flex: 1 },
  clientName: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  mode: {
    fontSize: Typography.sm,
    color: Colors.accent,
    fontWeight: Typography.bold,
    marginTop: 2,
  },
  date: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 1,
  },
  notes: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 2,
  },
  amount: {
    fontSize: Typography.xl,
    fontWeight: Typography.black,
    color: Colors.success,
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
  },
  modeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: Spacing.base,
  },
  modeChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: Border.width,
    borderColor: Colors.border,
  },
  modeChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  modeChipText: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.foreground,
  },
  modeChipTextActive: { color: Colors.white },
});

export default PaymentsScreen;
