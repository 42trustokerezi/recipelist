import React,{ useState, useEffect } from 'react';
import RecipeList from './RecipeList'
import '../css/App.css'
import RecipeEdit from './RecipeEdit';

 export const RecipeContext = React.createContext()
 const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  const [recipes, setRecipes] = useState(sampleRecipes)
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)

  /**persisting data rendered */
  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
    return () => console.log('recipes set')
  }, [recipes])

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id)
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: Math.random(),
      name: 'New ',
      servings: 1,
      cookTime: '1:00',
      Instructions: 'Instr.',
      ingredients: [
        { id: Math.random(), name: 'Name', amount: '1 Tbs' }
      ]
    }

    setRecipes([...recipes, newRecipe])
}

function handleRecipeChange(id, recipe) {
  const newRecipes = [...recipes]
  const index = newRecipes.findIndex(r => r.id === id);
  /**find recipe with index and set it to current recipe */
  newRecipes[index] = recipe
  setRecipes(newRecipes)
}

function handleRecipeDelete(id){
  setRecipes(recipes.filter(recipe => recipe.id !== id))
}

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} /> 
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/>}
    </RecipeContext.Provider>
  )
}

  

const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    servings: 3,
    cookTime: '1:45',
    Instructions: "1. Put salt on Chicken\n2. Put chicken in oven\n3. Eat chicken",
    ingredients: [
      {
        id: 1,
        name: 'Chicken',
        amount: '2 Pounds'
      },
      {
        id: 2,
        name: 'Salt',
        amount: '1 Tbs'
      }
    ]
  },
  {
    id: 2,
    name: 'Plain Pork',
    servings: 5,
    cookTime: '0:45',
    Instructions: "1. Put salt on Pork\n2. Put Pork in oven\n3. Eat Pork",
    ingredients: [
      {
        id: 1,
        name: 'Pork',
        amount: '3 Pounds'
      },
      {
        id: 2,
        name: 'Paprika',
        amount: '1 Tbs'
      }
    ]
  },
]

export default App;
