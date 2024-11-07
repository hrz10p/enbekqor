import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="(tabs)/Main"
        options={{
          title: "Главная",
          tabBarIcon: () => <FontAwesome name="home" size={24} />,
        }}
      />
      <Tabs.Screen
        name="(tabs)/Search"
        options={{
          title: "Искать",
          tabBarIcon: () => <FontAwesome name="search" size={24} />,
        }}
      />
      <Tabs.Screen
        name="(tabs)/Help"
        options={{
          title: "Помощь",
          tabBarIcon: () => <FontAwesome name="question-circle" size={24} />,
        }}
      />
      <Tabs.Screen
        name="(tabs)/Profile"
        options={{
          title: "Профиль",
          tabBarIcon: () => <FontAwesome name="user" size={24} />,
        }}
      />
    </Tabs>
  );
}
