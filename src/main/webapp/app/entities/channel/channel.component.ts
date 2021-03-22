import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IChannel } from '@/shared/model/channel.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import ChannelService from './channel.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Channel extends mixins(AlertMixin) {
  @Inject('channelService') private channelService: () => ChannelService;
  private removeId: number = null;

  public channels: IChannel[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllChannels();
  }

  public clear(): void {
    this.retrieveAllChannels();
  }

  public retrieveAllChannels(): void {
    this.isFetching = true;

    this.channelService()
      .retrieve()
      .then(
        res => {
          this.channels = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IChannel): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeChannel(): void {
    this.channelService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('griviApp.channel.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllChannels();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
