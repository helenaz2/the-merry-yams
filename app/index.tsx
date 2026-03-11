import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/login" asChild>
      <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>
      </Link>
      {/* Sign Up Button (Solid) */}
      <Link href="/signup" asChild>
        <Pressable style={[styles.button, styles.signupButton]}>
          <Text style={styles.signupText}>Sign Up</Text>
        </Pressable>
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    borderWidth: 2,
    borderColor: "transparent",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    backgroundColor: "transparent",
    marginVertical: 10, 
    width: 200, 
  },
  buttonText: {
    fontSize: 18,
    color: "#007AFF",
    fontWeight: "600",
    textAlign: "center",
  },
  signupButton: {
    backgroundColor: "transparent",
  },
  signupText: {
    color: "#007AFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
