import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DishListComponent } from './components/dish-list/dish-list.component';
import { HttpClientModule } from '@angular/common/http';
import { DishService } from './services/dish.service';
import { HeroComponent } from './components/hero/hero.component'
import { Routes, RouterModule } from '@angular/router';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { MenuComponent } from './components/menu/menu.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReviewService } from './services/review.service';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { SubmitReviewComponent } from './components/submit-review/submit-review.component';

const routes: Routes = [
  {path: 'submit-review', component: SubmitReviewComponent},
  {path: 'reviews', component: ReviewListComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'category/:id/:name', component: DishListComponent},
  {path: 'category', component: MenuComponent},
  {path: '', component: HeroComponent}, 
  {path: '**', component: HeroComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    DishListComponent,
    HeroComponent,
    CartStatusComponent,
    MenuComponent,
    CartDetailsComponent,
    CheckoutComponent,
    ReviewListComponent,
    SubmitReviewComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [DishService, ReviewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
