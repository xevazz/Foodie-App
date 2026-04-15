import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export default function RecipeDetailScreen({ route, navigation }) {
  const { recipe } = route.params;
  const { toggleFavorite, isFavorite } = useApp();
  const fav = isFavorite(recipe.id);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <Image source={{ uri: recipe.image }} style={styles.coverImg} resizeMode="cover" />
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favBtn} onPress={() => toggleFavorite(recipe.id)}>
          <Ionicons
            name={fav ? 'heart' : 'heart-outline'}
            size={24}
            color={fav ? '#FF6B35' : 'white'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{recipe.name}</Text>

        <View style={styles.infoBar}>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={20} color="#FF6B35" />
            <Text style={styles.infoValue}>{recipe.prepTime}</Text>
            <Text style={styles.infoLabel}>Prep Time</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.infoItem}>
            <Ionicons name="people-outline" size={20} color="#FF6B35" />
            <Text style={styles.infoValue}>{recipe.servings}</Text>
            <Text style={styles.infoLabel}>Servings</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.infoItem}>
            <Ionicons name="flame-outline" size={20} color="#FF6B35" />
            <Text style={styles.infoValue}>{recipe.calories}</Text>
            <Text style={styles.infoLabel}>Calories</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.infoItem}>
            <Ionicons name="bar-chart-outline" size={20} color="#FF6B35" />
            <Text style={styles.infoValue}>{recipe.difficulty}</Text>
            <Text style={styles.infoLabel}>Difficulty</Text>
          </View>
        </View>

        <Text style={styles.sectionHeading}>Ingredients</Text>
        <View style={styles.ingredientBox}>
          {recipe.ingredients.map((ing, i) => (
            <View key={i} style={styles.ingredientLine}>
              <View style={styles.bullet} />
              <Text style={styles.ingredientText}>{ing}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionHeading}>Instructions</Text>
        {recipe.instructions.map((step, i) => (
          <View key={i} style={styles.step}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepNumber}>{i + 1}</Text>
            </View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}

        <View style={{ height: 32 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  coverImg: {
    width: '100%',
    height: 280,
    backgroundColor: '#ddd',
  },
  backBtn: {
    position: 'absolute',
    top: 48,
    left: 14,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    padding: 9,
  },
  favBtn: {
    position: 'absolute',
    top: 48,
    right: 14,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    padding: 9,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 14,
  },
  infoBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginBottom: 22,
    justifyContent: 'space-around',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  separator: {
    width: 1,
    backgroundColor: '#ececec',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#222',
    marginTop: 4,
    textAlign: 'center',
  },
  infoLabel: {
    fontSize: 10,
    color: '#aaa',
    marginTop: 1,
  },
  sectionHeading: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1a1a1a',
    borderLeftWidth: 3,
    borderLeftColor: '#FF6B35',
    paddingLeft: 10,
    marginBottom: 10,
    marginTop: 4,
  },
  ingredientBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 22,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  ingredientLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  bullet: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#FF6B35',
    marginRight: 12,
  },
  ingredientText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  step: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 13,
    marginBottom: 8,
    alignItems: 'flex-start',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
    marginTop: 1,
  },
  stepNumber: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
  stepText: {
    fontSize: 14,
    color: '#444',
    flex: 1,
    lineHeight: 21,
  },
});
