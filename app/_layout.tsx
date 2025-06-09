import { Stack } from "expo-router";
import { NavigationContainer } from '@react-navigation/native';
import { LanguageProvider } from '@/src/context/language-context';

export default function RootLayout() {
    return (
        <LanguageProvider>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="+not-found" />
                </Stack>
        </LanguageProvider>
    );
}