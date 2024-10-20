import { View, Image, StyleSheet, Button, Text, Pressable } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { Link, useRouter } from "expo-router";

const ML_API_URL = "https://9316-14-194-79-94.ngrok-free.app";

const SearchByImage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploaded, setUploaded] = useState<boolean>(false);
  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setResult(result);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

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
      setUploaded(true);
    }
  };

  const handleSearch = async () => {
    router.push({
      pathname: "/search/related",
      params: {
        filename: result.assets[0].fileName,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.pressableButton} onPress={takePhoto}>
        <Text style={styles.buttonText}>Click an Image</Text>
      </Pressable>

      {image && <Image source={{ uri: image }} style={styles.image} />}
      {loading && <Text>Uploading...</Text>}

      {uploaded ? (
        <Button title="Search" onPress={handleSearch} />
      ) : (
        <Button title="Upload Image taken" onPress={uploadImage} />
      )}
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
    margin: 10,
  },
  pressableButton: {
    backgroundColor: "#2196F3", 
    padding: 10,
    borderRadius: 5,
    margin: 10,
    width: 200, 
    alignItems: "center", 
  },
  buttonText: {
    color: "#fff", 
    fontSize: 16,
  },
});

export default SearchByImage;
