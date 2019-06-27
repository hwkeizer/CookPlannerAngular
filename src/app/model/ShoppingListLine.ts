export class ShoppingListLine {
    amount: number;
    measureUnit: string;
    measureUnitPlural: string;
    ingredient: string;
    ingredientPlural: string;
    stock: boolean;

    constructor(
        amount: number,
        measureUnit: string,
        measureUnitPlural: string,
        ingredient: string,
        ingredientPlural: string,
        stock: boolean) {
            this.amount = amount;
            this.measureUnit = measureUnit;
            this.measureUnitPlural = measureUnitPlural;
            this.ingredient = ingredient;
            this.ingredientPlural = ingredientPlural;
            this.stock = stock;
        }
}