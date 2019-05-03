import { Component, OnInit } from '@angular/core';
import { MeasureUnitService } from 'src/app/service/measure-unit/measure-unit.service';
import { MeasureUnit } from 'src/app/model/MeasureUnit';

@Component({
  selector: 'app-measure-unit-list',
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
        console.log(this.measureUnits);
      }
    )
  }

}
