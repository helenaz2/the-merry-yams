import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.forgotPassword}
        onPress={() => router.push("/forgot-password")}
      >
        <Text style={styles.forgotText}>Forgot Password</Text>
      </Pressable>

      <Text style={styles.title}>Log In</Text>

      <Text style={styles.emailLabel}>Email</Text>

      <View style={styles.passwordInput}>
        <Text style={styles.inputText}>Enter Password</Text>
      </View>

      <Text style={styles.passwordLabel}>Password</Text>

      <View style={styles.emailInput}>
        <Text style={styles.inputText}>Enter Email</Text>
      </View>

      <Pressable
        style={styles.loginButton}
        onPress={() => router.push("/all-work-spaces")}
      >
        <Text style={styles.loginButtonText}>Log In</Text>
      </Pressable>

      <View style={styles.leftDivider} />
      <View style={styles.rightDivider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    position: "relative",
  },

  forgotPassword: {
    position: "absolute",
    top: 81,
    left: 241,
  },

  forgotText: {
    fontSize: 18,
    fontWeight: "400",
    color: "rgba(0, 0, 0, 0.7)",
    textDecorationLine: "underline",
  },

  title: {
    position: "absolute",
    top: 119,
    left: 161,
    width: 80,
    height: 33,
    fontSize: 30,
    fontWeight: "400",
    color: "#000000",
  },

  emailLabel: {
    position: "absolute",
    top: 198,
    left: 47,
    width: 48,
    height: 20,
    fontSize: 18,
    fontWeight: "400",
    color: "#000000",
  },

  passwordInput: {
    position: "absolute",
    top: 221,
    left: 47,
    width: 307,
    height: 34,
    backgroundColor: "#D1D1D1",
    borderWidth: 1,
    borderColor: "#AAAAAA",
    borderRadius: 5,
    justifyContent: "center",
    paddingHorizontal: 12,
  },

  passwordLabel: {
    position: "absolute",
    top: 278,
    left: 48,
    width: 143,
    height: 20,
    fontSize: 18,
    fontWeight: "400",
    color: "#000000",
  },

  emailInput: {
    position: "absolute",
    top: 302,
    left: 47,
    width: 307,
    height: 34,
    backgroundColor: "#D1D1D1",
    borderWidth: 1,
    borderColor: "#AAAAAA",
    borderRadius: 5,
    justifyContent: "center",
    paddingHorizontal: 12,
  },

  inputText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#555555",
  },

  loginButton: {
    position: "absolute",
    top: 373,
    left: 84,
    width: 213,
    height: 40,
    backgroundColor: "#BBBBBB",
    borderWidth: 1,
    borderColor: "#AAAAAA",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  loginButtonText: {
    fontSize: 20,
    fontWeight: "400",
    color: "#000000",
  },

  leftDivider: {
    position: "absolute",
    top: 614,
    left: 21,
    width: 149,
    borderTopWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.5)",
  },

  rightDivider: {
    position: "absolute",
    top: 614,
    left: 219,
    width: 165,
    borderTopWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.5)",
  },
});
