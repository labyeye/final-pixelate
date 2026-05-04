import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { clientsAPI } from '../../api';
import { Card, Row, Divider, LoadingSpinner } from '../../components/common';
import { Colors, Typography, Spacing, Border } from '../../theme';
import { CRMStackParams } from '../../navigation/types';

type Route = RouteProp<CRMStackParams, 'ClientDetail'>;

const Field = ({ label, value }: { label: string; value?: string }) =>
  value ? (
    <Row justify="space-between" style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </Row>
  ) : null;

const ClientDetailScreen = () => {
  const { params } = useRoute<Route>();
  const { data: client, isLoading } = useQuery({
    queryKey: ['client', params.id],
    queryFn: () => clientsAPI.getById(params.id).then(r => r.data),
  });

  if (isLoading) return <LoadingSpinner />;
  if (!client)
    return (
      <View style={styles.center}>
        <Text>Client not found</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.heroCard} shadow="lg">
          <View style={styles.avatarBlock}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {(client.name || 'C').charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
          <Text style={styles.heroName}>{client.name}</Text>
          {client.email ? (
            <Text style={styles.heroEmail}>{client.email}</Text>
          ) : null}
          {client.phone ? (
            <Text style={styles.heroPhone}>{client.phone}</Text>
          ) : null}
        </Card>

        <Card style={styles.detailCard}>
          <Text style={styles.sectionTitle}>CONTACT DETAILS</Text>
          <Divider style={{ marginVertical: Spacing.sm }} />
          <Field label="City" value={client.city} />
          <Field label="State" value={client.state} />
          <Field label="PIN" value={client.pin} />
          <Field label="Address" value={client.address} />
        </Card>

        {client.hasGst && (
          <Card style={styles.detailCard}>
            <Text style={styles.sectionTitle}>GST INFORMATION</Text>
            <Divider style={{ marginVertical: Spacing.sm }} />
            <Field label="Company" value={client.gstCompanyName} />
            <Field label="GST No." value={client.gstNumber} />
            <Field label="GST Address" value={client.gstAddress} />
          </Card>
        )}

        {client.loginEmail && (
          <Card style={styles.detailCard}>
            <Text style={styles.sectionTitle}>PORTAL ACCESS</Text>
            <Divider style={{ marginVertical: Spacing.sm }} />
            <Field label="Login Email" value={client.loginEmail} />
            <Row>
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>PORTAL ACTIVE</Text>
              </View>
            </Row>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { padding: Spacing.base, paddingBottom: 24 },
  heroCard: {
    padding: Spacing.xl,
    marginBottom: Spacing.sm,
    alignItems: 'center',
  },
  avatarBlock: { marginBottom: Spacing.md },
  avatar: {
    width: 72,
    height: 72,
    backgroundColor: Colors.primary,
    borderWidth: Border.widthBold,
    borderColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: Typography['4xl'],
    fontWeight: Typography.black,
    color: Colors.white,
  },
  heroName: {
    fontSize: Typography['2xl'],
    fontWeight: Typography.black,
    color: Colors.foreground,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  heroEmail: {
    fontSize: Typography.base,
    color: Colors.primary,
    fontWeight: Typography.bold,
    marginTop: 4,
    textAlign: 'center',
  },
  heroPhone: {
    fontSize: Typography.base,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 2,
    textAlign: 'center',
  },
  detailCard: { padding: Spacing.md, marginBottom: Spacing.sm },
  sectionTitle: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 1.5,
  },
  field: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  fieldLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.semiBold,
    color: Colors.mutedForeground,
  },
  fieldValue: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.foreground,
    flex: 1,
    textAlign: 'right',
  },
  activeBadge: {
    backgroundColor: Colors.success,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: Border.width,
    borderColor: Colors.border,
    marginTop: Spacing.sm,
  },
  activeBadgeText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 0.5,
  },
});

export default ClientDetailScreen;
