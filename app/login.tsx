import {Text, View, StyleSheet} from "react-native";
    
export default function Login() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>Welcome back! Please login to your account.</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20, // Adds breathing room on the sides
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    }, 
    subtitle: {
        fontSize: 18,
        color: "#666",
        textAlign: "center",
    },
})