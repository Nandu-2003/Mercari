import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

const { width } = Dimensions.get('window');

// Predefined list of suggestions
const suggestions = [
  "Find me the best men's chinos for casual wear.",
  'What are the best winter boots for women?',
  "What are some stylish shorts for men's summer wardrobes?",
  'Show me trendy blouses for summer.',
];

const ChatBotScreen = () => {
  const [message, setMessage] = useState('');


  const handleSendMessage = () => {
    console.log('User message:', message); // Handle user message logic
    setMessage('');
  };

  const renderSuggestion = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.suggestionButton}>
      <Text style={styles.suggestionText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#eef2f3', '#8e9eab']} style={styles.gradientBackground}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <AntDesign name="arrowleft" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Maya</Text>
          <AntDesign name="ellipsis1" size={24} color="#333" />
        </View>

        {/* Chat and Suggestions */}
        <FlatList
          data={suggestions}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <>
              {/* Bot Greeting */}
              <View style={styles.botMessage}>
                <LinearGradient colors={['#e0c3fc', '#8ec5fc']} style={styles.botTextContainer}>
                  <Text style={styles.botText}>
                    Hi, I am <Text style={styles.boldText}>Maya ❤️</Text>.
                  </Text>
                  <Text style={styles.botText}>
                    I am here to help you with your <Text style={styles.boldText}>fashion</Text> and{' '}
                    <Text style={styles.boldText}>beauty</Text> needs.
                  </Text>
                </LinearGradient>
              </View>

              {/* User Prompt */}
              <View style={styles.userMessage}>
                <Text style={styles.userPromptText}>How can I assist you today?</Text>
              </View>
            </>
          }
          renderItem={renderSuggestion}
          contentContainerStyle={styles.suggestionsContainer}
        />

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type your message..."
            placeholderTextColor="#aaa"
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity onPress={handleSendMessage} style={styles.sendButtonContainer}>
            <AntDesign name="arrowright" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat_SemiBold',
    color: '#333',
  },
  botMessage: {
    marginVertical: 15,
  },
  botTextContainer: {
    padding: 15,
    borderRadius: 15,
  },
  botText: {
    fontSize: 16,
    fontFamily: 'Montserrat_Regular',
    color: '#333',
    marginBottom: 5,
  },
  boldText: {
    fontFamily: 'Montserrat_Bold',
  },
  userMessage: {
    marginVertical: 10,
  },
  userPromptText: {
    fontSize: 16,
    fontFamily: 'Montserrat_Medium',
    color: '#333',
  },
  suggestionsContainer: {
    marginTop: 10,
  },
  suggestionButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  suggestionText: {
    fontSize: 14,
    fontFamily: 'Montserrat_Regular',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    
   
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Montserrat_Regular',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginRight: 10,
  },
  sendButtonContainer: {
    borderRadius: 30,
    padding: 12,
  },
});

export default ChatBotScreen;
