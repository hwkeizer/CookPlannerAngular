import { Ingredient } from './Ingredient';
import { Tag } from './Tag';

export class Recipe {
    id: number;
    name: string;
    description: string;
    notes: string;
    ingredients: Ingredient[];
    image: string;
    recipeType: string;
    tags: Tag[];
    preparationTime: string;
    cookTime: string;
    servings: number;
    preparations: string;
    directions: string;
    rating: string;
}