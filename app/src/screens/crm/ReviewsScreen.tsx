import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsAPI } from '../../api';
import { Card, Row, SearchBar, Button, Input, EmptyState, LoadingSpinner } from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';

const ReviewsScreen = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', review: '', rating: '5', platform: 'Google' });

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => reviewsAPI.getAll().then(r => r.data),
  });

  const addMutation = useMutation({
    mutationFn: (data: any) => reviewsAPI.create(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['reviews'] }); setShowAdd(false); setForm({ name: '', review: '', rating: '5', platform: 'Google' }); },
    onError: () => Alert.alert('Error', 'Failed to add review'),
  });

  if (isLoading) return <LoadingSpinner />;

  const filtered = Array.isArray(reviews)
    ? reviews.filter((r: any) => !search || r.name?.toLowerCase().includes(search.toLowerCase()))
    : [];

  const avgRating = filtered.length > 0
    ? (filtered.reduce((s: number, r: any) => s + Number(r.rating || 5), 0) / filtered.length).toFixed(1)
    : '0.0';

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

        <SearchBar value={search} onChangeText={setSearch} placeholder="Search reviews..." />

        <Row justify="space-between" align="center" style={{ marginBottom: Spacing.sm }}>
          <Text style={styles.count}>{filtered.length} REVIEWS</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => setShowAdd(true)}>
            <Text style={styles.addBtnText}>+ ADD</Text>
          </TouchableOpacity>
        </Row>

        <FlatList
          data={filtered}
          keyExtractor={(item, i) => String(item._id || i)}
          ListEmptyComponent={<EmptyState title="No Reviews" subtitle="Add client reviews" action={{ label: '+ Add Review', onPress: () => setShowAdd(true) }} />}
          renderItem={({ item }) => (
            <Card style={styles.card} shadow="sm">
              <Row justify="space-between" align="flex-start">
                <View style={styles.left}>
                  <Text style={styles.reviewerName}>{item.name}</Text>
                  {item.platform ? <Text style={styles.platform}>{item.platform}</Text> : null}
                  {item.review ? <Text style={styles.reviewText} numberOfLines={3}>{item.review}</Text> : null}
                </View>
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingText}>{'⭐'.repeat(Math.min(5, Number(item.rating || 5)))}</Text>
                </View>
              </Row>
            </Card>
          )}
        />
      </View>

      <Modal visible={showAdd} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <Row justify="space-between" align="center" style={styles.modalHeader}>
            <Text style={styles.modalTitle}>ADD REVIEW</Text>
            <TouchableOpacity onPress={() => setShowAdd(false)}>
              <Text style={styles.modalClose}>✕ CANCEL</Text>
            </TouchableOpacity>
          </Row>
          <View style={styles.modalContent}>
            <Input label="CLIENT NAME *" value={form.name} onChangeText={v => setForm(p => ({ ...p, name: v }))} placeholder="John Doe" />
            <Input label="REVIEW *" value={form.review} onChangeText={v => setForm(p => ({ ...p, review: v }))} placeholder="Write the review..." multiline />
            <Input label="RATING (1-5)" value={form.rating} onChangeText={v => setForm(p => ({ ...p, rating: v }))} keyboardType="number-pad" />
            <Text style={styles.pickLabel}>PLATFORM</Text>
            <View style={styles.platformRow}>
              {['Google', 'Facebook', 'Instagram', 'Other'].map(p => (
                <TouchableOpacity
                  key={p}
                  style={[styles.platformChip, form.platform === p && styles.platformChipActive]}
                  onPress={() => setForm(prev => ({ ...prev, platform: p }))}>
                  <Text style={[styles.platformChipText, form.platform === p && styles.platformChipTextActive]}>{p}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Button
              label={addMutation.isPending ? 'ADDING...' : 'ADD REVIEW'}
              onPress={() => { if (!form.name.trim() || !form.review.trim()) { Alert.alert('Error', 'Name and review required'); return; } addMutation.mutate({ ...form, rating: Number(form.rating) }); }}
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
  statsCard: { marginBottom: Spacing.base, padding: Spacing.lg },
  avgRating: { fontSize: Typography['2xl'], fontWeight: Typography.black, color: Colors.foreground },
  avgLabel: { fontSize: Typography.xs, fontWeight: Typography.black, color: Colors.mutedForeground, letterSpacing: 1 },
  totalBox: { alignItems: 'center' },
  totalCount: { fontSize: Typography['2xl'], fontWeight: Typography.black, color: Colors.primary },
  totalLabel: { fontSize: Typography.xs, fontWeight: Typography.black, color: Colors.mutedForeground, letterSpacing: 1 },
  count: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.mutedForeground, letterSpacing: 0.5 },
  addBtn: { backgroundColor: Colors.secondary, borderWidth: Border.widthBold, borderColor: Colors.black, paddingHorizontal: 14, paddingVertical: 6, ...Shadows.sm },
  addBtnText: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.white, letterSpacing: 0.5 },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  left: { flex: 1 },
  reviewerName: { fontSize: Typography.base, fontWeight: Typography.black, color: Colors.foreground },
  platform: { fontSize: Typography.xs, color: Colors.accent, fontWeight: Typography.bold, marginTop: 2, letterSpacing: 0.5 },
  reviewText: { fontSize: Typography.sm, color: Colors.mutedForeground, fontWeight: Typography.medium, marginTop: 4, lineHeight: 18 },
  ratingBadge: { backgroundColor: Colors.warning, paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1, borderColor: Colors.border },
  ratingText: { fontSize: Typography.sm },
  modal: { flex: 1, backgroundColor: Colors.background },
  modalHeader: { padding: Spacing.base, borderBottomWidth: Border.widthBold, borderBottomColor: Colors.border },
  modalTitle: { fontSize: Typography['2xl'], fontWeight: Typography.black, color: Colors.foreground, letterSpacing: 1 },
  modalClose: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.destructive, letterSpacing: 0.5 },
  modalContent: { padding: Spacing.base },
  pickLabel: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.foreground, letterSpacing: 0.5, marginBottom: 8 },
  platformRow: { flexDirection: 'row', gap: 8, marginBottom: Spacing.base, flexWrap: 'wrap' },
  platformChip: { paddingHorizontal: 12, paddingVertical: 8, borderWidth: Border.width, borderColor: Colors.border },
  platformChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  platformChipText: { fontSize: Typography.sm, fontWeight: Typography.bold, color: Colors.foreground },
  platformChipTextActive: { color: Colors.white },
});

export default ReviewsScreen;
