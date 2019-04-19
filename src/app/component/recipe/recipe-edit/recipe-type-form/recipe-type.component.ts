import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/service/recipe/recipe.service';

@Component({
  selector: 'recipe-type-form',
  templateUrl: './recipe-type.component.html',
  styleUrls: ['./recipe-type.component.css']
})
export class RecipeTypeComponent implements OnInit {

  @Input() submitted;
  @Input() recipe;
  @Output() formReady = new EventEmitter<FormGroup>();
  recipeTypeForm: FormGroup;
  types: string[];

  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.getRecipeTypes().subscribe(
      types => {
        this.types = types.result;        
      }
    );
    this.recipeTypeForm = this.formBuilder.group({
      recipeType: ['', Validators.required],
    });
    this.recipeTypeForm.patchValue(this.recipe);
    this.formReady.emit(this.recipeTypeForm);    
  }

  get recipeType() {return this.recipeTypeForm.get('recipeType');}
}
