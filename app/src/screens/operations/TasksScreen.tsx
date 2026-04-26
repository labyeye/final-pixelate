import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksAPI } from '../../api';
import { Card, Row, StatusBadge, SearchBar, Button, Input, EmptyState, LoadingSpinner } from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';

const PRIORITY = ['low', 'medium', 'high', 'urgent'];
const STATUS_OPTS = ['pending', 'in progress', 'completed', 'cancelled'];

const TasksScreen = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', priority: 'medium', status: 'pending', assignedToName: '' });

  const { data: tasks = [], isLoading } = useQuery({ queryKey: ['tasks'], queryFn: () => tasksAPI.getAll().then(r => r.data) });

  const addMutation = useMutation({
    mutationFn: (data: any) => tasksAPI.create(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['tasks'] }); setShowAdd(false); setForm({ title: '', description: '', priority: 'medium', status: 'pending', assignedToName: '' }); },
    onError: () => Alert.alert('Error', 'Failed to add task'),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => tasksAPI.update(id, { status }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const filtered = Array.isArray(tasks)
    ? tasks.filter((t: any) => {
        const ms = !search || t.title?.toLowerCase().includes(search.toLowerCase());
        const mf = filter === 'all' || t.status === filter;
        return ms && mf;
      })
    : [];

  const priorityColor = (p: string) => ({ urgent: Colors.destructive, high: Colors.secondary, medium: Colors.warning, low: Colors.success }[p] || Colors.muted);

  if (isLoading) return <LoadingSpinner />;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search tasks..." />
        <View style={styles.filterRow}>
          {['all', ...STATUS_OPTS].map(s => (
            <TouchableOpacity key={s} style={[styles.chip, filter === s && styles.chipActive]} onPress={() => setFilter(s)}>
              <Text style={[styles.chipText, filter === s && styles.chipTextActive]}>{s.toUpperCase().slice(0, 7)}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Row justify="space-between" align="center" style={{ marginBottom: Spacing.sm }}>
          <Text style={styles.count}>{filtered.length} TASKS</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => setShowAdd(true)}>
            <Text style={styles.addBtnText}>+ ADD</Text>
          </TouchableOpacity>
        </Row>
        <FlatList
          data={filtered}
          keyExtractor={item => String(item._id || item.id)}
          ListEmptyComponent={<EmptyState title="No Tasks" subtitle="Create tasks for your team" action={{ label: '+ Add Task', onPress: () => setShowAdd(true) }} />}
          renderItem={({ item }) => {
            const id = String(item._id || item.id);
            const isDone = item.status === 'completed';
            return (
              <Card style={styles.card} shadow="sm">
                <Row justify="space-between" align="flex-start">
                  <TouchableOpacity
                    style={[styles.checkbox, isDone && styles.checkboxDone]}
                    onPress={() => toggleMutation.mutate({ id, status: isDone ? 'pending' : 'completed' })}>
                    {isDone ? <Text style={styles.checkmark}>✓</Text> : null}
                  </TouchableOpacity>
                  <View style={styles.taskContent}>
                    <Text style={[styles.taskTitle, isDone && styles.taskTitleDone]}>{item.title}</Text>
                    {item.description ? <Text style={styles.taskDesc} numberOfLines={2}>{item.description}</Text> : null}
                    {item.assignedToName ? <Text style={styles.assigned}>→ {item.assignedToName}</Text> : null}
                    <Row style={{ marginTop: 6 }} gap={8}>
                      <View style={[styles.priorityBadge, { backgroundColor: priorityColor(item.priority) }]}>
                        <Text style={styles.priorityText}>{(item.priority || 'medium').toUpperCase()}</Text>
                      </View>
                      <StatusBadge status={item.status || 'pending'} />
                    </Row>
                  </View>
                </Row>
              </Card>
            );
          }}
        />
      </View>
      <Modal visible={showAdd} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <Row justify="space-between" align="center" style={styles.modalHeader}>
            <Text style={styles.modalTitle}>ADD TASK</Text>
            <TouchableOpacity onPress={() => setShowAdd(false)}><Text style={styles.modalClose}>✕ CANCEL</Text></TouchableOpacity>
          </Row>
          <View style={styles.modalContent}>
            <Input label="TASK TITLE *" value={form.title} onChangeText={v => setForm(p => ({ ...p, title: v }))} placeholder="e.g. Design homepage mockup" />
            <Input label="DESCRIPTION" value={form.description} onChangeText={v => setForm(p => ({ ...p, description: v }))} placeholder="Details..." multiline />
            <Input label="ASSIGN TO" value={form.assignedToName} onChangeText={v => setForm(p => ({ ...p, assignedToName: v }))} placeholder="Team member name" />
            <Text style={styles.pickLabel}>PRIORITY</Text>
            <View style={styles.priorityRow}>
              {PRIORITY.map(p => (
                <TouchableOpacity key={p} style={[styles.priChip, form.priority === p && { backgroundColor: priorityColor(p), borderColor: priorityColor(p) }]} onPress={() => setForm(prev => ({ ...prev, priority: p }))}>
                  <Text style={[styles.priChipText, form.priority === p && styles.priChipTextActive]}>{p.toUpperCase()}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Button label={addMutation.isPending ? 'ADDING...' : 'ADD TASK'} onPress={() => { if (!form.title.trim()) { Alert.alert('Error', 'Title required'); return; } addMutation.mutate(form); }} loading={addMutation.isPending} fullWidth size="lg" style={{ marginTop: Spacing.base }} />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.base, paddingBottom: 0 },
  filterRow: { flexDirection: 'row', gap: 6, marginBottom: Spacing.sm, flexWrap: 'wrap' },
  chip: { paddingHorizontal: 10, paddingVertical: 5, borderWidth: Border.width, borderColor: Colors.border },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { fontSize: Typography.xs, fontWeight: Typography.bold, color: Colors.foreground, letterSpacing: 0.5 },
  chipTextActive: { color: Colors.white },
  count: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.mutedForeground, letterSpacing: 0.5 },
  addBtn: { backgroundColor: Colors.secondary, borderWidth: Border.widthBold, borderColor: Colors.black, paddingHorizontal: 14, paddingVertical: 6, ...Shadows.sm },
  addBtnText: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.white, letterSpacing: 0.5 },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  checkbox: { width: 24, height: 24, borderWidth: Border.widthBold, borderColor: Colors.border, marginRight: Spacing.sm, marginTop: 2, alignItems: 'center', justifyContent: 'center' },
  checkboxDone: { backgroundColor: Colors.success, borderColor: Colors.success },
  checkmark: { color: Colors.white, fontSize: 14, fontWeight: Typography.black },
  taskContent: { flex: 1 },
  taskTitle: { fontSize: Typography.base, fontWeight: Typography.black, color: Colors.foreground },
  taskTitleDone: { textDecorationLine: 'line-through', color: Colors.mutedForeground },
  taskDesc: { fontSize: Typography.sm, color: Colors.mutedForeground, fontWeight: Typography.medium, marginTop: 2, lineHeight: 18 },
  assigned: { fontSize: Typography.xs, color: Colors.primary, fontWeight: Typography.bold, marginTop: 4 },
  priorityBadge: { paddingHorizontal: 6, paddingVertical: 2, borderWidth: 1, borderColor: Colors.border },
  priorityText: { fontSize: Typography.xs, fontWeight: Typography.black, color: Colors.white, letterSpacing: 0.5 },
  modal: { flex: 1, backgroundColor: Colors.background },
  modalHeader: { padding: Spacing.base, borderBottomWidth: Border.widthBold, borderBottomColor: Colors.border },
  modalTitle: { fontSize: Typography['2xl'], fontWeight: Typography.black, color: Colors.foreground, letterSpacing: 1 },
  modalClose: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.destructive, letterSpacing: 0.5 },
  modalContent: { padding: Spacing.base },
  pickLabel: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.foreground, letterSpacing: 0.5, marginBottom: 8 },
  priorityRow: { flexDirection: 'row', gap: 8, marginBottom: Spacing.base },
  priChip: { paddingHorizontal: 12, paddingVertical: 8, borderWidth: Border.width, borderColor: Colors.border, flex: 1, alignItems: 'center' },
  priChipText: { fontSize: Typography.xs, fontWeight: Typography.black, color: Colors.foreground, letterSpacing: 0.5 },
  priChipTextActive: { color: Colors.white },
});

export default TasksScreen;
