import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Landing" }} />
      <Stack.Screen name="login" options={{ headerTitle: "Login" }} />
      <Stack.Screen name="signup" options={{ headerTitle: "Sign Up" }} />
      <Stack.Screen name="all-work-spaces" />
      <Stack.Screen name="individual-workspace" />
      <Stack.Screen name="create-workspace" />
      <Stack.Screen name="scanner-page" />
    </Stack>
  );
}
