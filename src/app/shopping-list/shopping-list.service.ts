import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService{
    updatedIngredientList = new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomates', 10)
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    addToList(data: Ingredient){
        console.log("datapassed:", data)
        this.ingredients.push(data);
        this.updatedIngredientList.emit(this.ingredients.slice());
    }

    addListToList(ingredientList: Ingredient[]){
        //The ...var is the es6 spread operator (array to object)
        //I'm changing what's used away from what I originally put because you should use this more often
        this.ingredients.push(...ingredientList);
        // this.ingredients = this.ingredients.concat(ingredientList);
        this.updatedIngredientList.emit(this.ingredients.slice());
    }

}
