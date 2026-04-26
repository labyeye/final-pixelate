import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
  TouchableOpacityProps,
  StyleProp,
} from 'react-native';
import { Colors, Typography, Shadows, Spacing, Border } from '../../theme';


interface CardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  shadow?: 'sm' | 'md' | 'lg' | 'none';
  borderColor?: string;
  padding?: number;
  onPress?: () => void;
}

import { ReactNode } from 'react';

export const Card = ({
  children,
  style,
  shadow = 'md',
  borderColor = Colors.border,
  padding = Spacing.base,
  onPress,
}: CardProps) => {
  const shadowStyle = shadow !== 'none' ? Shadows[shadow] : {};
  const content = (
    <View
      style={[
        styles.card,
        { borderColor, padding },
        shadowStyle,
        style,
      ]}>
      {children}
    </View>
  );
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
        {content}
      </TouchableOpacity>
    );
  }
  return content;
};


interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export const Button = ({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  fullWidth = false,
  style,
  disabled,
  ...props
}: ButtonProps) => {
  const bg = {
    primary: Colors.primary,
    secondary: Colors.secondary,
    outline: Colors.background,
    ghost: 'transparent',
    destructive: Colors.destructive,
    success: Colors.success,
  }[variant];

  const textColor = {
    primary: Colors.white,
    secondary: Colors.white,
    outline: Colors.foreground,
    ghost: Colors.foreground,
    destructive: Colors.white,
    success: Colors.white,
  }[variant];

  const borderColor = variant === 'outline' ? Colors.border : 'transparent';

  const padV = { sm: 8, md: 12, lg: 16 }[size];
  const padH = { sm: 12, md: 16, lg: 24 }[size];
  const fontSize = { sm: Typography.sm, md: Typography.base, lg: Typography.lg }[size];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled ? Colors.gray300 : bg,
          borderColor: variant === 'outline' ? Colors.border : 'transparent',
          borderWidth: variant === 'outline' ? Border.width : 0,
          paddingVertical: padV,
          paddingHorizontal: padH,
          width: fullWidth ? '100%' : undefined,
          opacity: disabled ? 0.6 : 1,
        },
        !disabled && variant !== 'ghost' && Shadows.sm,
        style as ViewStyle,
      ]}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}>
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <View style={styles.buttonInner}>
          {icon && <View style={styles.buttonIcon}>{icon}</View>}
          <Text style={[styles.buttonText, { color: textColor, fontSize }]}>
            {label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};


interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = ({
  label,
  error,
  containerStyle,
  leftIcon,
  rightIcon,
  style,
  ...props
}: InputProps) => (
  <View style={[styles.inputContainer, containerStyle]}>
    {label ? <Text style={styles.inputLabel}>{label}</Text> : null}
    <View style={[styles.inputWrapper, error ? styles.inputError : {}]}>
      {leftIcon && <View style={styles.inputIcon}>{leftIcon}</View>}
      <TextInput
        style={[styles.input, leftIcon ? { paddingLeft: 4 } : {}, style as TextStyle]}
        placeholderTextColor={Colors.gray400}
        {...props}
      />
      {rightIcon && <View style={styles.inputRightIcon}>{rightIcon}</View>}
    </View>
    {error ? <Text style={styles.inputErrorText}>{error}</Text> : null}
  </View>
);


interface BadgeProps {
  label: string;
  color?: string;
  textColor?: string;
  style?: ViewStyle;
}

export const Badge = ({
  label,
  color = Colors.muted,
  textColor = Colors.foreground,
  style,
}: BadgeProps) => (
  <View style={[styles.badge, { backgroundColor: color }, style]}>
    <Text style={[styles.badgeText, { color: textColor }]}>{label}</Text>
  </View>
);


const statusColors: Record<string, { bg: string; text: string }> = {
  
  interested: { bg: Colors.primary, text: '#FFFFFF' },
  active: { bg: Colors.primary, text: '#FFFFFF' },
  completed: { bg: Colors.primary, text: '#FFFFFF' },
  paid: { bg: Colors.primary, text: '#FFFFFF' },
  approved: { bg: Colors.primary, text: '#FFFFFF' },
  resolved: { bg: Colors.primary, text: '#FFFFFF' },
  
  'in progress': { bg: Colors.accent, text: '#FFFFFF' },
  called: { bg: Colors.accent, text: '#FFFFFF' },
  open: { bg: Colors.accent, text: '#FFFFFF' },
  
  pending: { bg: Colors.warning, text: '#FFFFFF' },
  partial: { bg: Colors.secondary, text: '#FFFFFF' },
  'not called': { bg: Colors.warning, text: '#FFFFFF' },
  'call back later': { bg: Colors.secondary, text: '#FFFFFF' },
  'meeting booked': { bg: '#7C3AED', text: '#FFFFFF' },
  
  'not interested': { bg: Colors.destructive, text: '#FFFFFF' },
  inactive: { bg: Colors.destructive, text: '#FFFFFF' },
  cancelled: { bg: Colors.destructive, text: '#FFFFFF' },
  unpaid: { bg: Colors.destructive, text: '#FFFFFF' },
  rejected: { bg: Colors.destructive, text: '#FFFFFF' },
  
  draft: { bg: Colors.gray700, text: '#FFFFFF' },
  closed: { bg: Colors.gray600, text: '#FFFFFF' },
};

export const StatusBadge = ({ status }: { status: string }) => {
  const s = (status || '').toLowerCase();
  const colors = statusColors[s] || { bg: Colors.muted, text: Colors.foreground };
  return (
    <Badge
      label={status}
      color={colors.bg}
      textColor={colors.text}
    />
  );
};


interface EmptyStateProps {
  title: string;
  subtitle?: string;
  icon?: string;
  action?: { label: string; onPress: () => void };
}

export const EmptyState = ({ title, subtitle, action }: EmptyStateProps) => (
  <View style={styles.emptyState}>
    <Text style={styles.emptyStateTitle}>{title}</Text>
    {subtitle ? <Text style={styles.emptyStateSubtitle}>{subtitle}</Text> : null}
    {action ? (
      <Button
        label={action.label}
        onPress={action.onPress}
        style={{ marginTop: Spacing.base }}
      />
    ) : null}
  </View>
);


export const LoadingSpinner = ({ size = 'large' }: { size?: 'small' | 'large' }) => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size={size} color={Colors.primary} />
  </View>
);


interface SectionHeaderProps {
  title: string;
  action?: { label: string; onPress: () => void };
  style?: StyleProp<ViewStyle>;
}

export const SectionHeader = ({ title, action, style }: SectionHeaderProps) => (
  <View style={[styles.sectionHeader, style]}>
    <Text style={styles.sectionHeaderTitle}>{title}</Text>
    {action ? (
      <TouchableOpacity onPress={action.onPress}>
        <Text style={styles.sectionHeaderAction}>{action.label}</Text>
      </TouchableOpacity>
    ) : null}
  </View>
);


interface StatCardProps {
  label: string;
  value: string | number;
  accent?: string;
  icon?: ReactNode;
  onPress?: () => void;
}

export const StatCard = ({ label, value, accent = Colors.primary, icon, onPress }: StatCardProps) => (
  <Card
    style={[styles.statCard, { borderLeftColor: accent, borderLeftWidth: 4 }]}
    shadow="md"
    onPress={onPress}>
    <View style={styles.statCardHeader}>
      {icon && <View style={styles.statCardIcon}>{icon}</View>}
    </View>
    <Text style={[styles.statCardValue, { color: accent }]}>{value}</Text>
    <Text style={styles.statCardLabel}>{label}</Text>
  </Card>
);


export const Divider = ({ style }: { style?: StyleProp<ViewStyle> }) => (
  <View style={[styles.divider, style]} />
);


export const Row = ({
  children,
  style,
  justify = 'flex-start',
  align = 'center',
  gap = 0,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  justify?: ViewStyle['justifyContent'];
  align?: ViewStyle['alignItems'];
  gap?: number;
}) => (
  <View
    style={[
      {
        flexDirection: 'row',
        justifyContent: justify,
        alignItems: align,
        gap,
      },
      style,
    ]}>
    {children}
  </View>
);


export const ScreenTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <View style={styles.screenTitle}>
    <Text style={styles.screenTitleText}>{title}</Text>
    {subtitle ? <Text style={styles.screenSubtitle}>{subtitle}</Text> : null}
  </View>
);


import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const SearchBar = ({
  value,
  onChangeText,
  placeholder = 'Search...',
}: {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
}) => (
  <View style={styles.searchBar}>
    <Icon name="magnify" size={18} color={Colors.gray400} style={styles.searchIcon} />
    <TextInput
      style={styles.searchInput}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={Colors.gray400}
    />
  </View>
);


const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderWidth: Border.width,
    borderRadius: Border.radius,
  },
  button: {
    borderRadius: Border.radius,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: Border.width,
  },
  buttonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  buttonIcon: { marginRight: 4 },
  buttonText: {
    fontWeight: Typography.bold,
    letterSpacing: 0.5,
  },
  inputContainer: { marginBottom: Spacing.md },
  inputLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.semiBold,
    color: Colors.foreground,
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: Border.widthHeavy,
    borderColor: Colors.border,
    borderRadius: Border.radius,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.md,
  },
  inputIcon: { marginRight: Spacing.sm },
  inputRightIcon: { marginLeft: Spacing.sm },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: Typography.base,
    color: Colors.foreground,
    fontWeight: Typography.medium,
  },
  inputError: { borderColor: Colors.destructive },
  inputErrorText: {
    color: Colors.destructive,
    fontSize: Typography.xs,
    marginTop: 4,
    fontWeight: Typography.medium,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Border.radius,
    borderWidth: 1,
    borderColor: Colors.border,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    letterSpacing: 0.3,
    textTransform: 'capitalize',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing['2xl'],
  },
  emptyStateTitle: {
    fontSize: Typography.xl,
    fontWeight: Typography.black,
    color: Colors.foreground,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  emptyStateSubtitle: {
    fontSize: Typography.base,
    color: Colors.mutedForeground,
    textAlign: 'center',
    fontWeight: Typography.medium,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing['2xl'],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionHeaderTitle: {
    fontSize: Typography.lg,
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: -0.3,
  },
  sectionHeaderAction: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.primary,
  },
  statCard: {
    flex: 1,
    minWidth: 140,
  },
  statCardHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: Spacing.sm,
  },
  statCardIcon: {},
  statCardValue: {
    fontSize: Typography['3xl'],
    fontWeight: Typography.black,
    letterSpacing: -1,
  },
  statCardLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.semiBold,
    color: Colors.mutedForeground,
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  divider: {
    height: 2,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },
  screenTitle: { marginBottom: Spacing.base },
  screenTitleText: {
    fontSize: Typography['3xl'],
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: -1,
  },
  screenSubtitle: {
    fontSize: Typography.base,
    color: Colors.mutedForeground,
    marginTop: 2,
    fontWeight: Typography.medium,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: Border.widthHeavy,
    borderColor: Colors.border,
    borderRadius: Border.radius,
    backgroundColor: Colors.background,
    marginBottom: Spacing.base,
    paddingHorizontal: Spacing.md,
    ...Shadows.sm,
  },
  searchIcon: { marginRight: 8 },
  searchInput: {
    paddingVertical: 10,
    fontSize: Typography.base,
    color: Colors.foreground,
    fontWeight: Typography.medium,
  },
});
