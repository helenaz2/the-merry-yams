import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "./lib/supabase";

export default function CreateWorkspaceNew() {
  const [name, setName] = useState("");
  const [organizingPrice, setOrganizingPrice] = useState("");
  const [storagePrice, setStoragePrice] = useState("");
  const [retailer, setRetailer] = useState("");
  const [description, setDescription] = useState("");
  const [timeCreated, setTimeCreated] = useState("");

  useEffect(() => {
    setTimeCreated(formatDateTime(new Date()));
  }, []);

  const formatDateTime = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleCreate = async () => {
  if (!name.trim()) {
    Alert.alert("Error", "Please enter a workspace name");
    return;
  }

  const { data, error } = await supabase
    .from("workspaces")
    .insert({
      name: name.trim(),
      organizing_price: organizingPrice ? parseFloat(organizingPrice) : 0,
      storage_price: storagePrice ? parseFloat(storagePrice) : 0,
      retailer: retailer.trim(),
      description: description.trim(),
      owner_id: null,
    })
    .select();

  console.log("Inserted workspace:", data);
  console.log("Insert error:", error);

  if (error) {
    Alert.alert("Error", error.message);
    return;
  }

  router.replace("/all-work-spaces");
};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.header}>Create New Work Space</Text>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Name <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter workspace name"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.pricingContainer}>
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>
                $ / product (organizing)
              </Text>
              <TextInput
                style={styles.pricingInput}
                value={organizingPrice}
                onChangeText={setOrganizingPrice}
                placeholder="0.00"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>
                $ / product / day (storage)
              </Text>
              <TextInput
                style={styles.pricingInput}
                value={storagePrice}
                onChangeText={setStoragePrice}
                placeholder="0.00"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Retailer</Text>
            <TextInput
              style={styles.input}
              value={retailer}
              onChangeText={setRetailer}
              placeholder="Enter retailer name"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter description"
              placeholderTextColor="#999"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Time Created</Text>
            <Text style={styles.timeText}>{timeCreated}</Text>
          </View>

          <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
            <Text style={styles.createButtonText}>Create</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 24,
    textAlign: "center",
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  required: {
    color: "#FF3B30",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },
  textArea: {
    minHeight: 80,
    paddingTop: 12,
  },
  pricingContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    marginBottom: 20,
    overflow: "hidden",
  },
  pricingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  pricingLabel: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  pricingInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 6,
    padding: 8,
    fontSize: 14,
    width: 80,
    textAlign: "right",
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },
  divider: {
    height: 1,
    backgroundColor: "#DDDDDD",
    marginVertical: 16,
  },
  timeText: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    color: "#333",
  },
  createButton: {
    backgroundColor: "#4285F4",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});