import { Stack } from "expo-router";
import { useEffect } from "react";
import * as Linking from "expo-linking";
import { supabase } from "./lib/supabase";

export default function RootLayout() {
  useEffect(() => {
    // Handle deep links when app is opened from email
    const handleDeepLink = async (event: Linking.EventType) => {
      const url = event.url;
      console.log("Deep link received:", url);
      
      if (url.includes("reset-password")) {
        // Parse the URL to extract the tokens
        // The URL looks like: yourapp://reset-password#access_token=xxx&refresh_token=xxx&type=recovery
        
        const fragment = url.split("#")[1];
        if (fragment) {
          const params = new URLSearchParams(fragment);
          const access_token = params.get("access_token");
          const refresh_token = params.get("refresh_token");
          
          if (access_token && refresh_token) {
            // Set the session with the tokens
            const { error } = await supabase.auth.setSession({
              access_token,
              refresh_token,
            });
            
            if (error) {
              console.error("Error setting session:", error);
            } else {
              // Navigate to reset password screen
              // The navigation will happen automatically via the reset-password screen
              console.log("Session set successfully");
            }
          }
        }
      }
    };

    // Add event listener for deep links
    const subscription = Linking.addEventListener("url", handleDeepLink);

    // Check if app was opened from a deep link
    Linking.getInitialURL().then((url) => {
      if (url && url.includes("reset-password")) {
        handleDeepLink({ url } as Linking.EventType);
      }
    });

    // Cleanup
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Landing" }} />
      <Stack.Screen name="login" options={{ headerTitle: "Login" }} />
      <Stack.Screen name="signup" options={{ headerTitle: "Sign Up" }} />
      <Stack.Screen name="forgot-password" options={{ headerTitle: "Forgot Password" }} />
      <Stack.Screen name="reset-password" options={{ headerTitle: "Reset Password" }} />
    </Stack>
  );
}