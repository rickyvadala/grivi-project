import { IReviewDet } from '@/shared/model/review-det.model';
import { IPost } from '@/shared/model/post.model';
import { IReaction } from '@/shared/model/reaction.model';
import { IReview } from '@/shared/model/review.model';
import { IChannel } from '@/shared/model/channel.model';

export interface INotification {
  id?: number;
  reviewDets?: IReviewDet[];
  post?: IPost;
  reaction?: IReaction;
  review?: IReview;
  channel?: IChannel;
}

export class Notification implements INotification {
  constructor(
    public id?: number,
    public reviewDets?: IReviewDet[],
    public post?: IPost,
    public reaction?: IReaction,
    public review?: IReview,
    public channel?: IChannel
  ) {}
}
