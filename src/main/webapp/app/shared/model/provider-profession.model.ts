import { IReviewQuestion } from '@/shared/model/review-question.model';
import { IReview } from '@/shared/model/review.model';
import { IPerson } from '@/shared/model/person.model';
import { IProfession } from '@/shared/model/profession.model';

export interface IProviderProfession {
  id?: number;
  reviewQuestions?: IReviewQuestion[];
  reviews?: IReview[];
  person?: IPerson;
  profession?: IProfession;
}

export class ProviderProfession implements IProviderProfession {
  constructor(
    public id?: number,
    public reviewQuestions?: IReviewQuestion[],
    public reviews?: IReview[],
    public person?: IPerson,
    public profession?: IProfession
  ) {}
}
