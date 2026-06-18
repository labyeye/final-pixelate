import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MoreStackParams } from './types';
import { Colors, Typography } from '../theme';
import MoreHomeScreen from '../screens/more/MoreHomeScreen';
import WhatsAppInboxScreen from '../screens/marketing/WhatsAppInboxScreen';
import BulkMessagingScreen from '../screens/marketing/BulkMessagingScreen';
import CampaignsScreen from '../screens/marketing/CampaignsScreen';
import WhatsAppTemplatesScreen from '../screens/marketing/WhatsAppTemplatesScreen';
import WhatsAppWebhookScreen from '../screens/marketing/WhatsAppWebhookScreen';
import SocialMediaPlannerScreen from '../screens/marketing/SocialMediaPlannerScreen';
import SocialMediaCalendarScreen from '../screens/marketing/SocialMediaCalendarScreen';
import SocialMediaManagerScreen from '../screens/marketing/SocialMediaManagerScreen';
import BlogsScreen from '../screens/marketing/BlogsScreen';
import BlogDetailScreen from '../screens/marketing/BlogDetailScreen';
import NewsletterScreen from '../screens/marketing/NewsletterScreen';
import AnnouncementsScreen from '../screens/marketing/AnnouncementsScreen';
import SupportScreen from '../screens/more/SupportScreen';
import SupportDetailScreen from '../screens/more/SupportDetailScreen';
import SettingsScreen from '../screens/more/SettingsScreen';
import ProfileScreen from '../screens/more/ProfileScreen';
import CareersScreen from '../screens/more/CareersScreen';
import CareerDetailScreen from '../screens/more/CareerDetailScreen';
import AboutTeamScreen from '../screens/more/AboutTeamScreen';
import DevelopersScreen from '../screens/more/DevelopersScreen';
import WorkGalleryScreen from '../screens/more/WorkGalleryScreen';
import PhotosScreen from '../screens/more/PhotosScreen';
import ReelsScreen from '../screens/more/ReelsScreen';
import TrashScreen from '../screens/more/TrashScreen';
import ERPConsoleScreen from '../screens/more/ERPConsoleScreen';
import UsersScreen from '../screens/more/UsersScreen';
import ClientPortalScreen from '../screens/more/ClientPortalScreen';

const Stack = createNativeStackNavigator<MoreStackParams>();

const MoreStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: Colors.primary },
      headerTintColor: Colors.white,
      headerTitleStyle: {
        fontWeight: Typography.black,
        fontSize: Typography.lg,
      },
      headerShadowVisible: false,
      contentStyle: { backgroundColor: Colors.background },
    }}
  >
    <Stack.Screen
      name="MoreHome"
      component={MoreHomeScreen}
      options={{ title: 'MORE' }}
    />
    <Stack.Screen
      name="WhatsAppInbox"
      component={WhatsAppInboxScreen}
      options={{ title: 'WHATSAPP INBOX' }}
    />
    <Stack.Screen
      name="BulkMessaging"
      component={BulkMessagingScreen}
      options={{ title: 'BULK MESSAGING' }}
    />
    <Stack.Screen
      name="Campaigns"
      component={CampaignsScreen}
      options={{ title: 'CAMPAIGNS' }}
    />
    <Stack.Screen
      name="WhatsAppTemplates"
      component={WhatsAppTemplatesScreen}
      options={{ title: 'WA TEMPLATES' }}
    />
    <Stack.Screen
      name="WhatsAppWebhook"
      component={WhatsAppWebhookScreen}
      options={{ title: 'WA DELIVERY LOG' }}
    />
    <Stack.Screen
      name="SocialMediaPlanner"
      component={SocialMediaPlannerScreen}
      options={{ title: 'SOCIAL MEDIA' }}
    />
    <Stack.Screen
      name="SocialMediaCalendar"
      component={SocialMediaCalendarScreen}
      options={{ title: 'CONTENT CALENDAR' }}
    />
    <Stack.Screen
      name="SocialMediaManager"
      component={SocialMediaManagerScreen}
      options={{ title: 'SM MANAGER' }}
    />
    <Stack.Screen
      name="Blogs"
      component={BlogsScreen}
      options={{ title: 'BLOGS' }}
    />
    <Stack.Screen
      name="BlogDetail"
      component={BlogDetailScreen}
      options={{ title: 'BLOG' }}
    />
    <Stack.Screen
      name="Newsletter"
      component={NewsletterScreen}
      options={{ title: 'NEWSLETTER' }}
    />
    <Stack.Screen
      name="Announcements"
      component={AnnouncementsScreen}
      options={{ title: 'ANNOUNCEMENTS' }}
    />
    <Stack.Screen
      name="Support"
      component={SupportScreen}
      options={{ title: 'SUPPORT' }}
    />
    <Stack.Screen
      name="SupportDetail"
      component={SupportDetailScreen}
      options={{ title: 'TICKET' }}
    />
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{ title: 'SETTINGS' }}
    />
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ title: 'PROFILE' }}
    />
    <Stack.Screen
      name="Careers"
      component={CareersScreen}
      options={{ title: 'CAREERS' }}
    />
    <Stack.Screen
      name="CareerDetail"
      component={CareerDetailScreen}
      options={{ title: 'JOB POSTING' }}
    />
    <Stack.Screen
      name="AboutTeam"
      component={AboutTeamScreen}
      options={{ title: 'ABOUT US TEAM' }}
    />
    <Stack.Screen
      name="Developers"
      component={DevelopersScreen}
      options={{ title: 'DEVELOPERS' }}
    />
    <Stack.Screen
      name="WorkGallery"
      component={WorkGalleryScreen}
      options={{ title: 'WORK GALLERY' }}
    />
    <Stack.Screen
      name="Photos"
      component={PhotosScreen}
      options={{ title: 'PHOTOS' }}
    />
    <Stack.Screen
      name="Reels"
      component={ReelsScreen}
      options={{ title: 'REELS' }}
    />
    <Stack.Screen
      name="Trash"
      component={TrashScreen}
      options={{ title: 'TRASH' }}
    />
    <Stack.Screen
      name="ERPConsole"
      component={ERPConsoleScreen}
      options={{ title: 'ERP CONSOLE' }}
    />
    <Stack.Screen
      name="Users"
      component={UsersScreen}
      options={{ title: 'LOGIN USERS' }}
    />
    <Stack.Screen
      name="ClientPortal"
      component={ClientPortalScreen}
      options={{ title: 'CLIENT PORTAL' }}
    />
  </Stack.Navigator>
);

export default MoreStack;
