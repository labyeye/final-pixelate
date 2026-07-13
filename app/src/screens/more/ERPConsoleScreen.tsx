import React, { useState } from 'react';
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
import { erpAPI } from '../../api';
import { Card, Row, LoadingSpinner, EmptyState } from '../../components/common';
import { Colors, Typography, Spacing, Border } from '../../theme';
import { format } from 'date-fns';

const EVENT_COLORS: Record<string, string> = {
  login: Colors.success,
  logout: Colors.muted,
  permission_change: Colors.warning,
  data_update: Colors.accent,
  error: Colors.destructive,
  event: Colors.primary,
  post_created: '#10B981',
  post_updated: Colors.primary,
  post_deleted: Colors.destructive,
};

const ERPConsoleScreen = () => {
  const [filter, setFilter] = useState('all');

  const {
    data: events = [],
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['erp-events'],
    queryFn: () => erpAPI.getEvents().then(r => r.data),
    refetchInterval: 10000,
  });

  const list = Array.isArray(events) ? events : [];
  const types = [
    'all',
    ...Array.from(new Set(list.map((e: any) => e.type).filter(Boolean))),
  ];

  const filtered =
    filter === 'all' ? list : list.filter((e: any) => e.type === filter);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <Card style={styles.consoleBanner}>
          <Row align="center" style={{ gap: 8 }}>
            <View style={styles.dot} />
            <Text style={styles.consoleTitle}>
              ERP CONSOLE — LIVE AUDIT TRAIL
            </Text>
          </Row>
          <Text style={styles.consoleSub}>
            Auto-refreshes every 10 seconds. Tracks logins, data changes, and
            system events.
          </Text>
        </Card>

        <View style={styles.filterRow}>
          {(types as string[]).map(t => (
            <TouchableOpacity
              key={t}
              style={[
                styles.chip,
                filter === t && {
                  backgroundColor: EVENT_COLORS[t] || Colors.primary,
                  borderColor: Colors.black,
                },
              ]}
              onPress={() => setFilter(t)}
            >
              <Text
                style={[styles.chipText, filter === t && styles.chipTextActive]}
              >
                {t === 'all' ? 'ALL' : t.replace(/_/g, ' ').toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.count}>{filtered.length} EVENTS</Text>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <FlatList
            style={{ flex: 1 }}
            data={filtered}
            keyExtractor={(item, i) => String(item._id || i)}
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={refetch} />
            }
            ListEmptyComponent={
              <EmptyState
                title="No Events"
                subtitle="ERP events will appear here as they occur"
              />
            }
            renderItem={({ item }) => {
              const color = EVENT_COLORS[item.type] || Colors.muted;
              return (
                <Card
                  style={[
                    styles.card,
                    { borderLeftColor: color, borderLeftWidth: 4 },
                  ]}
                  shadow="sm"
                >
                  <Row justify="space-between" align="flex-start">
                    <View style={styles.info}>
                      <Row align="center" style={{ gap: 6, marginBottom: 4 }}>
                        <View
                          style={[styles.typeBadge, { backgroundColor: color }]}
                        >
                          <Text style={styles.typeText}>
                            {(item.type || 'event')
                              .replace(/_/g, ' ')
                              .toUpperCase()}
                          </Text>
                        </View>
                      </Row>
                      {item.message || item.description ? (
                        <Text style={styles.message}>
                          {item.message || item.description}
                        </Text>
                      ) : null}
                      {item.user ? (
                        <Text style={styles.user}>👤 {item.user}</Text>
                      ) : null}
                      {item.entity ? (
                        <Text style={styles.entity}>📋 {item.entity}</Text>
                      ) : null}
                    </View>
                    {item.createdAt || item.timestamp ? (
                      <Text style={styles.time}>
                        {format(
                          new Date(item.createdAt || item.timestamp),
                          'HH:mm\ndd MMM',
                        )}
                      </Text>
                    ) : null}
                  </Row>
                </Card>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.base, paddingBottom: 0 },
  consoleBanner: {
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderLeftColor: Colors.primary,
    borderLeftWidth: 6,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: Colors.success,
    borderWidth: 1,
    borderColor: Colors.black,
  },
  consoleTitle: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: 0.5,
    flex: 1,
  },
  consoleSub: {
    fontSize: Typography.xs,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 4,
    lineHeight: 18,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: Spacing.sm,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: Border.width,
    borderColor: Colors.border,
  },
  chipText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
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
  info: { flex: 1 },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: Border.width,
    borderColor: Colors.black,
  },
  typeText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 0.3,
  },
  message: {
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
    color: Colors.foreground,
    lineHeight: 18,
  },
  user: {
    fontSize: Typography.xs,
    color: Colors.primary,
    fontWeight: Typography.bold,
    marginTop: 2,
  },
  entity: {
    fontSize: Typography.xs,
    color: Colors.accent,
    fontWeight: Typography.bold,
    marginTop: 1,
  },
  time: {
    fontSize: Typography.xs,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    textAlign: 'right',
    lineHeight: 16,
  },
});

export default ERPConsoleScreen;
