import { Component, Vue, Inject } from 'vue-property-decorator';

import { IReaction } from '@/shared/model/reaction.model';
import ReactionService from './reaction.service';

@Component
export default class ReactionDetails extends Vue {
  @Inject('reactionService') private reactionService: () => ReactionService;
  public reaction: IReaction = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.reactionId) {
        vm.retrieveReaction(to.params.reactionId);
      }
    });
  }

  public retrieveReaction(reactionId) {
    this.reactionService()
      .find(reactionId)
      .then(res => {
        this.reaction = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
