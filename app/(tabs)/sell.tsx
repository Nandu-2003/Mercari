import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Animated,
  ImageSourcePropType,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ShareButton from '../Button/ShareButton';

const SCREEN_WIDTH = Dimensions.get('window').width;

// Dummy data for products and listed items
const products = [
  { id: '1', image:  require('../../assets/canva_template/shoo.png'), price: '$68.00', status: 'SOLD' },
  { id: '2', image:  require('../../assets/canva_template/mac.png'), price: '$68.00', status: 'SOLD' },



];

const banners = [
  { id: '1', image: require('../../assets/images/bannerr.png') },
  { id: '2', image: require('@/assets/images/bannerr.png') },
  { id: '3', image: require('@/assets/images/bannerr.png') },
];

const listedItems = [
  { id: '1', name: 'Top 30 selling brands' },
  { id: '2', name: 'Gamification ideas' },
  { id: '3', name: 'Independent sellers' },
];

const Sell = () => {

  const renderProduct = ({ item }: { item: { id: string; image: ImageSourcePropType; price: string; status: string } }) => (
    <View style={styles.productCard}>
      <Text style={styles.soldLabel}>{item.status}</Text>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productPrice}>{item.price}</Text>
      <ShareButton item={item.id} />
    </View>
  );

  const renderListedItem = ({ item }: { item: { id: string; name: string } }) => (
    <TouchableOpacity style={styles.listedCard}>
      <Text style={styles.listedText}>{item.name}</Text>
    </TouchableOpacity>
  );


  const animatedValue = useRef(new Animated.Value(0)).current;

  // Interpolate the bottom position of the button based on scroll value
  const buttonBottomPosition = animatedValue.interpolate({
    inputRange: [0, 100], // Change this range based on your scroll length
    outputRange: [0, 10], // Button moves from bottom: 0 to bottom: 10
    extrapolate: 'clamp',
  });

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: animatedValue } } }],
    { useNativeDriver: false } // `false` because we are animating layout properties
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const bannerRef = useRef<FlatList>(null);

  const handleScroll = (event: any) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setCurrentIndex(newIndex);
  };

  const renderBanner = ({ item }: { item: { id: string; image: ImageSourcePropType } }) => (
    <Image source={item.image} style={styles.bannerImage} />
  );

  return (
    <SafeAreaView style={styles.container}>
    <Animated.ScrollView
      style={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      onScroll={onScroll}
    >
      <FlatList
        data={banners}
        ref={bannerRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderBanner}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.carouselContainer}
      />

      <View style={styles.pagination}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>


      {/* Products Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Endorse your Listed Products
        </Text>
        <FlatList
          data={products}
          renderItem={renderProduct}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      </View>

      {/* Listing Ideas Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Listing ideas</Text>
        <FlatList
          data={listedItems}
          renderItem={renderListedItem}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      </View>

      {/* How Mercari Works Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How Mercari works</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {renderHowMercariWorks()}
        </ScrollView>
      </View>

      {/* Getting Things Sold Section */}
      {renderTipsSection()}

      {/* FAQ Section */}
      {renderFAQSection()}

      
    </Animated.ScrollView>
    </SafeAreaView>
  );
};

const renderHowMercariWorks = () => (
  <>
    <View style={styles.card}>
      <Image source={require('../../assets/images/shipping.jpg')} style={styles.cardImage} />
      <Text style={styles.cardTitle}>Shipping made easy</Text>
      <Text style={styles.cardDescription}>
        QR code. Mercari Local. UPS Pack & Ship. We've made shipping easier for...
      </Text>
      <TouchableOpacity style={styles.readButton}>
        <Text style={styles.readButtonText}>5 min read</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.card}>
      <Image source={require('../../assets/images/shipping.jpg')} style={styles.cardImage} />
      <Text style={styles.cardTitle}>How to pack items</Text>
      <Text style={styles.cardDescription}>
        A step-by-step guide on how to pack your items safely.
      </Text>
      <TouchableOpacity style={styles.readButton}>
        <Text style={styles.readButtonText}>4 min read</Text>
      </TouchableOpacity>
    </View>
  </>
);

const renderTipsSection = () => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Getting things sold</Text>
    <View style={styles.tipRow}>
      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>TIP 1</Text>
        <Text style={styles.tipDescription}>
          Price competitively. Search for similar items to see what they’re selling for.
        </Text>
        <TouchableOpacity>
          <Text style={styles.learnMoreText}>Learn more</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>TIP 2</Text>
        <Text style={styles.tipDescription}>
          Take as many photos as possible to show what works best.
        </Text>
        <TouchableOpacity>
          <Text style={styles.learnMoreText}>Learn more</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const renderFAQSection = () => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>How selling works</Text>
    {['Where can I drop off my package?', 'Are there selling fees?', 'What about returns?'].map(
      (faq, index) => (
        <View key={index} style={styles.faqCard}>
          <Text style={styles.faqTitle}>FAQ</Text>
          <Text style={styles.faqQuestion}>{faq}</Text>
          <Text style={styles.faqDescription}>Learn more about this here &gt;</Text>
        </View>
      )
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  carouselContainer: { paddingVertical: 10 },

  scrollContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: SCREEN_WIDTH,
    height: 200,
    resizeMode: 'contain',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: { backgroundColor: '#000' },
  inactiveDot: { backgroundColor: '#ccc' },
  card: {
    width: SCREEN_WIDTH * 0.8,
    marginRight: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  cardTitle: {
    marginTop: 10,
    fontSize: 16,
fontFamily: 'Montserrat_Bold',
  },
  cardDescription: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: 'Montserrat_Regular',
    color: '#666',
  },
  readButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  readButtonText: {
    fontSize: 12,
    color: '#333',
    fontFamily  : 'Montserrat_Regular',
  },
  tipRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tipCard: {
    width: '48%',
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
    padding: 15,
  },
  tipTitle: {
    fontSize: 14,
fontFamily: 'Montserrat_Bold',
    marginBottom: 5,
  },
  tipDescription: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Montserrat_Regular',
    marginBottom: 10,
  },
  learnMoreText: {
    fontSize: 12,
    color: '#1976D2',
    fontFamily: 'Montserrat_Regular',
  },
  faqCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  faqTitle: {
    fontSize: 12,
    marginBottom: 5,
    fontFamily: 'Montserrat_Bold',
    color: '#333',
  },
  faqQuestion: {
    fontSize: 16,
    fontFamily: 'Montserrat_SemiBold', 
    marginBottom: 5,
  },
  faqDescription: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Montserrat_Regular',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    left: SCREEN_WIDTH / 2 - 80, // Center the button
    width: 160,
    backgroundColor: '#3F51B5',
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  banner: {
    width: SCREEN_WIDTH,
    height: 200,
  },
  
  section: {
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontFamily: 'Montserrat_SemiBold',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
  },
  horizontalList: {
    paddingVertical: 10,
  },
  productCard: {
    marginRight: 15,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  soldLabel: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: '#000',
    color: '#fff',
    fontSize: 10,
    paddingHorizontal: 5,
    borderRadius: 3,
  },
  productPrice: {
    marginTop: 5,
    fontFamily: 'Montserrat_Regular',
    fontSize: 14,
  },
  listedCard: {
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#E0F7FA',
  },
  listedText: {
    fontFamily: 'Montserrat_Regular',
    fontSize: 14,
  },
  floatingButtonText: {
    color: '#fff',
    fontFamily: 'Montserrat_Bold',
    fontSize: 14,
  },
});

export default Sell;
