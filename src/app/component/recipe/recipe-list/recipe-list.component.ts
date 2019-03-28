import { Component, OnInit} from '@angular/core';
import { Recipe } from 'src/app/model/Recipe';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/service/recipe/recipe.service';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];

  constructor(
    private router: Router,
    private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.getRecipeList().subscribe(
      data => {
        this.recipes = data;
      }
    )
  }

}
