import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/common/review';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  reviews: any = [];
  
  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.listReviews();
  }

  // listReviews() {
  //   this.reviewService.getReviewList().subscribe(
  //     data => {
  //       this.reviews = data;
  //     }
  //   );
  // }

  listReviews() {
    this.reviewService.getReviewList().subscribe((data: {}) => {
      this.reviews = data;
    })
  }

}


