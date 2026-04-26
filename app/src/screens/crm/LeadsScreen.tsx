import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  Modal, Alert, RefreshControl, TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leadsAPI } from '../../api';
import { Card, Row, StatusBadge, SearchBar, Button, Input, EmptyState, LoadingSpinner } from '../../components/common';
import { Colors, Typography, Spacing, Shadows, Border } from '../../theme';
import { CRMStackParams } from '../../navigation/types';

type Nav = NativeStackNavigationProp<CRMStackParams>;

const STATUS_OPTIONS = ['not called', 'called', 'interested', 'not interested', 'meeting booked', 'call back later', 'other'];

const LeadsScreen = () => {
  const navigation = useNavigation<Nav>();
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAdd, setShowAdd] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', phone: '', project: '', status: 'not called' as string });
  const [refreshing, setRefreshing] = useState(false);

  const { data: leads = [], isLoading, refetch } = useQuery({
    queryKey: ['leads'],
    queryFn: () => leadsAPI.getAll().then(r => r.data),
  });

  const addMutation = useMutation({
    mutationFn: (data: any) => leadsAPI.create(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['leads'] }); setShowAdd(false); setNewLead({ name: '', phone: '', project: '', status: 'not called' }); },
    onError: () => Alert.alert('Error', 'Failed to add lead'),
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const filtered = Array.isArray(leads)
    ? leads.filter((l: any) => {
        const matchesSearch = !search || l.name?.toLowerCase().includes(search.toLowerCase()) || l.phone?.includes(search);
        const matchesStatus = filterStatus === 'all' || l.status === filterStatus;
        return matchesSearch && matchesStatus;
      })
    : [];

  if (isLoading) return <LoadingSpinner />;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        {}
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search leads..." />

        {}
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.filterChip, filterStatus === 'all' && styles.filterChipActive]}
            onPress={() => setFilterStatus('all')}>
            <Text style={[styles.filterText, filterStatus === 'all' && styles.filterTextActive]}>ALL</Text>
          </TouchableOpacity>
          {STATUS_OPTIONS.slice(0, 4).map(s => (
            <TouchableOpacity
              key={s}
              style={[styles.filterChip, filterStatus === s && styles.filterChipActive]}
              onPress={() => setFilterStatus(s)}>
              <Text style={[styles.filterText, filterStatus === s && styles.filterTextActive]}>{s.toUpperCase().slice(0, 6)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {}
        <Row justify="space-between" align="center" style={{ marginBottom: Spacing.sm }}>
          <Text style={styles.countLabel}>{filtered.length} LEADS</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => setShowAdd(true)}>
            <Text style={styles.addBtnText}>+ ADD</Text>
          </TouchableOpacity>
        </Row>

        <FlatList
          data={filtered}
          keyExtractor={(item) => String(item._id || item.id)}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
          ListEmptyComponent={<EmptyState title="No Leads" subtitle="Add your first lead" action={{ label: '+ Add Lead', onPress: () => setShowAdd(true) }} />}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('LeadDetail', { id: String(item._id || item.id) })} activeOpacity={0.85}>
              <Card style={styles.card} shadow="sm">
                <Row justify="space-between" align="flex-start">
                  <View style={styles.cardLeft}>
                    <Text style={styles.leadName}>{item.name}</Text>
                    {item.phone ? <Text style={styles.leadPhone}>{item.phone}</Text> : null}
                    {item.project ? <Text style={styles.leadProject}>{item.project}</Text> : null}
                    {item.source ? <Text style={styles.leadSource}>via {item.source}</Text> : null}
                  </View>
                  <View style={styles.cardRight}>
                    <StatusBadge status={item.status || 'not called'} />
                    {item.assignedToName ? (
                      <Text style={styles.assignedTo}>{item.assignedToName}</Text>
                    ) : null}
                  </View>
                </Row>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>

      {}
      <Modal visible={showAdd} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <Row justify="space-between" align="center" style={styles.modalHeader}>
            <Text style={styles.modalTitle}>ADD LEAD</Text>
            <TouchableOpacity onPress={() => setShowAdd(false)}>
              <Text style={styles.modalClose}>✕ CANCEL</Text>
            </TouchableOpacity>
          </Row>
          <View style={styles.modalContent}>
            <Input label="NAME *" value={newLead.name} onChangeText={v => setNewLead(p => ({ ...p, name: v }))} placeholder="Lead name" />
            <Input label="PHONE" value={newLead.phone} onChangeText={v => setNewLead(p => ({ ...p, phone: v }))} placeholder="+91 98765 43210" keyboardType="phone-pad" />
            <Input label="PROJECT / SERVICE" value={newLead.project} onChangeText={v => setNewLead(p => ({ ...p, project: v }))} placeholder="e.g. Website Development" />
            <Text style={styles.pickLabel}>STATUS</Text>
            <View style={styles.statusPicker}>
              {STATUS_OPTIONS.map(s => (
                <TouchableOpacity
                  key={s}
                  style={[styles.statusOption, newLead.status === s && styles.statusOptionActive]}
                  onPress={() => setNewLead(p => ({ ...p, status: s }))}>
                  <Text style={[styles.statusOptionText, newLead.status === s && styles.statusOptionTextActive]}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Button
              label={addMutation.isPending ? 'ADDING...' : 'ADD LEAD'}
              onPress={() => { if (!newLead.name.trim()) { Alert.alert('Error', 'Name is required'); return; } addMutation.mutate(newLead); }}
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
  filterRow: { flexDirection: 'row', gap: 6, marginBottom: Spacing.sm, flexWrap: 'wrap' },
  filterChip: {
    paddingHorizontal: 10, paddingVertical: 5,
    borderWidth: Border.width, borderColor: Colors.border,
  },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterText: { fontSize: Typography.xs, fontWeight: Typography.bold, color: Colors.foreground, letterSpacing: 0.5 },
  filterTextActive: { color: Colors.white },
  countLabel: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.mutedForeground, letterSpacing: 0.5 },
  addBtn: {
    backgroundColor: Colors.secondary, borderWidth: Border.widthBold, borderColor: Colors.black,
    paddingHorizontal: 14, paddingVertical: 6, ...Shadows.sm,
  },
  addBtnText: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.white, letterSpacing: 0.5 },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  cardLeft: { flex: 1 },
  cardRight: { alignItems: 'flex-end', gap: 6 },
  leadName: { fontSize: Typography.base, fontWeight: Typography.black, color: Colors.foreground },
  leadPhone: { fontSize: Typography.sm, color: Colors.mutedForeground, fontWeight: Typography.medium, marginTop: 2 },
  leadProject: { fontSize: Typography.sm, color: Colors.primary, fontWeight: Typography.bold, marginTop: 2 },
  leadSource: { fontSize: Typography.xs, color: Colors.gray500, fontWeight: Typography.medium, marginTop: 2 },
  assignedTo: { fontSize: Typography.xs, color: Colors.accent, fontWeight: Typography.bold, marginTop: 4 },
  modal: { flex: 1, backgroundColor: Colors.background },
  modalHeader: { padding: Spacing.base, borderBottomWidth: Border.widthBold, borderBottomColor: Colors.border },
  modalTitle: { fontSize: Typography['2xl'], fontWeight: Typography.black, color: Colors.foreground, letterSpacing: 1 },
  modalClose: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.destructive, letterSpacing: 0.5 },
  modalContent: { padding: Spacing.base },
  pickLabel: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.foreground, letterSpacing: 0.5, marginBottom: 8 },
  statusPicker: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: Spacing.sm },
  statusOption: { paddingHorizontal: 10, paddingVertical: 6, borderWidth: Border.width, borderColor: Colors.border },
  statusOptionActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  statusOptionText: { fontSize: Typography.xs, fontWeight: Typography.bold, color: Colors.foreground, textTransform: 'capitalize' },
  statusOptionTextActive: { color: Colors.white },
});

export default LeadsScreen;
