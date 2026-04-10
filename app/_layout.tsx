import { Stack } from "expo-router";
import "./globals.css";

import { SavedMoviesProvider } from "@/context/SavedMoviesContext";

export default function RootLayout() {
  return (
    <SavedMoviesProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      </Stack>
    </SavedMoviesProvider>
  );
}
