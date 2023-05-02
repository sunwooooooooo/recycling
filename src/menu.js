import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity,useEffect } from "react-native";


export default function Menu({ navigation }) {


  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.body}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Pic")}
  
      >
        <Text style={styles.start}>카메라로 검색</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.body}>
      <TouchableOpacity
        onPress={() => navigation.navigate()}
      >
        <Text style={styles.start}>텍스트로 검색</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.body}>
      <TouchableOpacity
        onPress={() => navigation.navigate()}
      >
        <Text style={styles.start}>갤러리로 검색</Text>
      </TouchableOpacity>
      
      </View>
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
    backgroundColor: "white",
    borderRadius: 30,
    paddingHorizontal: 100,
    paddingVertical: 15,
    marginBottom: 15,
  },


  start: {

    fontSize: 19,
    fontWeight: 500,
    backgroundColor: "white",

  },
});
