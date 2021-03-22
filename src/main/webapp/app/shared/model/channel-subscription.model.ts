import { IPerson } from '@/shared/model/person.model';
import { IChannel } from '@/shared/model/channel.model';

export interface IChannelSubscription {
  id?: number;
  person?: IPerson;
  channel?: IChannel;
}

export class ChannelSubscription implements IChannelSubscription {
  constructor(public id?: number, public person?: IPerson, public channel?: IChannel) {}
}
