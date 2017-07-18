import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {
  @Input() recipe:Recipe;
  @Output() detailToggle= new EventEmitter<void>();
  constructor() {
    //   this.recipe = passedRec;
  }

  ngOnInit() {
  }

  showDetail(){
      console.log("emitting void detailToggler");
      this.detailToggle.emit();
  }

}
