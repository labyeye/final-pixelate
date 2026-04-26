import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clientsAPI } from '../../api';
import { Card, Row, SearchBar, Button, Input, EmptyState, LoadingSpinner } from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';
import { CRMStackParams } from '../../navigation/types';

type Nav = NativeStackNavigationProp<CRMStackParams>;

const ClientsScreen = () => {
  const navigation = useNavigation<Nav>();
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '' });

  const { data: clients = [], isLoading, refetch } = useQuery({
    queryKey: ['clients'],
    queryFn: () => clientsAPI.getAll().then(r => r.data),
  });

  const addMutation = useMutation({
    mutationFn: (data: any) => clientsAPI.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['clients'] });
      setShowAdd(false);
      setForm({ name: '', email: '', phone: '', city: '' });
    },
    onError: () => Alert.alert('Error', 'Failed to add client'),
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const filtered = Array.isArray(clients)
    ? clients.filter((c: any) =>
        !search ||
        c.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.email?.toLowerCase().includes(search.toLowerCase()) ||
        c.phone?.includes(search)
      )
    : [];

  if (isLoading) return <LoadingSpinner />;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search clients..." />
        <Row justify="space-between" align="center" style={{ marginBottom: Spacing.sm }}>
          <Text style={styles.countLabel}>{filtered.length} CLIENTS</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => setShowAdd(true)}>
            <Text style={styles.addBtnText}>+ ADD</Text>
          </TouchableOpacity>
        </Row>
        <FlatList
          data={filtered}
          keyExtractor={item => String(item._id || item.id)}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
          ListEmptyComponent={<EmptyState title="No Clients" subtitle="Add your first client" action={{ label: '+ Add Client', onPress: () => setShowAdd(true) }} />}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('ClientDetail', { id: String(item._id || item.id) })} activeOpacity={0.85}>
              <Card style={styles.card} shadow="sm">
                <Row align="center" gap={Spacing.md}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{(item.name || 'C').charAt(0).toUpperCase()}</Text>
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.clientName}>{item.name}</Text>
                    {item.email ? <Text style={styles.clientEmail}>{item.email}</Text> : null}
                    {item.phone ? <Text style={styles.clientPhone}>{item.phone}</Text> : null}
                    {item.city ? <Text style={styles.clientCity}>{item.city}</Text> : null}
                  </View>
                  {item.hasGst ? (
                    <View style={styles.gstBadge}>
                      <Text style={styles.gstText}>GST</Text>
                    </View>
                  ) : null}
                </Row>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>

      <Modal visible={showAdd} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <Row justify="space-between" align="center" style={styles.modalHeader}>
            <Text style={styles.modalTitle}>ADD CLIENT</Text>
            <TouchableOpacity onPress={() => setShowAdd(false)}>
              <Text style={styles.modalClose}>✕ CANCEL</Text>
            </TouchableOpacity>
          </Row>
          <View style={styles.modalContent}>
            <Input label="NAME *" value={form.name} onChangeText={v => setForm(p => ({ ...p, name: v }))} placeholder="Client name" />
            <Input label="EMAIL" value={form.email} onChangeText={v => setForm(p => ({ ...p, email: v }))} placeholder="email@company.com" keyboardType="email-address" autoCapitalize="none" />
            <Input label="PHONE" value={form.phone} onChangeText={v => setForm(p => ({ ...p, phone: v }))} placeholder="+91 98765 43210" keyboardType="phone-pad" />
            <Input label="CITY" value={form.city} onChangeText={v => setForm(p => ({ ...p, city: v }))} placeholder="Mumbai" />
            <Button
              label={addMutation.isPending ? 'ADDING...' : 'ADD CLIENT'}
              onPress={() => { if (!form.name.trim()) { Alert.alert('Error', 'Name required'); return; } addMutation.mutate(form); }}
              loading={addMutation.isPending}
              fullWidth size="lg"
              style={{ marginTop: Spacing.base }}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.base, paddingBottom: 0 },
  countLabel: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.mutedForeground, letterSpacing: 0.5 },
  addBtn: { backgroundColor: Colors.secondary, borderWidth: Border.widthBold, borderColor: Colors.black, paddingHorizontal: 14, paddingVertical: 6, ...Shadows.sm },
  addBtnText: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.white, letterSpacing: 0.5 },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  avatar: { width: 44, height: 44, backgroundColor: Colors.primary, borderWidth: Border.width, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: Typography.xl, fontWeight: Typography.black, color: Colors.white },
  cardInfo: { flex: 1 },
  clientName: { fontSize: Typography.base, fontWeight: Typography.black, color: Colors.foreground },
  clientEmail: { fontSize: Typography.sm, color: Colors.mutedForeground, fontWeight: Typography.medium, marginTop: 1 },
  clientPhone: { fontSize: Typography.sm, color: Colors.primary, fontWeight: Typography.bold, marginTop: 1 },
  clientCity: { fontSize: Typography.xs, color: Colors.gray500, fontWeight: Typography.medium, marginTop: 1 },
  gstBadge: { backgroundColor: Colors.success, paddingHorizontal: 6, paddingVertical: 2, borderWidth: 1, borderColor: Colors.border },
  gstText: { fontSize: Typography.xs, fontWeight: Typography.black, color: Colors.white },
  modal: { flex: 1, backgroundColor: Colors.background },
  modalHeader: { padding: Spacing.base, borderBottomWidth: Border.widthBold, borderBottomColor: Colors.border },
  modalTitle: { fontSize: Typography['2xl'], fontWeight: Typography.black, color: Colors.foreground, letterSpacing: 1 },
  modalClose: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.destructive, letterSpacing: 0.5 },
  modalContent: { padding: Spacing.base },
});

export default ClientsScreen;
