import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export default function MyRecipeDetailScreen({ route, navigation }) {
  const { recipe: initial } = route.params;
  const { deleteRecipe, myRecipes } = useApp();

  const recipe = myRecipes.find((r) => r.id === initial.id) || initial;

  const confirmDelete = () => {
    Alert.alert('Delete', `Remove "${recipe.name}"?`, [
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
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }} showsVerticalScrollIndicator={false}>
      {recipe.image ? (
        <View>
          <Image source={{ uri: recipe.image }} style={styles.photo} resizeMode="cover" />
          <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.noPhoto}>
          <TouchableOpacity style={styles.backDark} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="#555" />
          </TouchableOpacity>
          <Ionicons name="restaurant" size={75} color="#ddd" />
        </View>
      )}

      <View style={styles.body}>
        <Text style={styles.name}>{recipe.name}</Text>

        <Text style={styles.tag}>My Recipe</Text>

        <View style={styles.btnRow}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#4CAF50' }]}
            onPress={() => navigation.navigate('AddEditRecipe', { recipe })}
          >
            <Ionicons name="pencil" size={16} color="white" />
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#e53935' }]}
            onPress={confirmDelete}
          >
            <Ionicons name="trash-outline" size={16} color="white" />
            <Text style={styles.btnText}>Delete</Text>
          </TouchableOpacity>
        </View>

        {recipe.ingredients?.length > 0 && (
          <View>
            <Text style={styles.heading}>Ingredients</Text>
            <View style={styles.listBox}>
              {recipe.ingredients.map((item, i) => (
                <View key={i} style={styles.row}>
                  <View style={styles.dot} />
                  <Text style={styles.rowText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {recipe.instructions?.length > 0 && (
          <View>
            <Text style={styles.heading}>Instructions</Text>
            {recipe.instructions.map((step, i) => (
              <View key={i} style={styles.stepCard}>
                <View style={styles.numBadge}>
                  <Text style={styles.numText}>{i + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={{ height: 30 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  photo: {
    width: '100%',
    height: 260,
    backgroundColor: '#ccc',
  },
  back: {
    position: 'absolute',
    top: 48,
    left: 14,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 18,
    padding: 8,
  },
  noPhoto: {
    height: 200,
    backgroundColor: '#ececec',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },
  backDark: {
    position: 'absolute',
    top: 46,
    left: 14,
    padding: 8,
  },
  body: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff0eb',
    color: '#FF6B35',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 18,
  },
  btnRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 12,
    marginHorizontal: 4,
  },
  btnText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 6,
  },
  heading: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1a1a1a',
    borderLeftWidth: 3,
    borderLeftColor: '#FF6B35',
    paddingLeft: 10,
    marginBottom: 10,
    marginTop: 2,
  },
  listBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#FF6B35',
    marginRight: 12,
  },
  rowText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    alignItems: 'flex-start',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  numBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 1,
  },
  numText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  stepText: {
    fontSize: 14,
    color: '#444',
    flex: 1,
    lineHeight: 20,
  },
});
