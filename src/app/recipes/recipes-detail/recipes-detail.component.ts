import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  recipe: Recipe;
  id: number = -1;

  constructor(private recipeService:RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService){}

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

  deleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate( ['recipes'], {relativeTo: this.route});
  }

}
