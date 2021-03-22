import { IChannelSubscription } from '@/shared/model/channel-subscription.model';
import { INotification } from '@/shared/model/notification.model';
import { IPerson } from '@/shared/model/person.model';
import { ICategory } from '@/shared/model/category.model';
import { IProfession } from '@/shared/model/profession.model';

export interface IChannel {
  id?: number;
  name?: string;
  channelSubscriptions?: IChannelSubscription[];
  notifications?: INotification[];
  people?: IPerson[];
  category?: ICategory;
  profession?: IProfession;
}

export class Channel implements IChannel {
  constructor(
    public id?: number,
    public name?: string,
    public channelSubscriptions?: IChannelSubscription[],
    public notifications?: INotification[],
    public people?: IPerson[],
    public category?: ICategory,
    public profession?: IProfession
  ) {}
}
