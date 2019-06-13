import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MeasureUnit } from 'src/app/model/MeasureUnit';
import { Router } from '@angular/router';
import { MeasureUnitService } from 'src/app/service/measure-unit/measure-unit.service';
import { MeasureUnitDataService } from 'src/app/data/measure-unit/measure-unit-data.service';

@Component({
  selector: 'app-measure-unit-create',
  templateUrl: './measure-unit-create.component.html',
  styleUrls: ['./measure-unit-create.component.css']
})
export class MeasureUnitCreateComponent implements OnInit {

  createForm: FormGroup;
  submitted = false;
  measureUnit: MeasureUnit;
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private measureUnitService: MeasureUnitService,
    private measureUnitDataService: MeasureUnitDataService
    ) {}

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      pluralName: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.createForm.invalid) {
      return;
    }
    
    this.measureUnit = this.createForm.value;
    this.measureUnitService.createMeasureUnit(this.measureUnit).subscribe(
      data => {
        this.router.navigate(['measure-unit-list']);
        this.measureUnitDataService.addMeasureUnit(data.result);
      },
      error => {
        console.log('Foutmelding:', error.error.status, error.error.message)
        this.router.navigate(['measure-unit-list']);
      }
    )
  }

  get name() {return this.createForm.get('name');}
  get pluralName() {return this.createForm.get('pluralName');}

}
