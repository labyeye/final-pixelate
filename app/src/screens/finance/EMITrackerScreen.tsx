import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { emiAPI } from '../../api';
import { Card, Row, StatusBadge, Button, Input, EmptyState, LoadingSpinner } from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';

const EMITrackerScreen = () => {
  const qc = useQueryClient();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ lenderName: '', totalAmount: '', emiAmount: '', remainingMonths: '', dueDate: '', notes: '' });

  const { data: emis = [], isLoading } = useQuery({ queryKey: ['emi'], queryFn: () => emiAPI.getAll().then(r => r.data) });

  const addMutation = useMutation({
    mutationFn: (data: any) => emiAPI.create(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['emi'] }); setShowAdd(false); setForm({ lenderName: '', totalAmount: '', emiAmount: '', remainingMonths: '', dueDate: '', notes: '' }); },
    onError: () => Alert.alert('Error', 'Failed to add EMI'),
  });

  if (isLoading) return <LoadingSpinner />;

  const items = Array.isArray(emis) ? emis : [];
  const totalEMI = items.reduce((s: number, e: any) => s + (e.emiAmount || 0), 0);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>MONTHLY EMI OUTFLOW</Text>
          <Text style={styles.summaryValue}>₹{totalEMI.toLocaleString('en-IN')}</Text>
          <Text style={styles.summaryNote}>{items.length} active loans</Text>
        </Card>

        <Row justify="space-between" align="center" style={{ marginBottom: Spacing.sm }}>
          <Text style={styles.count}>{items.length} EMI RECORDS</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => setShowAdd(true)}>
            <Text style={styles.addBtnText}>+ ADD</Text>
          </TouchableOpacity>
        </Row>

        <FlatList
          data={items}
          keyExtractor={(item, i) => String(item._id || i)}
          ListEmptyComponent={<EmptyState title="No EMI Records" subtitle="Track all your EMI payments" action={{ label: '+ Add EMI', onPress: () => setShowAdd(true) }} />}
          renderItem={({ item }) => (
            <Card style={[styles.card, { borderLeftColor: Colors.warning, borderLeftWidth: 4 }]} shadow="sm">
              <Row justify="space-between" align="flex-start">
                <View style={styles.left}>
                  <Text style={styles.lenderName}>{item.lenderName}</Text>
                  {item.totalAmount ? <Text style={styles.totalAmount}>Total: ₹{Number(item.totalAmount).toLocaleString('en-IN')}</Text> : null}
                  {item.remainingMonths ? <Text style={styles.remaining}>{item.remainingMonths} months remaining</Text> : null}
                  {item.dueDate ? <Text style={styles.dueDate}>Due: {item.dueDate}</Text> : null}
                  {item.notes ? <Text style={styles.notes}>{item.notes}</Text> : null}
                </View>
                <View style={styles.right}>
                  <Text style={styles.emiAmount}>₹{(item.emiAmount || 0).toLocaleString('en-IN')}</Text>
                  <Text style={styles.emiLabel}>/month</Text>
                </View>
              </Row>
            </Card>
          )}
        />
      </View>
      <Modal visible={showAdd} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <Row justify="space-between" align="center" style={styles.modalHeader}>
            <Text style={styles.modalTitle}>ADD EMI</Text>
            <TouchableOpacity onPress={() => setShowAdd(false)}><Text style={styles.modalClose}>✕ CANCEL</Text></TouchableOpacity>
          </Row>
          <View style={styles.modalContent}>
            <Input label="LENDER NAME *" value={form.lenderName} onChangeText={v => setForm(p => ({ ...p, lenderName: v }))} placeholder="e.g. HDFC Bank" />
            <Input label="TOTAL LOAN AMOUNT (₹)" value={form.totalAmount} onChangeText={v => setForm(p => ({ ...p, totalAmount: v }))} keyboardType="numeric" />
            <Input label="EMI AMOUNT (₹/month) *" value={form.emiAmount} onChangeText={v => setForm(p => ({ ...p, emiAmount: v }))} keyboardType="numeric" />
            <Input label="REMAINING MONTHS" value={form.remainingMonths} onChangeText={v => setForm(p => ({ ...p, remainingMonths: v }))} keyboardType="numeric" />
            <Input label="DUE DATE" value={form.dueDate} onChangeText={v => setForm(p => ({ ...p, dueDate: v }))} placeholder="e.g. 5th of every month" />
            <Input label="NOTES" value={form.notes} onChangeText={v => setForm(p => ({ ...p, notes: v }))} placeholder="Loan details..." />
            <Button label={addMutation.isPending ? 'ADDING...' : 'ADD EMI'} onPress={() => { if (!form.lenderName.trim() || !form.emiAmount) { Alert.alert('Error', 'Lender and EMI amount required'); return; } addMutation.mutate({ ...form, totalAmount: Number(form.totalAmount), emiAmount: Number(form.emiAmount), remainingMonths: Number(form.remainingMonths) }); }} loading={addMutation.isPending} fullWidth size="lg" style={{ marginTop: Spacing.base }} />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.base, paddingBottom: 0 },
  summaryCard: { marginBottom: Spacing.base, padding: Spacing.md, backgroundColor: Colors.warning, borderColor: Colors.black },
  summaryLabel: { fontSize: Typography.xs, fontWeight: Typography.black, color: Colors.white, opacity: 0.8, letterSpacing: 1 },
  summaryValue: { fontSize: Typography['3xl'], fontWeight: Typography.black, color: Colors.white, letterSpacing: -1, marginTop: 4 },
  summaryNote: { fontSize: Typography.sm, color: Colors.white, opacity: 0.8, fontWeight: Typography.medium, marginTop: 2 },
  count: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.mutedForeground, letterSpacing: 0.5 },
  addBtn: { backgroundColor: Colors.secondary, borderWidth: Border.widthBold, borderColor: Colors.black, paddingHorizontal: 14, paddingVertical: 6, ...Shadows.sm },
  addBtnText: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.white, letterSpacing: 0.5 },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  left: { flex: 1 },
  right: { alignItems: 'flex-end' },
  lenderName: { fontSize: Typography.base, fontWeight: Typography.black, color: Colors.foreground },
  totalAmount: { fontSize: Typography.sm, color: Colors.mutedForeground, fontWeight: Typography.medium, marginTop: 2 },
  remaining: { fontSize: Typography.sm, color: Colors.primary, fontWeight: Typography.bold, marginTop: 2 },
  dueDate: { fontSize: Typography.sm, color: Colors.secondary, fontWeight: Typography.bold, marginTop: 1 },
  notes: { fontSize: Typography.sm, color: Colors.mutedForeground, fontWeight: Typography.medium, marginTop: 2 },
  emiAmount: { fontSize: Typography.xl, fontWeight: Typography.black, color: Colors.warning },
  emiLabel: { fontSize: Typography.xs, color: Colors.mutedForeground, fontWeight: Typography.medium },
  modal: { flex: 1, backgroundColor: Colors.background },
  modalHeader: { padding: Spacing.base, borderBottomWidth: Border.widthBold, borderBottomColor: Colors.border },
  modalTitle: { fontSize: Typography['2xl'], fontWeight: Typography.black, color: Colors.foreground, letterSpacing: 1 },
  modalClose: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.destructive, letterSpacing: 0.5 },
  modalContent: { padding: Spacing.base },
});

export default EMITrackerScreen;
