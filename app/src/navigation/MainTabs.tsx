import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Wallet,
  MoreHorizontal,
  LucideIcon,
} from 'lucide-react-native';
import { BottomTabParams } from './types';
import { Colors, Typography, Border, Shadows } from '../theme';
import HomeStack from './HomeStack';
import CRMStack from './CRMStack';
import OperationsStack from './OperationsStack';
import FinanceStack from './FinanceStack';
import MoreStack from './MoreStack';

const Tab = createBottomTabNavigator<BottomTabParams>();

const TabIcon = ({
  label,
  Icon,
  focused,
}: {
  label: string;
  Icon: LucideIcon;
  focused: boolean;
}) => (
  <View style={[styles.tabItem, focused && styles.tabItemActive]}>
    <Icon size={20} color={focused ? Colors.primary : Colors.gray400} />
    <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
      {label}
    </Text>
  </View>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: styles.tabBar,
      tabBarShowLabel: false,
    }}
  >
    <Tab.Screen
      name="HomeTab"
      component={HomeStack}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon label="Home" Icon={LayoutDashboard} focused={focused} />
        ),
      }}
    />
    <Tab.Screen
      name="CRMTab"
      component={CRMStack}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon label="CRM" Icon={Users} focused={focused} />
        ),
      }}
    />
    <Tab.Screen
      name="OperationsTab"
      component={OperationsStack}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon label="Work" Icon={Briefcase} focused={focused} />
        ),
      }}
    />
    <Tab.Screen
      name="FinanceTab"
      component={FinanceStack}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon label="Finance" Icon={Wallet} focused={focused} />
        ),
      }}
    />
    <Tab.Screen
      name="MoreTab"
      component={MoreStack}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon label="More" Icon={MoreHorizontal} focused={focused} />
        ),
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    borderTopWidth: Border.width,
    borderTopColor: Colors.border,
    height: 64,
    paddingBottom: 6,
    paddingTop: 4,
    ...Shadows.sm,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: Border.radius,
    minWidth: 58,
  },
  tabItemActive: {},
  tabLabel: {
    fontSize: 10,
    fontWeight: Typography.medium,
    color: Colors.gray400,
    marginTop: 3,
  },
  tabLabelActive: { color: Colors.primary },
});

export default MainTabs;
