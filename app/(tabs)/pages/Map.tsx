import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MapView from "react-native-maps";

const branches = [
    {
        id: 1,
        name: "Департамент по области Ұлытау",
        address: "область Ұлытау, г. Жезказган, бульвар Ғаршкерлер, 15, кабинет 30",
        contact: "+7 (708) 130-80-99",
    },
    {
        id: 2,
        name: "Департамент по городу Алматы",
        address: "г. Алматы, Медеуский р-н, пр. Достык, 85, третий этаж",
        contact: "+7 (727) 308 08 08",
    },
    {
        id: 3,
        name: "Департамент по Мангистауской области",
        address: "г. Актау, 14 микрорайон, 36 'а' здание",
        contact: "8 (7292) 201-118",
    },
    {
        id: 4,
        name: "Департамент по Северо-Казахстанской области",
        address: "г. Петропавловск, ул. Абая 64",
        contact: "8 7152 46-86-06",
    },
    {
        id: 5,
        name: "Департамент по Акмолинской области",
        address: "г. Кокшетау, ул. Абая, 89, 4 этаж",
        contact: "8 (7162) 29-85-00",
    },
    {
        id: 6,
        name: "Департамент по Костанайской области",
        address: "г. Костанай, ул. Касымханова 34",
        contact: "8 (7142) 50 30 31",
    },
    {
        id: 7,
        name: "Департамент по Карагандинской области",
        address: "г. Караганда, ул. Ермекова, 73",
        contact: "8-7212-43-20-84",
    },
    {
        id: 8,
        name: "Департамент по Атырауской области",
        address: "г. Атырау, ул. Пушкина 163",
        contact: "8-71-22-51-24-98",
    },
    {
        id: 9,
        name: "Департамент по Туркестанской области",
        address: "г. Туркестан, мк/рн Жаңа Қала, улица 32, здание 16",
        contact: "8 (725 33) 5 90 90",
    },
    {
        id: 10,
        name: "Департамент по городу Астане",
        address: "г. Астана, ул. Амангельды Иманова, зд. 13, 7-этаж, 705 кабинет",
        contact: "8-7172-57-49-31",
    },
    {
        id: 11,
        name: "Департамент по Жамбылской области",
        address: "г. Тараз, ул. Желтоксан №78",
        contact: "8 7262-43-01-96",
    },
    {
        id: 12,
        name: "Департамент по области Жетісу",
        address: "г. Талдыкорган, ул. Кабанбай батыра 26",
        contact: "8 (7282) 32 94 32",
    },
    {
        id: 13,
        name: "Департамент по Павлодарской области",
        address: "г. Павлодар, ул. Астана 153",
        contact: "+7 (7182) 62-77-30",
    },
    {
        id: 14,
        name: "Департамент по Алматинской области",
        address: "г. Конаев, ул. Железнодорожная 25",
        contact: "8 (72-772) 2-80-44",
    },
    {
        id: 15,
        name: "Департамент по Западно-Казахстанской области",
        address: "г. Уральск, проспект Нурсултана Назарбаева, дом 188",
        contact: "8-7112-31-85-61",
    },
    {
        id: 16,
        name: "Департамент по Актюбинской области",
        address: "г. Актобе, ул. Маресьева 91, 4 этаж",
        contact: "8-7132-98-12-13",
    },
    {
        id: 17,
        name: "Департамент по Восточно-Казахстанской области",
        address: "г. Усть-Каменогорск, ул. Карла Либкнехта, 19, 7-этаж",
        contact: "+7 (7232) 25 65 02",
    },
    {
        id: 18,
        name: "Департамент по городу Шымкент",
        address: "г. Шымкент, ул. С. Байтерекова, здания №89",
        contact: "8 (7252) 27-38-42",
    },
    {
        id: 19,
        name: "Департамент по области Абай",
        address: "г. Семей, ул. Мангелик Ел, 9",
        contact: "+7 (7222) 35-37-70",
    },
    {
        id: 20,
        name: "Департамент по Кызылординской области",
        address: "г. Кызылорда, ул. Бейбарыс Султан, зд. 1",
        contact: "8-724-229-03-37",
    },
];

export default function BranchesMapPage() {
    return (
        <View style={styles.container}>
            {/* Placeholder for the Map */}
            <View style={styles.mapPlaceholder}>
                <Text style={styles.mapText}>Карта будет добавлена позже</Text>
                {/*<MapView>*/}

                {/*</MapView>*/}
            </View>


            {/* List of Branches */}
            <ScrollView style={styles.branchesList}>
                {branches.map((branch) => (
                    <View key={branch.id} style={styles.branchCard}>
                        <Text style={styles.branchName}>{branch.name}</Text>
                        <Text style={styles.branchDetails}>{branch.address}</Text>
                        <Text style={styles.branchDetails}>{branch.contact}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F4F8",
        padding: 10,
        paddingTop: 60,
    },
    mapPlaceholder: {
        height: 250,
        backgroundColor: "#D0E0F0",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 20,
    },
    mapText: {
        fontSize: 16,
        color: "#555",
    },
    branchesList: {
        flex: 1,
    },
    branchCard: {
        backgroundColor: "#FFFFFF",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    branchName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    branchDetails: {
        fontSize: 16,
        color: "#555",
        marginTop: 5,
    },
});