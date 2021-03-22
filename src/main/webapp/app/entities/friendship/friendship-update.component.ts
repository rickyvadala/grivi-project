import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import PersonService from '../person/person.service';
import { IPerson } from '@/shared/model/person.model';

import AlertService from '@/shared/alert/alert.service';
import { IFriendship, Friendship } from '@/shared/model/friendship.model';
import FriendshipService from './friendship.service';

const validations: any = {
  friendship: {},
};

@Component({
  validations,
})
export default class FriendshipUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('friendshipService') private friendshipService: () => FriendshipService;
  public friendship: IFriendship = new Friendship();

  @Inject('personService') private personService: () => PersonService;

  public people: IPerson[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.friendshipId) {
        vm.retrieveFriendship(to.params.friendshipId);
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
    if (this.friendship.id) {
      this.friendshipService()
        .update(this.friendship)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.friendship.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.friendshipService()
        .create(this.friendship)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('griviApp.friendship.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveFriendship(friendshipId): void {
    this.friendshipService()
      .find(friendshipId)
      .then(res => {
        this.friendship = res;
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
    this.personService()
      .retrieve()
      .then(res => {
        this.people = res.data;
      });
  }
}
