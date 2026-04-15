import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.loginButton}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>

      <Pressable
        style={styles.createAccountButton}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
  },

  loginButton: {
    position: "absolute",
    top: 249,
    left: 48,
    width: 306,
    height: 40,
    backgroundColor: "purple",
    borderWidth: 1,
    borderColor: "purple",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  createAccountButton: {
    position: "absolute",
    top: 337,
    left: 48,
    width: 306,
    height: 40,
    backgroundColor: "#BBBBBB",
    borderWidth: 1,
    borderColor: "#AAAAAA",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
});
