import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeId: number;

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipeId = this.route.snapshot.params.recipeId;
    alert('RecipeId = ' + this.recipeId);
  }

}
