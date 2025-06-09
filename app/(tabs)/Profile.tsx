import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, Alert, Modal, Platform } from "react-native";
import { useTranslation } from "react-i18next";
import * as SecureStore from 'expo-secure-store';
import DropDownPicker from "react-native-dropdown-picker";
import i18n from "@/utilities/internationalization";
import { Image } from "expo-image";
import LanguagePicker from "@/components/LanguagePicker";
import { useLanguage } from "@/src/context/language-context";
import { useFocusEffect } from '@react-navigation/native'; // Импорт useFocusEffect
import { Feather } from '@expo/vector-icons'; // Импорт иконок

export default function ProfileScreen() {
    const { t } = useTranslation();
    const { language, setLanguage } = useLanguage();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(language);
    const [items, setItems] = useState([
        { label: t("russian"), value: "ru" },
        { label: t("kazakh"), value: "kz" },
    ]);
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [complaints, setComplaints] = useState([]);
    const [token, setToken] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Fetch token from SecureStore on mount
    useEffect(() => {
        const loadToken = async () => {
            if (Platform.OS === 'web') {
                const storedToken = localStorage.getItem('userToken');
                if (storedToken) {
                    setToken(storedToken);
                }
            } else {
                const storedToken = await SecureStore.getItemAsync('userToken');
                if (storedToken) {
                    setToken(storedToken);
                }
            }
        };
        loadToken();
    }, []);

    // Update language items when language changes
    useEffect(() => {
        setItems([
            { label: t("russian"), value: "ru" },
            { label: t("kazakh"), value: "kz" },
        ]);
        setValue(language);
    }, [language, t]);

    // Handle language change
    const handleLanguageChange = (selectedValue: string) => {
        setValue(selectedValue);
        setLanguage(selectedValue);
        i18n.changeLanguage(selectedValue);
    };

    // Fetch complaints
    const fetchComplaints = async (token: string) => {
        try {
            const response = await fetch("https://api.enbekqor.kz/v1/complaints", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (response.ok) {
                setComplaints(data);
            } else {
                Alert.alert("Ошибка", "Не удалось загрузить жалобы");
            }
        } catch (error) {
            Alert.alert("Ошибка", "Произошла ошибка при загрузке жалоб");
        }
    };

    // UseFocusEffect to refresh complaints when screen is focused
    useFocusEffect(
        useCallback(() => {
            if (token) {
                fetchComplaints(token);
            }
        }, [token])
    );

    // Signup function
    const handleSignup = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Ошибка", "Пароли не совпадают");
            return;
        }
        try {
            const response = await fetch("https://api.enbekqor.kz/v1/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone, password, full_name: fullName }),
            });
            const data = await response.json();
            if (response.ok) {
                Alert.alert("Успех", "Регистрация прошла успешно!");
                if (Platform.OS === 'web') {
                    localStorage.setItem('userToken', data.access_token);
                } else {
                    await SecureStore.setItemAsync('userToken', data.access_token);
                }
                setToken(data.access_token);
                setPhone(data.user.phone);
                setFullName(data.user.full_name);
                setIsModalVisible(false);
                fetchComplaints(data.access_token);
            } else {
                Alert.alert("Ошибка", data.message || "Не удалось зарегистрироваться");
            }
        } catch (error) {
            Alert.alert("Ошибка", "Произошла ошибка при регистрации");
        }
    };

    // Signin function
    const handleSignin = async () => {
        try {
            const response = await fetch("https://api.enbekqor.kz/v1/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone, password }),
            });
            const data = await response.json();
            if (response.ok) {
                await SecureStore.setItemAsync('userToken', data.access_token);
                setToken(data.access_token);
                setPhone(data.user.phone);
                setFullName(data.user.full_name);
                fetchComplaints(data.access_token);
                Alert.alert("Успех", "Вход выполнен успешно!");
            } else {
                Alert.alert("Ошибка", data.message || "Неверные данные");
            }
        } catch (error) {
            Alert.alert("Ошибка", "Произошла ошибка при входе");
        }
    };

    // Signout function
    const handleSignout = async () => {
        if (Platform.OS === 'web') {
            localStorage.removeItem('userToken');
        } else {
            await SecureStore.deleteItemAsync('userToken');
        }
        setToken(null);
        setComplaints([]);
        Alert.alert("Успех", "Вы вышли из аккаунта");
    };

    // Handle refresh button
    const handleRefresh = () => {
        if (token) {
            fetchComplaints(token);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.userShortInfo}>
                <View style={styles.userAvatarBlock}>
                    <Image
                        source={require("../../assets/images/icons/avatar-15.png")}
                        style={[styles.userAvatarImage]}
                        contentFit={"contain"}
                    />
                </View>
                <View style={styles.userData}>
                    <Text style={styles.userDataName}>
                        {token ? fullName : "Гость"}
                    </Text>
                    <Text style={styles.userDataAgeCity}>
                        {token ? phone : "Пожалуйста, войдите"}
                    </Text>
                </View>
                <LanguagePicker value={value} onChange={handleLanguageChange} />
            </View>

            {!token && (
                <View style={styles.authSection}>
                    <TextInput
                        style={styles.input}
                        placeholder="Телефон"
                        value={phone}
                        onChangeText={setPhone}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Пароль"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSignin}>
                        <Text style={styles.buttonText}>Войти</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                        <Text style={styles.registerLink}>{t("register")}</Text>
                    </TouchableOpacity>
                </View>
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{t("register")}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={t("full_name")}
                            value={fullName}
                            onChangeText={setFullName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={t("phone")}
                            value={phone}
                            onChangeText={setPhone}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={t("password")}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={t("confirm_password")}
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        <TouchableOpacity style={styles.modalButton} onPress={handleSignup}>
                            <Text style={styles.buttonText}>Подтвердить</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                            <Text style={styles.closeLink}>{t("close")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {token && (
                <View style={styles.authSection}>
                    <TouchableOpacity style={styles.button} onPress={handleSignout}>
                        <Text style={styles.buttonText}>Выйти</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.userApplicationsBlock}>
                <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10}}>
                    <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                        История жалоб
                    </Text>
                    <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
                        <Feather name="refresh-ccw" size={24} color="#599BFF" />
                    </TouchableOpacity>
                </View>
                {complaints.length > 0 ? (
                    complaints.map((complaint: any) => (
                        <TouchableOpacity key={complaint.id} style={styles.userApplication}>
                            <Text style={styles.userApplicationTitle}>
                                {complaint.problem || `Жалоба ${complaint.id}`}
                            </Text>
                            <Text style={styles.userApplicationDescription}>
                                {complaint.created_at || "Дата неизвестна"}
                            </Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.noComplaints}>Нет жалоб</Text>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        width: "100%",
        height: "100%",
        padding: 10,
    },
    userShortInfo: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 10,
        gap: 15,
    },
    userAvatarBlock: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        backgroundColor: "#E5E5E5",
    },
    userAvatarImage: {
        width: "100%",
        height: "100%",
    },
    userData: {
        flex: 1,
        paddingHorizontal: 10,
    },
    userDataName: {
        color: "#000",
        fontSize: 19,
        fontWeight: "bold",
        textAlign: "center",
    },
    userDataAgeCity: {
        color: "#000",
        fontSize: 15,
        textAlign: "center",
    },
    authSection: {
        padding: 10,
        gap: 10,
    },
    input: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    button: {
        backgroundColor: "#599BFF",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    registerLink: {
        color: "#599BFF",
        textDecorationLine: "underline",
        textAlign: "center",
        marginTop: 5,
        fontSize: 14,
    },
    userApplicationsBlock: {
        height: "100%",
        zIndex: 1,
        marginTop: 20
    },
    userApplication: {
        marginVertical: 10,
        padding: 10,
        borderRadius: 15,
        shadowColor: "rgba(34, 60, 80, 1)",
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 4,
        shadowOpacity: 0.2,
    },
    userApplicationTitle: {
        fontSize: 17,
        fontWeight: "bold",
    },
    userApplicationDescription: {
        fontSize: 15,
    },
    noComplaints: {
        fontSize: 16,
        textAlign: "center",
        marginTop: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        gap: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    modalButton: {
        backgroundColor: "#599BFF",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    closeLink: {
        color: "#599BFF",
        textDecorationLine: "underline",
        textAlign: "center",
        marginTop: 10,
    },
    refreshButton: {
        marginBottom: 10,
    },
});