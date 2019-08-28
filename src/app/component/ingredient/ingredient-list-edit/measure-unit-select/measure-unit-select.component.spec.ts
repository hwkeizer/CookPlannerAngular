import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureUnitSelectComponent } from './measure-unit-select.component';

describe('MeasureUnitEditComponent', () => {
  let component: MeasureUnitSelectComponent;
  let fixture: ComponentFixture<MeasureUnitSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasureUnitSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureUnitSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
