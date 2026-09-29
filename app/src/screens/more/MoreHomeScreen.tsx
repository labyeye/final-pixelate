import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SectionHeader } from '../../components/common';
import { useAuth } from '../../context/AuthContext';
import { Colors, Typography, Spacing, Border } from '../../theme';
import { MoreStackParams } from '../../navigation/types';
import {
  MessageCircle,
  Send,
  BarChart3,
  FileEdit,
  Inbox,
  CalendarDays,
  CalendarRange,
  PenLine,
  Mail,
  Megaphone,
  Headphones,
  Briefcase,
  Users,
  Code2,
  Image as ImageIcon,
  Camera,
  Film,
  User,
  Settings as SettingsIcon,
  KeyRound,
  FolderOpen,
  Trash2,
  Zap,
  ChevronRight,
  Palette,
  Building2,
  Receipt,
  Tag,
  Ticket,
  LucideIcon,
} from 'lucide-react-native';

type Nav = NativeStackNavigationProp<MoreStackParams>;

type MoreItem = {
  label: string;
  icon: LucideIcon;
  route: keyof MoreStackParams;
  params?: object;
  color: string;
};

type Section = { title: string; items: MoreItem[]; adminOnly?: boolean };

const productSection = (
  title: string,
  product: 'hr' | 'leads',
  color: string,
): Section => ({
  title,
  adminOnly: true,
  items: [
    { label: 'Subscriptions', icon: Building2, route: 'ProductSubscriptions', params: { product }, color },
    { label: 'Invoices', icon: Receipt, route: 'ProductInvoices', params: { product }, color },
    { label: 'Offer Codes', icon: Tag, route: 'ProductOffers', params: { product }, color },
    { label: 'Support', icon: Headphones, route: 'ProductSupport', params: { product }, color },
  ],
});

const SECTIONS: Section[] = [
  {
    title: 'WhatsApp Marketing',
    items: [
      { label: 'WhatsApp Inbox', icon: MessageCircle, route: 'WhatsAppInbox', color: Colors.success },
      { label: 'Send Template', icon: Send, route: 'WhatsAppSend', color: Colors.success },
      { label: 'Bulk Messaging', icon: Send, route: 'BulkMessaging', color: Colors.success },
      { label: 'Campaign Insights', icon: BarChart3, route: 'Campaigns', color: Colors.success },
      { label: 'WA Templates', icon: FileEdit, route: 'WhatsAppTemplates', color: Colors.success },
      { label: 'Delivery Log', icon: Inbox, route: 'WhatsAppWebhook', color: Colors.success },
    ],
  },
  {
    title: 'Social Media',
    items: [
      { label: 'Social Planner', icon: CalendarDays, route: 'SocialMediaPlanner', color: Colors.secondary },
      { label: 'Content Calendar', icon: CalendarRange, route: 'SocialMediaCalendar', color: Colors.secondary },
    ],
  },
  {
    title: 'Content',
    items: [
      { label: 'Blogs', icon: PenLine, route: 'Blogs', color: Colors.accent },
      { label: 'Newsletter', icon: Mail, route: 'Newsletter', color: Colors.accent },
      { label: 'Announcements', icon: Megaphone, route: 'Announcements', color: Colors.accent },
      { label: 'Brand Guides', icon: Palette, route: 'BrandGuide', color: Colors.accent },
    ],
  },
  productSection('Nest HR', 'hr', Colors.primary),
  productSection('Nest Leads', 'leads', '#7C3AED'),
  {
    title: 'Nest Play',
    adminOnly: true,
    items: [
      { label: 'Invoices', icon: Receipt, route: 'ProductInvoices', params: { product: 'play' }, color: Colors.success },
      { label: 'Coupons', icon: Ticket, route: 'ProductOffers', params: { product: 'play' }, color: Colors.success },
    ],
  },
  {
    title: 'Support & HR',
    items: [
      { label: 'Support Tickets', icon: Headphones, route: 'Support', color: Colors.warning },
      { label: 'Careers', icon: Briefcase, route: 'Careers', color: Colors.warning },
      { label: 'About Us Team', icon: Users, route: 'AboutTeam', color: Colors.warning },
      { label: 'Developers', icon: Code2, route: 'Developers', color: Colors.warning },
    ],
  },
  {
    title: 'Media',
    items: [
      { label: 'Work Gallery', icon: ImageIcon, route: 'WorkGallery', color: Colors.gray600 },
      { label: 'Photos', icon: Camera, route: 'Photos', color: Colors.gray600 },
      { label: 'Reels', icon: Film, route: 'Reels', color: Colors.gray600 },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Profile', icon: User, route: 'Profile', color: Colors.gray700 },
      { label: 'Settings', icon: SettingsIcon, route: 'Settings', color: Colors.gray700 },
      { label: 'Login Users', icon: KeyRound, route: 'Users', color: Colors.gray700 },
      { label: 'Client Portal', icon: FolderOpen, route: 'ClientPortal', color: Colors.gray700 },
      { label: 'Trash', icon: Trash2, route: 'Trash', color: Colors.destructive },
      { label: 'ERP Console', icon: Zap, route: 'ERPConsole', color: Colors.gray700 },
    ],
  },
];

const MoreHomeScreen = () => {
  const navigation = useNavigation<Nav>();
  const { isAdmin } = useAuth();

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        {SECTIONS.filter(s => isAdmin || !s.adminOnly).map(section => (
          <View key={section.title}>
            <SectionHeader title={section.title} style={styles.sectionHeader} />
            <View style={styles.group}>
              {section.items.map((item, i) => (
                <TouchableOpacity
                  key={item.label}
                  style={[styles.row, i > 0 && styles.rowDivider]}
                  onPress={() => (navigation.navigate as any)(item.route, item.params)}
                  activeOpacity={0.6}
                >
                  <View style={[styles.iconChip, { backgroundColor: `${item.color}1A` }]}>
                    <item.icon size={16} color={item.color} />
                  </View>
                  <Text style={styles.rowLabel}>{item.label}</Text>
                  <ChevronRight size={16} color={Colors.gray400} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base },
  sectionHeader: { marginTop: Spacing.lg, marginBottom: Spacing.sm },
  group: {
    backgroundColor: Colors.card,
    borderRadius: Border['radius-lg'],
    borderWidth: Border.width,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: 11,
    gap: Spacing.md,
  },
  rowDivider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: Colors.gray300 },
  iconChip: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    flex: 1,
    fontSize: Typography.base,
    fontWeight: Typography.medium,
    color: Colors.foreground,
  },
});

export default MoreHomeScreen;
