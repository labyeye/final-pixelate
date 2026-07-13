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
const logopixel = require('../../components/images/Logo_Color_Name_Large.png');
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
          </View>

          {}
          <View style={styles.card}>
            <Input
              label="EMAIL"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter Your Email Address"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Input
              label="PASSWORD"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter Your Password"
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
              style={{
                borderRadius: 50,
                marginTop: 20,
                backgroundColor: Colors.primary,
              }}
            />
          </View>

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
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  logoBox: {
    width: 230,
    height: 90,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    width: 230,
    height: 90,
  },
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
  taglineBlock: { marginBottom: Spacing['2xl'] },
  tagline: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    color: Colors.black,
    opacity: 0.9,
    lineHeight: 28,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Border.radius,
    padding: Spacing.md,
  },
  cardTitle: {
    fontSize: 30,
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 20,
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
