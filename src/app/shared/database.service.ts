import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import 'rxjs/Rx';
// import { Observable } from 'rxjs/Observable';

@Injectable()
export class DatabaseService {

  constructor(private http: Http,
              private recipeService: RecipeService,
              private slService: ShoppingListService) { }

  fetchData(){
    console.log('Fetching data!');
    return this.http.get('https://ng-cookbook-dd5be.firebaseio.com/library.json').map(
      (response: Response) => {
        const data = response.json();
        console.log('response:', data);
        this.recipeService.setList(data['recipes']);
        this.slService.setList(data['shoppingList']);
        return true;
      }
    );
  }

  saveData(){
    console.log('Sending step!\nData being sent:', this.sessionInfo());
    return this.http.put('https://ng-cookbook-dd5be.firebaseio.com/library.json', this.sessionInfo());
  }

  sessionInfo(){
    return {'recipes': this.recipeService.getRecipes(), 'shoppingList': this.slService.getIngredients()};
  }

}
