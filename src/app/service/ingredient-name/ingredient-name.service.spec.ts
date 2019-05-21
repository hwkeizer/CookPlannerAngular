import { TestBed } from '@angular/core/testing';

import { IngredientNameService } from './ingredient-name.service';

describe('IngredientNameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IngredientNameService = TestBed.get(IngredientNameService);
    expect(service).toBeTruthy();
  });
});
