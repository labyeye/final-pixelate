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
import { inventoryAPI } from '../../api';
import {
  Card,
  Row,
  SearchBar,
  Button,
  Input,
  EmptyState,
  LoadingSpinner,
  StatusBadge,
  FilterChips,
  SortButton,
  RowActions,
} from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';

const EMPTY_FORM = {
  itemName: '',
  category: '',
  quantityAvailable: '',
  unit: 'pcs',
  price: '',
  vendorName: '',
  vendorContact: '',
  gstPercentage: '',
};

const SORT_OPTIONS = [
  { label: 'Name A-Z', value: 'name' },
  { label: 'Qty low-high', value: 'qty' },
  { label: 'Price high-low', value: 'price' },
];

const InventoryScreen = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sort, setSort] = useState('name');
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: inventory = [], isLoading } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => inventoryAPI.getAll().then(r => r.data),
  });

  const addMutation = useMutation({
    mutationFn: (data: any) => inventoryAPI.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['inventory'] });
      closeForm();
    },
    onError: () => Alert.alert('Error', 'Failed to add item'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      inventoryAPI.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['inventory'] });
      closeForm();
    },
    onError: () => Alert.alert('Error', 'Failed to update item'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => inventoryAPI.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['inventory'] }),
  });

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setShowAdd(true);
  };

  const openEdit = (item: any) => {
    setEditing(item);
    setForm({
      itemName: item.itemName || '',
      category: item.category || '',
      quantityAvailable: String(item.quantityAvailable ?? ''),
      unit: item.unit || 'pcs',
      price: String(item.price ?? ''),
      vendorName: item.vendorName || '',
      vendorContact: item.vendorContact || '',
      gstPercentage: item.gstPercentage != null ? String(item.gstPercentage) : '',
    });
    setShowAdd(true);
  };

  const closeForm = () => {
    setShowAdd(false);
    setEditing(null);
    setForm(EMPTY_FORM);
  };

  const confirmDelete = (item: any) => {
    Alert.alert('Delete Item', `Remove "${item.itemName}" from inventory?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteMutation.mutate(item._id),
      },
    ]);
  };

  const handleSubmit = () => {
    if (!form.itemName.trim()) {
      Alert.alert('Error', 'Item name required');
      return;
    }
    const data = {
      ...form,
      quantityAvailable: Number(form.quantityAvailable),
      price: Number(form.price),
      gstPercentage: form.gstPercentage ? Number(form.gstPercentage) : null,
    };
    if (editing) {
      updateMutation.mutate({ id: editing._id, data });
    } else {
      addMutation.mutate(data);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  const categoryOptions = [
    { label: 'All', value: 'all' },
    ...Array.from(
      new Set(
        (Array.isArray(inventory) ? inventory : [])
          .map((i: any) => i.category)
          .filter(Boolean),
      ),
    ).map((c: any) => ({ label: c, value: c })),
  ];

  let filtered = Array.isArray(inventory)
    ? inventory.filter(
        (i: any) =>
          (!search ||
            i.itemName?.toLowerCase().includes(search.toLowerCase()) ||
            i.category?.toLowerCase().includes(search.toLowerCase())) &&
          (categoryFilter === 'all' || i.category === categoryFilter),
      )
    : [];

  filtered = [...filtered].sort((a: any, b: any) => {
    if (sort === 'qty')
      return Number(a.quantityAvailable || 0) - Number(b.quantityAvailable || 0);
    if (sort === 'price') return Number(b.price || 0) - Number(a.price || 0);
    return (a.itemName || '').localeCompare(b.itemName || '');
  });

  const saving = addMutation.isPending || updateMutation.isPending;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search inventory..."
        />
        <FilterChips
          options={categoryOptions}
          value={categoryFilter}
          onChange={setCategoryFilter}
        />
        <Row
          justify="space-between"
          align="center"
          style={{ marginBottom: Spacing.sm }}
        >
          <Text style={styles.count}>{filtered.length} ITEMS</Text>
          <Row gap={8} align="center">
            <SortButton options={SORT_OPTIONS} value={sort} onChange={setSort} />
            <TouchableOpacity style={styles.addBtn} onPress={openCreate}>
              <Text style={styles.addBtnText}>+ ADD</Text>
            </TouchableOpacity>
          </Row>
        </Row>
        <FlatList
          style={{ flex: 1 }}
          data={filtered}
          keyExtractor={(item, i) => String(item._id || i)}
          ListEmptyComponent={
            <EmptyState
              title="No Inventory"
              subtitle="Add your inventory items"
              action={{ label: '+ Add Item', onPress: openCreate }}
            />
          }
          renderItem={({ item }) => (
            <Card style={styles.card} shadow="sm">
              <Row justify="space-between" align="flex-start">
                <View style={styles.cardLeft}>
                  <Text style={styles.itemName}>{item.itemName}</Text>
                  {item.category ? (
                    <Text style={styles.category}>{item.category}</Text>
                  ) : null}
                  {item.vendorName ? (
                    <Text style={styles.vendor}>Vendor: {item.vendorName}</Text>
                  ) : null}
                  <Row style={{ marginTop: 6 }} gap={8}>
                    <View style={styles.qtyBadge}>
                      <Text style={styles.qtyText}>
                        {item.quantityAvailable} {item.unit}
                      </Text>
                    </View>
                    {item.price ? (
                      <Text style={styles.price}>₹{item.price}</Text>
                    ) : null}
                  </Row>
                </View>
                <StatusBadge status={item.status || 'Available'} />
              </Row>
              <Row justify="flex-end" style={{ marginTop: Spacing.sm }}>
                <RowActions
                  onEdit={() => openEdit(item)}
                  onDelete={() => confirmDelete(item)}
                />
              </Row>
            </Card>
          )}
        />
      </View>
      <Modal
        visible={showAdd}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modal}>
          <Row
            justify="space-between"
            align="center"
            style={styles.modalHeader}
          >
            <Text style={styles.modalTitle}>
              {editing ? 'EDIT ITEM' : 'ADD ITEM'}
            </Text>
            <TouchableOpacity onPress={closeForm}>
              <Text style={styles.modalClose}>✕ CANCEL</Text>
            </TouchableOpacity>
          </Row>
          <ScrollView style={styles.modalContent} contentContainerStyle={{ paddingBottom: Spacing.xl }}>
            <Input
              label="ITEM NAME *"
              value={form.itemName}
              onChangeText={v => setForm(p => ({ ...p, itemName: v }))}
              placeholder="e.g. MacBook Pro 14"
            />
            <Input
              label="CATEGORY"
              value={form.category}
              onChangeText={v => setForm(p => ({ ...p, category: v }))}
              placeholder="e.g. Laptops"
            />
            <Input
              label="QUANTITY"
              value={form.quantityAvailable}
              onChangeText={v => setForm(p => ({ ...p, quantityAvailable: v }))}
              keyboardType="numeric"
            />
            <Input
              label="UNIT"
              value={form.unit}
              onChangeText={v => setForm(p => ({ ...p, unit: v }))}
              placeholder="pcs / kg / m"
            />
            <Input
              label="PRICE (₹)"
              value={form.price}
              onChangeText={v => setForm(p => ({ ...p, price: v }))}
              keyboardType="numeric"
            />
            <Input
              label="VENDOR"
              value={form.vendorName}
              onChangeText={v => setForm(p => ({ ...p, vendorName: v }))}
              placeholder="Vendor name"
            />
            <Input
              label="VENDOR CONTACT"
              value={form.vendorContact}
              onChangeText={v => setForm(p => ({ ...p, vendorContact: v }))}
              placeholder="Phone / email"
            />
            <Input
              label="GST %"
              value={form.gstPercentage}
              onChangeText={v => setForm(p => ({ ...p, gstPercentage: v }))}
              keyboardType="numeric"
              placeholder="e.g. 18"
            />
            <Button
              label={saving ? 'SAVING...' : editing ? 'SAVE CHANGES' : 'ADD ITEM'}
              onPress={handleSubmit}
              loading={saving}
              fullWidth
              size="lg"
              style={{ marginTop: Spacing.base }}
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.base, paddingBottom: 0 },
  count: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 0.5,
  },
  addBtn: {
    backgroundColor: Colors.secondary,
    borderWidth: Border.widthBold,
    borderColor: Colors.black,
    paddingHorizontal: 14,
    paddingVertical: 6,
    ...Shadows.sm,
  },
  addBtnText: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 0.5,
  },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  cardLeft: { flex: 1 },
  itemName: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  category: {
    fontSize: Typography.sm,
    color: Colors.accent,
    fontWeight: Typography.bold,
    marginTop: 2,
  },
  vendor: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 1,
  },
  qtyBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  qtyText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.white,
  },
  price: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.success,
  },
  modal: { flex: 1, backgroundColor: Colors.background },
  modalHeader: {
    padding: Spacing.base,
    borderBottomWidth: Border.widthBold,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: Typography['2xl'],
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
});

export default InventoryScreen;
