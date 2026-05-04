import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FinanceStackParams } from './types';
import { Colors, Typography } from '../theme';
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
      name="FinanceHome"
      component={FinanceHomeScreen}
      options={{ title: 'FINANCE' }}
    />
    <Stack.Screen
      name="Invoicing"
      component={InvoicingScreen}
      options={{ title: 'INVOICING' }}
    />
    <Stack.Screen
      name="InvoiceDetail"
      component={InvoiceDetailScreen}
      options={{ title: 'INVOICE' }}
    />
    <Stack.Screen
      name="Payments"
      component={PaymentsScreen}
      options={{ title: 'PAYMENTS' }}
    />
    <Stack.Screen
      name="Expenses"
      component={ExpensesScreen}
      options={{ title: 'EXPENSES' }}
    />
    <Stack.Screen
      name="EMITracker"
      component={EMITrackerScreen}
      options={{ title: 'EMI TRACKER' }}
    />
    <Stack.Screen
      name="Quotations"
      component={QuotationsScreen}
      options={{ title: 'QUOTATIONS' }}
    />
    <Stack.Screen
      name="QuotationDetail"
      component={QuotationDetailScreen}
      options={{ title: 'QUOTATION' }}
    />
    <Stack.Screen
      name="Onboarding"
      component={OnboardingScreen}
      options={{ title: 'ONBOARDING' }}
    />
    <Stack.Screen
      name="NDAApproval"
      component={NDAApprovalScreen}
      options={{ title: 'NDA APPROVAL' }}
    />
  </Stack.Navigator>
);

export default FinanceStack;
