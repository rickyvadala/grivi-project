/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ReviewDetComponent from '@/entities/review-det/review-det.vue';
import ReviewDetClass from '@/entities/review-det/review-det.component';
import ReviewDetService from '@/entities/review-det/review-det.service';

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
  describe('ReviewDet Management Component', () => {
    let wrapper: Wrapper<ReviewDetClass>;
    let comp: ReviewDetClass;
    let reviewDetServiceStub: SinonStubbedInstance<ReviewDetService>;

    beforeEach(() => {
      reviewDetServiceStub = sinon.createStubInstance<ReviewDetService>(ReviewDetService);
      reviewDetServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ReviewDetClass>(ReviewDetComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          reviewDetService: () => reviewDetServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      reviewDetServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllReviewDets();
      await comp.$nextTick();

      // THEN
      expect(reviewDetServiceStub.retrieve.called).toBeTruthy();
      expect(comp.reviewDets[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      reviewDetServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeReviewDet();
      await comp.$nextTick();

      // THEN
      expect(reviewDetServiceStub.delete.called).toBeTruthy();
      expect(reviewDetServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
