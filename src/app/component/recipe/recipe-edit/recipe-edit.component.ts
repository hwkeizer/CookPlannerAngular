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
  editForm: FormGroup;
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
        if (data.id === undefined) {
          this.router.navigate(['recipe-list']);
          return;
        }
        this.recipe = data;
        this.editForm = this.formBuilder.group({
          id: [''],
          name: ['', Validators.required],
          description: [''],
          notes: [''],
          ingredients: [''],
          image: [''],
          recipeType: [''],
          tags: [''],
          preparationTime: ['', Validators.min(0)],
          cookTime: ['', Validators.min(0)],
          servings: ['', Validators.min(0)],
          preparations: [''],
          directions: ['', Validators.required],
          rating: ['', Validators.min(0)]
        });
        this.editForm.patchValue(this.recipe);
      }
    )
  }

  // Add the child forms to the main form
  formInitialized(name: string, form: FormGroup) {
    this.editForm.setControl(name, form);
  }

  onEdit() {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }    

    // Next two lines work (database is updated) but the view does not get updated???
    // this.recipe = this.editForm.value;
    // this.recipe.recipeType = this.editForm.get('recipeTypeForm.recipeType').value;

    // When assigning each field seperately the view gets updated correctly...
    // This is noted as a bug and needs investigation
    this.recipe.name = this.editForm.get('name').value;
    this.recipe.description = this.editForm.get('description').value;
    this.recipe.notes = this.editForm.get('notes').value;
    this.recipe.recipeType = this.editForm.get('recipeTypeForm.recipeType').value;
    this.recipe.preparationTime = this.editForm.get('preparationTime').value;
    this.recipe.cookTime = this.editForm.get('cookTime').value;
    this.recipe.servings = this.editForm.get('servings').value;
    this.recipe.preparations = this.editForm.get('preparations').value;
    this.recipe.directions = this.editForm.get('directions').value;
    this.recipe.rating = this.editForm.get('rating').value;


    this.recipeService.updateRecipe(this.recipe).subscribe(
      data => {
        this.router.navigate(['recipe-detail']);
      },
      error => {
        alert(JSON.stringify(error));
      }
    )
  }

  ngOnDestroy() {
    this._recipeSubscription.unsubscribe();
  }

  get name() {return this.editForm.get('name');}
  get description() {return this.editForm.get('description');}
  get preparationTime() {return this.editForm.get('preparationTime');}
  get cookTime() {return this.editForm.get('cookTime');}
  get servings() {return this.editForm.get('servings');}
  get rating() {return this.editForm.get('rating');}
}
