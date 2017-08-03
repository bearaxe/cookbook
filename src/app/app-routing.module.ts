import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  // {path: 'recipes', loadChildren: './recipes/recipes.module.ts#RecipeModule'},
  {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
  // {path: 'recipes', component: RecipesComponent, children: [
  //   {path: '', component: RecipesStartComponent, pathMatch: 'full'},
  //   {path: 'new', component: RecipesEditComponent, canActivate: [AuthGuard]},
  //   {path: ':id', component: RecipesDetailComponent},
  //   {path: ':id/edit', component: RecipesEditComponent, canActivate: [AuthGuard]},
  // ]},
  // {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'about', component: AboutComponent},
  // I don't know why I can't use children here correctly :/
  {path: 'profile', component: ProfileComponent, children: [
    // {path: '', component: ProfileComponent, pathMatch: 'full'},
    // {path: 'edit', component: ProfileEditComponent}
  ]},
  {path: 'profile/edit', component: ProfileEditComponent},

  // {path: '**', redirectTo: '/recipes'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
