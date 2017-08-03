import { NgModule } from '@angular/core';
import { CapitalizePipe } from './captialize.pipe';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [
    CapitalizePipe,
    DropdownDirective,
  ],
  exports: [
    CapitalizePipe,
    DropdownDirective,
  ]
})
export class SharedModule {

}
