// components/CardButton.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface CardButtonProps {
  title: string;
  backgroundColor: string;
  icon: React.ReactNode;
  onPress: () => void;
}

export function CardButton({
  title,
  backgroundColor,
  icon,
  onPress,
}: CardButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor }]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 100,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginBottom: 10,
  },
  title: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});
