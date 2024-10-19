import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useFonts } from 'expo-font';
import AntDesign from '@expo/vector-icons/AntDesign';

interface Product {
  imageUrl: any;
  name: string;
  bust: number;
  discountedPrice: number;
  originalPrice: number;
  storeName: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [fontsLoaded] = useFonts({
    Montserrat_Regular: require('../../assets/fonts/Montserrat-Regular.ttf'),
    Montserrat_SemiBold: require('../../assets/fonts/Montserrat-SemiBold.ttf'),
    Montserrat_Bold: require('../../assets/fonts/Montserrat-Bold.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <Pressable style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={product.imageUrl}
          style={styles.productImage}
          resizeMode="cover"
        />
        <View style={styles.favoriteContainer}>
          <AntDesign name="hearto" size={16} color="#666" />
          <Text style={styles.favoriteCount}>15</Text>
        </View>
      </View>

      <Text style={styles.productName}>{product.name}</Text>

      <View style={styles.priceContainer}>
        <Text style={styles.discountedPrice}>₹{product.discountedPrice}</Text>
        <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
      </View>

      <View style={styles.storeContainer}>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 160,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  imageContainer: {
    position: 'relative',
    width: 140,
    height: 160,
    marginBottom: 8,
    borderRadius: 10,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  favoriteContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    elevation: 2,
  },
  favoriteCount: {
    fontFamily: 'Montserrat_Regular',
    fontSize: 12,
    marginLeft: 4,
    color: '#666',
  },
  productName: {
    fontFamily: 'Montserrat_SemiBold',
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    marginTop: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  discountedPrice: {
    fontFamily: 'Montserrat_Bold',
    fontSize: 14,
    color: '#E91E63',
  },
  originalPrice: {
    fontFamily: 'Montserrat_Regular',
    fontSize: 10,
    textDecorationLine: 'line-through',
    color: '#999',
    marginLeft: 8,
  },
  storeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  storeIcon: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
    marginRight: 6,
  },
  storeName: {
    fontFamily: 'Montserrat_Regular',
    fontSize: 12,
    color: '#333',
  },
  proTag: {
    fontFamily: 'Montserrat_Bold',
    fontSize: 12,
    color: '#FFD700',
  },
});

export default ProductCard;
