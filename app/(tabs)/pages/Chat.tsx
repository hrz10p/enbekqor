import React, {SetStateAction, useRef, useState} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import {AntDesign, Feather, FontAwesome} from "@expo/vector-icons";
import {Link, router} from "expo-router";


export default function Chat() {

    const [inputText, setInputText] = useState("");
    const [inputHeight, setInputHeight] = useState(40); // Initial height of TextInput
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Привет! Чем я могу вам помочь?' },
    ]);
    const scrollViewRef = useRef<ScrollView>(null);
    const inputWidth = useRef(0);

    const calculateHeight = (text: string, width: number) => {
        const fontSize = 16; // Font size of the text
        const charWidth = fontSize * 0.6; // Approximate width of each character
        const maxCharsPerLine = Math.floor(width / charWidth); // Maximum characters per line
        const lines = Math.ceil(text.length / maxCharsPerLine); // Calculate lines based on text length
        const lineHeight = 24; // Approximate height of a line
        return lines * lineHeight; // Total height
    };

    const renderConsultMessage = (text: any) => {

    }
    const renderUserMessage = (text: any) => {
        if (!text || text.trim().length < 1) {
            return; // Ignore empty messages
        }

        // Add user message
        // @ts-ignore
        setMessages((prevMessages: any[]) => [...prevMessages, { type: 'user', text }]);

        // Simulate a bot response
        setTimeout(() => {
            // @ts-ignore
            setMessages((prevMessages) => [
                ...prevMessages,
                { type: 'bot', text: 'Спасибо за ваш вопрос. Мы проверим это!' },
            ]);
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100); // Delay for bot's response

        setInputText(''); // Clear the input field
        setInputHeight(40);
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 200);
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name={"left"} size={25}></AntDesign>
                </TouchableOpacity>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Чат с гидом</Text>
                <View style={styles.header_btns}>
                    <TouchableOpacity style={styles.header_btn}>
                        <Feather name={"share"} size={23}></Feather>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.header_btn}>
                        <FontAwesome name={"bookmark-o"} size={23}></FontAwesome>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.header_btn}>
                        <Feather name={"more-horizontal"} size={23}></Feather>
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
                            <View style={styles.botAvatar}></View>
                        )}
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
                    </View>
                ))}
            </ScrollView>
            {/* Input Section */}
            <View
                style={styles.inputContainer}
                onLayout={(event) => {
                    // Capture the width of the TextInput container
                    inputWidth.current = event.nativeEvent.layout.width;
                }}
            >
                <TextInput
                    style={[styles.input, { height: Math.max(40, Math.min(200, inputHeight)) }]} // Shrink or expand dynamically
                    placeholder="Сообщение..."
                    placeholderTextColor="#aaa"
                    multiline={true}
                    value={inputText}
                    onChangeText={(text) => {
                        setInputText(text); // Update input text
                        const height = calculateHeight(text, inputWidth.current); // Calculate new height
                        setInputHeight(Math.max(40, Math.min(200, height))); // Adjust height
                        scrollViewRef.current?.scrollToEnd({ animated: true });
                    }}
                    onContentSizeChange={(event) => {
                        // Capture any edge cases where content size changes
                        setInputHeight(event.nativeEvent.contentSize.height);
                    }}
                />
                <TouchableOpacity
                    style={[
                        styles.sendButton,
                        inputText.trim() ? styles.sendButtonActive : styles.sendButtonDisabled,
                    ]}
                    id={"sendButton"}
                    disabled={!inputText.trim()}
                    onPress={() => {
                        renderUserMessage(inputText);
                    }}
                >
                    <AntDesign
                        name={"arrowup"}
                        size={20}
                        color={inputText.trim() ? "white" : "rgba(160, 156, 171, 1)"}
                        id={"sendButtonIcon"} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        justifyContent: "space-between",
    },
    header: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    header_btns: {
        display: "flex",
        flexDirection: "row"
    },
    header_btn: {
      marginHorizontal: 3,
    },
    chatContainer: {
        flex: 1,
        padding: 10,
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
      color: "#fff"
    },
    messageText: {
        fontSize: 16,
        color: "#333",
    },
    inputContainer: {
        flexDirection: "row",
        padding: 10,
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
    sendButtonDisabled: {
    },
    sendButtonActive: {
        backgroundColor: "#007bff", // Active blue color for enabled state
    },
});
