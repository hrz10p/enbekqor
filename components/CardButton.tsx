// components/CardButton.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from 'expo-image';
import GLOBAL_CUSTOM from "@/constants/global_custom";

interface CardButtonProps {
  title: string;
  backgroundColor: string;
  icon: React.ReactNode;
  onPress: () => void;
  isMainCard: boolean;
}

export function CardButton({
  title,
  backgroundColor,
  icon,
  onPress,
    isMainCard,
}: CardButtonProps) {
  if (isMainCard) {
    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor }, styles.mainCard]}
            onPress={onPress}
        >
          <Text style={[styles.title, { alignSelf: "flex-start" }]}>{title}</Text>
          <View style={[styles.iconContainer, { alignSelf: "flex-end" }]}>{icon}</View>
        </TouchableOpacity>
    );
  } else {
    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor }, styles.simpleCard]}
            onPress={onPress}
        >
          <Text style={styles.title}>{title}</Text>
          <View style={styles.iconContainer}>{icon}</View>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    borderRadius: 16,
    padding: 10,
    margin: 5,
  },
  iconContainer: {
  },
  title: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: GLOBAL_CUSTOM["fw-bold"].fontFamily
  },
  mainCard: {
    height: 130,
    width: "50%",
  },
  simpleCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60
  }
});
