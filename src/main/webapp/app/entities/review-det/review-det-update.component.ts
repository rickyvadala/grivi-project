import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import ReviewService from '../review/review.service';
import { IReview } from '@/shared/model/review.model';

import NotificationService from '../notification/notification.service';
import { INotification } from '@/shared/model/notification.model';

import AlertService from '@/shared/alert/alert.service';
import { IReviewDet, ReviewDet } from '@/shared/model/review-det.model';
import ReviewDetService from './review-det.service';

const validations: any = {
  reviewDet: {
    rate: {},
  },
};

@Component({
  validations,
})
export default class ReviewDetUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('reviewDetService') private reviewDetService: () => ReviewDetService;
  public reviewDet: IReviewDet = new ReviewDet();

  @Inject('reviewService') private reviewService: () => ReviewService;

  public reviews: IReview[] = [];

  @Inject('notificationService') private notificationService: () => NotificationService;

  public notifications: INotification[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.reviewDetId) {
        vm.retrieveReviewDet(to.params.reviewDetId);
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
    if (this.reviewDet.id) {
      this.reviewDetService()
        .update(this.reviewDet)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.reviewDet.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.reviewDetService()
        .create(this.reviewDet)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.reviewDet.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveReviewDet(reviewDetId): void {
    this.reviewDetService()
      .find(reviewDetId)
      .then(res => {
        this.reviewDet = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.reviewService()
      .retrieve()
      .then(res => {
        this.reviews = res.data;
      });
    this.notificationService()
      .retrieve()
      .then(res => {
        this.notifications = res.data;
      });
  }
}
