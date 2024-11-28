import { Tabs } from 'expo-router';
import {Entypo, FontAwesome, Ionicons, Feather} from "@expo/vector-icons";
import {StyleSheet} from "react-native";
import GLOBAL_CUSTOM from "@/constants/global_custom";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#599BFF',
                headerShadowVisible: false,
                tabBarStyle: {
                    shadowOpacity: 0, // Remove shadow on iOS
                    elevation: 0, // Remove shadow on Android
                    borderTopWidth: 0, // Optional: Remove the border at the top of the bottom nav bar
                    height: 60,
                },
            }}

        >
            <Tabs.Screen
                name="Main"
                options={{
                    title: "Главная",
                    tabBarIcon: ({color}) => <Entypo name="home" color={color} size={24} />,
                    headerShown: false,
                    tabBarLabelStyle: {
                        fontWeight: "bold",
                        fontFamily: GLOBAL_CUSTOM["fw-reg"].fontFamily,
                        fontSize: 12,
                    },
                }}
            />
            <Tabs.Screen
                name="Search"
                options={{
                    title: "Искать",
                    tabBarIcon: ({color}) => <FontAwesome name="search" color={color} size={24} />,
                    headerShown: false,
                    tabBarLabelStyle: {
                        fontWeight: "bold",
                        fontFamily: GLOBAL_CUSTOM["fw-reg"].fontFamily,
                        fontSize: 12,
                    },
                }}
            />
            <Tabs.Screen
                name="Help"
                options={{
                    title: "Помощь",
                    tabBarIcon: ({color}) => <Ionicons name="help-circle-outline" color={color} size={35} style={{fontWeight: "900"}} />,
                    headerShown: false,
                    tabBarLabelStyle: {
                        fontWeight: "bold",
                        fontFamily: GLOBAL_CUSTOM["fw-reg"].fontFamily,
                        fontSize: 12,
                    },
                }}
            />
            <Tabs.Screen
                name="Profile"
                options={{
                    title: "Профиль",
                    tabBarIcon: ({color}) => <Feather name="user" color={color} size={30} style={{fontWeight: "900"}} />,
                    headerShown: false,
                    tabBarLabelStyle: {
                        fontWeight: "bold",
                        fontFamily: GLOBAL_CUSTOM["fw-reg"].fontFamily,
                        fontSize: 12,
                    },
                }}
            />
            <Tabs.Screen
                name="pages/Chat"
                options={{
                    title: "Чат с гидом",
                    tabBarStyle: { display: "none" },
                    href: null,
                    headerShown: false,
                }}
            />
        </Tabs>
    );
}
const styles = StyleSheet.create({
    icon: {
        color: "#8C8C8C",
    }
});