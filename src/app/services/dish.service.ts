import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dish } from '../common/dish';
import { map } from 'rxjs/operators';
import { DishCategory } from '../common/dish-category';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private baseUrl = "http://localhost:8080/api/dishes";
  private categoryUrl = "http://localhost:8080/api/dish-category";

  constructor(private httpClient: HttpClient) { }

  getDishList(theCategoryId: number): Observable<Dish[]> {
    // build url based on category id 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.httpClient.get<GetResponse>(searchUrl).pipe(map(response => response._embedded.dishes));
    // map JSON data to an array of dishes
  }

  getDishCategories(): Observable<DishCategory[]> {
    return this.httpClient.get<GetResponseDishCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.dishCategory)
    );
  }
}

interface GetResponse {
  _embedded: {
    dishes: Dish[];
  }
}

interface GetResponseDishCategory {
  _embedded: {
    dishCategory: DishCategory[];
  }
}