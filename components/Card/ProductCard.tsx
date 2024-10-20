import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Dimensions } from 'react-native';
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
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Pressable style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={product.imageUrl}
          style={styles.productImage}
          resizeMode="cover"
        />
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>₹{product.discountedPrice}</Text>
        </View>
        <Pressable
          style={styles.favoriteIconContainer}
          onPress={() => setIsFavorite((prev) => !prev)}
        >
          <AntDesign
            name={isFavorite ? 'heart' : 'hearto'}
            size={14}
            color={isFavorite ? '#E91E63' : '#666'}
          />
        </Pressable>
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.productName}>{product.name}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    borderColor: '#eee',
    borderWidth: 1,
    marginVertical: 10,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1, // Ensures a 1:1 square shape
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  priceContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(128, 128, 128, 0.6)',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  priceText: {
    fontFamily: 'Montserrat_Bold',
    fontSize: 14,
    color: '#fff',
  },
  favoriteIconContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    elevation: 2,
  },
  nameContainer: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    alignItems: 'center',
  },
  productName: {
    fontFamily: 'Montserrat_SemiBold',
    fontSize: 14,
    color: '#333',
  },
});

export default ProductCard;
