import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

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
            type: "LABEL_DETECTION",
            maxResults: 1,
          },
        ],
        imageContext: {
          languageHints: ['ko']
        }
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

  return result.responses[0].labelAnnotations[0].description;
}

export default function App() {
  const [image, setImage] = React.useState(null);
  const [status, setStatus] = React.useState(null);

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
      } catch (error) {
        setStatus(`Error: ${error.message}`);
      }
    } else {
      setImage(null);
      setStatus(null);
    }
  };

  return (
    <View style={styles.container}>
      <>
        {image && <Image style={styles.image} source={{ uri: image }} />}
        {status && <Text style={styles.text}>{status}</Text>}
        <Button onPress={takePictureAsync} title="Take a Picture" />
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
  text: {
    margin: 5,
  },
});
