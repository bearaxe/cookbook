import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeService } from './recipes/recipe.service';
import { DatabaseService } from './shared/database.service';
// import { SignupComponent } from './auth/signup/signup.component';
// import { SigninComponent } from './auth/signin/signin.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-gaurd.service';
import { LocalDataService } from './shared/local-data.service';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { SharedModule } from './shared/shared.module';
// import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // SignupComponent,
    // SigninComponent,
    AboutComponent,
    ProfileComponent,
    ProfileEditComponent,
    // AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SharedModule,
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    DatabaseService,
    AuthService,
    AuthGuard,
    LocalDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
