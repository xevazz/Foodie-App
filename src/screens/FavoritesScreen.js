import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { RECIPES } from '../data/recipes';

export default function FavoritesScreen({ navigation }) {
  const { favorites, toggleFavorite } = useApp();

  const favoriteRecipes = RECIPES.filter((r) => favorites.includes(r.id));

  if (favoriteRecipes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="heart-outline" size={90} color="#ddd" />
        <Text style={styles.emptyTitle}>Sin favoritos aún</Text>
        <Text style={styles.emptySubtitle}>
          Presiona el corazón en cualquier receta para guardarla aquí
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favoriteRecipes}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
          activeOpacity={0.85}
        >
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={2}>
              {item.name}
            </Text>
            <View style={styles.metaRow}>
              <Ionicons name="time-outline" size={13} color="#888" />
              <Text style={styles.metaText}>{item.prepTime}</Text>
            </View>
            <View style={styles.metaRow}>
              <Ionicons name="flame-outline" size={13} color="#888" />
              <Text style={styles.metaText}>{item.calories} kcal</Text>
            </View>
            <View style={styles.difficultyBadge}>
              <Text style={styles.difficultyText}>{item.difficulty}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => toggleFavorite(item.id)}
            style={styles.heartBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="heart" size={24} color="#FF6B35" />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#aaa',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#bbb',
    textAlign: 'center',
    lineHeight: 20,
  },
  list: {
    padding: 16,
    paddingBottom: 24,
  },
  card: {
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
  image: {
    width: 95,
    height: 95,
    backgroundColor: '#eee',
  },
  info: {
    flex: 1,
    padding: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  metaText: {
    fontSize: 12,
    color: '#888',
    marginLeft: 5,
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF0EB',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    marginTop: 4,
  },
  difficultyText: {
    fontSize: 11,
    color: '#FF6B35',
    fontWeight: '600',
  },
  heartBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
});
