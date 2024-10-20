import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons'; // or 'react-native-vector-icons/AntDesign'
interface ShareButtonProps {
  item: string;
}
const ShareButton: React.FC<ShareButtonProps> = ({ item }) => {
  const handlePress = () => {
    console.log(item);
    router.push({
      pathname: '/(share)',
      params: { item },
    })
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <AntDesign name="link" size={24} color="#333" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
});

export default ShareButton;