import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IFriendship } from '@/shared/model/friendship.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import FriendshipService from './friendship.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Friendship extends mixins(AlertMixin) {
  @Inject('friendshipService') private friendshipService: () => FriendshipService;
  private removeId: number = null;

  public friendships: IFriendship[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllFriendships();
  }

  public clear(): void {
    this.retrieveAllFriendships();
  }

  public retrieveAllFriendships(): void {
    this.isFetching = true;

    this.friendshipService()
      .retrieve()
      .then(
        res => {
          this.friendships = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IFriendship): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeFriendship(): void {
    this.friendshipService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('griviApp.friendship.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllFriendships();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
