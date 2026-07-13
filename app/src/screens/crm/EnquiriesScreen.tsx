import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { enquiriesAPI } from '../../api';
import {
  Card,
  Row,
  SearchBar,
  EmptyState,
  LoadingSpinner,
  FilterChips,
  SortButton,
  RowActions,
  StatusBadge,
} from '../../components/common';
import { Colors, Typography, Spacing, Border } from '../../theme';
import { format } from 'date-fns';

const STATUS_FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Confirmation', value: 'confirmation' },
  { label: 'Rejected', value: 'rejected' },
];

const STATUS_CYCLE = ['pending', 'confirmation', 'rejected'];

const SORT_OPTIONS = [
  { label: 'Newest first', value: 'newest' },
  { label: 'Oldest first', value: 'oldest' },
  { label: 'Name A-Z', value: 'name' },
];

const EnquiriesScreen = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const queryClient = useQueryClient();

  const { data: enquiries = [], isLoading } = useQuery({
    queryKey: ['enquiries'],
    queryFn: () => enquiriesAPI.getAll().then(r => r.data),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      enquiriesAPI.update(id, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['enquiries'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => enquiriesAPI.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['enquiries'] }),
  });

  const confirmDelete = (item: any) => {
    Alert.alert('Delete Enquiry', `Remove enquiry from "${item.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteMutation.mutate(item._id),
      },
    ]);
  };

  const cycleStatus = (item: any) => {
    const current = item.status || 'pending';
    const next =
      STATUS_CYCLE[(STATUS_CYCLE.indexOf(current) + 1) % STATUS_CYCLE.length];
    updateMutation.mutate({ id: item._id, status: next });
  };

  if (isLoading) return <LoadingSpinner />;

  let filtered = Array.isArray(enquiries)
    ? enquiries.filter(
        (e: any) =>
          (!search ||
            e.name?.toLowerCase().includes(search.toLowerCase()) ||
            e.email?.toLowerCase().includes(search.toLowerCase())) &&
          (statusFilter === 'all' || (e.status || 'pending') === statusFilter),
      )
    : [];

  filtered = [...filtered].sort((a: any, b: any) => {
    if (sort === 'name') return (a.name || '').localeCompare(b.name || '');
    const da = new Date(a.createdAt || 0).getTime();
    const db = new Date(b.createdAt || 0).getTime();
    return sort === 'oldest' ? da - db : db - da;
  });

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search enquiries..."
        />
        <FilterChips
          options={STATUS_FILTERS}
          value={statusFilter}
          onChange={setStatusFilter}
        />
        <Row justify="space-between" style={{ marginBottom: Spacing.sm }}>
          <Text style={styles.count}>{filtered.length} ENQUIRIES</Text>
          <SortButton options={SORT_OPTIONS} value={sort} onChange={setSort} />
        </Row>
        <FlatList
          style={{ flex: 1 }}
          data={filtered}
          keyExtractor={(item, i) => String(item._id || i)}
          ListEmptyComponent={
            <EmptyState
              title="No Enquiries"
              subtitle="Website enquiries will appear here"
            />
          }
          renderItem={({ item }) => (
            <Card style={styles.card} shadow="sm">
              <Row justify="space-between" align="flex-start">
                <View style={styles.left}>
                  <Text style={styles.name}>{item.name}</Text>
                  {item.email ? (
                    <Text style={styles.email}>{item.email}</Text>
                  ) : null}
                  {item.phone ? (
                    <Text style={styles.phone}>{item.phone}</Text>
                  ) : null}
                  {item.subject ? (
                    <Text style={styles.subject}>{item.subject}</Text>
                  ) : null}
                  {item.message ? (
                    <Text style={styles.message} numberOfLines={2}>
                      {item.message}
                    </Text>
                  ) : null}
                </View>
                {item.createdAt ? (
                  <Text style={styles.date}>
                    {format(new Date(item.createdAt), 'dd MMM')}
                  </Text>
                ) : null}
              </Row>
              <Row justify="space-between" align="center" style={{ marginTop: Spacing.sm }}>
                <Row gap={8} align="center">
                  {item.source ? (
                    <View style={styles.sourceBadge}>
                      <Text style={styles.sourceText}>{item.source}</Text>
                    </View>
                  ) : null}
                  <TouchableOpacity onPress={() => cycleStatus(item)} activeOpacity={0.7}>
                    <StatusBadge status={item.status || 'pending'} />
                  </TouchableOpacity>
                </Row>
                <RowActions onDelete={() => confirmDelete(item)} />
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
  count: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 0.5,
  },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  left: { flex: 1 },
  name: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  email: {
    fontSize: Typography.sm,
    color: Colors.primary,
    fontWeight: Typography.bold,
    marginTop: 2,
  },
  phone: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 1,
  },
  subject: {
    fontSize: Typography.sm,
    fontWeight: Typography.semiBold,
    color: Colors.foreground,
    marginTop: 4,
  },
  message: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 2,
    lineHeight: 18,
  },
  date: {
    fontSize: Typography.xs,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
  },
  sourceBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sourceText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 0.3,
  },
});

export default EnquiriesScreen;
