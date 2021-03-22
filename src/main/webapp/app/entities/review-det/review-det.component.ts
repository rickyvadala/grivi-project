import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IReviewDet } from '@/shared/model/review-det.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import ReviewDetService from './review-det.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class ReviewDet extends mixins(AlertMixin) {
  @Inject('reviewDetService') private reviewDetService: () => ReviewDetService;
  private removeId: number = null;

  public reviewDets: IReviewDet[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllReviewDets();
  }

  public clear(): void {
    this.retrieveAllReviewDets();
  }

  public retrieveAllReviewDets(): void {
    this.isFetching = true;

    this.reviewDetService()
      .retrieve()
      .then(
        res => {
          this.reviewDets = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IReviewDet): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeReviewDet(): void {
    this.reviewDetService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('griviApp.reviewDet.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllReviewDets();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
