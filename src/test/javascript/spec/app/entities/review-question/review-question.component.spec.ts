/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ReviewQuestionComponent from '@/entities/review-question/review-question.vue';
import ReviewQuestionClass from '@/entities/review-question/review-question.component';
import ReviewQuestionService from '@/entities/review-question/review-question.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-alert', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('ReviewQuestion Management Component', () => {
    let wrapper: Wrapper<ReviewQuestionClass>;
    let comp: ReviewQuestionClass;
    let reviewQuestionServiceStub: SinonStubbedInstance<ReviewQuestionService>;

    beforeEach(() => {
      reviewQuestionServiceStub = sinon.createStubInstance<ReviewQuestionService>(ReviewQuestionService);
      reviewQuestionServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ReviewQuestionClass>(ReviewQuestionComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          reviewQuestionService: () => reviewQuestionServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      reviewQuestionServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllReviewQuestions();
      await comp.$nextTick();

      // THEN
      expect(reviewQuestionServiceStub.retrieve.called).toBeTruthy();
      expect(comp.reviewQuestions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      reviewQuestionServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeReviewQuestion();
      await comp.$nextTick();

      // THEN
      expect(reviewQuestionServiceStub.delete.called).toBeTruthy();
      expect(reviewQuestionServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
