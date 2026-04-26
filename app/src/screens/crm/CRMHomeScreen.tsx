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
import { leadsAPI, clientsAPI, enquiriesAPI, reviewsAPI } from '../../api';
import { Card, StatCard, SectionHeader, Row } from '../../components/common';
import { Colors, Typography, Spacing, Shadows, Border } from '../../theme';
import { CRMStackParams } from '../../navigation/types';
import Icon from 'react-native-vector-icons/FontAwesome';
type Nav = NativeStackNavigationProp<CRMStackParams>;

const SECTIONS = [
  {
    label: 'LEADS',
    icon: 'bar-chart',
    route: 'Leads',
    color: Colors.primary,
    desc: 'Track and manage leads',
  },
  {
    label: 'CLIENTS',
    icon: 'users',
    route: 'Clients',
    color: Colors.primary,
    desc: 'All your clients',
  },
  {
    label: 'ENQUIRIES',
    icon: 'envelope',
    route: 'Enquiries',
    color: Colors.primary,
    desc: 'Website enquiries',
  },
  {
    label: 'REVIEWS',
    icon: 'star',
    route: 'Reviews',
    color: Colors.primary,
    desc: 'Client reviews',
  },
];

const CRMHomeScreen = () => {
  const navigation = useNavigation<Nav>();
  const { data: leads = [] } = useQuery({
    queryKey: ['leads'],
    queryFn: () => leadsAPI.getAll().then(r => r.data),
  });
  const { data: clients = [] } = useQuery({
    queryKey: ['clients'],
    queryFn: () => clientsAPI.getAll().then(r => r.data),
  });
  const { data: enquiries = [] } = useQuery({
    queryKey: ['enquiries'],
    queryFn: () => enquiriesAPI.getAll().then(r => r.data),
  });
  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => reviewsAPI.getAll().then(r => r.data),
  });

  const counts: Record<string, number> = {
    Leads: Array.isArray(leads) ? leads.length : 0,
    Clients: Array.isArray(clients) ? clients.length : 0,
    Enquiries: Array.isArray(enquiries) ? enquiries.length : 0,
    Reviews: Array.isArray(reviews) ? reviews.length : 0,
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionHeader title="CRM OVERVIEW" />
        <View style={styles.statsRow}>
          <StatCard
            label="LEADS"
            value={counts.Leads}
            accent={Colors.primary}
          />
          <StatCard
            label="CLIENTS"
            value={counts.Clients}
            accent={Colors.secondary}
          />
        </View>
        <View style={[styles.statsRow, { marginTop: Spacing.sm }]}>
          <StatCard
            label="ENQUIRIES"
            value={counts.Enquiries}
            accent={Colors.secondary}
          />
          <StatCard
            label="REVIEWS"
            value={counts.Reviews}
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
                <View style={styles.sectionLeft}>
                  <Icon name={section.icon} size={28} color={section.color} />
                  <View>
                    <Text style={styles.sectionLabel}>{section.label}</Text>
                    <Text style={styles.sectionDesc}>{section.desc}</Text>
                  </View>
                </View>
                <View
                  style={[styles.countBadge, { backgroundColor: Colors.white }]}
                >
                  <Text style={styles.countText}>{counts[section.label]}</Text>
                </View>
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
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
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
  countBadge: {
    minWidth: 40,
    height: 40,
    borderWidth: Border.width,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  countText: {
    fontSize: Typography.lg,
    fontWeight: Typography.black,
    color: Colors.primary,
  },
});

export default CRMHomeScreen;
