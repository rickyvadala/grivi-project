import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import NotificationService from '../notification/notification.service';
import { INotification } from '@/shared/model/notification.model';

import PersonService from '../person/person.service';
import { IPerson } from '@/shared/model/person.model';

import PostService from '../post/post.service';
import { IPost } from '@/shared/model/post.model';

import AlertService from '@/shared/alert/alert.service';
import { IReaction, Reaction } from '@/shared/model/reaction.model';
import ReactionService from './reaction.service';

const validations: any = {
  reaction: {
    type: {},
  },
};

@Component({
  validations,
})
export default class ReactionUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('reactionService') private reactionService: () => ReactionService;
  public reaction: IReaction = new Reaction();

  @Inject('notificationService') private notificationService: () => NotificationService;

  public notifications: INotification[] = [];

  @Inject('personService') private personService: () => PersonService;

  public people: IPerson[] = [];

  @Inject('postService') private postService: () => PostService;

  public posts: IPost[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.reactionId) {
        vm.retrieveReaction(to.params.reactionId);
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
    if (this.reaction.id) {
      this.reactionService()
        .update(this.reaction)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.reaction.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.reactionService()
        .create(this.reaction)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.reaction.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveReaction(reactionId): void {
    this.reactionService()
      .find(reactionId)
      .then(res => {
        this.reaction = res;
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
    this.personService()
      .retrieve()
      .then(res => {
        this.people = res.data;
      });
    this.postService()
      .retrieve()
      .then(res => {
        this.posts = res.data;
      });
  }
}
