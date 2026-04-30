import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';

export default function ScannedInfo() {
  //first we extract the sku ("unique, alphanumeric code assigned to products to track inventory") from the barcode's URL using useLocalSearchParams
  const { sku } = useLocalSearchParams(); 
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [exists, setExists] = useState(false);
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('1');

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
      setProductName(data.product_name);
      setQuantity(data.quantity.toString());
    }
    setLoading(false);
  };
}


