import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ScannerPage() {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.backButton}
        onPress={() => router.push("/individual-workspace")}
      >
        <Text style={styles.backArrow}>⌃</Text>
      </Pressable>

      <Pressable
        style={styles.barcodeScanner}
        onPress={() => router.push("/scanned-info")}
      >
        <Text style={styles.boxText}>Barcode Scanner</Text>
      </Pressable>

      <Pressable
        style={styles.qrScanner}
        onPress={() => router.push("/scanned-info")}
      >
        <Text style={styles.boxText}>QR Scanner</Text>
      </Pressable>

      <Pressable
        style={styles.uploadButton}
        onPress={() => router.push("/scanned-info")}
      >
        <Text style={styles.uploadIcon}>◇</Text>
        <Text style={styles.uploadText}>Upload Image</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    position: "relative",
  },

  backButton: {
    position: "absolute",
    top: 95,
    left: 18,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  backArrow: {
    fontSize: 26,
    color: "#000000",
    transform: [{ rotate: "90deg" }],
    lineHeight: 30,
  },

  barcodeScanner: {
    position: "absolute",
    top: 174,
    left: 32,
    width: 337,
    height: 81,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },

  qrScanner: {
    position: "absolute",
    top: 365,
    left: 100,
    width: 202,
    height: 202,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },

  boxText: {
    fontSize: 24,
    fontWeight: "400",
    color: "#000000",
  },

  uploadButton: {
    position: "absolute",
    top: 635,
    left: 51,
    width: 306,
    height: 40,
    backgroundColor: "#BBBBBB",
    borderWidth: 1,
    borderColor: "#AAAAAA",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  uploadIcon: {
    fontSize: 22,
    color: "#000000",
  },

  uploadText: {
    fontSize: 22,
    fontWeight: "400",
    color: "#000000",
  },
});
