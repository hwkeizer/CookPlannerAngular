import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngredientName } from 'src/app/model/IngredientName';
import { Router } from '@angular/router';
import { IngredientNameService } from 'src/app/service/ingredient-name/ingredient-name.service';
import { IngredientNameDataService } from 'src/app/data/ingredient-name/ingredient-name-data.service';
import { AlertService, alertType } from 'src/app/service/alert/alert.service';

@Component({
  selector: 'app-ingredient-name-create',
  templateUrl: './ingredient-name-create.component.html',
  styleUrls: ['./ingredient-name-create.component.css']
})
export class IngredientNameCreateComponent implements OnInit {

  createForm: FormGroup;
  submitted = false;
  ingredientName: IngredientName;
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private ingredientNameService: IngredientNameService,
    private ingredientNameDataService: IngredientNameDataService,
    private alertService: AlertService) {}

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      pluralName: ['', Validators.required],
      stock:['']
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.createForm.invalid) {
      return;
    }
    
    this.ingredientName = this.createForm.value;
    this.ingredientNameService.createIngredientName(this.ingredientName).subscribe(
      data => {
        this.ingredientNameDataService.addIngredientName(data.result);
        this.router.navigate(['ingredient-name-list']);
        
      },
      error => {
        this.alertService.alert("Foutmelding " + error.error.status + " " + error.error.message, alertType.error);
        console.log('Foutmelding:', error.error.status, error.error.message)
        this.router.navigate(['ingredient-name-list']);
      }
    )
  }

  get name() {return this.createForm.get('name');}
  get pluralName() {return this.createForm.get('pluralName');}

}
