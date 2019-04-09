import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RecipeDataService } from 'src/app/data/recipe/recipe-data.service';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/model/Recipe';
import { Tag } from 'src/app/model/Tag';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

function concatTags(tags: Tag[]): string {
  let tagNames: string[] = [];
  tags.forEach(tag => {
    tagNames.push(tag.name);
  })
  return tagNames.join(", ");
}

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  baseUrl = environment.serverUrl; // Needed for image URL in html
  private _recipeSubscription: Subscription
  recipe: Recipe;

  constructor(
    private recipeDataService: RecipeDataService,
    private router: Router) { }

  ngOnInit() {
    this._recipeSubscription = this.recipeDataService.recipe.subscribe(
      data => {
        if (data.id === undefined) {
          alert("Invalid action");
          this.router.navigate(['recipe-list']);
        }
        this.recipe = data;
        this.recipe.concatTags = concatTags(this.recipe.tags);
      }
    )
  }

  ngOnDestroy() {
    this._recipeSubscription.unsubscribe();
  }

}
