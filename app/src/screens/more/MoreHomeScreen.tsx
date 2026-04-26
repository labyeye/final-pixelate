import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
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
      { label: 'WhatsApp Inbox', emoji: '💬', route: 'WhatsAppInbox', color: '#25D366' },
      { label: 'Bulk Messaging', emoji: '📤', route: 'BulkMessaging', color: '#128C7E' },
      { label: 'Campaign Insights', emoji: '📊', route: 'Campaigns', color: '#075E54' },
    ],
  },
  {
    title: 'SOCIAL MEDIA',
    items: [
      { label: 'Social Media Planner', emoji: '📅', route: 'SocialMediaPlanner', color: Colors.accent },
      { label: 'Content Calendar', emoji: '🗓️', route: 'SocialMediaCalendar', color: Colors.primary },
    ],
  },
  {
    title: 'CONTENT',
    items: [
      { label: 'Blogs', emoji: '✍️', route: 'Blogs', color: Colors.secondary },
      { label: 'Newsletter', emoji: '📧', route: 'Newsletter', color: Colors.accent },
      { label: 'Announcements', emoji: '📢', route: 'Announcements', color: Colors.warning },
    ],
  },
  {
    title: 'SUPPORT & HR',
    items: [
      { label: 'Support Tickets', emoji: '🎧', route: 'Support', color: Colors.primary },
      { label: 'Careers', emoji: '👔', route: 'Careers', color: Colors.accent },
      { label: 'About Us Team', emoji: '👥', route: 'AboutTeam', color: Colors.secondary },
      { label: 'Developers', emoji: '💻', route: 'Developers', color: Colors.gray700 },
    ],
  },
  {
    title: 'MEDIA',
    items: [
      { label: 'Work Gallery', emoji: '🖼️', route: 'WorkGallery', color: Colors.secondary },
      { label: 'Photos', emoji: '📷', route: 'Photos', color: Colors.accent },
      { label: 'Reels', emoji: '🎬', route: 'Reels', color: Colors.destructive },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      { label: 'Profile', emoji: '👤', route: 'Profile', color: Colors.primary },
      { label: 'Settings', emoji: '⚙️', route: 'Settings', color: Colors.gray700 },
      { label: 'Trash', emoji: '🗑️', route: 'Trash', color: Colors.destructive },
      { label: 'ERP Console', emoji: '⚡', route: 'ERPConsole', color: Colors.gray900 },
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
            <View style={styles.grid}>
              {section.items.map(item => (
                <TouchableOpacity
                  key={item.route}
                  style={[styles.gridItem, { borderTopColor: item.color, borderTopWidth: 4 }]}
                  onPress={() => navigation.navigate(item.route as any)}
                  activeOpacity={0.8}>
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
