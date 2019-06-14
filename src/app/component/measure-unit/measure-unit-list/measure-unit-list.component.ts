import { Component, OnInit } from '@angular/core';
import { MeasureUnitService } from 'src/app/service/measure-unit/measure-unit.service';
import { MeasureUnit } from 'src/app/model/MeasureUnit';
import { MeasureUnitDataService } from 'src/app/data/measure-unit/measure-unit-data.service';

@Component({
  selector: 'measure-unit-list',
  templateUrl: './measure-unit-list.component.html',
  styleUrls: ['./measure-unit-list.component.css']
})
export class MeasureUnitListComponent implements OnInit {

  measureUnits: MeasureUnit[];

  constructor(
    private measureUnitService: MeasureUnitService,
    private measureUnitDataService: MeasureUnitDataService) {}

  ngOnInit() {
    this.measureUnitService.getMeasureUnitList().subscribe(
      data => {
        this.measureUnits = data.result;
      }
    )
  }

  deleteMeasureUnit(measureUnit) {
    this.measureUnitService.deleteMeasureUnit(measureUnit).subscribe(
      data => { 
        this.measureUnitDataService.deleteMeasureUnit(measureUnit);
        this.measureUnits.splice(this.measureUnits.indexOf(measureUnit), 1);
      },
      error => {
        console.log('Foutmelding', error.error.status, error.error.message);
      }
    )
  }

  editMeasureUnit(measureUnit) {
    console.log('Wijzigen maateenheid nog niet geimplementeerd: ', measureUnit);
  }

}
