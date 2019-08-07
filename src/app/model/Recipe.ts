import { Ingredient } from './Ingredient';
import { Tag } from './Tag';

export class Recipe {
    id: number;
    name: string;
    servingTips: string;
    notes: string;
    ingredients = <Ingredient[]>Array();
    image: string;
    recipeType: string;
    tags = <Tag[]>Array();
    preparationTime: string;
    cookTime: string;
    servings: number;
    preparations: string;
    directions: string;
    rating: string;
}