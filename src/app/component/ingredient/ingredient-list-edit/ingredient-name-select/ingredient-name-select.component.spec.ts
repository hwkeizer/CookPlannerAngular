import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientNameEditComponent } from './ingredient-name-select.component';

describe('IngredientNameEditComponent', () => {
  let component: IngredientNameEditComponent;
  let fixture: ComponentFixture<IngredientNameEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientNameEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientNameEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
