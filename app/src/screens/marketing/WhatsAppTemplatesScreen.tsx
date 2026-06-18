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

const CATEGORIES = ['MARKETING', 'UTILITY', 'AUTHENTICATION'];
const HEADER_TYPES = ['NONE', 'TEXT', 'IMAGE', 'DOCUMENT', 'VIDEO'];
const LANGUAGES = [
  { code: 'en_US', label: 'English (US)' },
  { code: 'en_GB', label: 'English (UK)' },
  { code: 'hi', label: 'Hindi' },
  { code: 'mr', label: 'Marathi' },
  { code: 'gu', label: 'Gujarati' },
];
const BUTTON_TYPES = ['QUICK_REPLY', 'URL', 'PHONE_NUMBER'];

const STATUS_COLORS: Record<string, string> = {
  APPROVED: Colors.success,
  LOCAL: Colors.gray500,
  SUBMITTED: Colors.primary,
  REJECTED: Colors.destructive,
  PAUSED: Colors.warning,
  UNKNOWN: Colors.gray400,
};

const STATUS_LABELS: Record<string, string> = {
  APPROVED: 'Approved',
  LOCAL: 'Local Draft',
  SUBMITTED: 'Under Review',
  REJECTED: 'Rejected',
  PAUSED: 'Paused',
  UNKNOWN: 'Unknown',
};

const blankForm = () => ({
  name: '',
  category: 'UTILITY' as string,
  language: 'en_US',
  headerType: 'NONE' as string,
  headerText: '',
  body: '',
  footer: '',
  buttons: [] as { type: string; text: string }[],
  variables: [] as string[],
  notes: '',
});

const WhatsAppTemplatesScreen = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<any>(null);
  const [form, setForm] = useState(blankForm());
  const [newButtonText, setNewButtonText] = useState('');
  const [newButtonType, setNewButtonType] = useState('QUICK_REPLY');
  const [newVariableLabel, setNewVariableLabel] = useState('');
  const [showPreview, setShowPreview] = useState<any>(null);

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['whatsapp-templates'],
    queryFn: () => apiClient.get('/whatsapp-templates').then(r => r.data),
  });

  const syncMutation = useMutation({
    mutationFn: () => apiClient.post('/whatsapp-templates/sync', {}),
    onSuccess: (res: any) => {
      qc.invalidateQueries({ queryKey: ['whatsapp-templates'] });
      Alert.alert('Synced', `${res.data?.total ?? 0} templates fetched.`);
    },
    onError: () => Alert.alert('Error', 'Sync failed'),
  });

  const saveMutation = useMutation({
    mutationFn: (payload: any) =>
      editTarget
        ? apiClient.patch(`/whatsapp-templates/${editTarget._id}`, payload)
        : apiClient.post('/whatsapp-templates', payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['whatsapp-templates'] });
      closeForm();
    },
    onError: () => Alert.alert('Error', 'Save failed'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/whatsapp-templates/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['whatsapp-templates'] }),
    onError: () => Alert.alert('Error', 'Delete failed'),
  });

  const submitMutation = useMutation({
    mutationFn: (t: any) =>
      apiClient.post(`/whatsapp-templates/${t._id}/submit`, { name: t.name }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['whatsapp-templates'] });
      Alert.alert('Submitted', 'Template submitted to Meta for approval.');
    },
    onError: () => Alert.alert('Error', 'Submission failed'),
  });

  const closeForm = () => {
    setShowForm(false);
    setEditTarget(null);
    setForm(blankForm());
    setNewButtonText('');
    setNewVariableLabel('');
  };

  const openEdit = (t: any) => {
    setEditTarget(t);
    setForm({
      name: t.name,
      category: t.category,
      language: t.language,
      headerType: t.headerType,
      headerText: t.headerText ?? '',
      body: t.body,
      footer: t.footer ?? '',
      buttons: t.buttons ?? [],
      variables: t.variables ?? [],
      notes: t.notes ?? '',
    });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.body.trim()) {
      Alert.alert('Required', 'Template name and body are required.');
      return;
    }
    const payload = {
      ...form,
      name: form.name.trim().toLowerCase().replace(/\s+/g, '_'),
      headerText: form.headerText || null,
      footer: form.footer || null,
      notes: form.notes || null,
    };
    saveMutation.mutate(payload);
  };

  const addButton = () => {
    if (!newButtonText.trim()) return;
    setForm(f => ({
      ...f,
      buttons: [...f.buttons, { type: newButtonType, text: newButtonText.trim() }],
    }));
    setNewButtonText('');
  };

  const removeButton = (idx: number) => {
    setForm(f => ({ ...f, buttons: f.buttons.filter((_, i) => i !== idx) }));
  };

  const addVariable = () => {
    if (!newVariableLabel.trim()) return;
    setForm(f => ({ ...f, variables: [...f.variables, newVariableLabel.trim()] }));
    setNewVariableLabel('');
  };

  const insertVariable = () => {
    const n = form.variables.length + 1;
    setForm(f => ({ ...f, body: f.body + `{{${n}}}` }));
  };

  const arr = Array.isArray(templates) ? templates : [];
  const filtered = arr.filter((t: any) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      t.name?.toLowerCase().includes(q) ||
      t.body?.toLowerCase().includes(q);
    const matchCat = filterCategory === 'all' || t.category === filterCategory;
    const matchStatus = filterStatus === 'all' || t.status === filterStatus;
    return matchSearch && matchCat && matchStatus;
  });

  const stats = {
    total: arr.length,
    approved: arr.filter((t: any) => t.status === 'APPROVED').length,
    local: arr.filter((t: any) => t.status === 'LOCAL').length,
    rejected: arr.filter((t: any) => t.status === 'REJECTED').length,
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <Row justify="space-between" align="center" style={{ marginBottom: Spacing.sm }}>
          <TouchableOpacity
            style={styles.syncBtn}
            onPress={() => syncMutation.mutate()}
            disabled={syncMutation.isPending}
          >
            <Text style={styles.syncBtnText}>
              {syncMutation.isPending ? 'SYNCING...' : 'SYNC FROM META'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => {
              setEditTarget(null);
              setForm(blankForm());
              setShowForm(true);
            }}
          >
            <Text style={styles.addBtnText}>+ NEW TEMPLATE</Text>
          </TouchableOpacity>
        </Row>

        <Row gap={8} style={{ marginBottom: Spacing.sm }}>
          {[
            { label: 'TOTAL', value: stats.total, color: Colors.foreground },
            { label: 'APPROVED', value: stats.approved, color: Colors.success },
            { label: 'LOCAL', value: stats.local, color: Colors.gray500 },
            { label: 'REJECTED', value: stats.rejected, color: Colors.destructive },
          ].map(s => (
            <View key={s.label} style={[styles.statCard, { borderTopColor: s.color, borderTopWidth: 3 }]}>
              <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </Row>

        <SearchBar value={search} onChangeText={setSearch} placeholder="Search templates..." />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: Spacing.sm }}>
          <Row gap={6}>
            {['all', ...CATEGORIES].map(c => (
              <TouchableOpacity
                key={c}
                style={[styles.chip, filterCategory === c && styles.chipActive]}
                onPress={() => setFilterCategory(c)}
              >
                <Text style={[styles.chipText, filterCategory === c && styles.chipTextActive]}>
                  {c === 'all' ? 'ALL' : c}
                </Text>
              </TouchableOpacity>
            ))}
          </Row>
        </ScrollView>

        <Text style={styles.count}>{filtered.length} TEMPLATES</Text>

        <FlatList
          data={filtered}
          keyExtractor={(item: any, i) => String(item._id || i)}
          ListEmptyComponent={
            <EmptyState
              title="No Templates"
              subtitle="Create your first WhatsApp template"
              action={{ label: '+ New Template', onPress: () => setShowForm(true) }}
            />
          }
          renderItem={({ item }: { item: any }) => {
            const statusColor = STATUS_COLORS[item.status] || Colors.gray400;
            const canSubmit = item.status === 'LOCAL' || item.status === 'REJECTED';
            return (
              <Card style={styles.card} shadow="sm">
                <Row justify="space-between" align="flex-start" style={{ marginBottom: 6 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.templateName} numberOfLines={1}>{item.name}</Text>
                    <Row gap={6} style={{ marginTop: 4, flexWrap: 'wrap' }}>
                      <View style={[styles.badge, { backgroundColor: statusColor }]}>
                        <Text style={styles.badgeText}>{STATUS_LABELS[item.status] || item.status}</Text>
                      </View>
                      <View style={[styles.badge, { backgroundColor: Colors.primary }]}>
                        <Text style={styles.badgeText}>{item.category}</Text>
                      </View>
                      {item.syncedFromMeta && (
                        <View style={[styles.badge, { backgroundColor: '#25D366' }]}>
                          <Text style={styles.badgeText}>META SYNCED</Text>
                        </View>
                      )}
                    </Row>
                  </View>
                </Row>
                <Text style={styles.bodyPreview} numberOfLines={3}>{item.body}</Text>
                {item.footer ? <Text style={styles.footerText}>{item.footer}</Text> : null}
                {item.buttons?.length > 0 && (
                  <Row gap={6} style={{ marginTop: 6, flexWrap: 'wrap' }}>
                    {item.buttons.map((btn: any, i: number) => (
                      <View key={i} style={styles.buttonChip}>
                        <Text style={styles.buttonChipText}>{btn.text}</Text>
                      </View>
                    ))}
                  </Row>
                )}
                <Row gap={6} style={{ marginTop: 10 }}>
                  <TouchableOpacity style={styles.actionBtn} onPress={() => setShowPreview(item)}>
                    <Text style={styles.actionBtnText}>PREVIEW</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn} onPress={() => openEdit(item)}>
                    <Text style={styles.actionBtnText}>EDIT</Text>
                  </TouchableOpacity>
                  {canSubmit && (
                    <TouchableOpacity
                      style={[styles.actionBtn, { backgroundColor: '#25D366', borderColor: '#128C7E' }]}
                      onPress={() =>
                        Alert.alert('Submit to Meta', `Submit "${item.name}" for approval?`, [
                          { text: 'Cancel', style: 'cancel' },
                          { text: 'Submit', onPress: () => submitMutation.mutate(item) },
                        ])
                      }
                    >
                      <Text style={[styles.actionBtnText, { color: Colors.white }]}>SUBMIT</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={[styles.actionBtn, { borderColor: Colors.destructive }]}
                    onPress={() =>
                      Alert.alert('Delete Template', `Delete "${item.name}"?`, [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Delete', style: 'destructive', onPress: () => deleteMutation.mutate(item._id) },
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
            <Text style={styles.modalTitle}>{editTarget ? 'EDIT TEMPLATE' : 'NEW TEMPLATE'}</Text>
            <TouchableOpacity onPress={closeForm}>
              <Text style={styles.modalClose}>CANCEL</Text>
            </TouchableOpacity>
          </Row>
          <ScrollView style={styles.modalContent}>
            <Input
              label="TEMPLATE NAME *"
              value={form.name}
              onChangeText={v => setForm(f => ({ ...f, name: v.toLowerCase().replace(/\s+/g, '_') }))}
              placeholder="e.g. payment_receipt"
            />
            <Text style={styles.fieldLabel}>CATEGORY</Text>
            <Row gap={6} style={{ marginBottom: Spacing.sm, flexWrap: 'wrap' }}>
              {CATEGORIES.map(c => (
                <TouchableOpacity
                  key={c}
                  style={[styles.chip, form.category === c && styles.chipActive]}
                  onPress={() => setForm(f => ({ ...f, category: c }))}
                >
                  <Text style={[styles.chipText, form.category === c && styles.chipTextActive]}>{c}</Text>
                </TouchableOpacity>
              ))}
            </Row>
            <Text style={styles.fieldLabel}>LANGUAGE</Text>
            <Row gap={6} style={{ marginBottom: Spacing.sm, flexWrap: 'wrap' }}>
              {LANGUAGES.map(l => (
                <TouchableOpacity
                  key={l.code}
                  style={[styles.chip, form.language === l.code && styles.chipActive]}
                  onPress={() => setForm(f => ({ ...f, language: l.code }))}
                >
                  <Text style={[styles.chipText, form.language === l.code && styles.chipTextActive]}>{l.label}</Text>
                </TouchableOpacity>
              ))}
            </Row>
            <Text style={styles.fieldLabel}>HEADER TYPE</Text>
            <Row gap={6} style={{ marginBottom: Spacing.sm, flexWrap: 'wrap' }}>
              {HEADER_TYPES.map(h => (
                <TouchableOpacity
                  key={h}
                  style={[styles.chip, form.headerType === h && styles.chipActive]}
                  onPress={() => setForm(f => ({ ...f, headerType: h }))}
                >
                  <Text style={[styles.chipText, form.headerType === h && styles.chipTextActive]}>{h}</Text>
                </TouchableOpacity>
              ))}
            </Row>
            {form.headerType === 'TEXT' && (
              <Input
                label="HEADER TEXT"
                value={form.headerText}
                onChangeText={v => setForm(f => ({ ...f, headerText: v }))}
                placeholder="Bold header text"
              />
            )}
            <Row justify="space-between" align="center">
              <Text style={styles.fieldLabel}>BODY TEXT *</Text>
              <TouchableOpacity onPress={insertVariable}>
                <Text style={styles.insertVarBtn}>+ INSERT VARIABLE</Text>
              </TouchableOpacity>
            </Row>
            <Input
              value={form.body}
              onChangeText={v => setForm(f => ({ ...f, body: v }))}
              placeholder={'Hi {{1}},\n\nYour payment of {{2}} has been received.'}
              multiline
            />
            <Text style={styles.fieldLabel}>VARIABLE LABELS</Text>
            <Row gap={6} style={{ marginBottom: Spacing.sm }}>
              <View style={{ flex: 1 }}>
                <Input
                  value={newVariableLabel}
                  onChangeText={setNewVariableLabel}
                  placeholder="e.g. client_name"
                />
              </View>
              <TouchableOpacity style={styles.addChipBtn} onPress={addVariable}>
                <Text style={styles.addChipBtnText}>ADD</Text>
              </TouchableOpacity>
            </Row>
            {form.variables.length > 0 && (
              <Row gap={6} style={{ marginBottom: Spacing.sm, flexWrap: 'wrap' }}>
                {form.variables.map((v, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.variableChip}
                    onPress={() => setForm(f => ({ ...f, variables: f.variables.filter((_, j) => j !== i) }))}
                  >
                    <Text style={styles.variableChipText}>{`{{${i + 1}}} ${v}  x`}</Text>
                  </TouchableOpacity>
                ))}
              </Row>
            )}
            <Input
              label="FOOTER TEXT (optional)"
              value={form.footer}
              onChangeText={v => setForm(f => ({ ...f, footer: v }))}
              placeholder="e.g. Pixelate Nest Team"
            />
            <Text style={styles.fieldLabel}>BUTTONS (max 3)</Text>
            <Row gap={6} style={{ marginBottom: Spacing.sm }}>
              <View style={{ flex: 1 }}>
                <Input
                  value={newButtonText}
                  onChangeText={setNewButtonText}
                  placeholder="Button label"
                />
              </View>
              <TouchableOpacity style={styles.addChipBtn} onPress={addButton} disabled={form.buttons.length >= 3}>
                <Text style={styles.addChipBtnText}>ADD</Text>
              </TouchableOpacity>
            </Row>
            <Text style={styles.fieldLabel}>BUTTON TYPE</Text>
            <Row gap={6} style={{ marginBottom: Spacing.sm, flexWrap: 'wrap' }}>
              {BUTTON_TYPES.map(bt => (
                <TouchableOpacity
                  key={bt}
                  style={[styles.chip, newButtonType === bt && styles.chipActive]}
                  onPress={() => setNewButtonType(bt)}
                >
                  <Text style={[styles.chipText, newButtonType === bt && styles.chipTextActive]}>{bt}</Text>
                </TouchableOpacity>
              ))}
            </Row>
            {form.buttons.length > 0 && (
              <Row gap={6} style={{ marginBottom: Spacing.sm, flexWrap: 'wrap' }}>
                {form.buttons.map((btn, i) => (
                  <TouchableOpacity key={i} style={styles.buttonChip} onPress={() => removeButton(i)}>
                    <Text style={styles.buttonChipText}>{btn.text}  x</Text>
                  </TouchableOpacity>
                ))}
              </Row>
            )}
            <Input
              label="INTERNAL NOTES (optional)"
              value={form.notes}
              onChangeText={v => setForm(f => ({ ...f, notes: v }))}
              placeholder="e.g. Used for payment confirmations"
            />
            <Button
              label={saveMutation.isPending ? 'SAVING...' : editTarget ? 'SAVE CHANGES' : 'CREATE TEMPLATE'}
              onPress={handleSave}
              loading={saveMutation.isPending}
              fullWidth
              size="lg"
              style={{ marginTop: Spacing.base, marginBottom: Spacing.xl }}
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <Modal visible={!!showPreview} animationType="fade" transparent>
        <TouchableOpacity style={styles.previewOverlay} activeOpacity={1} onPress={() => setShowPreview(null)}>
          <View style={styles.previewCard}>
            <Row justify="space-between" align="center" style={{ marginBottom: Spacing.sm }}>
              <Text style={styles.previewTitle}>{showPreview?.name}</Text>
              <TouchableOpacity onPress={() => setShowPreview(null)}>
                <Text style={styles.modalClose}>X</Text>
              </TouchableOpacity>
            </Row>
            <View style={styles.waBubble}>
              {showPreview?.headerType === 'TEXT' && showPreview?.headerText ? (
                <Text style={styles.waHeader}>{showPreview.headerText}</Text>
              ) : null}
              <Text style={styles.waBody}>{showPreview?.body}</Text>
              {showPreview?.footer ? (
                <Text style={styles.waFooter}>{showPreview.footer}</Text>
              ) : null}
            </View>
            {showPreview?.buttons?.length > 0 && (
              <View style={{ marginTop: 6 }}>
                {showPreview.buttons.map((btn: any, i: number) => (
                  <View key={i} style={styles.waButton}>
                    <Text style={styles.waButtonText}>{btn.text}</Text>
                  </View>
                ))}
              </View>
            )}
            <TouchableOpacity
              style={[styles.addBtn, { marginTop: Spacing.base, alignSelf: 'stretch' }]}
              onPress={() => {
                setShowPreview(null);
                openEdit(showPreview);
              }}
            >
              <Text style={styles.addBtnText}>EDIT TEMPLATE</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.base, paddingBottom: 0 },
  syncBtn: {
    borderWidth: Border.widthBold,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  syncBtnText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: 0.5,
  },
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
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: Border.width,
    borderColor: Colors.border,
    padding: Spacing.sm,
    alignItems: 'center',
  },
  statValue: {
    fontSize: Typography['2xl'],
    fontWeight: Typography.black,
  },
  statLabel: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    color: Colors.mutedForeground,
    letterSpacing: 0.5,
    marginTop: 2,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: Border.width,
    borderColor: Colors.border,
    marginBottom: 4,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    color: Colors.foreground,
    letterSpacing: 0.3,
  },
  chipTextActive: { color: Colors.white },
  count: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
  },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  templateName: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: -0.2,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 2,
  },
  badgeText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 0.3,
  },
  bodyPreview: {
    fontSize: Typography.sm,
    color: Colors.foreground,
    fontWeight: Typography.medium,
    lineHeight: 18,
    marginTop: 4,
  },
  footerText: {
    fontSize: Typography.xs,
    color: Colors.mutedForeground,
    marginTop: 4,
    fontStyle: 'italic',
  },
  buttonChip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#25D366',
    backgroundColor: Colors.white,
  },
  buttonChipText: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    color: '#128C7E',
  },
  actionBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
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
  },
  modalClose: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.destructive,
    letterSpacing: 0.5,
  },
  modalContent: { padding: Spacing.base },
  fieldLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: 0.5,
    marginBottom: 6,
    marginTop: Spacing.sm,
  },
  insertVarBtn: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.primary,
    letterSpacing: 0.3,
    marginBottom: 6,
    marginTop: Spacing.sm,
  },
  addChipBtn: {
    backgroundColor: Colors.foreground,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: Border.width,
    borderColor: Colors.border,
    alignSelf: 'flex-end',
  },
  addChipBtnText: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 0.5,
  },
  variableChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: Border.width,
    borderColor: Colors.warning,
    backgroundColor: '#FEF3C7',
    marginBottom: 4,
  },
  variableChipText: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    color: '#92400E',
  },
  previewOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.base,
  },
  previewCard: {
    backgroundColor: Colors.white,
    borderWidth: Border.widthBold,
    borderColor: Colors.border,
    padding: Spacing.lg,
    width: '100%',
    ...Shadows.lg,
  },
  previewTitle: {
    fontSize: Typography.lg,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  waBubble: {
    backgroundColor: '#DCF8C6',
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#A8D8A0',
    marginTop: Spacing.sm,
  },
  waHeader: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.foreground,
    marginBottom: 6,
  },
  waBody: {
    fontSize: Typography.sm,
    color: Colors.foreground,
    lineHeight: 20,
  },
  waFooter: {
    fontSize: Typography.xs,
    color: Colors.mutedForeground,
    marginTop: 6,
    fontStyle: 'italic',
  },
  waButton: {
    borderTopWidth: 1,
    borderTopColor: '#A8D8A0',
    paddingVertical: 8,
    alignItems: 'center',
  },
  waButtonText: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: '#128C7E',
  },
});

export default WhatsAppTemplatesScreen;
