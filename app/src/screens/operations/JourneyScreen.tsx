import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { journeyAPI } from '../../api';
import {
  Card,
  Row,
  Button,
  Input,
  EmptyState,
  LoadingSpinner,
  SectionHeader,
} from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';
import { format } from 'date-fns';

const JourneyScreen = () => {
  const qc = useQueryClient();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    clientName: '',
  });

  const { data: journey = [], isLoading } = useQuery({
    queryKey: ['journey'],
    queryFn: () => journeyAPI.getAll().then(r => r.data),
  });

  const addMutation = useMutation({
    mutationFn: (data: any) => journeyAPI.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['journey'] });
      setShowAdd(false);
      setForm({ title: '', description: '', date: '', clientName: '' });
    },
    onError: () => Alert.alert('Error', 'Failed to add entry'),
  });

  if (isLoading) return <LoadingSpinner />;
  const items = Array.isArray(journey) ? journey : [];

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <Row
          justify="space-between"
          align="center"
          style={{ marginBottom: Spacing.base }}
        >
          <SectionHeader title={`JOURNEY (${items.length})`} />
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => setShowAdd(true)}
          >
            <Text style={styles.addBtnText}>+ ADD</Text>
          </TouchableOpacity>
        </Row>
        <FlatList
          style={{ flex: 1 }}
          data={items}
          keyExtractor={(item, i) => String(item._id || i)}
          ListEmptyComponent={
            <EmptyState
              title="No Journey Entries"
              subtitle="Document your client journey milestones"
              action={{ label: '+ Add Entry', onPress: () => setShowAdd(true) }}
            />
          }
          renderItem={({ item, index }) => (
            <View style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View style={[styles.dot, index === 0 && styles.dotFirst]} />
                {index < items.length - 1 ? <View style={styles.line} /> : null}
              </View>
              <Card style={styles.card} shadow="sm">
                <Text style={styles.title}>{item.title}</Text>
                {item.clientName ? (
                  <Text style={styles.client}>{item.clientName}</Text>
                ) : null}
                {item.description ? (
                  <Text style={styles.desc}>{item.description}</Text>
                ) : null}
                {item.date || item.createdAt ? (
                  <Text style={styles.date}>
                    {format(
                      new Date(item.date || item.createdAt),
                      'dd MMM yyyy',
                    )}
                  </Text>
                ) : null}
              </Card>
            </View>
          )}
        />
      </View>
      <Modal
        visible={showAdd}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modal}>
          <Row
            justify="space-between"
            align="center"
            style={styles.modalHeader}
          >
            <Text style={styles.modalTitle}>ADD MILESTONE</Text>
            <TouchableOpacity onPress={() => setShowAdd(false)}>
              <Text style={styles.modalClose}>✕ CANCEL</Text>
            </TouchableOpacity>
          </Row>
          <View style={styles.modalContent}>
            <Input
              label="TITLE *"
              value={form.title}
              onChangeText={v => setForm(p => ({ ...p, title: v }))}
              placeholder="e.g. Project kickoff"
            />
            <Input
              label="CLIENT NAME"
              value={form.clientName}
              onChangeText={v => setForm(p => ({ ...p, clientName: v }))}
              placeholder="Client company"
            />
            <Input
              label="DESCRIPTION"
              value={form.description}
              onChangeText={v => setForm(p => ({ ...p, description: v }))}
              placeholder="Details..."
              multiline
            />
            <Input
              label="DATE (YYYY-MM-DD)"
              value={form.date}
              onChangeText={v => setForm(p => ({ ...p, date: v }))}
              placeholder="2025-01-15"
            />
            <Button
              label={addMutation.isPending ? 'ADDING...' : 'ADD MILESTONE'}
              onPress={() => {
                if (!form.title.trim()) {
                  Alert.alert('Error', 'Title required');
                  return;
                }
                addMutation.mutate({
                  ...form,
                  date: form.date || new Date().toISOString(),
                });
              }}
              loading={addMutation.isPending}
              fullWidth
              size="lg"
              style={{ marginTop: Spacing.base }}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.base, paddingBottom: 0 },
  addBtn: {
    backgroundColor: Colors.secondary,
    borderWidth: Border.widthBold,
    borderColor: Colors.black,
    paddingHorizontal: 14,
    paddingVertical: 6,
    ...Shadows.sm,
  },
  addBtnText: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 0.5,
  },
  timelineItem: { flexDirection: 'row', marginBottom: Spacing.sm },
  timelineLeft: { width: 32, alignItems: 'center' },
  dot: {
    width: 14,
    height: 14,
    backgroundColor: Colors.primary,
    borderWidth: Border.width,
    borderColor: Colors.border,
    borderRadius: 7,
    marginTop: 18,
  },
  dotFirst: { backgroundColor: Colors.secondary },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  card: { flex: 1, padding: Spacing.md },
  title: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  client: {
    fontSize: Typography.sm,
    color: Colors.primary,
    fontWeight: Typography.bold,
    marginTop: 2,
  },
  desc: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 4,
    lineHeight: 18,
  },
  date: {
    fontSize: Typography.xs,
    color: Colors.accent,
    fontWeight: Typography.bold,
    marginTop: 6,
    letterSpacing: 0.3,
  },
  modal: { flex: 1, backgroundColor: Colors.background },
  modalHeader: {
    padding: Spacing.base,
    borderBottomWidth: Border.widthBold,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: Typography['2xl'],
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: 1,
  },
  modalClose: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.destructive,
    letterSpacing: 0.5,
  },
  modalContent: { padding: Spacing.base },
});

export default JourneyScreen;
