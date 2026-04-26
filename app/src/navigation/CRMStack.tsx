import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CRMStackParams } from './types';
import { Colors, Typography } from '../theme';
import CRMHomeScreen from '../screens/crm/CRMHomeScreen';
import LeadsScreen from '../screens/crm/LeadsScreen';
import LeadDetailScreen from '../screens/crm/LeadDetailScreen';
import ClientsScreen from '../screens/crm/ClientsScreen';
import ClientDetailScreen from '../screens/crm/ClientDetailScreen';
import EnquiriesScreen from '../screens/crm/EnquiriesScreen';
import ReviewsScreen from '../screens/crm/ReviewsScreen';

const Stack = createNativeStackNavigator<CRMStackParams>();

const CRMStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: Colors.primary },
      headerTintColor: Colors.white,
      headerTitleStyle: { fontWeight: Typography.black, fontSize: Typography.lg },
      headerShadowVisible: false,
      contentStyle: { backgroundColor: Colors.background },
    }}>
    <Stack.Screen name="CRMHome" component={CRMHomeScreen} options={{ title: 'CRM' }} />
    <Stack.Screen name="Leads" component={LeadsScreen} options={{ title: 'LEADS' }} />
    <Stack.Screen name="LeadDetail" component={LeadDetailScreen} options={{ title: 'LEAD DETAIL' }} />
    <Stack.Screen name="Clients" component={ClientsScreen} options={{ title: 'CLIENTS' }} />
    <Stack.Screen name="ClientDetail" component={ClientDetailScreen} options={{ title: 'CLIENT DETAIL' }} />
    <Stack.Screen name="Enquiries" component={EnquiriesScreen} options={{ title: 'ENQUIRIES' }} />
    <Stack.Screen name="Reviews" component={ReviewsScreen} options={{ title: 'REVIEWS' }} />
  </Stack.Navigator>
);

export default CRMStack;
