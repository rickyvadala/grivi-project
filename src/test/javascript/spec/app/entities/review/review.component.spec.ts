/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ReviewComponent from '@/entities/review/review.vue';
import ReviewClass from '@/entities/review/review.component';
import ReviewService from '@/entities/review/review.service';

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
  describe('Review Management Component', () => {
    let wrapper: Wrapper<ReviewClass>;
    let comp: ReviewClass;
    let reviewServiceStub: SinonStubbedInstance<ReviewService>;

    beforeEach(() => {
      reviewServiceStub = sinon.createStubInstance<ReviewService>(ReviewService);
      reviewServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ReviewClass>(ReviewComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          reviewService: () => reviewServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      reviewServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllReviews();
      await comp.$nextTick();

      // THEN
      expect(reviewServiceStub.retrieve.called).toBeTruthy();
      expect(comp.reviews[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      reviewServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeReview();
      await comp.$nextTick();

      // THEN
      expect(reviewServiceStub.delete.called).toBeTruthy();
      expect(reviewServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
