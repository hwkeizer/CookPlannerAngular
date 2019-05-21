import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Ingredient } from 'src/app/model/Ingredient';
import { IngredientName } from 'src/app/model/IngredientName';

/**
 * Component to display an editable list of ingredients in a table
 */
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
  ingredientNames: IngredientName[];

  constructor(
    private formBuilder: FormBuilder) {}

  ngOnInit() {    
    this.ingredientsForm = this.formBuilder.group({
      ingredients: new FormArray([])
    });

    // Add the ingredients to the ingredients FormArray
    this.ingredients.map((o, i) => {
      const control = this.formBuilder.group(o);
      (this.ingredientsForm.controls.ingredients as FormArray).push(control);
    })

    // link the ingredientsForm to the parent's form (recipeForm)
    this.formReady.emit(this.ingredientsForm);
  }

  // Add updated measureUnit to the ingredient and patch into the form
  updateMeasureUnit(measureUnit, ingredient) {
    this.ingredients = this.ingredientsForm.get('ingredients').value;
    this.ingredients.map((item, i) => {
      if (item.id == ingredient.id) {
        this.ingredients[i].measureUnit = measureUnit;
      }
    });
    this.ingredientsForm.get('ingredients').patchValue(this.ingredients);
  }

}
