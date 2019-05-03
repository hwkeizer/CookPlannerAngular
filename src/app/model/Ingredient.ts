import { MeasureUnit } from './MeasureUnit';
import { IngredientName } from './IngredientName';

export class Ingredient {
    id: number;
    name: IngredientName;
    amount: number;
    stock: boolean;
    measureUnit: MeasureUnit;
}