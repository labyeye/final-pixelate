import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { clientsAPI, whatsappAPI } from '../../api';
import { Card, Row, Button, Input, SectionHeader, LoadingSpinner } from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';

const BulkMessagingScreen = () => {
  const [message, setMessage] = useState('');
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [sending, setSending] = useState(false);

  const { data: clients = [], isLoading } = useQuery({ queryKey: ['clients'], queryFn: () => clientsAPI.getAll().then(r => r.data) });

  const toggleClient = (id: string) => {
    setSelectedClients(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  const handleSend = async () => {
    if (!message.trim()) { Alert.alert('Error', 'Please enter a message'); return; }
    if (selectedClients.length === 0) { Alert.alert('Error', 'Select at least one client'); return; }
    setSending(true);
    try {
      const recipients = (Array.isArray(clients) ? clients : [])
        .filter((c: any) => selectedClients.includes(String(c._id || c.id)))
        .map((c: any) => ({ phone: c.phone, name: c.name }));
      await whatsappAPI.bulkSend({ message, recipients });
      Alert.alert('Success', `Message sent to ${recipients.length} clients!`);
      setMessage('');
      setSelectedClients([]);
    } catch {
      Alert.alert('Error', 'Failed to send messages. Check your WhatsApp integration.');
    } finally {
      setSending(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  const clientList = Array.isArray(clients) ? clients.filter((c: any) => c.phone) : [];

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.whatsappBadge}>
            <Text style={styles.whatsappBadgeText}>📤 BULK MESSAGING</Text>
          </View>
        </View>

        <SectionHeader title="MESSAGE" />
        <Card style={styles.messageCard}>
          <Input
            label="MESSAGE TEMPLATE"
            value={message}
            onChangeText={setMessage}
            placeholder="Enter your WhatsApp message here..."
            multiline
            containerStyle={{ marginBottom: 0 }}
          />
          <Text style={styles.charCount}>{message.length} characters</Text>
        </Card>

        <SectionHeader title={`SELECT RECIPIENTS (${selectedClients.length} selected)`} style={{ marginTop: Spacing.lg }} />
        <Row style={{ marginBottom: Spacing.sm }} gap={8}>
          <TouchableOpacity style={styles.selectAllBtn} onPress={() => setSelectedClients(clientList.map((c: any) => String(c._id || c.id)))}>
            <Text style={styles.selectAllText}>SELECT ALL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearBtn} onPress={() => setSelectedClients([])}>
            <Text style={styles.clearText}>CLEAR</Text>
          </TouchableOpacity>
        </Row>

        {clientList.map((client: any) => {
          const id = String(client._id || client.id);
          const selected = selectedClients.includes(id);
          return (
            <TouchableOpacity key={id} onPress={() => toggleClient(id)} activeOpacity={0.85}>
              <Card style={[styles.clientCard, selected && styles.clientCardSelected]} shadow="sm">
                <Row align="center" gap={Spacing.md}>
                  <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
                    {selected ? <Text style={styles.checkmark}>✓</Text> : null}
                  </View>
                  <View style={styles.clientInfo}>
                    <Text style={styles.clientName}>{client.name}</Text>
                    <Text style={styles.clientPhone}>{client.phone}</Text>
                  </View>
                </Row>
              </Card>
            </TouchableOpacity>
          );
        })}

        {clientList.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyText}>No clients with phone numbers found.</Text>
            <Text style={styles.emptySubtext}>Add phone numbers to clients first.</Text>
          </Card>
        ) : null}

        <Button
          label={sending ? 'SENDING...' : `SEND TO ${selectedClients.length} CLIENTS`}
          onPress={handleSend}
          loading={sending}
          fullWidth
          size="lg"
          style={{ marginTop: Spacing.xl, backgroundColor: '#25D366', borderColor: Colors.black }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, paddingBottom: 24 },
  header: { marginBottom: Spacing.base },
  whatsappBadge: { backgroundColor: '#25D366', borderWidth: Border.widthBold, borderColor: Colors.black, paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start' },
  whatsappBadgeText: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.white, letterSpacing: 1 },
  messageCard: { padding: Spacing.md, marginBottom: Spacing.base },
  charCount: { fontSize: Typography.xs, color: Colors.mutedForeground, fontWeight: Typography.medium, textAlign: 'right', marginTop: 4 },
  selectAllBtn: { backgroundColor: Colors.primary, borderWidth: Border.width, borderColor: Colors.border, paddingHorizontal: 12, paddingVertical: 6 },
  selectAllText: { fontSize: Typography.xs, fontWeight: Typography.black, color: Colors.white, letterSpacing: 0.5 },
  clearBtn: { borderWidth: Border.width, borderColor: Colors.border, paddingHorizontal: 12, paddingVertical: 6 },
  clearText: { fontSize: Typography.xs, fontWeight: Typography.black, color: Colors.foreground, letterSpacing: 0.5 },
  clientCard: { marginBottom: Spacing.sm, padding: Spacing.md },
  clientCardSelected: { borderColor: '#25D366', borderWidth: Border.widthBold },
  checkbox: { width: 24, height: 24, borderWidth: Border.widthBold, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center' },
  checkboxSelected: { backgroundColor: '#25D366', borderColor: '#25D366' },
  checkmark: { color: Colors.white, fontSize: 14, fontWeight: Typography.black },
  clientInfo: { flex: 1 },
  clientName: { fontSize: Typography.base, fontWeight: Typography.black, color: Colors.foreground },
  clientPhone: { fontSize: Typography.sm, color: Colors.mutedForeground, fontWeight: Typography.medium, marginTop: 1 },
  emptyCard: { padding: Spacing.xl, alignItems: 'center' },
  emptyText: { fontSize: Typography.base, fontWeight: Typography.black, color: Colors.foreground },
  emptySubtext: { fontSize: Typography.sm, color: Colors.mutedForeground, fontWeight: Typography.medium, marginTop: 4 },
});

export default BulkMessagingScreen;
