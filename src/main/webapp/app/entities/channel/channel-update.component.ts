import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import ChannelSubscriptionService from '../channel-subscription/channel-subscription.service';
import { IChannelSubscription } from '@/shared/model/channel-subscription.model';

import NotificationService from '../notification/notification.service';
import { INotification } from '@/shared/model/notification.model';

import PersonService from '../person/person.service';
import { IPerson } from '@/shared/model/person.model';

import CategoryService from '../category/category.service';
import { ICategory } from '@/shared/model/category.model';

import ProfessionService from '../profession/profession.service';
import { IProfession } from '@/shared/model/profession.model';

import AlertService from '@/shared/alert/alert.service';
import { IChannel, Channel } from '@/shared/model/channel.model';
import ChannelService from './channel.service';

const validations: any = {
  channel: {
    name: {},
  },
};

@Component({
  validations,
})
export default class ChannelUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('channelService') private channelService: () => ChannelService;
  public channel: IChannel = new Channel();

  @Inject('channelSubscriptionService') private channelSubscriptionService: () => ChannelSubscriptionService;

  public channelSubscriptions: IChannelSubscription[] = [];

  @Inject('notificationService') private notificationService: () => NotificationService;

  public notifications: INotification[] = [];

  @Inject('personService') private personService: () => PersonService;

  public people: IPerson[] = [];

  @Inject('categoryService') private categoryService: () => CategoryService;

  public categories: ICategory[] = [];

  @Inject('professionService') private professionService: () => ProfessionService;

  public professions: IProfession[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.channelId) {
        vm.retrieveChannel(to.params.channelId);
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
    this.channel.people = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.channel.id) {
      this.channelService()
        .update(this.channel)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.channel.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.channelService()
        .create(this.channel)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.channel.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveChannel(channelId): void {
    this.channelService()
      .find(channelId)
      .then(res => {
        this.channel = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.channelSubscriptionService()
      .retrieve()
      .then(res => {
        this.channelSubscriptions = res.data;
      });
    this.notificationService()
      .retrieve()
      .then(res => {
        this.notifications = res.data;
      });
    this.personService()
      .retrieve()
      .then(res => {
        this.people = res.data;
      });
    this.categoryService()
      .retrieve()
      .then(res => {
        this.categories = res.data;
      });
    this.professionService()
      .retrieve()
      .then(res => {
        this.professions = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
