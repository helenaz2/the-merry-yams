import { router } from "expo-router";
import { useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import { supabase } from "./lib/supabase";

interface WorkspaceInfo {
  id: string;
  name: string;
  created_by: string;
  display_name: string;
  time_created: string;
}

export default function JoinWorkspace() {
  const [workspaceId, setWorkspaceId] = useState("");
  const [loading, setLoading] = useState(false);
  const [workspaceInfo, setWorkspaceInfo] = useState<WorkspaceInfo | null>(null);
  const [searching, setSearching] = useState(false);

  const searchWorkspace = async () => {
    if (!workspaceId.trim()) {
      Alert.alert("Missing Info", "Please enter a Workspace ID.");
      return;
    }

    setSearching(true);
    
    try {
      const { data: workspace, error: workspaceError } = await supabase
        .from('workspaces')
        .select('*')
        .eq('id', workspaceId.trim())
        .single();

      if (workspaceError) {
        Alert.alert("Not Found", "No workspace found with this ID. Please check and try again.");
        setWorkspaceInfo(null);
        return;
      }

      if (workspace) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('display_name')
          .eq('id', workspace.created_by)
          .single();

        const displayName = profile?.display_name || "Unknown User";

        setWorkspaceInfo({
          id: workspace.id,
          name: workspace.name,
          created_by: workspace.created_by,
          display_name: displayName,
          time_created: formatDate(workspace.time_created),
        });
      }
    } catch (error) {
      console.error("Error searching workspace:", error);
      Alert.alert("Error", "Failed to search for workspace. Please try again.");
    } finally {
      setSearching(false);
    }
  };

  const handleJoinWorkspace = async () => {
    if (!workspaceInfo) return;

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        Alert.alert("Error", "You must be logged in to join a workspace.");
        router.replace("/login");
        return;
      }

      const { error } = await supabase
        .from('workspace_members')
        .insert([
          {
            workspace_id: workspaceInfo.id,
            user_id: user.id,
            joined_at: new Date().toISOString(),
          }
        ]);

      if (error) {
        Alert.alert("Error", "Failed to join workspace. Please try again.");
      } else {
        Alert.alert(
          "Success", 
          `You have successfully joined "${workspaceInfo.name}"!`,
          [{ text: "OK", onPress: () => router.push("/all-work-spaces") }]
        );
      }
    } catch (error) {
      console.error("Error joining workspace:", error);
      Alert.alert("Error", "Failed to join workspace. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "xxxx/xx/xx xx:xxpm";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    const displayHours = hours % 12 || 12;
    
    return `${year}/${month}/${day} ${displayHours}:${minutes}${ampm}`;
  };

  const resetSearch = () => {
    setWorkspaceId("");
    setWorkspaceInfo(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <Text style={styles.title}>Join a Workspace</Text>
      </View>

      <View style={styles.searchSection}>
        <Text style={styles.label}>Workspace ID</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Workspace ID"
            placeholderTextColor="#999"
            value={workspaceId}
            onChangeText={setWorkspaceId}
            autoCapitalize="none"
            editable={!searching && !workspaceInfo}
          />
          {!workspaceInfo && (
            <TouchableOpacity 
              style={styles.searchButton}
              onPress={searchWorkspace}
              disabled={searching}
            >
              {searching ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.searchButtonText}>Search</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>

      {workspaceInfo && (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIcon}>
              <Text style={styles.cardIconText}>🏭</Text>
            </View>
            <TouchableOpacity style={styles.resetButton} onPress={resetSearch}>
              <Text style={styles.resetText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Workspace Name</Text>
              <Text style={styles.infoValue}>{workspaceInfo.name}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Created By</Text>
              <Text style={styles.infoValue}>{workspaceInfo.display_name}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Display Name</Text>
              <Text style={styles.infoValue}>{workspaceInfo.display_name}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Time Created</Text>
              <Text style={styles.infoValue}>{workspaceInfo.time_created}</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.joinButton, loading && styles.disabledButton]}
            onPress={handleJoinWorkspace}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.joinButtonText}>Join</Text>}
          </TouchableOpacity>
        </View>
      )}
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
    marginBottom: 40,
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
  searchSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: "row",
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    height: 50,
  },
  searchButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F8F8F8",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F8FF",
    justifyContent: "center",
    alignItems: "center",
  },
  cardIconText: {
    fontSize: 20,
  },
  resetButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
  },
  resetText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  infoContainer: {
    padding: 16,
  },
  infoRow: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#999",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginVertical: 12,
  },
  joinButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    margin: 16,
    marginTop: 0,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  joinButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});