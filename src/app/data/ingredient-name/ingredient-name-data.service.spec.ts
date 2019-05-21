import { TestBed } from '@angular/core/testing';

import { IngredientNameDataService } from './ingredient-name-data.service';

describe('IngredientNameDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IngredientNameDataService = TestBed.get(IngredientNameDataService);
    expect(service).toBeTruthy();
  });
});
