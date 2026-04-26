import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { usersAPI } from '../../api';
import { Card, Row, StatusBadge, LoadingSpinner, EmptyState, SearchBar } from '../../components/common';
import { Colors, Typography, Spacing, Border } from '../../theme';
import { useState } from 'react';

const roleColor: Record<string, string> = {
  admin: Colors.primary,
  staff: Colors.secondary,
  client: Colors.accent,
};

const DevelopersScreen = () => {
  const [search, setSearch] = useState('');
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => usersAPI.getAll().then(r => r.data),
  });

  if (isLoading) return <LoadingSpinner />;

  const list = Array.isArray(users) ? users.filter((u: any) =>
    !search || u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase())
  ) : [];

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search users..." />
        <Text style={styles.count}>{list.length} TEAM MEMBERS</Text>
        <FlatList
          data={list}
          keyExtractor={(item, i) => String(item._id || i)}
          ListEmptyComponent={<EmptyState title="No Users" subtitle="Team members will appear here" />}
          renderItem={({ item }) => (
            <Card style={[styles.card, { borderLeftColor: roleColor[item.role] || Colors.primary, borderLeftWidth: 4 }]} shadow="sm">
              <Row justify="space-between" align="center">
                <Row align="center" style={styles.userRow}>
                  <View style={[styles.avatar, { backgroundColor: roleColor[item.role] || Colors.primary }]}>
                    <Text style={styles.avatarText}>{(item.name || 'U').charAt(0).toUpperCase()}</Text>
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.name}>{item.name || 'Unknown'}</Text>
                    <Text style={styles.email}>{item.email}</Text>
                    {item.clientId ? <Text style={styles.clientId}>CLIENT ID: {String(item.clientId).slice(-8)}</Text> : null}
                  </View>
                </Row>
                <View style={[styles.roleBadge, { backgroundColor: roleColor[item.role] || Colors.primary }]}>
                  <Text style={styles.roleText}>{(item.role || 'user').toUpperCase()}</Text>
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
  count: { fontSize: Typography.sm, fontWeight: Typography.black, color: Colors.mutedForeground, letterSpacing: 0.5, marginBottom: Spacing.sm },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  userRow: { flex: 1, gap: Spacing.sm },
  avatar: { width: 44, height: 44, borderWidth: Border.width, borderColor: Colors.black, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: Typography.lg, fontWeight: Typography.black, color: Colors.white },
  info: { flex: 1 },
  name: { fontSize: Typography.base, fontWeight: Typography.black, color: Colors.foreground },
  email: { fontSize: Typography.sm, color: Colors.mutedForeground, fontWeight: Typography.medium, marginTop: 1 },
  clientId: { fontSize: Typography.xs, color: Colors.accent, fontWeight: Typography.bold, marginTop: 1 },
  roleBadge: { paddingHorizontal: 10, paddingVertical: 4, borderWidth: Border.width, borderColor: Colors.black },
  roleText: { fontSize: Typography.xs, fontWeight: Typography.black, color: Colors.white, letterSpacing: 1 },
});

export default DevelopersScreen;
