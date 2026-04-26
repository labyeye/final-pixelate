import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { dashboardAPI } from '../../api';
import { Card, SectionHeader, LoadingSpinner, EmptyState } from '../../components/common';
import { Colors, Typography, Spacing, Border } from '../../theme';

const ReportsScreen = () => {
  const { data: reports, isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: () => dashboardAPI.getReports().then(r => r.data),
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionHeader title="REPORTS" />
        {!reports || (Array.isArray(reports) && reports.length === 0) ? (
          <EmptyState title="No Reports" subtitle="Reports will appear here" />
        ) : (
          Array.isArray(reports) ? reports.map((report: any, idx: number) => (
            <Card key={idx} style={styles.card}>
              <Text style={styles.reportTitle}>{report.title || report.name || `Report ${idx + 1}`}</Text>
              {report.value !== undefined ? (
                <Text style={styles.reportValue}>{report.value}</Text>
              ) : null}
              {report.description ? (
                <Text style={styles.reportDesc}>{report.description}</Text>
              ) : null}
            </Card>
          )) : (
            <Card style={styles.card}>
              <Text style={styles.reportTitle}>Summary Report</Text>
              <Text style={styles.reportDesc}>{JSON.stringify(reports)}</Text>
            </Card>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, paddingBottom: 24 },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  reportTitle: { fontSize: Typography.lg, fontWeight: Typography.black, color: Colors.foreground },
  reportValue: { fontSize: Typography['2xl'], fontWeight: Typography.black, color: Colors.primary, marginTop: 4 },
  reportDesc: { fontSize: Typography.sm, color: Colors.mutedForeground, marginTop: 4, fontWeight: Typography.medium },
});

export default ReportsScreen;
