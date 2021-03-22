import { Component, Vue, Inject } from 'vue-property-decorator';

import { IProviderProfession } from '@/shared/model/provider-profession.model';
import ProviderProfessionService from './provider-profession.service';

@Component
export default class ProviderProfessionDetails extends Vue {
  @Inject('providerProfessionService') private providerProfessionService: () => ProviderProfessionService;
  public providerProfession: IProviderProfession = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.providerProfessionId) {
        vm.retrieveProviderProfession(to.params.providerProfessionId);
      }
    });
  }

  public retrieveProviderProfession(providerProfessionId) {
    this.providerProfessionService()
      .find(providerProfessionId)
      .then(res => {
        this.providerProfession = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
