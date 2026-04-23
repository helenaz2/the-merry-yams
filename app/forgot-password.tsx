import { router } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function ForgotPassword() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>{"<"}</Text>
        </Pressable>

        <Text style={styles.title}>Forgot Password</Text>

        <Text style={styles.labelEmail}>Enter Email</Text>
        <TextInput style={styles.inputEmail} />

        <Text style={styles.labelCode}>Enter Security Code</Text>
        <TextInput style={styles.inputCode} />
        <Text style={styles.labelPassword}>New Password</Text>
        <TextInput style={styles.inputPassword} secureTextEntry />
        <Text style={styles.labelConfirm}>Reenter Password</Text>
        <TextInput style={styles.inputConfirm} secureTextEntry />
        <Text style={styles.valid}>
          ✓ Between 6–12 characters in length
        </Text>
        <Text style={styles.valid}>
          ✓ Contains at least 1 upper case letter
        </Text>
        <Text style={styles.invalid}>
          Contains at least 1 lower case letter
        </Text>
        <Text style={styles.invalid2}>
          Contains at least 1 special character in (!..)
        </Text>
        <Pressable
          style={styles.resetButton}
          onPress={() => router.replace("/login")}
        >
          <Text style={styles.resetText}>Reset Password</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2F3142",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: 360,
    height: 700,
    backgroundColor: "#EDEDED",
    position: "relative",
  },

  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  backText: {
    fontSize: 24,
    color: "#000",
  },
  title: {
    position: "absolute",
    top: 80,
    left: 80,
    fontSize: 26,
    fontWeight: "500",
  },
  labelEmail: {
    position: "absolute",
    top: 150,
    left: 30,
    fontSize: 16,
  },

  inputEmail: {
    position: "absolute",
    top: 175,
    left: 30,
    width: 300,
    height: 36,
    backgroundColor: "#D1D1D1",
    borderRadius: 6,
    paddingHorizontal: 10,
  },

  labelCode: {
    position: "absolute",
    top: 230,
    left: 30,
    fontSize: 16,
  },

  inputCode: {
    position: "absolute",
    top: 255,
    left: 30,
    width: 300,
    height: 36,
    backgroundColor: "#D1D1D1",
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  labelPassword: {
    position: "absolute",
    top: 310,
    left: 30,
    fontSize: 16,
  },

  inputPassword: {
    position: "absolute",
    top: 335,
    left: 30,
    width: 300,
    height: 36,
    backgroundColor: "#D1D1D1",
    borderRadius: 6,
    paddingHorizontal: 10,
  },

  labelConfirm: {
    position: "absolute",
    top: 390,
    left: 30,
    fontSize: 16,
  },
  inputConfirm: {
    position: "absolute",
    top: 415,
    left: 30,
    width: 300,
    height: 36,
    backgroundColor: "#D1D1D1",
    borderRadius: 6,
    paddingHorizontal: 10,
  },

  valid: {
    position: "absolute",
    top: 470,
    left: 30,
    color: "#5DB075",
    fontSize: 14,
  },

  invalid: {
    position: "absolute",
    top: 495,
    left: 30,
    color: "#E35D5D",
    fontSize: 14,
  },
  invalid2: {
    position: "absolute",
    top: 515,
    left: 30,
    color: "#E35D5D",
    fontSize: 14,
  },
  resetButton: {
    position: "absolute",
    top: 580,
    left: 90,
    width: 180,
    height: 40,
    backgroundColor: "#BDBDBD",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  resetText: {
    fontSize: 18,
    color: "#FFFFFF",
  },
});