import React from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { setTelemetryUser, trackScreen } from '../telemetry';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { RootStackParams } from './types';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import { LoadingSpinner } from '../components/common';

const Stack = createNativeStackNavigator<RootStackParams>();

const navRef = createNavigationContainerRef();
const trackCurrent = () => trackScreen(navRef.getCurrentRoute()?.name);

const RootNavigator = () => {
  const { user, loading } = useAuth();

  React.useEffect(() => setTelemetryUser(user?.id), [user?.id]);

  if (loading) return <LoadingSpinner />;

  return (
    <NavigationContainer
      ref={navRef}
      onReady={trackCurrent}
      onStateChange={trackCurrent}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
