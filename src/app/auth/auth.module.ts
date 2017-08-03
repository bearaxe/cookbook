import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    AuthComponent
  ],
  imports: [
    AuthRoutingModule,
    FormsModule
  ]
})

export class AuthModule {

}
