import { Tabs } from 'expo-router';
import { Entypo, FontAwesome, Ionicons, Feather } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import GLOBAL_CUSTOM from "@/constants/global_custom";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "@/utilities/internationalization";

export default function TabLayout() {
    const { t } = useTranslation();
    return (
        <I18nextProvider i18n={i18n}>
            <View style={{ height: "100%", paddingBottom: 20, backgroundColor: "#fff" }}>
                <Tabs
                    screenOptions={{
                        tabBarActiveTintColor: '#599BFF',
                        headerShadowVisible: false,
                        tabBarStyle: {
                            shadowOpacity: 0,
                            elevation: 0,
                            borderTopWidth: 0,
                            height: 60,
                        },
                    }}
                >
                    <Tabs.Screen
                        name="index"
                        options={{
                            title: t('main_page_title'),
                            tabBarIcon: ({ color }) => <Entypo name="home" color={color} size={24} />,
                            headerShown: false,
                            tabBarLabelStyle: styles.tabBarLabel,
                        }}
                    />
                    <Tabs.Screen
                        name="Search"
                        options={{
                            title: t('search_page_title'),
                            tabBarIcon: ({ color }) => <FontAwesome name="search" color={color} size={24} />,
                            headerShown: false,
                            tabBarLabelStyle: styles.tabBarLabel,
                        }}
                    />
                    <Tabs.Screen
                        name="Help"
                        options={{
                            title: t('help_page_title'),
                            tabBarIcon: ({ color }) => <Ionicons name="help-circle-outline" color={color} size={30} style={{ fontWeight: "900" }} />,
                            headerShown: false,
                            tabBarLabelStyle: styles.tabBarLabel,
                        }}
                    />
                    <Tabs.Screen
                        name="Profile"
                        options={{
                            title: t('profile_page_title'),
                            tabBarIcon: ({ color }) => <Feather name="user" color={color} size={30} style={{ fontWeight: "900" }} />,
                            headerShown: false,
                            tabBarLabelStyle: styles.tabBarLabel,
                        }}
                    />
                    <Tabs.Screen
                        name="pages/Chat"
                        options={{
                            title: "Чат с гидом",
                            href: null,
                            headerShown: false,
                        }}
                    />
                    <Tabs.Screen
                        name="pages/ApplicationTemplates"
                        options={{
                            title: "Шаблоны заявлений",
                            href: null,
                            headerShown: false,
                        }}
                    />
                    <Tabs.Screen
                        name="pages/Contacts"
                        options={{
                            title: "Контакты",
                            href: null,
                            headerShown: false,
                        }}
                    />
                    <Tabs.Screen
                        name="pages/Complaint"
                        options={{
                            title: "Подать жалобу",
                            href: null,
                            headerShown: false,
                        }}
                    />
                    <Tabs.Screen
                        name="pages/Map"
                        options={{
                            title: "Карта",
                            href: null,
                            headerShown: false,
                        }}
                    />
                </Tabs>
            </View>
        </I18nextProvider>
    );
}

const styles = StyleSheet.create({
    icon: {
        color: "#8C8C8C",
    },
    tabBarLabel: {
        fontWeight: "bold",
        fontFamily: GLOBAL_CUSTOM["fw-reg"].fontFamily,
        fontSize: 12,
        textAlign: "center"
    }
});