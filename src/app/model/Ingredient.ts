import { MeasureUnit } from './MeasureUnit';

export class Ingredient {
    id: number;
    name: string;
    amount: number;
    stock: boolean;
    measureUnit: MeasureUnit;
}