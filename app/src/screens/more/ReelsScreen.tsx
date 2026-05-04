import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { reelsAPI } from '../../api';
import { Card, Row, LoadingSpinner, EmptyState } from '../../components/common';
import { Colors, Typography, Spacing, Border } from '../../theme';

const ReelsScreen = () => {
  const { data: reels = [], isLoading } = useQuery({
    queryKey: ['reels'],
    queryFn: () => reelsAPI.getAll().then(r => r.data),
  });

  if (isLoading) return <LoadingSpinner />;

  const list = Array.isArray(reels) ? reels : [];

  const openLink = (url: string) => {
    if (url) Linking.openURL(url).catch(() => {});
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <Text style={styles.count}>{list.length} REEL COLLECTIONS</Text>
        <FlatList
          data={list}
          keyExtractor={(item, i) => String(item._id || i)}
          ListEmptyComponent={
            <EmptyState
              title="No Reels"
              subtitle="Reel collections will appear here"
            />
          }
          renderItem={({ item }) => (
            <Card
              style={[
                styles.card,
                { borderLeftColor: Colors.secondary, borderLeftWidth: 4 },
              ]}
              shadow="sm"
            >
              <Row align="center" style={styles.brandRow}>
                <View style={styles.brandAvatar}>
                  <Text style={styles.brandAvatarText}>
                    {(item.brandName || 'R').charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.brandInfo}>
                  <Text style={styles.brandName}>
                    {item.brandName || 'Unknown Brand'}
                  </Text>
                  {item.entries?.length > 0 ? (
                    <Text style={styles.entryCount}>
                      {item.entries.length} REEL
                      {item.entries.length !== 1 ? 'S' : ''}
                    </Text>
                  ) : null}
                </View>
              </Row>

              {item.entries?.length > 0 ? (
                <View style={styles.entriesList}>
                  {item.entries.slice(0, 3).map((entry: any, idx: number) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.entryRow}
                      onPress={() => entry.link && openLink(entry.link)}
                      activeOpacity={entry.link ? 0.7 : 1}
                    >
                      <View style={styles.reelThumb}>
                        <Text style={styles.reelIcon}>🎬</Text>
                      </View>
                      <View style={styles.entryInfo}>
                        {entry.title ? (
                          <Text style={styles.entryTitle}>{entry.title}</Text>
                        ) : null}
                        {entry.link ? (
                          <Text style={styles.entryLink} numberOfLines={1}>
                            {entry.link}
                          </Text>
                        ) : null}
                      </View>
                      {entry.link ? (
                        <Text style={styles.openIcon}>↗</Text>
                      ) : null}
                    </TouchableOpacity>
                  ))}
                  {item.entries.length > 3 ? (
                    <Text style={styles.moreEntries}>
                      +{item.entries.length - 3} more reels
                    </Text>
                  ) : null}
                </View>
              ) : null}
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
  count: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
  },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  brandRow: { gap: Spacing.sm, marginBottom: Spacing.sm },
  brandAvatar: {
    width: 44,
    height: 44,
    backgroundColor: Colors.secondary,
    borderWidth: Border.width,
    borderColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandAvatarText: {
    fontSize: Typography.lg,
    fontWeight: Typography.black,
    color: Colors.white,
  },
  brandInfo: { flex: 1 },
  brandName: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  entryCount: {
    fontSize: Typography.xs,
    color: Colors.secondary,
    fontWeight: Typography.black,
    marginTop: 1,
  },
  entriesList: {
    borderTopWidth: Border.width,
    borderTopColor: Colors.border,
    paddingTop: Spacing.sm,
  },
  entryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: 6,
  },
  reelThumb: {
    width: 36,
    height: 36,
    backgroundColor: Colors.gray200,
    borderWidth: Border.width,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reelIcon: { fontSize: 18 },
  entryInfo: { flex: 1 },
  entryTitle: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.foreground,
  },
  entryLink: {
    fontSize: Typography.xs,
    color: Colors.primary,
    fontWeight: Typography.medium,
    marginTop: 1,
  },
  openIcon: {
    fontSize: Typography.base,
    color: Colors.primary,
    fontWeight: Typography.black,
  },
  moreEntries: {
    fontSize: Typography.xs,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 4,
  },
});

export default ReelsScreen;
