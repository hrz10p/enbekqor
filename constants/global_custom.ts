import {Platform, StyleSheet} from "react-native";

const GLOBAL_CUSTOM = StyleSheet.create({
    "fw-reg": {
        fontFamily: Platform.select({
            android: 'Roboto_400Regular',
            ios: 'Roboto-Regular',
        }),
    },
    "fw-bold": {
        fontFamily: Platform.select({
            android: 'Roboto_700Bold',
            ios: 'Roboto-Bold',
        }),
    },
    "fw-black": {
        fontFamily: Platform.select({
            android: 'Roboto_900Black',
            ios: 'Roboto-Black',
        }),
    }
});

export default GLOBAL_CUSTOM;