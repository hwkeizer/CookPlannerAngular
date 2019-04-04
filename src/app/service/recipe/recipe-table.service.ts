/*
This code is based on https://stackblitz.com/edit/ngbootstrap-table?file=app/app.module.ts
*/
import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { SortDirection } from 'src/app/directive/sortable.directive';
import { Recipe } from 'src/app/model/Recipe';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { tap, debounceTime, switchMap, delay } from 'rxjs/operators';


interface SearchResult {
  recipes: Recipe[];
  total: number;
}

interface TableState {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(recipes: Recipe[], column: string, direction: string): Recipe[] {
  if (direction === '') {
    return recipes;
  } else {
    return [...recipes].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    })
  }
}

function matches(recipe: Recipe, term: string, pipe: PipeTransform) {
  return recipe.name.toLowerCase().includes(term.toLowerCase())
    || recipe.recipeType.toLowerCase().includes(term.toLowerCase()) 
    || pipe.transform(recipe.preparationTime).includes(term) 
    || pipe.transform(recipe.cookTime).includes(term)
    || pipe.transform(recipe.rating).includes(term);
}

@Injectable({
  providedIn: 'root'
})
export class RecipeTableService {
  private _RECIPES: Recipe[] = [];

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _recipes$ = new BehaviorSubject<Recipe[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _tableState: TableState = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  }

  constructor(private pipe: DecimalPipe) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._recipes$.next(result.recipes);
      this._total$.next(result.total);
    });
    this._search$.next();
   }

  get recipes$() { return this._recipes$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._tableState.page }
  get pageSize() { return this._tableState.pageSize }
  get searchTerm() { return this._tableState.searchTerm }

  // Incoming data from component (right approach? needs to be checked...)
  set recipeList(recipeList: Recipe[]) { this._RECIPES = recipeList }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: string) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }
  

  private _set(patch: Partial<TableState>) {
    Object.assign(this._tableState, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._tableState;

    // 1. sort
    let recipes = sort(this._RECIPES, sortColumn, sortDirection);

    // 2. filter
    recipes = recipes.filter(recipe => matches(recipe, searchTerm, this.pipe));
    let total = recipes.length;

    // 3. paginate
    recipes = recipes.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({recipes, total});
  }
}
