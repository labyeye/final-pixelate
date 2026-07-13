import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksAPI, projectsAPI, teamAPI } from '../../api';
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

const PRIORITY = ['low', 'medium', 'high', 'urgent'];
const STATUS_OPTS = ['pending', 'in progress', 'completed', 'cancelled'];
const FILTER_OPTIONS = [
  { label: 'All', value: 'all' },
  ...STATUS_OPTS.map(s => ({ label: s.toUpperCase(), value: s })),
];
const SORT_OPTIONS = [
  { label: 'Newest first', value: 'newest' },
  { label: 'Priority high-low', value: 'priority' },
  { label: 'Title A-Z', value: 'title' },
];
const PRIORITY_RANK: Record<string, number> = {
  urgent: 3,
  high: 2,
  medium: 1,
  low: 0,
};
const EMPTY_FORM = {
  title: '',
  description: '',
  priority: 'medium',
  status: 'pending',
  dueDate: '',
  projectId: '',
  projectTitle: '',
  assigneeId: '',
  assigneeName: '',
};

const TasksScreen = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => tasksAPI.getAll().then(r => r.data),
  });

  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectsAPI.getAll().then(r => r.data),
  });

  const { data: teamMembers = [] } = useQuery({
    queryKey: ['team-members'],
    queryFn: () => teamAPI.getAll().then(r => r.data),
  });

  const addMutation = useMutation({
    mutationFn: (data: any) => tasksAPI.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tasks'] });
      closeForm();
    },
    onError: () => Alert.alert('Error', 'Failed to add task'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      tasksAPI.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tasks'] });
      closeForm();
    },
    onError: () => Alert.alert('Error', 'Failed to update task'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => tasksAPI.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      tasksAPI.update(id, { status }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setShowAdd(true);
  };

  const openEdit = (item: any) => {
    setEditing(item);
    setForm({
      title: item.title || '',
      description: item.description || '',
      priority: item.priority || 'medium',
      status: item.status || 'pending',
      dueDate: item.dueDate ? String(item.dueDate).slice(0, 10) : '',
      projectId: item.projectId || '',
      projectTitle: item.projectTitle || '',
      assigneeId: item.assigneeId || '',
      assigneeName: item.assigneeName || '',
    });
    setShowAdd(true);
  };

  const closeForm = () => {
    setShowAdd(false);
    setEditing(null);
    setForm(EMPTY_FORM);
  };

  const confirmDelete = (item: any) => {
    Alert.alert('Delete Task', `Remove "${item.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteMutation.mutate(String(item._id || item.id)),
      },
    ]);
  };

  const handleSubmit = () => {
    if (!form.title.trim()) {
      Alert.alert('Error', 'Title required');
      return;
    }
    if (editing) {
      updateMutation.mutate({ id: String(editing._id || editing.id), data: form });
    } else {
      addMutation.mutate(form);
    }
  };

  let filtered = Array.isArray(tasks)
    ? tasks.filter((t: any) => {
        const ms =
          !search || t.title?.toLowerCase().includes(search.toLowerCase());
        const mf = filter === 'all' || t.status === filter;
        return ms && mf;
      })
    : [];

  filtered = [...filtered].sort((a: any, b: any) => {
    if (sort === 'title') return (a.title || '').localeCompare(b.title || '');
    if (sort === 'priority')
      return (
        (PRIORITY_RANK[b.priority] ?? 0) - (PRIORITY_RANK[a.priority] ?? 0)
      );
    const da = new Date(a.createdAt || 0).getTime();
    const db = new Date(b.createdAt || 0).getTime();
    return db - da;
  });

  const priorityColor = (p: string) =>
    ({
      urgent: Colors.destructive,
      high: Colors.secondary,
      medium: Colors.warning,
      low: Colors.success,
    })[p] || Colors.muted;

  const saving = addMutation.isPending || updateMutation.isPending;

  if (isLoading) return <LoadingSpinner />;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search tasks..."
        />
        <FilterChips
          options={FILTER_OPTIONS}
          value={filter}
          onChange={setFilter}
        />
        <Row
          justify="space-between"
          align="center"
          style={{ marginBottom: Spacing.sm }}
        >
          <Text style={styles.count}>{filtered.length} TASKS</Text>
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
          ListEmptyComponent={
            <EmptyState
              title="No Tasks"
              subtitle="Create tasks for your team"
              action={{ label: '+ Add Task', onPress: openCreate }}
            />
          }
          renderItem={({ item }) => {
            const id = String(item._id || item.id);
            const isDone = item.status === 'completed';
            return (
              <Card style={styles.card} shadow="sm">
                <Row justify="space-between" align="flex-start">
                  <TouchableOpacity
                    style={[styles.checkbox, isDone && styles.checkboxDone]}
                    onPress={() =>
                      toggleMutation.mutate({
                        id,
                        status: isDone ? 'pending' : 'completed',
                      })
                    }
                  >
                    {isDone ? <Text style={styles.checkmark}>✓</Text> : null}
                  </TouchableOpacity>
                  <View style={styles.taskContent}>
                    <Text
                      style={[styles.taskTitle, isDone && styles.taskTitleDone]}
                    >
                      {item.title}
                    </Text>
                    {item.description ? (
                      <Text style={styles.taskDesc} numberOfLines={2}>
                        {item.description}
                      </Text>
                    ) : null}
                    {item.assigneeName ? (
                      <Text style={styles.assigned}>
                        → {item.assigneeName}
                      </Text>
                    ) : null}
                    {item.projectTitle ? (
                      <Text style={styles.assigned}>
                        # {item.projectTitle}
                      </Text>
                    ) : null}
                    <Row style={{ marginTop: 6 }} gap={8}>
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
                      <StatusBadge status={item.status || 'pending'} />
                    </Row>
                  </View>
                  <RowActions
                    onEdit={() => openEdit(item)}
                    onDelete={() => confirmDelete(item)}
                  />
                </Row>
              </Card>
            );
          }}
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
              {editing ? 'EDIT TASK' : 'ADD TASK'}
            </Text>
            <TouchableOpacity onPress={closeForm}>
              <Text style={styles.modalClose}>✕ CANCEL</Text>
            </TouchableOpacity>
          </Row>
          <ScrollView style={styles.modalContent} contentContainerStyle={{ paddingBottom: Spacing.xl }}>
            <Input
              label="TASK TITLE *"
              value={form.title}
              onChangeText={v => setForm(p => ({ ...p, title: v }))}
              placeholder="e.g. Design homepage mockup"
            />
            <Input
              label="DESCRIPTION"
              value={form.description}
              onChangeText={v => setForm(p => ({ ...p, description: v }))}
              placeholder="Details..."
              multiline
            />
            <Input
              label="DUE DATE"
              value={form.dueDate}
              onChangeText={v => setForm(p => ({ ...p, dueDate: v }))}
              placeholder="YYYY-MM-DD"
            />
            <Text style={styles.pickLabel}>PROJECT</Text>
            <View style={styles.priorityRow}>
              <TouchableOpacity
                style={[styles.priChip, !form.projectId && styles.statusChipActive]}
                onPress={() => setForm(p => ({ ...p, projectId: '', projectTitle: '' }))}
              >
                <Text style={[styles.priChipText, !form.projectId && styles.priChipTextActive]}>NONE</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.statusGrid}>
              {(Array.isArray(projects) ? projects : []).map((proj: any) => {
                const id = String(proj._id || proj.id);
                const title = proj.name || proj.title || 'Untitled';
                return (
                  <TouchableOpacity
                    key={id}
                    style={[styles.statusChip, form.projectId === id && styles.statusChipActive]}
                    onPress={() => setForm(p => ({ ...p, projectId: id, projectTitle: title }))}
                  >
                    <Text style={[styles.statusChipText, form.projectId === id && styles.statusChipTextActive]}>
                      {title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text style={styles.pickLabel}>ASSIGN TO</Text>
            <View style={styles.statusGrid}>
              <TouchableOpacity
                style={[styles.statusChip, !form.assigneeId && styles.statusChipActive]}
                onPress={() => setForm(p => ({ ...p, assigneeId: '', assigneeName: '' }))}
              >
                <Text style={[styles.statusChipText, !form.assigneeId && styles.statusChipTextActive]}>Unassigned</Text>
              </TouchableOpacity>
              {(Array.isArray(teamMembers) ? teamMembers : []).map((m: any) => {
                const id = String(m._id || m.id);
                return (
                  <TouchableOpacity
                    key={id}
                    style={[styles.statusChip, form.assigneeId === id && styles.statusChipActive]}
                    onPress={() => setForm(p => ({ ...p, assigneeId: id, assigneeName: m.name || '' }))}
                  >
                    <Text style={[styles.statusChipText, form.assigneeId === id && styles.statusChipTextActive]}>
                      {m.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text style={styles.pickLabel}>PRIORITY</Text>
            <View style={styles.priorityRow}>
              {PRIORITY.map(p => (
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
              label={saving ? 'SAVING...' : editing ? 'SAVE CHANGES' : 'ADD TASK'}
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
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: Border.widthBold,
    borderColor: Colors.border,
    marginRight: Spacing.sm,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  checkmark: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: Typography.black,
  },
  taskContent: { flex: 1 },
  taskTitle: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    color: Colors.mutedForeground,
  },
  taskDesc: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 2,
    lineHeight: 18,
  },
  assigned: {
    fontSize: Typography.xs,
    color: Colors.primary,
    fontWeight: Typography.bold,
    marginTop: 4,
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
  },
  statusChipTextActive: { color: Colors.white },
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

export default TasksScreen;
