import { INotification } from '@/shared/model/notification.model';
import { IReviewDet } from '@/shared/model/review-det.model';
import { IPerson } from '@/shared/model/person.model';
import { IProviderProfession } from '@/shared/model/provider-profession.model';

export interface IReview {
  id?: number;
  avgRate?: number;
  date?: Date;
  notifications?: INotification[];
  reviewDets?: IReviewDet[];
  client?: IPerson;
  provider?: IProviderProfession;
}

export class Review implements IReview {
  constructor(
    public id?: number,
    public avgRate?: number,
    public date?: Date,
    public notifications?: INotification[],
    public reviewDets?: IReviewDet[],
    public client?: IPerson,
    public provider?: IProviderProfession
  ) {}
}
