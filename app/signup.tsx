import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { supabase } from "./lib/supabase";

export default function Signup() {
  // Get the account type from navigation params
  const params = useLocalSearchParams();
  const accountType = params.accountType as string;
  
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showReenterPassword, setShowReenterPassword] = useState(false);

  // Password validation states
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);

  const checkPasswordRequirements = (text: string) => {
    setPassword(text);
    
    // Check for uppercase letter
    setHasUpperCase(/[A-Z]/.test(text));
    
    // Check for special character (.,@,#,$,%)
    setHasSpecialChar(/[.,@#$%]/.test(text));
  };

  async function handleSignUp() {
    // Validate account type
    if (!accountType) {
      Alert.alert("Error", "No account type selected. Please go back and choose an account type.");
      return;
    }
    
    // Validate display name
    if (!displayName.trim()) {
      Alert.alert("Missing info", "Please enter your display name.");
      return;
    }
    
    // Validate email
    if (!email.trim()) {
      Alert.alert("Missing info", "Please enter your email.");
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }
    
    // Validate password
    if (!password) {
      Alert.alert("Missing info", "Please enter a password.");
      return;
    }
    
    // Check password requirements
    if (!hasUpperCase || !hasSpecialChar) {
      Alert.alert(
        "Weak Password", 
        "Password must contain at least 1 uppercase letter and 1 special character (.,@,#,$,%)"
      );
      return;
    }
    
    // Check password length
    if (password.length < 6) {
      Alert.alert("Weak Password", "Password must be at least 6 characters long.");
      return;
    }
    
    // Check if passwords match
    if (password !== reenterPassword) {
      Alert.alert("Password mismatch", "Passwords do not match. Please try again.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          display_name: displayName.trim(),
          account_type: accountType, // Save account type to user metadata
        },
      },
    });

    setLoading(false);

    if (error) {
      // Handle specific error cases
      if (error.message.includes("User already registered")) {
        Alert.alert(
          "Account exists", 
          "An account with this email already exists. Please log in instead.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Go to Login", onPress: () => router.push("/login") }
          ]
        );
      } else {
        Alert.alert("Signup error", error.message);
      }
      return;
    }

    // Check if email confirmation is required
    if (data.user && data.session) {
      // User is automatically signed in
      console.log("User created and signed in:", data.user);
      Alert.alert("Success", "Account created successfully!");
      router.replace("/all-work-spaces");
    } else if (data.user) {
      // Email confirmation required
      Alert.alert(
        "Check your email", 
        "We've sent you a confirmation link. Please verify your email to continue.",
        [
          { 
            text: "OK", 
            onPress: () => router.push("/login") 
          }
        ]
      );
    }
  }

  // Get display text for account type
  const getAccountTypeDisplay = () => {
    if (accountType === "warehouse-owner") {
      return "Warehouse Owner";
    } else if (accountType === "merchant-seller") {
      return "Merchant Seller";
    }
    return "";
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Go Back Button */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.landingText}>Landing / Sign Up</Text>
          <Text style={styles.title}>Create Account</Text>
        </View>

        {/* Account Type Badge */}
        {accountType && (
          <View style={styles.accountTypeBadge}>
            <Text style={styles.accountTypeText}>
              Signing up as: {getAccountTypeDisplay()}
            </Text>
          </View>
        )}

        {/* Form Section */}
        <View style={styles.form}>
          {/* Display Name Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Display Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your display name"
              placeholderTextColor="#666"
              onChangeText={setDisplayName}
              value={displayName}
              editable={!loading}
              autoCapitalize="words"
            />
          </View>

          {/* Email Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="your@email.com"
              placeholderTextColor="#666"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none"
              editable={!loading}
            />
          </View>

          {/* Create Password Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Create Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor="#666"
                secureTextEntry={!showPassword}
                onChangeText={checkPasswordRequirements}
                value={password}
                editable={!loading}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text>{showPassword ? "--" : "👁️"}</Text>
              </TouchableOpacity>
            </View>
            
            {/* Password Requirements */}
            <View style={styles.requirementContainer}>
              <Text style={[styles.requirement, hasUpperCase && styles.requirementMet]}>
                {hasUpperCase ? "✓" : "○"} Contains at least 1 upper case letter
              </Text>
              <Text style={[styles.requirement, hasSpecialChar && styles.requirementMet]}>
                {hasSpecialChar ? "✓" : "○"} Contains at least 1 special character (.,@,#,$,%)
              </Text>
            </View>
          </View>

          {/* Re-enter Password Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Re-enter Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Re-enter your password"
                placeholderTextColor="#666"
                secureTextEntry={!showReenterPassword}
                onChangeText={setReenterPassword}
                value={reenterPassword}
                editable={!loading}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowReenterPassword(!showReenterPassword)}
              >
                <Text>{showReenterPassword ? "--" : "👁️"}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up Button */}
          <Pressable 
            style={[styles.signUpButton, loading && styles.disabledButton]} 
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.signUpText}>Sign Up</Text>
            )}
          </Pressable>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Pressable onPress={() => router.push("/login")} disabled={loading}>
              <Text style={styles.loginLink}>Log In</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  backButton: {
    padding: 8,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  backText: {
    fontSize: 24,
    color: "#007AFF",
  },
  header: {
    marginBottom: 20,
  },
  landingText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  accountTypeBadge: {
    backgroundColor: "#F0F8FF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  accountTypeText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "500",
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    height: 50,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    height: 50,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 14,
  },
  eyeButton: {
    padding: 12,
  },
  requirementContainer: {
    marginTop: 8,
  },
  requirement: {
    fontSize: 11,
    color: "#999",
    marginVertical: 2,
  },
  requirementMet: {
    color: "#4CAF50",
  },
  signUpButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  signUpText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  loginText: {
    fontSize: 14,
    color: "#666",
  },
  loginLink: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "bold",
  },
});