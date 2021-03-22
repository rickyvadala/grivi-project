/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ReviewQuestionDetailComponent from '@/entities/review-question/review-question-details.vue';
import ReviewQuestionClass from '@/entities/review-question/review-question-details.component';
import ReviewQuestionService from '@/entities/review-question/review-question.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('ReviewQuestion Management Detail Component', () => {
    let wrapper: Wrapper<ReviewQuestionClass>;
    let comp: ReviewQuestionClass;
    let reviewQuestionServiceStub: SinonStubbedInstance<ReviewQuestionService>;

    beforeEach(() => {
      reviewQuestionServiceStub = sinon.createStubInstance<ReviewQuestionService>(ReviewQuestionService);

      wrapper = shallowMount<ReviewQuestionClass>(ReviewQuestionDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { reviewQuestionService: () => reviewQuestionServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundReviewQuestion = { id: 123 };
        reviewQuestionServiceStub.find.resolves(foundReviewQuestion);

        // WHEN
        comp.retrieveReviewQuestion(123);
        await comp.$nextTick();

        // THEN
        expect(comp.reviewQuestion).toBe(foundReviewQuestion);
      });
    });
  });
});
