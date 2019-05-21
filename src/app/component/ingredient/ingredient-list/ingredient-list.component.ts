import { Component, Input } from '@angular/core';

/**
 * Component to display a non-editable list of ingredients in a table
 */
@Component({
  selector: 'ingredients',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientsComponent {

  @Input() ingredients;

}
