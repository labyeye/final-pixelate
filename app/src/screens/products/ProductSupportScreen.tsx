import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  Alert,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react-native';
import { productsAPI } from '../../api';
import { useAuth } from '../../context/AuthContext';
import {
  Card,
  Row,
  StatCard,
  StatusBadge,
  Badge,
  FilterChips,
  SearchBar,
  Input,
  Button,
  EmptyState,
  LoadingSpinner,
} from '../../components/common';
import { Colors, Typography, Spacing } from '../../theme';
import { MoreStackParams } from '../../navigation/types';
import { PRODUCT_NAME, fmtDate, apiError } from './shared';

const STATUSES = ['new', 'in_progress', 'resolved', 'closed'] as const;
const label = (s: string) => s.replace('_', ' ');

// Tickets raised by tenants inside Nest HR / Nest Leads. Replies and status
// changes are pushed back to the tenant's app by the backend.
const ProductSupportScreen = () => {
  const { product } =
    useRoute<RouteProp<MoreStackParams, 'ProductSupport'>>().params;
  const name = PRODUCT_NAME[product];
  const { user } = useAuth();
  const qc = useQueryClient();
  const key = ['product-tickets', product];
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reply, setReply] = useState('');

  const { data: tickets = [], isLoading, isRefetching, refetch } = useQuery({
    queryKey: key,
    queryFn: () =>
      productsAPI.getTickets(product).then(r => (Array.isArray(r.data) ? r.data : [])),
  });
  const selected = tickets.find((t: any) => t._id === selectedId);

  const patch = useMutation({
    mutationFn: (updates: any) => productsAPI.updateTicket(selectedId!, updates),
    onSuccess: () => qc.invalidateQueries({ queryKey: key }),
    onError: (e: any) => Alert.alert('Error', apiError(e, 'Update failed')),
  });

  const changeStatus = (status: string) =>
    patch.mutate({
      status,
      activity: {
        type: 'status_change',
        user: user?.name || 'Admin',
        message: `Status changed to ${label(status)}`,
        timestamp: new Date(),
        oldValue: selected?.status,
        newValue: status,
      },
    });

  const sendReply = () => {
    if (!reply.trim()) return;
    patch.mutate(
      {
        activity: {
          type: 'comment',
          user: user?.name || 'Support',
          message: reply.trim(),
          timestamp: new Date(),
        },
        ...(selected?.status === 'new' ? { status: 'in_progress' } : {}),
      },
      { onSuccess: () => setReply('') },
    );
  };

  if (isLoading) return <LoadingSpinner />;

  const q = search.toLowerCase();
  const filtered = tickets.filter(
    (t: any) =>
      (filter === 'all' || t.status === filter) &&
      (!q ||
        [t.title, t.client, t.ticketNumber].some(v =>
          (v || '').toLowerCase().includes(q),
        )),
  );
  const count = (...s: string[]) =>
    tickets.filter((t: any) => s.includes(t.status)).length;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <FlatList
        data={filtered}
        keyExtractor={t => t._id}
        contentContainerStyle={styles.content}
        refreshing={isRefetching}
        onRefresh={refetch}
        ListHeaderComponent={
          <>
            <View style={styles.grid}>
              <StatCard label="New" value={count('new')} />
              <StatCard label="In progress" value={count('in_progress')} />
              <StatCard label="Resolved" value={count('resolved', 'closed')} />
            </View>
            <View style={{ height: Spacing.base }} />
            <SearchBar value={search} onChangeText={setSearch} placeholder="Search tickets..." />
            <FilterChips
              value={filter}
              onChange={setFilter}
              options={['all', ...STATUSES].map(s => ({
                label: s === 'all' ? 'All' : label(s)[0].toUpperCase() + label(s).slice(1),
                value: s,
              }))}
              style={{ marginBottom: Spacing.sm }}
            />
          </>
        }
        ListEmptyComponent={
          <EmptyState title="No tickets" subtitle={`Queries raised inside ${name} appear here`} />
        }
        renderItem={({ item: t }) => (
          <Card style={styles.card} shadow="sm" onPress={() => setSelectedId(t._id)}>
            <Row justify="space-between" align="flex-start">
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{t.title}</Text>
                <Text style={styles.client}>{t.client}</Text>
                <Text style={styles.meta}>
                  {t.ticketNumber ? `${t.ticketNumber} · ` : ''}
                  {fmtDate(t.createdAt)}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end', gap: 6 }}>
                <StatusBadge status={label(t.status || 'new')} />
                {t.priority ? (
                  <Badge label={t.priority} color={Colors.muted} textColor={Colors.gray700} />
                ) : null}
              </View>
            </Row>
          </Card>
        )}
      />

      <Modal visible={!!selected} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <Row justify="space-between" style={styles.modalHeader}>
            <Text style={styles.modalTitle} numberOfLines={1}>
              {selected?.ticketNumber || 'Ticket'}
            </Text>
            <TouchableOpacity onPress={() => setSelectedId(null)} hitSlop={10}>
              <X size={20} color={Colors.foreground} />
            </TouchableOpacity>
          </Row>
          {selected && (
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
              <ScrollView contentContainerStyle={styles.modalContent}>
                <Text style={styles.title}>{selected.title}</Text>
                <Text style={styles.meta}>
                  {selected.client}
                  {selected.submittedBy ? ` · ${selected.submittedBy}` : ''}
                  {selected.issueTypeLabel ? ` · ${selected.issueTypeLabel}` : ''}
                </Text>
                <Text style={styles.body}>{selected.description}</Text>

                <Text style={styles.label}>Status</Text>
                <FilterChips
                  value={selected.status}
                  onChange={changeStatus}
                  options={STATUSES.map(s => ({ label: label(s), value: s }))}
                  style={{ marginBottom: Spacing.base }}
                />

                <Text style={styles.label}>Activity</Text>
                {(selected.activity ?? []).length === 0 ? (
                  <Text style={styles.meta}>No activity yet</Text>
                ) : (
                  selected.activity.map((a: any, i: number) => (
                    <View
                      key={i}
                      style={[styles.activity, a.type === 'status_change' && styles.activityStatus]}
                    >
                      <Text style={styles.activityUser}>
                        {a.user} · {fmtDate(a.timestamp)}
                      </Text>
                      <Text style={styles.activityMsg}>{a.message}</Text>
                    </View>
                  ))
                )}
              </ScrollView>
              <View style={styles.replyBar}>
                <Input
                  value={reply}
                  onChangeText={setReply}
                  placeholder={`Reply (visible to the tenant in ${name})`}
                  multiline
                  containerStyle={{ flex: 1, marginBottom: 0 }}
                />
                <Button
                  label="Send"
                  onPress={sendReply}
                  loading={patch.isPending}
                  disabled={!reply.trim()}
                  style={{ marginLeft: Spacing.sm }}
                />
              </View>
            </KeyboardAvoidingView>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  title: {
    fontSize: Typography.base,
    fontWeight: Typography.bold,
    color: Colors.foreground,
  },
  client: {
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
    color: Colors.primary,
    marginTop: 2,
  },
  meta: { fontSize: Typography.sm, color: Colors.mutedForeground, marginTop: 2 },
  body: {
    fontSize: Typography.base,
    color: Colors.gray700,
    lineHeight: 20,
    marginVertical: Spacing.base,
  },
  label: {
    fontSize: Typography.sm,
    fontWeight: Typography.semiBold,
    color: Colors.foreground,
    marginBottom: 6,
  },
  activity: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  activityStatus: { backgroundColor: Colors.muted },
  activityUser: { fontSize: Typography.xs, color: Colors.mutedForeground },
  activityMsg: { fontSize: Typography.sm, color: Colors.foreground, marginTop: 2 },
  modal: { flex: 1, backgroundColor: Colors.background },
  modalHeader: {
    padding: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.card,
  },
  modalTitle: {
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    color: Colors.foreground,
    flex: 1,
  },
  modalContent: { padding: Spacing.base },
  replyBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.card,
  },
});

export default ProductSupportScreen;
