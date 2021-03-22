import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import LocationService from '../location/location.service';
import { ILocation } from '@/shared/model/location.model';

import AlertService from '@/shared/alert/alert.service';
import { ILocationType, LocationType } from '@/shared/model/location-type.model';
import LocationTypeService from './location-type.service';

const validations: any = {
  locationType: {
    name: {},
    description: {},
  },
};

@Component({
  validations,
})
export default class LocationTypeUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('locationTypeService') private locationTypeService: () => LocationTypeService;
  public locationType: ILocationType = new LocationType();

  @Inject('locationService') private locationService: () => LocationService;

  public locations: ILocation[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.locationTypeId) {
        vm.retrieveLocationType(to.params.locationTypeId);
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
    if (this.locationType.id) {
      this.locationTypeService()
        .update(this.locationType)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.locationType.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.locationTypeService()
        .create(this.locationType)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.locationType.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveLocationType(locationTypeId): void {
    this.locationTypeService()
      .find(locationTypeId)
      .then(res => {
        this.locationType = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.locationService()
      .retrieve()
      .then(res => {
        this.locations = res.data;
      });
  }
}
