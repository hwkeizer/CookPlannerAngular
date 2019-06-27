import { Recipe } from './Recipe';

export class Planning {
    id: number;
    date: Date;
    name: String;
    recipe: Recipe;
    servings: number;
    onShoppingList: boolean;
}