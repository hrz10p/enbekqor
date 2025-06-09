import React from "react";
import {View, StyleSheet, Text, TouchableOpacity, ScrollView} from "react-native";
import { Banner } from "@/components/Banner";
import { NewsSection } from "@/components/NewsSection";
import { Image } from "expo-image";
import { HorizontalLine } from "@/components/HorizontalLine";
import i18n from "@/utilities/internationalization";
import { useTranslation } from "react-i18next";
import { Link } from "expo-router"; // Import Link for navigation

export default function MainScreen() {
    const { t } = useTranslation();

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <Banner imageUrl={require("../../assets/images/backgrounds/main_card1.png")} />

            <View style={styles.cardRow}>
                <Link href="/Help" asChild>
                    <TouchableOpacity style={{ ...styles.card, backgroundColor: "rgba(18, 146, 144, 0.5)" }}>
                        <Image
                            source={require("../../assets/images/icons/guide_icon.png")}
                            style={[styles.cardImage, styles.mainCardImage]}
                            contentFit={"contain"}
                        />
                        <Text style={styles.cardTitle}>{t("handbook")}</Text>
                    </TouchableOpacity>
                </Link>

                <Link href="/pages/Chat" asChild>
                    <TouchableOpacity style={{ ...styles.card, backgroundColor: "rgba(248, 215, 101, 0.5)" }}>
                        <Image
                            source={require("../../assets/images/icons/chat_icon.png")}
                            style={[styles.cardImage, styles.mainCardImage]}
                            contentFit={"contain"}
                        />
                        <Text style={styles.cardTitle}>{t("chat_page_title")}</Text>
                    </TouchableOpacity>
                </Link>
            </View>

            <View style={styles.cardRow}>
                <Link href="/pages/ApplicationTemplates" asChild>
                    <TouchableOpacity style={{ ...styles.card, backgroundColor: "rgba(66, 156, 255, 0.5)" }}>
                        <Image
                            source={require("../../assets/images/icons/sheet_icon.png")}
                            style={[styles.cardImage, styles.simpleCardImage]}
                            contentFit={"contain"}
                        />
                        <Text style={styles.cardTitle}>{t("application_templates")}</Text>
                    </TouchableOpacity>
                </Link>
                <Link href="/pages/Complaint" asChild>
                    <TouchableOpacity style={{...styles.card, backgroundColor: "rgba(255, 122, 130, 0.5)" }}>
                        <Image
                            source={require("../../assets/images/icons/warning_icon.png")}
                            style={[styles.cardImage, styles.simpleCardImage]}
                            contentFit={"contain"}
                        />
                        <Text style={styles.cardTitle}>{t("apply_complaint")}</Text>
                    </TouchableOpacity>
                </Link>
            </View>

            <View style={[styles.cardRow, { marginBottom: 40 }]}>
                <Link href="/pages/Contacts" asChild>
                    <TouchableOpacity style={{ ...styles.card, backgroundColor: "rgba(141, 94, 249, 0.25)" }}>
                        <Image
                            source={require("../../assets/images/icons/contact_icon.png")}
                            style={[styles.cardImage, styles.simpleCardImage]}
                            contentFit={"contain"}
                        />
                        <Text style={styles.cardTitle}>{t("contacts")}</Text>
                    </TouchableOpacity>
                </Link>

                <Link href="/pages/Map" asChild>
                    <TouchableOpacity style={{ ...styles.card, backgroundColor: "rgba(115, 205, 128, 0.5)" }}>
                        <Image
                            source={require("../../assets/images/icons/building_icon.png")}
                            style={[styles.cardImage, styles.simpleCardImage]}
                            contentFit={"contain"}
                        />
                        <Text style={styles.cardTitle}>{t("branches_map")}</Text>
                    </TouchableOpacity>
                </Link>
            </View>

            <HorizontalLine />

            <NewsSection />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    scrollContent: {
        padding: 20,
        paddingTop: 60,
    },
    cardRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    card: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    cardImage: {
        position: "relative",
        objectFit: "contain",
    },
    mainCardImage: {
        width: 100,
        height: 90,
    },
    simpleCardImage: {
        width: 35,
        height: 35,
    },
    cardTitle: {
        marginTop: 8,
        fontWeight: "bold",
        fontSize: 14,
    },
});
