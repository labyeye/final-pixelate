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
import { Card, Row, LoadingSpinner, EmptyState } from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';
import { projectsAPI } from '../../api';

const PROJECT_STATUSES = ['BACKLOG', 'IN PROGRESS', 'IN REVIEW', 'COMPLETED'];

const STATUS_COLORS: Record<string, string> = {
  BACKLOG: Colors.gray500,
  'IN PROGRESS': Colors.primary,
  'IN REVIEW': Colors.warning,
  COMPLETED: Colors.success,
};

const TimelineScreen = () => {
  const qc = useQueryClient();

  const { data: projects = [], isLoading, refetch, isFetching } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectsAPI.getAll().then(r => r.data),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      projectsAPI.update(id, { status }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
    onError: () => Alert.alert('Error', 'Failed to update project status'),
  });

  const arr = Array.isArray(projects) ? projects : [];

  const grouped = PROJECT_STATUSES.reduce((acc, status) => {
    acc[status] = arr.filter((p: any) => p.status === status);
    return acc;
  }, {} as Record<string, any[]>);

  const moveProject = (project: any, newStatus: string) => {
    const id = project._id || project.id;
    Alert.alert(
      'Move Project',
      `Move "${project.title}" to ${newStatus}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Move',
          onPress: () => updateMutation.mutate({ id, status: newStatus }),
        },
      ],
    );
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
      >
        <Text style={styles.subtitle}>
          Drag projects between stages by tapping Move.
        </Text>

        {PROJECT_STATUSES.map(status => {
          const statusProjects = grouped[status] || [];
          const color = STATUS_COLORS[status];
          return (
            <View key={status} style={styles.column}>
              <View style={[styles.columnHeader, { backgroundColor: color }]}>
                <Text style={styles.columnTitle}>{status}</Text>
                <View style={styles.countBadge}>
                  <Text style={styles.countBadgeText}>{statusProjects.length}</Text>
                </View>
              </View>

              {statusProjects.length === 0 ? (
                <View style={styles.emptyColumn}>
                  <Text style={styles.emptyColumnText}>No projects</Text>
                </View>
              ) : (
                statusProjects.map((project: any) => (
                  <Card key={String(project._id || project.id)} style={styles.projectCard} shadow="sm">
                    {project.client ? (
                      <View style={styles.clientTag}>
                        <Text style={styles.clientTagText}>{project.client}</Text>
                      </View>
                    ) : null}
                    <Text style={styles.projectTitle}>{project.title}</Text>
                    {project.description ? (
                      <Text style={styles.projectDesc} numberOfLines={2}>
                        {project.description}
                      </Text>
                    ) : null}
                    {project.dueDate ? (
                      <Text style={styles.dueDate}>
                        Due: {new Date(project.dueDate).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </Text>
                    ) : null}
                    {typeof project.progress === 'number' && (
                      <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                          <View
                            style={[styles.progressFill, { width: `${project.progress}%` as any }]}
                          />
                        </View>
                        <Text style={styles.progressText}>{project.progress}%</Text>
                      </View>
                    )}
                    <Row gap={6} style={{ marginTop: Spacing.sm, flexWrap: 'wrap' }}>
                      {PROJECT_STATUSES.filter(s => s !== status).map(s => (
                        <TouchableOpacity
                          key={s}
                          style={[styles.moveBtn, { borderColor: STATUS_COLORS[s] }]}
                          onPress={() => moveProject(project, s)}
                        >
                          <Text style={[styles.moveBtnText, { color: STATUS_COLORS[s] }]}>
                            {s === 'BACKLOG'
                              ? 'BACKLOG'
                              : s === 'IN PROGRESS'
                              ? 'IN PROG'
                              : s === 'IN REVIEW'
                              ? 'REVIEW'
                              : 'DONE'}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </Row>
                  </Card>
                ))
              )}
            </View>
          );
        })}
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.base },
  subtitle: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginBottom: Spacing.base,
  },
  column: {
    marginBottom: Spacing.lg,
    borderWidth: Border.width,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  columnHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  columnTitle: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 0.5,
  },
  countBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 99,
  },
  countBadgeText: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.white,
  },
  emptyColumn: {
    padding: Spacing.lg,
    alignItems: 'center',
    backgroundColor: Colors.gray100,
  },
  emptyColumnText: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
  },
  projectCard: {
    margin: Spacing.sm,
    padding: Spacing.md,
    borderWidth: Border.width,
    borderColor: Colors.border,
  },
  clientTag: {
    alignSelf: 'flex-start',
    borderWidth: Border.width,
    borderColor: Colors.border,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 6,
  },
  clientTagText: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    color: Colors.mutedForeground,
    letterSpacing: 0.3,
  },
  projectTitle: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: -0.2,
  },
  projectDesc: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    lineHeight: 18,
    marginTop: 4,
  },
  dueDate: {
    fontSize: Typography.xs,
    color: Colors.accent,
    fontWeight: Typography.bold,
    marginTop: 6,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.gray200,
    borderWidth: Border.width,
    borderColor: Colors.border,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  progressText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.foreground,
    minWidth: 32,
    textAlign: 'right',
  },
  moveBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: Border.width,
  },
  moveBtnText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    letterSpacing: 0.3,
  },
});

export default TimelineScreen;
