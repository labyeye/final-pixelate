import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  useWindowDimensions,
} from 'react-native';
import Svg, { Path, Line, Rect, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../context/AuthContext';
import {
  Card,
  StatCard,
  SectionHeader,
  Divider,
} from '../../components/common';
import { Colors, Typography, Spacing, Shadows, Border } from '../../theme';
import {
  projectsAPI,
  invoicesAPI,
  tasksAPI,
  clientsAPI,
  expensesAPI,
  quotationsAPI,
} from '../../api';
import { HomeStackParams } from '../../navigation/types';
import { useQuery } from '@tanstack/react-query';
import {
  Activity,
  FileText,
  User,
  Users,
  Briefcase,
  ClipboardList,
  IndianRupee,
  TrendingDown,
  ChevronRight,
} from 'lucide-react-native';
type Nav = NativeStackNavigationProp<HomeStackParams>;

const QUICK_ACTIONS = [
  {
    label: 'Analytics',
    icon: Activity,
    color: Colors.secondary,
    route: 'Analytics',
  },
  { label: 'Reports', icon: FileText, color: Colors.primary, route: 'Reports' },
  { label: 'Profile', icon: User, color: Colors.gray800, route: 'Profile' },
];

const CHART_HEIGHT = 160;

const TrendAreaChart = ({ data, labels }: { data: number[]; labels: string[] }) => {
  const { width: screenWidth } = useWindowDimensions();
  const width = screenWidth - Spacing.base * 2 - Spacing.md * 2;
  const max = Math.max(...data, 1);
  const stepX = width / (data.length - 1 || 1);
  const points = data.map((v, i) => ({
    x: i * stepX,
    y: CHART_HEIGHT - (v / max) * (CHART_HEIGHT - 20),
  }));
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = `${linePath} L${points[points.length - 1].x},${CHART_HEIGHT} L0,${CHART_HEIGHT} Z`;

  return (
    <Svg width={width} height={CHART_HEIGHT + 20}>
      <Defs>
        <LinearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor={Colors.primary} stopOpacity={0.5} />
          <Stop offset="100%" stopColor={Colors.primary} stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <Path d={areaPath} fill="url(#revGrad)" />
      <Path d={linePath} stroke={Colors.primary} strokeWidth={2.5} fill="none" />
      {labels.map((l, i) => (
        <SvgText
          key={l + i}
          x={points[i].x}
          y={CHART_HEIGHT + 16}
          fontSize={10}
          fill={Colors.mutedForeground}
          textAnchor="middle"
        >
          {l}
        </SvgText>
      ))}
    </Svg>
  );
};

const TrendBarChart = ({ data, labels }: { data: number[]; labels: string[] }) => {
  const { width: screenWidth } = useWindowDimensions();
  const width = screenWidth - Spacing.base * 2 - Spacing.md * 2;
  const max = Math.max(...data, 1);
  const slot = width / data.length;
  const barWidth = Math.min(28, slot * 0.5);

  return (
    <Svg width={width} height={CHART_HEIGHT + 20}>
      <Line x1={0} y1={CHART_HEIGHT} x2={width} y2={CHART_HEIGHT} stroke={Colors.border} strokeWidth={1} />
      {data.map((v, i) => {
        const barHeight = (v / max) * (CHART_HEIGHT - 20);
        const x = i * slot + (slot - barWidth) / 2;
        return (
          <Rect
            key={i}
            x={x}
            y={CHART_HEIGHT - barHeight}
            width={barWidth}
            height={barHeight}
            fill={Colors.secondary}
            rx={4}
          />
        );
      })}
      {labels.map((l, i) => (
        <SvgText
          key={l + i}
          x={i * slot + slot / 2}
          y={CHART_HEIGHT + 16}
          fontSize={10}
          fill={Colors.mutedForeground}
          textAnchor="middle"
        >
          {l}
        </SvgText>
      ))}
    </Svg>
  );
};

const DashboardScreen = () => {
  const navigation = useNavigation<Nav>();
  const { user, logout } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const { data: projects = [], refetch: refetchProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectsAPI.getAll().then(r => r.data),
  });

  const { data: invoices = [], refetch: refetchInvoices } = useQuery({
    queryKey: ['invoices'],
    queryFn: () => invoicesAPI.getAll().then(r => r.data),
  });

  const { data: tasks = [], refetch: refetchTasks } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => tasksAPI.getAll().then(r => r.data),
  });

  const { data: clients = [], refetch: refetchClients } = useQuery({
    queryKey: ['clients'],
    queryFn: () => clientsAPI.getAll().then(r => r.data),
  });

  const { data: expenses = [], refetch: refetchExpenses } = useQuery({
    queryKey: ['expenses'],
    queryFn: () => expensesAPI.getAll().then(r => r.data),
  });

  const { data: quotations = [], refetch: refetchQuotations } = useQuery({
    queryKey: ['quotations'],
    queryFn: () => quotationsAPI.getAll().then(r => r.data),
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      refetchProjects(),
      refetchInvoices(),
      refetchTasks(),
      refetchClients(),
      refetchExpenses(),
      refetchQuotations(),
    ]);
    setRefreshing(false);
  }, [
    refetchProjects,
    refetchInvoices,
    refetchTasks,
    refetchClients,
    refetchExpenses,
    refetchQuotations,
  ]);

  const totalRevenue = Array.isArray(invoices)
    ? invoices.reduce((s: number, i: any) => s + (i.total || i.amount || 0), 0)
    : 0;

  const totalExpense = Array.isArray(expenses)
    ? expenses.reduce((s: number, e: any) => s + (e.amount || 0), 0)
    : 0;

  const netProfit = totalRevenue - totalExpense;

  const openQuotes = Array.isArray(quotations)
    ? quotations.filter((q: any) => q.status !== 'approved' && q.status !== 'rejected').length
    : 0;

  const paidInvoicesCount = Array.isArray(invoices)
    ? invoices.filter((i: any) => i.status === 'paid').length
    : 0;

  const pendingTasks = Array.isArray(tasks)
    ? tasks.filter((t: any) => t.status !== 'completed').length
    : 0;

  const activeProjects = Array.isArray(projects)
    ? projects.filter(
        (p: any) => p.status === 'active' || p.status === 'in progress',
      ).length
    : 0;

  const monthlyTrend = useMemo(() => {
    const months: { name: string; year: number; month: number; revenue: number; newClients: number }[] = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        name: d.toLocaleString('default', { month: 'short' }),
        year: d.getFullYear(),
        month: d.getMonth(),
        revenue: 0,
        newClients: 0,
      });
    }
    if (Array.isArray(invoices)) {
      invoices.forEach((inv: any) => {
        const d = new Date(inv.createdAt);
        if (isNaN(d.getTime())) return;
        const m = months.find(x => x.year === d.getFullYear() && x.month === d.getMonth());
        if (m) m.revenue += Number(inv.total || inv.amount || 0);
      });
    }
    if (Array.isArray(clients)) {
      clients.forEach((c: any) => {
        const d = new Date(c.createdAt);
        if (isNaN(d.getTime())) return;
        const m = months.find(x => x.year === d.getFullYear() && x.month === d.getMonth());
        if (m) m.newClients += 1;
      });
    }
    return months;
  }, [invoices, clients]);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
          />
        }
      >
        {}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeText}>
                {(user?.role || 'USER').toUpperCase()}
              </Text>
            </View>
            <Text style={styles.greeting}>Good day,</Text>
            <Text style={styles.userName}>
              {user?.name?.split(' ')[0] || 'User'}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.avatarBox}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.avatarText}>
              {(user?.name || 'U').charAt(0).toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>

        {}
        <SectionHeader title="OVERVIEW" style={{ marginTop: Spacing.lg }} />
        <View style={styles.statsGrid}>
          <StatCard
            label="CLIENTS"
            value={Array.isArray(clients) ? clients.length : 0}
            sub="+1.1%"
            accent={Colors.primary}
            icon={<Users size={18} color={Colors.white} />}
          />
          <StatCard
            label="PROJECTS"
            value={Array.isArray(projects) ? projects.length : 0}
            sub="+2.4%"
            accent={Colors.secondary}
            icon={<Briefcase size={18} color={Colors.white} />}
          />
        </View>
        <View style={[styles.statsGrid, { marginTop: Spacing.sm }]}>
          <StatCard
            label="REVENUE"
            value={`₹${totalRevenue.toLocaleString('en-IN')}`}
            sub="+4.2%"
            accent={Colors.primary}
            icon={<IndianRupee size={18} color={Colors.white} />}
          />
          <StatCard
            label="EXPENSE"
            value={`₹${totalExpense.toLocaleString('en-IN')}`}
            sub="-0.8%"
            accent={Colors.secondary}
            icon={<TrendingDown size={18} color={Colors.white} />}
          />
        </View>
        <View style={[styles.statsGrid, { marginTop: Spacing.sm }]}>
          <StatCard
            label="ACTIVE PROJECTS"
            value={activeProjects}
            sub="in progress"
            accent={Colors.primary}
            icon={<Activity size={18} color={Colors.white} />}
          />
          <StatCard
            label="NET PROFIT"
            value={`₹${netProfit.toLocaleString('en-IN')}`}
            sub={netProfit >= 0 ? 'surplus' : 'deficit'}
            accent={Colors.secondary}
            icon={<IndianRupee size={18} color={Colors.white} />}
          />
        </View>
        <View style={[styles.statsGrid, { marginTop: Spacing.sm }]}>
          <StatCard
            label="OPEN QUOTES"
            value={openQuotes}
            sub={`${paidInvoicesCount} paid invoices`}
            accent={Colors.primary}
            icon={<FileText size={18} color={Colors.white} />}
          />
          <StatCard
            label="PENDING TASKS"
            value={pendingTasks}
            accent={Colors.secondary}
            icon={<ClipboardList size={18} color={Colors.white} />}
          />
        </View>

        <Divider style={{ marginVertical: Spacing.lg }} />

        {}
        <SectionHeader title="INVOICING TREND" />
        <Card style={styles.chartCard} shadow="sm">
          <Text style={styles.chartSubtitle}>
            Revenue generated over the last 6 months
          </Text>
          <TrendAreaChart data={monthlyTrend.map(m => m.revenue)} labels={monthlyTrend.map(m => m.name)} />
        </Card>

        <SectionHeader title="CLIENT TREND" style={{ marginTop: Spacing.lg }} />
        <Card style={styles.chartCard} shadow="sm">
          <Text style={styles.chartSubtitle}>
            New clients acquired over the last 6 months
          </Text>
          <TrendBarChart data={monthlyTrend.map(m => m.newClients)} labels={monthlyTrend.map(m => m.name)} />
        </Card>

        <Divider style={{ marginVertical: Spacing.lg }} />

        {}
        <SectionHeader title="QUICK ACTIONS" />
        <View style={styles.quickActions}>
          {QUICK_ACTIONS.map(action => {
            const Icon = action.icon;
            return (
              <TouchableOpacity
                key={action.route}
                style={[styles.quickAction, { backgroundColor: action.color }]}
                onPress={() => navigation.navigate(action.route as any)}
                activeOpacity={0.8}
              >
                <Icon size={26} color={Colors.white} />
                <Text style={styles.quickActionLabel}>{action.label}</Text>
                <ChevronRight
                  size={16}
                  color={Colors.white}
                  style={styles.quickActionArrow}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() =>
            Alert.alert('Logout', 'Are you sure?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Logout', style: 'destructive', onPress: logout },
            ])
          }
        >
          <Text style={styles.logoutText}>SIGN OUT</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  content: { padding: Spacing.base, paddingBottom: 24 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: Spacing.sm,
  },
  headerLeft: { flex: 1 },
  roleBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.secondary,
    borderWidth: Border.width,
    borderColor: Colors.black,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 6,
  },
  roleBadgeText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 1,
  },
  greeting: {
    fontSize: Typography.base,
    fontWeight: Typography.medium,
    color: Colors.mutedForeground,
  },
  userName: {
    fontSize: Typography['3xl'],
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: -1,
  },
  avatarBox: {
    width: 52,
    height: 52,
    backgroundColor: Colors.primary,
    borderWidth: Border.widthBold,
    borderColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.md,
  },
  avatarText: {
    fontSize: Typography.xl,
    fontWeight: Typography.black,
    color: Colors.white,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  quickAction: {
    flex: 1,
    minWidth: '45%',
    borderWidth: Border.widthBold,
    borderColor: Colors.black,
    padding: Spacing.base,
    alignItems: 'center',
    gap: 6,
  },
  quickActionArrow: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  quickActionLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 0.3,
  },
  chartCard: { padding: Spacing.md },
  chartSubtitle: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginBottom: Spacing.sm,
  },
  logoutBtn: {
    marginTop: Spacing['2xl'],
    borderWidth: Border.widthBold,
    borderColor: Colors.destructive,
    padding: Spacing.md,
    alignItems: 'center',
  },
  logoutText: {
    color: Colors.destructive,
    fontWeight: Typography.black,
    fontSize: Typography.sm,
    letterSpacing: 1,
  },
});

export default DashboardScreen;
