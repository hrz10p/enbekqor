import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform, Keyboard } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as SecureStore from 'expo-secure-store';

export default function ComplaintScreen() {
    const [complaint, setComplaint] = useState("");
    const [attachedFile, setAttachedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
    const [userPhone, setUserPhone] = useState("");
    const [userFullName, setUserFullName] = useState("");
    const [token, setToken] = useState<string | null>(null);

    // Fetch token and user profile on mount
    useEffect(() => {
        const loadTokenAndProfile = async () => {
            let storedToken;
            if (Platform.OS === 'web') {
                storedToken = localStorage.getItem('userToken');
            } else {
                storedToken = await SecureStore.getItemAsync('userToken');
            }
            if (storedToken) {
                setToken(storedToken);
                await fetchUserProfile(storedToken);
            } else {
                Alert.alert("Ошибка", "Пожалуйста, войдите в аккаунт.");
            }
        };
        loadTokenAndProfile();
    }, []);

    // Fetch user profile
    const fetchUserProfile = async (token: string) => {
        try {
            const response = await fetch("https://api.enbekqor.kz/v1/auth/profile", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (response.ok) {
                setUserPhone(data.phone);
                setUserFullName(data.full_name);
            } else {
                Alert.alert("Ошибка", "Не удалось загрузить данные пользователя");
            }
        } catch (error) {
            Alert.alert("Ошибка", "Произошла ошибка при загрузке профиля");
        }
    };

    // Function to pick a file
    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        if (!result.canceled && result.assets.length > 0) {
            setAttachedFile(result.assets[0]);
        }
    };

    // Handle complaint submission
    const handleSubmit = async () => {
        if (!complaint) {
            Alert.alert("Ошибка", "Пожалуйста, опишите проблему.");
            return;
        }
        if (!token) {
            Alert.alert("Ошибка", "Пожалуйста, войдите в аккаунт для подачи жалобы.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("problem", complaint);
            if (attachedFile) {
                formData.append("file", {
                    uri: attachedFile.uri,
                    type: attachedFile.mimeType,
                    name: attachedFile.name,
                });
            }

            const response = await fetch("https://api.enbekqor.kz/v1/complaints", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert("Успех", "Ваша жалоба отправлена.");
                setComplaint("");
                setAttachedFile(null);
                Keyboard.dismiss(); // Закрытие клавиатуры после отправки
            } else {
                Alert.alert("Ошибка", data.message || "Не удалось отправить жалобу");
            }
        } catch (error) {
            Alert.alert("Ошибка", "Произошла ошибка при отправке жалобы");
        }
    };

    // Handle keyboard dismissal on submit
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Подать жалобу</Text>

            <Text style={styles.userInfo}>
                {userFullName ? `Имя: ${userFullName}` : "Загрузка..."}
            </Text>
            <Text style={styles.userInfo}>
                {userPhone ? `Телефон: ${userPhone}` : "Загрузка..."}
            </Text>

            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Опишите проблему"
                multiline
                numberOfLines={5}
                value={complaint}
                onChangeText={setComplaint}
                returnKeyType="done" // Устанавливает кнопку "Готово" на клавиатуре
                onSubmitEditing={dismissKeyboard} // Закрывает клавиатуру при нажатии "Готово"
                blurOnSubmit={true} // Убирает фокус после отправки
            />

            <TouchableOpacity style={styles.fileButton} onPress={pickDocument}>
                <Text style={styles.fileButtonText}>
                    {attachedFile ? `Файл: ${attachedFile.name}` : "Прикрепить файл (необязательно)"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Отправить</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        flex: 1,
        backgroundColor: "#f4f9ff",
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2A66FF",
        textAlign: "center",
        marginBottom: 20,
    },
    userInfo: {
        fontSize: 16,
        color: "#333",
        marginBottom: 10,
    },
    input: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#A5C0FF",
        marginBottom: 15,
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
    },
    fileButton: {
        backgroundColor: "#E0EBFF",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 15,
    },
    fileButtonText: {
        color: "#2A66FF",
        fontSize: 16,
    },
    button: {
        backgroundColor: "#2A66FF",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});