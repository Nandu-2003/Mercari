import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  Linking,
  Text,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const icons = [
  { id: '1', source: require('../../assets/canva_template/shoe1.png'), url: 'https://www.canva.com/design/DAGUC7XTKoI/Vh0mLM7KsbuiqkF2mbWTrw/edit' },
  { id: '1', source: require('../../assets/canva_template/shoe3.png'), url: 'https://www.canva.com/design/DAGUCzyVP8Y/kxWtvY7v-TmRie-NTTiMKQ/edit' },
  { id: '1', source: require('../../assets/canva_template/shoe2.png'), url: 'https://www.canva.com/design/DAGUDIWE7hU/d92EHj1Z3V1HAS_-YDlaGA/edit' },
  { id: '1', source: require('../../assets/canva_template/shoe4.png'), url: 'https://www.canva.com/design/DAGUC7wqrRU/3ohyKypIUVlJdyXz4rZTGQ/edit' },
{ id: '2', source: require('../../assets/canva_template/mac1.png'), url: 'https://www.canva.com/design/DAGUFZ4hSN8/mKR-ZqGhcVmJt6_BzNbV1g/edit' },
{ id: '2', source: require('../../assets/canva_template/mac3.png'), url: 'https://www.canva.com/design/DAGUFk6z-ok/iQSNwKPE-yO4IVrjPIJt7w/edit' },
{ id: '2', source: require('../../assets/canva_template/mac4.png'), url: 'https://www.canva.com/design/DAGUFhwx_pw/gB4H9jPChKKic8uKopOcsg/edit' },
{ id: '2', source: require('../../assets/canva_template/mac2.png'), url: 'https://www.canva.com/design/DAGUFv1Fup0/iRH72cbbT6JJqwtYiMlHSA/edit' },


];

const iconWidth = SCREEN_WIDTH * 0.9;
const iconHeight = SCREEN_HEIGHT * 0.25;

interface SocialShareProps {
  item: string;
}

const SocialShare: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params as SocialShareProps;

  console.log(item);

  const handlePress = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  // Filter icons based on the provided item prop
  const filteredIcons = icons.filter(icon => icon.id == item);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Select the template you would like to share</Text>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {filteredIcons.map((icon, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => handlePress(icon.url)}
              activeOpacity={0.7}
              accessibilityLabel={`Open template at ${icon.url}`}
            >
              <Image source={icon.source} style={styles.cardImage} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  cardContainer: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.8,  
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
    shadowOpacity: 0.2, // iOS shadow
    shadowRadius: 5, // iOS shadow
  },
  scrollContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    width: iconWidth * 0.8,
    height: iconHeight * 0.7,
    marginVertical: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    overflow: 'hidden', // Ensure the image is clipped to the card's border radius
    borderWidth: 2, // Add border width
    borderColor: '#ccc', // Add border color
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ensure the image covers the entire card
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
});

export default SocialShare;