import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../common/review';
import { catchError, map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CustomerReview } from '../common/customer-review';

@Injectable({
  providedIn: 'root'
})

export class ReviewService {

  private baseUrl = "http://localhost:8080/api/reviews";

  constructor(private httpClient : HttpClient) { }

  // getReviewList(): Observable<Review[]> {
  //   return this.httpClient.get<GetReviewResponse>(this.baseUrl).pipe(map(response => response._embedded.reviews));
  // }

  getReviewList(): Observable<Review> {
    return this.httpClient.get<Review>(this.baseUrl).pipe(
      retry(1),
      catchError(this.httpError)
      )
  }

  httpError(httpError: any): import("rxjs").OperatorFunction<Review, any> {
    throw new Error('Error.');
  }

  createReview(customerReview: CustomerReview): Observable<any> {
    return this.httpClient.post<CustomerReview>(this.baseUrl, customerReview);
  }
}

// interface GetReviewResponse {
//   _embedded: {
//     reviews: Review[];
//   }
// }
