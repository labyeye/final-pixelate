import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { expensesAPI } from '../../api';
import { Card, Row, SearchBar, Button, Input, EmptyState, LoadingSpinner } from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';
import { format } from 'date-fns';

const CATEGORIES = ['Office', 'Software', 'Marketing', 'Travel', 'Utilities', 'Salaries', 'Other'];

const ExpensesScreen = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: '', amount: '', category: 'Office', date: '', notes: '' });

  const { data: expenses = [], isLoading } = useQuery({ queryKey: ['expenses'], queryFn: () => expensesAPI.getAll().then(r => r.data) });

  const addMutation = useMutation({
    mutationFn: (data: any) => expensesAPI.create(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['expenses'] }); setShowAdd(false); setForm({ title: '', amount: '', category: 'Office', date: '', notes: '' }); },
    onError: () => Alert.alert('Error', 'Failed to add expense'),
  });

  if (isLoading) return <LoadingSpinner />;

  const filtered = Array.isArray(expenses) ? expenses.filter((e: any) => !search || e.title?.toLowerCase().includes(search.toLowerCase())) : [];
  const total = filtered.reduce((s: number, e: any) => s + (e.amount || 0), 0);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>TOTAL EXPENSES</Text>
          <Text style={styles.summaryValue}>₹{total.toLocaleString('en-IN')}</Text>
        </Card>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search expenses..." />
        <Row justify="space-between" align="center" style={{ marginBottom: Spacing.sm }}>
          <Text style={styles.count}>{filtered.length} EXPENSES</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => setShowAdd(true)}>
            <Text style={styles.addBtnText}>+ ADD</Text>
          </TouchableOpacity>
        </Row>
        <FlatList
          data={filtered}
          keyExtractor={(item, i) => String(item._id || i)}
          ListEmptyComponent={<EmptyState title="No Expenses" subtitle="Track your business expenses" action={{ label: '+ Add Expense', onPress: () => setShowAdd(true) }} />}
          renderItem={({ item }) => (
            <Card style={[styles.card, { borderLeftColor: Colors.destructive, borderLeftWidth: 4 }]} shadow="sm">
              <Row justify="space-between" align="flex-start">
                <View style={styles.left}>
                  <Text style={styles.title}>{item.title}</Text>
                  {item.category ? <Text style={styles.category}>{item.category}</Text> : null}
                  {item.date || item.createdAt ? <Text style={styles.date}>{format(new Date(item.date || item.createdAt), 'dd MMM yyyy')}</Text> : null}
                  {item.notes ? <Text style={styles.notes}>{item.notes}</Text> : null}
                </View>
                <Text style={styles.amount}>-₹{(item.amount || 0).toLocaleString('en-IN')}</Text>
              </Row>
            </Card>
          )}
        />
      </View>
      <Modal visible={showAdd} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <Row justify="space-between" align="center" style={styles.modalHeader}>
            <Text style={styles.modalTitle}>ADD EXPENSE</Text>
            <TouchableOpacity onPress={() => setShowAdd(false)}><Text style={styles.modalClose}>✕ CANCEL</Text></TouchableOpacity>
          </Row>
          <View style={styles.modalContent}>
            <Input label="TITLE *" value={form.title} onChangeText={v => setForm(p => ({ ...p, title: v }))} placeholder="e.g. Adobe Creative Suite" />
            <Input label="AMOUNT (₹) *" value={form.amount} onChangeText={v => setForm(p => ({ ...p, amount: v }))} keyboardType="numeric" />
            <Input label="DATE (YYYY-MM-DD)" value={form.date} onChangeText={v => setForm(p => ({ ...p, date: v }))} placeholder="2025-02-01" />
            <Input label="NOTES" value={form.notes} onChangeText={v => setForm(p => ({ ...p, notes: v }))} placeholder="Additional details..." />
            <Text style={styles.pickLabel}>CATEGORY</Text>
            <View style={styles.catGrid}>
              {CATEGORIES.map(c => (
                <TouchableOpacity key={c} style={[styles.catChip, form.category === c && styles.catChipActive]} onPress={() => setForm(p => ({ ...p, category: c }))}>
                  <Text style={[styles.catChipText, form.category === c && styles.catChipTextActive]}>{c}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Button label={addMutation.isPending ? 'ADDING...' : 'ADD EXPENSE'} onPress={() => { if (!form.title.trim() || !form.amount) { Alert.alert('Error', 'Title and amount required'); return; } addMutation.mutate({ ...form, amount: Number(form.amount) }); }} loading={addMutation.isPending} fullWidth size="lg" style={{ marginTop: Spacing.base }} />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.base, paddingBottom: 0 },
  summaryCard: { marginBottom: Spacing.sm, padding: Spacing.md, backgroundColor: Colors.destructive, borderColor: Colors.black },
  summaryLabel: { fontSize: Typography.xs, fontWeight: Typography.black, color: Colors.white, opacity: 0.8, letterSpacing: 1 },
  summaryValue: { fontSize: Typography['3xl'], fontWeight: Typography.black, color: Colors.white, letterSpacing: -1, marginTop: 4 },
  count: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.mutedForeground, letterSpacing: 0.5 },
  addBtn: { backgroundColor: Colors.secondary, borderWidth: Border.widthBold, borderColor: Colors.black, paddingHorizontal: 14, paddingVertical: 6, ...Shadows.sm },
  addBtnText: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.white, letterSpacing: 0.5 },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  left: { flex: 1 },
  title: { fontSize: Typography.base, fontWeight: Typography.black, color: Colors.foreground },
  category: { fontSize: Typography.sm, color: Colors.accent, fontWeight: Typography.bold, marginTop: 2 },
  date: { fontSize: Typography.sm, color: Colors.mutedForeground, fontWeight: Typography.medium, marginTop: 1 },
  notes: { fontSize: Typography.sm, color: Colors.mutedForeground, fontWeight: Typography.medium, marginTop: 2 },
  amount: { fontSize: Typography.xl, fontWeight: Typography.black, color: Colors.destructive },
  modal: { flex: 1, backgroundColor: Colors.background },
  modalHeader: { padding: Spacing.base, borderBottomWidth: Border.widthBold, borderBottomColor: Colors.border },
  modalTitle: { fontSize: Typography['2xl'], fontWeight: Typography.black, color: Colors.foreground, letterSpacing: 1 },
  modalClose: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.destructive, letterSpacing: 0.5 },
  modalContent: { padding: Spacing.base },
  pickLabel: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.foreground, letterSpacing: 0.5, marginBottom: 8 },
  catGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: Spacing.base },
  catChip: { paddingHorizontal: 12, paddingVertical: 8, borderWidth: Border.width, borderColor: Colors.border },
  catChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  catChipText: { fontSize: Typography.sm, fontWeight: Typography.bold, color: Colors.foreground },
  catChipTextActive: { color: Colors.white },
});

export default ExpensesScreen;
