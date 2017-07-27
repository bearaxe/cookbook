import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  recipes: Recipe[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
      this.recipes = this.recipeService.getRecipes();
      this.subscription = this.recipeService.updatedRecipeList.subscribe(
        (newRecipeList) => {
            console.log("found an update!");
            this.recipes = newRecipeList;
        });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
