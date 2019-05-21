import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from  '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeListComponent } from './component/recipe/recipe-list/recipe-list.component';
import { NavComponent } from './component/navigation/nav/nav.component';
import { HomeComponent } from './component/home/home.component';
import { SettingsComponent } from './component/settings/settings.component';
import { LoginComponent } from './component/authentication/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './component/authentication/logout/logout.component';
import { AccountListComponent } from './component/authentication/account/account-list/account-list.component';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { AccountCreateComponent } from './component/authentication/account/account-create/account-create.component';
import { NavAdminComponent } from './component/navigation/nav-admin/nav-admin.component';
import { AccountEditComponent } from './component/authentication/account/account-edit/account-edit.component';
import { RecipeDetailComponent } from './component/recipe/recipe-detail/recipe-detail.component';
import { NgbdSortableHeader } from './directive/sortable.directive';
import { RecipeDataService } from './data/recipe/recipe-data.service';
import { RecipeEditComponent } from './component/recipe/recipe-edit/recipe-edit.component';
import { RecipeTypeComponent } from './component/recipe/recipe-edit/recipe-type-form/recipe-type.component';
import { RecipeTagsComponent } from './component/recipe/recipe-edit/recipe-tags-form/recipe-tags.component';
import { IngredientsComponent } from './component/ingredient/ingredient-list/ingredient-list.component';
import { IngredientsEditComponent } from './component/ingredient/ingredients-edit/ingredients-edit.component';
import { MeasureUnitListComponent } from './component/measure-unit/measure-unit-list/measure-unit-list.component';
import { MeasureUnitEditComponent } from './component/ingredient/ingredients-edit/measure-unit-select/measure-unit-select.component';
import { IngredientNameEditComponent } from './component/ingredient/ingredients-edit/ingredient-name-edit/ingredient-name-select.component';
import { IngredientNameListComponent } from './component/ingredient-name/ingredient-name-list/ingredient-name-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    NavComponent,
    HomeComponent,
    SettingsComponent,
    LoginComponent,
    LogoutComponent,
    AccountListComponent,
    AccountCreateComponent,
    NavAdminComponent,
    AccountEditComponent,
    RecipeDetailComponent,
    NgbdSortableHeader,
    RecipeEditComponent,
    RecipeTypeComponent,
    RecipeTagsComponent,
    IngredientsComponent,
    IngredientsEditComponent,
    MeasureUnitListComponent,
    MeasureUnitEditComponent,
    IngredientNameEditComponent,
    IngredientNameListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    RecipeDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
