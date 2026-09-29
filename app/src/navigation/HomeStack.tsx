import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParams } from './types';
import { stackScreenOptions } from '../theme';
import DashboardScreen from '../screens/home/DashboardScreen';
import AnalyticsScreen from '../screens/home/AnalyticsScreen';
import ReportsScreen from '../screens/home/ReportsScreen';
import UserActivityScreen from '../screens/home/UserActivityScreen';
import ProfileScreen from '../screens/more/ProfileScreen';

const Stack = createNativeStackNavigator<HomeStackParams>();

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={stackScreenOptions}
  >
    <Stack.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{ title: 'Pixelate Nest' }}
    />
    <Stack.Screen
      name="Analytics"
      component={AnalyticsScreen}
      options={{ title: 'Analytics' }}
    />
    <Stack.Screen
      name="Reports"
      component={ReportsScreen}
      options={{ title: 'Reports' }}
    />
    <Stack.Screen
      name="UserActivity"
      component={UserActivityScreen}
      options={{ title: 'User Activity' }}
    />
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ title: 'Profile' }}
    />
  </Stack.Navigator>
);

export default HomeStack;
