import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsAPI, clientsAPI } from '../../api';
import {
  Card,
  Row,
  StatusBadge,
  SearchBar,
  Button,
  Input,
  EmptyState,
  LoadingSpinner,
  FilterChips,
  SortButton,
  RowActions,
} from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';
import { OperationsStackParams } from '../../navigation/types';

type Nav = NativeStackNavigationProp<OperationsStackParams>;
const STATUS_OPTS = [
  'active',
  'in progress',
  'completed',
  'on hold',
  'cancelled',
];
const FILTER_OPTIONS = [
  { label: 'All', value: 'all' },
  ...STATUS_OPTS.map(s => ({ label: s.toUpperCase(), value: s })),
];
const SORT_OPTIONS = [
  { label: 'Newest first', value: 'newest' },
  { label: 'Name A-Z', value: 'name' },
];
const EMPTY_FORM = {
  name: '',
  clientId: '',
  clientName: '',
  status: 'active',
  description: '',
  amount: '',
  deliveryDate: '',
};

const ProjectsScreen = () => {
  const navigation = useNavigation<Nav>();
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const {
    data: projects = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectsAPI.getAll().then(r => r.data),
  });

  const { data: clients = [] } = useQuery({
    queryKey: ['clients'],
    queryFn: () => clientsAPI.getAll().then(r => r.data),
  });

  const addMutation = useMutation({
    mutationFn: (data: any) => projectsAPI.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['projects'] });
      closeForm();
    },
    onError: () => Alert.alert('Error', 'Failed to create project'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      projectsAPI.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['projects'] });
      closeForm();
    },
    onError: () => Alert.alert('Error', 'Failed to update project'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => projectsAPI.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setShowAdd(true);
  };

  const openEdit = (item: any) => {
    setEditing(item);
    setForm({
      name: item.name || '',
      clientId: item.clientId ? String(item.clientId) : '',
      clientName: item.clientName || '',
      status: item.status || 'active',
      description: item.description || '',
      amount: String(item.amount ?? ''),
      deliveryDate: item.deliveryDate ? String(item.deliveryDate).slice(0, 10) : '',
    });
    setShowAdd(true);
  };

  const closeForm = () => {
    setShowAdd(false);
    setEditing(null);
    setForm(EMPTY_FORM);
  };

  const confirmDelete = (item: any) => {
    Alert.alert('Delete Project', `Remove "${item.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteMutation.mutate(String(item._id || item.id)),
      },
    ]);
  };

  const handleSubmit = () => {
    if (!form.name.trim()) {
      Alert.alert('Error', 'Name required');
      return;
    }
    const data = { ...form, amount: form.amount ? Number(form.amount) : 0 };
    if (editing) {
      updateMutation.mutate({ id: String(editing._id || editing.id), data });
    } else {
      addMutation.mutate(data);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  let filtered = Array.isArray(projects)
    ? projects.filter((p: any) => {
        const ms =
          !search ||
          p.name?.toLowerCase().includes(search.toLowerCase()) ||
          p.clientName?.toLowerCase().includes(search.toLowerCase());
        const mf = filter === 'all' || p.status === filter;
        return ms && mf;
      })
    : [];

  filtered = [...filtered].sort((a: any, b: any) => {
    if (sort === 'name') return (a.name || '').localeCompare(b.name || '');
    const da = new Date(a.createdAt || 0).getTime();
    const db = new Date(b.createdAt || 0).getTime();
    return db - da;
  });

  const saving = addMutation.isPending || updateMutation.isPending;

  if (isLoading) return <LoadingSpinner />;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search projects..."
        />
        <FilterChips options={FILTER_OPTIONS} value={filter} onChange={setFilter} />
        <Row
          justify="space-between"
          align="center"
          style={{ marginBottom: Spacing.sm }}
        >
          <Text style={styles.count}>{filtered.length} PROJECTS</Text>
          <Row gap={8} align="center">
            <SortButton options={SORT_OPTIONS} value={sort} onChange={setSort} />
            <TouchableOpacity style={styles.addBtn} onPress={openCreate}>
              <Text style={styles.addBtnText}>+ ADD</Text>
            </TouchableOpacity>
          </Row>
        </Row>
        <FlatList
          style={{ flex: 1 }}
          data={filtered}
          keyExtractor={item => String(item._id || item.id)}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primary}
            />
          }
          ListEmptyComponent={
            <EmptyState
              title="No Projects"
              subtitle="Create your first project"
              action={{ label: '+ Add Project', onPress: openCreate }}
            />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProjectDetail', {
                  id: String(item._id || item.id),
                })
              }
              activeOpacity={0.85}
            >
              <Card
                style={[
                  styles.card,
                  { borderLeftColor: Colors.primary, borderLeftWidth: 4 },
                ]}
                shadow="sm"
              >
                <Row justify="space-between" align="flex-start">
                  <View style={styles.cardLeft}>
                    <Text style={styles.projectName}>{item.name}</Text>
                    {item.clientName ? (
                      <Text style={styles.clientName}>{item.clientName}</Text>
                    ) : null}
                    {item.description ? (
                      <Text style={styles.desc} numberOfLines={2}>
                        {item.description}
                      </Text>
                    ) : null}
                  </View>
                  <StatusBadge status={item.status || 'active'} />
                </Row>
                <Row justify="flex-end" style={{ marginTop: Spacing.sm }}>
                  <RowActions
                    onEdit={() => openEdit(item)}
                    onDelete={() => confirmDelete(item)}
                  />
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
            <Text style={styles.modalTitle}>
              {editing ? 'EDIT PROJECT' : 'NEW PROJECT'}
            </Text>
            <TouchableOpacity onPress={closeForm}>
              <Text style={styles.modalClose}>✕ CANCEL</Text>
            </TouchableOpacity>
          </Row>
          <ScrollView style={styles.modalContent} contentContainerStyle={{ paddingBottom: Spacing.xl }}>
            <Input
              label="PROJECT NAME *"
              value={form.name}
              onChangeText={v => setForm(p => ({ ...p, name: v }))}
              placeholder="e.g. Website Redesign"
            />
            <Text style={styles.pickLabel}>CLIENT</Text>
            <View style={styles.statusGrid}>
              {(Array.isArray(clients) ? clients : []).map((c: any) => {
                const id = String(c._id || c.id);
                return (
                  <TouchableOpacity
                    key={id}
                    style={[styles.statusChip, form.clientId === id && styles.statusChipActive]}
                    onPress={() =>
                      setForm(p => ({ ...p, clientId: id, clientName: c.name || '' }))
                    }
                  >
                    <Text
                      style={[
                        styles.statusChipText,
                        form.clientId === id && styles.statusChipTextActive,
                      ]}
                    >
                      {c.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Input
              label="AMOUNT (₹)"
              value={form.amount}
              onChangeText={v => setForm(p => ({ ...p, amount: v }))}
              keyboardType="numeric"
              placeholder="Project value"
            />
            <Input
              label="DELIVERY DATE"
              value={form.deliveryDate}
              onChangeText={v => setForm(p => ({ ...p, deliveryDate: v }))}
              placeholder="YYYY-MM-DD"
            />
            <Input
              label="DESCRIPTION"
              value={form.description}
              onChangeText={v => setForm(p => ({ ...p, description: v }))}
              placeholder="Project details..."
              multiline
            />
            <Text style={styles.pickLabel}>STATUS</Text>
            <View style={styles.statusGrid}>
              {STATUS_OPTS.map(s => (
                <TouchableOpacity
                  key={s}
                  style={[
                    styles.statusChip,
                    form.status === s && styles.statusChipActive,
                  ]}
                  onPress={() => setForm(p => ({ ...p, status: s }))}
                >
                  <Text
                    style={[
                      styles.statusChipText,
                      form.status === s && styles.statusChipTextActive,
                    ]}
                  >
                    {s}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Button
              label={saving ? 'SAVING...' : editing ? 'SAVE CHANGES' : 'CREATE PROJECT'}
              onPress={handleSubmit}
              loading={saving}
              fullWidth
              size="lg"
              style={{ marginTop: Spacing.base }}
            />
          </ScrollView>
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
  cardLeft: { flex: 1 },
  projectName: {
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
  desc: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 4,
    lineHeight: 18,
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
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: Spacing.base,
  },
  statusChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: Border.width,
    borderColor: Colors.border,
  },
  statusChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  statusChipText: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.foreground,
    textTransform: 'capitalize',
  },
  statusChipTextActive: { color: Colors.white },
});

export default ProjectsScreen;
