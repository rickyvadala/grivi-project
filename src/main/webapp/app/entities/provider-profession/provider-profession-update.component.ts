import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import ReviewQuestionService from '../review-question/review-question.service';
import { IReviewQuestion } from '@/shared/model/review-question.model';

import PersonService from '../person/person.service';
import { IPerson } from '@/shared/model/person.model';

import ProfessionService from '../profession/profession.service';
import { IProfession } from '@/shared/model/profession.model';

import AlertService from '@/shared/alert/alert.service';
import { IProviderProfession, ProviderProfession } from '@/shared/model/provider-profession.model';
import ProviderProfessionService from './provider-profession.service';

const validations: any = {
  providerProfession: {},
};

@Component({
  validations,
})
export default class ProviderProfessionUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('providerProfessionService') private providerProfessionService: () => ProviderProfessionService;
  public providerProfession: IProviderProfession = new ProviderProfession();

  @Inject('reviewQuestionService') private reviewQuestionService: () => ReviewQuestionService;

  public reviewQuestions: IReviewQuestion[] = [];

  @Inject('personService') private personService: () => PersonService;

  public people: IPerson[] = [];

  @Inject('professionService') private professionService: () => ProfessionService;

  public professions: IProfession[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.providerProfessionId) {
        vm.retrieveProviderProfession(to.params.providerProfessionId);
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
    if (this.providerProfession.id) {
      this.providerProfessionService()
        .update(this.providerProfession)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.providerProfession.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.providerProfessionService()
        .create(this.providerProfession)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.providerProfession.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveProviderProfession(providerProfessionId): void {
    this.providerProfessionService()
      .find(providerProfessionId)
      .then(res => {
        this.providerProfession = res;
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
    this.personService()
      .retrieve()
      .then(res => {
        this.people = res.data;
      });
    this.professionService()
      .retrieve()
      .then(res => {
        this.professions = res.data;
      });
  }
}
