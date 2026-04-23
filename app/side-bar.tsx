import { StyleSheet, Text, View } from "react-native";

export default function Sidebar() {
  return (
    <View style={styles.sidebar}>
      <Text style={styles.sidebarText}>DN</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 222,
    height: 874,
    backgroundColor: "#f0f0f0", 
    opacity: 1,
    padding: 20,
  },
  sidebarText: {
    width: 50,
    height: 39,
    position: "absolute",
    top: 92,
    left: 26,
    fontFamily: "Almarai", 
    fontWeight: "400",
    fontStyle: "normal", 
    fontSize: 35,
    lineHeight: 39,
    letterSpacing: 0,
    color: "#000", 
  },
});
