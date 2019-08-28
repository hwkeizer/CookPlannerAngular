import { Component, OnInit, Input } from '@angular/core';
import { Planning } from 'src/app/model/Planning';
import { Ingredient } from 'src/app/model/Ingredient';
import { ShoppingListLine } from 'src/app/model/ShoppingListLine';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  private _planBoard: Planning[];
  ingredientList: Ingredient[] = [];
  shoppingList: ShoppingListLine[] = [];
  shoppingListStock: ShoppingListLine[] = [];

  @Input() set planBoard(value: Planning[]) {
    console.log("VALUE: ", value)
    this._planBoard = value;
    this.ingredientList = [];
    this.shoppingList = [];
    this.shoppingListStock = [];
    this._planBoard.forEach(p => {
      if (p.recipe && p.onShoppingList) {
        this.ingredientList.push(...p.recipe.ingredients);
      }
    });
    this.ingredientList.forEach(i => {
      this.addToShoppingLists(new ShoppingListLine(
        i.amount,
        i.measureUnit.name,
        i.measureUnit.pluralName,
        i.name.name,
        i.name.pluralName,
        i.name.stock
      ))}
    )      
  }

  constructor() { }

  ngOnInit() {
  }

  // Add ingredient to the shoppinglist or stocklist. If a simular ingredient already exists only the amount
  // will be added to the existing line
  addToShoppingLists(s: ShoppingListLine) {
    if (s.stock) {
      let line = this.getSimularLine(s, this.shoppingListStock);
      if (line === undefined) {
        this.shoppingListStock.push(s);
      } else {
        line.amount = line.amount + s.amount;
      }
    } else {
      let line = this.getSimularLine(s, this.shoppingList);
      if (line === undefined) {
        this.shoppingList.push(s);
      } else {
        line.amount = line.amount + s.amount;
      }
    }
  }
 
  getSimularLine(s: ShoppingListLine, list: ShoppingListLine[]): ShoppingListLine {
    return list.filter(
      i => i.ingredient === s.ingredient && i.measureUnit === s.measureUnit)[0];
  }
}
