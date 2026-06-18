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
import {
  Card,
  Row,
  Button,
  Input,
  EmptyState,
  LoadingSpinner,
  SearchBar,
} from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';
import apiClient from '../../api/client';

type TaskStatus = 'To Do' | 'In Progress' | 'In Review' | 'Done';

const STATUSES: TaskStatus[] = ['To Do', 'In Progress', 'In Review', 'Done'];
const PLATFORMS = [
  'Instagram',
  'Facebook',
  'X / Twitter',
  'LinkedIn',
  'YouTube Shorts',
  'WhatsApp Channel',
  'Google My Business',
];
const CONTENT_TYPES = ['Image Post', 'Reel', 'Video', 'Carousel', 'Story', 'Blog Idea', 'Text Post'];

const STATUS_COLORS: Record<TaskStatus, string> = {
  'To Do': Colors.gray500,
  'In Progress': Colors.primary,
  'In Review': Colors.warning,
  Done: Colors.success,
};

const blankForm = () => ({
  title: '',
  scheduledDate: '',
  scheduledTime: '',
  platform: 'Instagram',
  contentType: 'Image Post',
  caption: '',
  hashtags: '',
  mediaUrl: '',
  reelVideoLink: '',
  campaign: '',
  company: '',
  assignedTo: '',
  notes: '',
  status: 'To Do' as TaskStatus,
  approvalStatus: 'Pending',
});

const SocialMediaManagerScreen = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<any>(null);
  const [form, setForm] = useState(blankForm());
  const [viewTask, setViewTask] = useState<any>(null);

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['social-media-tasks'],
    queryFn: () => apiClient.get('/social-media-tasks').then(r => r.data),
  });

  const saveMutation = useMutation({
    mutationFn: (data: any) =>
      editTarget
        ? apiClient.put(`/social-media-tasks/${editTarget._id || editTarget.id}`, data)
        : apiClient.post('/social-media-tasks', data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['social-media-tasks'] });
      setShowForm(false);
      setEditTarget(null);
      setForm(blankForm());
    },
    onError: () => Alert.alert('Error', 'Failed to save task'),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiClient.put(`/social-media-tasks/${id}`, { status }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['social-media-tasks'] }),
    onError: () => Alert.alert('Error', 'Failed to update status'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/social-media-tasks/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['social-media-tasks'] }),
    onError: () => Alert.alert('Error', 'Failed to delete task'),
  });

  const arr = Array.isArray(tasks) ? tasks : [];

  const filtered = arr.filter((t: any) => {
    const q = search.toLowerCase();
    const matchSearch =
      !search ||
      t.title?.toLowerCase().includes(q) ||
      t.company?.toLowerCase().includes(q) ||
      t.assignedTo?.toLowerCase().includes(q) ||
      t.campaign?.toLowerCase().includes(q);
    const matchStatus = !statusFilter || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const countByStatus = (s: string) => arr.filter((t: any) => t.status === s).length;

  const openEdit = (task: any) => {
    setEditTarget(task);
    setForm({
      title: task.title || '',
      scheduledDate: task.scheduledDate || '',
      scheduledTime: task.scheduledTime || '',
      platform: task.platform || 'Instagram',
      contentType: task.contentType || 'Image Post',
      caption: task.caption || '',
      hashtags: task.hashtags || '',
      mediaUrl: task.mediaUrl || '',
      reelVideoLink: task.reelVideoLink || '',
      campaign: task.campaign || '',
      company: task.company || '',
      assignedTo: task.assignedTo || '',
      notes: task.notes || '',
      status: task.status || 'To Do',
      approvalStatus: task.approvalStatus || 'Pending',
    });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) {
      Alert.alert('Error', 'Title is required');
      return;
    }
    saveMutation.mutate(form);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <Row justify="flex-end" style={{ marginBottom: Spacing.sm }}>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => {
              setEditTarget(null);
              setForm(blankForm());
              setShowForm(true);
            }}
          >
            <Text style={styles.addBtnText}>+ ADD TASK</Text>
          </TouchableOpacity>
        </Row>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: Spacing.sm }}>
          <Row gap={6}>
            <TouchableOpacity
              style={[styles.statusChip, !statusFilter && styles.statusChipActive]}
              onPress={() => setStatusFilter('')}
            >
              <Text style={[styles.statusChipText, !statusFilter && styles.statusChipTextActive]}>
                ALL ({arr.length})
              </Text>
            </TouchableOpacity>
            {STATUSES.map(s => (
              <TouchableOpacity
                key={s}
                style={[
                  styles.statusChip,
                  { borderColor: STATUS_COLORS[s] },
                  statusFilter === s && { backgroundColor: STATUS_COLORS[s] },
                ]}
                onPress={() => setStatusFilter(statusFilter === s ? '' : s)}
              >
                <Text
                  style={[
                    styles.statusChipText,
                    { color: STATUS_COLORS[s] },
                    statusFilter === s && { color: Colors.white },
                  ]}
                >
                  {s} ({countByStatus(s)})
                </Text>
              </TouchableOpacity>
            ))}
          </Row>
        </ScrollView>

        <SearchBar value={search} onChangeText={setSearch} placeholder="Search title, company, campaign..." />
        <Text style={styles.count}>{filtered.length} TASKS</Text>

        <FlatList
          data={filtered}
          keyExtractor={(item: any, i) => String(item._id || item.id || i)}
          ListEmptyComponent={
            <EmptyState
              title="No Tasks"
              subtitle="Add content tasks for your social media team"
              action={{ label: '+ Add Task', onPress: () => setShowForm(true) }}
            />
          }
          renderItem={({ item }: { item: any }) => {
            const statusColor = STATUS_COLORS[item.status as TaskStatus] || Colors.gray400;
            return (
              <Card style={styles.card} shadow="sm">
                <Row justify="space-between" align="flex-start">
                  <View style={{ flex: 1, paddingRight: 8 }}>
                    <Text style={styles.taskTitle} numberOfLines={2}>{item.title}</Text>
                    {item.company ? (
                      <Text style={styles.taskMeta}>{item.company}</Text>
                    ) : null}
                    {item.campaign ? (
                      <Text style={styles.taskMeta}>Campaign: {item.campaign}</Text>
                    ) : null}
                    <Row gap={6} style={{ marginTop: 4, flexWrap: 'wrap' }}>
                      <View style={styles.contentTypeBadge}>
                        <Text style={styles.contentTypeBadgeText}>{item.contentType}</Text>
                      </View>
                      <View style={styles.platformBadge}>
                        <Text style={styles.platformBadgeText}>{item.platform}</Text>
                      </View>
                    </Row>
                    {item.scheduledDate ? (
                      <Text style={styles.scheduledDate}>
                        {item.scheduledDate}
                        {item.scheduledTime ? ` ${item.scheduledTime}` : ''}
                      </Text>
                    ) : null}
                    {item.assignedTo ? (
                      <Text style={styles.assignedTo}>Assigned: {item.assignedTo}</Text>
                    ) : null}
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
                    <Text style={styles.statusBadgeText}>{item.status}</Text>
                  </View>
                </Row>
                <Row gap={6} style={{ marginTop: Spacing.sm, flexWrap: 'wrap' }}>
                  <TouchableOpacity style={styles.actionBtn} onPress={() => setViewTask(item)}>
                    <Text style={styles.actionBtnText}>VIEW</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn} onPress={() => openEdit(item)}>
                    <Text style={styles.actionBtnText}>EDIT</Text>
                  </TouchableOpacity>
                  {STATUSES.filter(s => s !== item.status).map(s => (
                    <TouchableOpacity
                      key={s}
                      style={[styles.actionBtn, { borderColor: STATUS_COLORS[s] }]}
                      onPress={() => {
                        const id = item._id || item.id;
                        updateStatusMutation.mutate({ id, status: s });
                      }}
                    >
                      <Text style={[styles.actionBtnText, { color: STATUS_COLORS[s] }]}>
                        {s === 'To Do' ? 'TODO' : s === 'In Progress' ? 'IN PROG' : s === 'In Review' ? 'REVIEW' : 'DONE'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    style={[styles.actionBtn, { borderColor: Colors.destructive }]}
                    onPress={() =>
                      Alert.alert('Delete Task', `Delete "${item.title}"?`, [
                        { text: 'Cancel', style: 'cancel' },
                        {
                          text: 'Delete',
                          style: 'destructive',
                          onPress: () => deleteMutation.mutate(item._id || item.id),
                        },
                      ])
                    }
                  >
                    <Text style={[styles.actionBtnText, { color: Colors.destructive }]}>DELETE</Text>
                  </TouchableOpacity>
                </Row>
              </Card>
            );
          }}
        />
      </View>

      <Modal visible={showForm} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <Row justify="space-between" align="center" style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{editTarget ? 'EDIT TASK' : 'ADD TASK'}</Text>
            <TouchableOpacity onPress={() => { setShowForm(false); setEditTarget(null); }}>
              <Text style={styles.modalClose}>CANCEL</Text>
            </TouchableOpacity>
          </Row>
          <ScrollView style={styles.modalContent}>
            <Input
              label="TITLE *"
              value={form.title}
              onChangeText={v => setForm(f => ({ ...f, title: v }))}
              placeholder="Post title"
            />
            <Text style={styles.fieldLabel}>PLATFORM</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: Spacing.sm }}>
              <Row gap={6}>
                {PLATFORMS.map(p => (
                  <TouchableOpacity
                    key={p}
                    style={[styles.chip, form.platform === p && styles.chipActive]}
                    onPress={() => setForm(f => ({ ...f, platform: p }))}
                  >
                    <Text style={[styles.chipText, form.platform === p && styles.chipTextActive]}>{p}</Text>
                  </TouchableOpacity>
                ))}
              </Row>
            </ScrollView>
            <Text style={styles.fieldLabel}>CONTENT TYPE</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: Spacing.sm }}>
              <Row gap={6}>
                {CONTENT_TYPES.map(c => (
                  <TouchableOpacity
                    key={c}
                    style={[styles.chip, form.contentType === c && styles.chipActive]}
                    onPress={() => setForm(f => ({ ...f, contentType: c }))}
                  >
                    <Text style={[styles.chipText, form.contentType === c && styles.chipTextActive]}>{c}</Text>
                  </TouchableOpacity>
                ))}
              </Row>
            </ScrollView>
            <Input
              label="SCHEDULED DATE (YYYY-MM-DD)"
              value={form.scheduledDate}
              onChangeText={v => setForm(f => ({ ...f, scheduledDate: v }))}
              placeholder="2025-03-15"
            />
            <Input
              label="SCHEDULED TIME (HH:MM)"
              value={form.scheduledTime}
              onChangeText={v => setForm(f => ({ ...f, scheduledTime: v }))}
              placeholder="09:00"
            />
            <Input
              label="CAMPAIGN / WEEK"
              value={form.campaign}
              onChangeText={v => setForm(f => ({ ...f, campaign: v }))}
              placeholder="e.g. Week 1 - Engagement"
            />
            <Input
              label="COMPANY"
              value={form.company}
              onChangeText={v => setForm(f => ({ ...f, company: v }))}
              placeholder="e.g. Kalahanu Tech"
            />
            <Input
              label="ASSIGNED TO"
              value={form.assignedTo}
              onChangeText={v => setForm(f => ({ ...f, assignedTo: v }))}
              placeholder="Team member name"
            />
            <Text style={styles.fieldLabel}>STATUS</Text>
            <Row gap={6} style={{ flexWrap: 'wrap', marginBottom: Spacing.sm }}>
              {STATUSES.map(s => (
                <TouchableOpacity
                  key={s}
                  style={[styles.chip, form.status === s && { backgroundColor: STATUS_COLORS[s], borderColor: STATUS_COLORS[s] }]}
                  onPress={() => setForm(f => ({ ...f, status: s }))}
                >
                  <Text style={[styles.chipText, form.status === s && styles.chipTextActive]}>{s}</Text>
                </TouchableOpacity>
              ))}
            </Row>
            <Text style={styles.fieldLabel}>APPROVAL STATUS</Text>
            <Row gap={6} style={{ marginBottom: Spacing.sm }}>
              {['Pending', 'Approved', 'Rejected'].map(a => (
                <TouchableOpacity
                  key={a}
                  style={[styles.chip, form.approvalStatus === a && styles.chipActive]}
                  onPress={() => setForm(f => ({ ...f, approvalStatus: a }))}
                >
                  <Text style={[styles.chipText, form.approvalStatus === a && styles.chipTextActive]}>{a}</Text>
                </TouchableOpacity>
              ))}
            </Row>
            <Input
              label="CAPTION"
              value={form.caption}
              onChangeText={v => setForm(f => ({ ...f, caption: v }))}
              placeholder="Write your post caption..."
              multiline
            />
            <Input
              label="HASHTAGS"
              value={form.hashtags}
              onChangeText={v => setForm(f => ({ ...f, hashtags: v }))}
              placeholder="#tag1 #tag2"
            />
            <Input
              label="MEDIA URL"
              value={form.mediaUrl}
              onChangeText={v => setForm(f => ({ ...f, mediaUrl: v }))}
              placeholder="https://..."
            />
            <Input
              label="REEL VIDEO LINK"
              value={form.reelVideoLink}
              onChangeText={v => setForm(f => ({ ...f, reelVideoLink: v }))}
              placeholder="https://..."
            />
            <Input
              label="NOTES"
              value={form.notes}
              onChangeText={v => setForm(f => ({ ...f, notes: v }))}
              placeholder="Additional notes..."
              multiline
            />
            <Button
              label={saveMutation.isPending ? 'SAVING...' : 'SAVE TASK'}
              onPress={handleSave}
              loading={saveMutation.isPending}
              fullWidth
              size="lg"
              style={{ marginTop: Spacing.base, marginBottom: Spacing.xl }}
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <Modal visible={!!viewTask} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <Row justify="space-between" align="center" style={styles.modalHeader}>
            <Text style={styles.modalTitle} numberOfLines={1}>{viewTask?.title}</Text>
            <TouchableOpacity onPress={() => setViewTask(null)}>
              <Text style={styles.modalClose}>CLOSE</Text>
            </TouchableOpacity>
          </Row>
          <ScrollView style={styles.modalContent}>
            {viewTask ? (
              <>
                {[
                  { label: 'Platform', value: viewTask.platform },
                  { label: 'Content Type', value: viewTask.contentType },
                  { label: 'Scheduled Date', value: viewTask.scheduledDate || '—' },
                  { label: 'Scheduled Time', value: viewTask.scheduledTime || '—' },
                  { label: 'Campaign', value: viewTask.campaign || '—' },
                  { label: 'Company', value: viewTask.company || '—' },
                  { label: 'Assigned To', value: viewTask.assignedTo || '—' },
                  { label: 'Status', value: viewTask.status },
                  { label: 'Approval', value: viewTask.approvalStatus || '—' },
                ].map(({ label, value }) => (
                  <View key={label} style={styles.viewRow}>
                    <Text style={styles.viewLabel}>{label.toUpperCase()}</Text>
                    <Text style={styles.viewValue}>{value}</Text>
                  </View>
                ))}
                {viewTask.caption ? (
                  <View style={styles.viewBlock}>
                    <Text style={styles.viewLabel}>CAPTION</Text>
                    <Text style={styles.viewBlockText}>{viewTask.caption}</Text>
                  </View>
                ) : null}
                {viewTask.hashtags ? (
                  <View style={styles.viewBlock}>
                    <Text style={styles.viewLabel}>HASHTAGS</Text>
                    <Text style={[styles.viewBlockText, { color: Colors.primary }]}>{viewTask.hashtags}</Text>
                  </View>
                ) : null}
                {viewTask.mediaUrl ? (
                  <View style={styles.viewBlock}>
                    <Text style={styles.viewLabel}>MEDIA URL</Text>
                    <Text style={[styles.viewBlockText, { color: Colors.primary }]} numberOfLines={3}>{viewTask.mediaUrl}</Text>
                  </View>
                ) : null}
                {viewTask.reelVideoLink ? (
                  <View style={styles.viewBlock}>
                    <Text style={styles.viewLabel}>REEL VIDEO LINK</Text>
                    <Text style={[styles.viewBlockText, { color: Colors.primary }]} numberOfLines={3}>{viewTask.reelVideoLink}</Text>
                  </View>
                ) : null}
                {viewTask.notes ? (
                  <View style={styles.viewBlock}>
                    <Text style={styles.viewLabel}>NOTES</Text>
                    <Text style={styles.viewBlockText}>{viewTask.notes}</Text>
                  </View>
                ) : null}
              </>
            ) : null}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.base, paddingBottom: 0 },
  addBtn: {
    backgroundColor: Colors.primary,
    borderWidth: Border.widthBold,
    borderColor: Colors.black,
    paddingHorizontal: 14,
    paddingVertical: 6,
    ...Shadows.sm,
  },
  addBtnText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 0.5,
  },
  statusChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: Border.width,
    borderColor: Colors.border,
    borderRadius: 99,
  },
  statusChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  statusChipText: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    color: Colors.foreground,
    letterSpacing: 0.3,
  },
  statusChipTextActive: { color: Colors.white },
  count: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
  },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  taskTitle: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: -0.2,
  },
  taskMeta: {
    fontSize: Typography.xs,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 2,
  },
  contentTypeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: Colors.gray200,
    borderWidth: Border.width,
    borderColor: Colors.border,
  },
  contentTypeBadgeText: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    color: Colors.foreground,
  },
  platformBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: Colors.primary,
  },
  platformBadgeText: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    color: Colors.white,
  },
  scheduledDate: {
    fontSize: Typography.xs,
    color: Colors.accent,
    fontWeight: Typography.bold,
    marginTop: 4,
  },
  assignedTo: {
    fontSize: Typography.xs,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  statusBadgeText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 0.3,
  },
  actionBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: Border.width,
    borderColor: Colors.border,
  },
  actionBtnText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: 0.3,
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
    flex: 1,
  },
  modalClose: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.destructive,
  },
  modalContent: { padding: Spacing.base },
  fieldLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: 0.5,
    marginBottom: 8,
    marginTop: Spacing.sm,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: Border.width,
    borderColor: Colors.border,
    marginBottom: 4,
  },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    color: Colors.foreground,
    letterSpacing: 0.3,
  },
  chipTextActive: { color: Colors.white },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  viewLabel: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 0.5,
    flex: 1,
  },
  viewValue: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.foreground,
    flex: 2,
    textAlign: 'right',
  },
  viewBlock: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  viewBlockText: {
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
    color: Colors.foreground,
    lineHeight: 20,
    marginTop: 4,
  },
});

export default SocialMediaManagerScreen;
