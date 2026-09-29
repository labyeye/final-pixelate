// Clean, neutral UI: hairline gray borders, soft shadows, compact type scale.
// Most screens read these tokens, so tuning here restyles the whole app.
export const Colors = {
  primary: '#0A3E91',
  primaryLight: '#1A5AC8',
  secondary: '#F76B10',
  secondaryLight: '#FF8A40',
  accent: '#5B87C5',
  background: '#F7F8FA',
  foreground: '#111827',
  card: '#ffffff',
  cardForeground: '#111827',
  muted: '#F1F3F5',
  mutedForeground: '#6B7280',
  border: '#E5E7EB',
  destructive: '#DC2626',
  destructiveLight: '#EF4444',
  success: '#16A34A',
  successLight: '#22C55E',
  warning: '#D97706',
  white: '#ffffff',
  black: '#111827',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  statusNotCalled: '#F59E0B',
  statusCalled: '#3B82F6',
  statusInterested: '#22C55E',
  statusNotInterested: '#EF4444',
  statusMeeting: '#8B5CF6',
  statusCallBack: '#F97316',

  tabBarBackground: '#ffffff',
  tabBarActive: '#0A3E91',
  tabBarInactive: '#9CA3AF',
};

export const Typography = {
  fontFamily: 'System',

  black: '700' as const,
  bold: '600' as const,
  semiBold: '600' as const,
  medium: '500' as const,
  regular: '400' as const,

  xs: 10,
  sm: 12,
  base: 14,
  md: 15,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 22,
  '4xl': 26,
  '5xl': 32,
};

export const Shadows = {
  sm: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  md: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  lg: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
};

export const Border = {
  width: 1,
  widthHeavy: 1,
  widthBold: 1,
  radius: 8,
  'no-radius': 0,
  'radius-sm': 4,
  'radius-md': 8,
  'radius-lg': 12,
  'radius-large': 50,
};

// Shared by every native stack so headers stay consistent.
export const stackScreenOptions = {
  headerStyle: { backgroundColor: Colors.card },
  headerTintColor: Colors.foreground,
  headerTitleStyle: { fontWeight: Typography.bold, fontSize: Typography.lg },
  headerShadowVisible: true,
  contentStyle: { backgroundColor: Colors.background },
};
