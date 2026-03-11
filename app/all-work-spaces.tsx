import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function AllWorkSpaces() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.moreButton}>
        <View style={styles.moreLine} />
        <View style={styles.moreLine} />
        <View style={styles.moreLine} />
      </Pressable>

      <Pressable
        style={styles.addButton}
        onPress={() => router.push("/create-work-space")}
      >
        <Text style={styles.addIcon}>◇</Text>
      </Pressable>

      <Text style={styles.title}>My Work Spaces</Text>

      <View style={styles.divider} />

      <Pressable
        style={styles.space1Card}
        onPress={() => router.push("/individual-workspace")}
      >
        <Text style={styles.space1Text}>Space 1</Text>
      </Pressable>

      <Pressable
        style={styles.space2Card}
        onPress={() => router.push("/individual-workspace")}
      >
        <Text style={styles.space2Text}>Space 2</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    position: "relative",
  },

  moreButton: {
    position: "absolute",
    top: 59,
    left: 33,
    width: 24,
    height: 14,
    justifyContent: "space-between",
  },

  moreLine: {
    width: 24,
    height: 2,
    backgroundColor: "#2B2D3B",
    borderRadius: 2,
  },

  addButton: {
    position: "absolute",
    top: 58,
    left: 341,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  addIcon: {
    fontSize: 24,
    color: "#000000",
    lineHeight: 30,
  },

  title: {
    position: "absolute",
    top: 101,
    left: 33,
    width: 218,
    height: 33,
    fontSize: 30,
    fontWeight: "400",
    color: "#000000",
  },

  divider: {
    position: "absolute",
    top: 140,
    left: 32,
    width: 339,
    borderTopWidth: 2,
    borderColor: "rgba(43, 45, 59, 0.5)",
  },

  space1Card: {
    position: "absolute",
    top: 169,
    left: 32,
    width: 156,
    height: 184,
    backgroundColor: "#BBBBBB",
    borderWidth: 2,
    borderColor: "#AAAAAA",
    borderRadius: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 34,
  },

  space2Card: {
    position: "absolute",
    top: 169,
    left: 215,
    width: 156,
    height: 184,
    backgroundColor: "#BBBBBB",
    borderWidth: 2,
    borderColor: "#AAAAAA",
    borderRadius: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 34,
  },

  space1Text: {
    fontSize: 22,
    fontWeight: "400",
    color: "#000000",
  },

  space2Text: {
    fontSize: 22,
    fontWeight: "400",
    color: "#000000",
  },
});
