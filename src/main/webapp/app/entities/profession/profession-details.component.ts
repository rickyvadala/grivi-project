import { Component, Vue, Inject } from 'vue-property-decorator';

import { IProfession } from '@/shared/model/profession.model';
import ProfessionService from './profession.service';

@Component
export default class ProfessionDetails extends Vue {
  @Inject('professionService') private professionService: () => ProfessionService;
  public profession: IProfession = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.professionId) {
        vm.retrieveProfession(to.params.professionId);
      }
    });
  }

  public retrieveProfession(professionId) {
    this.professionService()
      .find(professionId)
      .then(res => {
        this.profession = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
