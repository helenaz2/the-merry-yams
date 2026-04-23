import { router } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Signup() {
   return (
       <View style={styles.container}>
           <Text style={styles.title}>Create Account</Text>


           <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#999" />
           <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" placeholderTextColor="#999" />
           <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} placeholderTextColor="#999" />


           <Pressable style={styles.signUpButton}
            onPress={() => router.replace("/all-work-spaces")}
           >
               <Text style={styles.signUpText}>Sign Up</Text>
           </Pressable>
           
   </View>
   );
}
const styles = StyleSheet.create({
   container: {
       flex: 1,
       justifyContent: "center",
       alignItems: "center",
       padding: 20,
       backgroundColor: "#fff",
   },
   title: {
       fontSize: 32,
       fontWeight: "bold",
       marginBottom: 10,
       color: "#333",
   },
   input: {
       height: 50,
       borderWidth: 1,
       borderColor: "#333",
       borderRadius: 40,
       paddingHorizontal: 40,
       marginBottom: 40,
 },
 signUpButton: {
       backgroundColor: "#007AFF",
       padding: 15,
       borderRadius: 8,
       alignItems: "center",
       marginTop: 10,
 },
 signUpText: {
       color: "#fff",
       fontSize: 18,
       fontWeight: "bold",
 },

});
