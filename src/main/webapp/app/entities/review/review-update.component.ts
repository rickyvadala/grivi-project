import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import NotificationService from '../notification/notification.service';
import { INotification } from '@/shared/model/notification.model';

import ReviewDetService from '../review-det/review-det.service';
import { IReviewDet } from '@/shared/model/review-det.model';

import PersonService from '../person/person.service';
import { IPerson } from '@/shared/model/person.model';

import AlertService from '@/shared/alert/alert.service';
import { IReview, Review } from '@/shared/model/review.model';
import ReviewService from './review.service';

const validations: any = {
  review: {
    avgRate: {},
    date: {},
  },
};

@Component({
  validations,
})
export default class ReviewUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('reviewService') private reviewService: () => ReviewService;
  public review: IReview = new Review();

  @Inject('notificationService') private notificationService: () => NotificationService;

  public notifications: INotification[] = [];

  @Inject('reviewDetService') private reviewDetService: () => ReviewDetService;

  public reviewDets: IReviewDet[] = [];

  @Inject('personService') private personService: () => PersonService;

  public people: IPerson[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.reviewId) {
        vm.retrieveReview(to.params.reviewId);
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
    if (this.review.id) {
      this.reviewService()
        .update(this.review)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.review.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.reviewService()
        .create(this.review)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.review.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date) {
      return format(date, DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.review[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.review[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.review[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.review[field] = null;
    }
  }

  public retrieveReview(reviewId): void {
    this.reviewService()
      .find(reviewId)
      .then(res => {
        res.date = new Date(res.date);
        this.review = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.notificationService()
      .retrieve()
      .then(res => {
        this.notifications = res.data;
      });
    this.reviewDetService()
      .retrieve()
      .then(res => {
        this.reviewDets = res.data;
      });
    this.personService()
      .retrieve()
      .then(res => {
        this.people = res.data;
      });
    this.personService()
      .retrieve()
      .then(res => {
        this.people = res.data;
      });
  }
}
