import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from './src/context/AppContext';
import HomeScreen from './src/screens/HomeScreen';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import AddEditRecipeScreen from './src/screens/AddEditRecipeScreen';
import MyRecipeDetailScreen from './src/screens/MyRecipeDetailScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const FavStack = createNativeStackNavigator();

function HomeNav() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Feed" component={HomeScreen} />
      <HomeStack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
      <HomeStack.Screen name="AddEditRecipe" component={AddEditRecipeScreen} />
      <HomeStack.Screen name="MyRecipeDetail" component={MyRecipeDetailScreen} />
    </HomeStack.Navigator>
  );
}

function FavNav() {
  return (
    <FavStack.Navigator screenOptions={{ headerShown: false }}>
      <FavStack.Screen name="FavList" component={FavoritesScreen} />
      <FavStack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </FavStack.Navigator>
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
            tabBarStyle: { paddingBottom: 6, paddingTop: 4, height: 60 },
            tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
            tabBarIcon: ({ focused, color, size }) => {
              const icon = route.name === 'Home'
                ? (focused ? 'home' : 'home-outline')
                : (focused ? 'heart' : 'heart-outline');
              return <Ionicons name={icon} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeNav} options={{ title: 'Home' }} />
          <Tab.Screen name="Favorites" component={FavNav} options={{ title: 'Favorites' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
