import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsAPI, clientsAPI } from '../../api';
import { Card, Row, StatusBadge, SearchBar, Button, Input, EmptyState, LoadingSpinner } from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';
import { OperationsStackParams } from '../../navigation/types';

type Nav = NativeStackNavigationProp<OperationsStackParams>;
const STATUS_OPTS = ['active', 'in progress', 'completed', 'on hold', 'cancelled'];

const ProjectsScreen = () => {
  const navigation = useNavigation<Nav>();
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [showAdd, setShowAdd] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [form, setForm] = useState({ name: '', clientName: '', status: 'active', description: '' });

  const { data: projects = [], isLoading, refetch } = useQuery({ queryKey: ['projects'], queryFn: () => projectsAPI.getAll().then(r => r.data) });

  const addMutation = useMutation({
    mutationFn: (data: any) => projectsAPI.create(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['projects'] }); setShowAdd(false); setForm({ name: '', clientName: '', status: 'active', description: '' }); },
    onError: () => Alert.alert('Error', 'Failed to create project'),
  });

  const onRefresh = useCallback(async () => { setRefreshing(true); await refetch(); setRefreshing(false); }, [refetch]);

  const filtered = Array.isArray(projects)
    ? projects.filter((p: any) => {
        const ms = !search || p.name?.toLowerCase().includes(search.toLowerCase()) || p.clientName?.toLowerCase().includes(search.toLowerCase());
        const mf = filter === 'all' || p.status === filter;
        return ms && mf;
      })
    : [];

  if (isLoading) return <LoadingSpinner />;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search projects..." />
        <View style={styles.filterRow}>
          {['all', ...STATUS_OPTS].map(s => (
            <TouchableOpacity key={s} style={[styles.chip, filter === s && styles.chipActive]} onPress={() => setFilter(s)}>
              <Text style={[styles.chipText, filter === s && styles.chipTextActive]}>{s.toUpperCase().slice(0, 7)}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Row justify="space-between" align="center" style={{ marginBottom: Spacing.sm }}>
          <Text style={styles.count}>{filtered.length} PROJECTS</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => setShowAdd(true)}>
            <Text style={styles.addBtnText}>+ ADD</Text>
          </TouchableOpacity>
        </Row>
        <FlatList
          data={filtered}
          keyExtractor={item => String(item._id || item.id)}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
          ListEmptyComponent={<EmptyState title="No Projects" subtitle="Create your first project" action={{ label: '+ Add Project', onPress: () => setShowAdd(true) }} />}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('ProjectDetail', { id: String(item._id || item.id) })} activeOpacity={0.85}>
              <Card style={[styles.card, { borderLeftColor: Colors.primary, borderLeftWidth: 4 }]} shadow="sm">
                <Row justify="space-between" align="flex-start">
                  <View style={styles.cardLeft}>
                    <Text style={styles.projectName}>{item.name}</Text>
                    {item.clientName ? <Text style={styles.clientName}>{item.clientName}</Text> : null}
                    {item.description ? <Text style={styles.desc} numberOfLines={2}>{item.description}</Text> : null}
                  </View>
                  <StatusBadge status={item.status || 'active'} />
                </Row>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
      <Modal visible={showAdd} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <Row justify="space-between" align="center" style={styles.modalHeader}>
            <Text style={styles.modalTitle}>NEW PROJECT</Text>
            <TouchableOpacity onPress={() => setShowAdd(false)}><Text style={styles.modalClose}>✕ CANCEL</Text></TouchableOpacity>
          </Row>
          <View style={styles.modalContent}>
            <Input label="PROJECT NAME *" value={form.name} onChangeText={v => setForm(p => ({ ...p, name: v }))} placeholder="e.g. Website Redesign" />
            <Input label="CLIENT NAME" value={form.clientName} onChangeText={v => setForm(p => ({ ...p, clientName: v }))} placeholder="Client company" />
            <Input label="DESCRIPTION" value={form.description} onChangeText={v => setForm(p => ({ ...p, description: v }))} placeholder="Project details..." multiline />
            <Text style={styles.pickLabel}>STATUS</Text>
            <View style={styles.statusGrid}>
              {STATUS_OPTS.map(s => (
                <TouchableOpacity key={s} style={[styles.statusChip, form.status === s && styles.statusChipActive]} onPress={() => setForm(p => ({ ...p, status: s }))}>
                  <Text style={[styles.statusChipText, form.status === s && styles.statusChipTextActive]}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Button label={addMutation.isPending ? 'CREATING...' : 'CREATE PROJECT'} onPress={() => { if (!form.name.trim()) { Alert.alert('Error', 'Name required'); return; } addMutation.mutate(form); }} loading={addMutation.isPending} fullWidth size="lg" style={{ marginTop: Spacing.base }} />
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
  cardLeft: { flex: 1 },
  projectName: { fontSize: Typography.base, fontWeight: Typography.black, color: Colors.foreground },
  clientName: { fontSize: Typography.sm, color: Colors.primary, fontWeight: Typography.bold, marginTop: 2 },
  desc: { fontSize: Typography.sm, color: Colors.mutedForeground, fontWeight: Typography.medium, marginTop: 4, lineHeight: 18 },
  modal: { flex: 1, backgroundColor: Colors.background },
  modalHeader: { padding: Spacing.base, borderBottomWidth: Border.widthBold, borderBottomColor: Colors.border },
  modalTitle: { fontSize: Typography['2xl'], fontWeight: Typography.black, color: Colors.foreground, letterSpacing: 1 },
  modalClose: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.destructive, letterSpacing: 0.5 },
  modalContent: { padding: Spacing.base },
  pickLabel: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.foreground, letterSpacing: 0.5, marginBottom: 8 },
  statusGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: Spacing.base },
  statusChip: { paddingHorizontal: 12, paddingVertical: 8, borderWidth: Border.width, borderColor: Colors.border },
  statusChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  statusChipText: { fontSize: Typography.sm, fontWeight: Typography.bold, color: Colors.foreground, textTransform: 'capitalize' },
  statusChipTextActive: { color: Colors.white },
});

export default ProjectsScreen;
