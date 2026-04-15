import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export default function RecipeDetailScreen({ route, navigation }) {
  const { recipe } = route.params;
  const { toggleFavorite, isFavorite } = useApp();
  const favorite = isFavorite(recipe.id);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Image with overlay buttons */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: recipe.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => toggleFavorite(recipe.id)}
        >
          <Ionicons
            name={favorite ? 'heart' : 'heart-outline'}
            size={26}
            color={favorite ? '#FF6B35' : 'white'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{recipe.name}</Text>

        {/* Stats grid */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={24} color="#FF6B35" />
            <Text style={styles.statValue}>{recipe.prepTime}</Text>
            <Text style={styles.statLabel}>Preparación</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons name="people-outline" size={24} color="#FF6B35" />
            <Text style={styles.statValue}>{recipe.servings}</Text>
            <Text style={styles.statLabel}>Raciones</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons name="flame-outline" size={24} color="#FF6B35" />
            <Text style={styles.statValue}>{recipe.calories}</Text>
            <Text style={styles.statLabel}>Calorías</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons name="bar-chart-outline" size={24} color="#FF6B35" />
            <Text style={styles.statValue}>{recipe.difficulty}</Text>
            <Text style={styles.statLabel}>Dificultad</Text>
          </View>
        </View>

        {/* Ingredients */}
        <Text style={styles.sectionTitle}>Ingredientes</Text>
        <View style={styles.sectionCard}>
          {recipe.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientRow}>
              <View style={styles.bullet} />
              <Text style={styles.ingredientText}>{ingredient}</Text>
            </View>
          ))}
        </View>

        {/* Instructions */}
        <Text style={styles.sectionTitle}>Instrucciones</Text>
        {recipe.instructions.map((step, index) => (
          <View key={index} style={styles.stepCard}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>{index + 1}</Text>
            </View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}

        <View style={styles.bottomSpace} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 290,
    backgroundColor: '#eee',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 22,
    padding: 10,
  },
  heartButton: {
    position: 'absolute',
    top: 50,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 22,
    padding: 10,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
    lineHeight: 30,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#eee',
  },
  statValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 6,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
    marginTop: 6,
    paddingLeft: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B35',
  },
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B35',
    marginRight: 12,
  },
  ingredientText: {
    fontSize: 15,
    color: '#333',
    flex: 1,
  },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'flex-start',
  },
  stepBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
    flexShrink: 0,
  },
  stepBadgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  stepText: {
    fontSize: 15,
    color: '#333',
    flex: 1,
    lineHeight: 22,
  },
  bottomSpace: {
    height: 30,
  },
});
