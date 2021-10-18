import { Component, OnInit } from '@angular/core';
import { DishCategory } from 'src/app/common/dish-category';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  dishCategories: DishCategory[];

  constructor(private dishService: DishService) { }

  ngOnInit(): void {
    this.listDishCategories();
  }

  listDishCategories() {
    this.dishService.getDishCategories().subscribe(
      data => {
        this.dishCategories = data;
      });
  }
}
