import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { campaignsAPI } from '../../api';
import {
  Card,
  Row,
  EmptyState,
  LoadingSpinner,
  SectionHeader,
  SortButton,
} from '../../components/common';
import { Colors, Typography, Spacing, Border } from '../../theme';
import { format } from 'date-fns';

const SORT_OPTIONS = [
  { label: 'Newest first', value: 'newest' },
  { label: 'Most sent', value: 'sent' },
  { label: 'Highest read rate', value: 'readRate' },
];

const CampaignsScreen = () => {
  const [sort, setSort] = useState('newest');
  const { data: campaigns = [], isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: () => campaignsAPI.getAll().then(r => r.data),
  });

  if (isLoading) return <LoadingSpinner />;
  const readRate = (c: any) =>
    (c.readCount || 0) / (c.sentCount || c.totalSent || 1);

  const items = [...(Array.isArray(campaigns) ? campaigns : [])].sort(
    (a: any, b: any) => {
      if (sort === 'sent')
        return (b.sentCount || b.totalSent || 0) - (a.sentCount || a.totalSent || 0);
      if (sort === 'readRate') return readRate(b) - readRate(a);
      const da = new Date(a.createdAt || 0).getTime();
      const db = new Date(b.createdAt || 0).getTime();
      return db - da;
    },
  );

  const totalSent = items.reduce(
    (s: number, c: any) => s + (c.sentCount || c.totalSent || 0),
    0,
  );
  const totalDelivered = items.reduce(
    (s: number, c: any) => s + (c.deliveredCount || c.delivered || 0),
    0,
  );
  const totalRead = items.reduce(
    (s: number, c: any) => s + (c.readCount || c.read || 0),
    0,
  );

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { backgroundColor: Colors.primary }]}>
            <Text style={styles.statValue}>{totalSent}</Text>
            <Text style={styles.statLabel}>SENT</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: Colors.success }]}>
            <Text style={styles.statValue}>{totalDelivered}</Text>
            <Text style={styles.statLabel}>DELIVERED</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: Colors.secondary }]}>
            <Text style={styles.statValue}>{totalRead}</Text>
            <Text style={styles.statLabel}>READ</Text>
          </View>
        </View>

        <Row
          justify="space-between"
          align="center"
          style={{ marginTop: Spacing.base, marginBottom: Spacing.sm }}
        >
          <SectionHeader title={`CAMPAIGNS (${items.length})`} style={{ marginBottom: 0 }} />
          <SortButton options={SORT_OPTIONS} value={sort} onChange={setSort} />
        </Row>

        <FlatList
          style={{ flex: 1 }}
          data={items}
          keyExtractor={(item, i) => String(item._id || i)}
          ListEmptyComponent={
            <EmptyState
              title="No Campaigns"
              subtitle="WhatsApp campaign data will appear here"
            />
          }
          renderItem={({ item }) => (
            <Card
              style={[
                styles.card,
                { borderLeftColor: '#25D366', borderLeftWidth: 4 },
              ]}
              shadow="sm"
            >
              <Text style={styles.campaignName}>
                {item.name || item.campaignName || 'Campaign'}
              </Text>
              {item.createdAt ? (
                <Text style={styles.date}>
                  {format(new Date(item.createdAt), 'dd MMM yyyy')}
                </Text>
              ) : null}
              <View style={styles.metricsRow}>
                <View style={styles.metric}>
                  <Text style={styles.metricValue}>
                    {item.sentCount || item.totalSent || 0}
                  </Text>
                  <Text style={styles.metricLabel}>Sent</Text>
                </View>
                <View style={styles.metric}>
                  <Text style={[styles.metricValue, { color: Colors.success }]}>
                    {item.deliveredCount || item.delivered || 0}
                  </Text>
                  <Text style={styles.metricLabel}>Delivered</Text>
                </View>
                <View style={styles.metric}>
                  <Text
                    style={[styles.metricValue, { color: Colors.secondary }]}
                  >
                    {item.readCount || item.read || 0}
                  </Text>
                  <Text style={styles.metricLabel}>Read</Text>
                </View>
                {item.sentCount || item.totalSent ? (
                  <View style={styles.metric}>
                    <Text
                      style={[styles.metricValue, { color: Colors.accent }]}
                    >
                      {(
                        ((item.readCount || 0) /
                          (item.sentCount || item.totalSent || 1)) *
                        100
                      ).toFixed(0)}
                      %
                    </Text>
                    <Text style={styles.metricLabel}>Read Rate</Text>
                  </View>
                ) : null}
              </View>
            </Card>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.base, paddingBottom: 0 },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.base,
  },
  statBox: {
    flex: 1,
    padding: Spacing.md,
    borderWidth: Border.widthBold,
    borderColor: Colors.black,
    alignItems: 'center',
  },
  statValue: {
    fontSize: Typography['2xl'],
    fontWeight: Typography.black,
    color: Colors.white,
  },
  statLabel: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.white,
    opacity: 0.8,
    letterSpacing: 1,
    marginTop: 2,
  },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  campaignName: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  date: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 2,
  },
  metricsRow: {
    flexDirection: 'row',
    marginTop: Spacing.sm,
    gap: Spacing.base,
  },
  metric: { alignItems: 'center' },
  metricValue: {
    fontSize: Typography.xl,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  metricLabel: {
    fontSize: Typography.xs,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 1,
  },
});

export default CampaignsScreen;
