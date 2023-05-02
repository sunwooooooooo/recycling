import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as Linking from "expo-linking";
import { AntDesign } from "@expo/vector-icons";

const link1 = () => {
  Linking.openURL("https://www.15990903.or.kr/portal/main/main.do");
};

const link2 = () => {
  Linking.openURL("https://www.koreagreen.org/community");
};

const link3 = () => {
  Linking.openURL("http://www.beautifulstore.org/intro-donation");
};

export default function Link({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.menuBar}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Menu")}
          style={styles.home}
        >
          <AntDesign name="back" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={styles.title}> [사이트 바로가기]</Text>
      </View>
      <View style={styles.sub}>
        <TouchableOpacity onPress={link1}>
          <Text style={styles.free}> 1. 폐가전 무상방문 서비스</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={link2}>
          <Text style={styles.free}> 2. 한국 그린센터 </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={link3}>
          <Text style={styles.free}> 3. 아름다운 가게 </Text>
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

  },


  home: {
    paddingHorizontal: 1,
    marginTop: 50,
    marginLeft: 10,
  },

  body: {
    marginTop: 20,
    alignItems: "center",
  },

  sub: {
    flex: 1,
    justifyContent: "Top",
    marginTop: 50,
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    color: "white",
  },

  free: {
    fontSize: 20,
    color: "white",
    marginBottom: 20,
  },
});
