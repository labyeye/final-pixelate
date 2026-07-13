import React, { ReactNode, useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Animated,
  ScrollView,
  Modal,
  ViewStyle,
  TextStyle,
  TextInputProps,
  TouchableOpacityProps,
  StyleProp,
} from 'react-native';
import { Search, Edit2, Trash2, ChevronDown, Check } from 'lucide-react-native';
import { Colors, Typography, Shadows, Spacing, Border } from '../../theme';

// Fades + rises on mount, and springs down slightly on press. Shared by
// Card/StatCard so every screen using them gets it for free.
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const usePressScale = () => {
  const scale = useRef(new Animated.Value(1)).current;
  const onPressIn = () =>
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 40,
      bounciness: 0,
    }).start();
  const onPressOut = () =>
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start();
  return { scale, onPressIn, onPressOut };
};

const useMountIn = (delay = 0) => {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 280,
      delay,
      useNativeDriver: true,
    }).start();
  }, [anim, delay]);
  return {
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 0],
        }),
      },
    ],
  };
};

interface CardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  shadow?: 'sm' | 'md' | 'lg' | 'none';
  borderColor?: string;
  padding?: number;
  onPress?: () => void;
  animateIn?: boolean;
}

export const Card = ({
  children,
  style,
  shadow = 'none',
  borderColor = Colors.border,
  padding = Spacing.base,
  onPress,
  animateIn = false,
}: CardProps) => {
  const shadowStyle = shadow !== 'none' ? Shadows[shadow] : {};
  const mountStyle = useMountIn();
  const { scale, onPressIn, onPressOut } = usePressScale();

  const inner = (
    <View style={[styles.card, { borderColor, padding }, shadowStyle, style]}>
      {children}
    </View>
  );

  // mountStyle only carries opacity/transform; without re-applying the
  // caller's layout style here too, this wrapper (the actual flex child in
  // the parent row) has no flex/width and sizes to content instead of
  // stretching evenly like its sibling cards.
  const wrapperStyle = animateIn ? [style, mountStyle] : undefined;

  if (onPress) {
    return (
      <Animated.View style={wrapperStyle}>
        <AnimatedTouchable
          onPress={onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          activeOpacity={0.9}
          style={{ transform: [{ scale }] }}
        >
          {inner}
        </AnimatedTouchable>
      </Animated.View>
    );
  }
  return animateIn ? (
    <Animated.View style={wrapperStyle}>{inner}</Animated.View>
  ) : (
    inner
  );
};

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'destructive'
    | 'success';
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
  onPressIn,
  onPressOut,
  ...props
}: ButtonProps) => {
  const { scale, onPressIn: pressIn, onPressOut: pressOut } = usePressScale();

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

  const padV = { sm: 8, md: 12, lg: 16 }[size];
  const padH = { sm: 12, md: 16, lg: 24 }[size];
  const fontSize = {
    sm: Typography.sm,
    md: Typography.base,
    lg: Typography.lg,
  }[size];

  return (
    <AnimatedTouchable
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
          transform: [{ scale }],
        },
        style as ViewStyle,
      ]}
      disabled={disabled || loading}
      activeOpacity={0.85}
      onPressIn={e => {
        pressIn();
        onPressIn?.(e);
      }}
      onPressOut={e => {
        pressOut();
        onPressOut?.(e);
      }}
      {...props}
    >
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
    </AnimatedTouchable>
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
        style={[
          styles.input,
          leftIcon ? { paddingLeft: 4 } : {},
          style as TextStyle,
        ]}
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
  const colors = statusColors[s] || {
    bg: Colors.muted,
    text: Colors.foreground,
  };
  return <Badge label={status} color={colors.bg} textColor={colors.text} />;
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
    {subtitle ? (
      <Text style={styles.emptyStateSubtitle}>{subtitle}</Text>
    ) : null}
    {action ? (
      <Button
        label={action.label}
        onPress={action.onPress}
        style={{ marginTop: Spacing.base }}
      />
    ) : null}
  </View>
);

export const LoadingSpinner = ({
  size = 'large',
}: {
  size?: 'small' | 'large';
}) => (
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
  sub?: string;
  style?: StyleProp<ViewStyle>;
}

export const StatCard = ({
  label,
  value,
  accent = Colors.primary,
  icon,
  onPress,
  sub,
  style,
}: StatCardProps) => (
  <Card
    style={[styles.statCard, style]}
    shadow="none"
    onPress={onPress}
    animateIn
  >
    {icon && (
      <View style={[styles.statCardIconChip, { backgroundColor: accent }]}>
        {icon}
      </View>
    )}
    <Text style={styles.statCardValue}>{value}</Text>
    <Text style={styles.statCardLabel}>{label}</Text>
    {sub ? <Text style={styles.statCardSub}>{sub}</Text> : null}
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
    ]}
  >
    {children}
  </View>
);

export const ScreenTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <View style={styles.screenTitle}>
    <Text style={styles.screenTitleText}>{title}</Text>
    {subtitle ? <Text style={styles.screenSubtitle}>{subtitle}</Text> : null}
  </View>
);

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
    <Search size={18} color={Colors.gray400} style={styles.searchIcon} />
    <TextInput
      style={styles.searchInput}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={Colors.gray400}
    />
  </View>
);

interface RowActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const RowActions = ({ onEdit, onDelete, style }: RowActionsProps) => (
  <View style={[styles.rowActions, style]}>
    {onEdit && (
      <TouchableOpacity
        style={styles.rowActionBtn}
        onPress={onEdit}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Edit2 size={15} color={Colors.primary} />
      </TouchableOpacity>
    )}
    {onDelete && (
      <TouchableOpacity
        style={styles.rowActionBtn}
        onPress={onDelete}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Trash2 size={15} color={Colors.destructive} />
      </TouchableOpacity>
    )}
  </View>
);

interface ChipOption {
  label: string;
  value: string;
}

interface FilterChipsProps {
  options: ChipOption[];
  value: string;
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const FilterChips = ({
  options,
  value,
  onChange,
  style,
}: FilterChipsProps) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={style}
    contentContainerStyle={styles.filterChipsContent}
  >
    {options.map(opt => {
      const active = opt.value === value;
      return (
        <TouchableOpacity
          key={opt.value}
          style={[styles.filterChip, active && styles.filterChipActive]}
          onPress={() => onChange(opt.value)}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.filterChipText,
              active && styles.filterChipTextActive,
            ]}
          >
            {opt.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);

interface SortButtonProps {
  options: ChipOption[];
  value: string;
  onChange: (value: string) => void;
}

export const SortButton = ({ options, value, onChange }: SortButtonProps) => {
  const [open, setOpen] = useState(false);
  const current = options.find(o => o.value === value);

  return (
    <>
      <TouchableOpacity
        style={styles.sortBtn}
        onPress={() => setOpen(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.sortBtnText}>{current?.label || 'Sort'}</Text>
        <ChevronDown size={14} color={Colors.foreground} />
      </TouchableOpacity>
      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity
          style={styles.sortOverlay}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View style={styles.sortSheet}>
            <Text style={styles.sortSheetTitle}>SORT BY</Text>
            {options.map(opt => {
              const active = opt.value === value;
              return (
                <TouchableOpacity
                  key={opt.value}
                  style={styles.sortOption}
                  onPress={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.sortOptionText,
                      active && styles.sortOptionTextActive,
                    ]}
                  >
                    {opt.label}
                  </Text>
                  {active && <Check size={16} color={Colors.primary} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderWidth: Border.width,
    borderRadius: Border['radius-lg'],
  },
  button: {
    borderRadius: Border['radius-lg'],
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
  inputContainer: { marginBottom: Spacing.md, borderRadius: 50 },
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
    borderRadius: Border['radius-lg'],
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
    borderRadius: Border['radius-lg'],
    borderWidth: 2,
    borderColor: Colors.border,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
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
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
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
  statCardIconChip: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: Border.width,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
  },
  statCardValue: {
    fontSize: Typography['3xl'],
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: -1,
  },
  statCardLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.foreground,
    marginTop: 2,
  },
  statCardSub: {
    fontSize: Typography.xs,
    fontWeight: Typography.medium,
    color: Colors.mutedForeground,
    marginTop: 2,
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
    borderRadius: Border['radius-lg'],
    backgroundColor: Colors.background,
    marginBottom: Spacing.base,
    paddingHorizontal: Spacing.md,
  },
  searchIcon: { marginRight: 8 },
  searchInput: {
    paddingVertical: 10,
    fontSize: Typography.base,
    color: Colors.foreground,
    fontWeight: Typography.medium,
  },

  // RowActions
  rowActions: { flexDirection: 'row', gap: 8 },
  rowActionBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: Border.width,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },

  // FilterChips
  filterChipsContent: {
    gap: 8,
    paddingBottom: Spacing.sm,
  },
  filterChip: {
    borderWidth: Border.width,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
  },
  filterChipText: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    color: Colors.foreground,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  filterChipTextActive: { color: Colors.white },

  // SortButton
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: Border.width,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  sortBtnText: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    color: Colors.foreground,
    textTransform: 'uppercase',
  },
  sortOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sortSheet: {
    backgroundColor: Colors.background,
    borderTopWidth: Border.widthBold,
    borderColor: Colors.border,
    padding: Spacing.base,
    paddingBottom: Spacing.xl,
  },
  sortSheetTitle: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: Spacing.sm,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
  sortOptionText: {
    fontSize: Typography.base,
    fontWeight: Typography.medium,
    color: Colors.foreground,
  },
  sortOptionTextActive: {
    fontWeight: Typography.bold,
    color: Colors.primary,
  },
});
