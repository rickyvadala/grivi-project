import { IReviewQuestion } from '@/shared/model/review-question.model';

export interface IQuestion {
  id?: number;
  name?: string;
  text?: string;
  reviewQuestions?: IReviewQuestion[];
}

export class Question implements IQuestion {
  constructor(public id?: number, public name?: string, public text?: string, public reviewQuestions?: IReviewQuestion[]) {}
}
