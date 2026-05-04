import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supportAPI } from '../../api';
import {
  Card,
  Row,
  StatusBadge,
  SearchBar,
  Button,
  Input,
  EmptyState,
  LoadingSpinner,
} from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';
import { MoreStackParams } from '../../navigation/types';
import { format } from 'date-fns';

type Nav = NativeStackNavigationProp<MoreStackParams>;
const PRIORITIES = ['low', 'medium', 'high', 'urgent'];

const SupportScreen = () => {
  const navigation = useNavigation<Nav>();
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    subject: '',
    description: '',
    priority: 'medium',
    clientName: '',
  });

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ['support-tickets'],
    queryFn: () => supportAPI.getAll().then(r => r.data),
  });

  const addMutation = useMutation({
    mutationFn: (data: any) => supportAPI.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['support-tickets'] });
      setShowAdd(false);
      setForm({
        subject: '',
        description: '',
        priority: 'medium',
        clientName: '',
      });
    },
    onError: () => Alert.alert('Error', 'Failed to create ticket'),
  });

  if (isLoading) return <LoadingSpinner />;

  const filtered = Array.isArray(tickets)
    ? tickets.filter((t: any) => {
        const ms =
          !search ||
          t.subject?.toLowerCase().includes(search.toLowerCase()) ||
          t.clientName?.toLowerCase().includes(search.toLowerCase());
        const mf = filter === 'all' || t.status === filter;
        return ms && mf;
      })
    : [];

  const priorityColor = (p: string) =>
    ({
      urgent: Colors.destructive,
      high: Colors.secondary,
      medium: Colors.warning,
      low: Colors.success,
    })[p] || Colors.muted;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search tickets..."
        />
        <View style={styles.filterRow}>
          {['all', 'open', 'in progress', 'resolved', 'closed'].map(s => (
            <TouchableOpacity
              key={s}
              style={[styles.chip, filter === s && styles.chipActive]}
              onPress={() => setFilter(s)}
            >
              <Text
                style={[styles.chipText, filter === s && styles.chipTextActive]}
              >
                {s.toUpperCase().slice(0, 7)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Row
          justify="space-between"
          align="center"
          style={{ marginBottom: Spacing.sm }}
        >
          <Text style={styles.count}>{filtered.length} TICKETS</Text>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => setShowAdd(true)}
          >
            <Text style={styles.addBtnText}>+ NEW TICKET</Text>
          </TouchableOpacity>
        </Row>
        <FlatList
          data={filtered}
          keyExtractor={(item, i) => String(item._id || i)}
          ListEmptyComponent={
            <EmptyState
              title="No Tickets"
              subtitle="Support tickets will appear here"
              action={{
                label: '+ Create Ticket',
                onPress: () => setShowAdd(true),
              }}
            />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SupportDetail', {
                  id: String(item._id || item.id),
                })
              }
              activeOpacity={0.85}
            >
              <Card
                style={[
                  styles.card,
                  {
                    borderLeftColor: priorityColor(item.priority),
                    borderLeftWidth: 4,
                  },
                ]}
                shadow="sm"
              >
                <Row justify="space-between" align="flex-start">
                  <View style={styles.left}>
                    <Text style={styles.subject}>{item.subject}</Text>
                    {item.clientName ? (
                      <Text style={styles.clientName}>{item.clientName}</Text>
                    ) : null}
                    {item.createdAt ? (
                      <Text style={styles.date}>
                        {format(new Date(item.createdAt), 'dd MMM yyyy')}
                      </Text>
                    ) : null}
                  </View>
                  <View style={styles.right}>
                    <StatusBadge status={item.status || 'open'} />
                    <View
                      style={[
                        styles.priorityBadge,
                        { backgroundColor: priorityColor(item.priority) },
                      ]}
                    >
                      <Text style={styles.priorityText}>
                        {(item.priority || 'medium').toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </Row>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
      <Modal
        visible={showAdd}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modal}>
          <Row
            justify="space-between"
            align="center"
            style={styles.modalHeader}
          >
            <Text style={styles.modalTitle}>NEW TICKET</Text>
            <TouchableOpacity onPress={() => setShowAdd(false)}>
              <Text style={styles.modalClose}>✕ CANCEL</Text>
            </TouchableOpacity>
          </Row>
          <View style={styles.modalContent}>
            <Input
              label="SUBJECT *"
              value={form.subject}
              onChangeText={v => setForm(p => ({ ...p, subject: v }))}
              placeholder="Describe the issue briefly"
            />
            <Input
              label="CLIENT NAME"
              value={form.clientName}
              onChangeText={v => setForm(p => ({ ...p, clientName: v }))}
              placeholder="Client company"
            />
            <Input
              label="DESCRIPTION"
              value={form.description}
              onChangeText={v => setForm(p => ({ ...p, description: v }))}
              placeholder="Detailed description..."
              multiline
            />
            <Text style={styles.pickLabel}>PRIORITY</Text>
            <View style={styles.priorityRow}>
              {PRIORITIES.map(p => (
                <TouchableOpacity
                  key={p}
                  style={[
                    styles.priChip,
                    form.priority === p && {
                      backgroundColor: priorityColor(p),
                      borderColor: priorityColor(p),
                    },
                  ]}
                  onPress={() => setForm(prev => ({ ...prev, priority: p }))}
                >
                  <Text
                    style={[
                      styles.priChipText,
                      form.priority === p && styles.priChipTextActive,
                    ]}
                  >
                    {p.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Button
              label={addMutation.isPending ? 'CREATING...' : 'CREATE TICKET'}
              onPress={() => {
                if (!form.subject.trim()) {
                  Alert.alert('Error', 'Subject required');
                  return;
                }
                addMutation.mutate({ ...form, status: 'open' });
              }}
              loading={addMutation.isPending}
              fullWidth
              size="lg"
              style={{ marginTop: Spacing.base }}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.base, paddingBottom: 0 },
  filterRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: Spacing.sm,
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: Border.width,
    borderColor: Colors.border,
  },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    color: Colors.foreground,
    letterSpacing: 0.5,
  },
  chipTextActive: { color: Colors.white },
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
  subject: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  clientName: {
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
  priorityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  priorityText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 0.5,
  },
  modal: { flex: 1, backgroundColor: Colors.background },
  modalHeader: {
    padding: Spacing.base,
    borderBottomWidth: Border.widthBold,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: Typography['2xl'],
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: 1,
  },
  modalClose: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.destructive,
    letterSpacing: 0.5,
  },
  modalContent: { padding: Spacing.base },
  pickLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  priorityRow: { flexDirection: 'row', gap: 8, marginBottom: Spacing.base },
  priChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: Border.width,
    borderColor: Colors.border,
    flex: 1,
    alignItems: 'center',
  },
  priChipText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: 0.5,
  },
  priChipTextActive: { color: Colors.white },
});

export default SupportScreen;
