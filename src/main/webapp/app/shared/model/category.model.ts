import { IProfession } from '@/shared/model/profession.model';
import { IChannel } from '@/shared/model/channel.model';
import { IReviewQuestion } from '@/shared/model/review-question.model';

export interface ICategory {
  id?: number;
  name?: string;
  description?: string;
  professions?: IProfession[];
  channels?: IChannel[];
  reviewQuestions?: IReviewQuestion[];
}

export class Category implements ICategory {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public professions?: IProfession[],
    public channels?: IChannel[],
    public reviewQuestions?: IReviewQuestion[]
  ) {}
}
