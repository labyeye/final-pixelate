import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { dashboardAPI } from '../../api';
import {
  Card,
  SectionHeader,
  LoadingSpinner,
  EmptyState,
} from '../../components/common';
import { Colors, Typography, Spacing, Border } from '../../theme';
import { format } from 'date-fns';

const UserActivityScreen = () => {
  const { data: activity = [], isLoading } = useQuery({
    queryKey: ['user-activity'],
    queryFn: () => dashboardAPI.getUserActivity().then(r => r.data),
  });

  if (isLoading) return <LoadingSpinner />;

  const items = Array.isArray(activity) ? activity : [];

  const typeColors: Record<string, string> = {
    login: Colors.success,
    logout: Colors.destructive,
    create: Colors.primary,
    update: Colors.secondary,
    delete: Colors.destructive,
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <SectionHeader
        title={`ACTIVITY LOG (${items.length})`}
        style={styles.header}
      />
      <FlatList
        data={items}
        keyExtractor={(item, i) => item._id || String(i)}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          <EmptyState
            title="No Activity"
            subtitle="User events will appear here"
          />
        }
        renderItem={({ item }) => (
          <Card style={styles.card} shadow="sm">
            <View style={styles.cardHeader}>
              <View
                style={[
                  styles.typeBadge,
                  { backgroundColor: typeColors[item.type] || Colors.muted },
                ]}
              >
                <Text style={styles.typeText}>
                  {(item.type || 'event').toUpperCase()}
                </Text>
              </View>
              {item.createdAt ? (
                <Text style={styles.time}>
                  {format(new Date(item.createdAt), 'dd MMM, HH:mm')}
                </Text>
              ) : null}
            </View>
            <Text style={styles.adminName}>
              {item.adminName || item.email || 'Unknown'}
            </Text>
            {item.details?.message ? (
              <Text style={styles.message}>{item.details.message}</Text>
            ) : null}
          </Card>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { padding: Spacing.base },
  content: { padding: Spacing.base, paddingTop: 0, paddingBottom: 24 },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  typeText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 0.5,
  },
  adminName: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  time: {
    fontSize: Typography.xs,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
  },
  message: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    marginTop: 2,
    fontWeight: Typography.medium,
  },
});

export default UserActivityScreen;
