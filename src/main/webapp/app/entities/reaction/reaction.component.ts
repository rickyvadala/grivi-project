import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IReaction } from '@/shared/model/reaction.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import ReactionService from './reaction.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Reaction extends mixins(AlertMixin) {
  @Inject('reactionService') private reactionService: () => ReactionService;
  private removeId: number = null;

  public reactions: IReaction[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllReactions();
  }

  public clear(): void {
    this.retrieveAllReactions();
  }

  public retrieveAllReactions(): void {
    this.isFetching = true;

    this.reactionService()
      .retrieve()
      .then(
        res => {
          this.reactions = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IReaction): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeReaction(): void {
    this.reactionService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('griviApp.reaction.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllReactions();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
