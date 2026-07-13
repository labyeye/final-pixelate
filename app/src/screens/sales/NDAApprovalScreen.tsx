import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { ndaAPI } from '../../api';
import {
  Card,
  Row,
  StatusBadge,
  EmptyState,
  LoadingSpinner,
} from '../../components/common';
import { Colors, Typography, Spacing, Border } from '../../theme';
import { format } from 'date-fns';

const NDAApprovalScreen = () => {
  const { data: ndas = [], isLoading } = useQuery({
    queryKey: ['nda'],
    queryFn: () => ndaAPI.getAll().then(r => r.data),
  });

  if (isLoading) return <LoadingSpinner />;

  const items = Array.isArray(ndas) ? ndas : [];

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <View style={styles.infoBanner}>
          <Text style={styles.infoBannerText}>🔒 NDA APPROVALS</Text>
          <Text style={styles.infoBannerSub}>
            Non-Disclosure Agreements awaiting review
          </Text>
        </View>
        <Text style={styles.count}>{items.length} RECORDS</Text>
        <FlatList
          style={{ flex: 1 }}
          data={items}
          keyExtractor={(item, i) => String(item._id || i)}
          ListEmptyComponent={
            <EmptyState
              title="No NDA Requests"
              subtitle="NDA approval requests will appear here"
            />
          }
          renderItem={({ item }) => (
            <Card
              style={[
                styles.card,
                { borderLeftColor: Colors.gray700, borderLeftWidth: 4 },
              ]}
              shadow="sm"
            >
              <Row justify="space-between" align="flex-start">
                <View style={styles.left}>
                  <Text style={styles.clientName}>
                    {item.clientName || item.name}
                  </Text>
                  {item.email ? (
                    <Text style={styles.email}>{item.email}</Text>
                  ) : null}
                  {item.projectName ? (
                    <Text style={styles.project}>{item.projectName}</Text>
                  ) : null}
                  {item.createdAt ? (
                    <Text style={styles.date}>
                      {format(new Date(item.createdAt), 'dd MMM yyyy')}
                    </Text>
                  ) : null}
                </View>
                <StatusBadge
                  status={item.status || item.approvalStatus || 'pending'}
                />
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
  infoBanner: {
    backgroundColor: Colors.gray900,
    padding: Spacing.md,
    marginBottom: Spacing.base,
    borderWidth: Border.widthBold,
    borderColor: Colors.border,
  },
  infoBannerText: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 1,
  },
  infoBannerSub: {
    fontSize: Typography.sm,
    color: Colors.gray400,
    fontWeight: Typography.medium,
    marginTop: 2,
  },
  count: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
  },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  left: { flex: 1 },
  clientName: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  email: {
    fontSize: Typography.sm,
    color: Colors.primary,
    fontWeight: Typography.bold,
    marginTop: 2,
  },
  project: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 1,
  },
  date: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 1,
  },
});

export default NDAApprovalScreen;
