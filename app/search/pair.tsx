import { useGlobalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Image, View, StyleSheet, Text } from "react-native";

const ML_API_URL = "https://9316-14-194-79-94.ngrok-free.app"; 

const PairedSearch = () => {
  const { filename } = useGlobalSearchParams();
  const [data, setData] = useState<any[]>([]); 

  const fetchData = async () => {
    try {
      const res = await axios.post(`${ML_API_URL}/capture2`, { filename });
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching related images:", error);
    }
  };

  useEffect(() => {
    if (filename) {
      fetchData();
    }
  }, [filename]);

  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        data.map((item: any) => (
          <Image
            key={item.id}
            source={{ uri: item.url }}
            style={styles.image}
            resizeMode="cover"
          />
        ))
      ) : (
        <Text style={styles.noDataText}>No related images found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginVertical: 10,
  },
  noDataText: {
    fontSize: 16,
    color: "#333",
    marginTop: 20,
  },
});

export default PairedSearch;
