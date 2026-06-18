import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leadsAPI, clientsAPI } from '../../api';
import apiClient from '../../api/client';
import {
  Card,
  Row,
  StatusBadge,
  Button,
  Divider,
  LoadingSpinner,
  Input,
} from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';
import { CRMStackParams } from '../../navigation/types';

type Route = RouteProp<CRMStackParams, 'LeadDetail'>;

const STATUS_OPTIONS = [
  'not called',
  'called',
  'interested',
  'not interested',
  'meeting booked',
  'call back later',
  'converted',
  'other',
];

const PRIORITY_OPTIONS = ['low', 'medium', 'high'];

const ACTIVITY_TYPES = ['note', 'call', 'email', 'meeting'];

const PRIORITY_COLORS: Record<string, string> = {
  low: Colors.success,
  medium: Colors.warning,
  high: Colors.destructive,
};

function timeAgo(date: string) {
  const d = new Date(date);
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

const LeadDetailScreen = () => {
  const { params } = useRoute<Route>();
  const navigation = useNavigation();
  const qc = useQueryClient();
  const [showEdit, setShowEdit] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [statusReason, setStatusReason] = useState('');
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [activityType, setActivityType] = useState('note');
  const [activityContent, setActivityContent] = useState('');
  const [showFullEdit, setShowFullEdit] = useState(false);
  const [editForm, setEditForm] = useState<any>({});

  const { data: lead, isLoading } = useQuery({
    queryKey: ['lead', params.id],
    queryFn: () => leadsAPI.getById(params.id).then(r => r.data),
  });

  const { data: activities = [], refetch: refetchActivities } = useQuery({
    queryKey: ['lead-activity', params.id],
    queryFn: () =>
      apiClient.get(`/leads/${params.id}/activity`).then(r => r.data),
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => leadsAPI.update(params.id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['leads'] });
      qc.invalidateQueries({ queryKey: ['lead', params.id] });
      setShowEdit(false);
      setShowFullEdit(false);
    },
    onError: () => Alert.alert('Error', 'Update failed'),
  });

  const deleteMutation = useMutation({
    mutationFn: () => leadsAPI.delete(params.id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['leads'] });
      navigation.goBack();
    },
    onError: () => Alert.alert('Error', 'Delete failed'),
  });

  const activityMutation = useMutation({
    mutationFn: (data: any) =>
      apiClient.post(`/leads/${params.id}/activity`, data),
    onSuccess: () => {
      refetchActivities();
      setShowActivityForm(false);
      setActivityContent('');
      setActivityType('note');
    },
    onError: () => Alert.alert('Error', 'Failed to log activity'),
  });

  const convertMutation = useMutation({
    mutationFn: async () => {
      const clientData = {
        name: lead.name,
        email: lead.email || '',
        phone: lead.phone || '',
        city: lead.city || '',
        status: 'active',
        convertedFromLeadId: params.id,
      };
      const clientRes = await clientsAPI.create(clientData);
      const clientId = String(clientRes.data._id || clientRes.data.id);
      await leadsAPI.update(params.id, {
        status: 'converted',
        convertedToClientId: clientId,
      });
      await apiClient.post(`/leads/${params.id}/activity`, {
        type: 'conversion',
        content: `Lead converted to client (ID: ${clientId})`,
      });
      return clientId;
    },
    onSuccess: (clientId) => {
      qc.invalidateQueries({ queryKey: ['leads'] });
      qc.invalidateQueries({ queryKey: ['lead', params.id] });
      qc.invalidateQueries({ queryKey: ['clients'] });
      Alert.alert('Converted', 'Lead has been converted to a client.', [
        { text: 'OK', onPress: () => navigation.navigate('Clients' as never) },
      ]);
    },
    onError: () => Alert.alert('Error', 'Conversion failed'),
  });

  if (isLoading) return <LoadingSpinner />;
  if (!lead)
    return (
      <View style={styles.center}>
        <Text>Lead not found</Text>
      </View>
    );

  const handleStatusUpdate = () => {
    updateMutation.mutate({ status: selectedStatus, statusReason });
    activityMutation.mutate({
      type: 'status_change',
      content: `Status changed to: ${selectedStatus}`,
    });
  };

  const priorityColor = PRIORITY_COLORS[lead.priority || 'medium'] || Colors.warning;
  const actArr = Array.isArray(activities) ? activities : [];

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.heroCard} shadow="lg">
          <Row justify="space-between" align="flex-start">
            <View style={styles.heroLeft}>
              <Text style={styles.heroName}>{lead.name}</Text>
              {lead.phone ? <Text style={styles.heroPhone}>{lead.phone}</Text> : null}
              {lead.email ? <Text style={styles.heroEmail}>{lead.email}</Text> : null}
              {lead.city ? <Text style={styles.heroCity}>{lead.city}</Text> : null}
            </View>
            <StatusBadge status={lead.status || 'not called'} />
          </Row>
          <Row gap={6} style={{ marginTop: Spacing.sm, flexWrap: 'wrap' }}>
            {lead.priority ? (
              <View style={[styles.priorityBadge, { backgroundColor: priorityColor }]}>
                <Text style={styles.priorityText}>
                  {lead.priority.toUpperCase()} PRIORITY
                </Text>
              </View>
            ) : null}
            {lead.source ? (
              <View style={styles.sourceBadge}>
                <Text style={styles.sourceBadgeText}>{lead.source}</Text>
              </View>
            ) : null}
          </Row>
          {lead.tags?.length > 0 && (
            <Row gap={4} style={{ marginTop: 6, flexWrap: 'wrap' }}>
              {lead.tags.map((tag: string) => (
                <View key={tag} style={styles.tagChip}>
                  <Text style={styles.tagChipText}>#{tag}</Text>
                </View>
              ))}
            </Row>
          )}
          {lead.project ? (
            <View style={styles.projectTag}>
              <Text style={styles.projectTagText}>{lead.project}</Text>
            </View>
          ) : null}
        </Card>

        <Card style={styles.detailCard}>
          <Text style={styles.sectionLabel}>LEAD DETAILS</Text>
          <Divider style={{ marginVertical: Spacing.sm }} />
          {[
            { label: 'Source', value: lead.source },
            { label: 'Budget', value: lead.budget ? `Rs.${lead.budget}` : undefined },
            { label: 'Project Type', value: lead.projectType },
            { label: 'Assigned To', value: lead.assignedToName || lead.assignedTo },
            { label: 'Status Reason', value: lead.statusReason },
            { label: 'Subject', value: lead.subject },
            {
              label: 'Follow-up',
              value: lead.followUpDate
                ? new Date(lead.followUpDate).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })
                : undefined,
            },
            {
              label: 'Created',
              value: lead.createdAt
                ? new Date(lead.createdAt).toLocaleDateString('en-IN')
                : undefined,
            },
          ]
            .filter(r => r.value)
            .map(row => (
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

        <Card style={styles.activitySection}>
          <Row justify="space-between" align="center">
            <Text style={styles.sectionLabel}>ACTIVITY LOG</Text>
            <TouchableOpacity
              style={styles.addActivityBtn}
              onPress={() => setShowActivityForm(true)}
            >
              <Text style={styles.addActivityBtnText}>+ LOG</Text>
            </TouchableOpacity>
          </Row>
          <Divider style={{ marginVertical: Spacing.sm }} />
          {actArr.length === 0 ? (
            <Text style={styles.emptyActivity}>No activities yet. Log a call or note.</Text>
          ) : (
            actArr.map((act: any, i: number) => (
              <View key={String(act._id || i)} style={styles.activityItem}>
                <Row justify="space-between" align="flex-start">
                  <View style={styles.activityIconWrap}>
                    <Text style={styles.activityTypeIcon}>
                      {act.type === 'call'
                        ? 'C'
                        : act.type === 'email'
                        ? 'E'
                        : act.type === 'meeting'
                        ? 'M'
                        : act.type === 'status_change'
                        ? 'S'
                        : act.type === 'conversion'
                        ? 'V'
                        : 'N'}
                    </Text>
                  </View>
                  <View style={{ flex: 1, paddingLeft: 10 }}>
                    <Row justify="space-between">
                      <Text style={styles.activityTypeName}>
                        {(act.type || 'note').toUpperCase()}
                      </Text>
                      <Text style={styles.activityTime}>
                        {act.createdAt ? timeAgo(act.createdAt) : ''}
                      </Text>
                    </Row>
                    {act.createdByName ? (
                      <Text style={styles.activityBy}>{act.createdByName}</Text>
                    ) : null}
                    <Text style={styles.activityContent}>{act.content}</Text>
                  </View>
                </Row>
                {i < actArr.length - 1 && <Divider style={{ marginTop: Spacing.sm }} />}
              </View>
            ))
          )}
        </Card>

        <Card style={styles.actionsCard}>
          <Text style={styles.sectionLabel}>ACTIONS</Text>
          <Divider style={{ marginVertical: Spacing.sm }} />
          <Button
            label="UPDATE STATUS"
            onPress={() => {
              setSelectedStatus(lead.status || 'not called');
              setStatusReason(lead.statusReason || '');
              setShowEdit(true);
            }}
            fullWidth
            style={{ marginBottom: Spacing.sm }}
          />
          <Button
            label="EDIT LEAD"
            variant="outline"
            onPress={() => {
              setEditForm({
                name: lead.name || '',
                phone: lead.phone || '',
                email: lead.email || '',
                city: lead.city || '',
                subject: lead.subject || '',
                projectType: lead.projectType || '',
                budget: lead.budget || '',
                priority: lead.priority || 'medium',
                followUpDate: lead.followUpDate
                  ? String(lead.followUpDate).slice(0, 10)
                  : '',
                tags: (lead.tags || []).join(', '),
                source: lead.source || '',
              });
              setShowFullEdit(true);
            }}
            fullWidth
            style={{ marginBottom: Spacing.sm }}
          />
          {lead.status !== 'converted' && (
            <Button
              label={convertMutation.isPending ? 'CONVERTING...' : 'CONVERT TO CLIENT'}
              onPress={() =>
                Alert.alert(
                  'Convert to Client',
                  `Convert "${lead.name}" to a client? A new client record will be created.`,
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Convert', onPress: () => convertMutation.mutate() },
                  ],
                )
              }
              loading={convertMutation.isPending}
              fullWidth
              style={{ marginBottom: Spacing.sm, backgroundColor: '#059669' }}
            />
          )}
          <Button
            label="DELETE LEAD"
            variant="destructive"
            onPress={() =>
              Alert.alert('Delete Lead', 'This cannot be undone.', [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: () => deleteMutation.mutate(),
                },
              ])
            }
            fullWidth
            loading={deleteMutation.isPending}
          />
        </Card>
      </ScrollView>

      <Modal visible={showEdit} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <Row justify="space-between" align="center" style={styles.modalHeader}>
            <Text style={styles.modalTitle}>UPDATE STATUS</Text>
            <TouchableOpacity onPress={() => setShowEdit(false)}>
              <Text style={styles.modalClose}>CANCEL</Text>
            </TouchableOpacity>
          </Row>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.pickLabel}>SELECT STATUS</Text>
            <View style={styles.statusGrid}>
              {STATUS_OPTIONS.map(s => (
                <TouchableOpacity
                  key={s}
                  style={[
                    styles.statusOption,
                    selectedStatus === s && styles.statusOptionActive,
                  ]}
                  onPress={() => setSelectedStatus(s)}
                >
                  <Text
                    style={[
                      styles.statusOptionText,
                      selectedStatus === s && styles.statusOptionTextActive,
                    ]}
                  >
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

      <Modal visible={showActivityForm} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <Row justify="space-between" align="center" style={styles.modalHeader}>
            <Text style={styles.modalTitle}>LOG ACTIVITY</Text>
            <TouchableOpacity onPress={() => setShowActivityForm(false)}>
              <Text style={styles.modalClose}>CANCEL</Text>
            </TouchableOpacity>
          </Row>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.pickLabel}>ACTIVITY TYPE</Text>
            <View style={styles.statusGrid}>
              {ACTIVITY_TYPES.map(t => (
                <TouchableOpacity
                  key={t}
                  style={[styles.statusOption, activityType === t && styles.statusOptionActive]}
                  onPress={() => setActivityType(t)}
                >
                  <Text style={[styles.statusOptionText, activityType === t && styles.statusOptionTextActive]}>
                    {t.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Input
              label="CONTENT"
              value={activityContent}
              onChangeText={setActivityContent}
              placeholder={`Log a ${activityType}...`}
              multiline
            />
            <Button
              label={activityMutation.isPending ? 'LOGGING...' : 'LOG ACTIVITY'}
              onPress={() => {
                if (!activityContent.trim()) {
                  Alert.alert('Error', 'Content is required');
                  return;
                }
                activityMutation.mutate({ type: activityType, content: activityContent });
              }}
              loading={activityMutation.isPending}
              fullWidth
              size="lg"
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <Modal visible={showFullEdit} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <Row justify="space-between" align="center" style={styles.modalHeader}>
            <Text style={styles.modalTitle}>EDIT LEAD</Text>
            <TouchableOpacity onPress={() => setShowFullEdit(false)}>
              <Text style={styles.modalClose}>CANCEL</Text>
            </TouchableOpacity>
          </Row>
          <ScrollView style={styles.modalContent}>
            <Input label="NAME" value={editForm.name} onChangeText={v => setEditForm((f: any) => ({ ...f, name: v }))} placeholder="Full name" />
            <Input label="PHONE" value={editForm.phone} onChangeText={v => setEditForm((f: any) => ({ ...f, phone: v }))} placeholder="Phone number" />
            <Input label="EMAIL" value={editForm.email} onChangeText={v => setEditForm((f: any) => ({ ...f, email: v }))} placeholder="Email address" />
            <Input label="CITY" value={editForm.city} onChangeText={v => setEditForm((f: any) => ({ ...f, city: v }))} placeholder="City" />
            <Input label="SUBJECT" value={editForm.subject} onChangeText={v => setEditForm((f: any) => ({ ...f, subject: v }))} placeholder="Lead subject" />
            <Input label="PROJECT TYPE" value={editForm.projectType} onChangeText={v => setEditForm((f: any) => ({ ...f, projectType: v }))} placeholder="e.g. Website, App" />
            <Input label="BUDGET" value={editForm.budget} onChangeText={v => setEditForm((f: any) => ({ ...f, budget: v }))} placeholder="Budget amount" />
            <Input label="SOURCE" value={editForm.source} onChangeText={v => setEditForm((f: any) => ({ ...f, source: v }))} placeholder="e.g. Instagram, Referral" />
            <Input label="FOLLOW-UP DATE (YYYY-MM-DD)" value={editForm.followUpDate} onChangeText={v => setEditForm((f: any) => ({ ...f, followUpDate: v }))} placeholder="2025-03-15" />
            <Input label="TAGS (comma separated)" value={editForm.tags} onChangeText={v => setEditForm((f: any) => ({ ...f, tags: v }))} placeholder="e.g. urgent, website, ecommerce" />
            <Text style={styles.pickLabel}>PRIORITY</Text>
            <View style={styles.statusGrid}>
              {PRIORITY_OPTIONS.map(p => (
                <TouchableOpacity
                  key={p}
                  style={[
                    styles.statusOption,
                    editForm.priority === p && {
                      backgroundColor: PRIORITY_COLORS[p],
                      borderColor: PRIORITY_COLORS[p],
                    },
                  ]}
                  onPress={() => setEditForm((f: any) => ({ ...f, priority: p }))}
                >
                  <Text style={[styles.statusOptionText, editForm.priority === p && styles.statusOptionTextActive]}>
                    {p.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Button
              label={updateMutation.isPending ? 'SAVING...' : 'SAVE CHANGES'}
              onPress={() => {
                const payload = {
                  ...editForm,
                  tags: editForm.tags
                    ? editForm.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
                    : [],
                };
                updateMutation.mutate(payload);
              }}
              loading={updateMutation.isPending}
              fullWidth
              size="lg"
              style={{ marginTop: Spacing.base, marginBottom: Spacing.xl }}
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
  heroCard: {
    padding: Spacing.lg,
    marginBottom: Spacing.sm,
    borderLeftWidth: 6,
    borderLeftColor: Colors.secondary,
  },
  heroLeft: { flex: 1 },
  heroName: {
    fontSize: Typography['2xl'],
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: -0.5,
  },
  heroPhone: {
    fontSize: Typography.base,
    color: Colors.primary,
    fontWeight: Typography.bold,
    marginTop: 4,
  },
  heroEmail: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 2,
  },
  heroCity: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 2,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  priorityText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 0.5,
  },
  sourceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: Border.width,
    borderColor: Colors.primary,
    backgroundColor: '#EFF6FF',
  },
  sourceBadgeText: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    color: Colors.primary,
  },
  tagChip: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: Colors.gray100,
    borderWidth: 1,
    borderColor: Colors.gray300,
  },
  tagChipText: {
    fontSize: Typography.xs,
    fontWeight: Typography.medium,
    color: Colors.gray600,
  },
  projectTag: {
    marginTop: Spacing.sm,
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    borderWidth: Border.width,
    borderColor: Colors.border,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  projectTagText: {
    color: Colors.white,
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    letterSpacing: 0.5,
  },
  detailCard: { padding: Spacing.md, marginBottom: Spacing.sm },
  activitySection: { padding: Spacing.md, marginBottom: Spacing.sm },
  actionsCard: { padding: Spacing.md },
  sectionLabel: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 1.5,
  },
  detailRow: {
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  detailLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.semiBold,
    color: Colors.mutedForeground,
  },
  detailValue: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.foreground,
    flex: 1,
    textAlign: 'right',
  },
  messageLabel: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 1,
    marginTop: Spacing.sm,
    marginBottom: 4,
  },
  messageText: {
    fontSize: Typography.sm,
    color: Colors.foreground,
    fontWeight: Typography.medium,
    lineHeight: 20,
  },
  addActivityBtn: {
    borderWidth: Border.width,
    borderColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  addActivityBtnText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.primary,
    letterSpacing: 0.5,
  },
  emptyActivity: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    textAlign: 'center',
    paddingVertical: Spacing.md,
  },
  activityItem: { paddingVertical: Spacing.sm },
  activityIconWrap: {
    width: 32,
    height: 32,
    borderWidth: Border.widthBold,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gray100,
    flexShrink: 0,
  },
  activityTypeIcon: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  activityTypeName: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 0.5,
  },
  activityTime: {
    fontSize: Typography.xs,
    color: Colors.gray400,
    fontWeight: Typography.medium,
  },
  activityBy: {
    fontSize: Typography.xs,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 2,
  },
  activityContent: {
    fontSize: Typography.sm,
    color: Colors.foreground,
    fontWeight: Typography.medium,
    lineHeight: 18,
    marginTop: 4,
  },
  modal: { flex: 1, backgroundColor: Colors.background },
  modalHeader: {
    padding: Spacing.base,
    borderBottomWidth: Border.widthBold,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: Typography.xl,
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
    marginBottom: 10,
    marginTop: Spacing.sm,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: Spacing.base,
  },
  statusOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: Border.width,
    borderColor: Colors.border,
  },
  statusOptionActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  statusOptionText: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.foreground,
    textTransform: 'capitalize',
  },
  statusOptionTextActive: { color: Colors.white },
});

export default LeadDetailScreen;
