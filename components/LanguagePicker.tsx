import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import i18n from "@/utilities/internationalization";

export default function LanguagePicker() {
    const selectedLang = i18n.language; // Get current language

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang); // Change language using i18n
    };

    return (
        <View style={styles.languagePicker}>
            <TouchableOpacity
                style={[styles.languageButton, selectedLang === "ru" && styles.activeButton]}
                onPress={() => changeLanguage("ru")}
            >
                <Text style={[styles.languageText, selectedLang === "ru" && styles.activeText]}>RU</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.languageButton, selectedLang === "kz" && styles.activeButton]}
                onPress={() => changeLanguage("kz")}
            >
                <Text style={[styles.languageText, selectedLang === "kz" && styles.activeText]}>KZ</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    languagePicker: {
        flexDirection: "row",
        borderRadius: 20,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#000",
        backgroundColor: "#fff",
    },
    languageButton: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",

    },
    activeButton: {
        backgroundColor: "#3498db", // Blue for selected
    },
    languageText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
    activeText: {
        color: "#fff", // White text for active language
    },
});
