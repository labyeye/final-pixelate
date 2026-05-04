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
import { workGalleryAPI } from '../../api';
import {
  Card,
  Row,
  StatusBadge,
  LoadingSpinner,
  EmptyState,
  SearchBar,
  Divider,
} from '../../components/common';
import { Colors, Typography, Spacing, Border } from '../../theme';

const SHOW_ON_COLORS: Record<string, string> = {
  'web-development': Colors.primary,
  'software-development': Colors.secondary,
  'app-development': Colors.accent,
  'video-editing': Colors.warning,
  photography: Colors.success,
  none: Colors.muted,
};

const WorkGalleryScreen = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const { data: items = [], isLoading } = useQuery({
    queryKey: ['work-gallery'],
    queryFn: () => workGalleryAPI.getAll().then(r => r.data),
  });

  if (isLoading) return <LoadingSpinner />;

  const list = Array.isArray(items)
    ? items.filter((item: any) => {
        const matchSearch =
          !search || item.title?.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === 'all' || item.showOn === filter;
        return matchSearch && matchFilter;
      })
    : [];

  const categories = [
    'all',
    'web-development',
    'software-development',
    'app-development',
    'video-editing',
    'photography',
    'none',
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search portfolio..."
        />
        <View style={styles.filterRow}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, filter === cat && styles.chipActive]}
              onPress={() => setFilter(cat)}
            >
              <Text
                style={[
                  styles.chipText,
                  filter === cat && styles.chipTextActive,
                ]}
              >
                {cat === 'all' ? 'ALL' : cat.replace(/-/g, ' ').toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.count}>{list.length} PROJECTS</Text>
        <FlatList
          data={list}
          keyExtractor={(item, i) => String(item._id || i)}
          ListEmptyComponent={
            <EmptyState
              title="No Portfolio Items"
              subtitle="Work gallery projects will appear here"
            />
          }
          renderItem={({ item }) => (
            <Card
              style={[
                styles.card,
                {
                  borderLeftColor:
                    SHOW_ON_COLORS[item.showOn] || Colors.primary,
                  borderLeftWidth: 4,
                },
              ]}
              shadow="sm"
            >
              <Row justify="space-between" align="flex-start">
                <View style={styles.info}>
                  <Text style={styles.title}>{item.title}</Text>
                  {item.brand ? (
                    <Text style={styles.brand}>{item.brand}</Text>
                  ) : null}
                  {item.tech ? (
                    <Text style={styles.tech}>🛠 {item.tech}</Text>
                  ) : null}
                  {item.description ? (
                    <Text style={styles.desc} numberOfLines={2}>
                      {item.description}
                    </Text>
                  ) : null}
                  {item.showOn && item.showOn !== 'none' ? (
                    <View
                      style={[
                        styles.categoryBadge,
                        {
                          backgroundColor:
                            SHOW_ON_COLORS[item.showOn] || Colors.muted,
                        },
                      ]}
                    >
                      <Text style={styles.categoryText}>
                        {item.showOn.replace(/-/g, ' ').toUpperCase()}
                      </Text>
                    </View>
                  ) : null}
                </View>
                {item.rating ? (
                  <View style={styles.ratingBox}>
                    <Text style={styles.ratingText}>⭐ {item.rating}/5</Text>
                  </View>
                ) : null}
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
    letterSpacing: 0.3,
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
  info: { flex: 1 },
  title: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  brand: {
    fontSize: Typography.sm,
    color: Colors.secondary,
    fontWeight: Typography.bold,
    marginTop: 2,
  },
  tech: {
    fontSize: Typography.xs,
    color: Colors.accent,
    fontWeight: Typography.bold,
    marginTop: 2,
  },
  desc: {
    fontSize: Typography.xs,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 4,
    lineHeight: 18,
  },
  categoryBadge: {
    marginTop: Spacing.xs,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: Border.width,
    borderColor: Colors.black,
  },
  categoryText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 0.3,
  },
  ratingBox: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: Border.width,
    borderColor: Colors.border,
    alignSelf: 'flex-start',
  },
  ratingText: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
});

export default WorkGalleryScreen;
