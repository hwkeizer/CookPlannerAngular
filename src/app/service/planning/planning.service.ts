import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Recipe } from 'src/app/model/Recipe';
import { Planning } from 'src/app/model/Planning';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  baseUrl = environment.serverUrl;
  
  constructor(private http: HttpClient) {}

  getPlanningList() {
    return this.http.get<any>(this.baseUrl + 'planning/list');
  }

  addPlanning(recipe: Recipe) {
    return this.http.post<any>(this.baseUrl + 'planning/add', recipe);
  }

  addEmptyPlanning() {
    return this.http.post<any>(this.baseUrl + 'planning/add-empty', null);
  }

  removePlanning(planning: Planning) {
    return this.http.delete<any>(this.baseUrl + 'planning/delete/' + planning.id);
  }
}
