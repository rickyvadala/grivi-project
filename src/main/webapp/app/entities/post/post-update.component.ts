import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import NotificationService from '../notification/notification.service';
import { INotification } from '@/shared/model/notification.model';

import ReactionService from '../reaction/reaction.service';
import { IReaction } from '@/shared/model/reaction.model';

import CommentService from '../comment/comment.service';
import { IComment } from '@/shared/model/comment.model';

import AlertService from '@/shared/alert/alert.service';
import { IPost, Post } from '@/shared/model/post.model';
import PostService from './post.service';

const validations: any = {
  post: {
    text: {},
    photoUrl: {},
  },
};

@Component({
  validations,
})
export default class PostUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('postService') private postService: () => PostService;
  public post: IPost = new Post();

  @Inject('notificationService') private notificationService: () => NotificationService;

  public notifications: INotification[] = [];

  @Inject('reactionService') private reactionService: () => ReactionService;

  public reactions: IReaction[] = [];

  @Inject('commentService') private commentService: () => CommentService;

  public comments: IComment[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.postId) {
        vm.retrievePost(to.params.postId);
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
    if (this.post.id) {
      this.postService()
        .update(this.post)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.post.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.postService()
        .create(this.post)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.post.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrievePost(postId): void {
    this.postService()
      .find(postId)
      .then(res => {
        this.post = res;
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
    this.reactionService()
      .retrieve()
      .then(res => {
        this.reactions = res.data;
      });
    this.commentService()
      .retrieve()
      .then(res => {
        this.comments = res.data;
      });
    this.commentService()
      .retrieve()
      .then(res => {
        this.comments = res.data;
      });
  }
}
