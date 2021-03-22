import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ICountry } from '@/shared/model/country.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import CountryService from './country.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Country extends mixins(AlertMixin) {
  @Inject('countryService') private countryService: () => CountryService;
  private removeId: number = null;

  public countries: ICountry[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllCountrys();
  }

  public clear(): void {
    this.retrieveAllCountrys();
  }

  public retrieveAllCountrys(): void {
    this.isFetching = true;

    this.countryService()
      .retrieve()
      .then(
        res => {
          this.countries = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: ICountry): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeCountry(): void {
    this.countryService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('griviApp.country.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllCountrys();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
