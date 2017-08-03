import { NgModule } from '@angular/core';
import { CapitalizePipe } from './captialize.pipe';
import { DropdownDirective } from './dropdown.directive';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CapitalizePipe,
    DropdownDirective,
  ],
  exports: [
    CapitalizePipe,
    DropdownDirective,
    ReactiveFormsModule
  ]
})
export class SharedModule {

}
