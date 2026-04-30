import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from './lib/supabase';

export default function ScannedInfo() {
  //first we extract the sku ("unique, alphanumeric code assigned to products to track inventory" basically meaning a unique code for the product itself) from the barcode's URL using useLocalSearchParams
  const { sku } = useLocalSearchParams(); 
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [exists, setExists] = useState(false);
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    checkProduct();
  }, [sku]);

  //will use to check if products are correct and then add them into supabase tbl &
  // make sure they show up on the app too
  const checkProduct = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('inventory')
      .select('*')
      .eq('sku', sku)
      .single();
      //first, before scanning everything into inventory, we check if the SKU has already been scanned 
        // if it has, go to that SKU and update/add any new inventory info from there, which leads you to:
    // check the inventory of that SKU to see if there are any repeats & update quantity if so
    if (data) {
      setExists(true);
      // here, as data/SKU does exist, we set exists to true
      setProductName(data.product_name);
      setQuantity(data.quantity.toString());
    }
    setLoading(false);
  };

  // then I found a way to save the updated quantity info or new product info once user clicks "Save"
  
  const handleSave = async () => {
    // since product exists (look above), we update the quantity for real this time (user saves into Supabase !!)
    const { error } = exists      
    ? await supabase.from('inventory').update({ quantity: parseInt(quantity) }).eq('sku', sku)
    // if it there is no SKU, we add a new product into supabase inventory tbl 
    : await supabase.from('inventory').insert([{ sku, product_name: productName, quantity: parseInt(quantity) }]);
    
    // lowk used VS Code's AI system to help me out here :') but basically shows that new product has been added thru text 
    if (!error) {
      Alert.alert("Success", "Inventory Updated");
      router.back(); // Go back to scanner or workspace
    } else {
      Alert.alert("Error", error.message);
    }
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;
  return (
    <ScrollView style={styles.container}>
    {/* Back Button */}
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backArrow}>←</Text>
      </Pressable>

      <Text style={styles.headerTitle}>Scanned Info</Text>

      <View style={styles.skuBox}>
        <Text style={styles.skuText}>{sku}</Text>
        <Text style={styles.editIcon}>✎</Text>
      </View>
      {/* Add Location Input */}
      <Text style={styles.label}>Add Location</Text>
      <TextInput 
        style={styles.input} 
        value={location} 
        onChangeText={setLocation} 
        placeholder="e.g. Aisle 4, Shelf B"
      />

      {/* Add Description Input */}
      <Text style={styles.label}>Add Description</Text>
      <TextInput 
        style={[styles.input, styles.textArea]} 
        value={description} 
        onChangeText={setDescription} 
        placeholder="Enter details..."
        multiline
      />

      {/* Add Photo Placeholders (From Figma) */}
      <Text style={styles.label}>Add Photo</Text>
      <TouchableOpacity style={styles.photoButton}>
        <Text>📷 take photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.photoButton}>
        <Text>🖼️ upload image</Text>
      </TouchableOpacity>

      {/* Quantity Adjustment (The "NUM" logic) */}
      <Text style={styles.label}>Adjust Quantity</Text>
      <View style={styles.qtyRow}>
        <TouchableOpacity onPress={() => setQuantity(Math.max(0, parseInt(quantity) - 1).toString())}>
          <Text style={styles.mathBtn}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qtyText}>{quantity}</Text>
        <TouchableOpacity onPress={() => setQuantity((parseInt(quantity) + 1).toString())}>
          <Text style={styles.mathBtn}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Add to Inventory Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>
          {exists ? "Update Inventory" : "Add to Inventory"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9', padding: 25 },
  backButton: { marginTop: 40, marginBottom: 10 },
  backArrow: { fontSize: 30, color: '#000' },
  headerTitle: { fontSize: 18, color: '#666', marginBottom: 20 },
  skuBox: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    backgroundColor: '#D1D1D1', 
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 30 
  },
  skuText: { fontSize: 18, fontWeight: '500' },
  editIcon: { fontSize: 18 },
  label: { fontSize: 16, fontWeight: '500', marginBottom: 8, color: '#333' },
  input: { 
    backgroundColor: '#E8E8E8', 
    padding: 12, 
    borderRadius: 5, 
    marginBottom: 20, 
    fontSize: 14 
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  photoButton: { 
    backgroundColor: '#E8E8E8', 
    padding: 12, 
    borderRadius: 5, 
    marginBottom: 10, 
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 10
  },
  qtyRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 30, 
    marginBottom: 30 
  },
  mathBtn: { fontSize: 35, color: '#007AFF', fontWeight: 'bold' },
  qtyText: { fontSize: 24, fontWeight: 'bold' },
  saveBtn: { 
    backgroundColor: '#D1D1D1', 
    padding: 18, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginBottom: 50,
    borderWidth: 1,
    borderColor: '#AAA'
  },
  saveBtnText: { fontSize: 18, fontWeight: '600', color: '#333' }
});
  
  


