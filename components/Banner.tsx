import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from 'expo-linear-gradient';

// Define the prop types
interface BannerProps {
  imageUrl: string;
}

export function Banner({ imageUrl }: BannerProps) {

  const [currentIndex, setCurrentIndex] = useState(0); // To track which button is selected
  const [titleText, setTitleText] = useState("Возникли трудовые споры?"); // Initial title text
  const [subtitleText, setSubtitleText] = useState("Найдите решение ваших трудовых проблем."); // Initial subtitle text

  // Array to store the title and subtitle texts for each index
  const bannerContent = [
    {
      title: "Возникли трудовые споры?",
      subtitle: "Найдите решение ваших трудовых проблем.",
    },
    {
      title: "Как защитить свои права?",
      subtitle: "Получите консультацию юриста.",
    },
    {
      title: "Что делать, если не выплачивают зарплату?",
      subtitle: "Разберитесь с задержкой выплат.",
    },
    {
      title: "Проблемы с увольнением?",
      subtitle: "Наши юристы помогут вам разобраться.",
    },
    {
      title: "Задержка с выходным пособием?",
      subtitle: "Мы поможем вам получить компенсацию.",
    },
  ];

  // Function to switch the content and selected button
  const switchContent = (index: number) => {
    setCurrentIndex(index); // Update the selected button
    setTitleText(bannerContent[index].title); // Update title from the array
    setSubtitleText(bannerContent[index].subtitle); // Update subtitle from the array
  };

  // Start a timer that switches the content every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // Calculate the next index, and loop back to 0 if it's the last one
        const nextIndex = (prevIndex + 1) % 5;
        switchContent(nextIndex); // Switch the content based on the next index
        return nextIndex;
      });
    }, 10000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
      <View style={styles.banner}>
        <LinearGradient
            colors={['rgba(89, 155, 255,1)', 'rgba(89, 155, 255, 0.5)']}
            style={styles.background}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        />
        <Image
            source={ imageUrl } // Using require to resolve the image source
            style={styles.image}
            contentFit="cover"
        />
        <View style={styles.banner_buttons}>
          {[0, 1, 2, 3, 4].map((index) => (
              <View key={index} style={[styles.btn, currentIndex === index ? styles.selected : null]} />
          ))}
        </View>
        <View style={styles.banner_content}>
          <Text style={styles.title}>{titleText}</Text>
          <Text style={styles.subtitle}>{subtitleText}</Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 10,
    height: 10,
    borderRadius: 50,
    borderWidth: 0,
    padding: 0,
    margin: 0,
    backgroundColor: 'rgba(163, 161, 161, 1)', // Background color for visibility
  },
  banner_buttons: {
    zIndex: 2,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginRight: 20,
  },
  banner: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 50,
    height: 155,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    color: "white",
    fontSize: 16,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  banner_content: {
    marginTop: 10,
    zIndex: 2,
    maxWidth: "90%",
  },
  image: {
    width: '100%',
    height: 155,
    borderRadius: 10,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 155,
    zIndex: 1,
    borderRadius: 10,
  },
  selected: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
});
