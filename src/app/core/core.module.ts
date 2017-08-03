import { NgModule } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeService } from '../recipes/recipe.service';
import { DatabaseService } from '../shared/database.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth-gaurd.service';
import { LocalDataService } from '../shared/local-data.service';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    AboutComponent,
    HeaderComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    DatabaseService,
    AuthService,
    AuthGuard,
    LocalDataService
  ]
})

export class CoreModule {

}
