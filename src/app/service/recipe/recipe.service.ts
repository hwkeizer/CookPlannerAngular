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
    return this.http.get<any>(this.baseUrl + 'recipe/types');
  }

  getAllTags() {
    return this.http.get<any>(this.baseUrl + 'recipe/all-tags');
  }

  updateRecipe(recipe: Recipe) {
    return this.http.put<any>(this.baseUrl + 'recipe/update', recipe);
  }

  updateRecipeImage(recipeId, imageName) {
    return this.http.put<any>(this.baseUrl + 'recipe/' + recipeId + '/update-image', imageName);
  }

  createRecipe(recipe: Recipe) {
    return this.http.post<any>(this.baseUrl + 'recipe/create', recipe);
  }

  deleteRecipe(recipe: Recipe) {
    return this.http.delete<any>(this.baseUrl + 'recipe/delete/' + recipe.id)
  }
}
