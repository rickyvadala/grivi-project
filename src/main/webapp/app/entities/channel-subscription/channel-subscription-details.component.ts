import { Component, Vue, Inject } from 'vue-property-decorator';

import { IChannelSubscription } from '@/shared/model/channel-subscription.model';
import ChannelSubscriptionService from './channel-subscription.service';

@Component
export default class ChannelSubscriptionDetails extends Vue {
  @Inject('channelSubscriptionService') private channelSubscriptionService: () => ChannelSubscriptionService;
  public channelSubscription: IChannelSubscription = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.channelSubscriptionId) {
        vm.retrieveChannelSubscription(to.params.channelSubscriptionId);
      }
    });
  }

  public retrieveChannelSubscription(channelSubscriptionId) {
    this.channelSubscriptionService()
      .find(channelSubscriptionId)
      .then(res => {
        this.channelSubscription = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
