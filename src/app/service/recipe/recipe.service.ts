import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Recipe } from 'src/app/model/Recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  baseUrl = environment.serverUrl;

  constructor(private http: HttpClient) { }

  getRecipeList() {
    return this.http.get<any>(this.baseUrl + 'recipe/list');
  }

  getRecipeTypes() {
    return this.http.get<any>(this.baseUrl + 'recipe/types')
  }

  updateRecipe(recipe) {
    return this.http.put<Recipe>(this.baseUrl + 'recipe/update', recipe);
  }
}
