import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import PersonService from '../person/person.service';
import { IPerson } from '@/shared/model/person.model';

import ChannelService from '../channel/channel.service';
import { IChannel } from '@/shared/model/channel.model';

import AlertService from '@/shared/alert/alert.service';
import { IChannelSubscription, ChannelSubscription } from '@/shared/model/channel-subscription.model';
import ChannelSubscriptionService from './channel-subscription.service';

const validations: any = {
  channelSubscription: {},
};

@Component({
  validations,
})
export default class ChannelSubscriptionUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('channelSubscriptionService') private channelSubscriptionService: () => ChannelSubscriptionService;
  public channelSubscription: IChannelSubscription = new ChannelSubscription();

  @Inject('personService') private personService: () => PersonService;

  public people: IPerson[] = [];

  @Inject('channelService') private channelService: () => ChannelService;

  public channels: IChannel[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.channelSubscriptionId) {
        vm.retrieveChannelSubscription(to.params.channelSubscriptionId);
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
    if (this.channelSubscription.id) {
      this.channelSubscriptionService()
        .update(this.channelSubscription)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.channelSubscription.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.channelSubscriptionService()
        .create(this.channelSubscription)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.channelSubscription.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveChannelSubscription(channelSubscriptionId): void {
    this.channelSubscriptionService()
      .find(channelSubscriptionId)
      .then(res => {
        this.channelSubscription = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.personService()
      .retrieve()
      .then(res => {
        this.people = res.data;
      });
    this.channelService()
      .retrieve()
      .then(res => {
        this.channels = res.data;
      });
  }
}
