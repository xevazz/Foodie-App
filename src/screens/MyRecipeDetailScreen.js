import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export default function MyRecipeDetailScreen({ route, navigation }) {
  const { recipe: routeRecipe } = route.params;
  const { deleteRecipe, myRecipes } = useApp();

  const recipe = myRecipes.find((r) => r.id === routeRecipe.id) || routeRecipe;

  const handleDelete = () => {
    Alert.alert('Delete Recipe', `Are you sure you want to delete "${recipe.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteRecipe(recipe.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {recipe.image ? (
        <View style={styles.imgWrap}>
          <Image source={{ uri: recipe.image }} style={styles.img} resizeMode="cover" />
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.imgFallback}>
          <TouchableOpacity style={styles.backBtnDark} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#555" />
          </TouchableOpacity>
          <Ionicons name="restaurant" size={85} color="#ddd" />
          <Text style={styles.noImgTxt}>No image added</Text>
        </View>
      )}

      <View style={styles.body}>
        <Text style={styles.title}>{recipe.name}</Text>

        <View style={styles.badgeRow}>
          <View style={styles.myBadge}>
            <Ionicons name="person" size={12} color="#FF6B35" />
            <Text style={styles.myBadgeTxt}>My Recipe</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate('AddEditRecipe', { recipe })}
            activeOpacity={0.85}
          >
            <Ionicons name="pencil" size={18} color="white" />
            <Text style={styles.actionTxt}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete} activeOpacity={0.85}>
            <Ionicons name="trash-outline" size={18} color="white" />
            <Text style={styles.actionTxt}>Delete</Text>
          </TouchableOpacity>
        </View>

        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.card}>
              {recipe.ingredients.map((item, i) => (
                <View key={i} style={styles.ingredientRow}>
                  <View style={styles.dot} />
                  <Text style={styles.ingredientTxt}>{item}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {recipe.instructions && recipe.instructions.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Instructions</Text>
            {recipe.instructions.map((step, i) => (
              <View key={i} style={styles.stepRow}>
                <View style={styles.stepNum}>
                  <Text style={styles.stepNumTxt}>{i + 1}</Text>
                </View>
                <Text style={styles.stepTxt}>{step}</Text>
              </View>
            ))}
          </>
        )}
      </View>

      <View style={{ height: 30 }} />
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
    height: 270,
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
  imgFallback: {
    height: 220,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  backBtnDark: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 22,
    padding: 10,
  },
  noImgTxt: {
    color: '#ccc',
    fontSize: 13,
    marginTop: 8,
  },
  body: {
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
  myBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0EB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  myBadgeTxt: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '600',
    marginLeft: 4,
  },
  actions: {
    flexDirection: 'row',
    marginBottom: 22,
  },
  editBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 13,
    marginRight: 8,
  },
  deleteBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F44336',
    borderRadius: 12,
    padding: 13,
    marginLeft: 8,
  },
  actionTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 6,
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
