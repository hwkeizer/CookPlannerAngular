import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeDataService } from 'src/app/data/recipe/recipe-data.service';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/model/Recipe';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  private _recipeSubscription: Subscription
  recipe: Recipe;

  constructor(
    private recipeDataService: RecipeDataService) { }

  ngOnInit() {
    this._recipeSubscription = this.recipeDataService.recipe.subscribe(
      data => {
        this.recipe = data;
      }
    )
  }

  ngOnDestroy() {
    this._recipeSubscription.unsubscribe();
  }

}
