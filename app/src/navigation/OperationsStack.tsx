import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OperationsStackParams } from './types';
import { stackScreenOptions } from '../theme';
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
    screenOptions={stackScreenOptions}
  >
    <Stack.Screen
      name="OperationsHome"
      component={OperationsHomeScreen}
      options={{ title: 'Operations' }}
    />
    <Stack.Screen
      name="Projects"
      component={ProjectsScreen}
      options={{ title: 'Projects' }}
    />
    <Stack.Screen
      name="ProjectDetail"
      component={ProjectDetailScreen}
      options={{ title: 'Project' }}
    />
    <Stack.Screen
      name="Tasks"
      component={TasksScreen}
      options={{ title: 'Tasks' }}
    />
    <Stack.Screen
      name="Journey"
      component={JourneyScreen}
      options={{ title: 'Journey' }}
    />
    <Stack.Screen
      name="Inventory"
      component={InventoryScreen}
      options={{ title: 'Inventory' }}
    />
    <Stack.Screen
      name="Services"
      component={ServicesScreen}
      options={{ title: 'Services' }}
    />
    <Stack.Screen
      name="Timeline"
      component={TimelineScreen}
      options={{ title: 'Project Timeline' }}
    />
  </Stack.Navigator>
);

export default OperationsStack;
