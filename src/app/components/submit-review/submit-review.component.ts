import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerReview } from 'src/app/common/customer-review';
import { ReviewService } from 'src/app/services/review.service';
import { CheckoutValidators } from 'src/app/validators/checkout-validators';

@Component({
  selector: 'app-submit-review',
  templateUrl: './submit-review.component.html',
  styleUrls: ['./submit-review.component.css']
})

export class SubmitReviewComponent implements OnInit {

  reviewFormGroup: FormGroup;
  
  constructor(private reviewService: ReviewService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {

    this.reviewFormGroup = this.formBuilder.group({
      review: this.formBuilder.group({
        name: new FormControl('', [Validators.required, Validators.minLength(2), CheckoutValidators.notOnlyWhitespace, Validators.pattern('^[a-zA-Z .\'-]{2,}$')]),
        orderTrackingNumber: new FormControl('', [Validators.required, Validators.minLength(36), CheckoutValidators.notOnlyWhitespace,  Validators.pattern('^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$')]),
        comment: new FormControl('', [Validators.required, Validators.minLength(2), CheckoutValidators.notOnlyWhitespace]),
        rating: new FormControl('', [Validators.required])
      })
    });

  }

  // getters
  get name() { return this.reviewFormGroup.get('review.name'); }
  get orderTrackingNumber() { return this.reviewFormGroup.get('review.orderTrackingNumber'); }
  get rating() { return this.reviewFormGroup.get('review.rating'); }
  get comment() { return this.reviewFormGroup.get('review.comment'); }
  

  onSubmit() {
    if(this.reviewFormGroup.invalid) {
      this.reviewFormGroup.markAllAsTouched();
      return;
    }

    let review = new CustomerReview();
    
    review = this.reviewFormGroup.controls['review'].value;


    this.reviewService.createReview(review).subscribe({
      next: response => {
        alert(`Review by ${response.name} created.`)
        this.resetReviewForm();
      },
      error: err => {
        alert(`Error. Could not create review.`);
      }
    });
  }

  resetReviewForm() {
    this.reviewFormGroup.reset();
    this.router.navigateByUrl("/reviews");
  }
  
}

