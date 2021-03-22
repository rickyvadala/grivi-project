/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ReviewDetDetailComponent from '@/entities/review-det/review-det-details.vue';
import ReviewDetClass from '@/entities/review-det/review-det-details.component';
import ReviewDetService from '@/entities/review-det/review-det.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('ReviewDet Management Detail Component', () => {
    let wrapper: Wrapper<ReviewDetClass>;
    let comp: ReviewDetClass;
    let reviewDetServiceStub: SinonStubbedInstance<ReviewDetService>;

    beforeEach(() => {
      reviewDetServiceStub = sinon.createStubInstance<ReviewDetService>(ReviewDetService);

      wrapper = shallowMount<ReviewDetClass>(ReviewDetDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { reviewDetService: () => reviewDetServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundReviewDet = { id: 123 };
        reviewDetServiceStub.find.resolves(foundReviewDet);

        // WHEN
        comp.retrieveReviewDet(123);
        await comp.$nextTick();

        // THEN
        expect(comp.reviewDet).toBe(foundReviewDet);
      });
    });
  });
});
