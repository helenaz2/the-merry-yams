import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    TextInput,
    Alert,
} from "react-native";
import { supabase } from "./lib/supabase";

interface InventoryItem {
  id: string;
  sku: string;
  num: number;
}

export default function IndividualWorkspace() {
  const { id } = useLocalSearchParams();
  const [workspaceName, setWorkspaceName] = useState("Space Name");
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: "1", sku: "MWZX88888_B_XL", num: 3 },
    { id: "2", sku: "MWZX88888_B_L", num: 5 },
    { id: "3", sku: "MWZX88888_B_M", num: 2 },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"sku" | "num">("sku");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetchWorkspaceInfo();
    fetchInventory();
  }, [id]);

  const fetchWorkspaceInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('workspaces')
        .select('name')
        .eq('id', id)
        .single();

      if (data) {
        setWorkspaceName(data.name);
      }
    } catch (error) {
      console.error("Error fetching workspace:", error);
    }
  };

  const fetchInventory = async () => {
    try {
      // Fetch inventory from your database
      // const { data, error } = await supabase
      //   .from('inventory')
      //   .select('*')
      //   .eq('workspace_id', id);
      // if (data) setInventory(data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const handleStartScanning = () => {
    router.push("/scanner-page");
  };

  const handleUploadCSV = () => {
    Alert.alert("Upload CSV", "This feature will allow you to upload inventory via CSV file.");
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleSort = () => {
    Alert.alert(
      "Sort By",
      "Choose sort option",
      [
        { text: "SKU (A-Z)", onPress: () => { setSortBy("sku"); setSortOrder("asc"); } },
        { text: "SKU (Z-A)", onPress: () => { setSortBy("sku"); setSortOrder("desc"); } },
        { text: "Quantity (Low to High)", onPress: () => { setSortBy("num"); setSortOrder("asc"); } },
        { text: "Quantity (High to Low)", onPress: () => { setSortBy("num"); setSortOrder("desc"); } },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const handleDownloadCSV = () => {
    Alert.alert("Download CSV", "Your inventory data will be downloaded as a CSV file.");
  };

  const getSortedAndFilteredInventory = () => {
    let filtered = [...inventory];
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.sku.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "sku") {
        return sortOrder === "asc"
          ? a.sku.localeCompare(b.sku)
          : b.sku.localeCompare(a.sku);
      } else {
        return sortOrder === "asc"
          ? a.num - b.num
          : b.num - a.num;
      }
    });
    
    return filtered;
  };

  const renderInventoryItem = ({ item }: { item: InventoryItem }) => (
    <View style={styles.inventoryRow}>
      <Text style={styles.skuCell}>{item.sku}</Text>
      <Text style={styles.numCell}>{item.num}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <Text style={styles.spaceName}>{workspaceName}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleStartScanning}>
          <Text style={styles.actionButtonText}>Start Scanning</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleUploadCSV}>
          <Text style={styles.actionButtonText}>Upload CSV</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search SKU"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Header Row with Sort and Download */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.sortButton} onPress={handleSort}>
          <Text style={styles.headerButtonText}>Sort By</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadCSV}>
          <Text style={styles.headerButtonText}>Download CSV</Text>
        </TouchableOpacity>
      </View>

      {/* Column Headers */}
      <View style={styles.columnHeaders}>
        <Text style={styles.skuHeader}>SKU</Text>
        <Text style={styles.numHeader}>NUM</Text>
      </View>

      {/* Inventory List */}
      <FlatList
        data={getSortedAndFilteredInventory()}
        renderItem={renderInventoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No inventory items found</Text>
          </View>
        }
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
  spaceName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  placeholder: {
    width: 40,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    height: 45,
  },
  divider: {
    marginHorizontal: 20,
    borderTopWidth: 1,
    borderColor: "#DDDDDD",
    marginVertical: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#F5F5F5",
  },
  sortButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  downloadButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  headerButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
  },
  columnHeaders: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#E0E0E0",
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },
  skuHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 2,
  },
  numHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    textAlign: "right",
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  inventoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  skuCell: {
    fontSize: 14,
    color: "#333",
    flex: 2,
  },
  numCell: {
    fontSize: 14,
    color: "#333",
    flex: 1,
    textAlign: "right",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
});