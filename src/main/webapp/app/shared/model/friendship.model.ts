import { IPerson } from '@/shared/model/person.model';

export interface IFriendship {
  id?: number;
  personOrigin?: IPerson;
  personAddressee?: IPerson;
}

export class Friendship implements IFriendship {
  constructor(public id?: number, public personOrigin?: IPerson, public personAddressee?: IPerson) {}
}
