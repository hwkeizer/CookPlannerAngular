import { TestBed } from '@angular/core/testing';

import { MeasureUnitDataService } from './measure-unit-data.service';

describe('MeasureUnitDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeasureUnitDataService = TestBed.get(MeasureUnitDataService);
    expect(service).toBeTruthy();
  });
});
