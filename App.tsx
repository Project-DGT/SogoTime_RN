import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';
import RootStack from './src/navigation';
import { enableScreens } from 'react-native-screens';
import notifee from '@notifee/react-native';

async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    console.log(enabled);
    

    if (enabled) {
        console.log('FCM 권한 허용:', authStatus? "허용됨" : "거부됨");
    } else {
        console.log('FCM 권한 거부');
    }
}

// Enable screens before any React Native components are rendered
enableScreens(true);

function App(): React.JSX.Element {
  useEffect(() => {
    const setupMessaging = async () => {
      try {
        await requestUserPermission();
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
    await notifee.requestPermission();
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
      // 알림 채널을 생성합니다.
      // console.log(`${remoteMessage.notification?.title} ${remoteMessage.notification?.body}`);
      try {
        const channelId = await notifee.createChannel({
            id: 'sogoTime',
            name: 'sogotime Channel',
        });
        

        // 디바이스에 알림을 표시합니다.
        await notifee.displayNotification({
            title: "시간표가 변경되었습니다.",
            body: "1교시 국어 -> 수학, 5교시 수학 -> 국어",
            android: {
                channelId: channelId,
                smallIcon: 'ic_launcher',
            },
        });
      } catch (error) {
        console.error('Error displaying notification:', error);
      }
    });
  };

  return (
    <SafeAreaProvider>
      <RootStack />
    </SafeAreaProvider>
  );
}

export default App;
