// components/Banner.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function Banner() {
  return (
    <View style={styles.banner}>
      <Text style={styles.title}>Возникли трудовые споры?</Text>
      <Text style={styles.subtitle}>
        Найдите решение ваших трудовых проблем.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#5BA5E0",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    color: "white",
    fontSize: 14,
  },
});
