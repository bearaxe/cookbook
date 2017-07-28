import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService{

    private recipes:Recipe[] = [
        new Recipe(
            'Rock Soup',
            'can you smell what the rock\'s cookin?',
            'https://upload.wikimedia.org/wikipedia/commons/6/65/Libum_Sweet_Cheesecake_ingredients_%26_recipe_%288411812870%29.jpg',
            [
                new Ingredient('rocks', 325),
                new Ingredient('water', 1)
            ]
        ),
        new Recipe(
            'cheezeburger',
            'i can haz, yes?',
            'https://upload.wikimedia.org/wikipedia/commons/6/65/Libum_Sweet_Cheesecake_ingredients_%26_recipe_%288411812870%29.jpg',
            [
                new Ingredient('cow', 1),
                new Ingredient('bun', 2)
            ]
        )
    ];

    constructor(private slService:ShoppingListService){}

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(id: number){
      return this.recipes[id];
    }

    newRecipeId(){
      return this.recipes.length +1;
    }

    setRecipes(updatedList:Recipe[]) {
      // this.recipes = updatedList;
      // console.log('pretend this worked')
    }

    saveRecipe(updatedRecipe:Recipe){
      console.log('pretend this worked')
    }

    sendIngredientsToShoppingList(list:Ingredient[]){
        this.slService.addListToList(list);
        alert("Added to shopping list!");
    }
}
