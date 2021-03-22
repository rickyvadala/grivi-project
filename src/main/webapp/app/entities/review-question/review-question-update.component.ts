import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import QuestionService from '../question/question.service';
import { IQuestion } from '@/shared/model/question.model';

import CategoryService from '../category/category.service';
import { ICategory } from '@/shared/model/category.model';

import ProfessionService from '../profession/profession.service';
import { IProfession } from '@/shared/model/profession.model';

import ProviderProfessionService from '../provider-profession/provider-profession.service';
import { IProviderProfession } from '@/shared/model/provider-profession.model';

import AlertService from '@/shared/alert/alert.service';
import { IReviewQuestion, ReviewQuestion } from '@/shared/model/review-question.model';
import ReviewQuestionService from './review-question.service';

const validations: any = {
  reviewQuestion: {
    enabled: {},
  },
};

@Component({
  validations,
})
export default class ReviewQuestionUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('reviewQuestionService') private reviewQuestionService: () => ReviewQuestionService;
  public reviewQuestion: IReviewQuestion = new ReviewQuestion();

  @Inject('questionService') private questionService: () => QuestionService;

  public questions: IQuestion[] = [];

  @Inject('categoryService') private categoryService: () => CategoryService;

  public categories: ICategory[] = [];

  @Inject('professionService') private professionService: () => ProfessionService;

  public professions: IProfession[] = [];

  @Inject('providerProfessionService') private providerProfessionService: () => ProviderProfessionService;

  public providerProfessions: IProviderProfession[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.reviewQuestionId) {
        vm.retrieveReviewQuestion(to.params.reviewQuestionId);
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
    if (this.reviewQuestion.id) {
      this.reviewQuestionService()
        .update(this.reviewQuestion)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.reviewQuestion.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.reviewQuestionService()
        .create(this.reviewQuestion)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.reviewQuestion.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveReviewQuestion(reviewQuestionId): void {
    this.reviewQuestionService()
      .find(reviewQuestionId)
      .then(res => {
        this.reviewQuestion = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.questionService()
      .retrieve()
      .then(res => {
        this.questions = res.data;
      });
    this.categoryService()
      .retrieve()
      .then(res => {
        this.categories = res.data;
      });
    this.professionService()
      .retrieve()
      .then(res => {
        this.professions = res.data;
      });
    this.providerProfessionService()
      .retrieve()
      .then(res => {
        this.providerProfessions = res.data;
      });
  }
}
