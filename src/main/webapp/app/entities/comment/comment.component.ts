import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IComment } from '@/shared/model/comment.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import CommentService from './comment.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Comment extends mixins(AlertMixin) {
  @Inject('commentService') private commentService: () => CommentService;
  private removeId: number = null;

  public comments: IComment[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllComments();
  }

  public clear(): void {
    this.retrieveAllComments();
  }

  public retrieveAllComments(): void {
    this.isFetching = true;

    this.commentService()
      .retrieve()
      .then(
        res => {
          this.comments = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IComment): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeComment(): void {
    this.commentService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('griviApp.comment.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllComments();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
