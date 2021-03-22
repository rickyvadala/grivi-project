import { IQuestion } from '@/shared/model/question.model';
import { ICategory } from '@/shared/model/category.model';
import { IProfession } from '@/shared/model/profession.model';
import { IProviderProfession } from '@/shared/model/provider-profession.model';

export interface IReviewQuestion {
  id?: number;
  enabled?: boolean;
  question?: IQuestion;
  category?: ICategory;
  profession?: IProfession;
  providerProfession?: IProviderProfession;
}

export class ReviewQuestion implements IReviewQuestion {
  constructor(
    public id?: number,
    public enabled?: boolean,
    public question?: IQuestion,
    public category?: ICategory,
    public profession?: IProfession,
    public providerProfession?: IProviderProfession
  ) {
    this.enabled = this.enabled || false;
  }
}
