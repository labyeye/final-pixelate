import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OperationsStackParams } from './types';
import { Colors, Typography } from '../theme';
import OperationsHomeScreen from '../screens/operations/OperationsHomeScreen';
import ProjectsScreen from '../screens/operations/ProjectsScreen';
import ProjectDetailScreen from '../screens/operations/ProjectDetailScreen';
import TasksScreen from '../screens/operations/TasksScreen';
import JourneyScreen from '../screens/operations/JourneyScreen';
import InventoryScreen from '../screens/operations/InventoryScreen';
import ServicesScreen from '../screens/operations/ServicesScreen';
import TimelineScreen from '../screens/operations/TimelineScreen';

const Stack = createNativeStackNavigator<OperationsStackParams>();

const OperationsStack = () => (
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
      name="OperationsHome"
      component={OperationsHomeScreen}
      options={{ title: 'OPERATIONS' }}
    />
    <Stack.Screen
      name="Projects"
      component={ProjectsScreen}
      options={{ title: 'PROJECTS' }}
    />
    <Stack.Screen
      name="ProjectDetail"
      component={ProjectDetailScreen}
      options={{ title: 'PROJECT' }}
    />
    <Stack.Screen
      name="Tasks"
      component={TasksScreen}
      options={{ title: 'TASKS' }}
    />
    <Stack.Screen
      name="Journey"
      component={JourneyScreen}
      options={{ title: 'JOURNEY' }}
    />
    <Stack.Screen
      name="Inventory"
      component={InventoryScreen}
      options={{ title: 'INVENTORY' }}
    />
    <Stack.Screen
      name="Services"
      component={ServicesScreen}
      options={{ title: 'SERVICES' }}
    />
    <Stack.Screen
      name="Timeline"
      component={TimelineScreen}
      options={{ title: 'PROJECT TIMELINE' }}
    />
  </Stack.Navigator>
);

export default OperationsStack;
