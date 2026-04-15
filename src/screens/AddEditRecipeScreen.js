import React, { useState } from 'react';
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
  const isEditing = !!recipe;
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
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permiso denegado',
          'Necesitamos acceso a tu galería para seleccionar una imagen.'
        );
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
    } catch (error) {
      Alert.alert('Error', 'No se pudo abrir la galería de imágenes.');
    }
  };

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Campo requerido', 'Por favor ingresa el nombre de la receta.');
      return;
    }
    if (!ingredients.trim()) {
      Alert.alert('Campo requerido', 'Por favor agrega al menos un ingrediente.');
      return;
    }
    if (!instructions.trim()) {
      Alert.alert(
        'Campo requerido',
        'Por favor agrega las instrucciones de la receta.'
      );
      return;
    }

    const recipeData = {
      name: name.trim(),
      image: image || null,
      ingredients: ingredients
        .split('\n')
        .map((i) => i.trim())
        .filter((i) => i.length > 0),
      instructions: instructions
        .split('\n')
        .map((i) => i.trim())
        .filter((i) => i.length > 0),
    };

    if (isEditing) {
      editRecipe(recipe.id, recipeData);
      Alert.alert('Actualizada', 'Tu receta fue actualizada correctamente.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } else {
      addRecipe(recipeData);
      Alert.alert('Guardada', 'Tu receta fue guardada correctamente.', [
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
        {/* Back + heading */}
        <View style={styles.topRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={22} color="#FF6B35" />
          </TouchableOpacity>
          <Text style={styles.heading}>
            {isEditing ? 'Editar receta' : 'Nueva receta'}
          </Text>
        </View>

        {/* Recipe name */}
        <Text style={styles.label}>Nombre de la receta *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ej: Pasta carbonara casera"
          placeholderTextColor="#bbb"
          returnKeyType="next"
        />

        {/* Image */}
        <Text style={styles.label}>Imagen de la receta</Text>
        <TouchableOpacity
          style={styles.imageButton}
          onPress={pickImage}
          activeOpacity={0.8}
        >
          {image ? (
            <View style={styles.imagePreviewContainer}>
              <Image
                source={{ uri: image }}
                style={styles.imagePreview}
                resizeMode="cover"
              />
              <View style={styles.changeImageOverlay}>
                <Ionicons name="camera" size={20} color="white" />
                <Text style={styles.changeImageText}>Cambiar imagen</Text>
              </View>
            </View>
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="camera-outline" size={44} color="#ccc" />
              <Text style={styles.imagePlaceholderText}>
                Toca para seleccionar una imagen
              </Text>
              <Text style={styles.imagePlaceholderSub}>
                Desde tu galería de fotos
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Ingredients */}
        <Text style={styles.label}>Lista de ingredientes * (uno por línea)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={ingredients}
          onChangeText={setIngredients}
          placeholder={'Ej:\n2 tazas de harina\n1 huevo\n1/2 taza de leche'}
          placeholderTextColor="#bbb"
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />

        {/* Instructions */}
        <Text style={styles.label}>
          Instrucciones paso a paso * (un paso por línea)
        </Text>
        <TextInput
          style={[styles.input, styles.textAreaLarge]}
          value={instructions}
          onChangeText={setInstructions}
          placeholder={
            'Ej:\nPrecalienta el horno a 180°C\nMezcla los ingredientes secos\nHornea durante 30 minutos'
          }
          placeholderTextColor="#bbb"
          multiline
          numberOfLines={8}
          textAlignVertical="top"
        />

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.85}
        >
          <Ionicons name="checkmark-circle-outline" size={24} color="white" />
          <Text style={styles.saveButtonText}>
            {isEditing ? 'Actualizar receta' : 'Guardar receta'}
          </Text>
        </TouchableOpacity>

        <View style={styles.bottomSpace} />
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
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
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
  textArea: {
    minHeight: 130,
    lineHeight: 22,
  },
  textAreaLarge: {
    minHeight: 170,
    lineHeight: 22,
  },
  imageButton: {
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#e8e8e8',
    borderStyle: 'dashed',
  },
  imagePreviewContainer: {
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    backgroundColor: '#eee',
  },
  changeImageOverlay: {
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
  changeImageText: {
    color: 'white',
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
  },
  imagePlaceholder: {
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
  },
  imagePlaceholderText: {
    color: '#bbb',
    marginTop: 10,
    fontSize: 15,
    fontWeight: '500',
  },
  imagePlaceholderSub: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 4,
  },
  saveButton: {
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
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 10,
  },
  bottomSpace: {
    height: 40,
  },
});
