import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();
    
    private recipes:Recipe[] = [
        new Recipe('cheezeburger', 'is tastey', 'https://upload.wikimedia.org/wikipedia/commons/6/65/Libum_Sweet_Cheesecake_ingredients_%26_recipe_%288411812870%29.jpg'),
        new Recipe('cheezeburger2', '2is tastey', 'https://upload.wikimedia.org/wikipedia/commons/6/65/Libum_Sweet_Cheesecake_ingredients_%26_recipe_%288411812870%29.jpg')
    ];

    getRecipes(){
        return this.recipes.slice();
    }
}
