import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private subscription: Subscription;

  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
      this.ingredients = this.slService.getIngredients();
      this.subscription = this.slService.updatedIngredientList.subscribe(
          (updatedIngredientList) => {
              this.ingredients = updatedIngredientList;
          }
      );
  }

  onEditItem(index: number){
    this.slService.startedEditing.next(index);
  }

  // you need to unsubscribe manually in this case because angular doesn't handle subject leaving events
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
