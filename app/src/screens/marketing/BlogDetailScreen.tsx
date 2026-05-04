import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { blogsAPI } from '../../api';
import {
  Card,
  StatusBadge,
  Divider,
  LoadingSpinner,
} from '../../components/common';
import { Colors, Typography, Spacing } from '../../theme';
import { MoreStackParams } from '../../navigation/types';
import { format } from 'date-fns';

type Route = RouteProp<MoreStackParams, 'BlogDetail'>;

const BlogDetailScreen = () => {
  const { params } = useRoute<Route>();
  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog', params.id],
    queryFn: () => blogsAPI.getById(params.id).then(r => r.data),
  });

  if (isLoading) return <LoadingSpinner />;
  if (!blog)
    return (
      <View style={styles.center}>
        <Text>Not found</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.metaRow}>
          <StatusBadge status={blog.status || 'draft'} />
          {blog.category ? (
            <Text style={styles.category}>{blog.category}</Text>
          ) : null}
        </View>
        <Text style={styles.title}>{blog.title}</Text>
        {blog.author ? (
          <Text style={styles.author}>by {blog.author}</Text>
        ) : null}
        {blog.createdAt ? (
          <Text style={styles.date}>
            {format(new Date(blog.createdAt), 'dd MMMM yyyy')}
          </Text>
        ) : null}
        <Divider style={{ marginVertical: Spacing.base }} />
        {blog.content ? (
          <Text style={styles.content_text}>{blog.content}</Text>
        ) : null}
        {blog.excerpt ? (
          <Text style={styles.excerpt}>{blog.excerpt}</Text>
        ) : null}
        {blog.tags && blog.tags.length > 0 ? (
          <View style={styles.tagsRow}>
            {blog.tags.map((tag: string, i: number) => (
              <View key={i} style={styles.tag}>
                <Text style={styles.tagText}># {tag}</Text>
              </View>
            ))}
          </View>
        ) : null}
        {blog.metaTitle ? (
          <Card style={{ marginTop: Spacing.lg, padding: Spacing.md }}>
            <Text style={styles.seoLabel}>SEO TITLE</Text>
            <Text style={styles.seoValue}>{blog.metaTitle}</Text>
            {blog.metaDescription ? (
              <>
                <Text style={[styles.seoLabel, { marginTop: Spacing.sm }]}>
                  META DESCRIPTION
                </Text>
                <Text style={styles.seoValue}>{blog.metaDescription}</Text>
              </>
            ) : null}
          </Card>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { padding: Spacing.base, paddingBottom: 24 },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  category: {
    fontSize: Typography.sm,
    color: Colors.accent,
    fontWeight: Typography.bold,
  },
  title: {
    fontSize: Typography['2xl'],
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: -0.5,
    lineHeight: 32,
  },
  author: {
    fontSize: Typography.base,
    color: Colors.primary,
    fontWeight: Typography.bold,
    marginTop: 6,
  },
  date: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 2,
  },
  content_text: {
    fontSize: Typography.base,
    color: Colors.foreground,
    fontWeight: Typography.regular,
    lineHeight: 26,
  },
  excerpt: {
    fontSize: Typography.base,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: Spacing.lg,
  },
  tag: {
    backgroundColor: Colors.muted,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tagText: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.foreground,
  },
  seoLabel: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 1,
  },
  seoValue: {
    fontSize: Typography.sm,
    color: Colors.foreground,
    fontWeight: Typography.medium,
    marginTop: 2,
  },
});

export default BlogDetailScreen;
