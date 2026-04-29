import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from './lib/supabase';

export default function ScannedInfo() {
  const { sku } = useLocalSearchParams(); 
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [exists, setExists] = useState(false);
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('1');

  useEffect(() => {
    checkProduct();
  }, [sku]);
}
//will use to check if products are correct and then add them into supabase tbl &
// make sure they show up on the app too
function checkProduct() {
    throw new Error('implementing function soon.');
    

}

