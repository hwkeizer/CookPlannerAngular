import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { RecipeService } from 'src/app/service/recipe/recipe.service';
import { Tag } from 'src/app/model/Tag';
import { Recipe } from 'src/app/model/Recipe';

@Component({
  selector: 'recipe-tags-form',
  templateUrl: './recipe-tags.component.html',
  styleUrls: ['./recipe-tags.component.css']
})
export class RecipeTagsComponent implements OnInit {

  @Input() submitted;
  @Input() recipe: Recipe;
  @Output() formReady = new EventEmitter<FormGroup>();
  recipeTagsForm: FormGroup;
  allTags: Tag[];

  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipeService) {
      this.recipeTagsForm = this.formBuilder.group({
        tags: new FormArray([])
      });
    }

  ngOnInit() {
    this.recipeService.getAllTags().subscribe(
      allTags => {
        this.allTags = allTags.result;        
        this.addCheckBoxes();
      }
    )    
  }

  private addCheckBoxes() {  
    this.allTags.map((o, i) => {   
      const control = new FormControl(this.selectCheckBox(o, this.recipe.tags));
      (this.recipeTagsForm.controls.tags as FormArray).push(control);
    });
  }

  private selectCheckBox(tag: Tag, tagList: Tag[]) {
    return (tagList.findIndex(t => tag.id === t.id) > -1)
  }

  onCheckBoxChange(index) {
    let i = this.recipe.tags.findIndex(t => this.allTags[index].id === t.id);
    (i > -1)? this.recipe.tags.splice(i, 1) : this.recipe.tags.push(this.allTags[index]);
  }
}
