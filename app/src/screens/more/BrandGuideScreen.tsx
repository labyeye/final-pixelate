import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  Alert,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { X, FileText, Mail, Check } from 'lucide-react-native';
import api from '../../api/client';
import { brandGuideAPI, clientsAPI } from '../../api';
import {
  Card,
  Row,
  StatCard,
  RowActions,
  SearchBar,
  Input,
  Button,
  EmptyState,
  LoadingSpinner,
} from '../../components/common';
import { Colors, Typography, Spacing } from '../../theme';
import { fmtDate, apiError } from '../products/shared';

// Uploaded PDFs are stored as site-relative paths (/uploads/brand-guides/..).
const HOST = String(api.defaults.baseURL).replace(/\/api\/?$/, '');
const absUrl = (u: string) => (u.startsWith('http') ? u : `${HOST}${u}`);
const idOf = (x: any) => String(x?._id ?? x?.id ?? '');

const emptyForm = {
  clientId: '',
  clientName: '',
  brandName: '',
  primaryColors: [] as string[],
  secondaryColors: [] as string[],
  fonts: [] as string[],
  brandVoice: '',
  logoUrl: '',
  pdfUrl: '',
  notes: '',
};

const TagInput = ({
  label,
  values,
  onChange,
  placeholder,
  swatch,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
  placeholder: string;
  swatch?: boolean;
}) => {
  const [text, setText] = useState('');
  const add = () => {
    const v = text.trim();
    if (v && !values.includes(v)) onChange([...values, v]);
    setText('');
  };
  return (
    <View style={{ marginBottom: Spacing.md }}>
      <Input
        label={label}
        value={text}
        onChangeText={setText}
        onSubmitEditing={add}
        placeholder={placeholder}
        returnKeyType="done"
        containerStyle={{ marginBottom: Spacing.sm }}
        rightIcon={
          <TouchableOpacity onPress={add} hitSlop={8}>
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        }
      />
      <View style={styles.tags}>
        {values.map(v => (
          <TouchableOpacity
            key={v}
            style={styles.tag}
            onPress={() => onChange(values.filter(x => x !== v))}
          >
            {swatch && <View style={[styles.swatch, { backgroundColor: v }]} />}
            <Text style={styles.tagText}>{v}</Text>
            <X size={12} color={Colors.mutedForeground} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const BrandGuideScreen = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<any | null>(null); // {} = new
  const [form, setForm] = useState(emptyForm);
  const [pickClient, setPickClient] = useState(false);
  const [clientSearch, setClientSearch] = useState('');
  const [emailing, setEmailing] = useState<string | null>(null);
  const set = (k: keyof typeof emptyForm, v: any) =>
    setForm(f => ({ ...f, [k]: v }));

  const { data: guides = [], isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['brand-guides'],
    queryFn: () =>
      brandGuideAPI.getAll().then(r => (Array.isArray(r.data) ? r.data : [])),
  });
  const { data: clients = [] } = useQuery({
    queryKey: ['clients'],
    queryFn: () =>
      clientsAPI.getAll().then(r => (Array.isArray(r.data) ? r.data : [])),
  });

  const refresh = () => qc.invalidateQueries({ queryKey: ['brand-guides'] });
  const onError = (e: any) => Alert.alert('Error', apiError(e, 'Request failed'));

  const save = useMutation({
    mutationFn: () =>
      editing?._id || editing?.id
        ? brandGuideAPI.update(idOf(editing), form)
        : brandGuideAPI.create(form),
    onSuccess: () => {
      refresh();
      setEditing(null);
    },
    onError,
  });

  const remove = useMutation({
    mutationFn: (id: string) => brandGuideAPI.delete(id),
    onSuccess: refresh,
    onError,
  });

  const openForm = (g?: any) => {
    setForm(
      g
        ? {
            clientId: g.clientId ?? '',
            clientName: g.clientName ?? '',
            brandName: g.brandName ?? '',
            primaryColors: g.primaryColors ?? [],
            secondaryColors: g.secondaryColors ?? [],
            fonts: g.fonts ?? [],
            brandVoice: g.brandVoice ?? '',
            logoUrl: g.logoUrl ?? '',
            pdfUrl: g.pdfUrl ?? '',
            notes: g.notes ?? '',
          }
        : emptyForm,
    );
    setEditing(g ?? {});
  };

  const confirmDelete = (g: any) =>
    Alert.alert('Delete brand guide', `Delete the guide for "${g.brandName || g.clientName}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => remove.mutate(idOf(g)) },
    ]);

  // Mirrors the dashboard: fetch the stored PDF, attach it as base64.
  const sendEmail = async (g: any) => {
    const client = clients.find((c: any) => idOf(c) === g.clientId);
    if (!client?.email) return Alert.alert('No email', 'This client has no email address saved.');
    if (!g.pdfUrl) return Alert.alert('No PDF', 'Upload a PDF from the web dashboard first.');
    setEmailing(idOf(g));
    try {
      const res = await fetch(absUrl(g.pdfUrl));
      if (!res.ok) throw new Error('Could not read the stored PDF file');
      const blob = await res.blob();
      const pdfBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(String(reader.result).split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
      await brandGuideAPI.sendEmail({
        to: client.email,
        clientName: g.clientName,
        brandName: g.brandName,
        pdfBase64,
        fileName: `Brand-Guide-${g.brandName}.pdf`,
      });
      Alert.alert('Email sent', `Brand guide sent to ${client.email}`);
    } catch (e: any) {
      onError(e);
    } finally {
      setEmailing(null);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  const q = search.toLowerCase();
  const filtered = guides.filter(
    (g: any) =>
      !q ||
      g.brandName?.toLowerCase().includes(q) ||
      g.clientName?.toLowerCase().includes(q),
  );
  const withPdf = guides.filter((g: any) => g.pdfUrl).length;
  const cq = clientSearch.toLowerCase();
  const clientOptions = clients.filter(
    (c: any) => !cq || c.name?.toLowerCase().includes(cq),
  );

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <FlatList
        data={filtered}
        keyExtractor={g => idOf(g)}
        contentContainerStyle={styles.content}
        refreshing={isRefetching}
        onRefresh={refetch}
        ListHeaderComponent={
          <>
            <View style={styles.grid}>
              <StatCard label="Total guides" value={guides.length} />
              <StatCard
                label="Clients covered"
                value={new Set(guides.map((g: any) => g.clientId)).size}
              />
              <StatCard label="With PDF" value={withPdf} />
              <StatCard label="Pending PDF" value={guides.length - withPdf} />
            </View>
            <Button label="+ New brand guide" onPress={() => openForm()} style={{ marginVertical: Spacing.base }} />
            <SearchBar value={search} onChangeText={setSearch} placeholder="Search brand or client..." />
          </>
        }
        ListEmptyComponent={<EmptyState title="No brand guides yet" />}
        renderItem={({ item: g }) => (
          <Card style={styles.card} shadow="sm">
            <Row justify="space-between" align="flex-start">
              <View style={{ flex: 1 }}>
                <Text style={styles.brand}>{g.brandName || 'Untitled brand'}</Text>
                <Text style={styles.client}>{g.clientName}</Text>
              </View>
              <RowActions onEdit={() => openForm(g)} onDelete={() => confirmDelete(g)} />
            </Row>
            {[...(g.primaryColors ?? []), ...(g.secondaryColors ?? [])].length > 0 && (
              <View style={[styles.tags, { marginTop: Spacing.sm }]}>
                {[...(g.primaryColors ?? []), ...(g.secondaryColors ?? [])].map((c: string) => (
                  <View key={c} style={[styles.swatchLg, { backgroundColor: c }]} />
                ))}
              </View>
            )}
            {g.fonts?.length ? <Text style={styles.meta}>Fonts: {g.fonts.join(', ')}</Text> : null}
            {g.brandVoice ? (
              <Text style={styles.meta} numberOfLines={2}>
                Voice: {g.brandVoice}
              </Text>
            ) : null}
            <Row justify="space-between" style={{ marginTop: Spacing.sm }}>
              <Text style={styles.meta}>Updated {fmtDate(g.updatedAt ?? g.createdAt)}</Text>
              <Row gap={Spacing.sm}>
                {g.pdfUrl ? (
                  <Button
                    label="PDF"
                    size="sm"
                    variant="outline"
                    icon={<FileText size={14} color={Colors.foreground} />}
                    onPress={() => Linking.openURL(absUrl(g.pdfUrl))}
                  />
                ) : null}
                <Button
                  label="Email"
                  size="sm"
                  variant="outline"
                  icon={<Mail size={14} color={Colors.foreground} />}
                  loading={emailing === idOf(g)}
                  onPress={() => sendEmail(g)}
                />
              </Row>
            </Row>
          </Card>
        )}
      />

      <Modal visible={!!editing} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <Row justify="space-between" style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {idOf(editing) ? 'Edit brand guide' : 'New brand guide'}
            </Text>
            <TouchableOpacity onPress={() => setEditing(null)} hitSlop={10}>
              <X size={20} color={Colors.foreground} />
            </TouchableOpacity>
          </Row>
          <ScrollView contentContainerStyle={styles.modalContent} keyboardShouldPersistTaps="handled">
            <Text style={styles.label}>Client *</Text>
            <TouchableOpacity style={styles.picker} onPress={() => setPickClient(true)}>
              <Text style={form.clientName ? styles.pickerText : styles.pickerPlaceholder}>
                {form.clientName || 'Select a client'}
              </Text>
            </TouchableOpacity>
            <Input label="Brand name" value={form.brandName} onChangeText={v => set('brandName', v)} placeholder="e.g. Pixelate Nest" />
            <TagInput label="Primary colours" values={form.primaryColors} onChange={v => set('primaryColors', v)} placeholder="#044bab or Red" swatch />
            <TagInput label="Secondary colours" values={form.secondaryColors} onChange={v => set('secondaryColors', v)} placeholder="#F76B10" swatch />
            <TagInput label="Fonts" values={form.fonts} onChange={v => set('fonts', v)} placeholder="Inter, Roboto..." />
            <Input label="Brand voice" value={form.brandVoice} onChangeText={v => set('brandVoice', v)} placeholder="Professional, friendly..." multiline />
            <Input label="Logo URL" value={form.logoUrl} onChangeText={v => set('logoUrl', v)} placeholder="https://..." autoCapitalize="none" />
            <Input label="PDF URL" value={form.pdfUrl} onChangeText={v => set('pdfUrl', v)} placeholder="Upload PDFs from the web dashboard" autoCapitalize="none" />
            <Input label="Notes" value={form.notes} onChangeText={v => set('notes', v)} multiline />
            <Button
              label={idOf(editing) ? 'Save changes' : 'Create'}
              onPress={() =>
                form.clientId
                  ? save.mutate()
                  : Alert.alert('Select a client', 'Please choose a client first.')
              }
              loading={save.isPending}
              fullWidth
            />
          </ScrollView>
        </SafeAreaView>

        <Modal visible={pickClient} animationType="slide" presentationStyle="pageSheet">
          <SafeAreaView style={styles.modal}>
            <Row justify="space-between" style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select client</Text>
              <TouchableOpacity onPress={() => setPickClient(false)} hitSlop={10}>
                <X size={20} color={Colors.foreground} />
              </TouchableOpacity>
            </Row>
            <FlatList
              data={clientOptions}
              keyExtractor={c => idOf(c)}
              contentContainerStyle={styles.modalContent}
              keyboardShouldPersistTaps="handled"
              ListHeaderComponent={
                <SearchBar value={clientSearch} onChangeText={setClientSearch} placeholder="Search clients..." />
              }
              renderItem={({ item: c }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    setForm(f => ({ ...f, clientId: idOf(c), clientName: c.name }));
                    setPickClient(false);
                  }}
                >
                  <Text style={styles.pickerText}>{c.name}</Text>
                  {form.clientId === idOf(c) && <Check size={16} color={Colors.primary} />}
                </TouchableOpacity>
              )}
            />
          </SafeAreaView>
        </Modal>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  brand: { fontSize: Typography.base, fontWeight: Typography.bold, color: Colors.foreground },
  client: { fontSize: Typography.sm, color: Colors.primary, fontWeight: Typography.medium, marginTop: 2 },
  meta: { fontSize: Typography.sm, color: Colors.mutedForeground, marginTop: 4 },
  label: { fontSize: Typography.sm, fontWeight: Typography.semiBold, color: Colors.foreground, marginBottom: 6 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
  },
  tagText: { fontSize: Typography.sm, color: Colors.foreground },
  swatch: { width: 12, height: 12, borderRadius: 6, borderWidth: 1, borderColor: Colors.border },
  swatchLg: { width: 22, height: 22, borderRadius: 6, borderWidth: 1, borderColor: Colors.border },
  addText: { fontSize: Typography.sm, fontWeight: Typography.semiBold, color: Colors.primary },
  picker: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    backgroundColor: Colors.card,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    marginBottom: Spacing.md,
  },
  pickerText: { fontSize: Typography.base, color: Colors.foreground },
  pickerPlaceholder: { fontSize: Typography.base, color: Colors.gray400 },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modal: { flex: 1, backgroundColor: Colors.background },
  modalHeader: {
    padding: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.card,
  },
  modalTitle: { fontSize: Typography.lg, fontWeight: Typography.bold, color: Colors.foreground },
  modalContent: { padding: Spacing.base },
});

export default BrandGuideScreen;
