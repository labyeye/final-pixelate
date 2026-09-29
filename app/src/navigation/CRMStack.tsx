import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CRMStackParams } from './types';
import { stackScreenOptions } from '../theme';
import CRMHomeScreen from '../screens/crm/CRMHomeScreen';
import ClientsScreen from '../screens/crm/ClientsScreen';
import ClientDetailScreen from '../screens/crm/ClientDetailScreen';
import EnquiriesScreen from '../screens/crm/EnquiriesScreen';
import ReviewsScreen from '../screens/crm/ReviewsScreen';

const Stack = createNativeStackNavigator<CRMStackParams>();

const CRMStack = () => (
  <Stack.Navigator
    screenOptions={stackScreenOptions}
  >
    <Stack.Screen
      name="CRMHome"
      component={CRMHomeScreen}
      options={{ title: 'CRM' }}
    />
    <Stack.Screen
      name="Clients"
      component={ClientsScreen}
      options={{ title: 'Clients' }}
    />
    <Stack.Screen
      name="ClientDetail"
      component={ClientDetailScreen}
      options={{ title: 'Client Detail' }}
    />
    <Stack.Screen
      name="Enquiries"
      component={EnquiriesScreen}
      options={{ title: 'Enquiries' }}
    />
    <Stack.Screen
      name="Reviews"
      component={ReviewsScreen}
      options={{ title: 'Reviews' }}
    />
  </Stack.Navigator>
);

export default CRMStack;
