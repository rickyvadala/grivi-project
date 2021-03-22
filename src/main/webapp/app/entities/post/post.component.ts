import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IPost } from '@/shared/model/post.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import PostService from './post.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Post extends mixins(AlertMixin) {
  @Inject('postService') private postService: () => PostService;
  private removeId: number = null;

  public posts: IPost[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllPosts();
  }

  public clear(): void {
    this.retrieveAllPosts();
  }

  public retrieveAllPosts(): void {
    this.isFetching = true;

    this.postService()
      .retrieve()
      .then(
        res => {
          this.posts = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IPost): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removePost(): void {
    this.postService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('griviApp.post.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllPosts();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
