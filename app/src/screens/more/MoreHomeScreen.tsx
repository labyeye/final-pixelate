import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, SectionHeader } from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';
import { MoreStackParams } from '../../navigation/types';

type Nav = NativeStackNavigationProp<MoreStackParams>;

const SECTIONS = [
  {
    title: 'WHATSAPP MARKETING',
    items: [
      {
        label: 'WhatsApp Inbox',
        emoji: '\u{1F4AC}',
        route: 'WhatsAppInbox',
        color: '#25D366',
      },
      {
        label: 'Bulk Messaging',
        emoji: '\u{1F4E4}',
        route: 'BulkMessaging',
        color: '#128C7E',
      },
      {
        label: 'Campaign Insights',
        emoji: '\u{1F4CA}',
        route: 'Campaigns',
        color: '#075E54',
      },
      {
        label: 'WA Templates',
        emoji: '\u{1F4DD}',
        route: 'WhatsAppTemplates',
        color: '#25D366',
      },
      {
        label: 'Delivery Log',
        emoji: '\u{1F4E8}',
        route: 'WhatsAppWebhook',
        color: '#128C7E',
      },
    ],
  },
  {
    title: 'SOCIAL MEDIA',
    items: [
      {
        label: 'SM Manager',
        emoji: '\u{1F4CB}',
        route: 'SocialMediaManager',
        color: Colors.secondary,
      },
      {
        label: 'Social Planner',
        emoji: '\u{1F4C5}',
        route: 'SocialMediaPlanner',
        color: Colors.accent,
      },
      {
        label: 'Content Calendar',
        emoji: '\u{1F5D3}',
        route: 'SocialMediaCalendar',
        color: Colors.primary,
      },
    ],
  },
  {
    title: 'CONTENT',
    items: [
      { label: 'Blogs', emoji: '✍️', route: 'Blogs', color: Colors.secondary },
      {
        label: 'Newsletter',
        emoji: '\u{1F4E7}',
        route: 'Newsletter',
        color: Colors.accent,
      },
      {
        label: 'Announcements',
        emoji: '\u{1F4E2}',
        route: 'Announcements',
        color: Colors.warning,
      },
    ],
  },
  {
    title: 'SUPPORT & HR',
    items: [
      {
        label: 'Support Tickets',
        emoji: '\u{1F3A7}',
        route: 'Support',
        color: Colors.primary,
      },
      { label: 'Careers', emoji: '\u{1F454}', route: 'Careers', color: Colors.accent },
      {
        label: 'About Us Team',
        emoji: '\u{1F465}',
        route: 'AboutTeam',
        color: Colors.secondary,
      },
      {
        label: 'Developers',
        emoji: '\u{1F4BB}',
        route: 'Developers',
        color: Colors.gray700,
      },
    ],
  },
  {
    title: 'MEDIA',
    items: [
      {
        label: 'Work Gallery',
        emoji: '\u{1F5BC}️',
        route: 'WorkGallery',
        color: Colors.secondary,
      },
      { label: 'Photos', emoji: '\u{1F4F7}', route: 'Photos', color: Colors.accent },
      {
        label: 'Reels',
        emoji: '\u{1F3AC}',
        route: 'Reels',
        color: Colors.destructive,
      },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      {
        label: 'Profile',
        emoji: '\u{1F464}',
        route: 'Profile',
        color: Colors.primary,
      },
      {
        label: 'Settings',
        emoji: '⚙️',
        route: 'Settings',
        color: Colors.gray700,
      },
      {
        label: 'Login Users',
        emoji: '\u{1F511}',
        route: 'Users',
        color: Colors.primary,
      },
      {
        label: 'Client Portal',
        emoji: '\u{1F4C2}',
        route: 'ClientPortal',
        color: Colors.accent,
      },
      {
        label: 'Trash',
        emoji: '\u{1F5D1}️',
        route: 'Trash',
        color: Colors.destructive,
      },
      {
        label: 'ERP Console',
        emoji: '⚡',
        route: 'ERPConsole',
        color: Colors.gray900,
      },
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
            <SectionHeader
              title={section.title}
              style={{ marginTop: Spacing.lg }}
            />
            <View style={styles.grid}>
              {section.items.map(item => (
                <TouchableOpacity
                  key={item.route}
                  style={[
                    styles.gridItem,
                    { borderTopColor: item.color, borderTopWidth: 4 },
                  ]}
                  onPress={() => navigation.navigate(item.route as any)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.gridEmoji}>{item.emoji}</Text>
                  <Text style={styles.gridLabel}>{item.label}</Text>
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
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  gridItem: {
    backgroundColor: Colors.white,
    borderWidth: Border.widthBold,
    borderColor: Colors.border,
    padding: Spacing.md,
    width: '47%',
    alignItems: 'center',
    ...Shadows.sm,
  },
  gridEmoji: { fontSize: 28, marginBottom: 8 },
  gridLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.foreground,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
});

export default MoreHomeScreen;
