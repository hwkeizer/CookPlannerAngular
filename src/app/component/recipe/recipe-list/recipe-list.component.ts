import { Component, OnInit, ViewChildren, QueryList} from '@angular/core';
import { Recipe } from 'src/app/model/Recipe';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/service/recipe/recipe.service';
import { NgbdSortableHeader, SortEvent } from 'src/app/directive/sortable.directive';
import { RecipeTableService } from 'src/app/service/recipe/recipe-table.service';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { RecipeDataService } from 'src/app/data/recipe/recipe-data.service';
import { Tag } from 'src/app/model/Tag';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  providers: [RecipeTableService, DecimalPipe]
})
export class RecipeListComponent implements OnInit {

  recipes$: Observable<Recipe[]>;
  total$: Observable<number>;

  recipes: Recipe[];
  baseUrl = environment.serverUrl; // Needed for image URL in html

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private recipeTableService: RecipeTableService,
    private recipeDataService: RecipeDataService) {
      this.recipes$ = this.recipeTableService.recipes$;
      this.total$ = this.recipeTableService.total$;
     }

  ngOnInit() {
    this.recipeService.getRecipeList().subscribe(
      data => {
        this.recipes = data.result;
        // Push recipelist to the recipeTableService. Not sure if this is the right thing to do but it works...
        this.recipeTableService.recipeList = this.recipes;
      }
    )
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // Set the sort column and direction
    this.recipeTableService.sortColumn = column;
    this.recipeTableService.sortDirection = direction;
  }

  onSelect(recipe) {
    this.recipeDataService.changeRecipe(recipe);
    this.router.navigate(['recipe-detail']);
  }

}
