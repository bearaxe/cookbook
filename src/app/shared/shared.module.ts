import { NgModule } from '@angular/core';
import { CapitalizePipe } from './captialize.pipe';
import { DropdownDirective } from './dropdown.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    CapitalizePipe,
    DropdownDirective,
  ],
  exports: [
    CommonModule,
    CapitalizePipe,
    DropdownDirective,
    ReactiveFormsModule
  ]
})
export class SharedModule {

}
