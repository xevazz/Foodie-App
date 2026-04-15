import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useApp } from '../context/AppContext';

export default function AddEditRecipeScreen({ route, navigation }) {
  const { recipe } = route.params || {};
  const editing = !!recipe;
  const { addRecipe, editRecipe } = useApp();

  const [name, setName] = useState(recipe?.name || '');
  const [image, setImage] = useState(recipe?.image || null);
  const [ingredients, setIngredients] = useState(
    recipe?.ingredients ? recipe.ingredients.join('\n') : ''
  );
  const [instructions, setInstructions] = useState(
    recipe?.instructions ? recipe.instructions.join('\n') : ''
  );

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'We need access to your photo library.');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch {
      Alert.alert('Error', 'Could not open your photo library.');
    }
  };

  const save = () => {
    if (!name.trim()) {
      Alert.alert('Required', 'Please enter a recipe name.');
      return;
    }
    if (!ingredients.trim()) {
      Alert.alert('Required', 'Please add at least one ingredient.');
      return;
    }
    if (!instructions.trim()) {
      Alert.alert('Required', 'Please add the cooking instructions.');
      return;
    }

    const data = {
      name: name.trim(),
      image: image || null,
      ingredients: ingredients.split('\n').map((l) => l.trim()).filter(Boolean),
      instructions: instructions.split('\n').map((l) => l.trim()).filter(Boolean),
    };

    if (editing) {
      editRecipe(recipe.id, data);
      Alert.alert('Updated!', 'Your recipe has been updated.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } else {
      addRecipe(data);
      Alert.alert('Saved!', 'Your recipe has been saved.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#FF6B35" />
          </TouchableOpacity>
          <Text style={styles.heading}>{editing ? 'Edit Recipe' : 'New Recipe'}</Text>
        </View>

        <Text style={styles.label}>Recipe name *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="e.g. Homemade pasta carbonara"
          placeholderTextColor="#bbb"
          returnKeyType="next"
        />

        <Text style={styles.label}>Photo</Text>
        <TouchableOpacity style={styles.imgBtn} onPress={pickImage} activeOpacity={0.8}>
          {image ? (
            <View>
              <Image source={{ uri: image }} style={styles.imgPreview} resizeMode="cover" />
              <View style={styles.changeOverlay}>
                <Ionicons name="camera" size={20} color="white" />
                <Text style={styles.changeOverlayTxt}>Change photo</Text>
              </View>
            </View>
          ) : (
            <View style={styles.imgEmpty}>
              <Ionicons name="camera-outline" size={42} color="#ccc" />
              <Text style={styles.imgEmptyTxt}>Tap to add a photo</Text>
              <Text style={styles.imgEmptySub}>From your photo library</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Ingredients * (one per line)</Text>
        <TextInput
          style={[styles.input, styles.area]}
          value={ingredients}
          onChangeText={setIngredients}
          placeholder={'e.g.\n2 cups of flour\n1 egg\n1/2 cup of milk'}
          placeholderTextColor="#bbb"
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />

        <Text style={styles.label}>Step-by-step instructions * (one step per line)</Text>
        <TextInput
          style={[styles.input, styles.areaLg]}
          value={instructions}
          onChangeText={setInstructions}
          placeholder={'e.g.\nPreheat the oven to 180°C\nMix the dry ingredients\nBake for 30 minutes'}
          placeholderTextColor="#bbb"
          multiline
          numberOfLines={8}
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.saveBtn} onPress={save} activeOpacity={0.85}>
          <Ionicons name="checkmark-circle-outline" size={24} color="white" />
          <Text style={styles.saveBtnTxt}>{editing ? 'Update recipe' : 'Save recipe'}</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  backBtn: {
    padding: 6,
    marginRight: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#333',
    borderWidth: 1.5,
    borderColor: '#e8e8e8',
  },
  area: {
    minHeight: 130,
    lineHeight: 22,
  },
  areaLg: {
    minHeight: 170,
    lineHeight: 22,
  },
  imgBtn: {
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#e8e8e8',
    borderStyle: 'dashed',
  },
  imgPreview: {
    width: '100%',
    height: 200,
    backgroundColor: '#eee',
  },
  changeOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  changeOverlayTxt: {
    color: 'white',
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
  },
  imgEmpty: {
    height: 155,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
  },
  imgEmptyTxt: {
    color: '#bbb',
    marginTop: 10,
    fontSize: 15,
    fontWeight: '500',
  },
  imgEmptySub: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 4,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B35',
    borderRadius: 14,
    padding: 17,
    marginTop: 28,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  saveBtnTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 10,
  },
});
