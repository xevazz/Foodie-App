import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES, RECIPES } from '../data/recipes';
import { useApp } from '../context/AppContext';

export default function HomeScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { toggleFavorite, isFavorite } = useApp();

  const filteredRecipes = selectedCategory
    ? RECIPES.filter((r) => r.category === selectedCategory)
    : RECIPES;

  const handleCategoryPress = (id) => {
    setSelectedCategory(selectedCategory === id ? null : id);
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        selectedCategory === item.id && styles.categoryChipActive,
      ]}
      onPress={() => handleCategoryPress(item.id)}
      activeOpacity={0.7}
    >
      <Text style={styles.categoryEmoji}>{item.emoji}</Text>
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.categoryTextActive,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderRecipe = ({ item }) => {
    const favorite = isFavorite(item.id);
    return (
      <TouchableOpacity
        style={styles.recipeCard}
        onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
        activeOpacity={0.9}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.recipeImage}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => toggleFavorite(item.id)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={favorite ? 'heart' : 'heart-outline'}
            size={24}
            color={favorite ? '#FF6B35' : 'white'}
          />
        </TouchableOpacity>
        <View style={styles.recipeInfo}>
          <Text style={styles.recipeName}>{item.name}</Text>
          <View style={styles.metaRow}>
            <Ionicons name="time-outline" size={14} color="#777" />
            <Text style={styles.metaText}>{item.prepTime}</Text>
            <Ionicons
              name="people-outline"
              size={14}
              color="#777"
              style={styles.metaIcon}
            />
            <Text style={styles.metaText}>{item.servings} pers.</Text>
            <Ionicons
              name="flame-outline"
              size={14}
              color="#777"
              style={styles.metaIcon}
            />
            <Text style={styles.metaText}>{item.calories} kcal</Text>
          </View>
          <View style={styles.difficultyBadge}>
            <Text style={styles.difficultyText}>{item.difficulty}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF6B35" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Foodie</Text>
        <Text style={styles.headerSubtitle}>Descubre recetas deliciosas</Text>
      </View>

      {/* Categories horizontal scroll */}
      <View style={styles.categoriesWrapper}>
        <FlatList
          data={CATEGORIES}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
        />
      </View>

      {/* Selected category label */}
      {selectedCategory && (
        <View style={styles.filterBar}>
          <Text style={styles.filterText}>
            {CATEGORIES.find((c) => c.id === selectedCategory)?.name}
          </Text>
          <TouchableOpacity onPress={() => setSelectedCategory(null)}>
            <Ionicons name="close-circle" size={18} color="#FF6B35" />
          </TouchableOpacity>
        </View>
      )}

      {/* Recipes list */}
      <FlatList
        data={filteredRecipes}
        renderItem={renderRecipe}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.recipesList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="restaurant-outline" size={60} color="#ddd" />
            <Text style={styles.emptyText}>No hay recetas en esta categoría</Text>
          </View>
        }
      />
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
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  categoriesWrapper: {
    backgroundColor: 'white',
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  categoriesContent: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  categoryChipActive: {
    backgroundColor: '#FFF0EB',
    borderColor: '#FF6B35',
  },
  categoryEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#FF6B35',
    fontWeight: '700',
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFF0EB',
  },
  filterText: {
    fontSize: 13,
    color: '#FF6B35',
    fontWeight: '600',
  },
  recipesList: {
    padding: 16,
    paddingBottom: 24,
  },
  recipeCard: {
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
  recipeImage: {
    width: '100%',
    height: 210,
    backgroundColor: '#eee',
  },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 22,
    padding: 8,
  },
  recipeInfo: {
    padding: 14,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  metaIcon: {
    marginLeft: 12,
  },
  metaText: {
    fontSize: 12,
    color: '#777',
    marginLeft: 4,
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF0EB',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
  },
  difficultyText: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 15,
    color: '#bbb',
    marginTop: 12,
  },
});
