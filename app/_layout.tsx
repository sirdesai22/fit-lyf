import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { supabase } from '@/lib/initSupabase';
import { useColorScheme } from '@/hooks/useColorScheme';
import { PaperProvider } from 'react-native-paper';

SplashScreen.preventAutoHideAsync();

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const router = useRouter();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const inAuthGroup = segments[0] === '(auth)';
      
      if (session && inAuthGroup) {
        // Redirect authenticated users to the main app
        router.replace('/(tabs)');
      } else if (!session && !inAuthGroup) {
        // Redirect unauthenticated users to the login page
        router.replace('/auth/login');
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      const inAuthGroup = segments[0] === '(auth)';
      
      if (session && inAuthGroup) {
        // Redirect authenticated users to the main app
        router.replace('/(tabs)');
      } else if (!session && !inAuthGroup) {
        // Redirect unauthenticated users to the login page
        router.replace('/auth/login');
      }
    });
  }, [segments]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
    <ThemeProvider value={DarkTheme}>
      <Slot /> {/* This renders the nested routes like (tabs)/_layout.tsx */}
      <StatusBar style="light" translucent={false} />
    </ThemeProvider>
    </PaperProvider>
  );
}
