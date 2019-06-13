import { Component, OnInit } from '@angular/core';
import { MeasureUnitService } from 'src/app/service/measure-unit/measure-unit.service';
import { MeasureUnit } from 'src/app/model/MeasureUnit';

@Component({
  selector: 'measure-unit-list',
  templateUrl: './measure-unit-list.component.html',
  styleUrls: ['./measure-unit-list.component.css']
})
export class MeasureUnitListComponent implements OnInit {

  measureUnits: MeasureUnit[];

  constructor(private measureUnitService: MeasureUnitService) {}

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
        this.measureUnits.splice(this.measureUnits.indexOf(measureUnit), 1);
      },
      error => {
        console.log('Foutmelding', error.error.status, error.error.message);
      }
    )
  }

  // editMeasureUnit(account) {
  //   window.sessionStorage.removeItem("editAccount");
  //   window.sessionStorage.setItem("editAccount", JSON.stringify(account));
  //   this.router.navigate(['account-edit']);
  // }

}
