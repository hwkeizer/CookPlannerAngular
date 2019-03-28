import { Ingredient } from './Ingredient';

export class Recipe {
    id: number;
    name: string;
    description: string;
    notes: string;
    ingredients: Ingredient[];
    recipeType: string;
    preparationTime: string;
    cookTime: string;
    rating: string;
}