import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MoreStackParams } from './types';
import { stackScreenOptions } from '../theme';
import MoreHomeScreen from '../screens/more/MoreHomeScreen';
import WhatsAppInboxScreen from '../screens/marketing/WhatsAppInboxScreen';
import BulkMessagingScreen from '../screens/marketing/BulkMessagingScreen';
import CampaignsScreen from '../screens/marketing/CampaignsScreen';
import WhatsAppTemplatesScreen from '../screens/marketing/WhatsAppTemplatesScreen';
import WhatsAppWebhookScreen from '../screens/marketing/WhatsAppWebhookScreen';
import SocialMediaPlannerScreen from '../screens/marketing/SocialMediaPlannerScreen';
import SocialMediaCalendarScreen from '../screens/marketing/SocialMediaCalendarScreen';
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
import BrandGuideScreen from '../screens/more/BrandGuideScreen';
import WhatsAppSendScreen from '../screens/marketing/WhatsAppSendScreen';
import ProductSubscriptionsScreen from '../screens/products/ProductSubscriptionsScreen';
import ProductInvoicesScreen from '../screens/products/ProductInvoicesScreen';
import ProductOffersScreen from '../screens/products/ProductOffersScreen';
import ProductSupportScreen from '../screens/products/ProductSupportScreen';
import { PRODUCT_NAME } from '../screens/products/shared';

const Stack = createNativeStackNavigator<MoreStackParams>();

const MoreStack = () => (
  <Stack.Navigator
    screenOptions={stackScreenOptions}
  >
    <Stack.Screen
      name="MoreHome"
      component={MoreHomeScreen}
      options={{ title: 'More' }}
    />
    <Stack.Screen
      name="WhatsAppInbox"
      component={WhatsAppInboxScreen}
      options={{ title: 'WhatsApp Inbox' }}
    />
    <Stack.Screen
      name="BulkMessaging"
      component={BulkMessagingScreen}
      options={{ title: 'Bulk Messaging' }}
    />
    <Stack.Screen
      name="Campaigns"
      component={CampaignsScreen}
      options={{ title: 'Campaigns' }}
    />
    <Stack.Screen
      name="WhatsAppTemplates"
      component={WhatsAppTemplatesScreen}
      options={{ title: 'WA Templates' }}
    />
    <Stack.Screen
      name="WhatsAppWebhook"
      component={WhatsAppWebhookScreen}
      options={{ title: 'WA Delivery Log' }}
    />
    <Stack.Screen
      name="SocialMediaPlanner"
      component={SocialMediaPlannerScreen}
      options={{ title: 'Social Media' }}
    />
    <Stack.Screen
      name="SocialMediaCalendar"
      component={SocialMediaCalendarScreen}
      options={{ title: 'Content Calendar' }}
    />
    <Stack.Screen
      name="Blogs"
      component={BlogsScreen}
      options={{ title: 'Blogs' }}
    />
    <Stack.Screen
      name="BlogDetail"
      component={BlogDetailScreen}
      options={{ title: 'Blog' }}
    />
    <Stack.Screen
      name="Newsletter"
      component={NewsletterScreen}
      options={{ title: 'Newsletter' }}
    />
    <Stack.Screen
      name="Announcements"
      component={AnnouncementsScreen}
      options={{ title: 'Announcements' }}
    />
    <Stack.Screen
      name="Support"
      component={SupportScreen}
      options={{ title: 'Support' }}
    />
    <Stack.Screen
      name="SupportDetail"
      component={SupportDetailScreen}
      options={{ title: 'Ticket' }}
    />
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{ title: 'Settings' }}
    />
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ title: 'Profile' }}
    />
    <Stack.Screen
      name="Careers"
      component={CareersScreen}
      options={{ title: 'Careers' }}
    />
    <Stack.Screen
      name="CareerDetail"
      component={CareerDetailScreen}
      options={{ title: 'Job Posting' }}
    />
    <Stack.Screen
      name="AboutTeam"
      component={AboutTeamScreen}
      options={{ title: 'About Us Team' }}
    />
    <Stack.Screen
      name="Developers"
      component={DevelopersScreen}
      options={{ title: 'Developers' }}
    />
    <Stack.Screen
      name="WorkGallery"
      component={WorkGalleryScreen}
      options={{ title: 'Work Gallery' }}
    />
    <Stack.Screen
      name="Photos"
      component={PhotosScreen}
      options={{ title: 'Photos' }}
    />
    <Stack.Screen
      name="Reels"
      component={ReelsScreen}
      options={{ title: 'Reels' }}
    />
    <Stack.Screen
      name="Trash"
      component={TrashScreen}
      options={{ title: 'Trash' }}
    />
    <Stack.Screen
      name="ERPConsole"
      component={ERPConsoleScreen}
      options={{ title: 'ERP Console' }}
    />
    <Stack.Screen
      name="Users"
      component={UsersScreen}
      options={{ title: 'Login Users' }}
    />
    <Stack.Screen
      name="ClientPortal"
      component={ClientPortalScreen}
      options={{ title: 'Client Portal' }}
    />
    <Stack.Screen
      name="BrandGuide"
      component={BrandGuideScreen}
      options={{ title: 'Brand Guides' }}
    />
    <Stack.Screen
      name="WhatsAppSend"
      component={WhatsAppSendScreen}
      options={{ title: 'Send WhatsApp' }}
    />
    <Stack.Screen
      name="ProductSubscriptions"
      component={ProductSubscriptionsScreen}
      options={({ route }) => ({ title: `${PRODUCT_NAME[route.params.product]} Subscriptions` })}
    />
    <Stack.Screen
      name="ProductInvoices"
      component={ProductInvoicesScreen}
      options={({ route }) => ({ title: `${PRODUCT_NAME[route.params.product]} Invoices` })}
    />
    <Stack.Screen
      name="ProductOffers"
      component={ProductOffersScreen}
      options={({ route }) => ({
        title: `${PRODUCT_NAME[route.params.product]} ${route.params.product === 'play' ? 'Coupons' : 'Offer Codes'}`,
      })}
    />
    <Stack.Screen
      name="ProductSupport"
      component={ProductSupportScreen}
      options={({ route }) => ({ title: `${PRODUCT_NAME[route.params.product]} Support` })}
    />
  </Stack.Navigator>
);

export default MoreStack;
