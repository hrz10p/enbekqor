import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import from react-native-vector-icons

export function SearchBar() {
    return (
        <View style={styles.container}>
            <Ionicons name="search" size={20} color="#A0A0A0" style={styles.icon} />
            <TextInput
                style={styles.input}
                placeholder="Что ищете?"
                placeholderTextColor="#A0A0A0"
            />
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
});

export default SearchBar;
