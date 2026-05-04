import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { quotationsAPI } from '../../api';
import {
  Card,
  Row,
  StatusBadge,
  SearchBar,
  EmptyState,
  LoadingSpinner,
} from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';
import { FinanceStackParams } from '../../navigation/types';
import { format } from 'date-fns';

type Nav = NativeStackNavigationProp<FinanceStackParams>;

const QuotationsScreen = () => {
  const navigation = useNavigation<Nav>();
  const [search, setSearch] = useState('');
  const { data: quotations = [], isLoading } = useQuery({
    queryKey: ['quotations'],
    queryFn: () => quotationsAPI.getAll().then(r => r.data),
  });

  if (isLoading) return <LoadingSpinner />;

  const filtered = Array.isArray(quotations)
    ? quotations.filter(
        (q: any) =>
          !search || q.clientName?.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search quotations..."
        />
        <Text style={styles.count}>{filtered.length} QUOTATIONS</Text>
        <FlatList
          data={filtered}
          keyExtractor={item => String(item._id || item.id)}
          ListEmptyComponent={
            <EmptyState
              title="No Quotations"
              subtitle="Quotations will appear here"
            />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('QuotationDetail', {
                  id: String(item._id || item.id),
                })
              }
              activeOpacity={0.85}
            >
              <Card
                style={[
                  styles.card,
                  { borderLeftColor: Colors.accent, borderLeftWidth: 4 },
                ]}
                shadow="sm"
              >
                <Row justify="space-between" align="flex-start">
                  <View style={styles.left}>
                    {item.quotationNumber ? (
                      <Text style={styles.qno}>QT-{item.quotationNumber}</Text>
                    ) : null}
                    <Text style={styles.client}>{item.clientName}</Text>
                    {item.createdAt ? (
                      <Text style={styles.date}>
                        {format(new Date(item.createdAt), 'dd MMM yyyy')}
                      </Text>
                    ) : null}
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.total}>
                      ₹
                      {(item.total || item.amount || 0).toLocaleString('en-IN')}
                    </Text>
                    <StatusBadge status={item.status || 'draft'} />
                  </View>
                </Row>
              </Card>
            </TouchableOpacity>
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
  right: { alignItems: 'flex-end', gap: 6 },
  qno: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 1,
  },
  client: {
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
  total: {
    fontSize: Typography.xl,
    fontWeight: Typography.black,
    color: Colors.accent,
  },
});

export default QuotationsScreen;
