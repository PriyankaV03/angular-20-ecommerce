import { Component, input } from '@angular/core';
import { UserReview } from '../../../models/user-review';
import { StarRating } from '../../../components/star-rating/star-rating';
import { DatePipe } from '@angular/common';
import { ViewPanel } from '../../../directives/view-panel';

@Component({
  selector: 'psv-view-review-item',
  imports: [ViewPanel, StarRating, DatePipe],
  templateUrl: './view-review-item.html',
  styleUrl: './view-review-item.scss',
})
export class ViewReviewItem {
  review = input.required<UserReview>();

}
