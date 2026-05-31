import '@/global.css';
import { ClerkProvider, useAuth, useUser } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, usePathname, useGlobalSearchParams } from "expo-router";
import { useEffect, useRef } from 'react';
import { PostHogProvider } from 'posthog-react-native';
import { posthog } from '../src/config/posthog';
SplashScreen.preventAutoHideAsync()

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

 function RootLayoutContent() {
    const { isLoaded: authLoaded } = useAuth();
    const { user } = useUser();
    const pathname = usePathname();
    const params = useGlobalSearchParams();
    const previousPathname = useRef<string | undefined>(undefined);

  const [fontsLoaded] = useFonts({
    'sans-regular': require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
    'sans-bold': require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
    'sans-medium': require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
    'sans-semibold': require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    'sans-extrabold': require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
    'sans-light': require('../assets/fonts/PlusJakartaSans-Light.ttf')
  })


  useEffect(() => {
    // Hide splash only when both fonts and auth are loaded
    if (fontsLoaded && authLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, authLoaded])

  // Identify user in PostHog when auth state changes
  useEffect(() => {
    if (user) {
      posthog.identify(user.id, {
        $set: {
          email: user.primaryEmailAddress?.emailAddress ?? null,
          name: user.fullName ?? null,
        },
        $set_once: {
          first_seen: new Date().toISOString(),
        },
      })
    } else if (authLoaded) {
      posthog.reset()
    }
  }, [user, authLoaded])

  // Manual screen tracking for Expo Router
  useEffect(() => {
    if (previousPathname.current !== pathname) {
      posthog.screen(pathname, {
        previous_screen: previousPathname.current ?? null,
        ...params,
      })
      previousPathname.current = pathname
    }
  }, [pathname, params])

  // Don't render app until both are ready
  if (!fontsLoaded || !authLoaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <PostHogProvider
        client={posthog}
        autocapture={{
          captureScreens: false,
          captureTouches: true,
          propsToCapture: ['testID'],
        }}
      >
        <RootLayoutContent />
      </PostHogProvider>
    </ClerkProvider>
  );
}
