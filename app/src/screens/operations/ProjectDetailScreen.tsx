import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsAPI } from '../../api';
import { Card, Row, StatusBadge, Button, Divider, LoadingSpinner, Input } from '../../components/common';
import { Colors, Typography, Spacing, Border } from '../../theme';
import { OperationsStackParams } from '../../navigation/types';

type Route = RouteProp<OperationsStackParams, 'ProjectDetail'>;
const STATUS_OPTS = ['active', 'in progress', 'completed', 'on hold', 'cancelled'];

const ProjectDetailScreen = () => {
  const { params } = useRoute<Route>();
  const qc = useQueryClient();
  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState<any>({});

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', params.id],
    queryFn: () => projectsAPI.getById(params.id).then(r => r.data),
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => projectsAPI.update(params.id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['projects'] }); qc.invalidateQueries({ queryKey: ['project', params.id] }); setShowEdit(false); },
    onError: () => Alert.alert('Error', 'Update failed'),
  });

  const deleteMutation = useMutation({
    mutationFn: () => projectsAPI.delete(params.id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
    onError: () => Alert.alert('Error', 'Delete failed'),
  });

  if (isLoading) return <LoadingSpinner />;
  if (!project) return <View style={styles.center}><Text>Project not found</Text></View>;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={[styles.heroCard, { borderLeftColor: Colors.primary, borderLeftWidth: 6 }]} shadow="lg">
          <Row justify="space-between" align="flex-start">
            <View style={{ flex: 1 }}>
              <Text style={styles.heroName}>{project.name}</Text>
              {project.clientName ? <Text style={styles.clientName}>{project.clientName}</Text> : null}
            </View>
            <StatusBadge status={project.status || 'active'} />
          </Row>
          {project.description ? <Text style={styles.desc}>{project.description}</Text> : null}
        </Card>

        <Card style={styles.detailCard}>
          <Text style={styles.sectionTitle}>PROJECT DETAILS</Text>
          <Divider style={{ marginVertical: Spacing.sm }} />
          {[
            { label: 'Start Date', value: project.startDate },
            { label: 'End Date', value: project.endDate },
            { label: 'Budget', value: project.budget ? `₹${project.budget}` : undefined },
            { label: 'Team Lead', value: project.teamLead },
          ].filter(r => r.value).map(row => (
            <Row key={row.label} justify="space-between" style={styles.detailRow}>
              <Text style={styles.detailLabel}>{row.label}</Text>
              <Text style={styles.detailValue}>{row.value}</Text>
            </Row>
          ))}
        </Card>

        <Card style={styles.actionsCard}>
          <Text style={styles.sectionTitle}>ACTIONS</Text>
          <Divider style={{ marginVertical: Spacing.sm }} />
          <Button label="EDIT PROJECT" onPress={() => { setEditForm({ status: project.status, description: project.description }); setShowEdit(true); }} fullWidth style={{ marginBottom: Spacing.sm }} />
          <Button label="DELETE PROJECT" variant="destructive" loading={deleteMutation.isPending}
            onPress={() => Alert.alert('Delete', 'Cannot be undone', [{ text: 'Cancel', style: 'cancel' }, { text: 'Delete', style: 'destructive', onPress: () => deleteMutation.mutate() }])}
            fullWidth />
        </Card>
      </ScrollView>

      <Modal visible={showEdit} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <Row justify="space-between" align="center" style={styles.modalHeader}>
            <Text style={styles.modalTitle}>EDIT PROJECT</Text>
            <TouchableOpacity onPress={() => setShowEdit(false)}><Text style={styles.modalClose}>✕</Text></TouchableOpacity>
          </Row>
          <View style={styles.modalContent}>
            <Text style={styles.pickLabel}>STATUS</Text>
            <View style={styles.statusGrid}>
              {STATUS_OPTS.map(s => (
                <TouchableOpacity key={s} style={[styles.statusChip, editForm.status === s && styles.statusChipActive]} onPress={() => setEditForm((p: any) => ({ ...p, status: s }))}>
                  <Text style={[styles.statusChipText, editForm.status === s && styles.statusChipTextActive]}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Input label="DESCRIPTION" value={editForm.description || ''} onChangeText={v => setEditForm((p: any) => ({ ...p, description: v }))} multiline />
            <Button label={updateMutation.isPending ? 'SAVING...' : 'SAVE'} onPress={() => updateMutation.mutate(editForm)} loading={updateMutation.isPending} fullWidth size="lg" />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { padding: Spacing.base, paddingBottom: 24 },
  heroCard: { padding: Spacing.lg, marginBottom: Spacing.sm },
  heroName: { fontSize: Typography['2xl'], fontWeight: Typography.black, color: Colors.foreground, letterSpacing: -0.5 },
  clientName: { fontSize: Typography.base, color: Colors.primary, fontWeight: Typography.bold, marginTop: 4 },
  desc: { fontSize: Typography.sm, color: Colors.mutedForeground, fontWeight: Typography.medium, marginTop: Spacing.sm, lineHeight: 20 },
  detailCard: { padding: Spacing.md, marginBottom: Spacing.sm },
  actionsCard: { padding: Spacing.md },
  sectionTitle: { fontSize: Typography.xs, fontWeight: Typography.black, color: Colors.mutedForeground, letterSpacing: 1.5 },
  detailRow: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: Colors.gray200 },
  detailLabel: { fontSize: Typography.sm, fontWeight: Typography.semiBold, color: Colors.mutedForeground },
  detailValue: { fontSize: Typography.sm, fontWeight: Typography.bold, color: Colors.foreground, flex: 1, textAlign: 'right' },
  modal: { flex: 1, backgroundColor: Colors.background },
  modalHeader: { padding: Spacing.base, borderBottomWidth: Border.widthBold, borderBottomColor: Colors.border },
  modalTitle: { fontSize: Typography.xl, fontWeight: Typography.black, color: Colors.foreground, letterSpacing: 1 },
  modalClose: { fontSize: Typography.xl, fontWeight: Typography.black, color: Colors.destructive },
  modalContent: { padding: Spacing.base },
  pickLabel: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.foreground, letterSpacing: 0.5, marginBottom: 8 },
  statusGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: Spacing.base },
  statusChip: { paddingHorizontal: 12, paddingVertical: 8, borderWidth: Border.width, borderColor: Colors.border },
  statusChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  statusChipText: { fontSize: Typography.sm, fontWeight: Typography.bold, color: Colors.foreground, textTransform: 'capitalize' },
  statusChipTextActive: { color: Colors.white },
});

export default ProjectDetailScreen;
