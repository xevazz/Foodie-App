import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export default function RecipeDetailScreen({ route, navigation }) {
  const { recipe } = route.params;
  const { toggleFavorite, isFavorite } = useApp();
  const fav = isFavorite(recipe.id);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imgWrap}>
        <Image source={{ uri: recipe.image }} style={styles.img} resizeMode="cover" />
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.heartBtn} onPress={() => toggleFavorite(recipe.id)}>
          <Ionicons
            name={fav ? 'heart' : 'heart-outline'}
            size={26}
            color={fav ? '#FF6B35' : 'white'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>{recipe.name}</Text>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Ionicons name="time-outline" size={22} color="#FF6B35" />
            <Text style={styles.statVal}>{recipe.prepTime}</Text>
            <Text style={styles.statLbl}>Prep Time</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Ionicons name="people-outline" size={22} color="#FF6B35" />
            <Text style={styles.statVal}>{recipe.servings}</Text>
            <Text style={styles.statLbl}>Servings</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Ionicons name="flame-outline" size={22} color="#FF6B35" />
            <Text style={styles.statVal}>{recipe.calories}</Text>
            <Text style={styles.statLbl}>Calories</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Ionicons name="bar-chart-outline" size={22} color="#FF6B35" />
            <Text style={styles.statVal}>{recipe.difficulty}</Text>
            <Text style={styles.statLbl}>Difficulty</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View style={styles.card}>
          {recipe.ingredients.map((item, i) => (
            <View key={i} style={styles.ingredientRow}>
              <View style={styles.dot} />
              <Text style={styles.ingredientTxt}>{item}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Instructions</Text>
        {recipe.instructions.map((step, i) => (
          <View key={i} style={styles.stepRow}>
            <View style={styles.stepNum}>
              <Text style={styles.stepNumTxt}>{i + 1}</Text>
            </View>
            <Text style={styles.stepTxt}>{step}</Text>
          </View>
        ))}

        <View style={{ height: 30 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imgWrap: {
    position: 'relative',
  },
  img: {
    width: '100%',
    height: 290,
    backgroundColor: '#eee',
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 22,
    padding: 10,
  },
  heartBtn: {
    position: 'absolute',
    top: 50,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 22,
    padding: 10,
  },
  body: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
    lineHeight: 30,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 3,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#eee',
  },
  statVal: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 5,
    textAlign: 'center',
  },
  statLbl: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
    marginTop: 6,
    paddingLeft: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B35',
  },
  card: {
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
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B35',
    marginRight: 12,
  },
  ingredientTxt: {
    fontSize: 15,
    color: '#333',
    flex: 1,
  },
  stepRow: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  stepNum: {
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
  stepNumTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  stepTxt: {
    fontSize: 15,
    color: '#333',
    flex: 1,
    lineHeight: 22,
  },
});
