import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import ProviderProfessionService from '../provider-profession/provider-profession.service';
import { IProviderProfession } from '@/shared/model/provider-profession.model';

import ChannelService from '../channel/channel.service';
import { IChannel } from '@/shared/model/channel.model';

import ReviewQuestionService from '../review-question/review-question.service';
import { IReviewQuestion } from '@/shared/model/review-question.model';

import CategoryService from '../category/category.service';
import { ICategory } from '@/shared/model/category.model';

import AlertService from '@/shared/alert/alert.service';
import { IProfession, Profession } from '@/shared/model/profession.model';
import ProfessionService from './profession.service';

const validations: any = {
  profession: {
    name: {},
    description: {},
  },
};

@Component({
  validations,
})
export default class ProfessionUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('professionService') private professionService: () => ProfessionService;
  public profession: IProfession = new Profession();

  @Inject('providerProfessionService') private providerProfessionService: () => ProviderProfessionService;

  public providerProfessions: IProviderProfession[] = [];

  @Inject('channelService') private channelService: () => ChannelService;

  public channels: IChannel[] = [];

  @Inject('reviewQuestionService') private reviewQuestionService: () => ReviewQuestionService;

  public reviewQuestions: IReviewQuestion[] = [];

  @Inject('categoryService') private categoryService: () => CategoryService;

  public categories: ICategory[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.professionId) {
        vm.retrieveProfession(to.params.professionId);
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
    if (this.profession.id) {
      this.professionService()
        .update(this.profession)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.profession.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.professionService()
        .create(this.profession)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.profession.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveProfession(professionId): void {
    this.professionService()
      .find(professionId)
      .then(res => {
        this.profession = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.providerProfessionService()
      .retrieve()
      .then(res => {
        this.providerProfessions = res.data;
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
    this.categoryService()
      .retrieve()
      .then(res => {
        this.categories = res.data;
      });
  }
}
