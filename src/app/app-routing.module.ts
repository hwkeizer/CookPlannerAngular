import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { RecipeListComponent } from './component/recipe/recipe-list/recipe-list.component';
import { HomeComponent } from './component/home/home.component';
import { SettingsComponent } from './component/settings/settings.component';
import { LoginComponent } from './component/authentication/login/login.component';
import { LogoutComponent } from './component/authentication/logout/logout.component';
import { AccountListComponent } from './component/authentication/account/account-list/account-list.component';
import { AccountCreateComponent } from './component/authentication/account/account-create/account-create.component';
import { AccountEditComponent } from './component/authentication/account/account-edit/account-edit.component';
import { RecipeDetailComponent } from './component/recipe/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './component/recipe/recipe-edit/recipe-edit.component';
import { MeasureUnitListComponent } from './component/measure-unit/measure-unit-list/measure-unit-list.component';
import { IngredientNameListComponent } from './component/ingredient-name/ingredient-name-list/ingredient-name-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'account-list', component: AccountListComponent},
  {path: 'account-create', component: AccountCreateComponent},
  {path: 'account-edit', component: AccountEditComponent},
  {path: 'recipe-list', component: RecipeListComponent},
  {path: 'recipe-detail', component: RecipeDetailComponent},
  {path: 'recipe-edit', component: RecipeEditComponent},
  {path: 'measure-unit-list', component: MeasureUnitListComponent},
  {path: 'ingredient-name-list', component: IngredientNameListComponent},
  {path: 'settings', component: SettingsComponent},
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
