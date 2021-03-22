import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IQuestion } from '@/shared/model/question.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import QuestionService from './question.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Question extends mixins(AlertMixin) {
  @Inject('questionService') private questionService: () => QuestionService;
  private removeId: number = null;

  public questions: IQuestion[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllQuestions();
  }

  public clear(): void {
    this.retrieveAllQuestions();
  }

  public retrieveAllQuestions(): void {
    this.isFetching = true;

    this.questionService()
      .retrieve()
      .then(
        res => {
          this.questions = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IQuestion): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeQuestion(): void {
    this.questionService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('griviApp.question.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllQuestions();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
