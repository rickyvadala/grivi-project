import { Component, Vue, Inject } from 'vue-property-decorator';

import { IReviewDet } from '@/shared/model/review-det.model';
import ReviewDetService from './review-det.service';

@Component
export default class ReviewDetDetails extends Vue {
  @Inject('reviewDetService') private reviewDetService: () => ReviewDetService;
  public reviewDet: IReviewDet = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.reviewDetId) {
        vm.retrieveReviewDet(to.params.reviewDetId);
      }
    });
  }

  public retrieveReviewDet(reviewDetId) {
    this.reviewDetService()
      .find(reviewDetId)
      .then(res => {
        this.reviewDet = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
