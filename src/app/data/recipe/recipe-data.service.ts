import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Recipe } from 'src/app/model/Recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeDataService {

  private _recipe: BehaviorSubject<Recipe>;
  public recipe: Observable<Recipe>;

  constructor() { 
    this._recipe = new BehaviorSubject<Recipe>(new Recipe());
    this.recipe = this._recipe.asObservable();
  }

  changeRecipe(recipe) {
    this._recipe.next(recipe);
  }
}
