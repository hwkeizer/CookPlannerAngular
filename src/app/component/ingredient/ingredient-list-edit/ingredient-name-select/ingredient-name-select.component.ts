import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IngredientName } from 'src/app/model/IngredientName';
import { Subscription, Observable } from 'rxjs';
import { IngredientNameDataService } from 'src/app/data/ingredient-name/ingredient-name-data.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

/**
 * Component to select a single ingredientName from the list of available
 * measure units. The component shows the (single) name field.
 */
@Component({
  selector: 'ingredient-name-select',
  templateUrl: './ingredient-name-select.component.html',
  styleUrls: ['./ingredient-name-select.component.css']
})
export class IngredientNameSelectComponent implements OnInit, OnDestroy {

  @Input() ingredientName: IngredientName;
  @Output() valueChange: EventEmitter<IngredientName> = new EventEmitter<IngredientName>();

  ingredientNameList: IngredientName[];
  ingredientNameSubscription: Subscription;

  constructor(private ingredientNameDataService: IngredientNameDataService) {
    // Retrieve the list of available ingredient names from the data service
    this.ingredientNameSubscription = this.ingredientNameDataService.ingredientNames.subscribe(
      data => {
        this.ingredientNameList = data;
      }
    );
  }

  ngOnInit() {
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.ingredientNameList.filter(mu => mu.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formatter = (x: {name: string}) => x.name;

  selectedItem(value) {
    this.valueChange.emit(value.item);
  }

  ngOnDestroy() {
    this.ingredientNameSubscription.unsubscribe();
  }

}
