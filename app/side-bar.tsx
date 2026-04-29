import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { supabase } from "../app/lib/supabase";

interface SidebarProps {
  isVisible: boolean;
  onClose: () => void;
  displayName: string;
  email: string;
}

export default function Sidebar({ isVisible, onClose, displayName, email }: SidebarProps) {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
    } else {
      router.replace("/login");
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <Pressable style={styles.overlay} onPress={onClose} />
      
      {/* Sidebar */}
      <View style={styles.sidebar}>
        {/* Close Button */}
        <Pressable style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>✕</Text>
        </Pressable>

        {/* User Info */}
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {displayName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.displayName}>{displayName}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menu}>
          <Pressable 
            style={styles.menuItem}
            onPress={() => {
              onClose();
              router.push("/create-work-space");
            }}
          >
            <Text style={styles.menuIcon}>+</Text>
            <Text style={styles.menuText}>Create Work Space</Text>
          </Pressable>

          <Pressable 
            style={styles.menuItem}
            onPress={() => {
              onClose();
              // Navigate to all work spaces (already there)
            }}
          >
            <Text style={styles.menuIcon}>📋</Text>
            <Text style={styles.menuText}>All Work Spaces</Text>
          </Pressable>

          <Pressable 
            style={styles.menuItem}
            onPress={() => {
              onClose();
              router.push("/join-workspace");
            }}
          >
            <Text style={styles.menuIcon}>➕</Text>
            <Text style={styles.menuText}>Join Work Space</Text>
          </Pressable>

          <Pressable 
            style={styles.menuItem}
            onPress={() => {
              onClose();
              router.push("/settings");
            }}
          >
            <Text style={styles.menuIcon}>⚙️</Text>
            <Text style={styles.menuText}>Settings</Text>
          </Pressable>

          <Pressable 
            style={[styles.menuItem, styles.logoutItem]}
            onPress={handleLogout}
          >
            <Text style={styles.menuIcon}>🚪</Text>
            <Text style={styles.logoutText}>Log Out</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: "80%",
    maxWidth: 300,
    backgroundColor: "#FFFFFF",
    zIndex: 1000,
    paddingTop: 50,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    padding: 8,
  },
  closeText: {
    fontSize: 24,
    color: "#666",
  },
  userInfo: {
    alignItems: "center",
    marginBottom: 32,
    marginTop: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  displayName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  menu: {
    flex: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  menuIcon: {
    fontSize: 20,
    width: 32,
    color: "#007AFF",
  },
  menuText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
  },
  logoutItem: {
    marginTop: "auto",
    borderBottomWidth: 0,
  },
  logoutText: {
    fontSize: 16,
    color: "#FF3B30",
    marginLeft: 12,
  },
});