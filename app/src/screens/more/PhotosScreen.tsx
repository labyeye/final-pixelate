import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { photosAPI } from '../../api';
import {
  Card,
  Row,
  LoadingSpinner,
  EmptyState,
  SearchBar,
} from '../../components/common';
import { Colors, Typography, Spacing, Border } from '../../theme';

const PhotosScreen = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const { data: photos = [], isLoading } = useQuery({
    queryKey: ['photos'],
    queryFn: () => photosAPI.getAll().then(r => r.data),
  });

  if (isLoading) return <LoadingSpinner />;

  const list = Array.isArray(photos) ? photos : [];
  const categories = [
    'all',
    ...Array.from(new Set(list.map((p: any) => p.category).filter(Boolean))),
  ];

  const filtered = list.filter((p: any) => {
    const matchSearch =
      !search || p.title?.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'all' || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search photos..."
        />
        {categories.length > 1 ? (
          <View style={styles.filterRow}>
            {(categories as string[]).map(cat => (
              <TouchableOpacity
                key={cat}
                style={[styles.chip, category === cat && styles.chipActive]}
                onPress={() => setCategory(cat)}
              >
                <Text
                  style={[
                    styles.chipText,
                    category === cat && styles.chipTextActive,
                  ]}
                >
                  {cat.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
        <Text style={styles.count}>{filtered.length} PHOTOS</Text>
        <FlatList
          data={filtered}
          keyExtractor={(item, i) => String(item._id || i)}
          ListEmptyComponent={
            <EmptyState
              title="No Photos"
              subtitle="Photo gallery items will appear here"
            />
          }
          renderItem={({ item }) => (
            <Card style={styles.card} shadow="sm">
              <Row align="center" style={styles.photoRow}>
                <View style={styles.thumbPlaceholder}>
                  <Text style={styles.thumbIcon}>🖼</Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.title}>{item.title || 'Untitled'}</Text>
                  {item.description ? (
                    <Text style={styles.desc} numberOfLines={2}>
                      {item.description}
                    </Text>
                  ) : null}
                  {item.category ? (
                    <View style={styles.catBadge}>
                      <Text style={styles.catText}>
                        {item.category.toUpperCase()}
                      </Text>
                    </View>
                  ) : null}
                  {item.showOn &&
                  Array.isArray(item.showOn) &&
                  item.showOn.length > 0 ? (
                    <Text style={styles.showOn}>
                      SHOW ON: {item.showOn.join(', ')}
                    </Text>
                  ) : null}
                </View>
              </Row>
            </Card>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.base, paddingBottom: 0 },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: Spacing.sm,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: Border.width,
    borderColor: Colors.border,
  },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.foreground,
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
  photoRow: { gap: Spacing.md },
  thumbPlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: Colors.gray200,
    borderWidth: Border.width,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbIcon: { fontSize: 28 },
  info: { flex: 1 },
  title: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  desc: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 2,
    lineHeight: 18,
  },
  catBadge: {
    marginTop: 4,
    alignSelf: 'flex-start',
    backgroundColor: Colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: Border.width,
    borderColor: Colors.black,
  },
  catText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.white,
  },
  showOn: {
    fontSize: Typography.xs,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 2,
  },
});

export default PhotosScreen;
