import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FinanceStackParams } from './types';
import { stackScreenOptions } from '../theme';
import FinanceHomeScreen from '../screens/finance/FinanceHomeScreen';
import InvoicingScreen from '../screens/finance/InvoicingScreen';
import InvoiceDetailScreen from '../screens/finance/InvoiceDetailScreen';
import PaymentsScreen from '../screens/finance/PaymentsScreen';
import ExpensesScreen from '../screens/finance/ExpensesScreen';
import EMITrackerScreen from '../screens/finance/EMITrackerScreen';
import QuotationsScreen from '../screens/sales/QuotationsScreen';
import QuotationDetailScreen from '../screens/sales/QuotationDetailScreen';
import OnboardingScreen from '../screens/sales/OnboardingScreen';
import NDAApprovalScreen from '../screens/sales/NDAApprovalScreen';

const Stack = createNativeStackNavigator<FinanceStackParams>();

const FinanceStack = () => (
  <Stack.Navigator
    screenOptions={stackScreenOptions}
  >
    <Stack.Screen
      name="FinanceHome"
      component={FinanceHomeScreen}
      options={{ title: 'Finance' }}
    />
    <Stack.Screen
      name="Invoicing"
      component={InvoicingScreen}
      options={{ title: 'Invoicing' }}
    />
    <Stack.Screen
      name="InvoiceDetail"
      component={InvoiceDetailScreen}
      options={{ title: 'Invoice' }}
    />
    <Stack.Screen
      name="Payments"
      component={PaymentsScreen}
      options={{ title: 'Payments' }}
    />
    <Stack.Screen
      name="Expenses"
      component={ExpensesScreen}
      options={{ title: 'Expenses' }}
    />
    <Stack.Screen
      name="EMITracker"
      component={EMITrackerScreen}
      options={{ title: 'EMI Tracker' }}
    />
    <Stack.Screen
      name="Quotations"
      component={QuotationsScreen}
      options={{ title: 'Quotations' }}
    />
    <Stack.Screen
      name="QuotationDetail"
      component={QuotationDetailScreen}
      options={{ title: 'Quotation' }}
    />
    <Stack.Screen
      name="Onboarding"
      component={OnboardingScreen}
      options={{ title: 'Onboarding' }}
    />
    <Stack.Screen
      name="NDAApproval"
      component={NDAApprovalScreen}
      options={{ title: 'NDA Approval' }}
    />
  </Stack.Navigator>
);

export default FinanceStack;
