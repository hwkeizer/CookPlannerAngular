import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/model/Recipe';
import { environment } from 'src/environments/environment';
import { RecipeDataService } from 'src/app/data/recipe/recipe-data.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/service/recipe/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  submitted = false;
  recipeForm: FormGroup;
  baseUrl = environment.serverUrl; // Needed for image URL in html
  private _recipeSubscription: Subscription;
  recipe: Recipe;

  constructor(
    private formBuilder: FormBuilder,
    private recipeDataService: RecipeDataService,
    private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit() {    
    this._recipeSubscription = this.recipeDataService.recipe.subscribe(
      data => {
        if (data.id !== undefined) {
          this.recipe = data;
        } else {
          this.recipe = new Recipe();
        }       
        this.recipeForm = this.formBuilder.group({
          id: [''],
          name: ['', Validators.required],
          description: [''],
          notes: [''],
          preparationTime: ['', Validators.min(0)],
          cookTime: ['', Validators.min(0)],
          servings: ['', Validators.min(0)],
          preparations: [''],
          directions: ['', Validators.required],
          rating: ['', Validators.min(0)]
        });
        this.recipeForm.patchValue(this.recipe);
      }
    )
  }

  // Add the child forms to the main form
  formInitialized(name: string, form: FormGroup) {
    console.log("Initialized form: " + name)
    this.recipeForm.setControl(name, form);
  }

  onEdit() {
    this.submitted = true;
    if (this.recipeForm.invalid) {
      return;
    }    

    //Next two lines work (database is updated) but the view does not get updated???
    // this.recipe = this.editForm.value;
    // this.recipe.recipeType = this.editForm.get('recipeTypeForm.recipeType').value;

    // When assigning each field seperately the view gets updated correctly...
    // This is noted as a bug and needs investigation
    this.recipe.name = this.recipeForm.get('name').value;
    this.recipe.description = this.recipeForm.get('description').value;
    this.recipe.notes = this.recipeForm.get('notes').value;
    this.recipe.ingredients = this.recipeForm.get('ingredientsForm.ingredients').value
    this.recipe.recipeType = this.recipeForm.get('recipeTypeForm.recipeType').value;
    this.recipe.preparationTime = this.recipeForm.get('preparationTime').value;
    this.recipe.cookTime = this.recipeForm.get('cookTime').value;
    this.recipe.servings = this.recipeForm.get('servings').value;
    this.recipe.preparations = this.recipeForm.get('preparations').value;
    this.recipe.directions = this.recipeForm.get('directions').value;
    this.recipe.rating = this.recipeForm.get('rating').value;
    console.log("FORM SUBMIT: ", this.recipeForm.value)

    // Lot of duplicate code here!
    if (this.recipe.id) {
      this.recipeService.updateRecipe(this.recipe).subscribe(
        data => {
          this.router.navigate(['recipe-detail']);
        },
        error => {
          alert(JSON.stringify(error));
        }
      )
    } else {
      this.recipeService.createRecipe(this.recipe).subscribe(
        data => {
          this.router.navigate(['recipe-list']);
        },
        error => {
          alert(JSON.stringify(error));
        }
      )
    }
  }

  ngOnDestroy() {
    this._recipeSubscription.unsubscribe();
  }

  get name() {return this.recipeForm.get('name');}
  get description() {return this.recipeForm.get('description');}
  get preparationTime() {return this.recipeForm.get('preparationTime');}
  get cookTime() {return this.recipeForm.get('cookTime');}
  get servings() {return this.recipeForm.get('servings');}
  get rating() {return this.recipeForm.get('rating');}
}
