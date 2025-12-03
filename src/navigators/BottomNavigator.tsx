import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Entypo';
import { palette } from '../shared/theme';
import HomeNavigator from './HomeNavigator';
import CartNavigator from './CartNavigator';

const Tab = createBottomTabNavigator();

export type RootTabParamList = {
  Home: undefined;
  Cart: undefined;
};

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: palette.primaryGreen,
        tabBarInactiveTintColor: palette.textMuted,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home"
              size={24}
              color={focused ? palette.primaryGreen : palette.textMuted}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="shopping-cart"
              size={24}
              color={focused ? palette.primaryGreen : palette.textMuted}
            />
          ),
        }}
      />

      {/* <Tab.Screen
        name="Initiatives"
        component={InitiativesView}
        options={{
          tabBarLabel: 'Initiatives',
          tabBarIcon: ({ focused }) => (
            <Icon2
              name="lightbulb"
              size={24}
              color={focused ? palette.primaryGreen : palette.textMuted}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <ProfileIcon
              name="user-circle-o"
              size={24}
              color={focused ? palette.primaryGreen : palette.textMuted}
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}
