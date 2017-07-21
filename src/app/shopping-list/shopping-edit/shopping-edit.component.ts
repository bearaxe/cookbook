import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;

  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
  }

  addItem(){
      const ingName = this.nameInput.nativeElement.value
      const ingAmount = this.amountInput.nativeElement.value
      if( ingName !== '' && ingAmount !== ''){
          this.slService.addToList({
              name: ingName,
              amount: ingAmount
          });
      }
  }

}
