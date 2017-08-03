import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';

const shoppingListRoutes: Routes = [
  {path: '', component: ShoppingListComponent},
  // this is a hack, but logging it somewhere so I can acknowledge this works but is bad code.
  {path: '/wrong', component: ShoppingListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(shoppingListRoutes)],
  exports: [RouterModule],
})

export class ShoppingListRoutingModule {

}
