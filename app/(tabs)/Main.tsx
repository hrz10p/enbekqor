import React from "react";
import { View, StyleSheet } from "react-native";
import { Banner } from "@/components/Banner";
import { CardButton } from "@/components/CardButton";
import { NewsSection } from "@/components/NewsSection";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import {HorizontalLine} from "@/components/HorizontalLine";

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <Banner imageUrl={ require('../../assets/images/backgrounds/main_card1.png') } />
      <View style={styles.cardRow}>
        <CardButton
          title="Справочник"
          backgroundColor="rgba(18, 146, 144, 0.5)"
          icon={<Image source={  require("../../assets/images/icons/guide_icon.png") } style={[styles.cardImage, styles.mainCardImage]} contentFit={"contain"}/>}
          onPress={() => {
              window.location.href = "./Help"
          }}
          isMainCard={true}
        />
        <CardButton
          title="Чат с Гидом"
          backgroundColor="rgba(248, 215, 101, 0.5)"
          icon={<Image source={ require("../../assets/images/icons/chat_icon.png") } style={[styles.cardImage, styles.mainCardImage]} contentFit={"contain"}/>}
          onPress={() => {
              window.location.href = "./pages/Chat"
          }}
          isMainCard={true}
        />
      </View>
      <View style={styles.cardRow}>
        <CardButton
          title="Шаблоны заявлений"
          backgroundColor="rgba(66, 156, 255, 0.5)"
          icon={<Image source={require("../../assets/images/icons/sheet_icon.png")} style={[styles.cardImage, styles.simpleCardImage]} contentFit={"contain"}/>}
          onPress={() => {
              console.log("Шаблоны заявлений")
          }}
          isMainCard={false}
        />
        <CardButton
          title="Подать жалобу"
          backgroundColor="rgba(255, 122, 130, 0.5)"
          icon={<Image source={require("../../assets/images/icons/warning_icon.png")} style={[styles.cardImage, styles.simpleCardImage]} contentFit={"contain"}/>}
          onPress={() => {
              console.log("Подать жалобу")
          }}
          isMainCard={false}
        />
      </View>
      <View style={[styles.cardRow, { marginBottom: 40 }]}>
        <CardButton
          title="Контакты"
          backgroundColor="rgba(141, 94, 249, 0.25)"
          icon={<Image source={require("../../assets/images/icons/contact_icon.png")} style={[styles.cardImage, styles.simpleCardImage]} contentFit={"contain"}/>}
          onPress={() => {
              console.log("Контакты")
          }}
          isMainCard={false}
        />
        <CardButton
          title="Отделения на карте"
          backgroundColor="rgba(115, 205, 128, 0.5)"
          icon={<Image source={require("../../assets/images/icons/building_icon.png")} style={[styles.cardImage, styles.simpleCardImage]} contentFit={"contain"}/>}
          onPress={() => {
              console.log("Отделения на карте")
          }}
          isMainCard={false}
        />
      </View>

      <HorizontalLine></HorizontalLine>

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
    cardImage: {
        position: "relative",
        objectFit: "contain",
    },
    mainCardImage: {
      position: "relative",
        width: 100,
        height: 90,
    },
    simpleCardImage: {
      width: 35,
      height: 35,
        objectFit: "contain",
    },

});
