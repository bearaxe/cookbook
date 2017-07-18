import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  // @Output() detailToggle= new EventEmitter<Recipe>();
  selectedRecipe: Recipe;
  constructor() { }

  ngOnInit() {
  }

  // detailToggle(){
  //     console.log("lol does this actually work?")
  // }

  setRecipe(data){
      console.log("NOTHITS DATA:", data)
    //   this.chosenRecipe = data;
    //   console.log("choesnerecpisef:", this.chosenRecipe);
    //   this.detailToggle.emit(data);s
  }

}
