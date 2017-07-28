import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  recipe: Recipe;
  id: number = 0;

  constructor(private recipeService:RecipeService,
              private router: Router,
              private route: ActivatedRoute){}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  sendToShoppingList(list){
      this.recipeService.sendIngredientsToShoppingList(list);
  }

  openEdit(){
    // [routerLink]="['/recipes', recipe.id, 'edit']"
    this.router.navigate( ['edit'], {relativeTo: this.route});
  }

}
