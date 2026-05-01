import { router } from "expo-router";
import { useState, useEffect } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    Switch,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native";
import { supabase } from "./lib/supabase";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setEmail(user.email || "");
      const displayNameFromMeta = user.user_metadata?.display_name || user.email?.split('@')[0] || "User";
      setDisplayName(displayNameFromMeta);
    }
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    // Here you would implement actual dark mode logic
    // e.g., using ThemeContext or AsyncStorage
  };

  const handleLanguageSelect = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    setShowLanguagePicker(false);
    // Here you would implement language change logic
    // e.g., using i18n or AsyncStorage
  };

  const handleLogout = async () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            const { error } = await supabase.auth.signOut();
            if (error) {
              Alert.alert("Error", error.message);
            } else {
              router.replace("/login");
            }
          }
        }
      ]
    );
  };

  const LanguagePickerModal = () => (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Select Language</Text>
        <TouchableOpacity 
          style={styles.languageOption} 
          onPress={() => handleLanguageSelect("English")}
        >
          <Text style={styles.languageOptionText}>English</Text>
          {language === "English" && <Text style={styles.checkMark}>✓</Text>}
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.languageOption} 
          onPress={() => handleLanguageSelect("Spanish")}
        >
          <Text style={styles.languageOptionText}>Español</Text>
          {language === "Spanish" && <Text style={styles.checkMark}>✓</Text>}
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.languageOption} 
          onPress={() => handleLanguageSelect("French")}
        >
          <Text style={styles.languageOptionText}>Français</Text>
          {language === "French" && <Text style={styles.checkMark}>✓</Text>}
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.languageOption} 
          onPress={() => handleLanguageSelect("Chinese")}
        >
          <Text style={styles.languageOptionText}>中文</Text>
          {language === "Chinese" && <Text style={styles.checkMark}>✓</Text>}
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.closeButton} 
          onPress={() => setShowLanguagePicker(false)}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Dark Mode Section */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={handleDarkModeToggle}
              trackColor={{ false: "#DDDDDD", true: "#007AFF" }}
              thumbColor={darkMode ? "#FFFFFF" : "#FFFFFF"}
            />
          </View>
        </View>

        {/* Language Section */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.row} 
            onPress={() => setShowLanguagePicker(true)}
          >
            <Text style={styles.rowLabel}>Language</Text>
            <View style={styles.rowValueContainer}>
              <Text style={styles.rowValue}>{language}</Text>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Label & Description 1 */}
        <View style={styles.section}>
          <View style={styles.column}>
            <Text style={styles.labelText}>Label</Text>
            <Text style={styles.descriptionText}>Description</Text>
          </View>
        </View>

        {/* Label & Description 2 */}
        <View style={styles.section}>
          <View style={styles.column}>
            <Text style={styles.labelText}>Label</Text>
            <Text style={styles.descriptionText}>Description</Text>
          </View>
        </View>

        {/* User Info Section */}
        <View style={styles.section}>
          <View style={styles.column}>
            <Text style={styles.labelText}>Display Name</Text>
            <Text style={styles.descriptionText}>{displayName}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.column}>
            <Text style={styles.labelText}>Email</Text>
            <Text style={styles.descriptionText}>{email}</Text>
          </View>
        </View>

        {/* Log Out Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Language Picker Modal */}
      {showLanguagePicker && <LanguagePickerModal />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 24,
    color: "#007AFF",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  rowValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowValue: {
    fontSize: 14,
    color: "#666",
    marginRight: 8,
  },
  chevron: {
    fontSize: 18,
    color: "#999",
  },
  column: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  labelText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: "#666",
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    marginHorizontal: 16,
    marginTop: 30,
    marginBottom: 40,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    width: "80%",
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  languageOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  languageOptionText: {
    fontSize: 16,
    color: "#333",
  },
  checkMark: {
    fontSize: 18,
    color: "#007AFF",
  },
  closeButton: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
});