import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { supabase } from "./lib/supabase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Request code, Step 2: Reset password
  
  // Password validation states
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [hasValidLength, setHasValidLength] = useState(false);

  const checkPasswordRequirements = (text: string) => {
    setNewPassword(text);
    setHasUpperCase(/[A-Z]/.test(text));
    setHasLowerCase(/[a-z]/.test(text));
    setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(text));
    setHasValidLength(text.length >= 6 && text.length <= 12);
  };

  const handleSendSecurityCode = async () => {
    // Validate email
    if (!email.trim()) {
      Alert.alert("Missing Info", "Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    setLoading(true);

    // Send password reset email via Supabase
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: 'yourapp://reset-password',
    });

    setLoading(false);

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    Alert.alert(
      "Code Sent",
      "We've sent a password reset code to your email. Please check your inbox.",
      [{ text: "OK", onPress: () => setStep(2) }]
    );
  };

  const handleResetPassword = async () => {
    // Validate security code
    if (!securityCode.trim()) {
      Alert.alert("Missing Info", "Please enter the security code.");
      return;
    }

    // Validate new password
    if (!newPassword) {
      Alert.alert("Missing Info", "Please enter a new password.");
      return;
    }

    if (!hasUpperCase || !hasLowerCase || !hasSpecialChar || !hasValidLength) {
      Alert.alert(
        "Weak Password",
        "Please make sure your password meets all requirements."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match. Please try again.");
      return;
    }

    setLoading(true);

    
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    setLoading(false);

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    Alert.alert(
      "Success",
      "Your password has been reset successfully! Please log in with your new password.",
      [{ text: "OK", onPress: () => router.replace("/login") }]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {/* Back Button */}
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backText}>←</Text>
          </Pressable>

          {/* Title */}
          <Text style={styles.title}>Forgot Password</Text>

          {step === 1 ? (
            // Step 1: Request Security Code
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="your@email.com"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                />
              </View>

              <Pressable
                style={[styles.button, loading && styles.disabledButton]}
                onPress={handleSendSecurityCode}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Send Security Code</Text>
                )}
              </Pressable>
            </>
          ) : (
            // Step 2: Reset Password
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Security Code</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter 6-digit code"
                  placeholderTextColor="#999"
                  value={securityCode}
                  onChangeText={setSecurityCode}
                  keyboardType="number-pad"
                  editable={!loading}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>New Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Enter new password"
                    placeholderTextColor="#999"
                    value={newPassword}
                    onChangeText={checkPasswordRequirements}
                    secureTextEntry={!showNewPassword}
                    editable={!loading}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowNewPassword(!showNewPassword)}
                  >
                    <Text>{showNewPassword ? "👁️" : "👁️‍🗨️"}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm New Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Re-enter new password"
                    placeholderTextColor="#999"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    editable={!loading}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Text>{showConfirmPassword ? "👁️" : "👁️‍🗨️"}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Password Requirements */}
              <View style={styles.requirementsContainer}>
                <Text style={[styles.requirement, hasValidLength && styles.requirementValid]}>
                  {hasValidLength ? "✓" : "○"} Between 6–12 characters in length
                </Text>
                <Text style={[styles.requirement, hasUpperCase && styles.requirementValid]}>
                  {hasUpperCase ? "✓" : "○"} Contains at least 1 upper case letter
                </Text>
                <Text style={[styles.requirement, hasLowerCase && styles.requirementValid]}>
                  {hasLowerCase ? "✓" : "○"} Contains at least 1 lower case letter
                </Text>
                <Text style={[styles.requirement, hasSpecialChar && styles.requirementValid]}>
                  {hasSpecialChar ? "✓" : "○"} Contains at least 1 special character (!..)
                </Text>
              </View>

              <Pressable
                style={[styles.button, loading && styles.disabledButton]}
                onPress={handleResetPassword}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Reset Password</Text>
                )}
              </Pressable>
            </>
          )}

          {/* Back to Login Link */}
          <Pressable
            style={styles.backToLogin}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.backToLoginText}>Back to Login</Text>
          </Pressable>
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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    fontSize: 28,
    color: "#007AFF",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
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
    backgroundColor: "#F5F5F5",
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
    backgroundColor: "#F5F5F5",
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
  requirementsContainer: {
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  requirement: {
    fontSize: 12,
    color: "#999",
    marginVertical: 4,
  },
  requirementValid: {
    color: "#4CAF50",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backToLogin: {
    marginTop: 20,
    alignItems: "center",
  },
  backToLoginText: {
    fontSize: 14,
    color: "#007AFF",
  },
});