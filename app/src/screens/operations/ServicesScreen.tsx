import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { servicesAPI } from '../../api';
import {
  Card,
  Row,
  SearchBar,
  Button,
  Input,
  EmptyState,
  LoadingSpinner,
  FilterChips,
  SortButton,
  RowActions,
} from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';

const EMPTY_FORM = { name: '', description: '', price: '', category: '', hsnCode: '' };

const SORT_OPTIONS = [
  { label: 'Name A-Z', value: 'name' },
  { label: 'Price high-low', value: 'price' },
];

const ServicesScreen = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sort, setSort] = useState('name');
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: () => servicesAPI.getAll().then(r => r.data),
  });

  const addMutation = useMutation({
    mutationFn: (data: any) => servicesAPI.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['services'] });
      closeForm();
    },
    onError: () => Alert.alert('Error', 'Failed to add service'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      servicesAPI.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['services'] });
      closeForm();
    },
    onError: () => Alert.alert('Error', 'Failed to update service'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => servicesAPI.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['services'] }),
  });

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setShowAdd(true);
  };

  const openEdit = (item: any) => {
    setEditing(item);
    setForm({
      name: item.name || '',
      description: item.description || '',
      price: String(item.price ?? ''),
      category: item.category || '',
      hsnCode: item.hsnCode || '',
    });
    setShowAdd(true);
  };

  const closeForm = () => {
    setShowAdd(false);
    setEditing(null);
    setForm(EMPTY_FORM);
  };

  const confirmDelete = (item: any) => {
    Alert.alert('Delete Service', `Remove "${item.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteMutation.mutate(item._id),
      },
    ]);
  };

  const handleSubmit = () => {
    if (!form.name.trim()) {
      Alert.alert('Error', 'Name required');
      return;
    }
    const data = { ...form, price: Number(form.price) };
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
        (Array.isArray(services) ? services : [])
          .map((s: any) => s.category)
          .filter(Boolean),
      ),
    ).map((c: any) => ({ label: c, value: c })),
  ];

  let filtered = Array.isArray(services)
    ? services.filter(
        (s: any) =>
          (!search || s.name?.toLowerCase().includes(search.toLowerCase())) &&
          (categoryFilter === 'all' || s.category === categoryFilter),
      )
    : [];

  filtered = [...filtered].sort((a: any, b: any) => {
    if (sort === 'price') return Number(b.price || 0) - Number(a.price || 0);
    return (a.name || '').localeCompare(b.name || '');
  });

  const saving = addMutation.isPending || updateMutation.isPending;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search services..."
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
          <Text style={styles.count}>{filtered.length} SERVICES</Text>
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
              title="No Services"
              subtitle="Add services to your catalogue"
              action={{ label: '+ Add Service', onPress: openCreate }}
            />
          }
          renderItem={({ item }) => (
            <Card style={styles.card} shadow="sm">
              <Row justify="space-between" align="flex-start">
                <View style={styles.cardLeft}>
                  <Text style={styles.serviceName}>{item.name}</Text>
                  {item.category ? (
                    <Text style={styles.category}>{item.category}</Text>
                  ) : null}
                  {item.description ? (
                    <Text style={styles.desc} numberOfLines={2}>
                      {item.description}
                    </Text>
                  ) : null}
                </View>
                {item.price ? (
                  <View style={styles.priceBadge}>
                    <Text style={styles.priceText}>
                      ₹{Number(item.price).toLocaleString('en-IN')}
                    </Text>
                  </View>
                ) : null}
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
              {editing ? 'EDIT SERVICE' : 'ADD SERVICE'}
            </Text>
            <TouchableOpacity onPress={closeForm}>
              <Text style={styles.modalClose}>✕ CANCEL</Text>
            </TouchableOpacity>
          </Row>
          <View style={styles.modalContent}>
            <Input
              label="SERVICE NAME *"
              value={form.name}
              onChangeText={v => setForm(p => ({ ...p, name: v }))}
              placeholder="e.g. Website Development"
            />
            <Input
              label="CATEGORY"
              value={form.category}
              onChangeText={v => setForm(p => ({ ...p, category: v }))}
              placeholder="e.g. Web Design"
            />
            <Input
              label="DESCRIPTION"
              value={form.description}
              onChangeText={v => setForm(p => ({ ...p, description: v }))}
              placeholder="Service details..."
              multiline
            />
            <Input
              label="PRICE (₹)"
              value={form.price}
              onChangeText={v => setForm(p => ({ ...p, price: v }))}
              keyboardType="numeric"
            />
            <Input
              label="HSN/SAC CODE"
              value={form.hsnCode}
              onChangeText={v => setForm(p => ({ ...p, hsnCode: v }))}
              placeholder="e.g. 998314"
            />
            <Button
              label={saving ? 'SAVING...' : editing ? 'SAVE CHANGES' : 'ADD SERVICE'}
              onPress={handleSubmit}
              loading={saving}
              fullWidth
              size="lg"
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
  serviceName: {
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
  desc: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 4,
    lineHeight: 18,
  },
  priceBadge: {
    backgroundColor: Colors.success,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: Border.width,
    borderColor: Colors.border,
  },
  priceText: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.white,
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

export default ServicesScreen;
