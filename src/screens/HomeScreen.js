import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES, RECIPES } from '../data/recipes';
import { useApp } from '../context/AppContext';

const NAV_ITEMS = [
  ...CATEGORIES,
  { id: 'myFood', name: 'My Food', emoji: '👨‍🍳' },
];

export default function HomeScreen({ navigation }) {
  const [active, setActive] = useState(null);
  const { toggleFavorite, isFavorite, myRecipes, deleteRecipe } = useApp();

  const myFoodMode = active === 'myFood';
  const feedRecipes = myFoodMode
    ? []
    : active
    ? RECIPES.filter((r) => r.category === active)
    : RECIPES;

  const confirmDelete = (id, name) => {
    Alert.alert('Delete Recipe', `Remove "${name}" from your collection?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteRecipe(id) },
    ]);
  };

  const renderMyRecipe = ({ item }) => (
    <TouchableOpacity
      style={styles.myCard}
      onPress={() => navigation.navigate('MyRecipeDetail', { recipe: item })}
      activeOpacity={0.85}
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.myImg} resizeMode="cover" />
      ) : (
        <View style={[styles.myImg, styles.myImgBlank]}>
          <Ionicons name="restaurant" size={30} color="#ccc" />
        </View>
      )}
      <View style={styles.myInfo}>
        <Text style={styles.myName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.myMeta}>
          {item.ingredients?.length || 0} ingredients · {item.instructions?.length || 0} steps
        </Text>
      </View>
      <View style={styles.myActions}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => navigation.navigate('AddEditRecipe', { recipe: item })}
        >
          <Ionicons name="pencil" size={15} color="#4CAF50" />
          <Text style={styles.editTxt}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.delBtn}
          onPress={() => confirmDelete(item.id, item.name)}
        >
          <Ionicons name="trash-outline" size={15} color="#F44336" />
          <Text style={styles.delTxt}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderRecipe = ({ item }) => {
    const fav = isFavorite(item.id);
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
        activeOpacity={0.9}
      >
        <Image source={{ uri: item.image }} style={styles.cardImg} resizeMode="cover" />
        <TouchableOpacity
          style={styles.heartBtn}
          onPress={() => toggleFavorite(item.id)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={fav ? 'heart' : 'heart-outline'}
            size={22}
            color={fav ? '#FF6B35' : 'white'}
          />
        </TouchableOpacity>
        <View style={styles.cardBody}>
          <Text style={styles.cardName}>{item.name}</Text>
          <View style={styles.cardMeta}>
            <Ionicons name="time-outline" size={13} color="#888" />
            <Text style={styles.metaTxt}>{item.prepTime}</Text>
            <Ionicons name="people-outline" size={13} color="#888" style={styles.metaIcon} />
            <Text style={styles.metaTxt}>{item.servings} servings</Text>
            <Ionicons name="flame-outline" size={13} color="#888" style={styles.metaIcon} />
            <Text style={styles.metaTxt}>{item.calories} kcal</Text>
          </View>
          <View style={styles.diffBadge}>
            <Text style={styles.diffTxt}>{item.difficulty}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF6B35" />

      <View style={styles.header}>
        <Text style={styles.appTitle}>Foodie App</Text>
        <Text style={styles.appTagline}>Discover delicious recipes from around the world</Text>
      </View>

      <View style={styles.catBar}>
        <FlatList
          data={NAV_ITEMS}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.chip, active === item.id && styles.chipOn]}
              onPress={() => setActive(active === item.id ? null : item.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.chipEmoji}>{item.emoji}</Text>
              <Text style={[styles.chipLabel, active === item.id && styles.chipLabelOn]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {myFoodMode ? (
        <FlatList
          data={myRecipes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={renderMyRecipe}
          ListHeaderComponent={
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => navigation.navigate('AddEditRecipe', {})}
              activeOpacity={0.85}
            >
              <Ionicons name="add-circle-outline" size={23} color="white" />
              <Text style={styles.addBtnTxt}>Add New Recipe</Text>
            </TouchableOpacity>
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name="restaurant-outline" size={65} color="#ddd" />
              <Text style={styles.emptyTitle}>No recipes yet</Text>
              <Text style={styles.emptyMsg}>Tap "Add New Recipe" to get started</Text>
            </View>
          }
        />
      ) : (
        <FlatList
          data={feedRecipes}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={renderRecipe}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name="restaurant-outline" size={55} color="#ddd" />
              <Text style={styles.emptyTitle}>No recipes in this category</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FF6B35',
  },
  appTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 0.5,
  },
  appTagline: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 3,
  },
  catBar: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  catContent: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  chipOn: {
    backgroundColor: '#FFF0EB',
    borderColor: '#FF6B35',
  },
  chipEmoji: {
    fontSize: 15,
    marginRight: 5,
  },
  chipLabel: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
  chipLabelOn: {
    color: '#FF6B35',
    fontWeight: '700',
  },
  list: {
    padding: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardImg: {
    width: '100%',
    height: 210,
    backgroundColor: '#eee',
  },
  heartBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 22,
    padding: 8,
  },
  cardBody: {
    padding: 14,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  metaIcon: {
    marginLeft: 10,
  },
  metaTxt: {
    fontSize: 12,
    color: '#888',
    marginLeft: 4,
  },
  diffBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF0EB',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
  },
  diffTxt: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '600',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B35',
    borderRadius: 14,
    padding: 15,
    marginBottom: 16,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  addBtnTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  myCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 14,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  myImg: {
    width: 90,
    height: 90,
    backgroundColor: '#eee',
  },
  myImgBlank: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  myInfo: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  myName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 5,
  },
  myMeta: {
    fontSize: 12,
    color: '#999',
  },
  myActions: {
    paddingRight: 10,
    alignItems: 'center',
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 6,
  },
  editTxt: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
    marginLeft: 4,
  },
  delBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  delTxt: {
    fontSize: 12,
    color: '#F44336',
    fontWeight: '600',
    marginLeft: 4,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyTitle: {
    fontSize: 16,
    color: '#bbb',
    marginTop: 12,
    fontWeight: '600',
  },
  emptyMsg: {
    fontSize: 13,
    color: '#ccc',
    marginTop: 6,
  },
});
