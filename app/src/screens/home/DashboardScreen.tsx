import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../context/AuthContext';
import {
  Card,
  StatCard,
  SectionHeader,
  Row,
  Divider,
  StatusBadge,
} from '../../components/common';
import { Colors, Typography, Spacing, Shadows, Border } from '../../theme';
import { leadsAPI, projectsAPI, invoicesAPI, tasksAPI } from '../../api';
import { HomeStackParams } from '../../navigation/types';
import { useQuery } from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/FontAwesome';
type Nav = NativeStackNavigationProp<HomeStackParams>;

const QUICK_ACTIONS = [
  { label: 'New Lead', icon: 'bar-chart', color: Colors.white, route: 'Leads' },
  {
    label: 'Analytics',
    icon: 'signal',
    color: Colors.white,
    route: 'Analytics',
  },
  {
    label: 'Reports',
    icon: 'file-text-o',
    color: Colors.white,
    route: 'Reports',
  },
  { label: 'Profile', icon: 'user', color: Colors.white, route: 'Profile' },
];

const DashboardScreen = () => {
  const navigation = useNavigation<Nav>();
  const { user, logout } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const { data: leads = [], refetch: refetchLeads } = useQuery({
    queryKey: ['leads'],
    queryFn: () => leadsAPI.getAll().then(r => r.data),
  });

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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      refetchLeads(),
      refetchProjects(),
      refetchInvoices(),
      refetchTasks(),
    ]);
    setRefreshing(false);
  }, [refetchLeads, refetchProjects, refetchInvoices, refetchTasks]);

  const totalRevenue = Array.isArray(invoices)
    ? invoices
        .filter((i: any) => i.status === 'paid')
        .reduce((s: number, i: any) => s + (i.total || i.amount || 0), 0)
    : 0;

  const pendingTasks = Array.isArray(tasks)
    ? tasks.filter((t: any) => t.status !== 'completed').length
    : 0;

  const newLeads = Array.isArray(leads)
    ? leads.filter((l: any) => l.status === 'not called').length
    : 0;

  const activeProjects = Array.isArray(projects)
    ? projects.filter(
        (p: any) => p.status === 'active' || p.status === 'in progress',
      ).length
    : 0;

  const recentLeads = Array.isArray(leads) ? leads.slice(0, 5) : [];

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
            label="NEW LEADS"
            value={newLeads}
            accent={Colors.warning}
          />
          <StatCard
            label="ACTIVE PROJECTS"
            value={activeProjects}
            accent={Colors.primary}
          />
        </View>
        <View style={[styles.statsGrid, { marginTop: Spacing.sm }]}>
          <StatCard
            label="PENDING TASKS"
            value={pendingTasks}
            accent={Colors.primary}
          />
          <StatCard
            label="PAID INVOICES"
            value={`₹${(totalRevenue / 1000).toFixed(0)}K`}
            accent={Colors.warning}
          />
        </View>

        <Divider style={{ marginVertical: Spacing.lg }} />

        {}
        <SectionHeader title="QUICK ACTIONS" />
        <View style={styles.quickActions}>
          {QUICK_ACTIONS.map(action => (
            <TouchableOpacity
              key={action.route}
              style={[styles.quickAction, { backgroundColor: action.color }]}
              onPress={() => navigation.navigate(action.route as any)}
              activeOpacity={0.8}
            >
              <Icon name={action.icon} size={28} color={Colors.primary} />
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Divider style={{ marginVertical: Spacing.lg }} />

        {}
        <SectionHeader
          title="RECENT LEADS"
          action={{ label: 'See All →', onPress: () => {} }}
        />
        {recentLeads.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyText}>No leads yet</Text>
          </Card>
        ) : (
          recentLeads.map((lead: any) => (
            <Card key={lead._id || lead.id} style={styles.leadCard} shadow="sm">
              <Row justify="space-between" align="flex-start">
                <View style={styles.leadLeft}>
                  <Text style={styles.leadName}>{lead.name}</Text>
                  {lead.phone ? (
                    <Text style={styles.leadMeta}>{lead.phone}</Text>
                  ) : null}
                  {lead.project ? (
                    <Text style={styles.leadProject}>{lead.project}</Text>
                  ) : null}
                </View>
                <StatusBadge status={lead.status || 'not called'} />
              </Row>
            </Card>
          ))
        )}

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
    ...Shadows.md,
  },
  quickActionEmoji: { fontSize: 28, marginBottom: 6 },
  quickActionLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.primary,
    letterSpacing: 0.3,
  },
  leadCard: { marginBottom: Spacing.sm, padding: Spacing.md },
  leadLeft: { flex: 1 },
  leadName: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  leadMeta: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 2,
  },
  leadProject: {
    fontSize: Typography.sm,
    color: Colors.primary,
    fontWeight: Typography.bold,
    marginTop: 2,
  },
  emptyCard: { padding: Spacing.xl, alignItems: 'center' },
  emptyText: {
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    fontSize: Typography.base,
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
