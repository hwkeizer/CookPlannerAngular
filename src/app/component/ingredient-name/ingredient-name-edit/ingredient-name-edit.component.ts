import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngredientName } from 'src/app/model/IngredientName';
import { Router } from '@angular/router';
import { IngredientNameService } from 'src/app/service/ingredient-name/ingredient-name.service';
import { IngredientNameDataService } from 'src/app/data/ingredient-name/ingredient-name-data.service';

@Component({
  selector: 'ingredient-name-edit',
  templateUrl: './ingredient-name-edit.component.html',
  styleUrls: ['./ingredient-name-edit.component.css']
})
export class IngredientNameEditComponent implements OnInit {

  editForm: FormGroup;
  submitted = false;
  ingredientName: IngredientName;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ingredientNameService: IngredientNameService,
    private ingredientNameDataService: IngredientNameDataService) { }

  ngOnInit() {
    this.ingredientName = JSON.parse(window.sessionStorage.getItem("editIngredientName"));
    if (!this.ingredientName) {
      alert("Invalid action")
      this.router.navigate(['ingredient-name-list']);
    }
    console.log("Found editIngredient: " + this.ingredientName);
    window.sessionStorage.removeItem("editIngredientName");
    this.editForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      pluralName: ['', Validators.required],
      stock:['']
    });
    this.editForm.patchValue(this.ingredientName);
  }

  onEdit() {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }
    this.ingredientName.name = this.editForm.get('name').value;
    this.ingredientName.pluralName = this.editForm.get('pluralName').value;
    this.ingredientName.stock = this.editForm.get('stock').value;
    this.ingredientNameService.updateIngredientName(this.ingredientName).subscribe(
      data => {
        // Update the dataservice to keep the available list up-to-date 
        this.ingredientNameDataService.updateIngredientName(this.ingredientName);
        this.router.navigate(['ingredient-name-list']);
      }
    )
  }

  get name() {return this.editForm.get('name');}
  get pluralName() {return this.editForm.get('pluralName');}
  get stock() {return this.editForm.get('stock');}

}
