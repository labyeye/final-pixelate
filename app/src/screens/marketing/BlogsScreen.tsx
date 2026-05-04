import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { blogsAPI } from '../../api';
import {
  Card,
  Row,
  StatusBadge,
  SearchBar,
  EmptyState,
  LoadingSpinner,
} from '../../components/common';
import { Colors, Typography, Spacing, Border } from '../../theme';
import { MoreStackParams } from '../../navigation/types';
import { format } from 'date-fns';

type Nav = NativeStackNavigationProp<MoreStackParams>;

const BlogsScreen = () => {
  const navigation = useNavigation<Nav>();
  const [search, setSearch] = useState('');
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogsAPI.getAll().then(r => r.data),
  });

  if (isLoading) return <LoadingSpinner />;

  const filtered = Array.isArray(blogs)
    ? blogs.filter(
        (b: any) =>
          !search || b.title?.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search blogs..."
        />
        <Text style={styles.count}>{filtered.length} BLOGS</Text>
        <FlatList
          data={filtered}
          keyExtractor={(item, i) => String(item._id || i)}
          ListEmptyComponent={
            <EmptyState
              title="No Blogs"
              subtitle="Blog posts will appear here"
            />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('BlogDetail', {
                  id: String(item._id || item.id),
                })
              }
              activeOpacity={0.85}
            >
              <Card
                style={[
                  styles.card,
                  { borderLeftColor: Colors.secondary, borderLeftWidth: 4 },
                ]}
                shadow="sm"
              >
                <Row justify="space-between" align="flex-start">
                  <View style={styles.left}>
                    <Text style={styles.title}>{item.title}</Text>
                    {item.author ? (
                      <Text style={styles.author}>by {item.author}</Text>
                    ) : null}
                    {item.category ? (
                      <Text style={styles.category}>{item.category}</Text>
                    ) : null}
                    {item.createdAt ? (
                      <Text style={styles.date}>
                        {format(new Date(item.createdAt), 'dd MMM yyyy')}
                      </Text>
                    ) : null}
                  </View>
                  <StatusBadge status={item.status || 'draft'} />
                </Row>
                {item.tags && item.tags.length > 0 ? (
                  <View style={styles.tagsRow}>
                    {item.tags.slice(0, 3).map((tag: string, i: number) => (
                      <View key={i} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                ) : null}
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
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
    marginBottom: Spacing.sm,
  },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  left: { flex: 1 },
  title: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
    lineHeight: 22,
  },
  author: {
    fontSize: Typography.sm,
    color: Colors.primary,
    fontWeight: Typography.bold,
    marginTop: 2,
  },
  category: {
    fontSize: Typography.sm,
    color: Colors.accent,
    fontWeight: Typography.semiBold,
    marginTop: 1,
  },
  date: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 1,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: Spacing.sm,
  },
  tag: {
    backgroundColor: Colors.muted,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tagText: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    color: Colors.foreground,
  },
});

export default BlogsScreen;
