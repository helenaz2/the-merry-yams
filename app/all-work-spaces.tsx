import { router } from "expo-router";
import { useState, useEffect } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    RefreshControl,
} from "react-native";
import { supabase } from "./lib/supabase";
import Sidebar from "./side-bar";

interface Workspace {
  id: string;
  name: string;
  created_at: string;
}

export default function AllWorkSpaces() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [displayName, setDisplayName] = useState("User");
  const [email, setEmail] = useState("");
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getUserInfo();
    fetchWorkspaces();
  }, []);

  const getUserInfo = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email || "");
        const name = user.user_metadata?.display_name || user.email?.split('@')[0] || "User";
        setDisplayName(name);
      } else {
        // Default values if no user is logged in
        setDisplayName("Guest");
        setEmail("guest@example.com");
      }
    } catch (error) {
      console.error("Error getting user:", error);
      setDisplayName("User");
      setEmail("user@email.com");
    }
  };

  const fetchWorkspaces = async () => {
    try {
      // Your fetch logic here
      setWorkspaces([
        { id: "1", name: "Space 1", created_at: new Date().toISOString() },
        { id: "2", name: "Space 2", created_at: new Date().toISOString() },
      ]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchWorkspaces();
  };

  const renderWorkspace = ({ item, index }: { item: Workspace; index: number }) => (
    <TouchableOpacity
      style={[styles.workspaceCard, index % 2 === 0 ? styles.cardLeft : styles.cardRight]}
      onPress={() => router.push(`/individual-workspace?id=${item.id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.cardIcon}>
        <Text style={styles.cardIconText}>📦</Text>
      </View>
      <Text style={styles.workspaceName}>{item.name}</Text>
      <Text style={styles.workspaceDate}>
        {new Date(item.created_at).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header with Menu Button */}
      <View style={styles.header}>
        <Pressable style={styles.menuButton} onPress={() => setSidebarVisible(true)}>
          <View style={styles.moreLine} />
          <View style={styles.moreLine} />
          <View style={styles.moreLine} />
        </Pressable>
        <Text style={styles.title}>My Work Spaces</Text>
        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/create-work-space")}
        >
          <Text style={styles.addIcon}>+</Text>
        </Pressable>
      </View>

      <View style={styles.divider} />

      {/* Workspaces Grid */}
      {workspaces.length === 0 && !loading ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🏭</Text>
          <Text style={styles.emptyTitle}>No Workspaces Yet</Text>
          <Text style={styles.emptyText}>
            Create your first workspace to start organizing your inventory
          </Text>
          <Pressable
            style={styles.createButton}
            onPress={() => router.push("/create-work-space")}
          >
            <Text style={styles.createButtonText}>Create Workspace</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={workspaces}
          renderItem={renderWorkspace}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      {/* Sidebar - Make sure all props are passed */}
      <Sidebar
        isVisible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        displayName={displayName}
        email={email}
      />
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 33,
    paddingTop: 59,
    marginBottom: 20,
  },
  menuButton: {
    width: 24,
    height: 14,
    justifyContent: "space-between",
  },
  moreLine: {
    width: 24,
    height: 2,
    backgroundColor: "#2B2D3B",
    borderRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000000",
  },
  addButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 15,
  },
  addIcon: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  divider: {
    marginLeft: 32,
    width: "85%",
    borderTopWidth: 2,
    borderColor: "rgba(43, 45, 59, 0.5)",
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  workspaceCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardLeft: {
    marginRight: 4,
  },
  cardRight: {
    marginLeft: 4,
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F0F8FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  cardIconText: {
    fontSize: 24,
  },
  workspaceName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  workspaceDate: {
    fontSize: 10,
    color: "#999",
    marginTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  createButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});