import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IngredientNameService {

  baseUrl = environment.serverUrl;
  
  constructor(private http: HttpClient) { }

  getIngredientNameList() {
    return this.http.get<any>(this.baseUrl + 'ingredient-name/list');
  }
}
