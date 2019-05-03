import { TestBed } from '@angular/core/testing';

import { MeasureUnitService } from './measure-unit.service';

describe('MeasureUnitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeasureUnitService = TestBed.get(MeasureUnitService);
    expect(service).toBeTruthy();
  });
});
