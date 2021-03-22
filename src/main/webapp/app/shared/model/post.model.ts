import { INotification } from '@/shared/model/notification.model';
import { IReaction } from '@/shared/model/reaction.model';
import { IComment } from '@/shared/model/comment.model';

export interface IPost {
  id?: number;
  text?: string;
  photoUrl?: string;
  notifications?: INotification[];
  reactions?: IReaction[];
  commentsFroms?: IComment[];
  comments?: IComment[];
}

export class Post implements IPost {
  constructor(
    public id?: number,
    public text?: string,
    public photoUrl?: string,
    public notifications?: INotification[],
    public reactions?: IReaction[],
    public commentsFroms?: IComment[],
    public comments?: IComment[]
  ) {}
}
