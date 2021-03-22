import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IChannelSubscription } from '@/shared/model/channel-subscription.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import ChannelSubscriptionService from './channel-subscription.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class ChannelSubscription extends mixins(AlertMixin) {
  @Inject('channelSubscriptionService') private channelSubscriptionService: () => ChannelSubscriptionService;
  private removeId: number = null;

  public channelSubscriptions: IChannelSubscription[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllChannelSubscriptions();
  }

  public clear(): void {
    this.retrieveAllChannelSubscriptions();
  }

  public retrieveAllChannelSubscriptions(): void {
    this.isFetching = true;

    this.channelSubscriptionService()
      .retrieve()
      .then(
        res => {
          this.channelSubscriptions = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IChannelSubscription): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeChannelSubscription(): void {
    this.channelSubscriptionService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('griviApp.channelSubscription.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllChannelSubscriptions();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
