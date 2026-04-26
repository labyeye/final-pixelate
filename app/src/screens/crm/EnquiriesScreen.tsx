import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { enquiriesAPI } from '../../api';
import { Card, Row, SearchBar, EmptyState, LoadingSpinner } from '../../components/common';
import { Colors, Typography, Spacing, Border } from '../../theme';
import { format } from 'date-fns';

const EnquiriesScreen = () => {
  const [search, setSearch] = useState('');
  const { data: enquiries = [], isLoading } = useQuery({
    queryKey: ['enquiries'],
    queryFn: () => enquiriesAPI.getAll().then(r => r.data),
  });

  if (isLoading) return <LoadingSpinner />;

  const filtered = Array.isArray(enquiries)
    ? enquiries.filter((e: any) =>
        !search || e.name?.toLowerCase().includes(search.toLowerCase()) || e.email?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search enquiries..." />
        <Text style={styles.count}>{filtered.length} ENQUIRIES</Text>
        <FlatList
          data={filtered}
          keyExtractor={(item, i) => String(item._id || i)}
          ListEmptyComponent={<EmptyState title="No Enquiries" subtitle="Website enquiries will appear here" />}
          renderItem={({ item }) => (
            <Card style={styles.card} shadow="sm">
              <Row justify="space-between" align="flex-start">
                <View style={styles.left}>
                  <Text style={styles.name}>{item.name}</Text>
                  {item.email ? <Text style={styles.email}>{item.email}</Text> : null}
                  {item.phone ? <Text style={styles.phone}>{item.phone}</Text> : null}
                  {item.subject ? <Text style={styles.subject}>{item.subject}</Text> : null}
                  {item.message ? <Text style={styles.message} numberOfLines={2}>{item.message}</Text> : null}
                </View>
                {item.createdAt ? (
                  <Text style={styles.date}>{format(new Date(item.createdAt), 'dd MMM')}</Text>
                ) : null}
              </Row>
              {item.source ? (
                <View style={styles.sourceBadge}>
                  <Text style={styles.sourceText}>{item.source}</Text>
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
  count: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.mutedForeground, letterSpacing: 0.5, marginBottom: Spacing.sm },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  left: { flex: 1 },
  name: { fontSize: Typography.base, fontWeight: Typography.black, color: Colors.foreground },
  email: { fontSize: Typography.sm, color: Colors.primary, fontWeight: Typography.bold, marginTop: 2 },
  phone: { fontSize: Typography.sm, color: Colors.mutedForeground, fontWeight: Typography.medium, marginTop: 1 },
  subject: { fontSize: Typography.sm, fontWeight: Typography.semiBold, color: Colors.foreground, marginTop: 4 },
  message: { fontSize: Typography.sm, color: Colors.mutedForeground, fontWeight: Typography.medium, marginTop: 2, lineHeight: 18 },
  date: { fontSize: Typography.xs, color: Colors.mutedForeground, fontWeight: Typography.medium },
  sourceBadge: { marginTop: Spacing.sm, alignSelf: 'flex-start', backgroundColor: Colors.accent, paddingHorizontal: 8, paddingVertical: 2, borderWidth: 1, borderColor: Colors.border },
  sourceText: { fontSize: Typography.xs, fontWeight: Typography.black, color: Colors.white, letterSpacing: 0.3 },
});

export default EnquiriesScreen;
