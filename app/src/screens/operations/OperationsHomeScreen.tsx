import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { projectsAPI, tasksAPI, inventoryAPI } from '../../api';
import { Card, StatCard, SectionHeader, Row } from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';
import { OperationsStackParams } from '../../navigation/types';
import Icon from 'react-native-vector-icons/FontAwesome';
type Nav = NativeStackNavigationProp<OperationsStackParams>;

const SECTIONS = [
  {
    label: 'PROJECTS',
    icon: 'briefcase',
    route: 'Projects',
    color: Colors.primary,
    desc: 'Manage all projects',
  },
  {
    label: 'TASKS',
    icon: 'tasks',
    route: 'Tasks',
    color: Colors.primary,
    desc: 'Track team tasks',
  },
  {
    label: 'JOURNEY',
    icon: 'map',
    route: 'Journey',
    color: Colors.primary,
    desc: 'Client journey timeline',
  },
  {
    label: 'INVENTORY',
    icon: 'box',
    route: 'Inventory',
    color: Colors.primary,
    desc: 'Stock and assets',
  },
  {
    label: 'SERVICES',
    icon: 'cogs',
    route: 'Services',
    color: Colors.primary,
    desc: 'Service catalogue',
  },
];

const OperationsHomeScreen = () => {
  const navigation = useNavigation<Nav>();
  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectsAPI.getAll().then(r => r.data),
  });
  const { data: tasks = [] } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => tasksAPI.getAll().then(r => r.data),
  });
  const { data: inventory = [] } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => inventoryAPI.getAll().then(r => r.data),
  });

  const activeProjects = Array.isArray(projects)
    ? projects.filter(
        (p: any) => p.status === 'active' || p.status === 'in progress',
      ).length
    : 0;
  const pendingTasks = Array.isArray(tasks)
    ? tasks.filter((t: any) => t.status !== 'completed').length
    : 0;
  const totalInventory = Array.isArray(inventory) ? inventory.length : 0;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionHeader title="OPERATIONS OVERVIEW" />
        <View style={styles.statsRow}>
          <StatCard
            label="ACTIVE PROJECTS"
            value={activeProjects}
            accent={Colors.primary}
          />
          <StatCard
            label="PENDING TASKS"
            value={pendingTasks}
            accent={Colors.secondary}
          />
        </View>
        <View style={[styles.statsRow, { marginTop: Spacing.sm }]}>
          <StatCard
            label="TOTAL PROJECTS"
            value={Array.isArray(projects) ? projects.length : 0}
            accent={Colors.secondary}
          />
          <StatCard
            label="INVENTORY ITEMS"
            value={totalInventory}
            accent={Colors.primary}
          />
        </View>

        <SectionHeader title="SECTIONS" style={{ marginTop: Spacing.xl }} />
        {SECTIONS.map(section => (
          <TouchableOpacity
            key={section.route}
            onPress={() => navigation.navigate(section.route as any)}
            activeOpacity={0.85}
          >
            <Card
              style={[
                styles.sectionCard,
                { borderLeftColor: section.color, borderLeftWidth: 6 },
              ]}
              shadow="md"
            >
              <Row justify="space-between" align="center">
                <Row align="center" gap={Spacing.md} style={{ flex: 1 }}>
                  <Icon name={section.icon} size={28} color={section.color} />
                  <View>
                    <Text style={styles.sectionLabel}>{section.label}</Text>
                    <Text style={styles.sectionDesc}>{section.desc}</Text>
                  </View>
                </Row>
                <Text style={styles.arrow}>→</Text>
              </Row>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, paddingBottom: 24 },
  statsRow: { flexDirection: 'row', gap: Spacing.sm },
  sectionCard: { marginBottom: Spacing.sm, padding: Spacing.md },
  sectionEmoji: { fontSize: 28 },
  sectionLabel: {
    fontSize: Typography.lg,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  sectionDesc: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 1,
  },
  arrow: {
    fontSize: Typography.xl,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
  },
});

export default OperationsHomeScreen;
