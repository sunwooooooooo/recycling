import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import title from "../assets/title1.png";


import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  useEffect,
} from "react-native";


export default function Start({ navigation }) {


 
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.body}>
        <Image style={styles.title} source={title} />
      </View>

 
        <TouchableOpacity
          onPress={() => navigation.navigate("Menu")}
          style={styles.footer}
        >
          <Text style={styles.start}>♡분리수거 시작하기♡</Text>
        </TouchableOpacity>

   
        <TouchableOpacity
          onPress={() => navigation.navigate("Link")}
          style={styles.footer1}
        >
          <Text style={styles.start}>♡사이트 바로가기♡</Text>
        </TouchableOpacity>
   
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6BAB7D",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    height: 220,
    width: 300,
    marginLeft: 30,
  },

  footer: {
    backgroundColor: "white",
    borderRadius: 30,
    paddingHorizontal: 100,
    paddingVertical: 13,
    marginBottom: 15,
  },
  footer1: {
    backgroundColor: "white",
    borderRadius: 30,
    paddingHorizontal: 108,
    paddingVertical: 12,
    marginBottom: 30,
  },

  start: { 

    fontSize: 19,
    fontWeight: 500,
  },
});
