import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInput: ElementRef;
  // @ViewChild('amountInput') amountInput: ElementRef;
  @ViewChild('f') ingredientForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;

  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

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
    // console.log('Add button caught');
    const newIngredient = new Ingredient(this.ingredientForm.value.nameInput,
                                          this.ingredientForm.value.amountInput);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    }else{
      this.slService.addToList(newIngredient);
    }
    this.clearItem();


    // Old version doing what I thought. Updated to match course.
    // console.log('uhgm', this.ingredientForm)
    // const ingName = this.ingredientForm.value.nameInput;
    // const ingAmount = this.ingredientForm.value.amountInput;
    // const obj = { name: ingName,
    //               amount: ingAmount
    //             };
    // if( ingName && ingAmount ) {
    //   if(this.editMode) {
    //     this.slService.deleteFromList(obj);
    //   }
    //   this.slService.addToList(obj);
    // }
    // this.clearItem();

      // Old nonForm centered approach
      // const ingName = this.nameInput.nativeElement.value
      // const ingAmount = this.amountInput.nativeElement.value
      // if( ingName !== '' && ingAmount !== '') {
      //     this.slService.addToList({
      //         name: ingName,
      //         amount: ingAmount
      //     });
      // }
  }

  deleteItem() {
    this.slService.deleteFromList(this.editedItemIndex);
    this.clearItem();
    // console.log('Delete button caught');
    // const ingName = this.ingredientForm.value.nameInput;
    // const ingAmount = this.ingredientForm.value.amountInput;
    // // This is intentional, idc if the ingAmount is empty or not
    // if (ingName ) {
    //   this.slService.deleteFromList({
    //     name: ingName,
    //     amount: ingAmount
    //   });
    // }
    // this.clearItem();
  }

  clearItem() {
    // console.log('Clear button caught');
    this.ingredientForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
