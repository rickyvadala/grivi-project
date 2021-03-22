import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ILocation } from '@/shared/model/location.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import LocationService from './location.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Location extends mixins(AlertMixin) {
  @Inject('locationService') private locationService: () => LocationService;
  private removeId: number = null;

  public locations: ILocation[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllLocations();
  }

  public clear(): void {
    this.retrieveAllLocations();
  }

  public retrieveAllLocations(): void {
    this.isFetching = true;

    this.locationService()
      .retrieve()
      .then(
        res => {
          this.locations = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: ILocation): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeLocation(): void {
    this.locationService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('griviApp.location.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllLocations();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
