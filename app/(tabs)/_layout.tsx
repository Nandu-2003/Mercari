import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { HomeIcon, ProfileIcon, SellIcon } from "@/constants/Icons";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () =>
      setIsKeyboardVisible(true)
    );
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () =>
      setIsKeyboardVisible(false)
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            tabBarInactiveTintColor: Colors[colorScheme ?? "light"].text,
            headerShown: false,
            tabBarStyle: [
              styles.tabBar,
              isKeyboardVisible ? { display: "none" } : {},
            ],
            tabBarLabelStyle: {
              fontSize: 11,
              marginTop: -5,
            },
            tabBarIconStyle: {
              marginBottom: -5,
            },
            tabBarItemStyle: {
              paddingVertical: 5,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => (
                <HomeIcon width={20} height={20} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="search"
            options={{
              title: "Search",
              tabBarIcon: ({ color }) => (
                <AntDesign name="search1" size={20} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="sell"
            options={{
              title: "Sell",
              tabBarIcon: ({ color }) => (
                <SellIcon width={20} height={20} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="huddle"
            options={{
              title: "Huddle",
              tabBarIcon: ({ color }) => (
                <AntDesign name="pay-circle-o1" size={24} color="#666" />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ color }) => (
                <ProfileIcon width={20} height={20} color={color} />
              ),
            }}
          />
        </Tabs>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    height: 70,
    paddingBottom: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
});
