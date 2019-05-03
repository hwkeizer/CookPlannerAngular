import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

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

  updateRecipe(recipe) {
    return this.http.put<any>(this.baseUrl + 'recipe/update', recipe);
  }
}
