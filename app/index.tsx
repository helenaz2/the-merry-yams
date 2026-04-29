import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Landing() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Syncrate</Text>
      
      <Pressable
        style={styles.signUpButton}
        onPress={() => router.push("/choose-account")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      <Pressable
        style={styles.loginButton}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.loginButtonText}>Log In</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 40,
  },
  signUpButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  loginButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});