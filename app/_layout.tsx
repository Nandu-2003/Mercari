import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Montserrat_Thin : require('../assets/fonts/Montserrat-Thin.ttf'),
    Montserrat_ExtraLight : require('../assets/fonts/Montserrat-ExtraLight.ttf'),
    Montserrat_Light : require('../assets/fonts/Montserrat-Light.ttf'),
    Montserrat_Regular : require('../assets/fonts/Montserrat-Regular.ttf'),
    Montserrat_Medium : require('../assets/fonts/Montserrat-Medium.ttf'),
    Montserrat_SemiBold : require('../assets/fonts/Montserrat-SemiBold.ttf'),
    Montserrat_Bold : require('../assets/fonts/Montserrat-Bold.ttf'),
    Montserrat_ExtraBold : require('../assets/fonts/Montserrat-ExtraBold.ttf'),
    Montserrat_Black : require('../assets/fonts/Montserrat-Black.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
