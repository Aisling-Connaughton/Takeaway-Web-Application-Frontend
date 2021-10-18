import { CartItem } from "./cart-item";

export class OrderItem {

    unitPrice: number;
    quantity: number;
    dishId: string;

    constructor(cartItem: CartItem) {
        this.quantity = cartItem.quantity;
        this.unitPrice = cartItem.unitPrice;
        this.dishId = cartItem.id;
    }
}
