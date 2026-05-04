import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { aboutTeamAPI } from '../../api';
import {
  Card,
  Row,
  Button,
  Input,
  Divider,
  LoadingSpinner,
  EmptyState,
} from '../../components/common';
import { Colors, Typography, Spacing, Border } from '../../theme';

const AboutTeamScreen = () => {
  const qc = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({
    name: '',
    designation: '',
    phone: '',
    order: '0',
  });

  const { data: members = [], isLoading } = useQuery({
    queryKey: ['about-team'],
    queryFn: () => aboutTeamAPI.getAll().then(r => r.data),
  });

  const saveMutation = useMutation({
    mutationFn: (data: any) =>
      editing
        ? aboutTeamAPI.update(editing._id, data)
        : aboutTeamAPI.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['about-team'] });
      setShowModal(false);
      setEditing(null);
      setForm({ name: '', designation: '', phone: '', order: '0' });
    },
    onError: () => Alert.alert('Error', 'Failed to save team member'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => aboutTeamAPI.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['about-team'] }),
    onError: () => Alert.alert('Error', 'Delete failed'),
  });

  const openAdd = () => {
    setEditing(null);
    setForm({ name: '', designation: '', phone: '', order: '0' });
    setShowModal(true);
  };

  const openEdit = (item: any) => {
    setEditing(item);
    setForm({
      name: item.name || '',
      designation: item.designation || '',
      phone: item.phone || '',
      order: String(item.order || 0),
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      Alert.alert('Error', 'Name is required');
      return;
    }
    saveMutation.mutate({ ...form, order: parseInt(form.order, 10) || 0 });
  };

  const handleDelete = (item: any) => {
    Alert.alert('Delete', `Remove ${item.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteMutation.mutate(item._id),
      },
    ]);
  };

  if (isLoading) return <LoadingSpinner />;

  const list = Array.isArray(members)
    ? [...members].sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
    : [];

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <Row justify="space-between" align="center" style={styles.topRow}>
          <Text style={styles.count}>{list.length} MEMBERS</Text>
          <Button label="+ ADD" onPress={openAdd} size="sm" />
        </Row>
        <FlatList
          data={list}
          keyExtractor={(item, i) => String(item._id || i)}
          ListEmptyComponent={
            <EmptyState
              title="No Team Members"
              subtitle="Add team members for the About Us page"
            />
          }
          renderItem={({ item }) => (
            <Card style={styles.card} shadow="sm">
              <Row justify="space-between" align="flex-start">
                <View style={styles.info}>
                  <View style={styles.avatarRow}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>
                        {(item.name || 'T').charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.nameBlock}>
                      <Text style={styles.name}>{item.name}</Text>
                      {item.designation ? (
                        <Text style={styles.designation}>
                          {item.designation}
                        </Text>
                      ) : null}
                      {item.phone ? (
                        <Text style={styles.phone}>{item.phone}</Text>
                      ) : null}
                    </View>
                  </View>
                  <View style={styles.orderBadge}>
                    <Text style={styles.orderText}>
                      ORDER #{item.order || 0}
                    </Text>
                  </View>
                </View>
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() => openEdit(item)}
                  >
                    <Text style={styles.editBtnText}>EDIT</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.delBtn}
                    onPress={() => handleDelete(item)}
                  >
                    <Text style={styles.delBtnText}>DEL</Text>
                  </TouchableOpacity>
                </View>
              </Row>
            </Card>
          )}
        />
      </View>

      <Modal
        visible={showModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modal}>
          <Row
            justify="space-between"
            align="center"
            style={styles.modalHeader}
          >
            <Text style={styles.modalTitle}>
              {editing ? 'EDIT MEMBER' : 'ADD MEMBER'}
            </Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </Row>
          <ScrollView style={styles.modalContent}>
            <Input
              label="NAME *"
              value={form.name}
              onChangeText={t => setForm(f => ({ ...f, name: t }))}
              placeholder="Full name"
            />
            <Input
              label="DESIGNATION"
              value={form.designation}
              onChangeText={t => setForm(f => ({ ...f, designation: t }))}
              placeholder="e.g. Creative Director"
            />
            <Input
              label="PHONE"
              value={form.phone}
              onChangeText={t => setForm(f => ({ ...f, phone: t }))}
              placeholder="+91 9999999999"
              keyboardType="phone-pad"
            />
            <Input
              label="ORDER"
              value={form.order}
              onChangeText={t => setForm(f => ({ ...f, order: t }))}
              placeholder="Display order"
              keyboardType="numeric"
            />
            <Button
              label={saveMutation.isPending ? 'SAVING...' : 'SAVE MEMBER'}
              onPress={handleSave}
              loading={saveMutation.isPending}
              fullWidth
              size="lg"
              style={{ marginTop: Spacing.base }}
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.base, paddingBottom: 0 },
  topRow: { marginBottom: Spacing.sm },
  count: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 0.5,
  },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  info: { flex: 1 },
  avatarRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  avatar: {
    width: 44,
    height: 44,
    backgroundColor: Colors.primary,
    borderWidth: Border.width,
    borderColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: Typography.lg,
    fontWeight: Typography.black,
    color: Colors.white,
  },
  nameBlock: { flex: 1 },
  name: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  designation: {
    fontSize: Typography.sm,
    color: Colors.primary,
    fontWeight: Typography.bold,
    marginTop: 1,
  },
  phone: {
    fontSize: Typography.xs,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 1,
  },
  orderBadge: {
    marginTop: Spacing.xs,
    alignSelf: 'flex-start',
    backgroundColor: Colors.gray200,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  orderText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 0.5,
  },
  actions: { gap: 6 },
  editBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: Border.width,
    borderColor: Colors.primary,
  },
  editBtnText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.primary,
  },
  delBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: Border.width,
    borderColor: Colors.destructive,
  },
  delBtnText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.destructive,
  },
  modal: { flex: 1, backgroundColor: Colors.background },
  modalHeader: {
    padding: Spacing.base,
    borderBottomWidth: Border.widthBold,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: Typography.xl,
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: 1,
  },
  modalClose: {
    fontSize: Typography.xl,
    fontWeight: Typography.black,
    color: Colors.destructive,
  },
  modalContent: { padding: Spacing.base },
});

export default AboutTeamScreen;
