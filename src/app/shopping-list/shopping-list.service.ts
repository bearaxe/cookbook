import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

export class ShoppingListService{
    updatedIngredientList = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomates', 10)
    ];

    getIngredients(){
        return this.ingredients.slice();
    }
    getIngredient(index: number){
      return this.ingredients[index];
    }

    findIngredientIndex(name: string) {
      return this.ingredients.map((item) => item.name).indexOf(name);
    }

    addToList(data: Ingredient){
        console.log('datapassed:', data);
        this.ingredients.push(data);
        this.updatedIngredientList.next(this.ingredients.slice());
    }

    addListToList(ingredientList: Ingredient[]){
        //The ...var is the es6 spread operator (array to object)
        //I'm changing what's used away from what I originally put because you should use this more often
        this.ingredients.push(...ingredientList);
        // this.ingredients = this.ingredients.concat(ingredientList);
        this.updatedIngredientList.next(this.ingredients.slice());
    }

    //This is completely unnecissary, but it's cool so i'm keeping it here under an unused name
    deleteFromListByKey(data: Ingredient){
      // const target = this.ingredients.indexOf({data.name, });
      const target = this.findIngredientIndex(data.name);
      if (target !== -1) {
        this.ingredients.splice(target, 1);
      }
      console.log('ingredients list: ', this.ingredients, "\nTarget:", target);
      this.updatedIngredientList.next(this.ingredients.slice());
    }

    deleteFromList(index: number){
      this.ingredients.splice(index, 1);
      this.updatedIngredientList.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient){
      this.ingredients[index] = newIngredient;
      this.updatedIngredientList.next(this.ingredients.slice());
    }
}
