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
import { expensesAPI } from '../../api';
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

const CATEGORIES = [
  { value: 'salary', label: 'Salary & Payroll' },
  { value: 'inventory', label: 'Inventory & Stock' },
  { value: 'office', label: 'Office & Rent' },
  { value: 'software', label: 'Software & Subscriptions' },
  { value: 'marketing', label: 'Marketing & Ads' },
  { value: 'utilities', label: 'Utilities & Bills' },
  { value: 'travel', label: 'Travel & Transport' },
  { value: 'equipment', label: 'Equipment & Hardware' },
  { value: 'freelancer', label: 'Freelancer & Contractor' },
  { value: 'legal', label: 'Legal & Compliance' },
  { value: 'food', label: 'Food & Entertainment' },
  { value: 'miscellaneous', label: 'Miscellaneous' },
];

const PAYMENT_METHODS = [
  { value: 'cash', label: 'Cash' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'upi', label: 'UPI' },
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'debit_card', label: 'Debit Card' },
  { value: 'cheque', label: 'Cheque' },
  { value: 'other', label: 'Other' },
];

const STATUSES = [
  { value: 'paid', label: 'Paid' },
  { value: 'pending', label: 'Pending' },
  { value: 'cancelled', label: 'Cancelled' },
];

const CATEGORY_FILTERS = [
  { label: 'All', value: 'all' },
  ...CATEGORIES.map(c => ({ label: c.label, value: c.value })),
];

const SORT_OPTIONS = [
  { label: 'Newest first', value: 'newest' },
  { label: 'Amount high-low', value: 'amount' },
  { label: 'Title A-Z', value: 'title' },
];

const EMPTY_FORM = {
  title: '',
  amount: '',
  category: 'office',
  paymentMethod: 'cash',
  status: 'paid',
  vendor: '',
  reference: '',
  date: '',
  note: '',
};

const ExpensesScreen = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: expenses = [], isLoading } = useQuery({
    queryKey: ['expenses'],
    queryFn: () => expensesAPI.getAll().then(r => r.data),
  });

  const addMutation = useMutation({
    mutationFn: (data: any) => expensesAPI.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['expenses'] });
      closeForm();
    },
    onError: () => Alert.alert('Error', 'Failed to add expense'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      expensesAPI.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['expenses'] });
      closeForm();
    },
    onError: () => Alert.alert('Error', 'Failed to update expense'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => expensesAPI.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['expenses'] }),
  });

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setShowAdd(true);
  };

  const openEdit = (item: any) => {
    setEditing(item);
    setForm({
      title: item.title || '',
      amount: String(item.amount ?? ''),
      category: item.category || 'office',
      paymentMethod: item.paymentMethod || 'cash',
      status: item.status || 'paid',
      vendor: item.vendor || '',
      reference: item.reference || '',
      date: item.date || '',
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
    Alert.alert('Delete Expense', `Remove "${item.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteMutation.mutate(item._id),
      },
    ]);
  };

  const handleSubmit = () => {
    if (!form.title.trim() || !form.amount) {
      Alert.alert('Error', 'Title and amount required');
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

  let filtered = Array.isArray(expenses)
    ? expenses.filter(
        (e: any) =>
          (!search || e.title?.toLowerCase().includes(search.toLowerCase())) &&
          (categoryFilter === 'all' || e.category === categoryFilter),
      )
    : [];

  filtered = [...filtered].sort((a: any, b: any) => {
    if (sort === 'title') return (a.title || '').localeCompare(b.title || '');
    if (sort === 'amount') return (b.amount || 0) - (a.amount || 0);
    const da = new Date(a.date || a.createdAt || 0).getTime();
    const db = new Date(b.date || b.createdAt || 0).getTime();
    return db - da;
  });

  const total = filtered.reduce((s: number, e: any) => s + (e.amount || 0), 0);
  const saving = addMutation.isPending || updateMutation.isPending;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>TOTAL EXPENSES</Text>
          <Text style={styles.summaryValue}>
            ₹{total.toLocaleString('en-IN')}
          </Text>
        </Card>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search expenses..."
        />
        <FilterChips
          options={CATEGORY_FILTERS}
          value={categoryFilter}
          onChange={setCategoryFilter}
        />
        <Row
          justify="space-between"
          align="center"
          style={{ marginBottom: Spacing.sm }}
        >
          <Text style={styles.count}>{filtered.length} EXPENSES</Text>
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
              title="No Expenses"
              subtitle="Track your business expenses"
              action={{ label: '+ Add Expense', onPress: openCreate }}
            />
          }
          renderItem={({ item }) => (
            <Card
              style={[
                styles.card,
                { borderLeftColor: Colors.destructive, borderLeftWidth: 4 },
              ]}
              shadow="sm"
            >
              <Row justify="space-between" align="flex-start">
                <View style={styles.left}>
                  <Text style={styles.title}>{item.title}</Text>
                  {item.category ? (
                    <Text style={styles.category}>{item.category}</Text>
                  ) : null}
                  {item.date || item.createdAt ? (
                    <Text style={styles.date}>
                      {format(
                        new Date(item.date || item.createdAt),
                        'dd MMM yyyy',
                      )}
                    </Text>
                  ) : null}
                  {item.note ? (
                    <Text style={styles.notes}>{item.note}</Text>
                  ) : null}
                </View>
                <Text style={styles.amount}>
                  -₹{(item.amount || 0).toLocaleString('en-IN')}
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
              {editing ? 'EDIT EXPENSE' : 'ADD EXPENSE'}
            </Text>
            <TouchableOpacity onPress={closeForm}>
              <Text style={styles.modalClose}>✕ CANCEL</Text>
            </TouchableOpacity>
          </Row>
          <ScrollView style={styles.modalContent} contentContainerStyle={{ paddingBottom: 40 }}>
            <Input
              label="TITLE *"
              value={form.title}
              onChangeText={v => setForm(p => ({ ...p, title: v }))}
              placeholder="e.g. Adobe Creative Suite"
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
              label="VENDOR / PAID TO"
              value={form.vendor}
              onChangeText={v => setForm(p => ({ ...p, vendor: v }))}
              placeholder="e.g. Amazon, Employee Name..."
            />
            <Input
              label="REFERENCE / INVOICE NO."
              value={form.reference}
              onChangeText={v => setForm(p => ({ ...p, reference: v }))}
              placeholder="e.g. INV-001, TXN-9823..."
            />
            <Input
              label="NOTES"
              value={form.note}
              onChangeText={v => setForm(p => ({ ...p, note: v }))}
              placeholder="Additional details..."
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
            <Text style={styles.pickLabel}>STATUS</Text>
            <View style={styles.catGrid}>
              {STATUSES.map(s => (
                <TouchableOpacity
                  key={s.value}
                  style={[
                    styles.catChip,
                    form.status === s.value && styles.catChipActive,
                  ]}
                  onPress={() => setForm(p => ({ ...p, status: s.value }))}
                >
                  <Text
                    style={[
                      styles.catChipText,
                      form.status === s.value && styles.catChipTextActive,
                    ]}
                  >
                    {s.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Button
              label={saving ? 'SAVING...' : editing ? 'SAVE CHANGES' : 'ADD EXPENSE'}
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
    backgroundColor: Colors.destructive,
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
  title: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  category: {
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
    color: Colors.destructive,
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

export default ExpensesScreen;
