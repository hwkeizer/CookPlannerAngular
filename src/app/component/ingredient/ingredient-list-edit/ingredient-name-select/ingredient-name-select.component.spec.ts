import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientNameSelectComponent } from './ingredient-name-select.component';

describe('IngredientNameEditComponent', () => {
  let component: IngredientNameSelectComponent;
  let fixture: ComponentFixture<IngredientNameSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientNameSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientNameSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
