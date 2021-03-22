import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ILocationType } from '@/shared/model/location-type.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import LocationTypeService from './location-type.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class LocationType extends mixins(AlertMixin) {
  @Inject('locationTypeService') private locationTypeService: () => LocationTypeService;
  private removeId: number = null;

  public locationTypes: ILocationType[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllLocationTypes();
  }

  public clear(): void {
    this.retrieveAllLocationTypes();
  }

  public retrieveAllLocationTypes(): void {
    this.isFetching = true;

    this.locationTypeService()
      .retrieve()
      .then(
        res => {
          this.locationTypes = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: ILocationType): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeLocationType(): void {
    this.locationTypeService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('griviApp.locationType.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllLocationTypes();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
