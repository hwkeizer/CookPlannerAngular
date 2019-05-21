import { Component, OnInit } from '@angular/core';
import { IngredientName } from 'src/app/model/IngredientName';
import { IngredientNameService } from 'src/app/service/ingredient-name/ingredient-name.service';

@Component({
  selector: 'ingredient-name-list',
  templateUrl: './ingredient-name-list.component.html',
  styleUrls: ['./ingredient-name-list.component.css']
})
export class IngredientNameListComponent implements OnInit {

  ingredientNames : IngredientName[];

  constructor(private ingredientNameService: IngredientNameService) { }

  ngOnInit() {
    this.ingredientNameService.getIngredientNameList().subscribe(
      data => {
        this.ingredientNames = data.result;
      }
    )
  }

}
