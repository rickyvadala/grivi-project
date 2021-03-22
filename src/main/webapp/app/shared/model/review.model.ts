import { INotification } from '@/shared/model/notification.model';
import { IReviewDet } from '@/shared/model/review-det.model';
import { IPerson } from '@/shared/model/person.model';

export interface IReview {
  id?: number;
  avgRate?: number;
  date?: Date;
  notifications?: INotification[];
  reviewDets?: IReviewDet[];
  client?: IPerson;
  provider?: IPerson;
}

export class Review implements IReview {
  constructor(
    public id?: number,
    public avgRate?: number,
    public date?: Date,
    public notifications?: INotification[],
    public reviewDets?: IReviewDet[],
    public client?: IPerson,
    public provider?: IPerson
  ) {}
}
