import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { inventoryAPI } from '../../api';
import { Card, Row, SearchBar, Button, Input, EmptyState, LoadingSpinner, StatusBadge } from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';

const InventoryScreen = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ itemName: '', category: '', quantityAvailable: '', unit: 'pcs', price: '', vendorName: '' });

  const { data: inventory = [], isLoading } = useQuery({ queryKey: ['inventory'], queryFn: () => inventoryAPI.getAll().then(r => r.data) });

  const addMutation = useMutation({
    mutationFn: (data: any) => inventoryAPI.create(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['inventory'] }); setShowAdd(false); setForm({ itemName: '', category: '', quantityAvailable: '', unit: 'pcs', price: '', vendorName: '' }); },
    onError: () => Alert.alert('Error', 'Failed to add item'),
  });

  if (isLoading) return <LoadingSpinner />;

  const filtered = Array.isArray(inventory)
    ? inventory.filter((i: any) => !search || i.itemName?.toLowerCase().includes(search.toLowerCase()) || i.category?.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search inventory..." />
        <Row justify="space-between" align="center" style={{ marginBottom: Spacing.sm }}>
          <Text style={styles.count}>{filtered.length} ITEMS</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => setShowAdd(true)}>
            <Text style={styles.addBtnText}>+ ADD</Text>
          </TouchableOpacity>
        </Row>
        <FlatList
          data={filtered}
          keyExtractor={(item, i) => String(item._id || i)}
          ListEmptyComponent={<EmptyState title="No Inventory" subtitle="Add your inventory items" action={{ label: '+ Add Item', onPress: () => setShowAdd(true) }} />}
          renderItem={({ item }) => (
            <Card style={styles.card} shadow="sm">
              <Row justify="space-between" align="flex-start">
                <View style={styles.cardLeft}>
                  <Text style={styles.itemName}>{item.itemName}</Text>
                  {item.category ? <Text style={styles.category}>{item.category}</Text> : null}
                  {item.vendorName ? <Text style={styles.vendor}>Vendor: {item.vendorName}</Text> : null}
                  <Row style={{ marginTop: 6 }} gap={8}>
                    <View style={styles.qtyBadge}>
                      <Text style={styles.qtyText}>{item.quantityAvailable} {item.unit}</Text>
                    </View>
                    {item.price ? <Text style={styles.price}>₹{item.price}</Text> : null}
                  </Row>
                </View>
                <StatusBadge status={item.status || 'Available'} />
              </Row>
            </Card>
          )}
        />
      </View>
      <Modal visible={showAdd} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <Row justify="space-between" align="center" style={styles.modalHeader}>
            <Text style={styles.modalTitle}>ADD ITEM</Text>
            <TouchableOpacity onPress={() => setShowAdd(false)}><Text style={styles.modalClose}>✕ CANCEL</Text></TouchableOpacity>
          </Row>
          <View style={styles.modalContent}>
            <Input label="ITEM NAME *" value={form.itemName} onChangeText={v => setForm(p => ({ ...p, itemName: v }))} placeholder="e.g. MacBook Pro 14" />
            <Input label="CATEGORY" value={form.category} onChangeText={v => setForm(p => ({ ...p, category: v }))} placeholder="e.g. Laptops" />
            <Input label="QUANTITY" value={form.quantityAvailable} onChangeText={v => setForm(p => ({ ...p, quantityAvailable: v }))} keyboardType="numeric" />
            <Input label="UNIT" value={form.unit} onChangeText={v => setForm(p => ({ ...p, unit: v }))} placeholder="pcs / kg / m" />
            <Input label="PRICE (₹)" value={form.price} onChangeText={v => setForm(p => ({ ...p, price: v }))} keyboardType="numeric" />
            <Input label="VENDOR" value={form.vendorName} onChangeText={v => setForm(p => ({ ...p, vendorName: v }))} placeholder="Vendor name" />
            <Button label={addMutation.isPending ? 'ADDING...' : 'ADD ITEM'} onPress={() => { if (!form.itemName.trim()) { Alert.alert('Error', 'Item name required'); return; } addMutation.mutate({ ...form, quantityAvailable: Number(form.quantityAvailable), price: Number(form.price) }); }} loading={addMutation.isPending} fullWidth size="lg" style={{ marginTop: Spacing.base }} />
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
  cardLeft: { flex: 1 },
  itemName: { fontSize: Typography.base, fontWeight: Typography.black, color: Colors.foreground },
  category: { fontSize: Typography.sm, color: Colors.accent, fontWeight: Typography.bold, marginTop: 2 },
  vendor: { fontSize: Typography.sm, color: Colors.mutedForeground, fontWeight: Typography.medium, marginTop: 1 },
  qtyBadge: { backgroundColor: Colors.primary, paddingHorizontal: 8, paddingVertical: 2, borderWidth: 1, borderColor: Colors.border },
  qtyText: { fontSize: Typography.xs, fontWeight: Typography.black, color: Colors.white },
  price: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.success },
  modal: { flex: 1, backgroundColor: Colors.background },
  modalHeader: { padding: Spacing.base, borderBottomWidth: Border.widthBold, borderBottomColor: Colors.border },
  modalTitle: { fontSize: Typography['2xl'], fontWeight: Typography.black, color: Colors.foreground, letterSpacing: 1 },
  modalClose: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.destructive, letterSpacing: 0.5 },
  modalContent: { padding: Spacing.base },
});

export default InventoryScreen;
