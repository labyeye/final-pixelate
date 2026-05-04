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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { socialMediaAPI } from '../../api';
import {
  Card,
  Row,
  StatusBadge,
  SearchBar,
  Button,
  Input,
  EmptyState,
  LoadingSpinner,
} from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';
import { MoreStackParams } from '../../navigation/types';
import { format } from 'date-fns';

type Nav = NativeStackNavigationProp<MoreStackParams>;
const PLATFORMS = [
  'Instagram',
  'Facebook',
  'LinkedIn',
  'YouTube',
  'Google My Business',
];

const SocialMediaPlannerScreen = () => {
  const navigation = useNavigation<Nav>();
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    caption: '',
    platform: 'Instagram',
    scheduledDate: '',
    status: 'scheduled',
    clientName: '',
  });

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['social-posts'],
    queryFn: () => socialMediaAPI.getPosts().then(r => r.data),
  });

  const addMutation = useMutation({
    mutationFn: (data: any) => socialMediaAPI.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['social-posts'] });
      setShowAdd(false);
      setForm({
        caption: '',
        platform: 'Instagram',
        scheduledDate: '',
        status: 'scheduled',
        clientName: '',
      });
    },
    onError: () => Alert.alert('Error', 'Failed to add post'),
  });

  if (isLoading) return <LoadingSpinner />;

  const filtered = Array.isArray(posts)
    ? posts.filter(
        (p: any) =>
          !search ||
          p.caption?.toLowerCase().includes(search.toLowerCase()) ||
          p.clientName?.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  const platformEmoji: Record<string, string> = {
    Instagram: '📸',
    Facebook: '👍',
    LinkedIn: '💼',
    YouTube: '▶️',
    'Google My Business': '📍',
  };
  const platformColor: Record<string, string> = {
    Instagram: '#E1306C',
    Facebook: '#1877F2',
    LinkedIn: '#0A66C2',
    YouTube: '#FF0000',
    'Google My Business': '#4285F4',
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <Row
          justify="space-between"
          align="center"
          style={{ marginBottom: Spacing.sm }}
        >
          <TouchableOpacity
            style={styles.calBtn}
            onPress={() => navigation.navigate('SocialMediaCalendar')}
          >
            <Text style={styles.calBtnText}>🗓️ CALENDAR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => setShowAdd(true)}
          >
            <Text style={styles.addBtnText}>+ ADD POST</Text>
          </TouchableOpacity>
        </Row>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search posts..."
        />
        <Text style={styles.count}>{filtered.length} POSTS</Text>
        <FlatList
          data={filtered}
          keyExtractor={(item, i) => String(item._id || i)}
          ListEmptyComponent={
            <EmptyState
              title="No Posts"
              subtitle="Plan your social media content"
              action={{ label: '+ Add Post', onPress: () => setShowAdd(true) }}
            />
          }
          renderItem={({ item }) => (
            <Card style={styles.card} shadow="sm">
              <Row justify="space-between" align="flex-start">
                <View style={styles.left}>
                  <Row align="center" gap={8} style={{ marginBottom: 6 }}>
                    <Text>{platformEmoji[item.platform] || '📱'}</Text>
                    <View
                      style={[
                        styles.platformBadge,
                        {
                          backgroundColor:
                            platformColor[item.platform] || Colors.accent,
                        },
                      ]}
                    >
                      <Text style={styles.platformText}>{item.platform}</Text>
                    </View>
                    {item.clientName ? (
                      <Text style={styles.clientName}>{item.clientName}</Text>
                    ) : null}
                  </Row>
                  <Text style={styles.caption} numberOfLines={3}>
                    {item.caption}
                  </Text>
                  {item.scheduledDate ? (
                    <Text style={styles.scheduledDate}>
                      📅{' '}
                      {format(
                        new Date(item.scheduledDate),
                        'dd MMM yyyy, HH:mm',
                      )}
                    </Text>
                  ) : null}
                </View>
                <StatusBadge status={item.status || 'scheduled'} />
              </Row>
            </Card>
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
            <Text style={styles.modalTitle}>ADD POST</Text>
            <TouchableOpacity onPress={() => setShowAdd(false)}>
              <Text style={styles.modalClose}>✕ CANCEL</Text>
            </TouchableOpacity>
          </Row>
          <View style={styles.modalContent}>
            <Input
              label="CAPTION *"
              value={form.caption}
              onChangeText={v => setForm(p => ({ ...p, caption: v }))}
              placeholder="Write your post caption..."
              multiline
            />
            <Input
              label="CLIENT NAME"
              value={form.clientName}
              onChangeText={v => setForm(p => ({ ...p, clientName: v }))}
              placeholder="Client company"
            />
            <Input
              label="SCHEDULED DATE (YYYY-MM-DD)"
              value={form.scheduledDate}
              onChangeText={v => setForm(p => ({ ...p, scheduledDate: v }))}
              placeholder="2025-03-15"
            />
            <Text style={styles.pickLabel}>PLATFORM</Text>
            <View style={styles.platformPicker}>
              {PLATFORMS.map(p => (
                <TouchableOpacity
                  key={p}
                  style={[
                    styles.platChip,
                    form.platform === p && {
                      backgroundColor: platformColor[p] || Colors.accent,
                      borderColor: platformColor[p] || Colors.accent,
                    },
                  ]}
                  onPress={() => setForm(prev => ({ ...prev, platform: p }))}
                >
                  <Text
                    style={[
                      styles.platChipText,
                      form.platform === p && styles.platChipTextActive,
                    ]}
                  >
                    {platformEmoji[p]} {p}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Button
              label={addMutation.isPending ? 'ADDING...' : 'ADD POST'}
              onPress={() => {
                if (!form.caption.trim()) {
                  Alert.alert('Error', 'Caption required');
                  return;
                }
                addMutation.mutate(form);
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
  calBtn: {
    borderWidth: Border.widthBold,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  calBtnText: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: 0.3,
  },
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
  count: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
  },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  left: { flex: 1 },
  platformBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  platformText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 0.3,
  },
  clientName: {
    fontSize: Typography.xs,
    color: Colors.mutedForeground,
    fontWeight: Typography.bold,
  },
  caption: {
    fontSize: Typography.sm,
    color: Colors.foreground,
    fontWeight: Typography.medium,
    lineHeight: 18,
  },
  scheduledDate: {
    fontSize: Typography.xs,
    color: Colors.accent,
    fontWeight: Typography.bold,
    marginTop: 6,
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
  pickLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  platformPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: Spacing.base,
  },
  platChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: Border.width,
    borderColor: Colors.border,
  },
  platChipText: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.foreground,
  },
  platChipTextActive: { color: Colors.white },
});

export default SocialMediaPlannerScreen;
