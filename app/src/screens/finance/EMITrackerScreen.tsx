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
import { emiAPI } from '../../api';
import {
  Card,
  Row,
  StatusBadge,
  Button,
  Input,
  EmptyState,
  LoadingSpinner,
  SortButton,
  RowActions,
} from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';

const CATEGORIES = [
  { value: 'equipment', label: 'Equipment & Hardware' },
  { value: 'vehicle', label: 'Vehicle' },
  { value: 'software', label: 'Software / Device' },
  { value: 'office', label: 'Office / Property' },
  { value: 'camera', label: 'Camera & Gear' },
  { value: 'other', label: 'Other' },
];

const PAYMENT_METHODS = [
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'upi', label: 'UPI' },
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'debit_card', label: 'Debit Card' },
  { value: 'auto_debit', label: 'Auto Debit / ECS' },
  { value: 'cheque', label: 'Cheque' },
];

const EMPTY_FORM = {
  itemName: '',
  category: 'equipment',
  vendor: '',
  totalAmount: '',
  downPayment: '',
  emiAmount: '',
  totalMonths: '',
  interestRate: '',
  startDate: '',
  paymentMethod: 'bank_transfer',
  note: '',
};

const SORT_OPTIONS = [
  { label: 'Item A-Z', value: 'name' },
  { label: 'EMI high-low', value: 'emi' },
  { label: 'Months remaining', value: 'months' },
];

const EMITrackerScreen = () => {
  const qc = useQueryClient();
  const [sort, setSort] = useState('name');
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: emis = [], isLoading } = useQuery({
    queryKey: ['emi'],
    queryFn: () => emiAPI.getAll().then(r => r.data),
  });

  const addMutation = useMutation({
    mutationFn: (data: any) => emiAPI.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['emi'] });
      closeForm();
    },
    onError: () => Alert.alert('Error', 'Failed to add EMI'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      emiAPI.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['emi'] });
      closeForm();
    },
    onError: () => Alert.alert('Error', 'Failed to update EMI'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => emiAPI.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['emi'] }),
  });

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setShowAdd(true);
  };

  const openEdit = (item: any) => {
    setEditing(item);
    setForm({
      itemName: item.itemName || '',
      category: item.category || 'equipment',
      vendor: item.vendor || '',
      totalAmount: String(item.totalAmount ?? ''),
      downPayment: String(item.downPayment ?? ''),
      emiAmount: String(item.emiAmount ?? ''),
      totalMonths: String(item.totalMonths ?? ''),
      interestRate: String(item.interestRate ?? ''),
      startDate: item.startDate || '',
      paymentMethod: item.paymentMethod || 'bank_transfer',
      note: item.note || '',
    });
    setShowAdd(true);
  };

  const closeForm = () => {
    setShowAdd(false);
    setEditing(null);
    setForm(EMPTY_FORM);
  };

  const confirmDelete = (item: any) => {
    Alert.alert('Delete EMI', `Remove EMI record for "${item.itemName}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteMutation.mutate(item._id),
      },
    ]);
  };

  const handleSubmit = () => {
    if (!form.itemName.trim() || !form.emiAmount) {
      Alert.alert('Error', 'Item name and EMI amount required');
      return;
    }
    const data = {
      ...form,
      totalAmount: Number(form.totalAmount),
      downPayment: Number(form.downPayment || 0),
      emiAmount: Number(form.emiAmount),
      totalMonths: Number(form.totalMonths),
      interestRate: Number(form.interestRate || 0),
    };
    if (editing) {
      updateMutation.mutate({ id: editing._id, data });
    } else {
      addMutation.mutate(data);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  const monthsRemaining = (e: any) =>
    Math.max(0, Number(e.totalMonths || 0) - Number(e.paidMonths || 0));

  const items = [...(Array.isArray(emis) ? emis : [])].sort((a: any, b: any) => {
    if (sort === 'emi') return (b.emiAmount || 0) - (a.emiAmount || 0);
    if (sort === 'months') return monthsRemaining(a) - monthsRemaining(b);
    return (a.itemName || '').localeCompare(b.itemName || '');
  });
  const totalEMI = items.reduce(
    (s: number, e: any) => s + (e.emiAmount || 0),
    0,
  );
  const saving = addMutation.isPending || updateMutation.isPending;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>MONTHLY EMI OUTFLOW</Text>
          <Text style={styles.summaryValue}>
            ₹{totalEMI.toLocaleString('en-IN')}
          </Text>
          <Text style={styles.summaryNote}>{items.length} active loans</Text>
        </Card>

        <Row
          justify="space-between"
          align="center"
          style={{ marginBottom: Spacing.sm }}
        >
          <Text style={styles.count}>{items.length} EMI RECORDS</Text>
          <Row gap={8} align="center">
            <SortButton options={SORT_OPTIONS} value={sort} onChange={setSort} />
            <TouchableOpacity style={styles.addBtn} onPress={openCreate}>
              <Text style={styles.addBtnText}>+ ADD</Text>
            </TouchableOpacity>
          </Row>
        </Row>

        <FlatList
          style={{ flex: 1 }}
          data={items}
          keyExtractor={(item, i) => String(item._id || i)}
          ListEmptyComponent={
            <EmptyState
              title="No EMI Records"
              subtitle="Track all your EMI payments"
              action={{ label: '+ Add EMI', onPress: openCreate }}
            />
          }
          renderItem={({ item }) => (
            <Card
              style={[
                styles.card,
                { borderLeftColor: Colors.warning, borderLeftWidth: 4 },
              ]}
              shadow="sm"
            >
              <Row justify="space-between" align="flex-start">
                <View style={styles.left}>
                  <Text style={styles.lenderName}>{item.itemName}</Text>
                  {item.vendor ? (
                    <Text style={styles.remaining}>{item.vendor}</Text>
                  ) : null}
                  {item.totalAmount ? (
                    <Text style={styles.totalAmount}>
                      Total: ₹{Number(item.totalAmount).toLocaleString('en-IN')}
                    </Text>
                  ) : null}
                  {item.totalMonths ? (
                    <Text style={styles.remaining}>
                      {monthsRemaining(item)} of {item.totalMonths} months remaining
                    </Text>
                  ) : null}
                  {item.startDate ? (
                    <Text style={styles.dueDate}>Started: {item.startDate}</Text>
                  ) : null}
                  {item.note ? (
                    <Text style={styles.notes}>{item.note}</Text>
                  ) : null}
                </View>
                <View style={styles.right}>
                  <Text style={styles.emiAmount}>
                    ₹{(item.emiAmount || 0).toLocaleString('en-IN')}
                  </Text>
                  <Text style={styles.emiLabel}>/month</Text>
                </View>
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
              {editing ? 'EDIT EMI' : 'ADD EMI'}
            </Text>
            <TouchableOpacity onPress={closeForm}>
              <Text style={styles.modalClose}>✕ CANCEL</Text>
            </TouchableOpacity>
          </Row>
          <ScrollView style={styles.modalContent} contentContainerStyle={{ paddingBottom: 40 }}>
            <Input
              label="ITEM NAME *"
              value={form.itemName}
              onChangeText={v => setForm(p => ({ ...p, itemName: v }))}
              placeholder="e.g. Sony A7 IV Camera"
            />
            <Input
              label="VENDOR / LENDER"
              value={form.vendor}
              onChangeText={v => setForm(p => ({ ...p, vendor: v }))}
              placeholder="e.g. HDFC Bank"
            />
            <Input
              label="TOTAL AMOUNT (₹)"
              value={form.totalAmount}
              onChangeText={v => setForm(p => ({ ...p, totalAmount: v }))}
              keyboardType="numeric"
            />
            <Input
              label="DOWN PAYMENT (₹)"
              value={form.downPayment}
              onChangeText={v => setForm(p => ({ ...p, downPayment: v }))}
              keyboardType="numeric"
            />
            <Input
              label="EMI AMOUNT (₹/month) *"
              value={form.emiAmount}
              onChangeText={v => setForm(p => ({ ...p, emiAmount: v }))}
              keyboardType="numeric"
            />
            <Input
              label="TENURE (TOTAL MONTHS)"
              value={form.totalMonths}
              onChangeText={v => setForm(p => ({ ...p, totalMonths: v }))}
              keyboardType="numeric"
            />
            <Input
              label="INTEREST RATE (%)"
              value={form.interestRate}
              onChangeText={v => setForm(p => ({ ...p, interestRate: v }))}
              keyboardType="numeric"
            />
            <Input
              label="START DATE (YYYY-MM-DD)"
              value={form.startDate}
              onChangeText={v => setForm(p => ({ ...p, startDate: v }))}
              placeholder="2025-02-01"
            />
            <Input
              label="NOTES"
              value={form.note}
              onChangeText={v => setForm(p => ({ ...p, note: v }))}
              placeholder="Loan details..."
            />
            <Text style={styles.pickLabel}>CATEGORY</Text>
            <View style={styles.catGrid}>
              {CATEGORIES.map(c => (
                <TouchableOpacity
                  key={c.value}
                  style={[
                    styles.catChip,
                    form.category === c.value && styles.catChipActive,
                  ]}
                  onPress={() => setForm(p => ({ ...p, category: c.value }))}
                >
                  <Text
                    style={[
                      styles.catChipText,
                      form.category === c.value && styles.catChipTextActive,
                    ]}
                  >
                    {c.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.pickLabel}>PAYMENT METHOD</Text>
            <View style={styles.catGrid}>
              {PAYMENT_METHODS.map(m => (
                <TouchableOpacity
                  key={m.value}
                  style={[
                    styles.catChip,
                    form.paymentMethod === m.value && styles.catChipActive,
                  ]}
                  onPress={() => setForm(p => ({ ...p, paymentMethod: m.value }))}
                >
                  <Text
                    style={[
                      styles.catChipText,
                      form.paymentMethod === m.value && styles.catChipTextActive,
                    ]}
                  >
                    {m.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Button
              label={saving ? 'SAVING...' : editing ? 'SAVE CHANGES' : 'ADD EMI'}
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
    marginBottom: Spacing.base,
    padding: Spacing.md,
    backgroundColor: Colors.warning,
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
  summaryNote: {
    fontSize: Typography.sm,
    color: Colors.white,
    opacity: 0.8,
    fontWeight: Typography.medium,
    marginTop: 2,
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
  right: { alignItems: 'flex-end' },
  lenderName: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  totalAmount: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 2,
  },
  remaining: {
    fontSize: Typography.sm,
    color: Colors.primary,
    fontWeight: Typography.bold,
    marginTop: 2,
  },
  dueDate: {
    fontSize: Typography.sm,
    color: Colors.secondary,
    fontWeight: Typography.bold,
    marginTop: 1,
  },
  notes: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 2,
  },
  emiAmount: {
    fontSize: Typography.xl,
    fontWeight: Typography.black,
    color: Colors.warning,
  },
  emiLabel: {
    fontSize: Typography.xs,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
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
  catGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: Spacing.base,
  },
  catChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: Border.width,
    borderColor: Colors.border,
  },
  catChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  catChipText: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.foreground,
  },
  catChipTextActive: { color: Colors.white },
});

export default EMITrackerScreen;
