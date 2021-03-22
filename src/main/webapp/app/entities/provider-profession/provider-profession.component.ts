import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IProviderProfession } from '@/shared/model/provider-profession.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import ProviderProfessionService from './provider-profession.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class ProviderProfession extends mixins(AlertMixin) {
  @Inject('providerProfessionService') private providerProfessionService: () => ProviderProfessionService;
  private removeId: number = null;

  public providerProfessions: IProviderProfession[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllProviderProfessions();
  }

  public clear(): void {
    this.retrieveAllProviderProfessions();
  }

  public retrieveAllProviderProfessions(): void {
    this.isFetching = true;

    this.providerProfessionService()
      .retrieve()
      .then(
        res => {
          this.providerProfessions = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IProviderProfession): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeProviderProfession(): void {
    this.providerProfessionService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('griviApp.providerProfession.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllProviderProfessions();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
