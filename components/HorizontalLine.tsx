import React from "react";
import {View, StyleSheet, TextInput} from "react-native";

export function HorizontalLine() {
    return (
        <View style={styles.line}></View>
    );
}

const styles = StyleSheet.create({
    line: {
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        height: 1,
    },
})