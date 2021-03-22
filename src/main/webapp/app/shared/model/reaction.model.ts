import { INotification } from '@/shared/model/notification.model';
import { IPerson } from '@/shared/model/person.model';
import { IPost } from '@/shared/model/post.model';

export interface IReaction {
  id?: number;
  type?: string;
  notifications?: INotification[];
  person?: IPerson;
  post?: IPost;
}

export class Reaction implements IReaction {
  constructor(
    public id?: number,
    public type?: string,
    public notifications?: INotification[],
    public person?: IPerson,
    public post?: IPost
  ) {}
}
