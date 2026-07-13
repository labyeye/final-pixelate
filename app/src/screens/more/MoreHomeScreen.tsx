import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, SectionHeader, Row } from '../../components/common';
import { Colors, Typography, Spacing } from '../../theme';
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
  LucideIcon,
} from 'lucide-react-native';

type Nav = NativeStackNavigationProp<MoreStackParams>;

type MoreItem = { label: string; icon: LucideIcon; route: string; color: string };

const SECTIONS: { title: string; items: MoreItem[] }[] = [
  {
    title: 'WHATSAPP MARKETING',
    items: [
      { label: 'WhatsApp Inbox', icon: MessageCircle, route: 'WhatsAppInbox', color: Colors.primary },
      { label: 'Bulk Messaging', icon: Send, route: 'BulkMessaging', color: Colors.primary },
      { label: 'Campaign Insights', icon: BarChart3, route: 'Campaigns', color: Colors.primary },
      { label: 'WA Templates', icon: FileEdit, route: 'WhatsAppTemplates', color: Colors.primary },
      { label: 'Delivery Log', icon: Inbox, route: 'WhatsAppWebhook', color: Colors.primary },
    ],
  },
  {
    title: 'SOCIAL MEDIA',
    items: [
      { label: 'Social Planner', icon: CalendarDays, route: 'SocialMediaPlanner', color: Colors.secondary },
      { label: 'Content Calendar', icon: CalendarRange, route: 'SocialMediaCalendar', color: Colors.secondary },
    ],
  },
  {
    title: 'CONTENT',
    items: [
      { label: 'Blogs', icon: PenLine, route: 'Blogs', color: Colors.accent },
      { label: 'Newsletter', icon: Mail, route: 'Newsletter', color: Colors.accent },
      { label: 'Announcements', icon: Megaphone, route: 'Announcements', color: Colors.accent },
    ],
  },
  {
    title: 'SUPPORT & HR',
    items: [
      { label: 'Support Tickets', icon: Headphones, route: 'Support', color: Colors.warning },
      { label: 'Careers', icon: Briefcase, route: 'Careers', color: Colors.warning },
      { label: 'About Us Team', icon: Users, route: 'AboutTeam', color: Colors.warning },
      { label: 'Developers', icon: Code2, route: 'Developers', color: Colors.warning },
    ],
  },
  {
    title: 'MEDIA',
    items: [
      { label: 'Work Gallery', icon: ImageIcon, route: 'WorkGallery', color: Colors.gray700 },
      { label: 'Photos', icon: Camera, route: 'Photos', color: Colors.gray700 },
      { label: 'Reels', icon: Film, route: 'Reels', color: Colors.gray700 },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      { label: 'Profile', icon: User, route: 'Profile', color: Colors.gray900 },
      { label: 'Settings', icon: SettingsIcon, route: 'Settings', color: Colors.gray900 },
      { label: 'Login Users', icon: KeyRound, route: 'Users', color: Colors.gray900 },
      { label: 'Client Portal', icon: FolderOpen, route: 'ClientPortal', color: Colors.gray900 },
      { label: 'Trash', icon: Trash2, route: 'Trash', color: Colors.destructive },
      { label: 'ERP Console', icon: Zap, route: 'ERPConsole', color: Colors.gray900 },
    ],
  },
];

const MoreHomeScreen = () => {
  const navigation = useNavigation<Nav>();

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        {SECTIONS.map(section => (
          <View key={section.title}>
            <SectionHeader title={section.title} style={{ marginTop: Spacing.lg }} />
            {section.items.map(item => (
              <TouchableOpacity
                key={item.route}
                onPress={() => navigation.navigate(item.route as any)}
                activeOpacity={0.85}
              >
                <Card
                  style={[styles.row, { borderLeftColor: item.color, borderLeftWidth: 6 }]}
                  shadow="sm"
                >
                  <Row justify="space-between" align="center">
                    <Row align="center" gap={Spacing.md} style={{ flex: 1 }}>
                      <item.icon size={22} color={item.color} />
                      <Text style={styles.rowLabel}>{item.label}</Text>
                    </Row>
                    <ChevronRight size={20} color={item.color} />
                  </Row>
                </Card>
              </TouchableOpacity>
            ))}
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
  row: { marginBottom: Spacing.sm, padding: Spacing.md },
  rowLabel: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
});

export default MoreHomeScreen;
