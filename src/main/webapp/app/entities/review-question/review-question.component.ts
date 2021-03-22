import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IReviewQuestion } from '@/shared/model/review-question.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import ReviewQuestionService from './review-question.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class ReviewQuestion extends mixins(AlertMixin) {
  @Inject('reviewQuestionService') private reviewQuestionService: () => ReviewQuestionService;
  private removeId: number = null;

  public reviewQuestions: IReviewQuestion[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllReviewQuestions();
  }

  public clear(): void {
    this.retrieveAllReviewQuestions();
  }

  public retrieveAllReviewQuestions(): void {
    this.isFetching = true;

    this.reviewQuestionService()
      .retrieve()
      .then(
        res => {
          this.reviewQuestions = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IReviewQuestion): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeReviewQuestion(): void {
    this.reviewQuestionService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('griviApp.reviewQuestion.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllReviewQuestions();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
