import { IReview } from '@/shared/model/review.model';
import { INotification } from '@/shared/model/notification.model';

export interface IReviewDet {
  id?: number;
  rate?: number;
  review?: IReview;
  question?: INotification;
}

export class ReviewDet implements IReviewDet {
  constructor(public id?: number, public rate?: number, public review?: IReview, public question?: INotification) {}
}
