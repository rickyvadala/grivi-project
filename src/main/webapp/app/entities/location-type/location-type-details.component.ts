import { Component, Vue, Inject } from 'vue-property-decorator';

import { ILocationType } from '@/shared/model/location-type.model';
import LocationTypeService from './location-type.service';

@Component
export default class LocationTypeDetails extends Vue {
  @Inject('locationTypeService') private locationTypeService: () => LocationTypeService;
  public locationType: ILocationType = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.locationTypeId) {
        vm.retrieveLocationType(to.params.locationTypeId);
      }
    });
  }

  public retrieveLocationType(locationTypeId) {
    this.locationTypeService()
      .find(locationTypeId)
      .then(res => {
        this.locationType = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
