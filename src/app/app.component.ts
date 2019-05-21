import { Component } from '@angular/core';
import { MeasureUnitDataService } from './data/measure-unit/measure-unit-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CookPlannerAngular';

  // Inject Services that need to be available at startup
  constructor(
    private measureUnitDataService: MeasureUnitDataService
  ) {

  }
}
