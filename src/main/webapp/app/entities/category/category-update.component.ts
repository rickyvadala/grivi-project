import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import ProfessionService from '../profession/profession.service';
import { IProfession } from '@/shared/model/profession.model';

import ChannelService from '../channel/channel.service';
import { IChannel } from '@/shared/model/channel.model';

import ReviewQuestionService from '../review-question/review-question.service';
import { IReviewQuestion } from '@/shared/model/review-question.model';

import AlertService from '@/shared/alert/alert.service';
import { ICategory, Category } from '@/shared/model/category.model';
import CategoryService from './category.service';

const validations: any = {
  category: {
    name: {},
    description: {},
  },
};

@Component({
  validations,
})
export default class CategoryUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('categoryService') private categoryService: () => CategoryService;
  public category: ICategory = new Category();

  @Inject('professionService') private professionService: () => ProfessionService;

  public professions: IProfession[] = [];

  @Inject('channelService') private channelService: () => ChannelService;

  public channels: IChannel[] = [];

  @Inject('reviewQuestionService') private reviewQuestionService: () => ReviewQuestionService;

  public reviewQuestions: IReviewQuestion[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.categoryId) {
        vm.retrieveCategory(to.params.categoryId);
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
    if (this.category.id) {
      this.categoryService()
        .update(this.category)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.category.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.categoryService()
        .create(this.category)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.category.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveCategory(categoryId): void {
    this.categoryService()
      .find(categoryId)
      .then(res => {
        this.category = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.professionService()
      .retrieve()
      .then(res => {
        this.professions = res.data;
      });
    this.channelService()
      .retrieve()
      .then(res => {
        this.channels = res.data;
      });
    this.reviewQuestionService()
      .retrieve()
      .then(res => {
        this.reviewQuestions = res.data;
      });
  }
}
