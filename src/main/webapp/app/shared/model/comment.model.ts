import { IPost } from '@/shared/model/post.model';

export interface IComment {
  id?: number;
  postFrom?: IPost;
  post?: IPost;
}

export class Comment implements IComment {
  constructor(public id?: number, public postFrom?: IPost, public post?: IPost) {}
}
