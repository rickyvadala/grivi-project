import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import ReviewQuestionService from '../review-question/review-question.service';
import { IReviewQuestion } from '@/shared/model/review-question.model';

import AlertService from '@/shared/alert/alert.service';
import { IQuestion, Question } from '@/shared/model/question.model';
import QuestionService from './question.service';

const validations: any = {
  question: {
    name: {},
    text: {},
  },
};

@Component({
  validations,
})
export default class QuestionUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('questionService') private questionService: () => QuestionService;
  public question: IQuestion = new Question();

  @Inject('reviewQuestionService') private reviewQuestionService: () => ReviewQuestionService;

  public reviewQuestions: IReviewQuestion[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.questionId) {
        vm.retrieveQuestion(to.params.questionId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.question.id) {
      this.questionService()
        .update(this.question)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.question.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.questionService()
        .create(this.question)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.question.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveQuestion(questionId): void {
    this.questionService()
      .find(questionId)
      .then(res => {
        this.question = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.reviewQuestionService()
      .retrieve()
      .then(res => {
        this.reviewQuestions = res.data;
      });
  }
}
