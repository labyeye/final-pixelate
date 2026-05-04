import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParams } from './types';
import { Colors, Typography, Border } from '../theme';
import DashboardScreen from '../screens/home/DashboardScreen';
import AnalyticsScreen from '../screens/home/AnalyticsScreen';
import ReportsScreen from '../screens/home/ReportsScreen';
import UserActivityScreen from '../screens/home/UserActivityScreen';
import ProfileScreen from '../screens/more/ProfileScreen';

const Stack = createNativeStackNavigator<HomeStackParams>();

const HomeStack = () => (
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
      name="Dashboard"
      component={DashboardScreen}
      options={{ title: 'PIXELATE NEST' }}
    />
    <Stack.Screen
      name="Analytics"
      component={AnalyticsScreen}
      options={{ title: 'ANALYTICS' }}
    />
    <Stack.Screen
      name="Reports"
      component={ReportsScreen}
      options={{ title: 'REPORTS' }}
    />
    <Stack.Screen
      name="UserActivity"
      component={UserActivityScreen}
      options={{ title: 'USER ACTIVITY' }}
    />
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ title: 'PROFILE' }}
    />
  </Stack.Navigator>
);

export default HomeStack;
