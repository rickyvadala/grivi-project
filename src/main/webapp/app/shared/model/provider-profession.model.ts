import { IReviewQuestion } from '@/shared/model/review-question.model';
import { IPerson } from '@/shared/model/person.model';
import { IProfession } from '@/shared/model/profession.model';

export interface IProviderProfession {
  id?: number;
  reviewQuestions?: IReviewQuestion[];
  person?: IPerson;
  profession?: IProfession;
}

export class ProviderProfession implements IProviderProfession {
  constructor(public id?: number, public reviewQuestions?: IReviewQuestion[], public person?: IPerson, public profession?: IProfession) {}
}
