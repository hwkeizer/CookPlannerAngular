import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MeasureUnitService {

  baseUrl = environment.serverUrl;

  constructor(private http: HttpClient) {}

  getMeasureUnitList() {
    return this.http.get<any>(this.baseUrl + 'measure-unit/list');
  }
}
