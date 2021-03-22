import { IFriendship } from '@/shared/model/friendship.model';
import { IChannelSubscription } from '@/shared/model/channel-subscription.model';
import { IProviderProfession } from '@/shared/model/provider-profession.model';
import { IReaction } from '@/shared/model/reaction.model';
import { IReview } from '@/shared/model/review.model';
import { ICompany } from '@/shared/model/company.model';
import { ILocation } from '@/shared/model/location.model';
import { IChannel } from '@/shared/model/channel.model';

export interface IPerson {
  id?: number;
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
  phoneNumber?: number;
  originFriendships?: IFriendship[];
  addresseeFriendships?: IFriendship[];
  channelSubscriptions?: IChannelSubscription[];
  providerProfessions?: IProviderProfession[];
  reactions?: IReaction[];
  asClientReviews?: IReview[];
  asProviderReviews?: IReview[];
  companies?: ICompany[];
  locations?: ILocation[];
  channels?: IChannel[];
}

export class Person implements IPerson {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public birthDate?: Date,
    public phoneNumber?: number,
    public originFriendships?: IFriendship[],
    public addresseeFriendships?: IFriendship[],
    public channelSubscriptions?: IChannelSubscription[],
    public providerProfessions?: IProviderProfession[],
    public reactions?: IReaction[],
    public asClientReviews?: IReview[],
    public asProviderReviews?: IReview[],
    public companies?: ICompany[],
    public locations?: ILocation[],
    public channels?: IChannel[]
  ) {}
}
