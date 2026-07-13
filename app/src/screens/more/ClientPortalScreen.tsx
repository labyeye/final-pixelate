import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, Row, LoadingSpinner, EmptyState, Divider } from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';
import { projectsAPI, invoicesAPI, quotationsAPI, onboardingAPI, supportAPI } from '../../api';
import apiClient from '../../api/client';
import { useAuth } from '../../context/AuthContext';

const ClientPortalScreen = () => {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [processingPostId, setProcessingPostId] = useState<string | null>(null);

  const clientId = (user as any)?.clientId;

  const { data: allProjects = [], isLoading: loadingProjects, refetch: refetchProjects } = useQuery({
    queryKey: ['client-portal-projects'],
    queryFn: () => projectsAPI.getAll().then(r => r.data),
    enabled: !!user,
  });

  const { data: allInvoices = [], isLoading: loadingInvoices, refetch: refetchInvoices } = useQuery({
    queryKey: ['client-portal-invoices'],
    queryFn: () => invoicesAPI.getAll().then(r => r.data),
    enabled: !!user,
  });

  const { data: allSocialPosts = [], isLoading: loadingSocial, refetch: refetchSocial } = useQuery({
    queryKey: ['client-portal-social'],
    queryFn: () =>
      apiClient
        .get(`/social-media-posts?clientId=${clientId}`)
        .then(r => r.data),
    enabled: !!clientId,
  });

  const { data: allQuotations = [], isLoading: loadingQuotations, refetch: refetchQuotations } = useQuery({
    queryKey: ['client-portal-quotations'],
    queryFn: () => quotationsAPI.getAll().then(r => r.data),
    enabled: !!user,
  });

  const { data: allOnboarding = [], isLoading: loadingOnboarding, refetch: refetchOnboarding } = useQuery({
    queryKey: ['client-portal-onboarding'],
    queryFn: () => onboardingAPI.getAll().then(r => r.data),
    enabled: !!user,
  });

  const { data: allSupportTickets = [], isLoading: loadingSupport, refetch: refetchSupport } = useQuery({
    queryKey: ['client-portal-support'],
    queryFn: () => supportAPI.getAll().then(r => r.data),
    enabled: !!user,
  });

  const approvalMutation = useMutation({
    mutationFn: ({ postId, status }: { postId: string; status: string }) =>
      apiClient.put('/social-media-posts', { id: postId, approvalStatus: status }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['client-portal-social'] });
      setProcessingPostId(null);
    },
    onError: () => {
      setProcessingPostId(null);
      Alert.alert('Error', 'Failed to update approval status');
    },
  });

  const projects = Array.isArray(allProjects)
    ? allProjects.filter((p: any) => clientId && String(p.clientId) === String(clientId))
    : [];

  const invoices = Array.isArray(allInvoices)
    ? allInvoices.filter((i: any) => clientId && String(i.clientId) === String(clientId))
    : [];

  const socialPosts = Array.isArray(allSocialPosts) ? allSocialPosts : [];
  const pendingPosts = socialPosts.filter(
    (p: any) => p.approvalStatus === 'Pending' || !p.approvalStatus,
  );

  const quotations = Array.isArray(allQuotations)
    ? allQuotations.filter((q: any) => clientId && String(q.clientId) === String(clientId))
    : [];

  const onboardingItems = Array.isArray(allOnboarding)
    ? allOnboarding.filter((o: any) => clientId && String(o.clientId) === String(clientId))
    : [];

  const supportTickets = Array.isArray(allSupportTickets)
    ? allSupportTickets.filter((t: any) => clientId && String(t.clientId) === String(clientId))
    : [];

  const isLoading =
    loadingProjects ||
    loadingInvoices ||
    loadingSocial ||
    loadingQuotations ||
    loadingOnboarding ||
    loadingSupport;

  const handleRefresh = () => {
    refetchProjects();
    refetchInvoices();
    refetchSocial();
    refetchQuotations();
    refetchOnboarding();
    refetchSupport();
  };

  if (!user) return <LoadingSpinner />;

  if ((user as any).role !== 'client') {
    return (
      <SafeAreaView style={styles.safe} edges={['bottom']}>
        <View style={styles.accessDenied}>
          <Text style={styles.accessDeniedTitle}>ACCESS DENIED</Text>
          <Text style={styles.accessDeniedText}>
            This portal is only accessible to client users.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />}
      >
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            Welcome, {(user as any).name?.split(' ')[0] || 'Client'}!
          </Text>
          <Text style={styles.welcomeSub}>
            Here is an overview of your projects and invoices.
          </Text>
        </View>

        <Row gap={8} style={{ marginBottom: Spacing.lg }}>
          {[
            { label: 'Projects', value: projects.length, color: Colors.primary },
            { label: 'Invoices', value: invoices.length, color: Colors.secondary },
            { label: 'To Approve', value: pendingPosts.length, color: Colors.warning },
          ].map(s => (
            <View key={s.label} style={[styles.statCard, { borderTopColor: s.color, borderTopWidth: 3 }]}>
              <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label.toUpperCase()}</Text>
            </View>
          ))}
        </Row>

        {pendingPosts.length > 0 && (
          <View style={styles.section}>
            <Row justify="space-between" align="center" style={{ marginBottom: Spacing.sm }}>
              <Text style={styles.sectionTitle}>SOCIAL MEDIA APPROVAL</Text>
              <View style={styles.alertBadge}>
                <Text style={styles.alertBadgeText}>ACTION REQUIRED</Text>
              </View>
            </Row>
            {pendingPosts.map((post: any) => (
              <Card key={String(post._id || post.id)} style={styles.postCard} shadow="sm">
                <Row justify="space-between" align="flex-start">
                  <View style={{ flex: 1, paddingRight: 8 }}>
                    <Text style={styles.postTitle}>{post.title}</Text>
                    <Text style={styles.postMeta}>
                      {post.platform} — {post.contentType}
                    </Text>
                    {post.scheduledDate ? (
                      <Text style={styles.postScheduled}>
                        Scheduled: {post.scheduledDate} {post.scheduledTime || ''}
                      </Text>
                    ) : null}
                    {post.caption ? (
                      <Text style={styles.postCaption} numberOfLines={3}>
                        "{post.caption}"
                      </Text>
                    ) : null}
                  </View>
                </Row>
                <Row gap={8} style={{ marginTop: Spacing.sm }}>
                  <TouchableOpacity
                    style={[styles.approveBtn]}
                    disabled={processingPostId === String(post._id || post.id)}
                    onPress={() => {
                      const id = String(post._id || post.id);
                      setProcessingPostId(id);
                      approvalMutation.mutate({ postId: id, status: 'Approved' });
                    }}
                  >
                    <Text style={styles.approveBtnText}>APPROVE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.rejectBtn]}
                    disabled={processingPostId === String(post._id || post.id)}
                    onPress={() => {
                      const id = String(post._id || post.id);
                      setProcessingPostId(id);
                      approvalMutation.mutate({ postId: id, status: 'Rejected' });
                    }}
                  >
                    <Text style={styles.rejectBtnText}>REJECT</Text>
                  </TouchableOpacity>
                </Row>
              </Card>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROJECTS</Text>
          {projects.length === 0 ? (
            <Card style={{ padding: Spacing.lg, alignItems: 'center' }}>
              <Text style={styles.emptyText}>No projects yet.</Text>
            </Card>
          ) : (
            projects.map((p: any) => (
              <Card key={String(p._id || p.id)} style={styles.projectCard} shadow="sm">
                <Row justify="space-between" align="center">
                  <View style={{ flex: 1 }}>
                    <Text style={styles.projectTitle}>{p.title}</Text>
                    {p.deliveryDate ? (
                      <Text style={styles.projectMeta}>
                        Delivery: {new Date(p.deliveryDate).toLocaleDateString('en-IN')}
                      </Text>
                    ) : null}
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    {typeof p.progress === 'number' && (
                      <Text style={styles.progressText}>{p.progress}%</Text>
                    )}
                    {p.amount != null && (
                      <Text style={styles.amountText}>
                        Rs.{Number(p.amount).toLocaleString('en-IN')}
                      </Text>
                    )}
                  </View>
                </Row>
                {typeof p.progress === 'number' && (
                  <View style={styles.progressBarOuter}>
                    <View
                      style={[styles.progressBarInner, { width: `${p.progress}%` as any }]}
                    />
                  </View>
                )}
              </Card>
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>INVOICES</Text>
          {invoices.length === 0 ? (
            <Card style={{ padding: Spacing.lg, alignItems: 'center' }}>
              <Text style={styles.emptyText}>No invoices yet.</Text>
            </Card>
          ) : (
            invoices.map((inv: any) => {
              const invId = String(inv._id || inv.id);
              const statusColor =
                inv.status === 'paid'
                  ? Colors.success
                  : inv.status === 'overdue'
                  ? Colors.destructive
                  : Colors.warning;
              return (
                <Card key={invId} style={styles.invoiceCard} shadow="sm">
                  <Row justify="space-between" align="flex-start">
                    <View style={{ flex: 1 }}>
                      <Text style={styles.invoiceTitle}>
                        {inv.title || inv.invoiceNo || 'Invoice'}
                      </Text>
                      {inv.invoiceNo && inv.title && (
                        <Text style={styles.invoiceMeta}>{inv.invoiceNo}</Text>
                      )}
                      {inv.dueDate ? (
                        <Text style={styles.invoiceMeta}>
                          Due: {new Date(inv.dueDate).toLocaleDateString('en-IN')}
                        </Text>
                      ) : null}
                    </View>
                    <View style={{ alignItems: 'flex-end', gap: 4 }}>
                      {inv.amount != null && (
                        <Text style={styles.invoiceAmount}>
                          Rs.{Number(inv.amount).toLocaleString('en-IN')}
                        </Text>
                      )}
                      {inv.status && (
                        <View style={[styles.invoiceStatusBadge, { backgroundColor: statusColor }]}>
                          <Text style={styles.invoiceStatusText}>
                            {inv.status.toUpperCase()}
                          </Text>
                        </View>
                      )}
                    </View>
                  </Row>
                </Card>
              );
            })
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>QUOTATIONS</Text>
          {quotations.length === 0 ? (
            <Card style={{ padding: Spacing.lg, alignItems: 'center' }}>
              <Text style={styles.emptyText}>No quotations yet.</Text>
            </Card>
          ) : (
            quotations.map((q: any) => (
              <Card key={String(q._id || q.id)} style={styles.projectCard} shadow="sm">
                <Row justify="space-between" align="center">
                  <View style={{ flex: 1 }}>
                    <Text style={styles.projectTitle}>
                      {q.title || q.quotationNo || 'Quotation'}
                    </Text>
                    {q.status ? (
                      <Text style={styles.projectMeta}>{q.status}</Text>
                    ) : null}
                  </View>
                  {q.amount != null && (
                    <Text style={styles.amountText}>
                      Rs.{Number(q.amount).toLocaleString('en-IN')}
                    </Text>
                  )}
                </Row>
              </Card>
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ONBOARDING</Text>
          {onboardingItems.length === 0 ? (
            <Card style={{ padding: Spacing.lg, alignItems: 'center' }}>
              <Text style={styles.emptyText}>No onboarding activity yet.</Text>
            </Card>
          ) : (
            onboardingItems.map((o: any) => (
              <Card key={String(o._id || o.id)} style={styles.projectCard} shadow="sm">
                <Text style={styles.projectTitle}>{o.title || 'Onboarding'}</Text>
                {o.status ? (
                  <Text style={styles.projectMeta}>{o.status}</Text>
                ) : null}
              </Card>
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUPPORT TICKETS</Text>
          {supportTickets.length === 0 ? (
            <Card style={{ padding: Spacing.lg, alignItems: 'center' }}>
              <Text style={styles.emptyText}>No support tickets yet.</Text>
            </Card>
          ) : (
            supportTickets.map((t: any) => (
              <Card key={String(t._id || t.id)} style={styles.projectCard} shadow="sm">
                <Row justify="space-between" align="center">
                  <View style={{ flex: 1 }}>
                    <Text style={styles.projectTitle}>{t.subject || 'Ticket'}</Text>
                  </View>
                  {t.status && (
                    <View
                      style={[
                        styles.invoiceStatusBadge,
                        {
                          backgroundColor:
                            t.status === 'resolved' || t.status === 'closed'
                              ? Colors.success
                              : Colors.warning,
                        },
                      ]}
                    >
                      <Text style={styles.invoiceStatusText}>
                        {String(t.status).toUpperCase()}
                      </Text>
                    </View>
                  )}
                </Row>
              </Card>
            ))
          )}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base },
  welcomeSection: { marginBottom: Spacing.lg },
  welcomeText: {
    fontSize: Typography['3xl'],
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: -0.5,
  },
  welcomeSub: {
    fontSize: Typography.base,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 4,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: Border.width,
    borderColor: Colors.border,
    padding: Spacing.sm,
    alignItems: 'center',
    ...Shadows.sm,
  },
  statValue: {
    fontSize: Typography['2xl'],
    fontWeight: Typography.black,
  },
  statLabel: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    color: Colors.mutedForeground,
    letterSpacing: 0.5,
    marginTop: 2,
  },
  section: { marginBottom: Spacing.xl },
  sectionTitle: {
    fontSize: Typography.lg,
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
  },
  alertBadge: {
    backgroundColor: Colors.warning,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  alertBadgeText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 0.5,
  },
  postCard: { marginBottom: Spacing.sm, padding: Spacing.md },
  postTitle: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  postMeta: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.bold,
    marginTop: 2,
  },
  postScheduled: {
    fontSize: Typography.xs,
    color: Colors.accent,
    fontWeight: Typography.bold,
    marginTop: 2,
  },
  postCaption: {
    fontSize: Typography.sm,
    color: Colors.foreground,
    fontStyle: 'italic',
    lineHeight: 18,
    marginTop: 6,
  },
  approveBtn: {
    flex: 1,
    backgroundColor: Colors.success,
    borderWidth: Border.widthBold,
    borderColor: Colors.border,
    paddingVertical: 8,
    alignItems: 'center',
  },
  approveBtnText: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 0.5,
  },
  rejectBtn: {
    flex: 1,
    backgroundColor: Colors.destructive,
    borderWidth: Border.widthBold,
    borderColor: Colors.border,
    paddingVertical: 8,
    alignItems: 'center',
  },
  rejectBtnText: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 0.5,
  },
  projectCard: { marginBottom: Spacing.sm, padding: Spacing.md },
  projectTitle: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  projectMeta: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 2,
  },
  progressText: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.primary,
  },
  amountText: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.foreground,
    marginTop: 2,
  },
  progressBarOuter: {
    height: 6,
    backgroundColor: Colors.gray200,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 8,
  },
  progressBarInner: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  invoiceCard: { marginBottom: Spacing.sm, padding: Spacing.md },
  invoiceTitle: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  invoiceMeta: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 2,
  },
  invoiceAmount: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  invoiceStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  invoiceStatusText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 0.5,
  },
  emptyText: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
  },
  accessDenied: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  accessDeniedTitle: {
    fontSize: Typography['2xl'],
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },
  accessDeniedText: {
    fontSize: Typography.base,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    textAlign: 'center',
  },
});

export default ClientPortalScreen;
