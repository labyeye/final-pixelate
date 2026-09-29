import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Check } from 'lucide-react-native';
import { clientsAPI, whatsappSendAPI } from '../../api';
import {
  Card,
  Row,
  Badge,
  SearchBar,
  Input,
  Button,
  SectionHeader,
  EmptyState,
  LoadingSpinner,
} from '../../components/common';
import { Colors, Typography, Spacing } from '../../theme';

// Distinct {{n}} placeholders in a template body, ascending — Meta requires
// exactly one body parameter per placeholder, in order.
const bodyVars = (body = '') =>
  [...new Set([...body.matchAll(/\{\{(\d+)\}\}/g)].map(m => Number(m[1])))].sort(
    (a, b) => a - b,
  );

const WhatsAppSendScreen = () => {
  const [clientSearch, setClientSearch] = useState('');
  const [client, setClient] = useState<any | null>(null);
  const [phone, setPhone] = useState('');
  const [templateSearch, setTemplateSearch] = useState('');
  const [template, setTemplate] = useState<any | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['wa-templates-approved'],
    queryFn: () =>
      whatsappSendAPI.getApprovedTemplates().then(r => (Array.isArray(r.data) ? r.data : [])),
  });
  const { data: clients = [] } = useQuery({
    queryKey: ['clients'],
    queryFn: () => clientsAPI.getAll().then(r => (Array.isArray(r.data) ? r.data : [])),
  });

  const vars = template ? bodyVars(template.body) : [];
  const needsDocument = template?.headerType === 'DOCUMENT';

  const send = useMutation({
    mutationFn: () =>
      whatsappSendAPI.sendTemplate({
        phone: phone.trim(),
        templateName: template.name,
        templateLang: template.language || 'en',
        components: vars.length
          ? [{ type: 'body', parameters: vars.map(n => ({ type: 'text', text: values[n] || '' })) }]
          : [],
      }),
    onSuccess: () => Alert.alert('Message sent', `Delivered to ${phone.trim()}`),
    onError: (e: any) =>
      Alert.alert('Send failed', e?.response?.data?.error || e?.message || 'Unknown error'),
  });

  const cq = clientSearch.toLowerCase();
  const clientMatches = useMemo(
    () =>
      clients
        .filter(
          (c: any) =>
            !cq ||
            c.name?.toLowerCase().includes(cq) ||
            c.phone?.includes(cq) ||
            c.company?.toLowerCase().includes(cq),
        )
        .slice(0, 6),
    [clients, cq],
  );
  const tq = templateSearch.toLowerCase();
  const templateMatches = templates.filter(
    (t: any) =>
      !tq ||
      t.name.toLowerCase().includes(tq) ||
      t.category?.toLowerCase().includes(tq) ||
      t.body?.toLowerCase().includes(tq),
  );

  const preview = template?.body?.replace(/\{\{(\d+)\}\}/g, (m: string, n: string) => values[n] || m);
  const canSend =
    !!template && !!phone.trim() && !needsDocument && vars.every(n => values[n]?.trim());

  if (isLoading) return <LoadingSpinner />;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <SectionHeader title="1. Recipient" />
        {client ? (
          <Card style={styles.card}>
            <Row justify="space-between">
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{client.name}</Text>
                {client.company ? <Text style={styles.meta}>{client.company}</Text> : null}
              </View>
              <TouchableOpacity onPress={() => { setClient(null); setPhone(''); }}>
                <Text style={styles.link}>Change</Text>
              </TouchableOpacity>
            </Row>
          </Card>
        ) : (
          <>
            <SearchBar value={clientSearch} onChangeText={setClientSearch} placeholder="Search clients..." />
            {clientMatches.map((c: any) => (
              <TouchableOpacity
                key={c._id}
                style={styles.option}
                onPress={() => { setClient(c); setPhone(c.phone || ''); }}
              >
                <Text style={styles.name}>{c.name}</Text>
                <Text style={styles.meta}>{c.phone || 'No phone'}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}
        <Input
          label="Phone (with country code)"
          value={phone}
          onChangeText={setPhone}
          placeholder="919876543210"
          keyboardType="phone-pad"
          containerStyle={{ marginTop: Spacing.md }}
        />

        <SectionHeader title="2. Approved template" style={{ marginTop: Spacing.lg }} />
        {templates.length === 0 ? (
          <EmptyState title="No approved templates" subtitle="Submit templates to Meta from WA Templates" />
        ) : (
          <>
            <SearchBar value={templateSearch} onChangeText={setTemplateSearch} placeholder="Search templates..." />
            {templateMatches.map((t: any) => {
              const active = template?._id === t._id;
              return (
                <Card
                  key={t._id}
                  style={[styles.card, active && { borderColor: Colors.primary }]}
                  onPress={() => { setTemplate(t); setValues({}); }}
                >
                  <Row justify="space-between">
                    <Text style={styles.name}>{t.name}</Text>
                    {active ? <Check size={16} color={Colors.primary} /> : <Badge label={t.category} />}
                  </Row>
                  <Text style={styles.meta} numberOfLines={2}>{t.body}</Text>
                </Card>
              );
            })}
          </>
        )}

        {template && (
          <>
            <SectionHeader title="3. Fill & send" style={{ marginTop: Spacing.lg }} />
            {needsDocument && (
              <Text style={styles.warn}>
                This template needs a PDF attachment — send it from the web dashboard.
              </Text>
            )}
            {vars.map(n => (
              <Input
                key={n}
                label={`Variable {{${n}}}`}
                value={values[n] || ''}
                onChangeText={v => setValues(p => ({ ...p, [n]: v }))}
              />
            ))}
            <View style={styles.preview}>
              {template.headerText ? <Text style={styles.previewHeader}>{template.headerText}</Text> : null}
              <Text style={styles.previewBody}>{preview}</Text>
              {template.footer ? <Text style={styles.previewFooter}>{template.footer}</Text> : null}
            </View>
            <Button
              label="Send message"
              onPress={() => send.mutate()}
              disabled={!canSend}
              loading={send.isPending}
              fullWidth
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, paddingBottom: Spacing['2xl'] },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  name: { fontSize: Typography.base, fontWeight: Typography.semiBold, color: Colors.foreground },
  meta: { fontSize: Typography.sm, color: Colors.mutedForeground, marginTop: 2 },
  link: { fontSize: Typography.sm, fontWeight: Typography.semiBold, color: Colors.primary },
  option: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  warn: {
    fontSize: Typography.sm,
    color: Colors.warning,
    marginBottom: Spacing.md,
  },
  preview: {
    backgroundColor: '#E7F8EE',
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.base,
  },
  previewHeader: { fontSize: Typography.base, fontWeight: Typography.bold, color: Colors.foreground, marginBottom: 4 },
  previewBody: { fontSize: Typography.base, color: Colors.foreground, lineHeight: 20 },
  previewFooter: { fontSize: Typography.xs, color: Colors.mutedForeground, marginTop: 6 },
});

export default WhatsAppSendScreen;
