import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IngredientName } from 'src/app/model/IngredientName';
import { IngredientNameService } from 'src/app/service/ingredient-name/ingredient-name.service';
import { element } from '@angular/core/src/render3';

/**
 * IngredientNameDataService provides the list of all available ingredient names.
 * This list is initialized from the database and can be updated through the 
 * 'updateIngredientName(IngredientName[])' methode or can be asked to synch from the database
 */
@Injectable({
  providedIn: 'root'
})
export class IngredientNameDataService {

  private _ingredientNames: BehaviorSubject<IngredientName[]>
  public ingredientNames: Observable<IngredientName[]>

  constructor(private ingredientNameService: IngredientNameService) {
    this._ingredientNames = new BehaviorSubject<IngredientName[]>([]);
    this.ingredientNames = this._ingredientNames.asObservable();
    this.syncIngredientNames();
  }

  updateIngredientNames(ingredientNames: IngredientName[]) {
    this._ingredientNames.next(ingredientNames);
  }

  updateIngredientName(ingredientName: IngredientName) {
    const index = this._ingredientNames.value.findIndex(el => el.id === ingredientName.id);
    if (index) {
      this._ingredientNames[index] = ingredientName;
    }
    this._ingredientNames.next(this._ingredientNames.value);
  }

  

  addIngredientName(ingredientName: IngredientName) {
    this._ingredientNames.value.push(ingredientName);
    this._ingredientNames.next(this._ingredientNames.value);
  }

  deleteIngredientName(ingredientName: IngredientName) {
    this._ingredientNames.value.splice(this._ingredientNames.value.indexOf(ingredientName), 1);
    this._ingredientNames.next(this._ingredientNames.value);
  }

  syncIngredientNames() {
    this.ingredientNameService.getIngredientNameList().subscribe(
      data => {
        this.updateIngredientNames(data.result);
      }
    )
  }
}
