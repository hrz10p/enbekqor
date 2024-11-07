import React from "react";
import { View, StyleSheet } from "react-native";
import { Banner } from "@/components/Banner";
import { CardButton } from "@/components/CardButton";
import { NewsSection } from "@/components/NewsSection";
import { FontAwesome } from "@expo/vector-icons";

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <Banner />

      <View style={styles.cardRow}>
        <CardButton
          title="Справочник"
          backgroundColor="#A8DADC"
          icon={<FontAwesome name="book" size={24} color="white" />}
          onPress={() => {}}
        />
        <CardButton
          title="Чат с Гидом"
          backgroundColor="#FFE66D"
          icon={<FontAwesome name="comments" size={24} color="white" />}
          onPress={() => {}}
        />
      </View>
      <View style={styles.cardRow}>
        <CardButton
          title="Шаблоны заявлений"
          backgroundColor="#B4A0FA"
          icon={<FontAwesome name="file" size={24} color="white" />}
          onPress={() => {}}
        />
        <CardButton
          title="Подать жалобу"
          backgroundColor="#E63946"
          icon={
            <FontAwesome name="exclamation-triangle" size={24} color="white" />
          }
          onPress={() => {}}
        />
      </View>
      <View style={styles.cardRow}>
        <CardButton
          title="Контакты"
          backgroundColor="#9C91E9"
          icon={<FontAwesome name="phone" size={24} color="white" />}
          onPress={() => {}}
        />
        <CardButton
          title="Отделения на карте"
          backgroundColor="#A8DF65"
          icon={<FontAwesome name="map-marker" size={24} color="white" />}
          onPress={() => {}}
        />
      </View>

      <NewsSection />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
