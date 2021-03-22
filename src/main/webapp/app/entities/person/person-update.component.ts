import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import FriendshipService from '../friendship/friendship.service';
import { IFriendship } from '@/shared/model/friendship.model';

import ChannelSubscriptionService from '../channel-subscription/channel-subscription.service';
import { IChannelSubscription } from '@/shared/model/channel-subscription.model';

import ProviderProfessionService from '../provider-profession/provider-profession.service';
import { IProviderProfession } from '@/shared/model/provider-profession.model';

import ReactionService from '../reaction/reaction.service';
import { IReaction } from '@/shared/model/reaction.model';

import ReviewService from '../review/review.service';
import { IReview } from '@/shared/model/review.model';

import CompanyService from '../company/company.service';
import { ICompany } from '@/shared/model/company.model';

import LocationService from '../location/location.service';
import { ILocation } from '@/shared/model/location.model';

import ChannelService from '../channel/channel.service';
import { IChannel } from '@/shared/model/channel.model';

import AlertService from '@/shared/alert/alert.service';
import { IPerson, Person } from '@/shared/model/person.model';
import PersonService from './person.service';

const validations: any = {
  person: {
    firstName: {},
    lastName: {},
    birthDate: {},
    phoneNumber: {},
  },
};

@Component({
  validations,
})
export default class PersonUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('personService') private personService: () => PersonService;
  public person: IPerson = new Person();

  @Inject('friendshipService') private friendshipService: () => FriendshipService;

  public friendships: IFriendship[] = [];

  @Inject('channelSubscriptionService') private channelSubscriptionService: () => ChannelSubscriptionService;

  public channelSubscriptions: IChannelSubscription[] = [];

  @Inject('providerProfessionService') private providerProfessionService: () => ProviderProfessionService;

  public providerProfessions: IProviderProfession[] = [];

  @Inject('reactionService') private reactionService: () => ReactionService;

  public reactions: IReaction[] = [];

  @Inject('reviewService') private reviewService: () => ReviewService;

  public reviews: IReview[] = [];

  @Inject('companyService') private companyService: () => CompanyService;

  public companies: ICompany[] = [];

  @Inject('locationService') private locationService: () => LocationService;

  public locations: ILocation[] = [];

  @Inject('channelService') private channelService: () => ChannelService;

  public channels: IChannel[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.personId) {
        vm.retrievePerson(to.params.personId);
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
    this.person.companies = [];
    this.person.locations = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.person.id) {
      this.personService()
        .update(this.person)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.person.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.personService()
        .create(this.person)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.person.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date) {
      return format(date, DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.person[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.person[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.person[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.person[field] = null;
    }
  }

  public retrievePerson(personId): void {
    this.personService()
      .find(personId)
      .then(res => {
        res.birthDate = new Date(res.birthDate);
        this.person = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.friendshipService()
      .retrieve()
      .then(res => {
        this.friendships = res.data;
      });
    this.friendshipService()
      .retrieve()
      .then(res => {
        this.friendships = res.data;
      });
    this.channelSubscriptionService()
      .retrieve()
      .then(res => {
        this.channelSubscriptions = res.data;
      });
    this.providerProfessionService()
      .retrieve()
      .then(res => {
        this.providerProfessions = res.data;
      });
    this.reactionService()
      .retrieve()
      .then(res => {
        this.reactions = res.data;
      });
    this.reviewService()
      .retrieve()
      .then(res => {
        this.reviews = res.data;
      });
    this.reviewService()
      .retrieve()
      .then(res => {
        this.reviews = res.data;
      });
    this.companyService()
      .retrieve()
      .then(res => {
        this.companies = res.data;
      });
    this.locationService()
      .retrieve()
      .then(res => {
        this.locations = res.data;
      });
    this.channelService()
      .retrieve()
      .then(res => {
        this.channels = res.data;
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
