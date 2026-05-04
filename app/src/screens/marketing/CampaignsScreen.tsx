import React from 'react';
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
} from '../../components/common';
import { Colors, Typography, Spacing, Border } from '../../theme';
import { format } from 'date-fns';

const CampaignsScreen = () => {
  const { data: campaigns = [], isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: () => campaignsAPI.getAll().then(r => r.data),
  });

  if (isLoading) return <LoadingSpinner />;
  const items = Array.isArray(campaigns) ? campaigns : [];

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

        <SectionHeader
          title={`CAMPAIGNS (${items.length})`}
          style={{ marginTop: Spacing.base }}
        />

        <FlatList
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
