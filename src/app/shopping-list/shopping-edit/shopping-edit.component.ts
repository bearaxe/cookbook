import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ingredientForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService,
              public authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
        .subscribe(
          (index: number) => {
            this.editedItemIndex = index;
            this.editMode = true;
            this.editedItem = this.slService.getIngredient(index);
            this.ingredientForm.setValue({
              nameInput: this.editedItem.name,
              amountInput: this.editedItem.amount
            });
          }
        );
  }

  addItem(){
    const newIngredient = new Ingredient(this.ingredientForm.value.nameInput,
                                          this.ingredientForm.value.amountInput);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    }else{
      this.slService.addToList(newIngredient);
    }
    this.clearItem();
  }

  deleteItem() {
    this.slService.deleteFromList(this.editedItemIndex);
    this.clearItem();
  }

  clearItem() {
    this.ingredientForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
