import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
    // @Output() transmit= new EventEmitter<Recipe>();
    // @Input() detailToggle: Recipe;
    @Output() bubblingToggle= new EventEmitter<Recipe>();
    recipes:Recipe[] = [
        new Recipe('cheezeburger', 'is tastey', 'https://upload.wikimedia.org/wikipedia/commons/6/65/Libum_Sweet_Cheesecake_ingredients_%26_recipe_%288411812870%29.jpg'),
        new Recipe('cheezeburger2', '2is tastey', 'https://upload.wikimedia.org/wikipedia/commons/6/65/Libum_Sweet_Cheesecake_ingredients_%26_recipe_%288411812870%29.jpg')
    ];

  constructor() { }

  bubbleToggle(recipe: Recipe){
    //   console.log("senddddding data up:", recipe)
      this.bubblingToggle.emit(recipe);
  }

  ngOnInit() {
  }

}
