import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

const { width } = Dimensions.get('window');

// Categories Data with Subcategories
const categories = [
  {
    name: 'Women',
    subcategories: [
      'Women’s handbags', 'Shoes', 'Jewelry', 'Accessories', 
      'Athletic apparel', 'Tops & blouses', 'Dresses'
    ],
  },
  {
    name: 'Men',
    subcategories: ['Shoes', 'Watches', 'Athletic wear', 'Jackets'],
  },
  {
    name: 'Electronics',
    subcategories: ['Phones', 'Laptops', 'Cameras', 'Smartwatches'],
  },
  {
    name: 'Toys & Collectibles',
    subcategories: ['Action figures', 'Board games', 'Collectible toys'],
  },
  {
    name: 'Home',
    subcategories: ['Furniture', 'Decor', 'Lighting', 'Bedding'],
  },
  {
    name: 'Beauty',
    subcategories: ['Makeup', 'Skincare', 'Perfume'],
  },
  {
    name: 'Kids',
    subcategories: ['Toys', 'Kids clothing', 'Books'],
  },
];

const CategoryModal = () => {
  const [activeTab, setActiveTab] = useState('Categories'); // Track active tab
  const [selectedCategory, setSelectedCategory] = useState<{ name: string; subcategories: string[] } | null>(null); // Track selected category
  
  const handleCategoryPress = (category: React.SetStateAction<{ name: string; subcategories: string[]; } | null>) => {
    setSelectedCategory(category); // Set selected category to show subcategories
  };

  const handleBackPress = () => {
    setSelectedCategory(null); // Go back to categories list
  };

  const renderSubcategories = (subcategories: ArrayLike<any> | null | undefined) => (
    <FlatList
      data={subcategories}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.itemText}>{item}</Text>
          <AntDesign name="right" size={18} color="#333" />
        </View>
      )}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Search Bar and Cart Icon */}
      <View style={styles.searchHeader}>
        <View style={styles.searchContainer}>
          <AntDesign name="search1" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for anything"
            placeholderTextColor="#aaa"
          />
        </View>

        <TouchableOpacity style={styles.cartButton}>
          <AntDesign name="shoppingcart" size={24} color="#333" />
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>1</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Tabs: Categories and For You */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Categories' && styles.activeTab]}
          onPress={() => setActiveTab('Categories')}
        >
          <Text style={[styles.tabText, activeTab === 'Categories' && styles.activeTabText]}>
            Categories
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'For you' && styles.activeTab]}
          onPress={() => setActiveTab('For you')}
        >
          <Text style={[styles.tabText, activeTab === 'For you' && styles.activeTabText]}>
            For you
          </Text>
        </TouchableOpacity>
      </View>

      {/* Category or Subcategory List */}
      {selectedCategory ? (
        <>
          {/* Subcategories Header */}
          <View style={styles.subHeader}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <TouchableOpacity onPress={handleBackPress}>
              <AntDesign name="arrowleft" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.subHeaderText}>{selectedCategory.name}</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          {/* Render Subcategories */}
          {renderSubcategories(selectedCategory.subcategories)}
        </>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleCategoryPress(item)}
            >
              <View style={styles.itemLeft}>
                <Image
                  source={require('../../assets/images/products/salon.png')}
                  style={styles.itemIcon}
                />
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
              <AntDesign name="right" size={18} color="#333" />
            </TouchableOpacity>
          )}
        />
      )}
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
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  searchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    flex: 1,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Montserrat_Regular',
  },
  cartButton: {
    position: 'relative',
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
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Montserrat_Light',
    color: '#888',
  },
  activeTabText: {
    fontFamily: 'Montserrat_SemiBold',
    color: '#000',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
    width: width - 32,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  itemText: {
    fontSize: 14,
    fontFamily: 'Montserrat_Medium',
    color: '#333',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 18,
    fontFamily: 'Montserrat_SemiBold',
  },
  seeAllText: {
    color: '#E91E63',
    fontFamily: 'Montserrat_Bold',
  },
});

export default CategoryModal;
