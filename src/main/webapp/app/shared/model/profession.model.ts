import { IProviderProfession } from '@/shared/model/provider-profession.model';
import { IChannel } from '@/shared/model/channel.model';
import { IReviewQuestion } from '@/shared/model/review-question.model';
import { ICategory } from '@/shared/model/category.model';

export interface IProfession {
  id?: number;
  name?: string;
  description?: string;
  providerProfessions?: IProviderProfession[];
  channels?: IChannel[];
  reviewQuestions?: IReviewQuestion[];
  category?: ICategory;
}

export class Profession implements IProfession {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public providerProfessions?: IProviderProfession[],
    public channels?: IChannel[],
    public reviewQuestions?: IReviewQuestion[],
    public category?: ICategory
  ) {}
}
