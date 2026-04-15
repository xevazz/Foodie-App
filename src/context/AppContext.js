import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [myRecipes, setMyRecipes] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const isFavorite = (id) => favorites.includes(id);

  const addRecipe = (recipe) => {
    setMyRecipes((prev) => [
      ...prev,
      { ...recipe, id: `my_${Date.now()}` },
    ]);
  };

  const editRecipe = (id, changes) => {
    setMyRecipes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...changes } : r))
    );
  };

  const deleteRecipe = (id) => {
    setMyRecipes((prev) => prev.filter((r) => r.id !== id));
    setFavorites((prev) => prev.filter((f) => f !== id));
  };

  return (
    <AppContext.Provider value={{ favorites, myRecipes, toggleFavorite, isFavorite, addRecipe, editRecipe, deleteRecipe }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
