import React from "react";
import { View, Text, StyleSheet } from "react-native";
import GLOBAL_CUSTOM from "@/constants/global_custom";
import i18n from "@/utilities/internationalization";
import {useTranslation} from "react-i18next";

export function NewsSection() {
  const { t } = useTranslation();
  return (
    <View style={styles.newsSection}>
      <Text style={styles.title}>{t("news")}</Text>
      <View style={styles.newsPlaceholder}>
        <Text>Здесь будет отображаться список новостей.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  newsSection: {
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: GLOBAL_CUSTOM["fw-bold"].fontFamily,
  },
  newsPlaceholder: {
    height: 100,
    backgroundColor: "#e0e0e0",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});
