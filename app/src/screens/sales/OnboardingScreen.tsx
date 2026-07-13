import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { onboardingAPI } from '../../api';
import {
  Card,
  Row,
  StatusBadge,
  SearchBar,
  EmptyState,
  LoadingSpinner,
} from '../../components/common';
import { Colors, Typography, Spacing } from '../../theme';
import { format } from 'date-fns';

const OnboardingScreen = () => {
  const [search, setSearch] = useState('');
  const { data: onboarding = [], isLoading } = useQuery({
    queryKey: ['onboarding'],
    queryFn: () => onboardingAPI.getAll().then(r => r.data),
  });

  if (isLoading) return <LoadingSpinner />;

  const filtered = Array.isArray(onboarding)
    ? onboarding.filter(
        (o: any) =>
          !search || o.clientName?.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search clients..."
        />
        <Text style={styles.count}>{filtered.length} ONBOARDING RECORDS</Text>
        <FlatList
          style={{ flex: 1 }}
          data={filtered}
          keyExtractor={(item, i) => String(item._id || i)}
          ListEmptyComponent={
            <EmptyState
              title="No Onboarding Records"
              subtitle="Onboarding documents will appear here"
            />
          }
          renderItem={({ item }) => (
            <Card
              style={[
                styles.card,
                { borderLeftColor: Colors.secondary, borderLeftWidth: 4 },
              ]}
              shadow="sm"
            >
              <Row justify="space-between" align="flex-start">
                <View style={styles.left}>
                  <Text style={styles.clientName}>{item.clientName}</Text>
                  {item.projectName ? (
                    <Text style={styles.project}>{item.projectName}</Text>
                  ) : null}
                  {item.createdAt ? (
                    <Text style={styles.date}>
                      {format(new Date(item.createdAt), 'dd MMM yyyy')}
                    </Text>
                  ) : null}
                </View>
                <StatusBadge status={item.status || 'pending'} />
              </Row>
              {item.services && item.services.length > 0 ? (
                <View style={styles.tagsRow}>
                  {item.services.slice(0, 3).map((s: string, i: number) => (
                    <View key={i} style={styles.tag}>
                      <Text style={styles.tagText}>{s}</Text>
                    </View>
                  ))}
                </View>
              ) : null}
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
  count: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
  },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  left: { flex: 1 },
  clientName: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  project: {
    fontSize: Typography.sm,
    color: Colors.primary,
    fontWeight: Typography.bold,
    marginTop: 2,
  },
  date: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 1,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: Spacing.sm,
  },
  tag: {
    backgroundColor: Colors.muted,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tagText: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    color: Colors.foreground,
  },
});

export default OnboardingScreen;
