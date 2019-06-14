import { Injectable } from '@angular/core';
import { MeasureUnit } from 'src/app/model/MeasureUnit';
import { BehaviorSubject, Observable } from 'rxjs';
import { MeasureUnitService } from 'src/app/service/measure-unit/measure-unit.service';

/**
 * MeasureUnitDataService provides the list of all available measure units.
 * This list is initialized from the database and can be updated through the 
 * 'updateMeasureUnits(MeasureUnit[])' methode or can be asked to synch from the database
 */
@Injectable({
  providedIn: 'root'
})
export class MeasureUnitDataService {

  private _measureUnits: BehaviorSubject<MeasureUnit[]>;
  public measureUnits: Observable<MeasureUnit[]>;

  constructor(private measureUnitService: MeasureUnitService) {
    this._measureUnits = new BehaviorSubject<MeasureUnit[]>([]);
    this.measureUnits = this._measureUnits.asObservable();
    this.syncMeasureUnits();  
  }

  updateMeasureUnits(measureUnitList: MeasureUnit[]) {
    this._measureUnits.next(measureUnitList);
  }

  addMeasureUnit(measureUnit: MeasureUnit) {
    this._measureUnits.value.push(measureUnit);
    this._measureUnits.next(this._measureUnits.value);
  }

  deleteMeasureUnit(measureUnit: MeasureUnit) {
    this._measureUnits.value.splice(this._measureUnits.value.indexOf(measureUnit), 1);
    this._measureUnits.next(this._measureUnits.value);
  }

  syncMeasureUnits() {
    this.measureUnitService.getMeasureUnitList().subscribe(
      data => {
        this.updateMeasureUnits(data.result);          
      }
    )
  }
}
