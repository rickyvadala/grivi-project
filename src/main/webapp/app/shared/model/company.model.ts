import { IPerson } from '@/shared/model/person.model';

export interface ICompany {
  id?: number;
  name?: string;
  description?: string;
  people?: IPerson[];
}

export class Company implements ICompany {
  constructor(public id?: number, public name?: string, public description?: string, public people?: IPerson[]) {}
}
