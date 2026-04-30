import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { supabase } from "./lib/supabase";

type InventoryItem = {
  id: string;
  sku: string;
  quantity: number;
};


export default function IndividualWorkspace() {
  const { id } = useLocalSearchParams(); // The unique Workspace ID
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [workspaceName, setWorkspaceName] = useState("Space Name");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // 2. FETCH LOGIC
  // Refresh data every time we navigate back to this screen
  useFocusEffect(
    useCallback(() => {
      fetchWorkspaceInfo();
      fetchInventory();
    }, [id])
  );

  const fetchWorkspaceInfo = async () => {
    const { data } = await supabase
      .from('workspaces')
      .select('name')
      .eq('id', id)
      .single();
    if (data) setWorkspaceName(data.name);
  };

  const fetchInventory = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('inventory')
      .select('id, sku, quantity')
      .eq('workspace_id', id);

    if (data) {
      // Mapping Supabase 'quantity' to 'num' for our display
      setInventory(data);
    }
    setLoading(false);
  };

  // 3. FILTERING
  const filteredInventory = inventory.filter(item =>
    item.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 4. LIST ITEM COMPONENT
  const renderInventoryItem = ({ item }: { item: InventoryItem }) => (
    <Pressable 
      style={styles.inventoryRow}
      onPress={() => router.push({ pathname: "/scanned-info", params: { sku: item.sku } })}
    >
      <Text style={styles.skuCell}>{item.sku}</Text>
      <Text style={styles.numCell}>{item.quantity}</Text>
    </Pressable>
  );
  return (
    <View style={styles.container}>
      <View style={styles.fixedBoxArea}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.push("/all-work-spaces")}
        >
          <Text style={styles.backArrow}>⌃</Text>
        </Pressable>

        <Pressable style={styles.infoButton}>
          <Text style={styles.infoIcon}>i</Text>
        </Pressable>

        <Text style={styles.title}>Space Name</Text>

        <Pressable
          style={styles.scanButton}
          onPress={() => router.push("/scanner-page")}
        >
          <Text style={styles.cameraIcon}>◇</Text>
          <Text style={styles.scanText}>Start Scanning</Text>
        </Pressable>

        <Pressable
          style={styles.uploadButton}
          onPress={() => router.push("/matched-positions")}
        >
          <Text style={styles.uploadIcon}>◇</Text>
          <Text style={styles.uploadText}>Upload CSV</Text>
        </Pressable>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>◇</Text>
          <Text style={styles.searchPlaceholder}>Search SKU</Text>
        </View>

        <View style={styles.divider} />
      </View>
      {/* TABLE HEADERS (The SKU / NUM labels) */}
      <View style={styles.columnHeaders}>
        <Text style={styles.headerLabel}>SKU</Text>
        <Text style={styles.headerLabel}>NUM</Text>
      </View>

      {/* INVENTORY LIST */}
      {loading && inventory.length === 0 ? (
        <ActivityIndicator style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={filteredInventory}
          keyExtractor={(item) => item.id}
          renderItem={renderInventoryItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No inventory items found</Text>
          }
        />
      )}
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
  },

  fixedBoxArea: {
    width: "100%",
    height: 384,
    position: "relative",
  },

  backButton: {
    position: "absolute",
    top: 58,
    left: 12,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  backArrow: {
    fontSize: 26,
    color: "#000000",
    lineHeight: 30,
    transform: [{ rotate: "90deg" }],
  },

  infoButton: {
    position: "absolute",
    top: 59,
    left: 330,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  infoIcon: {
    fontSize: 22,
    color: "#000000",
    fontWeight: "600",
  },

  title: {
    position: "absolute",
    top: 92,
    left: 117,
    width: 168,
    height: 33,
    fontSize: 30,
    fontWeight: "400",
    color: "#000000",
  },

  scanButton: {
    position: "absolute",
    top: 158,
    left: 56,
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

  cameraIcon: {
    fontSize: 22,
    color: "#000000",
  },

  scanText: {
    fontSize: 22,
    fontWeight: "400",
    color: "#000000",
  },

  uploadButton: {
    position: "absolute",
    top: 222,
    left: 56,
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

  searchBox: {
    position: "absolute",
    top: 286,
    left: 55,
    width: 307,
    height: 40,
    backgroundColor: "#D1D1D1",
    borderWidth: 1,
    borderColor: "#AAAAAA",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 20,
  },

  searchIcon: {
    fontSize: 20,
    color: "#000000",
  },

  searchPlaceholder: {
    fontSize: 22,
    fontWeight: "400",
    color: "rgba(0,0,0,0.6)",
  },

  divider: {
    position: "absolute",
    top: 348,
    left: 20,
    width: 362,
    borderTopWidth: 1,
    borderColor: "#000000",
  },
  // --- NEW STYLES FOR THE TABLE ---
  columnHeaders: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 35,
    paddingVertical: 10,
    backgroundColor: '#CCCCCC',
  },
  headerLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  listContainer: {
    paddingBottom: 40,
  },
  inventoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 35,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    backgroundColor: '#FFFFFF',
  },
  skuCell: {
    fontSize: 16,
    color: '#333',
    flex: 2,
  },
  numCell: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'right',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#999',
  }
});
