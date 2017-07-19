import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit, OnChanges {
  @Input() recipe: Recipe;

  ngOnInit() {
  }

  ngOnChanges(){
      console.log("recipe: ", this.recipe)
  }

}