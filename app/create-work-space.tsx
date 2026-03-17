import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';

export default function CreateWorkspaceNew() {
  const [name, setName] = useState('');
  const [organizingPrice, setOrganizingPrice] = useState('');
  const [storagePrice, setStoragePrice] = useState('');
  const [retailer, setRetailer] = useState('');
  const [description, setDescription] = useState('');
  const [displayImage, setDisplayImage] = useState<string | null>(null);
  const [timeCreated, setTimeCreated] = useState('');

  // Set the current time when component mounts
  useEffect(() => {
    const now = new Date();
    const formattedTime = formatDateTime(now);
    setTimeCreated(formattedTime);
  }, []);

  const formatDateTime = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions to upload images');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setDisplayImage(result.assets[0].uri);
    }
  };

  const handleCreate = () => {
    if (!name) {
      Alert.alert('Error', 'Please enter a workspace name');
      return;
    }
    
    // Capture the exact creation time
    const creationTime = formatDateTime(new Date());
    
    // Prepare workspace data
    const workspaceData = {
      name,
      organizingPrice: organizingPrice ? parseFloat(organizingPrice) : 0,
      storagePrice: storagePrice ? parseFloat(storagePrice) : 0,
      retailer,
      description,
      displayImage,
      timeCreated: creationTime, // Use this for display in lists/history
      createdAt: new Date().toISOString(), // For backend storage
    };
    
    console.log('Creating workspace:', workspaceData);
    
    // Here you would send to your backend
    // saveWorkspaceToBackend(workspaceData);
    
    Alert.alert(
      'Success', 
      `Workspace "${name}" created successfully!\nCreated at: ${creationTime}`,
      [
        { text: 'OK', onPress: () => {
          // Optionally reset form or navigate away
          // navigation.goBack();
        }}
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <Text style={styles.header}>Create New Work Space</Text>

          {/* Name Field */}
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

          {/* Pricing Fields */}
          <View style={styles.pricingContainer}>
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>$ / product (organizing)</Text>
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
              <Text style={styles.pricingLabel}>$ / product / day (storage)</Text>
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

          {/* Divider */}
          <View style={styles.divider} />

          {/* Retailer Field */}
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

          {/* Description Field */}
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

          {/* Display Image Section */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Display Image</Text>
            <TouchableOpacity 
              style={styles.uploadContainer}
              onPress={pickImage}
            >
              {displayImage ? (
                <Image source={{ uri: displayImage }} style={styles.previewImage} />
              ) : (
                <>
                  <View style={styles.uploadIconContainer}>
                    <Text style={styles.uploadIcon}>📷</Text>
                  </View>
                  <Text style={styles.uploadText}>upload image</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Time Created - Shows the time when page loaded */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Time Created</Text>
            <Text style={styles.timeText}>{timeCreated}</Text>
          </View>

          {/* Create Button */}
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
    backgroundColor: '#EEEEEE',
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
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  required: {
    color: '#FF3B30',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  textArea: {
    minHeight: 80,
    paddingTop: 12,
  },
  pricingContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    marginBottom: 20,
    overflow: 'hidden',
  },
  pricingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  pricingLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  pricingInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 6,
    padding: 8,
    fontSize: 14,
    width: 80,
    textAlign: 'right',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  divider: {
    height: 1,
    backgroundColor: '#DDDDDD',
    marginVertical: 16,
  },
  uploadContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderStyle: 'dashed',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  uploadIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  uploadIcon: {
    fontSize: 20,
  },
  uploadText: {
    fontSize: 14,
    color: '#4285F4',
    fontWeight: '500',
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  timeText: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    color: '#333',
  },
  createButton: {
    backgroundColor: '#4285F4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});