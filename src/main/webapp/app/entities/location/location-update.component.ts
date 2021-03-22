import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import CountryService from '../country/country.service';
import { ICountry } from '@/shared/model/country.model';

import LocationTypeService from '../location-type/location-type.service';
import { ILocationType } from '@/shared/model/location-type.model';

import PersonService from '../person/person.service';
import { IPerson } from '@/shared/model/person.model';

import AlertService from '@/shared/alert/alert.service';
import { ILocation, Location } from '@/shared/model/location.model';
import LocationService from './location.service';

const validations: any = {
  location: {
    streetAddress: {},
    streetNumber: {},
    postalCode: {},
    city: {},
    stateProvince: {},
  },
};

@Component({
  validations,
})
export default class LocationUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('locationService') private locationService: () => LocationService;
  public location: ILocation = new Location();

  @Inject('countryService') private countryService: () => CountryService;

  public countries: ICountry[] = [];

  @Inject('locationTypeService') private locationTypeService: () => LocationTypeService;

  public locationTypes: ILocationType[] = [];

  @Inject('personService') private personService: () => PersonService;

  public people: IPerson[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.locationId) {
        vm.retrieveLocation(to.params.locationId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.location.id) {
      this.locationService()
        .update(this.location)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.location.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.locationService()
        .create(this.location)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.location.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveLocation(locationId): void {
    this.locationService()
      .find(locationId)
      .then(res => {
        this.location = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.countryService()
      .retrieve()
      .then(res => {
        this.countries = res.data;
      });
    this.locationTypeService()
      .retrieve()
      .then(res => {
        this.locationTypes = res.data;
      });
    this.personService()
      .retrieve()
      .then(res => {
        this.people = res.data;
      });
  }
}
