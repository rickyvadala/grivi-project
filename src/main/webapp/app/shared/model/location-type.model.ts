import { ILocation } from '@/shared/model/location.model';

export interface ILocationType {
  id?: number;
  name?: string;
  description?: string;
  locations?: ILocation[];
}

export class LocationType implements ILocationType {
  constructor(public id?: number, public name?: string, public description?: string, public locations?: ILocation[]) {}
}
