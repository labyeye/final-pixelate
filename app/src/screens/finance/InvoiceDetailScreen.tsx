import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invoicesAPI } from '../../api';
import { Card, Row, StatusBadge, Button, Divider, LoadingSpinner, Input } from '../../components/common';
import { Colors, Typography, Spacing, Border } from '../../theme';
import { FinanceStackParams } from '../../navigation/types';
import { format } from 'date-fns';

type Route = RouteProp<FinanceStackParams, 'InvoiceDetail'>;

const InvoiceDetailScreen = () => {
  const { params } = useRoute<Route>();
  const qc = useQueryClient();
  const [showPayment, setShowPayment] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [paymentMode, setPaymentMode] = useState('Bank Transfer');

  const { data: invoice, isLoading } = useQuery({
    queryKey: ['invoice', params.id],
    queryFn: () => invoicesAPI.getById(params.id).then(r => r.data),
  });

  const paymentMutation = useMutation({
    mutationFn: (data: any) => invoicesAPI.recordPayment(params.id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['invoices'] });
      qc.invalidateQueries({ queryKey: ['invoice', params.id] });
      setShowPayment(false);
    },
    onError: () => Alert.alert('Error', 'Failed to record payment'),
  });

  if (isLoading) return <LoadingSpinner />;
  if (!invoice) return <View style={styles.center}><Text>Invoice not found</Text></View>;

  const total = invoice.total || invoice.amount || 0;
  const paid = invoice.paidAmount || 0;
  const balance = total - paid;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={[styles.heroCard, { borderLeftColor: invoice.status === 'paid' ? Colors.success : Colors.destructive, borderLeftWidth: 6 }]} shadow="lg">
          <Row justify="space-between" align="flex-start">
            <View>
              {invoice.invoiceNumber ? <Text style={styles.invoiceNo}>INV-{invoice.invoiceNumber}</Text> : null}
              <Text style={styles.clientName}>{invoice.clientName}</Text>
              {invoice.createdAt ? <Text style={styles.date}>{format(new Date(invoice.createdAt), 'dd MMM yyyy')}</Text> : null}
            </View>
            <StatusBadge status={invoice.status || 'unpaid'} />
          </Row>
        </Card>

        <Card style={styles.amountCard}>
          <Row justify="space-between" align="center">
            <View>
              <Text style={styles.amountLabel}>TOTAL</Text>
              <Text style={styles.amountValue}>₹{total.toLocaleString('en-IN')}</Text>
            </View>
            <View style={styles.vertDivider} />
            <View>
              <Text style={styles.amountLabel}>PAID</Text>
              <Text style={[styles.amountValue, { color: Colors.success }]}>₹{paid.toLocaleString('en-IN')}</Text>
            </View>
            <View style={styles.vertDivider} />
            <View>
              <Text style={styles.amountLabel}>BALANCE</Text>
              <Text style={[styles.amountValue, { color: balance > 0 ? Colors.destructive : Colors.success }]}>₹{balance.toLocaleString('en-IN')}</Text>
            </View>
          </Row>
        </Card>

        {invoice.description ? (
          <Card style={styles.detailCard}>
            <Text style={styles.sectionTitle}>DESCRIPTION</Text>
            <Divider style={{ marginVertical: Spacing.sm }} />
            <Text style={styles.description}>{invoice.description}</Text>
          </Card>
        ) : null}

        {invoice.status !== 'paid' && (
          <Card style={styles.actionsCard}>
            <Text style={styles.sectionTitle}>ACTIONS</Text>
            <Divider style={{ marginVertical: Spacing.sm }} />
            <Button label="RECORD PAYMENT" onPress={() => setShowPayment(true)} fullWidth style={{ marginBottom: Spacing.sm }} />
            <Button label="MARK AS PAID" variant="success" onPress={() => {
              Alert.alert('Mark Paid', 'Mark this invoice as fully paid?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Mark Paid', onPress: () => paymentMutation.mutate({ status: 'paid', paidAmount: total }) },
              ]);
            }} fullWidth />
          </Card>
        )}
      </ScrollView>

      <Modal visible={showPayment} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <Row justify="space-between" align="center" style={styles.modalHeader}>
            <Text style={styles.modalTitle}>RECORD PAYMENT</Text>
            <TouchableOpacity onPress={() => setShowPayment(false)}><Text style={styles.modalClose}>✕</Text></TouchableOpacity>
          </Row>
          <View style={styles.modalContent}>
            <Input label="AMOUNT (₹) *" value={paymentAmount} onChangeText={setPaymentAmount} keyboardType="numeric" placeholder={String(balance)} />
            <Input label="DATE (YYYY-MM-DD)" value={paymentDate} onChangeText={setPaymentDate} placeholder="2025-02-01" />
            <Text style={styles.pickLabel}>PAYMENT MODE</Text>
            <View style={styles.modeRow}>
              {['Bank Transfer', 'UPI', 'Cash', 'Cheque', 'Card'].map(m => (
                <TouchableOpacity key={m} style={[styles.modeChip, paymentMode === m && styles.modeChipActive]} onPress={() => setPaymentMode(m)}>
                  <Text style={[styles.modeChipText, paymentMode === m && styles.modeChipTextActive]}>{m}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Button
              label={paymentMutation.isPending ? 'SAVING...' : 'RECORD PAYMENT'}
              onPress={() => {
                if (!paymentAmount) { Alert.alert('Error', 'Amount required'); return; }
                paymentMutation.mutate({ paidAmount: paid + Number(paymentAmount), paymentDate, paymentMode, status: (paid + Number(paymentAmount)) >= total ? 'paid' : 'partial' });
              }}
              loading={paymentMutation.isPending}
              fullWidth size="lg"
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
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { padding: Spacing.base, paddingBottom: 24 },
  heroCard: { padding: Spacing.lg, marginBottom: Spacing.sm },
  invoiceNo: { fontSize: Typography.xs, fontWeight: Typography.black, color: Colors.mutedForeground, letterSpacing: 1.5 },
  clientName: { fontSize: Typography['2xl'], fontWeight: Typography.black, color: Colors.foreground, letterSpacing: -0.5 },
  date: { fontSize: Typography.sm, color: Colors.mutedForeground, fontWeight: Typography.medium, marginTop: 4 },
  amountCard: { padding: Spacing.lg, marginBottom: Spacing.sm },
  amountLabel: { fontSize: Typography.xs, fontWeight: Typography.black, color: Colors.mutedForeground, letterSpacing: 1, textAlign: 'center' },
  amountValue: { fontSize: Typography.xl, fontWeight: Typography.black, color: Colors.foreground, textAlign: 'center', marginTop: 4 },
  vertDivider: { width: 2, height: 50, backgroundColor: Colors.border },
  detailCard: { padding: Spacing.md, marginBottom: Spacing.sm },
  actionsCard: { padding: Spacing.md },
  sectionTitle: { fontSize: Typography.xs, fontWeight: Typography.black, color: Colors.mutedForeground, letterSpacing: 1.5 },
  description: { fontSize: Typography.sm, color: Colors.foreground, fontWeight: Typography.medium, lineHeight: 20 },
  modal: { flex: 1, backgroundColor: Colors.background },
  modalHeader: { padding: Spacing.base, borderBottomWidth: Border.widthBold, borderBottomColor: Colors.border },
  modalTitle: { fontSize: Typography.xl, fontWeight: Typography.black, color: Colors.foreground, letterSpacing: 1 },
  modalClose: { fontSize: Typography.xl, fontWeight: Typography.black, color: Colors.destructive },
  modalContent: { padding: Spacing.base },
  pickLabel: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.foreground, letterSpacing: 0.5, marginBottom: 8 },
  modeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: Spacing.base },
  modeChip: { paddingHorizontal: 12, paddingVertical: 8, borderWidth: Border.width, borderColor: Colors.border },
  modeChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  modeChipText: { fontSize: Typography.sm, fontWeight: Typography.bold, color: Colors.foreground },
  modeChipTextActive: { color: Colors.white },
});

export default InvoiceDetailScreen;
