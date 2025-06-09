import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import SearchBar from "@/components/SearchBar";
import { HorizontalLine } from "@/components/HorizontalLine";
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";
import LoadingSpinner from "@/components/LoadinSpinner";
import {useLanguage} from "@/src/context/language-context";

export default function HelpScreen() {
  const { language } = useLanguage();
  const [categories, setCategories] = useState([{id:-1, title: ""}]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState({ id: -1, questions: [] });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.enbekqor.kz/v1/categories");
        const json = await response.json();
        const categories = json.map((category: any) => {
          return {
            id: category.id,
            title: language === 'ru' ? category.title_ru : category.title_kz,
            questions: category.questions.map((question: any) => {
              return {
                id: question.id,
                category_id: question.category_id,
                question: language === 'ru' ? question.question_ru : question.question_kz,
                text: language === 'ru' ? question.text_ru : question.text_kz,
              }
            }),
          }
        });
        setCategories(categories);
        setSelectedCategory(categories[0]);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategoryPress = (category: any) => {
    setSelectedCategory(category);
    setExpandedIndex(null);
  };

  const handleQuestionSelect = (question: any) => {
    let questionIndex = selectedCategory?.questions?.findIndex(
        (q: any) => q.id === question.id
    );
    if (questionIndex == -1) {
      if (question.category_id) {
        const selectedCategory : any = categories.find(category => category.id == question.category_id);
        setSelectedCategory(selectedCategory);
        questionIndex = selectedCategory?.questions?.findIndex(
            (q: any) => q.id === question.id
        );
      }
    }
    setExpandedIndex(questionIndex !== -1 ? questionIndex : null);
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const renderQuestion = ({ item, index }: { item: any; index: number }) => (
      <View
          style={[
            styles.questionContainer,
          ]}
      >
        <TouchableOpacity
            style={styles.questionHeader}
            onPress={() => toggleExpand(index)}
        >
          <Text style={styles.question}>{item.question}</Text>
          <Text style={styles.plusIcon}>
            {index === expandedIndex ? "-" : "+"}
          </Text>
        </TouchableOpacity>
        {index === expandedIndex && (
            <View style={styles.expandedBlock}>
              <Text style={styles.answerText}>{item.text}</Text>
              <Link href={"./pages/Chat"} style={styles.redirectLink}>
                <Feather
                    name="user"
                    color={"rgba(89, 155, 255, 1)"}
                    size={15}
                    style={{ fontWeight: "900" }}
                />
                Чат с гидом
              </Link>
            </View>
        )}
      </View>
  );

  if (loading) return <LoadingSpinner />;

  return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <SearchBar onQuestionSelect={handleQuestionSelect} />
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
                    selectedCategory?.id === category.id && styles.selectedCategory,
                  ]}
                  onPress={() => handleCategoryPress(category)}
              >
                <Text
                    style={[
                      styles.categoryText,
                      selectedCategory?.id === category.id && styles.selectedCategoryText,
                    ]}
                >
                  {category.title}
                </Text>
              </TouchableOpacity>
          ))}
        </View>
        <FlatList
            data={selectedCategory?.questions}
            renderItem={renderQuestion}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.questionsContainer}
            style={{ width: "100%" }}
        />
        <View style={styles.goToChatBlock}>
          <Text style={styles.goToChatBlockText}>Не смогли найти вопрос?</Text>
          <Link href={"./pages/Chat"} style={styles.goToChatBlockLink}>
            Чат с гидом
          </Link>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 35,
    flexDirection: "column",
    width: "100%",
  },
  searchBar: {
    width: "100%",
    marginVertical: 15,
    zIndex: 2,
  },
  categories: {
    width: "100%",
    marginTop: 20,
  },
  categories_heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  categories_picker: {
    flexDirection: "row",
  },
  category: {
    backgroundColor: "rgba(89, 155, 255, 0.5)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginRight: 10,
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
    padding: 10,
    width: "100%",
  },
  questionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 15,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
  },
  plusIcon: {
    fontSize: 20,
    fontWeight: "bold",
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  answerText: {
    fontSize: 14,
    marginTop: 10,
  },
  expandedBlock: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  redirectLink: {
    color: "rgba(89, 155, 255, 1)",
    textDecorationLine: "underline",
  },
  goToChatBlock: {
    alignItems: "center",
    width: "100%",
  },
  goToChatBlockText: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 15,
  },
  goToChatBlockLink: {
    borderRadius: 36,
    backgroundColor: "rgba(89, 155, 255, 1)",
    color: "#fff",
    fontWeight: "bold",
    padding: 15,
    textAlign: "center",
    fontSize: 20,
  }
});
