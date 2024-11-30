import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';
import RootStack from './src/navigation';
import { enableScreens } from 'react-native-screens';

// Enable screens before any React Native components are rendered
enableScreens(true);

function App(): React.JSX.Element {
  useEffect(() => {
    const setupMessaging = async () => {
      try {
        await getFcmToken();
        const unsubscribe = subscribe();

        return () => {
          // Properly unsubscribe from messaging
          unsubscribe();
        };
      } catch (error) {
        console.error('Messaging setup error:', error);
      }
    };

    setupMessaging();
  }, []);

  const getFcmToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      console.log('[+] FCM Token :: ', fcmToken);
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };

  const subscribe = () => {
    return messaging().onMessage(async remoteMessage => {
      console.log('[+] Remote Message ', JSON.stringify(remoteMessage));
    });
  };

  return (
    <SafeAreaProvider>
      <RootStack />
    </SafeAreaProvider>
  );
}

export default App;
