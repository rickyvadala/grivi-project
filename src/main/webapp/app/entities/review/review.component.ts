import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IReview } from '@/shared/model/review.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import ReviewService from './review.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Review extends mixins(AlertMixin) {
  @Inject('reviewService') private reviewService: () => ReviewService;
  private removeId: number = null;

  public reviews: IReview[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllReviews();
  }

  public clear(): void {
    this.retrieveAllReviews();
  }

  public retrieveAllReviews(): void {
    this.isFetching = true;

    this.reviewService()
      .retrieve()
      .then(
        res => {
          this.reviews = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IReview): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeReview(): void {
    this.reviewService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('griviApp.review.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllReviews();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
