// components/NewsSection.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function NewsSection() {
  return (
    <View style={styles.newsSection}>
      <Text style={styles.title}>Новости</Text>
      <View style={styles.newsPlaceholder}>
        <Text>Здесь будет отображаться список новостей.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  newsSection: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  newsPlaceholder: {
    height: 100,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});
