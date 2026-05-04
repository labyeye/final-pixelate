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
import { socialMediaAPI } from '../../api';
import {
  Card,
  Row,
  EmptyState,
  LoadingSpinner,
  SectionHeader,
} from '../../components/common';
import { Colors, Typography, Spacing, Border } from '../../theme';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
} from 'date-fns';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const SocialMediaCalendarScreen = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['social-posts'],
    queryFn: () => socialMediaAPI.getPosts().then(r => r.data),
  });

  if (isLoading) return <LoadingSpinner />;

  const monthDays = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });
  const items = Array.isArray(posts) ? posts : [];

  const getPostsForDay = (day: Date) =>
    items.filter(
      (p: any) => p.scheduledDate && isSameDay(new Date(p.scheduledDate), day),
    );

  const platformColor: Record<string, string> = {
    Instagram: '#E1306C',
    Facebook: '#1877F2',
    LinkedIn: '#0A66C2',
    YouTube: '#FF0000',
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        {}
        <Card style={styles.monthNav}>
          <Row justify="space-between" align="center">
            <TouchableOpacity
              onPress={() =>
                setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1))
              }
            >
              <Text style={styles.navArrow}>←</Text>
            </TouchableOpacity>
            <Text style={styles.monthTitle}>
              {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
            </Text>
            <TouchableOpacity
              onPress={() =>
                setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1))
              }
            >
              <Text style={styles.navArrow}>→</Text>
            </TouchableOpacity>
          </Row>
        </Card>

        <SectionHeader
          title={`POSTS THIS MONTH (${items.filter((p: any) => p.scheduledDate && new Date(p.scheduledDate).getMonth() === currentDate.getMonth()).length})`}
        />

        <FlatList
          data={monthDays.filter(d => getPostsForDay(d).length > 0)}
          keyExtractor={d => d.toISOString()}
          ListEmptyComponent={
            <EmptyState
              title="No Posts Scheduled"
              subtitle="Add posts to the planner to see them here"
            />
          }
          renderItem={({ item: day }) => (
            <View style={styles.dayBlock}>
              <View style={styles.dayLabel}>
                <Text style={styles.dayNumber}>{format(day, 'd')}</Text>
                <Text style={styles.dayName}>{format(day, 'EEE')}</Text>
              </View>
              <View style={styles.dayPosts}>
                {getPostsForDay(day).map((post: any, i: number) => (
                  <View
                    key={i}
                    style={[
                      styles.postChip,
                      {
                        borderLeftColor:
                          platformColor[post.platform] || Colors.accent,
                        borderLeftWidth: 3,
                      },
                    ]}
                  >
                    <Text style={styles.postPlatform}>{post.platform}</Text>
                    <Text style={styles.postCaption} numberOfLines={1}>
                      {post.caption}
                    </Text>
                    {post.clientName ? (
                      <Text style={styles.postClient}>{post.clientName}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.base, paddingBottom: 0 },
  monthNav: { padding: Spacing.md, marginBottom: Spacing.base },
  navArrow: {
    fontSize: Typography['2xl'],
    fontWeight: Typography.black,
    color: Colors.primary,
    paddingHorizontal: Spacing.sm,
  },
  monthTitle: {
    fontSize: Typography.xl,
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: -0.5,
  },
  dayBlock: { flexDirection: 'row', marginBottom: Spacing.sm, gap: Spacing.sm },
  dayLabel: { width: 44, alignItems: 'center', paddingTop: Spacing.sm },
  dayNumber: {
    fontSize: Typography.xl,
    fontWeight: Typography.black,
    color: Colors.primary,
  },
  dayName: {
    fontSize: Typography.xs,
    color: Colors.mutedForeground,
    fontWeight: Typography.bold,
  },
  dayPosts: { flex: 1, gap: 6 },
  postChip: {
    backgroundColor: Colors.white,
    borderWidth: Border.width,
    borderColor: Colors.border,
    padding: Spacing.sm,
  },
  postPlatform: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.accent,
    letterSpacing: 0.5,
  },
  postCaption: {
    fontSize: Typography.sm,
    color: Colors.foreground,
    fontWeight: Typography.medium,
    marginTop: 2,
  },
  postClient: {
    fontSize: Typography.xs,
    color: Colors.mutedForeground,
    fontWeight: Typography.bold,
    marginTop: 1,
  },
});

export default SocialMediaCalendarScreen;
