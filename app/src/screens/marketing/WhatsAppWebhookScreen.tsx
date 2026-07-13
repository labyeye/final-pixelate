import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { Card, Row, LoadingSpinner, EmptyState, SearchBar } from '../../components/common';
import { Colors, Typography, Spacing, Border } from '../../theme';
import apiClient from '../../api/client';

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  sent: { label: 'Sent', color: Colors.warning },
  delivered: { label: 'Delivered', color: Colors.primary },
  read: { label: 'Read', color: Colors.success },
  failed: { label: 'Failed', color: Colors.destructive },
};

const STATUSES = ['all', 'sent', 'delivered', 'read', 'failed'];

function formatTs(iso?: string) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

const WhatsAppWebhookScreen = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(false);

  const { data: entries = [], isLoading, refetch, isFetching } = useQuery({
    queryKey: ['wa-delivery-log', statusFilter],
    queryFn: () =>
      apiClient
        .get(`/whatsapp/delivery-log?status=${statusFilter}&limit=200`)
        .then(r => r.data),
    refetchInterval: autoRefresh ? 10000 : false,
  });

  const arr = Array.isArray(entries) ? entries : [];

  const filtered = arr.filter((e: any) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      e.clientName?.toLowerCase().includes(q) ||
      e.invoiceNumber?.toLowerCase().includes(q) ||
      e.phone?.toLowerCase().includes(q)
    );
  });

  const counts = arr.reduce((acc: Record<string, number>, e: any) => {
    const s = e.whatsapp_send_status ?? 'sent';
    acc[s] = (acc[s] ?? 0) + 1;
    return acc;
  }, {});

  const totalEntries = arr.length;

  if (isLoading) return <LoadingSpinner />;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <Row justify="space-between" align="center" style={{ marginBottom: Spacing.sm }}>
          <TouchableOpacity
            style={[styles.autoBtn, autoRefresh && styles.autoBtnActive]}
            onPress={() => setAutoRefresh(v => !v)}
          >
            <Text style={[styles.autoBtnText, autoRefresh && styles.autoBtnTextActive]}>
              {autoRefresh ? 'AUTO: ON' : 'AUTO REFRESH'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.refreshBtn}
            onPress={() => refetch()}
            disabled={isFetching}
          >
            <Text style={styles.refreshBtnText}>{isFetching ? 'LOADING...' : 'REFRESH'}</Text>
          </TouchableOpacity>
        </Row>

        <Row gap={6} style={{ marginBottom: Spacing.sm }}>
          {(['sent', 'delivered', 'read', 'failed'] as const).map(s => {
            const cfg = STATUS_CONFIG[s];
            return (
              <TouchableOpacity
                key={s}
                style={[
                  styles.statCard,
                  { borderTopColor: cfg.color, borderTopWidth: 3 },
                  statusFilter === s && styles.statCardActive,
                ]}
                onPress={() => setStatusFilter(statusFilter === s ? 'all' : s)}
              >
                <Text style={[styles.statValue, { color: cfg.color }]}>{counts[s] ?? 0}</Text>
                <Text style={styles.statLabel}>{cfg.label.toUpperCase()}</Text>
              </TouchableOpacity>
            );
          })}
        </Row>

        <SearchBar value={search} onChangeText={setSearch} placeholder="Search client, invoice, phone..." />

        <View style={styles.filterRow}>
          {STATUSES.map(s => (
            <TouchableOpacity
              key={s}
              style={[styles.chip, statusFilter === s && styles.chipActive]}
              onPress={() => setStatusFilter(s)}
            >
              <Text style={[styles.chipText, statusFilter === s && styles.chipTextActive]}>
                {s === 'all' ? 'ALL' : s.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.count}>
          {filtered.length} MESSAGE{filtered.length !== 1 ? 'S' : ''}
          {statusFilter !== 'all' ? ` • ${statusFilter.toUpperCase()}` : ''}
        </Text>

        <FlatList
          style={{ flex: 1 }}
          data={filtered}
          keyExtractor={(item: any, i) => String(item._id || i)}
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={refetch} />
          }
          ListEmptyComponent={
            <EmptyState
              title="No Messages"
              subtitle={
                statusFilter !== 'all'
                  ? `No messages with status "${statusFilter}"`
                  : 'No WhatsApp delivery records found'
              }
            />
          }
          renderItem={({ item }: { item: any }) => {
            const status = item.whatsapp_send_status;
            const cfg = STATUS_CONFIG[status] || { label: status || '—', color: Colors.gray400 };
            const isFailed = status === 'failed';
            const isRead = status === 'read';
            return (
              <Card
                style={[
                  styles.card,
                  isFailed && { borderLeftWidth: 4, borderLeftColor: Colors.destructive },
                  isRead && { borderLeftWidth: 4, borderLeftColor: Colors.success },
                ]}
                shadow="sm"
              >
                <Row justify="space-between" align="flex-start">
                  <View style={{ flex: 1 }}>
                    <Text style={styles.clientName}>{item.clientName || '—'}</Text>
                    <Text style={styles.invoiceNum}>{item.invoiceNumber || '—'}</Text>
                    <Text style={styles.phone}>{item.phone || '—'}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: cfg.color }]}>
                    <Text style={styles.statusBadgeText}>{cfg.label.toUpperCase()}</Text>
                  </View>
                </Row>

                <View style={styles.timestampRow}>
                  {item.whatsapp_sent_at && (
                    <View style={styles.tsItem}>
                      <Text style={styles.tsLabel}>SENT</Text>
                      <Text style={styles.tsValue}>{formatTs(item.whatsapp_sent_at)}</Text>
                    </View>
                  )}
                  {item.whatsapp_delivered_at && (
                    <View style={styles.tsItem}>
                      <Text style={styles.tsLabel}>DELIVERED</Text>
                      <Text style={[styles.tsValue, { color: Colors.primary }]}>
                        {formatTs(item.whatsapp_delivered_at)}
                      </Text>
                    </View>
                  )}
                  {item.whatsapp_read_at && (
                    <View style={styles.tsItem}>
                      <Text style={styles.tsLabel}>READ</Text>
                      <Text style={[styles.tsValue, { color: Colors.success }]}>
                        {formatTs(item.whatsapp_read_at)}
                      </Text>
                    </View>
                  )}
                </View>

                {isFailed && item.whatsapp_fail_reason && (
                  <View style={styles.failReason}>
                    <Text style={styles.failReasonText}>
                      {item.whatsapp_fail_code
                        ? `[${item.whatsapp_fail_code}] `
                        : ''}
                      {item.whatsapp_fail_reason}
                    </Text>
                  </View>
                )}

                {item.whatsapp_message_id && (
                  <Text style={styles.wamid} numberOfLines={1}>
                    ID: ...{item.whatsapp_message_id.slice(-20)}
                  </Text>
                )}
              </Card>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.base, paddingBottom: 0 },
  autoBtn: {
    borderWidth: Border.widthBold,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  autoBtnActive: { backgroundColor: '#16A34A', borderColor: '#16A34A' },
  autoBtnText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: 0.5,
  },
  autoBtnTextActive: { color: Colors.white },
  refreshBtn: {
    borderWidth: Border.widthBold,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  refreshBtnText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: 0.5,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: Border.width,
    borderColor: Colors.border,
    padding: Spacing.sm,
    alignItems: 'center',
  },
  statCardActive: { backgroundColor: Colors.gray100 },
  statValue: {
    fontSize: Typography['2xl'],
    fontWeight: Typography.black,
  },
  statLabel: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    color: Colors.mutedForeground,
    letterSpacing: 0.5,
    marginTop: 2,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: Spacing.sm,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: Border.width,
    borderColor: Colors.border,
  },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    color: Colors.foreground,
    letterSpacing: 0.3,
  },
  chipTextActive: { color: Colors.white },
  count: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
  },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  clientName: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  invoiceNum: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.primary,
    marginTop: 2,
  },
  phone: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  statusBadgeText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 0.5,
  },
  timestampRow: {
    marginTop: Spacing.sm,
    gap: 4,
  },
  tsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  tsLabel: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 0.5,
  },
  tsValue: {
    fontSize: Typography.xs,
    fontWeight: Typography.medium,
    color: Colors.foreground,
  },
  failReason: {
    marginTop: Spacing.sm,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: Colors.destructive,
    padding: Spacing.sm,
  },
  failReasonText: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    color: Colors.destructive,
  },
  wamid: {
    fontSize: Typography.xs,
    color: Colors.gray400,
    fontWeight: Typography.regular,
    marginTop: 6,
  },
});

export default WhatsAppWebhookScreen;
