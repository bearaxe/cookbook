import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../../shared/Ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() sigAddIngredient = new EventEmitter<Ingredient>();
  // @Output() sigAddIngredient = new EventEmitter<{name: string, amount: number}>();
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  addItem(){
      const ingName = this.nameInput.nativeElement.value
      const ingAmount = this.amountInput.nativeElement.value
      if( ingName !== '' && ingAmount !== ''){
          this.sigAddIngredient.emit({
              name:ingName,
              amount: ingAmount
          });
      }
  }

}
