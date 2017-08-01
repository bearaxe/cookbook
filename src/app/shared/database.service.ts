import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import 'rxjs/Rx';
import { AuthService } from '../auth/auth.service';
// import { Observable } from 'rxjs/Observable';

@Injectable()
export class DatabaseService {

  constructor(private http: Http,
              private recipeService: RecipeService,
              private slService: ShoppingListService,
              // private authService: AuthService,
              ) { }

  fetchData(token: string){
    // const token = this.authService.getToken();

    console.log('Fetching data!');
    return this.http.get('https://ng-cookbook-dd5be.firebaseio.com/library.json?auth=' + token).map(
      (response: Response) => {
        const data = response.json();
        console.log('response:', data);
        this.handleRecipes(data['recipes']);
        this.slService.setList(data['shoppingList']);
        return true;
      },
      (error) => console.log(error)
    );
  }

  handleRecipes(recipes){
    // checking data to make sure they all contain Recipe structured data
    for (let recipe of recipes) {
      if (!recipe['ingredients']) {
        recipe['ingredients'] = [];
      }
    }
    this.recipeService.setList(recipes);
  }

  saveData(token: string){
    // const token = this.authService.token;
    console.log('Sending step!\nData being sent:', this.sessionInfo());
    return this.http.put('https://ng-cookbook-dd5be.firebaseio.com/library.json?auth=' + token, this.sessionInfo());
  }

  sessionInfo(){
    return {'recipes': this.recipeService.getRecipes(), 'shoppingList': this.slService.getIngredients()};
  }

}
