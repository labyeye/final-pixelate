import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { newsletterAPI } from '../../api';
import {
  Card,
  Row,
  SectionHeader,
  EmptyState,
  LoadingSpinner,
} from '../../components/common';
import { Colors, Typography, Spacing } from '../../theme';
import { format } from 'date-fns';

const NewsletterScreen = () => {
  const { data: subscribers = [], isLoading } = useQuery({
    queryKey: ['newsletter'],
    queryFn: () => newsletterAPI.getAll().then(r => r.data),
  });

  if (isLoading) return <LoadingSpinner />;
  const items = Array.isArray(subscribers) ? subscribers : [];

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <Card style={styles.statsCard}>
          <Text style={styles.statsValue}>{items.length}</Text>
          <Text style={styles.statsLabel}>SUBSCRIBERS</Text>
        </Card>
        <SectionHeader title="SUBSCRIBER LIST" />
        <FlatList
          style={{ flex: 1 }}
          data={items}
          keyExtractor={(item, i) => String(item._id || item.email || i)}
          ListEmptyComponent={
            <EmptyState
              title="No Subscribers"
              subtitle="Newsletter subscribers will appear here"
            />
          }
          renderItem={({ item }) => (
            <Card style={styles.card} shadow="sm">
              <Row justify="space-between" align="center">
                <View>
                  <Text style={styles.email}>{item.email}</Text>
                  {item.name ? (
                    <Text style={styles.name}>{item.name}</Text>
                  ) : null}
                </View>
                {item.createdAt ? (
                  <Text style={styles.date}>
                    {format(new Date(item.createdAt), 'dd MMM yy')}
                  </Text>
                ) : null}
              </Row>
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
  statsCard: {
    padding: Spacing.xl,
    marginBottom: Spacing.base,
    backgroundColor: Colors.primary,
    borderColor: Colors.black,
    alignItems: 'center',
  },
  statsValue: {
    fontSize: Typography['5xl'],
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: -2,
  },
  statsLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.white,
    opacity: 0.8,
    letterSpacing: 2,
    marginTop: 4,
  },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  email: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  name: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 2,
  },
  date: {
    fontSize: Typography.xs,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
  },
});

export default NewsletterScreen;
