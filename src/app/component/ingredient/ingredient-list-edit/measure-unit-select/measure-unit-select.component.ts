import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { MeasureUnitDataService } from 'src/app/data/measure-unit/measure-unit-data.service';
import { MeasureUnit } from 'src/app/model/MeasureUnit';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';

/**
 * Component to select a single measureUnit from the list of available
 * measure units. The component shows the (single) name field.
 */
@Component({
  selector: 'measure-unit-select',
  templateUrl: './measure-unit-select.component.html',
  styleUrls: ['./measure-unit-select.component.css']
})
export class MeasureUnitSelectComponent implements OnInit, OnDestroy {

  @Input() measureUnit: MeasureUnit;
  @Output() valueChange: EventEmitter<MeasureUnit> = new EventEmitter<MeasureUnit>();

  measureUnitList: MeasureUnit[];
  measureUnitSubscription: Subscription;

  constructor(
    private measureUnitDataService: MeasureUnitDataService) {
      // Retrieve the list of available measure units from the data service
      this.measureUnitSubscription = this.measureUnitDataService.measureUnits.subscribe(
          data => {
            this.measureUnitList = data;
          }
        )
   }

  ngOnInit() {
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.measureUnitList.filter(mu => mu.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formatter = (x: {name: string}) => x.name;

  selectedItem(value) {
    this.valueChange.emit(value.item);
  }

  ngOnDestroy() {
    this.measureUnitSubscription.unsubscribe();
  }
}
