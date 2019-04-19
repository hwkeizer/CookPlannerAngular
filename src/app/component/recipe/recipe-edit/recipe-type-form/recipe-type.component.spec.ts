import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeTypeComponent } from './recipe-type.component';

describe('RecipeTypeComponent', () => {
  let component: RecipeTypeComponent;
  let fixture: ComponentFixture<RecipeTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
