import React, { useState } from "react";
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const mockResults = [
  { id: "1", title: "Как оформить отпуск?" },
  { id: "2", title: "Права работника при увольнении" },
  { id: "3", title: "Как составить жалобу на работодателя?" },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState(mockResults);

  const handleSearch = (query: any) => {
    setSearchQuery(query);
    setFilteredResults(
        mockResults.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
    );
  };

  return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={20} color="#599BFF" style={styles.searchIcon} />
          <TextInput
              style={styles.searchInput}
              placeholder="Поиск..."
              value={searchQuery}
              onChangeText={handleSearch}
          />
        </View>
        <FlatList
            data={filteredResults}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.resultItem}>
                  <Text style={styles.resultText}>{item.title}</Text>
                </TouchableOpacity>
            )}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#599BFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  resultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  resultText: {
    fontSize: 16,
  },
});