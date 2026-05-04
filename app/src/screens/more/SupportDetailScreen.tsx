import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supportAPI } from '../../api';
import {
  Card,
  Row,
  StatusBadge,
  Button,
  Divider,
  LoadingSpinner,
} from '../../components/common';
import { Colors, Typography, Spacing, Border } from '../../theme';
import { MoreStackParams } from '../../navigation/types';
import { format } from 'date-fns';

type Route = RouteProp<MoreStackParams, 'SupportDetail'>;

const SupportDetailScreen = () => {
  const { params } = useRoute<Route>();
  const qc = useQueryClient();

  const { data: ticket, isLoading } = useQuery({
    queryKey: ['ticket', params.id],
    queryFn: () => supportAPI.getById(params.id).then(r => r.data),
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => supportAPI.update(params.id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['support-tickets'] });
      qc.invalidateQueries({ queryKey: ['ticket', params.id] });
    },
    onError: () => Alert.alert('Error', 'Update failed'),
  });

  if (isLoading) return <LoadingSpinner />;
  if (!ticket)
    return (
      <View style={styles.center}>
        <Text>Ticket not found</Text>
      </View>
    );

  const priorityColor = (p: string) =>
    ({
      urgent: Colors.destructive,
      high: Colors.secondary,
      medium: Colors.warning,
      low: Colors.success,
    })[p] || Colors.muted;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card
          style={[
            styles.heroCard,
            {
              borderLeftColor: priorityColor(ticket.priority),
              borderLeftWidth: 6,
            },
          ]}
          shadow="lg"
        >
          <Row justify="space-between" align="flex-start">
            <View style={styles.heroLeft}>
              <Text style={styles.subject}>{ticket.subject}</Text>
              {ticket.clientName ? (
                <Text style={styles.clientName}>{ticket.clientName}</Text>
              ) : null}
              {ticket.createdAt ? (
                <Text style={styles.date}>
                  {format(new Date(ticket.createdAt), 'dd MMM yyyy, HH:mm')}
                </Text>
              ) : null}
            </View>
            <StatusBadge status={ticket.status || 'open'} />
          </Row>
          <View
            style={[
              styles.priorityBadge,
              { backgroundColor: priorityColor(ticket.priority) },
            ]}
          >
            <Text style={styles.priorityText}>
              {(ticket.priority || 'medium').toUpperCase()} PRIORITY
            </Text>
          </View>
        </Card>

        {ticket.description ? (
          <Card style={styles.card}>
            <Text style={styles.sectionTitle}>DESCRIPTION</Text>
            <Divider style={{ marginVertical: Spacing.sm }} />
            <Text style={styles.description}>{ticket.description}</Text>
          </Card>
        ) : null}

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>UPDATE STATUS</Text>
          <Divider style={{ marginVertical: Spacing.sm }} />
          <View style={styles.statusGrid}>
            {['open', 'in progress', 'resolved', 'closed'].map(s => (
              <TouchableOpacity
                key={s}
                style={[
                  styles.statusChip,
                  ticket.status === s && styles.statusChipActive,
                ]}
                onPress={() => updateMutation.mutate({ status: s })}
              >
                <Text
                  style={[
                    styles.statusChipText,
                    ticket.status === s && styles.statusChipTextActive,
                  ]}
                >
                  {s.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
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
  heroLeft: { flex: 1 },
  subject: {
    fontSize: Typography.xl,
    fontWeight: Typography.black,
    color: Colors.foreground,
    lineHeight: 28,
  },
  clientName: {
    fontSize: Typography.base,
    color: Colors.primary,
    fontWeight: Typography.bold,
    marginTop: 4,
  },
  date: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 4,
  },
  priorityBadge: {
    alignSelf: 'flex-start',
    marginTop: Spacing.sm,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: Border.width,
    borderColor: Colors.border,
  },
  priorityText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 0.5,
  },
  card: { padding: Spacing.md, marginBottom: Spacing.sm },
  sectionTitle: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 1.5,
  },
  description: {
    fontSize: Typography.base,
    color: Colors.foreground,
    fontWeight: Typography.medium,
    lineHeight: 22,
  },
  statusGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  statusChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: Border.width,
    borderColor: Colors.border,
  },
  statusChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  statusChipText: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: 0.3,
  },
  statusChipTextActive: { color: Colors.white },
});

export default SupportDetailScreen;
