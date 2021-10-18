import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Dish } from 'src/app/common/dish';
import { CartService } from 'src/app/services/cart.service';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})

export class DishListComponent implements OnInit {

  dishes: Dish[];
  currentCategoryId: number;
  currentCategoryName: string;
  dishFormGroup: FormGroup;

  constructor(private dishService: DishService,
              private cartService: CartService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listDishes();
    });

    this.dishFormGroup = this.formBuilder.group({
      dishForm: this.formBuilder.group({
        selectedQuantity: new FormControl('', [Validators.required])
      })
    });

    this.dishFormGroup.reset();
    
  }

  listDishes() {
    // check if id parameter available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get 'id'
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
      this.currentCategoryName = this.route.snapshot.paramMap.get('name');
    } else {
      // no category id available default to 1
      this.currentCategoryId = 1;
      this.currentCategoryName = "Starters";
    }

    // get dishes for given category id
    this.dishService.getDishList(this.currentCategoryId).subscribe(data => {this.dishes = data;})
  }

  // get dish quantity
  get selectedQuantity() { return this.dishFormGroup.get('dishForm.selectedQuantity');}

  addToCart(theDish: Dish) {
    const theCartItem = new CartItem(theDish);
    let dishQuantity = this.selectedQuantity.value;
    theCartItem.quantity = dishQuantity;
    this.cartService.addToCart(theCartItem);
    this.dishFormGroup.reset();
  }
  
}
