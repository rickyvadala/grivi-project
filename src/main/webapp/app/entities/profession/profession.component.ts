import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IProfession } from '@/shared/model/profession.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import ProfessionService from './profession.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Profession extends mixins(AlertMixin) {
  @Inject('professionService') private professionService: () => ProfessionService;
  private removeId: number = null;

  public professions: IProfession[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllProfessions();
  }

  public clear(): void {
    this.retrieveAllProfessions();
  }

  public retrieveAllProfessions(): void {
    this.isFetching = true;

    this.professionService()
      .retrieve()
      .then(
        res => {
          this.professions = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IProfession): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeProfession(): void {
    this.professionService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('griviApp.profession.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllProfessions();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
