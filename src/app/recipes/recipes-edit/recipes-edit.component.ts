import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit {
  recipe: Recipe;
  id: number = 0;
  editMode: boolean = false;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.editMode = params['id'] != null;
        if(this.editMode){
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        } else {
          this.startNewRecipe();
        }
      }
    );
  }

  startNewRecipe(){
    this.id = this.recipeService.newRecipeId();
    this.recipe = new Recipe(this.id, '', '', '', []);
  }

}
