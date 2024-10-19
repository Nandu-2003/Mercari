import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Chip } from 'react-native-paper';
import { useFonts } from 'expo-font';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ProductCard from '@/components/Card/ProductCard';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

// Categories Data
const categories = [
  {
    name: 'Fashion',
    icon: require('../../assets/images/fashion.png'),
    subcategories: [
      { name: 'Women', icon: require('../../assets/images/products/design3.png') },
      { name: 'Men', icon: require('../../assets/images/products/design3.png') },
      { name: 'Accessories', icon: require('../../assets/images/products/design3.png') },
      { name: 'Footwear', icon: require('../../assets/images/products/design3.png') },
      { name: 'Kids', icon: require('../../assets/images/products/design3.png') },
      { name: 'Watches', icon: require('../../assets/images/products/design3.png') },
    ],
  },
  {
    name: 'Beauty',
    icon: require('../../assets/images/beautychip.jpg'),
    subcategories: [
      { name: 'Skincare', icon: require('../../assets/images/products/design3.png') },
      { name: 'Haircare', icon: require('../../assets/images/products/design3.png') },
      { name: 'Fragrances', icon: require('../../assets/images/products/design3.png') },
      { name: 'Makeup', icon: require('../../assets/images/products/design3.png') },
      { name: 'Bath', icon: require('../../assets/images/products/design3.png') },
      { name: '', icon: require('../../assets/images/products/design3.png') },
      { name: 'Men', icon: require('../../assets/images/products/design3.png') },
    ],
  },
  {
    name: 'Home',
    icon: require('../../assets/images/products/salon.png'),
    subcategories: [
      { name: 'Men', icon: require('../../assets/images/products/design3.png') },
      { name: 'Women', icon: require('../../assets/images/products/design3.png') },
      { name: 'Men', icon: require('../../assets/images/products/design3.png') },
      { name: 'Women', icon: require('../../assets/images/products/design3.png') },
      { name: 'Men', icon: require('../../assets/images/products/design3.png') },
      { name: 'Women', icon: require('../../assets/images/products/design3.png') },
      { name: 'Men', icon: require('../../assets/images/products/design3.png') },
      { name: 'Women', icon: require('../../assets/images/products/design3.png') },
    ],
  },
];

// Sample Products Data
const products = [
  {
    imageUrl: require('../../assets/images/products/p1.png'),
    name: 'Tube Beige Dress',
    bust: 32,
    discountedPrice: 799,
    originalPrice: 5000,
    storeName: 'bohemastore PRO',
  },
  {
    imageUrl: require('../../assets/images/products/p2.png'),
    name: 'Red Summer Dress',
    bust: 34,
    discountedPrice: 699,
    originalPrice: 4500,
    storeName: 'fashionhouse PRO',
  },
  {
    imageUrl: require('../../assets/images/products/p3.png'),
    name: 'Tube Beige Dress',
    bust: 32,
    discountedPrice: 799,
    originalPrice: 5000,
    storeName: 'bohemastore PRO',
  },
  {
    imageUrl: require('../../assets/images/products/p4.png'),
    name: 'Red Summer Dress',
    bust: 34,
    discountedPrice: 699,
    originalPrice: 4500,
    storeName: 'fashionhouse PRO',
  },
  // Add more products as needed
];

const ShopScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('Fashion');

  // Load Montserrat fonts
  const [fontsLoaded] = useFonts({
    Montserrat_Regular: require('../../assets/fonts/Montserrat-Regular.ttf'),
    Montserrat_SemiBold: require('../../assets/fonts/Montserrat-SemiBold.ttf'),
    Montserrat_Bold: require('../../assets/fonts/Montserrat-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#E91E63" />
      </View>
    );
  }

  // Subcategories data based on selected category
  const subcategories =
    categories.find((cat) => cat.name === selectedCategory)?.subcategories || [];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productList}
        ListHeaderComponent={
          <>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.logoText}>mercari</Text>
              <View style={styles.headerIcons}>
                <TouchableOpacity style={styles.iconButton}>
                  <FontAwesome name="heart-o" size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <AntDesign name="shoppingcart" size={24} color="#333" />
                  <View style={styles.notificationBadge}>
                    <Text style={styles.badgeText}>1</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <AntDesign name="search1" size={20} color="#888" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search for anything"
                placeholderTextColor="#aaa"
              />
              <TouchableOpacity>
                <MaterialIcons name="camera-alt" size={22} color="#333" />
              </TouchableOpacity>
            </View>

            {/* Category Chips */}
            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.name}
              contentContainerStyle={styles.chipContainer}
              renderItem={({ item, index }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Chip
                    icon={() => <Image source={item.icon} style={styles.chipIcon} />}
                    style={[
                      styles.chip,
                      selectedCategory === item.name && styles.selectedChip,
                    ]}
                    textStyle={[
                      styles.chipText,
                      selectedCategory === item.name && styles.selectedChipText,
                    ]}
                    onPress={() => setSelectedCategory(item.name)}
                  >
                    {item.name}
                  </Chip>

                  {index === categories.length - 1 && (
                    <TouchableOpacity style={styles.iconButton1} onPress={
                      () => router.push("/(modal)")
                    }>
                      <AntDesign name="appstore-o" size={24} color="#333" />
                    </TouchableOpacity>
                  )}
                </View>
              )}
            />

            {/* Subcategories */}
            <FlatList
              data={subcategories}
              keyExtractor={(item) => item.name}
              numColumns={3}
              contentContainerStyle={styles.subCategoryContainer}
              renderItem={({ item }) => (
                <View style={styles.subCategoryItem}>
                  <View style={styles.subCategoryIconWrapper}>
                    <Image source={item.icon} style={styles.subCategoryImage} />
                  </View>
                  <Text style={styles.subCategoryText}>{item.name}</Text>
                </View>
              )}
            />

            <Text style={styles.sectionTitle}>Explore Products</Text>
          </>
        }
        renderItem={({ item }) => <ProductCard product={item} />}
      />
      <TouchableOpacity style={styles.exploreButton}
      onPress={() => router.push("/chatBot")}
      >
  <Text style={styles.exploreButtonText}>XPLORE</Text>
</TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  logoText: {
    fontFamily: 'Montserrat_Bold',
    fontSize: 24,
    color: '#333',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
  },
  iconButton1: {
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#292C3F',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#E91E63',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginHorizontal: 2,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Montserrat_Regular',
    paddingVertical: 10,
  },
  chipContainer: {
    paddingHorizontal: 2,
    marginBottom: 15,
  },
  chip: {
    marginRight: 4,
    backgroundColor: '#fff',
    borderColor: '#292C3F',
    borderWidth: 1,
    borderRadius: 20,
  },
  selectedChip: {
    backgroundColor: '#292C3F',
  },
  chipIcon: {
    width: 20,
    height: 20,
  },
  chipText: {
    fontSize: 12,
    fontFamily: 'Montserrat_Regular',
    color: '#333',
    marginLeft: 2,
    marginRight: 12,
  },
  selectedChipText: {
    color: '#fff',
  },
  productRow: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productList: {
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
  subCategoryContainer: {
    paddingBottom: 20,
  },
  subCategoryItem: {
    alignItems: 'center',
    width: width / 3 - 20,
    marginVertical: 10,
    marginTop:0,
  },
  subCategoryImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  subCategoryText: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Montserrat_Regular',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat_SemiBold',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  exploreButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#292C3F',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderWidth: 2,
    borderColor: '#AAA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exploreButtonText: {
    color: '#AAA',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ShopScreen;
