import { Component, Vue, Inject } from 'vue-property-decorator';

import { IChannel } from '@/shared/model/channel.model';
import ChannelService from './channel.service';

@Component
export default class ChannelDetails extends Vue {
  @Inject('channelService') private channelService: () => ChannelService;
  public channel: IChannel = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.channelId) {
        vm.retrieveChannel(to.params.channelId);
      }
    });
  }

  public retrieveChannel(channelId) {
    this.channelService()
      .find(channelId)
      .then(res => {
        this.channel = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
