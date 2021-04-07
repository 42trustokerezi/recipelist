import React from 'react'

export default function RecipeIngredientsEdit(props) {
  const {
    ingredient, 
    handleIngredientChange
  } = props

  function handleChange(changes) {
    handleIngredientChange(ingredient.id, {...ingredient, ...changes })
  }
    return (
        <>
          <input 
            className='recipe-edit__input' 
            type='text' 
            value={ingredient.name}    
          />
          <input 
            className='recipe-edit__input' 
            type='text'
            value={ingredient.amount} 
          />
          <button className='btn btn--danger'>&times;</button>  
        </>
    )
}
