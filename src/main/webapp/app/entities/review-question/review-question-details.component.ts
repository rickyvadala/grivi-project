import { Component, Vue, Inject } from 'vue-property-decorator';

import { IReviewQuestion } from '@/shared/model/review-question.model';
import ReviewQuestionService from './review-question.service';

@Component
export default class ReviewQuestionDetails extends Vue {
  @Inject('reviewQuestionService') private reviewQuestionService: () => ReviewQuestionService;
  public reviewQuestion: IReviewQuestion = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.reviewQuestionId) {
        vm.retrieveReviewQuestion(to.params.reviewQuestionId);
      }
    });
  }

  public retrieveReviewQuestion(reviewQuestionId) {
    this.reviewQuestionService()
      .find(reviewQuestionId)
      .then(res => {
        this.reviewQuestion = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
