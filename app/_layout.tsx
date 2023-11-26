import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { ToastProvider } from 'react-native-toast-notifications';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { PaperProvider, Text } from 'react-native-paper';
import { View } from '../components/Themed';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const queryClient = new QueryClient();
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <ToastProvider>
          <RootLayoutNav />
        </ToastProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}
      >
        <Stack initialRouteName="index">
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="search" options={{ headerShown: false }} />

          <Stack.Screen
            name="signup"
            options={{ headerShown: false, presentation: 'modal' }}
          />
          <Stack.Screen name="cart" options={{ headerShown: false }} />
          <Stack.Screen name="forgot" options={{ headerShown: false }} />
          <Stack.Screen name="updateProfile" options={{ headerShown: false }} />
          <Stack.Screen
            name="updatePassword"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="product/[productId]"
            options={{ headerShown: false }}
          />
        </Stack>
      </SafeAreaView>
    </ThemeProvider>
  );
}
