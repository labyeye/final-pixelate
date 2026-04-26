import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { invoicesAPI, paymentsAPI, expensesAPI, emiAPI, quotationsAPI } from '../../api';
import { Card, StatCard, SectionHeader, Row } from '../../components/common';
import { Colors, Typography, Spacing, Border } from '../../theme';
import { FinanceStackParams } from '../../navigation/types';

type Nav = NativeStackNavigationProp<FinanceStackParams>;

const SECTIONS = [
  { label: 'INVOICING', emoji: '🧾', route: 'Invoicing', color: Colors.primary, desc: 'Create & manage invoices' },
  { label: 'PAYMENTS', emoji: '💳', route: 'Payments', color: Colors.success, desc: 'Payment records' },
  { label: 'EXPENSES', emoji: '💸', route: 'Expenses', color: Colors.destructive, desc: 'Track all expenses' },
  { label: 'EMI TRACKER', emoji: '📅', route: 'EMITracker', color: Colors.warning, desc: 'Loan & EMI management' },
  { label: 'QUOTATIONS', emoji: '📄', route: 'Quotations', color: Colors.accent, desc: 'Send quotations' },
  { label: 'ONBOARDING', emoji: '🚀', route: 'Onboarding', color: Colors.secondary, desc: 'Client onboarding docs' },
  { label: 'NDA APPROVAL', emoji: '🔒', route: 'NDAApproval', color: Colors.gray700, desc: 'NDA approvals' },
];

const FinanceHomeScreen = () => {
  const navigation = useNavigation<Nav>();
  const { data: invoices = [] } = useQuery({ queryKey: ['invoices'], queryFn: () => invoicesAPI.getAll().then(r => r.data) });
  const { data: expenses = [] } = useQuery({ queryKey: ['expenses'], queryFn: () => expensesAPI.getAll().then(r => r.data) });

  const totalRevenue = Array.isArray(invoices) ? invoices.filter((i: any) => i.status === 'paid').reduce((s: number, i: any) => s + (i.total || i.amount || 0), 0) : 0;
  const pending = Array.isArray(invoices) ? invoices.filter((i: any) => i.status !== 'paid').reduce((s: number, i: any) => s + (i.total || i.amount || 0), 0) : 0;
  const totalExpenses = Array.isArray(expenses) ? expenses.reduce((s: number, e: any) => s + (e.amount || 0), 0) : 0;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionHeader title="FINANCE OVERVIEW" />
        <View style={styles.statsRow}>
          <StatCard label="COLLECTED" value={`₹${(totalRevenue / 1000).toFixed(0)}K`} accent={Colors.success} />
          <StatCard label="PENDING" value={`₹${(pending / 1000).toFixed(0)}K`} accent={Colors.destructive} />
        </View>
        <View style={[styles.statsRow, { marginTop: Spacing.sm }]}>
          <StatCard label="TOTAL INVOICES" value={Array.isArray(invoices) ? invoices.length : 0} accent={Colors.primary} />
          <StatCard label="EXPENSES" value={`₹${(totalExpenses / 1000).toFixed(0)}K`} accent={Colors.warning} />
        </View>

        <SectionHeader title="SECTIONS" style={{ marginTop: Spacing.xl }} />
        {SECTIONS.map(section => (
          <TouchableOpacity
            key={section.route}
            onPress={() => navigation.navigate(section.route as any)}
            activeOpacity={0.85}>
            <Card style={[styles.sectionCard, { borderLeftColor: section.color, borderLeftWidth: 6 }]} shadow="md">
              <Row justify="space-between" align="center">
                <Row align="center" gap={Spacing.md} style={{ flex: 1 }}>
                  <Text style={styles.sectionEmoji}>{section.emoji}</Text>
                  <View>
                    <Text style={styles.sectionLabel}>{section.label}</Text>
                    <Text style={styles.sectionDesc}>{section.desc}</Text>
                  </View>
                </Row>
                <Text style={styles.arrow}>→</Text>
              </Row>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, paddingBottom: 24 },
  statsRow: { flexDirection: 'row', gap: Spacing.sm },
  sectionCard: { marginBottom: Spacing.sm, padding: Spacing.md },
  sectionEmoji: { fontSize: 28 },
  sectionLabel: { fontSize: Typography.lg, fontWeight: Typography.black, color: Colors.foreground },
  sectionDesc: { fontSize: Typography.sm, color: Colors.mutedForeground, fontWeight: Typography.medium, marginTop: 1 },
  arrow: { fontSize: Typography.xl, fontWeight: Typography.black, color: Colors.mutedForeground },
});

export default FinanceHomeScreen;
