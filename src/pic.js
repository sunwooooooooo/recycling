import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const API_KEY = "AIzaSyA-_W5wowAeWtDEViRgyEs7P6S5Bbz6hG4";
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

async function callGoogleVisionAsync(image) {
  const body = {
    requests: [
      {
        image: {
          content: image,
        },
        features: [
          {
            type: "OBJECT_LOCALIZATION",
            maxResults: 50,
          },
        ],
      },
    ],
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  console.log("callGoogleVisionAsync -> result", result);

  const detectedObject = result.responses[0].localizedObjectAnnotations[0].name;
  const API_KEY1 = "AIzaSyCiG1Vrsn2NbsUsDfzbMmPwrSgvD2zHk_A";

  const text = detectedObject;
  const targetLanguage = "ko";

  const translateResponse = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${API_KEY1}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        target: targetLanguage,
      }),
    }
  );
  const translatedResult = await translateResponse.json();
  console.log("callGoogleVisionAsync -> translatedResult", translatedResult);

  const translatedText = translatedResult.data.translations[0].translatedText;

  return translatedText;
}

export default function Pic({ navigation }) {
  const [image, setImage] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [showData, setShowData] = React.useState(false);

  const takePictureAsync = async () => {
    const { canceled, assets } = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!canceled) {
      const base64 = assets[0].base64;
      setImage(`data:image/jpg;base64,${base64}`);
      setStatus("Loading...");

      try {
        const result = await callGoogleVisionAsync(base64);
        setStatus(result);

        const response = await fetch(
          `https://0f7e-211-210-158-226.ngrok.io/?result=${result}`
        );
        const data = await response.json();
        console.log(data);
        setData(data);
        setShowData(false);
      } catch (error) {
        setStatus(`등록되지 않은 물체입니다 :<`);
      }
    } else {
      setImage(null);
      setStatus(null);
      setData(null);
    }
  };

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
<View style={styles.img}>
      {image && <Image style={styles.image} source={{ uri: image }} />}
      <View style={styles.status}>
        {status && <Text style={styles.text}>{status}</Text>}
      </View>
      <View style={styles.array}>
        {!showData && status && (
          <MaterialCommunityIcons
            name="cursor-default-click"
            size={40}
            color="white"
            onPress={() => setShowData(true)}
          />
        )}

        {showData && data && (
          <Text style={styles.data}>{data[0].description}</Text>
        )}
      </View>
      </View>
      <View style={styles.camera}>
        <AntDesign
          name="camera"
          size={40}
          color="white"
          onPress={takePictureAsync}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6BAB7D",
    justifyContent: "center",
    
  },

  menuBar: {
    flexDirection: "row",
    flex: 3,

  },

  home: {
    paddingHorizontal: 1,
    marginTop: 50,
    marginLeft: 10,
  },

  img:{
    alignItems: "center",
  },
  status: {
    marginTop: 10,
    justifyContent: "flex-start",
  },

  array: {
    marginTop: 15,
    marginBottom: 15,
    justifyContent: "center",
  },

  camera: {
    flexDirection: "row",
    flex: 4,
    justifyContent: "center",

  },

  explain: {
    backgroundColor: "white",
    borderRadius: 80,
    paddingHorizontal: 10,
    marginBottom: 15,
  },

  explain1: {
    backgroundColor: "white",
    borderRadius: 80,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 15,
  },
  image: {
    width: 300,
    height: 300,
  },
  text: {
    margin: 5,
    fontSize: 19,
    color:"white",
  },
  data: {
    margin: 7,
    fontSize: 17,
    color:"white",
  },
});
