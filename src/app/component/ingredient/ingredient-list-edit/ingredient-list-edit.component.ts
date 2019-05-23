import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Ingredient } from 'src/app/model/Ingredient';

/**
 * Component to display an editable list of ingredients in a table
 */
@Component({
  selector: 'ingredient-list-edit',
  templateUrl: './ingredient-list-edit.component.html',
  styleUrls: ['./ingredient-list-edit.component.css']
})
export class IngredientListEditComponent implements OnInit {

  @Input() ingredients: Ingredient[];
  @Input() submitted;
  @Output() formReady = new EventEmitter<FormGroup>()
  ingredientsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder) {}

  ngOnInit() {    
    this.ingredientsForm = this.formBuilder.group({
      ingredients: new FormArray([])
    });
    // Add the ingredients to the ingredients FormArray
    if (this.ingredients) {
      this.ingredients.map((o, i) => {
        this.ingredientToGroup(o);
      });
    }
    // link the ingredientsForm to the parent's form (recipeForm)
    this.formReady.emit(this.ingredientsForm);
  }

  ingredientToGroup(ingredient: Ingredient) {
    const formGroup = this.formBuilder.group({
      id: [ingredient.id || ''],
      name: [ingredient.name || ''],
      amount: [ingredient.amount || '', Validators.required],
      stock: [ingredient.stock || ''],
      measureUnit: [ingredient.measureUnit || '']
    });
    (this.ingredientsForm.controls.ingredients as FormArray).push(formGroup);
  }

  addIngredient() {
    const ingredient = new Ingredient();   
    this.ingredientToGroup(ingredient);
    this.ingredients.push(ingredient);
  }

  removeIngredient(ingredientIndex) {
    this.ingredients.splice(ingredientIndex, 1);
    (this.ingredientsForm.controls.ingredients as FormArray).removeAt(ingredientIndex);
  }

  // Add updated measureUnit to the ingredient and patch into the form
  updateMeasureUnit(measureUnit, ingredientIndex) {
    this.ingredients = this.ingredientsForm.get('ingredients').value;
    this.ingredients[ingredientIndex].measureUnit = measureUnit;
    this.ingredientsForm.get('ingredients').patchValue(this.ingredients);
  }

  // Add updated ingredientName to the ingredient and patch into the form
  updateIngredientName(ingredientName, ingredientIndex) {
    this.ingredients = this.ingredientsForm.get('ingredients').value;
    this.ingredients[ingredientIndex].name = ingredientName;
    this.ingredientsForm.get('ingredients').patchValue(this.ingredients);
  }

  get amount() {return this.ingredientsForm.get('ingredients.amount');}

}
