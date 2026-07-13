import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import {
  leadsAPI,
  clientsAPI,
  projectsAPI,
  invoicesAPI,
  expensesAPI,
  servicesAPI,
  teamAPI,
} from '../../api';
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
  const { data: expenses = [] } = useQuery({
    queryKey: ['expenses'],
    queryFn: () => expensesAPI.getAll().then(r => r.data),
  });
  const { data: services = [] } = useQuery({
    queryKey: ['services'],
    queryFn: () => servicesAPI.getAll().then(r => r.data),
  });
  const { data: team = [] } = useQuery({
    queryKey: ['team-members'],
    queryFn: () => teamAPI.getAll().then(r => r.data),
  });

  const totalRevenue = Array.isArray(invoices)
    ? invoices.reduce((s: number, i: any) => s + (i.total || i.amount || 0), 0)
    : 0;
  const collectedRevenue = Array.isArray(invoices)
    ? invoices.reduce(
        (s: number, i: any) =>
          s +
          (Number(
            i.paidAmount ?? (i.status === 'PAID' || i.status === 'paid' ? i.total || i.amount : 0),
          ) || 0),
        0,
      )
    : 0;
  const pendingRevenue = Math.max(0, totalRevenue - collectedRevenue);

  const totalExpenses = Array.isArray(expenses)
    ? expenses.reduce((s: number, e: any) => s + (Number(e.amount) || 0), 0)
    : 0;

  const devEditorEarnings = React.useMemo(() => {
    const earnings = { developers: 0, editors: 0 };
    const byId: Record<string, any> = {};
    for (const m of Array.isArray(team) ? team : [])
      byId[String(m._id ?? m.id)] = m;
    for (const p of Array.isArray(projects) ? projects : []) {
      for (const a of p.assignees || []) {
        const member = byId[String(a.id)];
        if (!member) continue;
        const role = (member.role || '').toLowerCase();
        const payout = Number(a.payout || 0);
        if (role.includes('developer')) earnings.developers += payout;
        if (role.includes('editor')) earnings.editors += payout;
      }
    }
    return earnings;
  }, [projects, team]);

  const topClients = React.useMemo(() => {
    const map: Record<string, number> = {};
    for (const inv of Array.isArray(invoices) ? invoices : []) {
      const id = inv.clientId ?? inv.client ?? inv.clientName ?? 'Unknown';
      map[id] = (map[id] || 0) + (Number(inv.total || inv.amount) || 0);
    }
    const rows = Object.entries(map).map(([id, amt]) => ({
      id,
      amt,
      name:
        (Array.isArray(clients) ? clients : []).find(
          (c: any) => String(c._id ?? c.id) === String(id),
        )?.name || id,
    }));
    return rows.sort((a, b) => b.amt - a.amt).slice(0, 5);
  }, [invoices, clients]);

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
        <View style={[styles.grid, { marginTop: Spacing.sm }]}>
          <StatCard
            label="SERVICE CATEGORIES"
            value={Array.isArray(services) ? services.length : 0}
            accent={Colors.secondary}
          />
          <StatCard
            label="TOTAL EXPENSES"
            value={`₹${totalExpenses.toLocaleString('en-IN')}`}
            accent={Colors.destructive}
          />
        </View>

        <Divider style={{ marginVertical: Spacing.lg }} />

        <SectionHeader title="REVENUE" />
        <Card style={styles.revenueCard}>
          <Row justify="space-between" align="center">
            <View>
              <Text style={styles.revenueLabel}>COLLECTED</Text>
              <Text style={[styles.revenueValue, { color: Colors.success }]}>
                ₹{collectedRevenue.toLocaleString('en-IN')}
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
          <Text style={styles.revenueTotal}>
            GENERATED: ₹{totalRevenue.toLocaleString('en-IN')}
          </Text>
        </Card>

        <Divider style={{ marginVertical: Spacing.lg }} />

        <SectionHeader title="DEV / EDITOR EARNINGS" />
        <Card style={styles.revenueCard}>
          <Row justify="space-between" align="center">
            <View>
              <Text style={styles.revenueLabel}>DEVELOPERS</Text>
              <Text style={styles.revenueValue}>
                ₹{devEditorEarnings.developers.toLocaleString('en-IN')}
              </Text>
            </View>
            <View style={styles.revenueDivider} />
            <View>
              <Text style={styles.revenueLabel}>EDITORS</Text>
              <Text style={styles.revenueValue}>
                ₹{devEditorEarnings.editors.toLocaleString('en-IN')}
              </Text>
            </View>
          </Row>
        </Card>

        <Divider style={{ marginVertical: Spacing.lg }} />

        <SectionHeader title="TOP CLIENTS (BY INVOICE AMOUNT)" />
        {topClients.map(c => (
          <Card key={c.id} style={styles.barCard}>
            <Row justify="space-between" align="center">
              <Text style={styles.clientName}>{c.name}</Text>
              <Text style={styles.barCount}>
                ₹{c.amt.toLocaleString('en-IN')}
              </Text>
            </Row>
          </Card>
        ))}

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
  revenueTotal: {
    marginTop: Spacing.md,
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.mutedForeground,
  },
  clientName: { fontSize: Typography.base, fontWeight: Typography.bold, flexShrink: 1 },
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
