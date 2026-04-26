import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leadsAPI } from '../../api';
import { Card, Row, StatusBadge, Button, Divider, LoadingSpinner, Input } from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';
import { CRMStackParams } from '../../navigation/types';

type Route = RouteProp<CRMStackParams, 'LeadDetail'>;

const STATUS_OPTIONS = ['not called', 'called', 'interested', 'not interested', 'meeting booked', 'call back later', 'other'];

const LeadDetailScreen = () => {
  const { params } = useRoute<Route>();
  const qc = useQueryClient();
  const [showEdit, setShowEdit] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [statusReason, setStatusReason] = useState('');

  const { data: lead, isLoading } = useQuery({
    queryKey: ['lead', params.id],
    queryFn: () => leadsAPI.getById(params.id).then(r => r.data),
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => leadsAPI.update(params.id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['leads'] });
      qc.invalidateQueries({ queryKey: ['lead', params.id] });
      setShowEdit(false);
    },
    onError: () => Alert.alert('Error', 'Update failed'),
  });

  const deleteMutation = useMutation({
    mutationFn: () => leadsAPI.delete(params.id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['leads'] });
    },
    onError: () => Alert.alert('Error', 'Delete failed'),
  });

  if (isLoading) return <LoadingSpinner />;
  if (!lead) return <View style={styles.center}><Text>Lead not found</Text></View>;

  const handleStatusUpdate = () => {
    updateMutation.mutate({ status: selectedStatus, statusReason });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        {}
        <Card style={styles.heroCard} shadow="lg">
          <Row justify="space-between" align="flex-start">
            <View style={styles.heroLeft}>
              <Text style={styles.heroName}>{lead.name}</Text>
              {lead.phone ? <Text style={styles.heroPhone}>{lead.phone}</Text> : null}
              {lead.email ? <Text style={styles.heroEmail}>{lead.email}</Text> : null}
            </View>
            <StatusBadge status={lead.status || 'not called'} />
          </Row>
          {lead.project ? (
            <View style={styles.projectTag}>
              <Text style={styles.projectTagText}>{lead.project}</Text>
            </View>
          ) : null}
        </Card>

        {}
        <Card style={styles.detailCard}>
          <Text style={styles.sectionLabel}>LEAD DETAILS</Text>
          <Divider style={{ marginVertical: Spacing.sm }} />
          {[
            { label: 'Source', value: lead.source },
            { label: 'Budget', value: lead.budget ? `₹${lead.budget}` : undefined },
            { label: 'Assigned To', value: lead.assignedToName },
            { label: 'Status Reason', value: lead.statusReason },
            { label: 'Subject', value: lead.subject },
          ].filter(r => r.value).map(row => (
            <Row key={row.label} justify="space-between" style={styles.detailRow}>
              <Text style={styles.detailLabel}>{row.label}</Text>
              <Text style={styles.detailValue}>{row.value}</Text>
            </Row>
          ))}
          {lead.message ? (
            <>
              <Text style={styles.messageLabel}>MESSAGE</Text>
              <Text style={styles.messageText}>{lead.message}</Text>
            </>
          ) : null}
        </Card>

        {}
        <Card style={styles.actionsCard}>
          <Text style={styles.sectionLabel}>ACTIONS</Text>
          <Divider style={{ marginVertical: Spacing.sm }} />
          <Button label="UPDATE STATUS" onPress={() => { setSelectedStatus(lead.status || 'not called'); setShowEdit(true); }} fullWidth style={{ marginBottom: Spacing.sm }} />
          <Button
            label="DELETE LEAD"
            variant="destructive"
            onPress={() => Alert.alert('Delete Lead', 'This cannot be undone.', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Delete', style: 'destructive', onPress: () => deleteMutation.mutate() },
            ])}
            fullWidth
            loading={deleteMutation.isPending}
          />
        </Card>
      </ScrollView>

      {}
      <Modal visible={showEdit} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <Row justify="space-between" align="center" style={styles.modalHeader}>
            <Text style={styles.modalTitle}>UPDATE STATUS</Text>
            <TouchableOpacity onPress={() => setShowEdit(false)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </Row>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.pickLabel}>SELECT STATUS</Text>
            <View style={styles.statusGrid}>
              {STATUS_OPTIONS.map(s => (
                <TouchableOpacity
                  key={s}
                  style={[styles.statusOption, selectedStatus === s && styles.statusOptionActive]}
                  onPress={() => setSelectedStatus(s)}>
                  <Text style={[styles.statusOptionText, selectedStatus === s && styles.statusOptionTextActive]}>
                    {s}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Input
              label="REASON / NOTE"
              value={statusReason}
              onChangeText={setStatusReason}
              placeholder="Add a note about this status change..."
              multiline
            />
            <Button
              label={updateMutation.isPending ? 'SAVING...' : 'SAVE STATUS'}
              onPress={handleStatusUpdate}
              loading={updateMutation.isPending}
              fullWidth
              size="lg"
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { padding: Spacing.base, paddingBottom: 24 },
  heroCard: { padding: Spacing.lg, marginBottom: Spacing.sm, borderLeftWidth: 6, borderLeftColor: Colors.secondary },
  heroLeft: { flex: 1 },
  heroName: { fontSize: Typography['2xl'], fontWeight: Typography.black, color: Colors.foreground, letterSpacing: -0.5 },
  heroPhone: { fontSize: Typography.base, color: Colors.primary, fontWeight: Typography.bold, marginTop: 4 },
  heroEmail: { fontSize: Typography.sm, color: Colors.mutedForeground, fontWeight: Typography.medium, marginTop: 2 },
  projectTag: {
    marginTop: Spacing.sm, alignSelf: 'flex-start',
    backgroundColor: Colors.primary, borderWidth: Border.width, borderColor: Colors.border,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  projectTagText: { color: Colors.white, fontSize: Typography.xs, fontWeight: Typography.black, letterSpacing: 0.5 },
  detailCard: { padding: Spacing.md, marginBottom: Spacing.sm },
  actionsCard: { padding: Spacing.md },
  sectionLabel: { fontSize: Typography.xs, fontWeight: Typography.black, color: Colors.mutedForeground, letterSpacing: 1.5 },
  detailRow: { paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: Colors.gray200 },
  detailLabel: { fontSize: Typography.sm, fontWeight: Typography.semiBold, color: Colors.mutedForeground },
  detailValue: { fontSize: Typography.sm, fontWeight: Typography.bold, color: Colors.foreground, flex: 1, textAlign: 'right' },
  messageLabel: { fontSize: Typography.xs, fontWeight: Typography.black, color: Colors.mutedForeground, letterSpacing: 1, marginTop: Spacing.sm, marginBottom: 4 },
  messageText: { fontSize: Typography.sm, color: Colors.foreground, fontWeight: Typography.medium, lineHeight: 20 },
  modal: { flex: 1, backgroundColor: Colors.background },
  modalHeader: { padding: Spacing.base, borderBottomWidth: Border.widthBold, borderBottomColor: Colors.border },
  modalTitle: { fontSize: Typography.xl, fontWeight: Typography.black, color: Colors.foreground, letterSpacing: 1 },
  modalClose: { fontSize: Typography.xl, fontWeight: Typography.black, color: Colors.destructive },
  modalContent: { padding: Spacing.base },
  pickLabel: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.foreground, letterSpacing: 0.5, marginBottom: 10 },
  statusGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: Spacing.base },
  statusOption: { paddingHorizontal: 12, paddingVertical: 8, borderWidth: Border.width, borderColor: Colors.border },
  statusOptionActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  statusOptionText: { fontSize: Typography.sm, fontWeight: Typography.bold, color: Colors.foreground, textTransform: 'capitalize' },
  statusOptionTextActive: { color: Colors.white },
});

export default LeadDetailScreen;
