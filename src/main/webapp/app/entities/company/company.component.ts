import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ICompany } from '@/shared/model/company.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import CompanyService from './company.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Company extends mixins(AlertMixin) {
  @Inject('companyService') private companyService: () => CompanyService;
  private removeId: number = null;

  public companies: ICompany[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllCompanys();
  }

  public clear(): void {
    this.retrieveAllCompanys();
  }

  public retrieveAllCompanys(): void {
    this.isFetching = true;

    this.companyService()
      .retrieve()
      .then(
        res => {
          this.companies = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: ICompany): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeCompany(): void {
    this.companyService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('griviApp.company.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllCompanys();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
