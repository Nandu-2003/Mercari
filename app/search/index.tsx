import {
  View,
  Image,
  StyleSheet,
  Button,
  Text
} from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { Link } from "expo-router";

const ML_API_URL = "https://d6da-14-98-16-198.ngrok-free.app";

const SearchByImage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setResult(result);
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    const formData = new FormData();

    try {
      const response = await fetch(image);
      const blob = await response.blob();

      formData.append("file", blob, result.assets[0].fileName || "image.jpg");

      setLoading(true);
      await axios.post(`${ML_API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (image) {
      uploadImage();
    }
  }, [image]);

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {loading && <Text>Uploading...</Text>}
      <Link href={{
        pathname: "/search/related",
        params: {
          filename: result?.assets[0].fileName,
        }
      }}>
        <Button title="Related Search"/>
      </Link>
      <Link href="/search/pair">
        <Button title="Pair it with?" />
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default SearchByImage;
