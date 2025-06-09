import React, { SetStateAction, useRef, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform, KeyboardAvoidingView, Dimensions, ActivityIndicator } from "react-native";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import RenderHTML from 'react-native-render-html';

export default function Chat() {
    const [inputText, setInputText] = useState("");
    const [inputHeight, setInputHeight] = useState(40); // Initial height of TextInput
    const [messages, setMessages] = useState([{ type: 'bot', text: 'Привет! Чем я могу вам помочь?' }]);
    const scrollViewRef = useRef<ScrollView>(null);
    const inputWidth = useRef(0);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false); // State for loading animation

    // Fetch token on mount
    useEffect(() => {
        const loadToken = async () => {
            if (Platform.OS === 'web') {
                const storedToken = localStorage.getItem('userToken');
                if (storedToken) setToken(storedToken);
            } else {
                const storedToken = await SecureStore.getItemAsync('userToken');
                if (storedToken) setToken(storedToken);
            }
        };
        loadToken();
    }, []);

    const calculateHeight = (text: string, width: number) => {
        const fontSize = 16; // Font size of the text
        const charWidth = fontSize * 0.6; // Approximate width of each character
        const maxCharsPerLine = Math.floor(width / charWidth); // Maximum characters per line
        const lines = Math.ceil(text.length / maxCharsPerLine); // Calculate lines based on text length
        const lineHeight = 24; // Approximate height of a line
        return lines * lineHeight; // Total height
    };

    const renderUserMessage = async (text: string) => {
        if (!text || text.trim().length < 1) return; // Ignore empty messages

        // Add user message immediately with "Отправляется..." status
        const userMessage = { type: 'user', text: `${text} (Отправляется...)` };
        setMessages((prevMessages: any[]) => [...prevMessages, userMessage]);

        if (!token) {
            Alert.alert("Ошибка", "Пожалуйста, войдите для отправки сообщения.");
            setMessages((prevMessages: any[]) => prevMessages.slice(0, -1)); // Remove pending message if no token
            return;
        }

        setIsLoading(true); // Start loading animation
        scrollViewRef.current?.scrollToEnd({ animated: true });

        try {
            const response = await fetch("https://api.enbekqor.kz/v1/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ message: text }),
            });

            const data = await response.json();
            if (response.ok) {
                // Update user message to confirmed status and add bot response
                const updatedMessages = [...messages];
                updatedMessages[updatedMessages.length - 1] = { type: 'user', text }; // Remove "(Отправляется...)"
                let botText = data.answer || 'Спасибо за ваш вопрос. Мы проверим это!';
                if (data.relevant_articles && data.relevant_articles.length > 0) {
                    botText += "<br/><br/><strong>Связанные статьи:</strong><br/>";
                    data.relevant_articles.forEach((article: any, index: number) => {
                        botText += `<strong>${index + 1}. ${article.article} (ID: ${article.id})</strong><br/>${article.text}<br/><br/>`;
                    });
                }
                updatedMessages.push({ type: 'bot', text: botText });
                setMessages(updatedMessages);
            } else {
                Alert.alert("Ошибка", data.message || "Не удалось получить ответ от сервера.");
                setMessages((prevMessages: any[]) => prevMessages.slice(0, -1)); // Remove pending message on error
            }
        } catch (error) {
            Alert.alert("Ошибка", "Произошла ошибка при отправке сообщения.");
            setMessages((prevMessages: any[]) => prevMessages.slice(0, -1)); // Remove pending message on error
        }

        setIsLoading(false); // Stop loading animation
        setInputText(''); // Clear the input field
        setInputHeight(40);
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 200);
    };

    return (
        <>
            {token ? (
                <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <AntDesign name="left" size={25} />
                        </TouchableOpacity>
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Чат с гидом</Text>
                        <View style={styles.header_btns}>
                            <TouchableOpacity style={styles.header_btn}>
                                <Feather name="share" size={23} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.header_btn}>
                                <FontAwesome name="bookmark-o" size={23} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.header_btn}>
                                <Feather name="more-horizontal" size={23} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ScrollView style={styles.chatContainer} ref={scrollViewRef}>
                        {messages.map((message, index) => (
                            <View
                                key={index}
                                style={
                                    message.type === 'bot'
                                        ? styles.botMessage
                                        : styles.userMessage
                                }
                            >
                                {message.type === 'bot' && (
                                    <View style={styles.botAvatar} />
                                )}
                                {message.type === 'bot' ? (
                                    <RenderHTML
                                        source={{ html: message.text }}
                                        contentWidth={Dimensions.get('window').width * 0.8} // Max width of bot message
                                        baseStyle={styles.botMessageText}
                                        tagsStyles={{
                                            strong: { fontWeight: 'bold' },
                                            em: { fontStyle: 'italic' },
                                        }}
                                    />
                                ) : (
                                    <Text
                                        style={[
                                            styles.messageText,
                                            message.type === 'bot'
                                                ? styles.botMessageText
                                                : styles.userMessageText,
                                        ]}
                                    >
                                        {message.text}
                                    </Text>
                                )}
                                {isLoading && index === messages.length - 1 && message.type === 'user' && (
                                    <ActivityIndicator style={styles.loadingIndicator} size="small" color="#599BFF" />
                                )}
                            </View>
                        ))}
                    </ScrollView>
                    {/* Input Section */}
                    <View
                        style={styles.inputContainer}
                        onLayout={(event) => {
                            inputWidth.current = event.nativeEvent.layout.width;
                        }}
                    >
                        <TextInput
                            style={[styles.input, { height: Math.max(40, Math.min(200, inputHeight)) }]}
                            placeholder="Сообщение..."
                            placeholderTextColor="#aaa"
                            multiline={true}
                            value={inputText}
                            onChangeText={(text) => {
                                setInputText(text);
                                const height = calculateHeight(text, inputWidth.current);
                                setInputHeight(Math.max(40, Math.min(200, height)));
                                scrollViewRef.current?.scrollToEnd({ animated: true });
                            }}
                            onContentSizeChange={(event) => {
                                setInputHeight(event.nativeEvent.contentSize.height);
                            }}
                        />
                        <TouchableOpacity
                            style={[
                                styles.sendButton,
                                inputText.trim() ? styles.sendButtonActive : styles.sendButtonDisabled,
                            ]}
                            disabled={!inputText.trim()}
                            onPress={() => {
                                renderUserMessage(inputText);
                            }}
                        >
                            <AntDesign
                                name="arrowup"
                                size={20}
                                color={inputText.trim() ? "white" : "rgba(160, 156, 171, 1)"}
                            />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            ) : (
                <View style={styles.unauthorizedContainer}>
                    <Text style={styles.unauthorizedText}>Пожалуйста, войдите в аккаунт для доступа к чату.</Text>
                    <Link href="/Profile" asChild>
                        <TouchableOpacity style={styles.loginButton}>
                            <Text style={styles.loginButtonText}>Войти</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    unauthorizedContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
    },
    unauthorizedText: {
        fontSize: 18,
        color: "#333",
        textAlign: "center",
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: "#007bff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    header: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "#fff",
        zIndex: 10,
        position: "relative",
        top: 0,
        elevation: 5, // Shadow for Android
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    header_btns: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    header_btn: {
        marginHorizontal: 8,
        padding: 5,
    },
    chatContainer: {
        flex: 1,
        padding: 10,
        paddingBottom: 10, // Extra padding at bottom for content
    },
    botAvatar: {
        backgroundColor: "rgba(89, 155, 255, 0.5)",
        borderRadius: 25,
        width: 32,
        height: 32,
        alignSelf: "flex-end",
        marginRight: 10,
    },
    botMessage: {
        alignSelf: "flex-start",
        borderRadius: 8,
        marginVertical: 5,
        padding: 10,
        maxWidth: "80%",
        display: "flex",
        flexDirection: "row",
    },
    userMessage: {
        alignSelf: "flex-end",
        backgroundColor: "rgba(89, 155, 255, 1)",
        borderRadius: 8,
        marginVertical: 5,
        padding: 10,
        maxWidth: "80%",
    },
    botMessageText: {
        backgroundColor: "rgba(89, 155, 255, 0.25)",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 12,
    },
    userMessageText: {
        color: "#fff",
    },
    messageText: {
        fontSize: 16,
        color: "#333",
    },
    inputContainer: {
        flexDirection: "row",
        padding: 10,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        paddingBottom: Platform.OS === 'android' ? 10 : 0, // Extra padding for Android
    },
    input: {
        width: "100%",
        flex: 1,
        borderColor: "#ccc",
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingRight: 40,
        paddingVertical: 8,
        backgroundColor: "rgb(214,217,223)",
        fontSize: 16,
        maxHeight: 200,
        overflow: "scroll",
    },
    sendButton: {
        position: "absolute",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        right: 20,
        bottom: 16,
        paddingVertical: 3,
        paddingHorizontal: 4,
    },
    sendButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    sendButtonDisabled: {},
    sendButtonActive: {
        backgroundColor: "#007bff", // Active blue color for enabled state
    },
    loadingIndicator: {
        marginTop: 5,
    },
});