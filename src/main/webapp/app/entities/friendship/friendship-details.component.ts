import { Component, Vue, Inject } from 'vue-property-decorator';

import { IFriendship } from '@/shared/model/friendship.model';
import FriendshipService from './friendship.service';

@Component
export default class FriendshipDetails extends Vue {
  @Inject('friendshipService') private friendshipService: () => FriendshipService;
  public friendship: IFriendship = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.friendshipId) {
        vm.retrieveFriendship(to.params.friendshipId);
      }
    });
  }

  public retrieveFriendship(friendshipId) {
    this.friendshipService()
      .find(friendshipId)
      .then(res => {
        this.friendship = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
