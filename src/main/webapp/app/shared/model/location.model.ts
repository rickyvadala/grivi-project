import { ICountry } from '@/shared/model/country.model';
import { ILocationType } from '@/shared/model/location-type.model';
import { IPerson } from '@/shared/model/person.model';

export interface ILocation {
  id?: number;
  streetAddress?: string;
  streetNumber?: number;
  postalCode?: string;
  city?: string;
  stateProvince?: string;
  country?: ICountry;
  type?: ILocationType;
  people?: IPerson[];
}

export class Location implements ILocation {
  constructor(
    public id?: number,
    public streetAddress?: string,
    public streetNumber?: number,
    public postalCode?: string,
    public city?: string,
    public stateProvince?: string,
    public country?: ICountry,
    public type?: ILocationType,
    public people?: IPerson[]
  ) {}
}
