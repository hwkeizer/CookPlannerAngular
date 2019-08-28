import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IngredientName } from 'src/app/model/IngredientName';

@Injectable({
  providedIn: 'root'
})
export class IngredientNameService {

  baseUrl = environment.serverUrl;
  
  constructor(private http: HttpClient) { }

  getIngredientNameList() {
    return this.http.get<any>(this.baseUrl + 'ingredient-name/list');
  }

  createIngredientName(ingredientName: IngredientName) {
    return this.http.post<any>(this.baseUrl + 'ingredient-name/create', ingredientName);
  }

  updateIngredientName(ingredientName: IngredientName) {
    return this.http.put<any>(this.baseUrl + 'ingredient-name/update', ingredientName);
  }

  deleteIngredientName(ingredientName: IngredientName) {
    return this.http.delete<any>(this.baseUrl + 'ingredient-name/delete/' + ingredientName.id);
  }
}
