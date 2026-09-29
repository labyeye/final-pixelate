import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Share, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { productsAPI } from '../../api';
import {
  Card,
  Row,
  StatCard,
  StatusBadge,
  FilterChips,
  EmptyState,
  LoadingSpinner,
  Button,
} from '../../components/common';
import { Colors, Typography, Spacing } from '../../theme';
import { MoreStackParams } from '../../navigation/types';
import { PRODUCT_NAME, fmtINR, fmtDate, apiError } from './shared';

const sum = (list: any[]) => list.reduce((s, i) => s + Number(i.amount ?? 0), 0);

const ProductInvoicesScreen = () => {
  const { product } =
    useRoute<RouteProp<MoreStackParams, 'ProductInvoices'>>().params;
  const [status, setStatus] = useState('all');

  const { data: invoices = [], isLoading, isRefetching, refetch, error } =
    useQuery({
      queryKey: ['product-invoices', product, status],
      queryFn: () =>
        productsAPI
          .getInvoices(product, status)
          .then(r => (r.data?.invoices ?? []) as any[]),
    });

  const byStatus = (s: string) =>
    invoices.filter(i => i.status?.toLowerCase() === s);
  const paid = byStatus('paid');
  const unpaid = byStatus('unpaid');
  const overdue = byStatus('overdue');

  // Same columns as the dashboard's "Export Excel", handed to the share sheet.
  const exportCsv = () => {
    const esc = (v: any) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const head = ['Invoice No', 'Client', 'Email', 'Amount', 'Currency', 'Status', 'Plan', 'Issued Date', 'Due Date'];
    const rows = invoices.map(i =>
      [i.invoiceNumber, i.clientName, i.clientEmail, i.amount, i.currency, i.status, i.subscriptionPlan, i.issuedDate, i.dueDate]
        .map(esc)
        .join(','),
    );
    Share.share({
      title: `${PRODUCT_NAME[product]} invoices`,
      message: [head.map(esc).join(','), ...rows].join('\n'),
    }).catch(() => Alert.alert('Error', 'Could not open share sheet'));
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <FlatList
        data={invoices}
        keyExtractor={(i, idx) => String(i.invoiceNumber ?? idx)}
        contentContainerStyle={styles.content}
        refreshing={isRefetching}
        onRefresh={refetch}
        ListHeaderComponent={
          <>
            <View style={styles.grid}>
              <StatCard label="Total invoices" value={invoices.length} />
              <StatCard label="Paid" value={paid.length} sub={fmtINR(sum(paid))} />
              <StatCard label="Unpaid" value={unpaid.length} sub={fmtINR(sum(unpaid))} />
              <StatCard label="Overdue" value={overdue.length} sub={fmtINR(sum(overdue))} />
            </View>
            <FilterChips
              value={status}
              onChange={setStatus}
              style={styles.toolbar}
              options={['all', 'paid', 'unpaid', 'overdue'].map(s => ({
                label: s[0].toUpperCase() + s.slice(1),
                value: s,
              }))}
            />
            <Button
              label="Export CSV"
              variant="outline"
              size="sm"
              onPress={exportCsv}
              disabled={invoices.length === 0}
              style={{ alignSelf: 'flex-start', marginBottom: Spacing.md }}
            />
            {isLoading && <LoadingSpinner />}
          </>
        }
        ListEmptyComponent={
          isLoading ? null : (
            <EmptyState
              title={error ? "Couldn't load invoices" : 'No invoices found'}
              subtitle={error ? apiError(error, '') : undefined}
            />
          )
        }
        renderItem={({ item }) => (
          <Card style={styles.card} shadow="sm">
            <Row justify="space-between" align="flex-start">
              <View style={{ flex: 1 }}>
                <Text style={styles.number}>{item.invoiceNumber}</Text>
                <Text style={styles.client}>{item.clientName}</Text>
                <Text style={styles.meta}>{item.clientEmail}</Text>
              </View>
              <View style={{ alignItems: 'flex-end', gap: 6 }}>
                <Text style={styles.amount}>{fmtINR(item.amount)}</Text>
                <StatusBadge status={item.status ?? ''} />
              </View>
            </Row>
            <Text style={styles.meta}>
              {item.subscriptionPlan ? `${item.subscriptionPlan} · ` : ''}
              Issued {fmtDate(item.issuedDate)} · Due {fmtDate(item.dueDate)}
            </Text>
          </Card>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  toolbar: { marginTop: Spacing.base },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  number: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.primary,
  },
  client: {
    fontSize: Typography.base,
    fontWeight: Typography.semiBold,
    color: Colors.foreground,
    marginTop: 2,
  },
  amount: {
    fontSize: Typography.md,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  meta: { fontSize: Typography.sm, color: Colors.mutedForeground, marginTop: 2 },
});

export default ProductInvoicesScreen;
