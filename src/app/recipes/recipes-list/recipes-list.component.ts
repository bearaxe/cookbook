import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { LocalDataService } from '../../shared/local-data.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  recipes: Recipe[];
  index: number;

  constructor(private recipeService: RecipeService,
              private localDS: LocalDataService) { }

  ngOnInit() {
      this.recipes = this.recipeService.getRecipes();
      this.subscription = this.recipeService.updatedRecipeList.subscribe(
        (newRecipeList) => {
            console.log('found an update!');
            this.recipes = newRecipeList;
        });
  }

  isAuthenticated() {
    return this.localDS.isAuthenticated();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
