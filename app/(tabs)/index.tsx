import React, { useEffect, useState } from 'react';
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
  Pressable,
  ScrollView,
  Keyboard,
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
      { name: 'Women', icon: require('../../assets/images/products/women.png') },
      { name: 'Men', icon: require('../../assets/images/products/men.png') },
      { name: 'Kids', icon: require('../../assets/images/products/kids.png') },
      { name: 'Footwear', icon: require('../../assets/images/products/footwear.png') },
      { name: 'Accessories', icon: require('../../assets/images/products/Accessories.png') },
      { name: 'Watches', icon: require('../../assets/images/products/watch.png') },
    ],
  },
  {
    name: 'Beauty',
    icon: require('../../assets/images/beautychip.jpg'),
    subcategories: [
      { name: 'Makeup', icon: require('../../assets/images/products/beauty.png') },
      { name: 'Haircare', icon: require('../../assets/images/products/haircare.png') },
      { name: 'Fragrances', icon: require('../../assets/images/products/fragrance.png') },
      { name: 'Bath', icon: require('../../assets/images/products/bath.png') },
      { name: 'Skincare', icon: require('../../assets/images/products/design3.png') },
    ],
  },
  {
    name: 'Home',
    icon: require('../../assets/images/home.png'),
    subcategories: [
      { name: 'Furnishing', icon: require('../../assets/images/products/furniture.png') },
      { name: 'Organisers', icon: require('../../assets/images/products/organizers.png') },
      { name: 'DinnerWare', icon: require('../../assets/images/products/dinnerware.png') },
      { name: 'Appliances', icon: require('../../assets/images/products/appliances.png') },
      { name: 'Decor', icon: require('../../assets/images/products/design3.png') },
    ],
  },
];
// Sample Products Data
const products = [
  {
    imageUrl: require('../../assets/images/products/p1.png'),
    name: 'Tube Beige Dress',
    discountedPrice: 1299,
  },
  {
    imageUrl: require('../../assets/images/products/d2.jpg'),
    name: 'Grey Check Dress',
    discountedPrice: 699,
  },
  {
    imageUrl: require('../../assets/images/products/p3.png'),
    name: 'Rolex Analog',
    discountedPrice: 2599,
  },
  {
    imageUrl: require('../../assets/images/products/p4.png'),
    name: 'Nike Sneakers',
    discountedPrice: 599,
  },
  // Add more products as needed
];

const recomendationItems1 = [
  {
    imageUrl: require('../../assets/images/products/table1.png'),
    name: 'Layered Wooden',
    discountedPrice: 1299,
  },
  {
    imageUrl: require('../../assets/images/products/table2.png'),
    name: 'Study Table',
    discountedPrice: 699,
  },
  {
    imageUrl: require('../../assets/images/products/table3.png'),
    name: 'Coffee Table',
    discountedPrice: 2599,
  },
  {
    imageUrl: require('../../assets/images/products/table4.png'),
    name: 'Centre Table',
    discountedPrice: 599,
  },
  // Add more products as needed
];
const recomendationItems2 = [
  {
    imageUrl: require('../../assets/images/products/table3.png'),
    name: 'Coffee Table',
    discountedPrice: 1299,
  },
  {
    imageUrl: require('../../assets/images/products/table4.png'),
    name: 'Centre Table',
    discountedPrice: 699,
  },
  {
    imageUrl: require('../../assets/images/products/table3.png'),
    name: 'Coffee Table',
    discountedPrice: 2599,
  },
  {
    imageUrl: require('../../assets/images/products/table4.png'),
    name: 'Centre Table',
    discountedPrice: 599,
  },
  // Add more products as needed
];

const ShopScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('Fashion');

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // Handle keyboard visibility changes
  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', () =>
      setIsKeyboardVisible(true)
    );
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () =>
      setIsKeyboardVisible(false)
    );

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  // Subcategories data based on selected category
  const subcategories =
    categories.find((cat) => cat.name === selectedCategory)?.subcategories || [];

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#f9f9f9',
    }}>
    <ScrollView style={styles.container}>
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

    <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.name}
      contentContainerStyle={styles.chipContainer}
      renderItem={({ item, index }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
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
            <TouchableOpacity
              style={styles.iconButton1}
              onPress={() => router.push('/(modal)')}
            >
              <AntDesign name="appstore-o" size={20} color="#333" />
            </TouchableOpacity>
          )}
        </View>
      )}
    />

    <FlatList
      data={subcategories}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.name}
      contentContainerStyle={styles.horizontalSubCategoryContainer}
      renderItem={({ item }) => (
        <View style={styles.horizontalSubCategoryItem}>
          <Image source={item.icon} style={styles.subCategoryImage} />
          <Text style={styles.subCategoryText}>{item.name}</Text>
        </View>
      )}
    />

<View style={{
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 10,
}}>
<Text style={styles.sectionTitle}>Products For You</Text>
<Pressable>
  <Text style={{
    fontFamily: 'Montserrat_Regular',
    color: '#292C3F',
    fontSize: 12,
    padding: 5,
  }}>View All</Text>
  </Pressable>
</View>
    <FlatList
  data={products}
  keyExtractor={(item, index) => index.toString()}
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.productList}
  renderItem={({ item }) => (
    <View style={styles.productWrapper}>
      <ProductCard product={item} />
    </View>
  )}
/>


<View style={{
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 10,
}}>
<Text style={styles.sectionTitle}>Recommendations</Text>

</View>
    <FlatList
  data={recomendationItems1}
  keyExtractor={(item, index) => index.toString()}
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.productList}
  renderItem={({ item }) => (
    <View style={styles.productWrapper}>
      <ProductCard product={item} />
    </View>
  )}
/>
<FlatList
  data={recomendationItems2}
  keyExtractor={(item, index) => index.toString()}
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.productList}
  renderItem={({ item }) => (
    <View style={styles.productWrapper}>
      <ProductCard product={item} />
    </View>
  )}
/>
<View style={{
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 10,
}}>
<Text style={styles.sectionTitle}>Recommendations</Text>

</View>
    <FlatList
  data={recomendationItems1}
  keyExtractor={(item, index) => index.toString()}
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.productList}
  renderItem={({ item }) => (
    <View style={styles.productWrapper}>
      <ProductCard product={item} />
    </View>
  )}
/>
<FlatList
  data={recomendationItems2}
  keyExtractor={(item, index) => index.toString()}
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.productList}
  renderItem={({ item }) => (
    <View style={styles.productWrapper}>
      <ProductCard product={item} />
    </View>
  )}
/>
   
  </ScrollView>
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
    paddingHorizontal: 10,
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
  productWrapper: {
  width: width / 2 - 16, // Half of the screen width minus padding
  marginHorizontal: 8, // Adjust spacing between products
},
  iconButton: {
    marginLeft: 10,
  },
  iconButton1: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#292C3F',
    padding: 8,
    marginLeft: -10,
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
    gap: 3,
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
  },
  productList: {
  },
  subCategoryContainer: {
    paddingBottom: 20,
  },
  horizontalSubCategoryContainer: {
    paddingHorizontal: 10,  // Add some padding to the container if needed
  },
  horizontalSubCategoryItem: {
    alignItems: 'center',
    marginRight: 10,  // Adjust the space between items
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
    paddingHorizontal: 10,
  },
  exploreButton: {
    position: 'absolute',
    bottom: 80,
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
