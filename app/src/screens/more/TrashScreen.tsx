import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { trashAPI } from '../../api';
import { Card, Row, LoadingSpinner, EmptyState, SearchBar } from '../../components/common';
import { Colors, Typography, Spacing, Border } from '../../theme';
import { format } from 'date-fns';

const COLLECTION_COLORS: Record<string, string> = {
  invoices: Colors.primary,
  leads: Colors.warning,
  clients: Colors.success,
  quotations: Colors.accent,
  projects: Colors.secondary,
  tasks: '#EC4899',
  expenses: Colors.destructive,
  emi: Colors.secondary,
  inventory: '#0D9488',
  blogs: '#65A30D',
  reels: '#F43F5E',
  photoGalleries: '#F59E0B',
  workGallery: '#7C3AED',
};

const summarize = (item: any): string => {
  const doc = item.document || {};
  return doc.title ?? doc.name ?? doc.email ?? doc.invoiceNo ?? doc.quotationNo ?? doc.subject ?? item._originalId ?? '—';
};

const TrashScreen = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');

  const { data: trashItems = [], isLoading } = useQuery({
    queryKey: ['trash'],
    queryFn: () => trashAPI.getAll().then(r => r.data),
  });

  const restoreMutation = useMutation({
    mutationFn: (id: string) => trashAPI.restore(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['trash'] }),
    onError: () => Alert.alert('Error', 'Restore failed'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => trashAPI.deletePermanently(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['trash'] }),
    onError: () => Alert.alert('Error', 'Delete failed'),
  });

  const handleRestore = (item: any) => {
    Alert.alert('Restore', `Restore this ${item.collectionLabel || item.originalCollection}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Restore', onPress: () => restoreMutation.mutate(item._id) },
    ]);
  };

  const handleDelete = (item: any) => {
    Alert.alert('Delete Permanently', 'This cannot be undone. Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete Forever', style: 'destructive', onPress: () => deleteMutation.mutate(item._id) },
    ]);
  };

  if (isLoading) return <LoadingSpinner />;

  const list = Array.isArray(trashItems) ? trashItems.filter((item: any) => {
    if (!search) return true;
    const summary = summarize(item).toLowerCase();
    return summary.includes(search.toLowerCase()) || (item.collectionLabel || '').toLowerCase().includes(search.toLowerCase());
  }) : [];

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <Card style={styles.warningBanner}>
          <Text style={styles.warningText}>🗑 Items in trash can be restored or permanently deleted</Text>
        </Card>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search trash..." />
        <Text style={styles.count}>{list.length} ITEMS IN TRASH</Text>
        <FlatList
          data={list}
          keyExtractor={(item, i) => String(item._id || i)}
          ListEmptyComponent={<EmptyState title="Trash is Empty" subtitle="Deleted items will appear here" />}
          renderItem={({ item }) => {
            const color = COLLECTION_COLORS[item.originalCollection] || Colors.muted;
            return (
              <Card style={[styles.card, { borderLeftColor: color, borderLeftWidth: 4 }]} shadow="sm">
                <Row justify="space-between" align="flex-start">
                  <View style={styles.info}>
                    <Row align="center" style={{ gap: 6 }}>
                      <View style={[styles.collectionBadge, { backgroundColor: color }]}>
                        <Text style={styles.collectionText}>{(item.collectionLabel || item.originalCollection || 'Item').toUpperCase()}</Text>
                      </View>
                    </Row>
                    <Text style={styles.summary}>{summarize(item)}</Text>
                    {item.deletedAt ? (
                      <Text style={styles.deletedAt}>
                        Deleted {format(new Date(item.deletedAt), 'dd MMM yyyy, HH:mm')}
                      </Text>
                    ) : null}
                  </View>
                  <View style={styles.actions}>
                    <TouchableOpacity style={styles.restoreBtn} onPress={() => handleRestore(item)}>
                      <Text style={styles.restoreBtnText}>↩ RESTORE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.delBtn} onPress={() => handleDelete(item)}>
                      <Text style={styles.delBtnText}>✕ DELETE</Text>
                    </TouchableOpacity>
                  </View>
                </Row>
              </Card>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.base, paddingBottom: 0 },
  warningBanner: { padding: Spacing.md, marginBottom: Spacing.sm, borderLeftColor: Colors.warning, borderLeftWidth: 4 },
  warningText: { fontSize: Typography.sm, fontWeight: Typography.bold, color: Colors.foreground },
  count: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.mutedForeground, letterSpacing: 0.5, marginBottom: Spacing.sm },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  info: { flex: 1 },
  collectionBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderWidth: Border.width, borderColor: Colors.black, marginBottom: 4 },
  collectionText: { fontSize: Typography.xs, fontWeight: Typography.black, color: Colors.white, letterSpacing: 0.3 },
  summary: { fontSize: Typography.base, fontWeight: Typography.black, color: Colors.foreground },
  deletedAt: { fontSize: Typography.xs, color: Colors.mutedForeground, fontWeight: Typography.medium, marginTop: 4 },
  actions: { gap: 6, alignItems: 'flex-end' },
  restoreBtn: { paddingHorizontal: 10, paddingVertical: 6, borderWidth: Border.width, borderColor: Colors.success },
  restoreBtnText: { fontSize: Typography.xs, fontWeight: Typography.black, color: Colors.success },
  delBtn: { paddingHorizontal: 10, paddingVertical: 6, borderWidth: Border.width, borderColor: Colors.destructive },
  delBtnText: { fontSize: Typography.xs, fontWeight: Typography.black, color: Colors.destructive },
});

export default TrashScreen;
