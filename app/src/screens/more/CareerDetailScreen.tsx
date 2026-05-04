import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { careersAPI } from '../../api';
import {
  Card,
  StatusBadge,
  Divider,
  LoadingSpinner,
  SectionHeader,
} from '../../components/common';
import { Colors, Typography, Spacing } from '../../theme';
import { MoreStackParams } from '../../navigation/types';

type Route = RouteProp<MoreStackParams, 'CareerDetail'>;

const CareerDetailScreen = () => {
  const { params } = useRoute<Route>();
  const { data: job, isLoading } = useQuery({
    queryKey: ['career', params.id],
    queryFn: () => careersAPI.getById(params.id).then(r => r.data),
  });
  const { data: applications = [] } = useQuery({
    queryKey: ['career-apps', params.id],
    queryFn: () => careersAPI.getApplications(params.id).then(r => r.data),
  });

  if (isLoading) return <LoadingSpinner />;
  if (!job)
    return (
      <View style={styles.center}>
        <Text>Not found</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card
          style={[
            styles.heroCard,
            { borderLeftColor: Colors.secondary, borderLeftWidth: 6 },
          ]}
          shadow="lg"
        >
          <StatusBadge status={job.status || 'active'} />
          <Text style={styles.title}>{job.title}</Text>
          {job.department ? (
            <Text style={styles.dept}>{job.department}</Text>
          ) : null}
          {job.location ? (
            <Text style={styles.location}>📍 {job.location}</Text>
          ) : null}
          {job.type ? <Text style={styles.type}>{job.type}</Text> : null}
          {job.salary ? (
            <Text style={styles.salary}>💰 {job.salary}</Text>
          ) : null}
        </Card>
        {job.description ? (
          <Card style={styles.card}>
            <Text style={styles.sectionTitle}>JOB DESCRIPTION</Text>
            <Divider style={{ marginVertical: Spacing.sm }} />
            <Text style={styles.desc}>{job.description}</Text>
          </Card>
        ) : null}
        {job.requirements ? (
          <Card style={styles.card}>
            <Text style={styles.sectionTitle}>REQUIREMENTS</Text>
            <Divider style={{ marginVertical: Spacing.sm }} />
            <Text style={styles.desc}>{job.requirements}</Text>
          </Card>
        ) : null}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>
            APPLICATIONS (
            {Array.isArray(applications) ? applications.length : 0})
          </Text>
          <Divider style={{ marginVertical: Spacing.sm }} />
          {Array.isArray(applications) && applications.length > 0 ? (
            applications.map((app: any, i: number) => (
              <View key={i} style={styles.appItem}>
                <Text style={styles.appName}>
                  {app.name || app.applicantName}
                </Text>
                {app.email ? (
                  <Text style={styles.appEmail}>{app.email}</Text>
                ) : null}
                <StatusBadge status={app.status || 'applied'} />
              </View>
            ))
          ) : (
            <Text style={styles.noApps}>No applications yet</Text>
          )}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { padding: Spacing.base, paddingBottom: 24 },
  heroCard: { padding: Spacing.lg, marginBottom: Spacing.sm },
  title: {
    fontSize: Typography['2xl'],
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: -0.5,
    marginTop: Spacing.sm,
  },
  dept: {
    fontSize: Typography.base,
    color: Colors.primary,
    fontWeight: Typography.bold,
    marginTop: 4,
  },
  location: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 2,
  },
  type: {
    fontSize: Typography.sm,
    color: Colors.accent,
    fontWeight: Typography.bold,
    marginTop: 2,
  },
  salary: {
    fontSize: Typography.sm,
    color: Colors.success,
    fontWeight: Typography.bold,
    marginTop: 2,
  },
  card: { padding: Spacing.md, marginBottom: Spacing.sm },
  sectionTitle: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 1.5,
  },
  desc: {
    fontSize: Typography.sm,
    color: Colors.foreground,
    fontWeight: Typography.medium,
    lineHeight: 22,
  },
  appItem: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
    gap: 2,
  },
  appName: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  appEmail: {
    fontSize: Typography.sm,
    color: Colors.primary,
    fontWeight: Typography.bold,
  },
  noApps: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
  },
});

export default CareerDetailScreen;
