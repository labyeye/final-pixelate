import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { quotationsAPI } from '../../api';
import {
  Card,
  Row,
  StatusBadge,
  SearchBar,
  EmptyState,
  LoadingSpinner,
  FilterChips,
  SortButton,
  RowActions,
} from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';
import { FinanceStackParams } from '../../navigation/types';
import { format } from 'date-fns';

type Nav = NativeStackNavigationProp<FinanceStackParams>;

const STATUS_FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Draft', value: 'draft' },
  { label: 'Sent', value: 'sent' },
  { label: 'Accepted', value: 'accepted' },
  { label: 'Rejected', value: 'rejected' },
];

const SORT_OPTIONS = [
  { label: 'Newest first', value: 'newest' },
  { label: 'Amount high-low', value: 'amount' },
  { label: 'Client A-Z', value: 'client' },
];

const QuotationsScreen = () => {
  const navigation = useNavigation<Nav>();
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sort, setSort] = useState('newest');

  const { data: quotations = [], isLoading } = useQuery({
    queryKey: ['quotations'],
    queryFn: () => quotationsAPI.getAll().then(r => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => quotationsAPI.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['quotations'] }),
  });

  const confirmDelete = (item: any) => {
    Alert.alert('Delete Quotation', `Remove QT-${item.quotationNumber || ''}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteMutation.mutate(String(item._id || item.id)),
      },
    ]);
  };

  if (isLoading) return <LoadingSpinner />;

  let filtered = Array.isArray(quotations)
    ? quotations.filter(
        (q: any) =>
          (!search ||
            q.clientName?.toLowerCase().includes(search.toLowerCase())) &&
          (statusFilter === 'all' || (q.status || 'draft') === statusFilter),
      )
    : [];

  filtered = [...filtered].sort((a: any, b: any) => {
    if (sort === 'client')
      return (a.clientName || '').localeCompare(b.clientName || '');
    if (sort === 'amount')
      return (b.total || b.amount || 0) - (a.total || a.amount || 0);
    const da = new Date(a.createdAt || 0).getTime();
    const db = new Date(b.createdAt || 0).getTime();
    return db - da;
  });

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search quotations..."
        />
        <FilterChips
          options={STATUS_FILTERS}
          value={statusFilter}
          onChange={setStatusFilter}
        />
        <Row
          justify="space-between"
          align="center"
          style={{ marginBottom: Spacing.sm }}
        >
          <Text style={styles.count}>{filtered.length} QUOTATIONS</Text>
          <Row gap={8} align="center">
            <SortButton options={SORT_OPTIONS} value={sort} onChange={setSort} />
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => navigation.navigate('QuotationForm', {})}
            >
              <Text style={styles.addBtnText}>+ ADD</Text>
            </TouchableOpacity>
          </Row>
        </Row>
        <FlatList
          style={{ flex: 1 }}
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
                <Row justify="flex-end" style={{ marginTop: Spacing.sm }}>
                  <RowActions
                    onEdit={() =>
                      navigation.navigate('QuotationForm', {
                        id: String(item._id || item.id),
                      })
                    }
                    onDelete={() => confirmDelete(item)}
                  />
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
  },
  addBtn: {
    backgroundColor: Colors.secondary,
    borderWidth: Border.widthBold,
    borderColor: Colors.black,
    paddingHorizontal: 14,
    paddingVertical: 6,
    ...Shadows.sm,
  },
  addBtnText: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 0.5,
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
