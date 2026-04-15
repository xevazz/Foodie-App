import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [myRecipes, setMyRecipes] = useState([]);

  const toggleFavorite = (recipeId) => {
    setFavorites((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const isFavorite = (recipeId) => favorites.includes(recipeId);

  const addRecipe = (recipe) => {
    const newRecipe = {
      ...recipe,
      id: `my_${Date.now()}`,
      isCustom: true,
    };
    setMyRecipes((prev) => [...prev, newRecipe]);
    return newRecipe;
  };

  const editRecipe = (id, updatedRecipe) => {
    setMyRecipes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updatedRecipe } : r))
    );
  };

  const deleteRecipe = (id) => {
    setMyRecipes((prev) => prev.filter((r) => r.id !== id));
    setFavorites((prev) => prev.filter((favId) => favId !== id));
  };

  return (
    <AppContext.Provider
      value={{
        favorites,
        myRecipes,
        toggleFavorite,
        isFavorite,
        addRecipe,
        editRecipe,
        deleteRecipe,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
