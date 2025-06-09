import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {useLanguage} from "@/src/context/language-context";

// Define the prop types for the component
interface SearchBarProps {
    onQuestionSelect: (question: { id: number; categoryId: number }) => void; // Function to handle question selection
}

export function SearchBar({ onQuestionSelect }: SearchBarProps) {
    const { language } = useLanguage();
    const [inputValue, setInputValue] = useState(""); // Tracks the input value
    const [isQuestionSelected, setIsQuestionSelected] = useState(false);
    const [debouncedValue, setDebouncedValue] = useState(""); // Tracks the debounced value
    const [questions, setQuestions] = useState<
        { id: number; categoryId: number; question: string; text: string }[]
    >([]); // Tracks the fetched questions

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue); // Update debounced value after 500ms
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue]);

    useEffect(() => {
        if (debouncedValue) {
            fetch(`https://api.enbekqor.kz/v1/questions/search?query=${debouncedValue}`)
                .then((response) => response.json())
                .then((data) =>
                    setQuestions(
                        data.map((q: any) => ({
                            id: q.id,
                            categoryId: q.category_id,
                            question: language === 'ru' ? q.question_ru : q.question_kz,
                            text: language === 'ru' ? q.text_ru : q.text_kz,
                        }))
                    )
                )
                .catch((error) => console.error(error));
        }
    }, [debouncedValue]); // Runs whenever debouncedValue changes

    const handleSelectQuestion = (question: { id: number; categoryId: number, question: string }) => {
        setIsQuestionSelected(true);
        setInputValue(question.question)
        onQuestionSelect(question);
    };

    return (
        <View style={styles.container}>
            <Ionicons name="search" size={20} color="#A0A0A0" style={styles.icon} />
            <TextInput
                style={styles.input}
                placeholder="Что ищете?"
                placeholderTextColor="#A0A0A0"
                onChangeText={(text) => {
                    setInputValue(text);
                    setIsQuestionSelected(false);
                }} // Update inputValue
                value={inputValue}
            />
            <View style={[(inputValue && !isQuestionSelected) ? null : styles.hidden, styles.search_results]}>
                {questions.map((question) => (
                    <TouchableOpacity
                        key={question.id}
                        style={styles.search_results__item}
                        onPress={() => handleSelectQuestion(question)}
                    >
                        <Text style={styles.question_text}>{question.question}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#dee2e3", // Light gray background
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 40, // Adjust height as needed
        position: "relative", // Create stacking context
    },
    icon: {
        marginRight: 8, // Space between icon and text input
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#333",
        height: "100%",
    },
    search_results: {
        width: "100%",
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        flexDirection: "column",
        position: "absolute", // Required for zIndex to work
        top: "100%", // Position below the container
        elevation: 5, // Add elevation for Android support
        shadowColor: "#000", // Optional for iOS
        shadowOffset: { width: 0, height: 2 }, // Optional for iOS
        shadowOpacity: 0.2, // Optional for iOS
        shadowRadius: 4, // Optional for iOS
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    search_results__item: {
        marginVertical: 10,
        fontSize: 15,
    },
    question_text: {
        fontWeight: "bold",
    },
    expanded_text: {
        marginTop: 5,
        color: "#555",
    },
    expand_button: {
        marginTop: 5,
        alignSelf: "flex-start",
    },
    expand_button_text: {
        color: "#007BFF",
    },
    hidden: {
        display: "none",
    },
});

export default SearchBar;
