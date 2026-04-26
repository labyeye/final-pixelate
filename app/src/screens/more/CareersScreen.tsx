import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { careersAPI } from '../../api';
import { Card, Row, StatusBadge, SearchBar, EmptyState, LoadingSpinner } from '../../components/common';
import { Colors, Typography, Spacing, Border } from '../../theme';
import { MoreStackParams } from '../../navigation/types';

type Nav = NativeStackNavigationProp<MoreStackParams>;

const CareersScreen = () => {
  const navigation = useNavigation<Nav>();
  const [search, setSearch] = useState('');
  const { data: jobs = [], isLoading } = useQuery({ queryKey: ['careers'], queryFn: () => careersAPI.getAll().then(r => r.data) });

  if (isLoading) return <LoadingSpinner />;
  const filtered = Array.isArray(jobs) ? jobs.filter((j: any) => !search || j.title?.toLowerCase().includes(search.toLowerCase())) : [];

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search job postings..." />
        <Text style={styles.count}>{filtered.length} JOB POSTINGS</Text>
        <FlatList
          data={filtered}
          keyExtractor={(item, i) => String(item._id || i)}
          ListEmptyComponent={<EmptyState title="No Job Postings" subtitle="Career listings will appear here" />}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('CareerDetail', { id: String(item._id || item.id) })} activeOpacity={0.85}>
              <Card style={[styles.card, { borderLeftColor: Colors.secondary, borderLeftWidth: 4 }]} shadow="sm">
                <Row justify="space-between" align="flex-start">
                  <View style={styles.left}>
                    <Text style={styles.title}>{item.title}</Text>
                    {item.department ? <Text style={styles.dept}>{item.department}</Text> : null}
                    {item.location ? <Text style={styles.location}>📍 {item.location}</Text> : null}
                    {item.type ? <Text style={styles.type}>{item.type}</Text> : null}
                  </View>
                  <StatusBadge status={item.status || 'active'} />
                </Row>
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
  count: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.mutedForeground, letterSpacing: 0.5, marginBottom: Spacing.sm },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  left: { flex: 1 },
  title: { fontSize: Typography.base, fontWeight: Typography.black, color: Colors.foreground },
  dept: { fontSize: Typography.sm, color: Colors.primary, fontWeight: Typography.bold, marginTop: 2 },
  location: { fontSize: Typography.sm, color: Colors.mutedForeground, fontWeight: Typography.medium, marginTop: 1 },
  type: { fontSize: Typography.xs, color: Colors.accent, fontWeight: Typography.bold, marginTop: 2 },
});

export default CareersScreen;
