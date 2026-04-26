import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invoicesAPI } from '../../api';
import { Card, Row, StatusBadge, SearchBar, Button, Input, EmptyState, LoadingSpinner } from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';
import { FinanceStackParams } from '../../navigation/types';
import { format } from 'date-fns';

type Nav = NativeStackNavigationProp<FinanceStackParams>;

const InvoicingScreen = () => {
  const navigation = useNavigation<Nav>();
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ clientName: '', amount: '', description: '', dueDate: '', status: 'unpaid' });

  const { data: invoices = [], isLoading } = useQuery({ queryKey: ['invoices'], queryFn: () => invoicesAPI.getAll().then(r => r.data) });

  const addMutation = useMutation({
    mutationFn: (data: any) => invoicesAPI.create(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['invoices'] }); setShowAdd(false); setForm({ clientName: '', amount: '', description: '', dueDate: '', status: 'unpaid' }); },
    onError: () => Alert.alert('Error', 'Failed to create invoice'),
  });

  if (isLoading) return <LoadingSpinner />;

  const filtered = Array.isArray(invoices)
    ? invoices.filter((i: any) => {
        const ms = !search || i.clientName?.toLowerCase().includes(search.toLowerCase()) || String(i.invoiceNumber || '').includes(search);
        const mf = filter === 'all' || i.status === filter;
        return ms && mf;
      })
    : [];

  const totalFiltered = filtered.reduce((s: number, i: any) => s + (i.total || i.amount || 0), 0);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>TOTAL ({filtered.length} invoices)</Text>
          <Text style={styles.summaryValue}>₹{totalFiltered.toLocaleString('en-IN')}</Text>
        </Card>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search invoices..." />
        <View style={styles.filterRow}>
          {['all', 'paid', 'unpaid', 'partial', 'draft'].map(s => (
            <TouchableOpacity key={s} style={[styles.chip, filter === s && styles.chipActive]} onPress={() => setFilter(s)}>
              <Text style={[styles.chipText, filter === s && styles.chipTextActive]}>{s.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Row justify="space-between" align="center" style={{ marginBottom: Spacing.sm }}>
          <Text style={styles.count}>{filtered.length} INVOICES</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => setShowAdd(true)}>
            <Text style={styles.addBtnText}>+ CREATE</Text>
          </TouchableOpacity>
        </Row>
        <FlatList
          data={filtered}
          keyExtractor={item => String(item._id || item.id)}
          ListEmptyComponent={<EmptyState title="No Invoices" subtitle="Create your first invoice" action={{ label: '+ Create Invoice', onPress: () => setShowAdd(true) }} />}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('InvoiceDetail', { id: String(item._id || item.id) })} activeOpacity={0.85}>
              <Card style={[styles.card, { borderLeftColor: item.status === 'paid' ? Colors.success : Colors.destructive, borderLeftWidth: 4 }]} shadow="sm">
                <Row justify="space-between" align="flex-start">
                  <View style={styles.cardLeft}>
                    {item.invoiceNumber ? <Text style={styles.invoiceNo}>INV-{item.invoiceNumber}</Text> : null}
                    <Text style={styles.clientName}>{item.clientName}</Text>
                    {item.createdAt ? <Text style={styles.date}>{format(new Date(item.createdAt), 'dd MMM yyyy')}</Text> : null}
                  </View>
                  <View style={styles.cardRight}>
                    <Text style={[styles.amount, { color: item.status === 'paid' ? Colors.success : Colors.destructive }]}>
                      ₹{(item.total || item.amount || 0).toLocaleString('en-IN')}
                    </Text>
                    <StatusBadge status={item.status || 'unpaid'} />
                  </View>
                </Row>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
      <Modal visible={showAdd} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <Row justify="space-between" align="center" style={styles.modalHeader}>
            <Text style={styles.modalTitle}>CREATE INVOICE</Text>
            <TouchableOpacity onPress={() => setShowAdd(false)}><Text style={styles.modalClose}>✕ CANCEL</Text></TouchableOpacity>
          </Row>
          <View style={styles.modalContent}>
            <Input label="CLIENT NAME *" value={form.clientName} onChangeText={v => setForm(p => ({ ...p, clientName: v }))} placeholder="Client company" />
            <Input label="AMOUNT (₹) *" value={form.amount} onChangeText={v => setForm(p => ({ ...p, amount: v }))} keyboardType="numeric" placeholder="50000" />
            <Input label="DESCRIPTION" value={form.description} onChangeText={v => setForm(p => ({ ...p, description: v }))} placeholder="Invoice for..." multiline />
            <Input label="DUE DATE (YYYY-MM-DD)" value={form.dueDate} onChangeText={v => setForm(p => ({ ...p, dueDate: v }))} placeholder="2025-02-28" />
            <Button label={addMutation.isPending ? 'CREATING...' : 'CREATE INVOICE'} onPress={() => { if (!form.clientName.trim() || !form.amount) { Alert.alert('Error', 'Client and amount required'); return; } addMutation.mutate({ ...form, total: Number(form.amount), amount: Number(form.amount) }); }} loading={addMutation.isPending} fullWidth size="lg" style={{ marginTop: Spacing.base }} />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.base, paddingBottom: 0 },
  summaryCard: { marginBottom: Spacing.sm, padding: Spacing.md, backgroundColor: Colors.primary, borderColor: Colors.black },
  summaryLabel: { fontSize: Typography.xs, fontWeight: Typography.black, color: Colors.white, opacity: 0.8, letterSpacing: 1 },
  summaryValue: { fontSize: Typography['3xl'], fontWeight: Typography.black, color: Colors.white, letterSpacing: -1, marginTop: 4 },
  filterRow: { flexDirection: 'row', gap: 6, marginBottom: Spacing.sm, flexWrap: 'wrap' },
  chip: { paddingHorizontal: 10, paddingVertical: 5, borderWidth: Border.width, borderColor: Colors.border },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { fontSize: Typography.xs, fontWeight: Typography.bold, color: Colors.foreground, letterSpacing: 0.5 },
  chipTextActive: { color: Colors.white },
  count: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.mutedForeground, letterSpacing: 0.5 },
  addBtn: { backgroundColor: Colors.secondary, borderWidth: Border.widthBold, borderColor: Colors.black, paddingHorizontal: 14, paddingVertical: 6, ...Shadows.sm },
  addBtnText: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.white, letterSpacing: 0.5 },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  cardLeft: { flex: 1 },
  cardRight: { alignItems: 'flex-end', gap: 6 },
  invoiceNo: { fontSize: Typography.xs, fontWeight: Typography.black, color: Colors.mutedForeground, letterSpacing: 1 },
  clientName: { fontSize: Typography.base, fontWeight: Typography.black, color: Colors.foreground },
  date: { fontSize: Typography.sm, color: Colors.mutedForeground, fontWeight: Typography.medium, marginTop: 2 },
  amount: { fontSize: Typography.xl, fontWeight: Typography.black },
  modal: { flex: 1, backgroundColor: Colors.background },
  modalHeader: { padding: Spacing.base, borderBottomWidth: Border.widthBold, borderBottomColor: Colors.border },
  modalTitle: { fontSize: Typography['2xl'], fontWeight: Typography.black, color: Colors.foreground, letterSpacing: 1 },
  modalClose: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.destructive, letterSpacing: 0.5 },
  modalContent: { padding: Spacing.base },
});

export default InvoicingScreen;
