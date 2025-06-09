import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

// Hardcoded data from адреса.docx
const contacts = [
    {
        id: "1",
        name: "Департамент по области Ұлытау",
        phone: "+7 (708) 130-80-99",
        email: "zh.rustemov@enbek.gov.kz",
    },
    {
        id: "2",
        name: "Департамент по городу Алматы",
        phone: "+7 (727) 308 08 08",
        email: "dkgitalmaty@enbek.gov.kz",
    },
    {
        id: "3",
        name: "Департамент по Мангистауской области",
        phone: "8 (7292) 201-118",
        email: "n.baulybaev@enbek.gov.kz",
    },
    {
        id: "4",
        name: "Департамент по Северо-Казахстанской области",
        phone: "8 7152 46-86-06",
        email: "m.sabaganov@enbek.gov.kz",
    },
    {
        id: "5",
        name: "Департамент по Акмолинской области",
        phone: "8 (7162) 29-85-00",
        email: "a.smailov@enbek.gov.kz",
    },
    {
        id: "6",
        name: "Департамент по Костанайской области",
        phone: "8 (7142) 50 30 31",
        email: "trud_inspektor@kostanay.gov.kz",
    },
    {
        id: "7",
        name: "Департамент по Карагандинской области",
        phone: "8-7212-43-20-84",
        email: "m.akhmetov@karaganda-region.gov.kz",
    },
    {
        id: "8",
        name: "Департамент по Атырауской области",
        phone: "8-71-22-51-24-98",
        email: "i.aubakirov@atyrau.gov.kz",
    },
    {
        id: "9",
        name: "Департамент по Туркестанской области",
        phone: "8 (725 33) 5 90 90",
        email: "mei.turkistan@mail.ru",
    },
    {
        id: "10",
        name: "Департамент по городу Астане",
        phone: "8-7172-57-49-31",
        email: "e.ismagulov@enbek.gov.kz",
    },
    {
        id: "11",
        name: "Департамент по Жамбылской области",
        phone: "8 7262-43-01-96",
        email: "trudinspek-taraz@mail.ru",
    },
    {
        id: "12",
        name: "Департамент по области Жетісу",
        phone: "8 (7282) 32 94 32",
        email: "moldakhmetov.b@zhetysu.gov.kz",
    },
    {
        id: "13",
        name: "Департамент по Павлодарской области",
        phone: "+7 (7182) 62-77-30",
        email: "upravlenie.truda@pavlodar.gov.kz",
    },
    {
        id: "14",
        name: "Департамент по Алматинской области",
        phone: "8 (72-772) 2-80-44",
        email: "enbek@almobl.gov.kz",
    },
    {
        id: "15",
        name: "Департамент по Западно-Казахстанской области",
        phone: "8-7112-31-85-61",
        email: "a.doszhanov@enbek.gov.kz",
    },
    {
        id: "16",
        name: "Департамент по Актюбинской области",
        phone: "8-7132-98-12-13",
        email: "zh.alimov@aktobe.gov.kz",
    },
    {
        id: "17",
        name: "Департамент по Восточно-Казахстанской области",
        phone: "+7 (7232) 25 65 02",
        email: "enbek-i@akimvko.gov.kz",
    },
    {
        id: "18",
        name: "Департамент по городу Шымкент",
        phone: "8 (7252) 27-38-42",
        email: "a.mamadaliev@shymkent.gov.kz",
    },
    {
        id: "19",
        name: "Департамент по области Абай",
        phone: "+7 (7222) 35-37-70",
        email: "", // Email отсутствует
    },
    {
        id: "20",
        name: "Департамент по Кызылординской области",
        phone: "8-724-229-03-37",
        email: "", // Email отсутствует
    },
];

export default function ContactsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Контакты</Text>
            <FlatList
                data={contacts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.contactCard}>
                        <View style={styles.contactInfo}>
                            <Text style={styles.contactName}>{item.name}</Text>
                            <Text style={styles.contactText}>
                                <Ionicons name="call-outline" size={16} color="#599BFF" /> {item.phone}
                            </Text>
                            {item.email ? (
                                <Text style={styles.contactText}>
                                    <MaterialIcons name="email" size={16} color="#599BFF" /> {item.email}
                                </Text>
                            ) : null}
                        </View>
                        <TouchableOpacity style={styles.callButton}>
                            <Ionicons name="call" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F9FC",
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
    },
    contactCard: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    contactInfo: {
        flex: 1,
    },
    contactName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    contactText: {
        fontSize: 14,
        color: "#555",
        marginBottom: 3,
    },
    callButton: {
        backgroundColor: "#599BFF",
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
});