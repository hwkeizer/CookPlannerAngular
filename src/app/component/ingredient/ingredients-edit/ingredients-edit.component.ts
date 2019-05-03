import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Ingredient } from 'src/app/model/Ingredient';

@Component({
  selector: 'ingredients-edit',
  templateUrl: './ingredients-edit.component.html',
  styleUrls: ['./ingredients-edit.component.css']
})
export class IngredientsEditComponent implements OnInit {

  @Input() ingredients: Ingredient[];
  @Input() submitted;
  @Output() formReady = new EventEmitter<FormGroup>()
  ingredientsForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.ingredientsForm = this.formBuilder.group({
      ingredients: new FormArray([])
    });
    this.ingredients.map((o, i) => {
      const control = this.formBuilder.group(o);
      const controlIngredient = this.formBuilder.group(o.name);
      const controlMeasureUnit = this.formBuilder.group(o.measureUnit);
      control.setControl('name', controlIngredient);
      control.setControl('measureUnit', controlMeasureUnit);
      (this.ingredientsForm.controls.ingredients as FormArray).push(control);
    })
    this.formReady.emit(this.ingredientsForm);
  }
}
