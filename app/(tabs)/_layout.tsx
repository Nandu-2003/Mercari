import { Tabs } from 'expo-router';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { HomeIcon, InboxIcon, ProfileIcon, SellIcon, TrendzIcon } from '@/constants/Icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].text,
        headerShown: false,
        tabBarStyle: {
          height: 70, // Increase the height of the tab bar
          paddingBottom: 10, // Adjust padding at the bottom of the tab bar
        },
        tabBarLabelStyle: {
          fontSize: 11, // Adjust font size of the tab titles
          marginTop: -5, // Decrease space between icon and label
        },
        tabBarIconStyle: {
          marginBottom: -5, // Further decrease space between icon and label
        },
        tabBarItemStyle: {
          paddingVertical: 5, // Add vertical padding for better alignment
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <HomeIcon width={20} height={20} /> // Increase the size of the icon
          ),
        }}
      />
      <Tabs.Screen
        name="trendz"
        options={{
          title: 'Trendz',
          tabBarIcon: ({ color, focused }) => (
            <TrendzIcon width={20} height={20} /> // Increase the size of the icon
          ),
        }}
      />
      <Tabs.Screen
        name="sell"
        options={{
          title: 'Sell',
          tabBarIcon: ({ color, focused }) => (
            <SellIcon width={20} height={20} /> // Increase the size of the icon
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color, focused }) => (
            <InboxIcon width={20} height={20} /> // Increase the size of the icon
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <ProfileIcon width={20} height={20} /> // Increase the size of the icon
          ),
        }}
      />
    </Tabs>
  );
}
