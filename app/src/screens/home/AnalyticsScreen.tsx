import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { leadsAPI, clientsAPI, projectsAPI, invoicesAPI } from '../../api';
import {
  Card,
  StatCard,
  SectionHeader,
  Row,
  Divider,
  StatusBadge,
} from '../../components/common';
import { Colors, Typography, Spacing, Border } from '../../theme';

const AnalyticsScreen = () => {
  const { data: leads = [] } = useQuery({
    queryKey: ['leads'],
    queryFn: () => leadsAPI.getAll().then(r => r.data),
  });
  const { data: clients = [] } = useQuery({
    queryKey: ['clients'],
    queryFn: () => clientsAPI.getAll().then(r => r.data),
  });
  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectsAPI.getAll().then(r => r.data),
  });
  const { data: invoices = [] } = useQuery({
    queryKey: ['invoices'],
    queryFn: () => invoicesAPI.getAll().then(r => r.data),
  });

  const totalRevenue = Array.isArray(invoices)
    ? invoices
        .filter((i: any) => i.status === 'paid')
        .reduce((s: number, i: any) => s + (i.total || i.amount || 0), 0)
    : 0;
  const pendingRevenue = Array.isArray(invoices)
    ? invoices
        .filter((i: any) => i.status !== 'paid')
        .reduce((s: number, i: any) => s + (i.total || i.amount || 0), 0)
    : 0;

  const leadsByStatus = Array.isArray(leads)
    ? leads.reduce((acc: Record<string, number>, l: any) => {
        const s = l.status || 'not called';
        acc[s] = (acc[s] || 0) + 1;
        return acc;
      }, {})
    : {};

  const projectsByStatus = Array.isArray(projects)
    ? projects.reduce((acc: Record<string, number>, p: any) => {
        const s = p.status || 'active';
        acc[s] = (acc[s] || 0) + 1;
        return acc;
      }, {})
    : {};

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionHeader title="KEY METRICS" />
        <View style={styles.grid}>
          <StatCard
            label="TOTAL LEADS"
            value={Array.isArray(leads) ? leads.length : 0}
            accent={Colors.secondary}
          />
          <StatCard
            label="TOTAL CLIENTS"
            value={Array.isArray(clients) ? clients.length : 0}
            accent={Colors.primary}
          />
        </View>
        <View style={[styles.grid, { marginTop: Spacing.sm }]}>
          <StatCard
            label="TOTAL PROJECTS"
            value={Array.isArray(projects) ? projects.length : 0}
            accent={Colors.accent}
          />
          <StatCard
            label="TOTAL INVOICES"
            value={Array.isArray(invoices) ? invoices.length : 0}
            accent={Colors.warning}
          />
        </View>

        <Divider style={{ marginVertical: Spacing.lg }} />

        <SectionHeader title="REVENUE" />
        <Card style={styles.revenueCard}>
          <Row justify="space-between" align="center">
            <View>
              <Text style={styles.revenueLabel}>COLLECTED</Text>
              <Text style={[styles.revenueValue, { color: Colors.success }]}>
                ₹{totalRevenue.toLocaleString('en-IN')}
              </Text>
            </View>
            <View style={styles.revenueDivider} />
            <View>
              <Text style={styles.revenueLabel}>PENDING</Text>
              <Text
                style={[styles.revenueValue, { color: Colors.destructive }]}
              >
                ₹{pendingRevenue.toLocaleString('en-IN')}
              </Text>
            </View>
          </Row>
        </Card>

        <Divider style={{ marginVertical: Spacing.lg }} />

        <SectionHeader title="LEADS BY STATUS" />
        {Object.entries(leadsByStatus).map(([status, count]) => (
          <Card key={status} style={styles.barCard}>
            <Row justify="space-between" align="center">
              <StatusBadge status={status} />
              <Text style={styles.barCount}>{count as number}</Text>
            </Row>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.barFill,
                  {
                    width: `${Math.min(100, ((count as number) / (Array.isArray(leads) ? leads.length : 1)) * 100)}%`,
                    backgroundColor: Colors.primary,
                  },
                ]}
              />
            </View>
          </Card>
        ))}

        <Divider style={{ marginVertical: Spacing.lg }} />

        <SectionHeader title="PROJECTS BY STATUS" />
        {Object.entries(projectsByStatus).map(([status, count]) => (
          <Card key={status} style={styles.barCard}>
            <Row justify="space-between" align="center">
              <StatusBadge status={status} />
              <Text style={styles.barCount}>{count as number}</Text>
            </Row>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, paddingBottom: 24 },
  grid: { flexDirection: 'row', gap: Spacing.sm },
  revenueCard: { padding: Spacing.lg },
  revenueLabel: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 1,
  },
  revenueValue: {
    fontSize: Typography['3xl'],
    fontWeight: Typography.black,
    letterSpacing: -1,
    marginTop: 4,
  },
  revenueDivider: { width: 2, height: 60, backgroundColor: Colors.border },
  barCard: { marginBottom: Spacing.sm, padding: Spacing.md },
  barCount: {
    fontSize: Typography.xl,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  barTrack: {
    height: 6,
    backgroundColor: Colors.gray200,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: Spacing.sm,
  },
  barFill: { height: '100%' },
});

export default AnalyticsScreen;
