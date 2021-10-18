import { Dish } from "./dish";

export class CartItem {

    id: string;
    name: string;
    unitPrice: number;
    quantity: number;

    constructor(dish: Dish) {
        this.id = dish.id;
        this.name = dish.name;
        this.unitPrice = dish.unitPrice;
        this.quantity = 1;
    }
    
}
