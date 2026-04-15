import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { RECIPES } from '../data/recipes';

export default function FavoritesScreen({ navigation }) {
  const { favorites, toggleFavorite } = useApp();
  const saved = RECIPES.filter((r) => favorites.includes(r.id));

  if (saved.length === 0) {
    return (
      <View style={styles.empty}>
        <Ionicons name="heart-outline" size={80} color="#ddd" />
        <Text style={styles.emptyText}>No favorites saved yet</Text>
        <Text style={styles.emptyHint}>Tap the heart icon on a recipe to save it</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={saved}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16, paddingTop: 20 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
        >
          <Image source={{ uri: item.image }} style={styles.thumbnail} resizeMode="cover" />
          <View style={styles.details}>
            <Text style={styles.recipeName} numberOfLines={2}>{item.name}</Text>
            <Text style={styles.time}>
              <Ionicons name="time-outline" size={12} /> {item.prepTime}
            </Text>
            <Text style={styles.cals}>
              <Ionicons name="flame-outline" size={12} /> {item.calories} kcal
            </Text>
            <Text style={styles.level}>{item.difficulty}</Text>
          </View>
          <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={{ padding: 12 }}>
            <Ionicons name="heart" size={22} color="#FF6B35" />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#f5f5f5',
  },
  emptyText: {
    fontSize: 18,
    color: '#aaa',
    marginTop: 14,
    fontWeight: '600',
  },
  emptyHint: {
    fontSize: 13,
    color: '#ccc',
    marginTop: 6,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 14,
    overflow: 'hidden',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
  },
  thumbnail: {
    width: 90,
    height: 90,
  },
  details: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  recipeName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
    marginBottom: 5,
  },
  time: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  cals: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  level: {
    fontSize: 11,
    color: '#FF6B35',
    fontWeight: '600',
    backgroundColor: '#fff4f0',
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
  },
});
