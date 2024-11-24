import React, {useState} from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList} from "react-native";
import SearchBar from "@/components/SearchBar";
import {HorizontalLine} from "@/components/HorizontalLine";
import GLOBAL_CUSTOM from "@/constants/global_custom";
import {Link} from "expo-router";
import {Feather} from "@expo/vector-icons";

export default function HelpScreen() {

  const categories = [
    {
      "title": "Обязанности работодателя",
      "questions": [
        {
          "question": "Какие обязанности у работодателя по обеспечению безопасных условий труда?",
          "text": "В соответствии с законодательством Казахстана предусмотрены следующие виды отпусков: Ежегодный оплачиваемый отпуск, который включает основной отпуск с минимальной продолжительностью 24 календарных дня и дополнительный отпуск за работу во вредных или опасных условиях труда, за ненормированный рабочий день или за продолжительную работу на одном месте. Социальные отпуска, включая отпуск по беременности и родам, который предоставляется женщинам на срок не менее 126 календарных дней (70 дней до родов и 56 дней после), а также отпуск по уходу за ребенком до достижения ребенком трехлетнего возраста с возможностью частичного сохранения заработной платы в первые годы."
        },
        {
          "question": "Какие обязанности у работодателя по обеспечению безопасных условий труда?",
          "text": "В соответствии с законодательством Казахстана предусмотрены следующие виды отпусков: Ежегодный оплачиваемый отпуск, который включает основной отпуск с минимальной продолжительностью 24 календарных дня и дополнительный отпуск за работу во вредных или опасных условиях труда, за ненормированный рабочий день или за продолжительную работу на одном месте. Социальные отпуска, включая отпуск по беременности и родам, который предоставляется женщинам на срок не менее 126 календарных дней (70 дней до родов и 56 дней после), а также отпуск по уходу за ребенком до достижения ребенком трехлетнего возраста с возможностью частичного сохранения заработной платы в первые годы."
        },
        {
          "question": "Какие обязанности у работодателя по обеспечению безопасных условий труда?",
          "text": "В соответствии с законодательством Казахстана предусмотрены следующие виды отпусков: Ежегодный оплачиваемый отпуск, который включает основной отпуск с минимальной продолжительностью 24 календарных дня и дополнительный отпуск за работу во вредных или опасных условиях труда, за ненормированный рабочий день или за продолжительную работу на одном месте. Социальные отпуска, включая отпуск по беременности и родам, который предоставляется женщинам на срок не менее 126 календарных дней (70 дней до родов и 56 дней после), а также отпуск по уходу за ребенком до достижения ребенком трехлетнего возраста с возможностью частичного сохранения заработной платы в первые годы."
        },
        {
          "question": "Какие обязанности у работодателя по обеспечению безопасных условий труда?",
          "text": "В соответствии с законодательством Казахстана предусмотрены следующие виды отпусков: Ежегодный оплачиваемый отпуск, который включает основной отпуск с минимальной продолжительностью 24 календарных дня и дополнительный отпуск за работу во вредных или опасных условиях труда, за ненормированный рабочий день или за продолжительную работу на одном месте. Социальные отпуска, включая отпуск по беременности и родам, который предоставляется женщинам на срок не менее 126 календарных дней (70 дней до родов и 56 дней после), а также отпуск по уходу за ребенком до достижения ребенком трехлетнего возраста с возможностью частичного сохранения заработной платы в первые годы."
        },
      ]
    },
    {
      "title": "Рабочее время и отдых",
      "questions": [
        {
          "question": "Тут будут вопросы",
          "text": "Тут будут ответы"
        }
      ]
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleCategoryPress = (category: any) => {
    setSelectedCategory(category);
  };
  const toggleExpand = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const renderQuestion = ({ item, index }: any) => (
      <View style={styles.questionContainer}>
        <TouchableOpacity
            style={styles.questionHeader}
            onPress={() => toggleExpand(index)}
        >
          <Text style={styles.question}>{item.question}</Text>
          <Text style={styles.plusIcon}>
            {expandedIndex === index ? "-" : "+"}
          </Text>
        </TouchableOpacity>
        {expandedIndex === index && (
            <View style={styles.expandedBlock}>
              <Text style={styles.answerText}>{item.text}</Text>
              <Link href={"./pages/Chat"} style={styles.redirectLink}>
                <Feather name="user" color={"rgba(89, 155, 255, 1)"} size={15} style={{fontWeight: "900"}} />
                Чат с гидом
              </Link>
            </View>
        )}
      </View>
  );

  return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <SearchBar />
        </View>
        <HorizontalLine />
        <View style={styles.categories}>
          <Text style={styles.categories_heading}>Категории</Text>
        </View>
        <View style={styles.categories_picker}>
          {categories.map((category, index) => (
              <TouchableOpacity
                  key={index}
                  style={[
                    styles.category,
                    selectedCategory.title === category.title && styles.selectedCategory,
                  ]}
                  onPress={() => handleCategoryPress(category)}
              >
                <Text
                    style={[
                      styles.categoryText,
                      selectedCategory.title === category.title && styles.selectedCategoryText,
                    ]}
                >
                  {category.title}
                </Text>
              </TouchableOpacity>
          ))}
        </View>
        <FlatList
            data={selectedCategory.questions}
            renderItem={(itemProps) => renderQuestion(itemProps)}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.questionsContainer}
        />
        <View style={styles.goToChatBlock}>
          <Text style={styles.goToChatBlockText}>Не смогли найти вопрос?</Text>
          <Link href={"./pages/Chat"} style={styles.goToChatBlockLink}>Чат с гидом</Link>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    display: "flex",
    flexDirection: "column",
  },
  searchBar: {
    width: "100%",
    paddingHorizontal: 15,
    marginVertical: 15,
  },
  categories: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
  },
  categories_heading: {
    width: "100%",
    alignItems: "flex-start",
    textAlign: "left",
    fontSize: 20,
    fontFamily: GLOBAL_CUSTOM["fw-bold"].fontFamily,
    fontWeight: "bold",
    marginBottom: 20,
  },
  categories_picker: {
    width: "100%",
    overflow: "scroll",
    display: "flex",
    flexDirection: "row"
  },
  category: {
    backgroundColor: "rgba(89, 155, 255, 0.5)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginRight: 10,
    width: 150,
  },
  selectedCategory: {
    backgroundColor: "rgba(89, 155, 255, 1)",
  },
  categoryText: {
    color: "#fff",
    fontSize: 14,
  },
  selectedCategoryText: {
    fontWeight: "bold",
  },
  questionsContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
  },
  questionContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 15,
  },
  question: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    fontWeight: "bold",
  },
  plusIcon: {
    fontSize: 20,
    color: "#568CF9",
    fontWeight: "bold",
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  answerText: {
    fontSize: 14,
    color: "#555",
    marginTop: 10,
    lineHeight: 20,
  },
  expandedBlock: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  redirectLink: {
    color: "rgba(89, 155, 255, 1)",
    textDecorationLine: "underline",
  },
  goToChatBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  goToChatBlockText: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: GLOBAL_CUSTOM["fw-bold"].fontFamily,
    marginVertical: 15,
  },
  goToChatBlockLink: {
    width: "100%",
    borderRadius: 36,
    backgroundColor: "rgba(89, 155, 255, 1)",
    color: "#fff",
    fontWeight: "bold",
    fontFamily: GLOBAL_CUSTOM["fw-bold"].fontFamily,
    padding: 15,
    textAlign: "center",
    fontSize: 20,
  }
});
