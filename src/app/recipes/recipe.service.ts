import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService{
    updatedRecipeList = new Subject<Recipe[]>();

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

    updateRecipeInList(index: number, updatedRecipe: Recipe){
        // let tochange = this.getRecipe(index);
        // tochange = updatedRecipe;
        this.recipes[index] = updatedRecipe;
        // why don't I need to push updatedRecpiesList.next here??
        this.updatedRecipeList.next(this.recipes);
        console.log('This should update :(', this.recipes)
    }

    addRecipeToList(newRecipe: Recipe){
      this.recipes.push(newRecipe);
      console.log('In case I need to implement a subscription, this is the new array value: ', this.recipes);
      this.updatedRecipeList.next(this.recipes);
    }

    sendIngredientsToShoppingList(list:Ingredient[]){
        this.slService.addListToList(list);
        alert('Added to shopping list!');
    }
}
