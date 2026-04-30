import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export default function ScannerPage() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  useFocusEffect(
    useCallback(() => {
      // resets scanning so user doesn't have to click scan again to scan another barcode
      setScanned(false);
      setScannedData(null);
    }, [])
  );

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function handleBarcodeScanned({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) {
    if (scanned) return;
    setScanned(true);
    setScannedData(`Type: ${type}\nData: ${data}`);

    router.push({
      pathname: "/scanned-info",
      params: { sku: data },
    });
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      />

      <View style={styles.overlay}>
        <Text style={styles.scanText}>
          {scannedData
            ? scannedData
            : "Point the camera at a barcode or QR code"}
        </Text>

        {scanned && (
          <TouchableOpacity
            style={styles.scanAgainButton}
            onPress={() => {
              setScanned(false);
              setScannedData(null);
            }}
          >
            <Text style={styles.scanAgainText}>Scan Again</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 80,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 16,
    borderRadius: 10,
  },
  scanText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  scanAgainButton: {
    marginTop: 12,
    alignSelf: "center",
    backgroundColor: "white",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  scanAgainText: {
    color: "black",
    fontWeight: "600",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 64,
    width: "100%",
    paddingHorizontal: 64,
  },
  button: {
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
