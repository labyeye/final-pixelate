import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Card,
  Row,
  Button,
  Input,
  EmptyState,
  LoadingSpinner,
  Divider,
} from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';
import { usersAPI } from '../../api';

const ROLES = ['admin', 'editor', 'client', 'viewer'];

const UsersScreen = () => {
  const qc = useQueryClient();
  const [showEdit, setShowEdit] = useState(false);
  const [editTarget, setEditTarget] = useState<any>(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'editor' });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordTarget, setPasswordTarget] = useState<any>(null);
  const [newPassword, setNewPassword] = useState('');

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => usersAPI.getAll().then(r => r.data),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      usersAPI.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] });
      setShowEdit(false);
    },
    onError: () => Alert.alert('Error', 'Failed to update user'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      usersAPI.update(id, { deleted: true }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
    onError: () => Alert.alert('Error', 'Failed to delete user'),
  });

  const changePasswordMutation = useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) =>
      usersAPI.changePassword(id, { newPassword: password }),
    onSuccess: () => {
      setShowPasswordModal(false);
      setNewPassword('');
      Alert.alert('Success', 'Password changed successfully');
    },
    onError: () => Alert.alert('Error', 'Failed to change password'),
  });

  const openEdit = (user: any) => {
    setEditTarget(user);
    setForm({
      name: user.name || '',
      email: user.email || '',
      role: user.role || 'editor',
    });
    setShowEdit(true);
  };

  const handleSave = () => {
    if (!editTarget) return;
    const id = editTarget._id || editTarget.id;
    updateMutation.mutate({ id, data: form });
  };

  const handleDelete = (user: any) => {
    const id = user._id || user.id;
    Alert.alert('Delete User', `Delete user "${user.name}"? This cannot be undone.`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteMutation.mutate(id),
      },
    ]);
  };

  const arr = Array.isArray(users) ? users : [];

  if (isLoading) return <LoadingSpinner />;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <FlatList
        contentContainerStyle={styles.content}
        data={arr}
        keyExtractor={(item: any, i) => String(item._id || item.id || i)}
        ListHeaderComponent={
          <Text style={styles.subtitle}>
            View and manage login users. Only admins can see this page.
          </Text>
        }
        ListEmptyComponent={
          <EmptyState title="No Users" subtitle="No users found in the system" />
        }
        renderItem={({ item }: { item: any }) => {
          const roleColor =
            item.role === 'admin'
              ? Colors.destructive
              : item.role === 'client'
              ? Colors.success
              : Colors.primary;
          return (
            <Card style={styles.card} shadow="sm">
              <Row justify="space-between" align="center">
                <View style={styles.userInfo}>
                  <View style={[styles.avatar, { backgroundColor: roleColor }]}>
                    <Text style={styles.avatarText}>
                      {(item.name || '?').charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text style={styles.userEmail}>{item.email}</Text>
                    <View style={[styles.roleBadge, { backgroundColor: roleColor }]}>
                      <Text style={styles.roleBadgeText}>
                        {(item.role || 'user').toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>
              </Row>
              <Divider style={{ marginVertical: Spacing.sm }} />
              <Row gap={8}>
                <TouchableOpacity style={styles.actionBtn} onPress={() => openEdit(item)}>
                  <Text style={styles.actionBtnText}>EDIT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => {
                    setPasswordTarget(item);
                    setNewPassword('');
                    setShowPasswordModal(true);
                  }}
                >
                  <Text style={styles.actionBtnText}>CHANGE PASSWORD</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionBtn, { borderColor: Colors.destructive }]}
                  onPress={() => handleDelete(item)}
                >
                  <Text style={[styles.actionBtnText, { color: Colors.destructive }]}>DELETE</Text>
                </TouchableOpacity>
              </Row>
            </Card>
          );
        }}
      />

      <Modal visible={showEdit} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <Row justify="space-between" align="center" style={styles.modalHeader}>
            <Text style={styles.modalTitle}>EDIT USER</Text>
            <TouchableOpacity onPress={() => setShowEdit(false)}>
              <Text style={styles.modalClose}>CANCEL</Text>
            </TouchableOpacity>
          </Row>
          <ScrollView style={styles.modalContent}>
            <Input
              label="NAME"
              value={form.name}
              onChangeText={v => setForm(f => ({ ...f, name: v }))}
              placeholder="Full name"
            />
            <Input
              label="EMAIL"
              value={form.email}
              onChangeText={v => setForm(f => ({ ...f, email: v }))}
              placeholder="email@example.com"
            />
            <Text style={styles.fieldLabel}>ROLE</Text>
            <Row gap={8} style={{ flexWrap: 'wrap', marginBottom: Spacing.base }}>
              {ROLES.map(r => (
                <TouchableOpacity
                  key={r}
                  style={[styles.roleChip, form.role === r && styles.roleChipActive]}
                  onPress={() => setForm(f => ({ ...f, role: r }))}
                >
                  <Text style={[styles.roleChipText, form.role === r && styles.roleChipTextActive]}>
                    {r.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </Row>
            <Button
              label={updateMutation.isPending ? 'SAVING...' : 'SAVE CHANGES'}
              onPress={handleSave}
              loading={updateMutation.isPending}
              fullWidth
              size="lg"
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <Modal visible={showPasswordModal} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <Row justify="space-between" align="center" style={styles.modalHeader}>
            <Text style={styles.modalTitle}>CHANGE PASSWORD</Text>
            <TouchableOpacity onPress={() => setShowPasswordModal(false)}>
              <Text style={styles.modalClose}>CANCEL</Text>
            </TouchableOpacity>
          </Row>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.passwordHint}>
              Changing password for: {passwordTarget?.name}
            </Text>
            <Input
              label="NEW PASSWORD"
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password"
              secureTextEntry
            />
            <Button
              label={changePasswordMutation.isPending ? 'CHANGING...' : 'CHANGE PASSWORD'}
              onPress={() => {
                if (!newPassword.trim()) {
                  Alert.alert('Error', 'Password cannot be empty');
                  return;
                }
                const id = passwordTarget?._id || passwordTarget?.id;
                changePasswordMutation.mutate({ id, password: newPassword });
              }}
              loading={changePasswordMutation.isPending}
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
  content: { padding: Spacing.base, paddingBottom: 24 },
  subtitle: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginBottom: Spacing.base,
  },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  userInfo: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, flex: 1 },
  avatar: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: Border.width,
    borderColor: Colors.border,
  },
  avatarText: {
    fontSize: Typography.lg,
    fontWeight: Typography.black,
    color: Colors.white,
  },
  userName: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  userEmail: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 2,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 4,
  },
  roleBadgeText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 0.5,
  },
  actionBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: Border.width,
    borderColor: Colors.border,
  },
  actionBtnText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: 0.3,
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
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.destructive,
  },
  modalContent: { padding: Spacing.base },
  fieldLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: 0.5,
    marginBottom: 8,
    marginTop: Spacing.sm,
  },
  roleChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: Border.width,
    borderColor: Colors.border,
  },
  roleChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  roleChipText: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.foreground,
    letterSpacing: 0.3,
  },
  roleChipTextActive: { color: Colors.white },
  passwordHint: {
    fontSize: Typography.base,
    fontWeight: Typography.bold,
    color: Colors.foreground,
    marginBottom: Spacing.base,
  },
});

export default UsersScreen;
