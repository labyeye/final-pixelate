import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { Card, Input, Button } from '../../components/common';
import { Colors, Typography, Spacing, Shadows, Border } from '../../theme';
const logopixel = require('../../components/images/logo-transparent.png');
const LoginScreen = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    setLoading(true);
    try {
      await login(email.trim(), password);
    } catch (err: any) {
      Alert.alert(
        'Login Failed',
        err?.response?.data?.error || err?.message || 'Invalid credentials',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {}
          <View style={styles.logoBlock}>
            <View style={styles.logoBox}>
              <Image source={logopixel} style={styles.logoLetter} />
            </View>
            <View style={styles.logoTextBlock}>
              <Text style={styles.logoTitle}>PIXELATE</Text>
              <Text style={styles.logoSubtitle}>NEST</Text>
            </View>
          </View>

          {}
          <Card style={styles.card} shadow="lg">
            <Text style={styles.cardTitle}>SIGN IN</Text>
            <Text style={styles.cardSubtitle}>
              Enter your credentials to continue
            </Text>

            <View style={styles.divider} />

            <Input
              label="EMAIL"
              value={email}
              onChangeText={setEmail}
              placeholder="admin@pixelatenest.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Input
              label="PASSWORD"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry={!showPassword}
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(v => !v)}>
                  <Text style={styles.showHide}>
                    {showPassword ? 'HIDE' : 'SHOW'}
                  </Text>
                </TouchableOpacity>
              }
            />

            <Button
              label={loading ? 'SIGNING IN...' : 'SIGN IN →'}
              onPress={handleLogin}
              loading={loading}
              fullWidth
              size="lg"
              style={{ marginTop: Spacing.sm }}
            />
          </Card>

          {}
          <Text style={styles.footer}>
            Pixelate Nest CRM · Internal Use Only
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  flex: { flex: 1 },
  container: {
  flexGrow: 1,
  paddingHorizontal: Spacing.base,
  justifyContent: 'center', 
},
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.secondary,
    borderWidth: Border.width,
    borderColor: Colors.black,
    paddingVertical: 4,
    marginBottom: Spacing.xl,
    ...Shadows.sm,
  },
  heroBadgeText: {
    color: Colors.white,
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    letterSpacing: 2,
  },
  logoBlock: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  logoBox: {
    width: 64,
    height: 64,
    backgroundColor: Colors.white,
    borderWidth: Border.widthBold,
    borderColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.md,
  },
  logoLetter: {
    width: 48,
    height: 48,
  },
  logoTextBlock: { gap: 10 , flexDirection: 'row', alignItems: 'center' },
  logoTitle: {
    fontSize: Typography['3xl'],
    fontWeight: Typography.black,
    color: Colors.primary,
    letterSpacing: -1,
    lineHeight: 32,
  },
  logoSubtitle: {
    fontSize: Typography['2xl'],
    fontWeight: Typography.black,
    color: Colors.secondary,
    letterSpacing: 2,
    lineHeight: 28,
  },
  taglineBlock: { marginBottom: Spacing['2xl'], },
  tagline: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    color: Colors.black,
    opacity: 0.9,
    lineHeight: 28,
  },
  card: {
    borderWidth: Border.widthBold,
    borderColor: Colors.black,
    padding: Spacing.xl,
    ...Shadows.lg,
  },
  cardTitle: {
    fontSize: Typography['2xl'],
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: 1,
  },
  cardSubtitle: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 2,
  },
  divider: {
    height: 2,
    backgroundColor: Colors.border,
    marginVertical: Spacing.base,
  },
  showHide: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.primary,
    letterSpacing: 0.5,
  },
  footer: {
    textAlign: 'center',
    color: Colors.white,
    opacity: 0.5,
    fontSize: Typography.xs,
    fontWeight: Typography.medium,
    marginTop: Spacing.xl,
    paddingBottom: Spacing.base,
  },
});

export default LoginScreen;
