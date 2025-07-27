import React, { useEffect } from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import { useRecipeStore } from './store/recipeStore';

const App = () => {
  const setRecipes = useRecipeStore((state) => state.setRecipes);

  useEffect(() => {
    // Replace with real data or fetch from API
    const sampleRecipes = [
      { title: 'Spaghetti Bolognese', description: 'A classic Italian dish.' },
      { title: 'Chicken Curry', description: 'Spicy and flavorful.' },
    ];
    setRecipes(sampleRecipes);
  }, [setRecipes]);

  return (
    <div className="App">
      <h1>Recipe Sharing App</h1>
      <SearchBar />
      <RecipeList />
    </div>
  );
};

export default App;