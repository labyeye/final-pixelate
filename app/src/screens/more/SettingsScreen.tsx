import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsAPI } from '../../api';
import {
  Card,
  Row,
  Divider,
  LoadingSpinner,
  SectionHeader,
} from '../../components/common';
import { Colors, Typography, Spacing, Border } from '../../theme';

const SettingsScreen = () => {
  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: () => settingsAPI.get().then(r => r.data),
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.infoBanner}>
          <Text style={styles.infoBannerText}>⚙️ SYSTEM SETTINGS</Text>
          <Text style={styles.infoBannerSub}>
            Configure your CRM preferences
          </Text>
        </Card>

        <SectionHeader title="GENERAL" style={{ marginTop: Spacing.base }} />
        <Card style={styles.card}>
          {settings ? (
            Object.entries(settings)
              .filter(([k]) => !k.startsWith('_'))
              .slice(0, 10)
              .map(([key, value]) => (
                <Row key={key} justify="space-between" style={styles.field}>
                  <Text style={styles.fieldLabel}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Text>
                  <Text style={styles.fieldValue} numberOfLines={1}>
                    {typeof value === 'boolean'
                      ? value
                        ? 'Yes'
                        : 'No'
                      : String(value || '-')}
                  </Text>
                </Row>
              ))
          ) : (
            <Text style={styles.noSettings}>No settings configured</Text>
          )}
        </Card>

        <SectionHeader
          title="CLIENT PORTAL"
          style={{ marginTop: Spacing.base }}
        />
        <Card style={styles.card}>
          <Text style={styles.portalNote}>
            Configure which sections are visible to clients in their portal.
            Manage from the desktop dashboard for full control.
          </Text>
        </Card>

        <SectionHeader
          title="INTEGRATIONS"
          style={{ marginTop: Spacing.base }}
        />
        <Card style={styles.card}>
          <Row justify="space-between" style={styles.field}>
            <Text style={styles.fieldLabel}>WhatsApp Business API</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>ACTIVE</Text>
            </View>
          </Row>
          <Row justify="space-between" style={styles.field}>
            <Text style={styles.fieldLabel}>Meta / Social Media</Text>
            <View
              style={[styles.statusBadge, { backgroundColor: Colors.gray400 }]}
            >
              <Text style={styles.statusText}>CONFIGURE</Text>
            </View>
          </Row>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, paddingBottom: 24 },
  infoBanner: {
    padding: Spacing.md,
    borderLeftColor: Colors.primary,
    borderLeftWidth: 6,
  },
  infoBannerText: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: 0.5,
  },
  infoBannerSub: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 2,
  },
  card: { padding: Spacing.md, marginBottom: Spacing.sm },
  field: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  fieldLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.semiBold,
    color: Colors.foreground,
    textTransform: 'capitalize',
    flex: 1,
  },
  fieldValue: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.mutedForeground,
    flex: 1,
    textAlign: 'right',
  },
  noSettings: {
    fontSize: Typography.base,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    textAlign: 'center',
    padding: Spacing.base,
  },
  portalNote: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    lineHeight: 20,
  },
  statusBadge: {
    backgroundColor: Colors.success,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statusText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 0.5,
  },
});

export default SettingsScreen;
