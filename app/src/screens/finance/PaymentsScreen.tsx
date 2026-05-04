import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentsAPI } from '../../api';
import {
  Card,
  Row,
  SearchBar,
  Button,
  Input,
  EmptyState,
  LoadingSpinner,
} from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';
import { format } from 'date-fns';

const PaymentsScreen = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    clientName: '',
    amount: '',
    mode: 'Bank Transfer',
    date: '',
    notes: '',
  });

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payments'],
    queryFn: () => paymentsAPI.getAll().then(r => r.data),
  });

  const addMutation = useMutation({
    mutationFn: (data: any) => paymentsAPI.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['payments'] });
      setShowAdd(false);
      setForm({
        clientName: '',
        amount: '',
        mode: 'Bank Transfer',
        date: '',
        notes: '',
      });
    },
    onError: () => Alert.alert('Error', 'Failed to add payment'),
  });

  if (isLoading) return <LoadingSpinner />;

  const filtered = Array.isArray(payments)
    ? payments.filter(
        (p: any) =>
          !search || p.clientName?.toLowerCase().includes(search.toLowerCase()),
      )
    : [];
  const total = filtered.reduce((s: number, p: any) => s + (p.amount || 0), 0);

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
        <Row
          justify="space-between"
          align="center"
          style={{ marginBottom: Spacing.sm }}
        >
          <Text style={styles.count}>{filtered.length} PAYMENTS</Text>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => setShowAdd(true)}
          >
            <Text style={styles.addBtnText}>+ ADD</Text>
          </TouchableOpacity>
        </Row>
        <FlatList
          data={filtered}
          keyExtractor={(item, i) => String(item._id || i)}
          ListEmptyComponent={
            <EmptyState
              title="No Payments"
              subtitle="Record incoming payments"
              action={{
                label: '+ Add Payment',
                onPress: () => setShowAdd(true),
              }}
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
                  {item.notes ? (
                    <Text style={styles.notes}>{item.notes}</Text>
                  ) : null}
                </View>
                <Text style={styles.amount}>
                  ₹{(item.amount || 0).toLocaleString('en-IN')}
                </Text>
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
            <Text style={styles.modalTitle}>ADD PAYMENT</Text>
            <TouchableOpacity onPress={() => setShowAdd(false)}>
              <Text style={styles.modalClose}>✕ CANCEL</Text>
            </TouchableOpacity>
          </Row>
          <View style={styles.modalContent}>
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
              value={form.notes}
              onChangeText={v => setForm(p => ({ ...p, notes: v }))}
              placeholder="Payment reference..."
            />
            <Text style={styles.pickLabel}>PAYMENT MODE</Text>
            <View style={styles.modeRow}>
              {['Bank Transfer', 'UPI', 'Cash', 'Cheque', 'Card'].map(m => (
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
              label={addMutation.isPending ? 'ADDING...' : 'ADD PAYMENT'}
              onPress={() => {
                if (!form.clientName.trim() || !form.amount) {
                  Alert.alert('Error', 'Client and amount required');
                  return;
                }
                addMutation.mutate({ ...form, amount: Number(form.amount) });
              }}
              loading={addMutation.isPending}
              fullWidth
              size="lg"
              style={{ marginTop: Spacing.base }}
            />
          </View>
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
