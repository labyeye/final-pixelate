import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/client';
import { Card, Row, Button, Input, EmptyState, LoadingSpinner } from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';

const AnnouncementsScreen = () => {
  const qc = useQueryClient();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ text: '', link: '', isActive: true });

  const { data: announcements = [], isLoading } = useQuery({ queryKey: ['announcements'], queryFn: () => api.get('/announcement').then(r => r.data) });

  const addMutation = useMutation({
    mutationFn: (data: any) => api.post('/announcement', data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['announcements'] }); setShowAdd(false); setForm({ text: '', link: '', isActive: true }); },
    onError: () => Alert.alert('Error', 'Failed to add announcement'),
  });

  if (isLoading) return <LoadingSpinner />;
  const items = Array.isArray(announcements) ? announcements : (announcements ? [announcements] : []);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <Row justify="space-between" align="center" style={{ marginBottom: Spacing.base }}>
          <Text style={styles.count}>{items.length} ANNOUNCEMENTS</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => setShowAdd(true)}>
            <Text style={styles.addBtnText}>+ ADD</Text>
          </TouchableOpacity>
        </Row>
        <FlatList
          data={items}
          keyExtractor={(item, i) => String(item._id || i)}
          ListEmptyComponent={<EmptyState title="No Announcements" subtitle="Website announcement bar messages" action={{ label: '+ Add Announcement', onPress: () => setShowAdd(true) }} />}
          renderItem={({ item }) => (
            <Card style={[styles.card, { borderLeftColor: item.isActive ? Colors.success : Colors.gray400, borderLeftWidth: 4 }]} shadow="sm">
              <Row justify="space-between" align="flex-start">
                <View style={styles.left}>
                  <Text style={styles.text}>{item.text}</Text>
                  {item.link ? <Text style={styles.link}>{item.link}</Text> : null}
                </View>
                <View style={[styles.activeBadge, { backgroundColor: item.isActive ? Colors.success : Colors.gray400 }]}>
                  <Text style={styles.activeBadgeText}>{item.isActive ? 'ACTIVE' : 'OFF'}</Text>
                </View>
              </Row>
            </Card>
          )}
        />
      </View>
      <Modal visible={showAdd} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <Row justify="space-between" align="center" style={styles.modalHeader}>
            <Text style={styles.modalTitle}>ADD ANNOUNCEMENT</Text>
            <TouchableOpacity onPress={() => setShowAdd(false)}><Text style={styles.modalClose}>✕ CANCEL</Text></TouchableOpacity>
          </Row>
          <View style={styles.modalContent}>
            <Input label="ANNOUNCEMENT TEXT *" value={form.text} onChangeText={v => setForm(p => ({ ...p, text: v }))} placeholder="e.g. 🎉 Special offer this month!" multiline />
            <Input label="LINK (optional)" value={form.link} onChangeText={v => setForm(p => ({ ...p, link: v }))} placeholder="https://..." keyboardType="url" autoCapitalize="none" />
            <Button label={addMutation.isPending ? 'ADDING...' : 'ADD ANNOUNCEMENT'} onPress={() => { if (!form.text.trim()) { Alert.alert('Error', 'Text required'); return; } addMutation.mutate(form); }} loading={addMutation.isPending} fullWidth size="lg" style={{ marginTop: Spacing.base }} />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.base, paddingBottom: 0 },
  count: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.mutedForeground, letterSpacing: 0.5 },
  addBtn: { backgroundColor: Colors.secondary, borderWidth: Border.widthBold, borderColor: Colors.black, paddingHorizontal: 14, paddingVertical: 6, ...Shadows.sm },
  addBtnText: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.white, letterSpacing: 0.5 },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  left: { flex: 1 },
  text: { fontSize: Typography.base, fontWeight: Typography.black, color: Colors.foreground },
  link: { fontSize: Typography.sm, color: Colors.primary, fontWeight: Typography.medium, marginTop: 4 },
  activeBadge: { paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1, borderColor: Colors.border },
  activeBadgeText: { fontSize: Typography.xs, fontWeight: Typography.black, color: Colors.white, letterSpacing: 0.5 },
  modal: { flex: 1, backgroundColor: Colors.background },
  modalHeader: { padding: Spacing.base, borderBottomWidth: Border.widthBold, borderBottomColor: Colors.border },
  modalTitle: { fontSize: Typography['2xl'], fontWeight: Typography.black, color: Colors.foreground, letterSpacing: 1 },
  modalClose: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.destructive, letterSpacing: 0.5 },
  modalContent: { padding: Spacing.base },
});

export default AnnouncementsScreen;
