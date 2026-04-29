import { router } from "expo-router";
import { useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native";

export default function ChooseAccountType() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleContinue = () => {
    if (!selectedType) {
      alert("Please select an account type to continue.");
      return;
    }

    // Navigate to signup with the selected account type
    router.push({
      pathname: "/signup",
      params: { accountType: selectedType }
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <Text style={styles.title}>Choose Account Type</Text>
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Select how you want to use Team-2
      </Text>

      {/* Account Type Options */}
      <View style={styles.optionsContainer}>
        {/* Warehouse Owner Option */}
        <TouchableOpacity
          style={[
            styles.optionCard,
            selectedType === "warehouse-owner" && styles.selectedCard,
          ]}
          onPress={() => setSelectedType("warehouse-owner")}
        >
          <View style={styles.optionIcon}>
            <Text style={styles.optionIconText}>🏭</Text>
          </View>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>Warehouse Owner</Text>
            <Text style={styles.optionDescription}>
              List your warehouse space, manage inventory, and connect with merchants
            </Text>
          </View>
          <View style={styles.radioButton}>
            {selectedType === "warehouse-owner" && <View style={styles.radioButtonSelected} />}
          </View>
        </TouchableOpacity>

        {/* Merchant Seller Option */}
        <TouchableOpacity
          style={[
            styles.optionCard,
            selectedType === "merchant-seller" && styles.selectedCard,
          ]}
          onPress={() => setSelectedType("merchant-seller")}
        >
          <View style={styles.optionIcon}>
            <Text style={styles.optionIconText}>🛍️</Text>
          </View>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>Merchant Seller</Text>
            <Text style={styles.optionDescription}>
              Sell your products, find warehouse space, and manage your inventory
            </Text>
          </View>
          <View style={styles.radioButton}>
            {selectedType === "merchant-seller" && <View style={styles.radioButtonSelected} />}
          </View>
        </TouchableOpacity>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={[styles.continueButton, !selectedType && styles.disabledButton]}
        onPress={handleContinue}
        disabled={!selectedType}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <Pressable onPress={() => router.push("/login")}>
          <Text style={styles.loginLink}>Log In</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  backText: {
    fontSize: 24,
    color: "#007AFF",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  optionsContainer: {
    gap: 16,
    marginBottom: 32,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  selectedCard: {
    borderColor: "#007AFF",
    backgroundColor: "#F0F8FF",
  },
  optionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  optionIconText: {
    fontSize: 32,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 12,
    color: "#666",
    lineHeight: 16,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#007AFF",
  },
  continueButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
  loginLink: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "bold",
  },
});