import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import { FontAwesome5 } from "@expo/vector-icons";
import * as IntentLauncher from "expo-intent-launcher";

const FILES_API_URL = "https://api.enbekqor.kz/v1/public/file";
const DOWNLOAD_API_URL = "https://api.enbekqor.kz/v1/public/file";

const ApplicationTemplates = () => {
    const [files, setFiles] = React.useState([]);

    // Fetch file list from API
    React.useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch(FILES_API_URL);
                const data = await response.json();
                setFiles(data);
            } catch (error) {
                Alert.alert("Ошибка", "Не удалось загрузить файлы.");
            }
        };
        fetchFiles();
    }, []);

    // Download file to device storage
    const handleDownload = async (fileId: string, fileName: string) => {
        try {
            const fileUri = `${FileSystem.documentDirectory}${fileName}`;
            const downloadResumable = FileSystem.createDownloadResumable(
                `${DOWNLOAD_API_URL}/${fileId}/download`,
                fileUri
            );

            const { uri }: any = await downloadResumable.downloadAsync();

            Alert.alert("Скачивание завершено", `Файл сохранен: ${uri}`, [
                { text: "Открыть", onPress: () => IntentLauncher.startActivityAsync("android.intent.action.VIEW", { data: uri }) },
                { text: "OK" },
            ]);
        } catch (error) {
            Alert.alert("Ошибка", "Не удалось скачать файл.");
        }
    };

    const renderItem = ({ item }: { item: { id: string; name: string } }) => (
        <TouchableOpacity style={styles.card} onPress={() => handleDownload(item.id, item.name)}>
            <FontAwesome5 name="file-alt" size={24} color="#3498db" style={styles.icon} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.description}>Нажмите для загрузки</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Шаблоны заявлений</Text>
            <FlatList data={files} keyExtractor={(item) => item.id} renderItem={renderItem} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f9ff",
        padding: 20,
        paddingTop: 60,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2c3e50",
        marginBottom: 20,
        textAlign: "center",
    },
    card: {
        backgroundColor: "#ffffff",
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        shadowColor: "#3498db",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        elevation: 4,
    },
    icon: {
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2c3e50",
    },
    description: {
        fontSize: 14,
        color: "#7f8c8d",
    },
});

export default ApplicationTemplates;
