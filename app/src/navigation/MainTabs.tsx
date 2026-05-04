import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
  iconName,
  focused,
}: {
  label: string;
  iconName: string;
  focused: boolean;
}) => (
  <View style={[styles.tabItem, focused && styles.tabItemActive]}>
    <Icon
      name={iconName}
      size={22}
      color={focused ? Colors.primary : Colors.gray400}
    />
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
          <TabIcon label="HOME" iconName="view-dashboard" focused={focused} />
        ),
      }}
    />
    <Tab.Screen
      name="CRMTab"
      component={CRMStack}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon label="CRM" iconName="account-group" focused={focused} />
        ),
      }}
    />
    <Tab.Screen
      name="OperationsTab"
      component={OperationsStack}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon label="WORK" iconName="briefcase" focused={focused} />
        ),
      }}
    />
    <Tab.Screen
      name="FinanceTab"
      component={FinanceStack}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon label="FINANCE" iconName="wallet" focused={focused} />
        ),
      }}
    />
    <Tab.Screen
      name="MoreTab"
      component={MoreStack}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon
            label="MORE"
            iconName="dots-horizontal-circle"
            focused={focused}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    borderTopWidth: Border.widthBold,
    borderTopColor: Colors.border,
    height: 72,
    paddingBottom: 8,
    paddingTop: 4,
    ...Shadows.lg,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: Border.radius,
    minWidth: 58,
  },
  tabItemActive: {
    backgroundColor: Colors.white,
    borderWidth: Border.width,
    borderColor: Colors.white,
  },
  tabLabel: {
    fontSize: 8,
    fontWeight: Typography.bold,
    color: Colors.gray400,
    marginTop: 3,
    letterSpacing: 0.5,
  },
  tabLabelActive: { color: Colors.primary },
});

export default MainTabs;
