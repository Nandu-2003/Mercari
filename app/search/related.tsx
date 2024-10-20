import { useGlobalSearchParams, Redirect } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const ML_API_URL = "https://f651-14-194-79-94.ngrok-free.app";

const RelatedSearch = () => {
  const { filename } = useGlobalSearchParams();
  const [data, setData] = useState<any[]>([]);

  const dummyData = [
    {
      image:
        "https://storage.googleapis.com/static8801/static/static/dataset/images/p5.jpg",
      link: "https://amzn.in/d/0emSmyLy",
      name: "long sleeve ribbed top",
    },
    {
      image:
        "https://storage.googleapis.com/static8801/static/static/dataset/images/p4.jpg",
      link: "https://amzn.in/d/0emSmyLy",
      name: "ruched floral blouse",
    },
    {
      image:
        "https://storage.googleapis.com/static8801/static/static/dataset/images/p6.jpg",
      link: "https://amzn.in/d/0emSmyLy",
      name: "loose button-up blouse",
    },
    {
      image:
        "https://storage.googleapis.com/static8801/static/static/dataset/images/p11.jpg",
      link: "https://amzn.in/d/0emSmyLy",
      name: "sleeveless ribbed crop top",
    },
    {
      image:
        "https://storage.googleapis.com/static8801/static/static/dataset/images/p12.jpg",
      link: "https://amzn.in/d/0emSmyLy",
      name: "high neck sleeveless crop top",
    },
  ];

  const fetchData = async () => {
    try {
      const res = await axios.post(`${ML_API_URL}/capture`, { filename });
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  useEffect(() => {
    if (filename) {
      fetchData();
    }
  }, [filename]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {dummyData.length > 0 ? (
        dummyData.map((item: any, index: number) => (
          <View key={index} style={styles.productContainer}>
            <Image
              source={{ uri: `${ML_API_URL}/${item.image}` }}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.productName}>{item.name}</Text>
            <TouchableOpacity
              onPress={() => {
                Redirect(item.link);
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>View Product</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>No related products found.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: "center",
    backgroundColor: "#F6F6F6",
  },
  productContainer: {
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productCategory: {
    fontSize: 14,
    color: "#666",
  },
  productStyle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  noDataText: {
    fontSize: 16,
    color: "#333",
    marginTop: 20,
  },
});

export default RelatedSearch;
