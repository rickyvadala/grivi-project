import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import ReviewDetService from '../review-det/review-det.service';
import { IReviewDet } from '@/shared/model/review-det.model';

import PostService from '../post/post.service';
import { IPost } from '@/shared/model/post.model';

import ReactionService from '../reaction/reaction.service';
import { IReaction } from '@/shared/model/reaction.model';

import ReviewService from '../review/review.service';
import { IReview } from '@/shared/model/review.model';

import ChannelService from '../channel/channel.service';
import { IChannel } from '@/shared/model/channel.model';

import AlertService from '@/shared/alert/alert.service';
import { INotification, Notification } from '@/shared/model/notification.model';
import NotificationService from './notification.service';

const validations: any = {
  notification: {},
};

@Component({
  validations,
})
export default class NotificationUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('notificationService') private notificationService: () => NotificationService;
  public notification: INotification = new Notification();

  @Inject('reviewDetService') private reviewDetService: () => ReviewDetService;

  public reviewDets: IReviewDet[] = [];

  @Inject('postService') private postService: () => PostService;

  public posts: IPost[] = [];

  @Inject('reactionService') private reactionService: () => ReactionService;

  public reactions: IReaction[] = [];

  @Inject('reviewService') private reviewService: () => ReviewService;

  public reviews: IReview[] = [];

  @Inject('channelService') private channelService: () => ChannelService;

  public channels: IChannel[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.notificationId) {
        vm.retrieveNotification(to.params.notificationId);
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
    if (this.notification.id) {
      this.notificationService()
        .update(this.notification)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.notification.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.notificationService()
        .create(this.notification)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.notification.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveNotification(notificationId): void {
    this.notificationService()
      .find(notificationId)
      .then(res => {
        this.notification = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.reviewDetService()
      .retrieve()
      .then(res => {
        this.reviewDets = res.data;
      });
    this.postService()
      .retrieve()
      .then(res => {
        this.posts = res.data;
      });
    this.reactionService()
      .retrieve()
      .then(res => {
        this.reactions = res.data;
      });
    this.reviewService()
      .retrieve()
      .then(res => {
        this.reviews = res.data;
      });
    this.channelService()
      .retrieve()
      .then(res => {
        this.channels = res.data;
      });
  }
}
