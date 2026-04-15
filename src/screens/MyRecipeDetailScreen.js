import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export default function MyRecipeDetailScreen({ route, navigation }) {
  const { recipe: routeRecipe } = route.params;
  const { deleteRecipe, myRecipes } = useApp();

  // Always use the latest version from state (in case it was edited)
  const recipe =
    myRecipes.find((r) => r.id === routeRecipe.id) || routeRecipe;

  const handleDelete = () => {
    Alert.alert(
      'Eliminar receta',
      `¿Estás seguro de que quieres eliminar "${recipe.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            deleteRecipe(recipe.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Image or placeholder */}
      {recipe.image ? (
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
        </View>
      ) : (
        <View style={styles.imageFallback}>
          <TouchableOpacity
            style={styles.backButtonDark}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color="#555" />
          </TouchableOpacity>
          <Ionicons name="restaurant" size={90} color="#ddd" />
          <Text style={styles.noImageText}>Sin imagen</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{recipe.name}</Text>

        {/* My Recipe badge */}
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Ionicons name="person" size={12} color="#FF6B35" />
            <Text style={styles.badgeText}>Mi Receta</Text>
          </View>
        </View>

        {/* Action buttons: Edit & Delete */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate('AddEditRecipe', { recipe })
            }
            activeOpacity={0.85}
          >
            <Ionicons name="pencil" size={18} color="white" />
            <Text style={styles.actionButtonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
            activeOpacity={0.85}
          >
            <Ionicons name="trash-outline" size={18} color="white" />
            <Text style={styles.actionButtonText}>Borrar</Text>
          </TouchableOpacity>
        </View>

        {/* Ingredients */}
        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Ingredientes</Text>
            <View style={styles.sectionCard}>
              {recipe.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientRow}>
                  <View style={styles.bullet} />
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Instructions */}
        {recipe.instructions && recipe.instructions.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Instrucciones</Text>
            {recipe.instructions.map((step, index) => (
              <View key={index} style={styles.stepCard}>
                <View style={styles.stepBadge}>
                  <Text style={styles.stepBadgeText}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </>
        )}
      </View>

      <View style={styles.bottomSpace} />
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
    height: 270,
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
  imageFallback: {
    height: 220,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  backButtonDark: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 22,
    padding: 10,
  },
  noImageText: {
    color: '#ccc',
    fontSize: 13,
    marginTop: 8,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 10,
    lineHeight: 30,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0EB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '600',
    marginLeft: 4,
  },
  actionRow: {
    flexDirection: 'row',
    marginBottom: 22,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 13,
    marginRight: 8,
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F44336',
    borderRadius: 12,
    padding: 13,
    marginLeft: 8,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 6,
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
