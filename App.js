import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { AppProvider } from './src/context/AppContext';
import HomeScreen from './src/screens/HomeScreen';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import MyFoodScreen from './src/screens/MyFoodScreen';
import AddEditRecipeScreen from './src/screens/AddEditRecipeScreen';
import MyRecipeDetailScreen from './src/screens/MyRecipeDetailScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const FavStack = createNativeStackNavigator();
const MyFoodStack = createNativeStackNavigator();

function HomeStackNav() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Feed" component={HomeScreen} />
      <HomeStack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

function FavStackNav() {
  return (
    <FavStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#FF6B35' },
        headerTintColor: 'white',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <FavStack.Screen
        name="FavoritesList"
        component={FavoritesScreen}
        options={{ title: 'Mis Favoritos' }}
      />
      <FavStack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{ headerShown: false }}
      />
    </FavStack.Navigator>
  );
}

function MyFoodStackNav() {
  return (
    <MyFoodStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#FF6B35' },
        headerTintColor: 'white',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <MyFoodStack.Screen
        name="MyFood"
        component={MyFoodScreen}
        options={{ title: 'Mi Comida' }}
      />
      <MyFoodStack.Screen
        name="AddEditRecipe"
        component={AddEditRecipeScreen}
        options={{ headerShown: false }}
      />
      <MyFoodStack.Screen
        name="MyRecipeDetail"
        component={MyRecipeDetailScreen}
        options={{ headerShown: false }}
      />
    </MyFoodStack.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#FF6B35',
            tabBarInactiveTintColor: '#aaa',
            tabBarStyle: {
              backgroundColor: 'white',
              borderTopWidth: 1,
              borderTopColor: '#eee',
              paddingBottom: 6,
              paddingTop: 4,
              height: 60,
            },
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '600',
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Favorites') {
                iconName = focused ? 'heart' : 'heart-outline';
              } else if (route.name === 'MyFood') {
                iconName = focused ? 'restaurant' : 'restaurant-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeStackNav}
            options={{ title: 'Inicio' }}
          />
          <Tab.Screen
            name="Favorites"
            component={FavStackNav}
            options={{ title: 'Favoritos' }}
          />
          <Tab.Screen
            name="MyFood"
            component={MyFoodStackNav}
            options={{ title: 'Mi Comida' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
