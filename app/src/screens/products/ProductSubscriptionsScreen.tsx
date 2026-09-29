import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import {
  IndianRupee,
  TrendingUp,
  Activity,
  CheckCircle2,
  Building2,
  Clock,
  XCircle,
  Users,
  AlertTriangle,
} from 'lucide-react-native';
import { productsAPI } from '../../api';
import {
  Card,
  Row,
  StatCard,
  StatusBadge,
  FilterChips,
  SectionHeader,
  EmptyState,
  LoadingSpinner,
  Button,
} from '../../components/common';
import { Colors, Typography, Spacing } from '../../theme';
import { MoreStackParams } from '../../navigation/types';
import { fmtNum, fmtINR, fmtDate, apiError } from './shared';

type Tab = 'overview' | 'tenants' | 'alerts';

// Nest HR counts "employees", Nest Leads counts "team members"; the stats
// payloads are otherwise identical.
const SEAT = {
  hr: {
    group: 'employees',
    tenantCount: 'activeEmployees',
    max: 'maxEmployees',
    label: 'Employees',
    activity: [
      ['attendanceRecordsLast30Days', 'Attendance records'],
      ['leaveRequestsLast30Days', 'Leave requests'],
      ['payrollsProcessedLast30Days', 'Payrolls processed'],
    ],
  },
  leads: {
    group: 'teamMembers',
    tenantCount: 'activeTeamMembers',
    max: 'maxTeamMembers',
    label: 'Team members',
    activity: [
      ['leadsCapturedLast30Days', 'Leads captured'],
      ['campaignsLaunchedLast30Days', 'Campaigns launched'],
      ['quotationsCreatedLast30Days', 'Quotations created'],
    ],
  },
} as const;

const Grid = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.grid}>{children}</View>
);

const ProductSubscriptionsScreen = () => {
  const { product } =
    useRoute<RouteProp<MoreStackParams, 'ProductSubscriptions'>>().params;
  const seat = SEAT[product];
  const [tab, setTab] = useState<Tab>('overview');

  const { data, isLoading, isRefetching, refetch, error } = useQuery({
    queryKey: ['product-stats', product],
    queryFn: () =>
      productsAPI.getStats(product).then(r => {
        if (r.data?.error) throw new Error(r.data.error);
        return r.data;
      }),
  });

  if (isLoading) return <LoadingSpinner />;
  if (error || !data) {
    return (
      <EmptyState
        title="Couldn't load subscriptions"
        subtitle={apiError(error, 'No data returned')}
        action={{ label: 'Retry', onPress: () => refetch() }}
      />
    );
  }

  const ov = data.overview ?? {};
  const t = ov.tenants ?? {};
  const s = ov.subscriptions ?? {};
  const rev = ov.revenue ?? {};
  const cycle = rev.byBillingCycle ?? {};
  const seats = ov[seat.group] ?? {};
  const act = ov.activity ?? {};
  const alerts = data.alerts ?? {};
  const tenants: any[] = data.tenants ?? [];
  const urgent =
    (alerts.expiringIn7Days?.length ?? 0) + (alerts.expired?.length ?? 0);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        <Text style={styles.updated}>
          Last updated {fmtDate(data.generatedAt)}
        </Text>
        <FilterChips
          value={tab}
          onChange={v => setTab(v as Tab)}
          options={[
            { label: 'Overview', value: 'overview' },
            { label: `Tenants (${tenants.length})`, value: 'tenants' },
            { label: `Alerts${urgent ? ` (${urgent})` : ''}`, value: 'alerts' },
          ]}
          style={{ marginBottom: Spacing.md }}
        />

        {tab === 'overview' && (
          <>
            <SectionHeader title="Revenue" />
            <Grid>
              <StatCard label="All-time revenue" value={fmtINR(rev.totalAllTime)} icon={<IndianRupee size={16} color={Colors.white} />} />
              <StatCard label="Last 30 days" value={fmtINR(rev.last30Days)} accent={Colors.secondary} icon={<TrendingUp size={16} color={Colors.white} />} />
              <StatCard label="MRR" value={fmtINR(rev.mrr)} icon={<Activity size={16} color={Colors.white} />} />
              <StatCard label="ARR" value={fmtINR(rev.arr)} accent={Colors.secondary} icon={<CheckCircle2 size={16} color={Colors.white} />} />
              <StatCard label="Monthly plans" value={fmtINR(cycle.monthly?.total)} sub={`${cycle.monthly?.count ?? 0} subscribers`} />
              <StatCard label="Yearly plans" value={fmtINR(cycle.yearly?.total)} sub={`${cycle.yearly?.count ?? 0} subscribers`} />
            </Grid>

            <SectionHeader title="Tenants" style={styles.section} />
            <Grid>
              <StatCard label="Total companies" value={fmtNum(t.total)} icon={<Building2 size={16} color={Colors.white} />} />
              <StatCard label="Active" value={fmtNum(t.active)} accent={Colors.success} icon={<CheckCircle2 size={16} color={Colors.white} />} />
              <StatCard label="On trial" value={fmtNum(t.trial)} accent={Colors.warning} icon={<Clock size={16} color={Colors.white} />} />
              <StatCard label="Inactive" value={fmtNum(t.inactive)} accent={Colors.gray500} icon={<XCircle size={16} color={Colors.white} />} />
              <StatCard label="New (7 days)" value={fmtNum(t.newLast7Days)} />
              <StatCard label="New (30 days)" value={fmtNum(t.newLast30Days)} />
            </Grid>

            <SectionHeader title="Subscriptions" style={styles.section} />
            <Grid>
              <StatCard label="Active" value={fmtNum(s.active)} />
              <StatCard label="Trial" value={fmtNum(s.trial)} />
              <StatCard label="Cancelled" value={fmtNum(s.cancelled)} />
              <StatCard label="Pending renewal" value={fmtNum(s.pendingRenewal)} />
              <StatCard label="Expiring in 7 days" value={fmtNum(s.expiringIn7Days)} />
              <StatCard label="Expiring in 30 days" value={fmtNum(s.expiringIn30Days)} />
              <StatCard label="Expired" value={fmtNum(s.expired)} />
              <StatCard label="Total" value={fmtNum(s.total)} />
            </Grid>

            <SectionHeader title={`${seat.label} across platform`} style={styles.section} />
            <Grid>
              <StatCard label="Total" value={fmtNum(seats.total)} icon={<Users size={16} color={Colors.white} />} />
              <StatCard label="Active" value={fmtNum(seats.active)} />
              <StatCard label="Avg per tenant" value={String(seats.avgPerTenant ?? 0)} />
              <StatCard label="Largest tenant" value={fmtNum(seats.maxInOneTenant)} />
            </Grid>

            <SectionHeader title="Activity (last 30 days)" style={styles.section} />
            <Grid>
              {seat.activity.map(([key, label]) => (
                <StatCard key={key} label={label} value={fmtNum(act[key])} />
              ))}
            </Grid>

            <SectionHeader title="Plan breakdown" style={styles.section} />
            <Card padding={0}>
              {(ov.planBreakdown ?? []).length === 0 ? (
                <Text style={styles.none}>No plan data</Text>
              ) : (
                ov.planBreakdown.map((p: any, i: number) => (
                  <Row key={i} justify="space-between" style={[styles.listRow, i > 0 && styles.rowDivider]}>
                    <View>
                      <Text style={styles.name}>{p.plan}</Text>
                      <Text style={styles.meta}>{p.billingCycle}</Text>
                    </View>
                    <Text style={styles.bigNum}>{p.count}</Text>
                  </Row>
                ))
              )}
            </Card>
          </>
        )}

        {tab === 'tenants' &&
          (tenants.length === 0 ? (
            <EmptyState title="No tenants found" />
          ) : (
            tenants.map(tn => {
              const sub = tn.subscription ?? {};
              return (
                <Card
                  key={tn.id}
                  style={[
                    styles.card,
                    sub.isExpired && { borderColor: Colors.destructive },
                  ]}
                  shadow="sm"
                >
                  <Row justify="space-between" align="flex-start">
                    <View style={{ flex: 1 }}>
                      <Text style={styles.name}>{tn.name}</Text>
                      <Text style={styles.meta}>{tn.email}</Text>
                      {tn.city ? (
                        <Text style={styles.meta}>
                          {tn.city}
                          {tn.state ? `, ${tn.state}` : ''}
                        </Text>
                      ) : null}
                    </View>
                    <StatusBadge
                      status={sub.expiringIn7Days ? 'expiring' : tn.status}
                    />
                  </Row>
                  <Row justify="space-between" style={styles.kvRow}>
                    <KV k="Plan" v={`${sub.plan ?? '—'} · ${sub.billingCycle ?? ''}`} />
                    <KV k={seat.label} v={`${tn[seat.tenantCount] ?? 0} / ${sub[seat.max] ?? '—'}`} />
                  </Row>
                  <Row justify="space-between" style={styles.kvRow}>
                    <KV
                      k="Renewal"
                      v={fmtDate(sub.renewalDate) + (sub.isExpired ? ' (expired)' : '')}
                      danger={sub.isExpired}
                    />
                    <KV k="Paid" v={fmtINR(sub.amountPaid)} />
                  </Row>
                  <Text style={styles.meta}>Last login {fmtDate(tn.lastLogin)}</Text>
                </Card>
              );
            })
          ))}

        {tab === 'alerts' && (
          <>
            <AlertList title="Expiring in 7 days" color={Colors.destructive} rows={alerts.expiringIn7Days} />
            <AlertList title="Expiring in 30 days" color={Colors.warning} rows={alerts.expiringIn30Days} />
            <AlertList title="Expired — follow up" color={Colors.destructive} rows={alerts.expired} showLastLogin />
            <SectionHeader title={`Active trials (${alerts.trialsActive?.length ?? 0})`} style={styles.section} />
            {(alerts.trialsActive ?? []).length === 0 ? (
              <Text style={styles.none}>No active trials</Text>
            ) : (
              alerts.trialsActive.map((r: any, i: number) => (
                <Card key={i} style={styles.card}>
                  <Text style={styles.name}>{r.name}</Text>
                  <Text style={styles.meta}>{r.email}</Text>
                  <Text style={styles.meta}>
                    Trial ends {fmtDate(r.trialEndDate)} ·{' '}
                    {r.activeEmployees ?? r.activeTeamMembers ?? 0} active
                  </Text>
                </Card>
              ))
            )}
          </>
        )}
        <Button
          label="Refresh"
          variant="outline"
          size="sm"
          onPress={() => refetch()}
          style={{ marginTop: Spacing.lg }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const KV = ({ k, v, danger }: { k: string; v: string; danger?: boolean }) => (
  <View style={{ flex: 1 }}>
    <Text style={styles.kvKey}>{k}</Text>
    <Text style={[styles.kvVal, danger && { color: Colors.destructive }]}>{v}</Text>
  </View>
);

const AlertList = ({
  title,
  color,
  rows = [],
  showLastLogin,
}: {
  title: string;
  color: string;
  rows?: any[];
  showLastLogin?: boolean;
}) => (
  <>
    <Row gap={6} style={styles.section}>
      <AlertTriangle size={14} color={color} />
      <Text style={[styles.alertTitle, { color }]}>
        {title} ({rows.length})
      </Text>
    </Row>
    {rows.length === 0 ? (
      <Text style={styles.none}>None — all clear</Text>
    ) : (
      rows.map((r, i) => (
        <Card key={i} style={styles.card}>
          <Row justify="space-between">
            <Text style={styles.name}>{r.name}</Text>
            <Text style={styles.meta}>{r.plan}</Text>
          </Row>
          <Text style={styles.meta}>{r.email}</Text>
          <Text style={styles.meta}>
            Renewal {fmtDate(r.renewalDate)}
            {showLastLogin ? ` · Last login ${fmtDate(r.lastLogin)}` : ''}
          </Text>
        </Card>
      ))
    )}
  </>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, paddingBottom: Spacing['2xl'] },
  updated: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    marginBottom: Spacing.md,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  section: { marginTop: Spacing.xl, marginBottom: Spacing.sm },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  listRow: { padding: Spacing.md },
  rowDivider: { borderTopWidth: 1, borderTopColor: Colors.border },
  name: {
    fontSize: Typography.base,
    fontWeight: Typography.bold,
    color: Colors.foreground,
  },
  meta: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    marginTop: 2,
    textTransform: 'none',
  },
  bigNum: {
    fontSize: Typography.xl,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  kvRow: { marginTop: Spacing.sm, gap: Spacing.md },
  kvKey: { fontSize: Typography.xs, color: Colors.mutedForeground },
  kvVal: {
    fontSize: Typography.sm,
    fontWeight: Typography.semiBold,
    color: Colors.foreground,
    marginTop: 1,
  },
  alertTitle: { fontSize: Typography.sm, fontWeight: Typography.bold },
  none: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    padding: Spacing.md,
  },
});

export default ProductSubscriptionsScreen;
