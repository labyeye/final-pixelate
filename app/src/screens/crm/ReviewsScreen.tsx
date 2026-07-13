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
import { reviewsAPI } from '../../api';
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

const PLATFORMS = ['Google', 'Facebook', 'Instagram', 'Other'];

const PLATFORM_FILTERS = [
  { label: 'All', value: 'all' },
  ...PLATFORMS.map(p => ({ label: p, value: p })),
];

const SORT_OPTIONS = [
  { label: 'Newest first', value: 'newest' },
  { label: 'Highest rated', value: 'rating' },
  { label: 'Name A-Z', value: 'name' },
];

const EMPTY_FORM = { name: '', review: '', rating: '5', platform: 'Google' };

const ReviewsScreen = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => reviewsAPI.getAll().then(r => r.data),
  });

  const addMutation = useMutation({
    mutationFn: (data: any) => reviewsAPI.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['reviews'] });
      closeForm();
    },
    onError: () => Alert.alert('Error', 'Failed to add review'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      reviewsAPI.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['reviews'] });
      closeForm();
    },
    onError: () => Alert.alert('Error', 'Failed to update review'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => reviewsAPI.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['reviews'] }),
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
      review: item.review || '',
      rating: String(item.rating || 5),
      platform: item.platform || 'Google',
    });
    setShowAdd(true);
  };

  const closeForm = () => {
    setShowAdd(false);
    setEditing(null);
    setForm(EMPTY_FORM);
  };

  const confirmDelete = (item: any) => {
    Alert.alert('Delete Review', `Remove review from "${item.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteMutation.mutate(item._id),
      },
    ]);
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.review.trim()) {
      Alert.alert('Error', 'Name and review required');
      return;
    }
    const data = { ...form, rating: Number(form.rating) };
    if (editing) {
      updateMutation.mutate({ id: editing._id, data });
    } else {
      addMutation.mutate(data);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  let filtered = Array.isArray(reviews)
    ? reviews.filter(
        (r: any) =>
          (!search || r.name?.toLowerCase().includes(search.toLowerCase())) &&
          (platformFilter === 'all' || r.platform === platformFilter),
      )
    : [];

  filtered = [...filtered].sort((a: any, b: any) => {
    if (sort === 'name') return (a.name || '').localeCompare(b.name || '');
    if (sort === 'rating') return Number(b.rating || 0) - Number(a.rating || 0);
    const da = new Date(a.createdAt || 0).getTime();
    const db = new Date(b.createdAt || 0).getTime();
    return db - da;
  });

  const avgRating =
    filtered.length > 0
      ? (
          filtered.reduce((s: number, r: any) => s + Number(r.rating || 5), 0) /
          filtered.length
        ).toFixed(1)
      : '0.0';

  const saving = addMutation.isPending || updateMutation.isPending;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <Card style={styles.statsCard}>
          <Row justify="space-between" align="center">
            <View>
              <Text style={styles.avgRating}>{avgRating} ⭐</Text>
              <Text style={styles.avgLabel}>AVERAGE RATING</Text>
            </View>
            <View style={styles.totalBox}>
              <Text style={styles.totalCount}>{filtered.length}</Text>
              <Text style={styles.totalLabel}>REVIEWS</Text>
            </View>
          </Row>
        </Card>

        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search reviews..."
        />

        <FilterChips
          options={PLATFORM_FILTERS}
          value={platformFilter}
          onChange={setPlatformFilter}
        />

        <Row
          justify="space-between"
          align="center"
          style={{ marginBottom: Spacing.sm }}
        >
          <Text style={styles.count}>{filtered.length} REVIEWS</Text>
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
              title="No Reviews"
              subtitle="Add client reviews"
              action={{ label: '+ Add Review', onPress: openCreate }}
            />
          }
          renderItem={({ item }) => (
            <Card style={styles.card} shadow="sm">
              <Row justify="space-between" align="flex-start">
                <View style={styles.left}>
                  <Text style={styles.reviewerName}>{item.name}</Text>
                  {item.platform ? (
                    <Text style={styles.platform}>{item.platform}</Text>
                  ) : null}
                  {item.review ? (
                    <Text style={styles.reviewText} numberOfLines={3}>
                      {item.review}
                    </Text>
                  ) : null}
                </View>
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingText}>
                    {'⭐'.repeat(Math.min(5, Number(item.rating || 5)))}
                  </Text>
                </View>
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
              {editing ? 'EDIT REVIEW' : 'ADD REVIEW'}
            </Text>
            <TouchableOpacity onPress={closeForm}>
              <Text style={styles.modalClose}>✕ CANCEL</Text>
            </TouchableOpacity>
          </Row>
          <View style={styles.modalContent}>
            <Input
              label="CLIENT NAME *"
              value={form.name}
              onChangeText={v => setForm(p => ({ ...p, name: v }))}
              placeholder="John Doe"
            />
            <Input
              label="REVIEW *"
              value={form.review}
              onChangeText={v => setForm(p => ({ ...p, review: v }))}
              placeholder="Write the review..."
              multiline
            />
            <Input
              label="RATING (1-5)"
              value={form.rating}
              onChangeText={v => setForm(p => ({ ...p, rating: v }))}
              keyboardType="number-pad"
            />
            <Text style={styles.pickLabel}>PLATFORM</Text>
            <View style={styles.platformRow}>
              {PLATFORMS.map(p => (
                <TouchableOpacity
                  key={p}
                  style={[
                    styles.platformChip,
                    form.platform === p && styles.platformChipActive,
                  ]}
                  onPress={() => setForm(prev => ({ ...prev, platform: p }))}
                >
                  <Text
                    style={[
                      styles.platformChipText,
                      form.platform === p && styles.platformChipTextActive,
                    ]}
                  >
                    {p}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Button
              label={saving ? 'SAVING...' : editing ? 'SAVE CHANGES' : 'ADD REVIEW'}
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
  statsCard: { marginBottom: Spacing.base, padding: Spacing.lg },
  avgRating: {
    fontSize: Typography['2xl'],
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  avgLabel: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 1,
  },
  totalBox: { alignItems: 'center' },
  totalCount: {
    fontSize: Typography['2xl'],
    fontWeight: Typography.black,
    color: Colors.primary,
  },
  totalLabel: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 1,
  },
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
  left: { flex: 1 },
  reviewerName: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  platform: {
    fontSize: Typography.xs,
    color: Colors.accent,
    fontWeight: Typography.bold,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  reviewText: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 4,
    lineHeight: 18,
  },
  ratingBadge: {
    backgroundColor: Colors.warning,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ratingText: { fontSize: Typography.sm },
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
  pickLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  platformRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: Spacing.base,
    flexWrap: 'wrap',
  },
  platformChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: Border.width,
    borderColor: Colors.border,
  },
  platformChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  platformChipText: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.foreground,
  },
  platformChipTextActive: { color: Colors.white },
});

export default ReviewsScreen;
