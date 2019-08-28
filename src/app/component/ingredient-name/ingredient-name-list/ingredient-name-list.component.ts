import { Component, OnInit } from '@angular/core';
import { IngredientName } from 'src/app/model/IngredientName';
import { IngredientNameService } from 'src/app/service/ingredient-name/ingredient-name.service';
import { IngredientNameDataService } from 'src/app/data/ingredient-name/ingredient-name-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ingredient-name-list',
  templateUrl: './ingredient-name-list.component.html',
  styleUrls: ['./ingredient-name-list.component.css']
})
export class IngredientNameListComponent implements OnInit {

  ingredientNames : IngredientName[];

  constructor(
    private ingredientNameService: IngredientNameService,
    private ingredientNameDataService: IngredientNameDataService,
    private router: Router) { }

  ngOnInit() {
    this.ingredientNameService.getIngredientNameList().subscribe(
      data => {
        this.ingredientNames = data.result;
      }
    )
  }

  deleteIngredientName(ingredientName) {
    this.ingredientNameService.deleteIngredientName(ingredientName).subscribe(
      data => {
        this.ingredientNameDataService.deleteIngredientName(ingredientName);
        this.ingredientNames.splice(this.ingredientNames.indexOf(ingredientName), 1);
      },
      error => {
        console.log('Foutmelding', error.error.status, error.error.message);
      }
    )
  }

  editIngredientName(ingredientName) {
    window.sessionStorage.removeItem("editIngredientName");
    window.sessionStorage.setItem("editIngredientName", JSON.stringify(ingredientName));
    this.router.navigate(['ingredient-name-edit']);
  }

}
