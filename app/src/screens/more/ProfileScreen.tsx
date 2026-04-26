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
import { useAuth } from '../../context/AuthContext';
import { Card, Row, Divider, Button, Input } from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';
import { usersAPI } from '../../api';
import { useMutation } from '@tanstack/react-query';

const ProfileScreen = () => {
  const { user, logout, updateUser } = useAuth();
  const [showPwd, setShowPwd] = useState(false);
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  const changePwdMutation = useMutation({
    mutationFn: (data: any) => usersAPI.changePassword(String(user?.id), data),
    onSuccess: () => {
      Alert.alert('Success', 'Password changed successfully');
      setShowPwd(false);
      setCurrentPwd('');
      setNewPwd('');
      setConfirmPwd('');
    },
    onError: () =>
      Alert.alert(
        'Error',
        'Failed to change password. Check your current password.',
      ),
  });

  const handleChangePwd = () => {
    if (!currentPwd || !newPwd || !confirmPwd) {
      Alert.alert('Error', 'All fields required');
      return;
    }
    if (newPwd !== confirmPwd) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }
    if (newPwd.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    changePwdMutation.mutate({
      currentPassword: currentPwd,
      newPassword: newPwd,
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        {}
        <Card style={styles.heroCard} shadow="lg">
          <View style={styles.avatarBlock}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {(user?.name || 'U').charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
          <Text style={styles.name}>{user?.name || 'Unknown'}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <View
            style={[
              styles.roleBadge,
              {
                backgroundColor:
                  user?.role === 'admin' ? Colors.primary : Colors.accent,
              },
            ]}
          >
            <Text style={styles.roleText}>
              {(user?.role || 'user').toUpperCase()}
            </Text>
          </View>
        </Card>

        {}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>ACCOUNT INFORMATION</Text>
          <Divider style={{ marginVertical: Spacing.sm }} />
          <Row justify="space-between" style={styles.field}>
            <Text style={styles.fieldLabel}>Name</Text>
            <Text style={styles.fieldValue}>{user?.name}</Text>
          </Row>
          <Row justify="space-between" style={styles.field}>
            <Text style={styles.fieldLabel}>Email</Text>
            <Text style={styles.fieldValue}>{user?.email}</Text>
          </Row>
          <Row justify="space-between" style={styles.field}>
            <Text style={styles.fieldLabel}>Role</Text>
            <Text style={styles.fieldValue}>{user?.role}</Text>
          </Row>
          {user?.clientId ? (
            <Row justify="space-between" style={styles.field}>
              <Text style={styles.fieldLabel}>Client ID</Text>
              <Text style={styles.fieldValue}>
                {String(user.clientId).slice(-6)}
              </Text>
            </Row>
          ) : null}
        </Card>

        {}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>SECURITY</Text>
          <Divider style={{ marginVertical: Spacing.sm }} />
          <Button
            label="CHANGE PASSWORD"
            onPress={() => setShowPwd(true)}
            fullWidth
          />
        </Card>

        {}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>SESSION</Text>
          <Divider style={{ marginVertical: Spacing.sm }} />
          <Button
            label="SIGN OUT"
            variant="secondary"
            onPress={() =>
              Alert.alert('Sign Out', 'Are you sure?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Sign Out', style: 'destructive', onPress: logout },
              ])
            }
            fullWidth
          />
        </Card>
      </ScrollView>

      {}
      <Modal
        visible={showPwd}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modal}>
          <Row
            justify="space-between"
            align="center"
            style={styles.modalHeader}
          >
            <Text style={styles.modalTitle}>CHANGE PASSWORD</Text>
            <TouchableOpacity onPress={() => setShowPwd(false)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </Row>
          <View style={styles.modalContent}>
            <Input
              label="CURRENT PASSWORD"
              value={currentPwd}
              onChangeText={setCurrentPwd}
              secureTextEntry
              placeholder="Current password"
            />
            <Input
              label="NEW PASSWORD"
              value={newPwd}
              onChangeText={setNewPwd}
              secureTextEntry
              placeholder="Min 6 characters"
            />
            <Input
              label="CONFIRM NEW PASSWORD"
              value={confirmPwd}
              onChangeText={setConfirmPwd}
              secureTextEntry
              placeholder="Repeat new password"
            />
            <Button
              label={
                changePwdMutation.isPending ? 'UPDATING...' : 'UPDATE PASSWORD'
              }
              onPress={handleChangePwd}
              loading={changePwdMutation.isPending}
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
  content: { padding: Spacing.base, paddingBottom: 24 },
  heroCard: {
    padding: Spacing.xl,
    marginBottom: Spacing.sm,
    alignItems: 'center',
  },
  avatarBlock: { marginBottom: Spacing.base },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: Colors.white,
    borderWidth: Border.widthBold,
    borderColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.md,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: Typography.black,
    color: Colors.primary,
  },
  name: {
    fontSize: Typography['2xl'],
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  email: {
    fontSize: Typography.base,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 4,
    textAlign: 'center',
  },
  roleBadge: {
    marginTop: Spacing.sm,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderWidth: Border.width,
    borderColor: Colors.border,
  },
  roleText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 2,
  },
  card: { padding: Spacing.md, marginBottom: Spacing.sm },
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

export default ProfileScreen;
