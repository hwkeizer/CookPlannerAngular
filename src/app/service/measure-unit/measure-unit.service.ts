import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MeasureUnit } from 'src/app/model/MeasureUnit';

@Injectable({
  providedIn: 'root'
})
export class MeasureUnitService {

  baseUrl = environment.serverUrl;

  constructor(private http: HttpClient) {}

  getMeasureUnitList() {
    return this.http.get<any>(this.baseUrl + 'measure-unit/list');
  }

  createMeasureUnit(measureUnit: MeasureUnit) {
    return this.http.post<any>(this.baseUrl + 'measure-unit/create', measureUnit);
  }

  deleteMeasureUnit(measureUnit: MeasureUnit) {
    return this.http.delete<any>(this.baseUrl + 'measure-unit/delete/' + measureUnit.id);
  }
}
