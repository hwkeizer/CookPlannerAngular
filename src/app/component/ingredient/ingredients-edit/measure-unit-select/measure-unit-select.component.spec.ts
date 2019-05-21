import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureUnitEditComponent } from './measure-unit-select.component';

describe('MeasureUnitEditComponent', () => {
  let component: MeasureUnitEditComponent;
  let fixture: ComponentFixture<MeasureUnitEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasureUnitEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureUnitEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
