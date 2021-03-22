/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ReviewDetUpdateComponent from '@/entities/review-det/review-det-update.vue';
import ReviewDetClass from '@/entities/review-det/review-det-update.component';
import ReviewDetService from '@/entities/review-det/review-det.service';

import ReviewService from '@/entities/review/review.service';

import NotificationService from '@/entities/notification/notification.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('ReviewDet Management Update Component', () => {
    let wrapper: Wrapper<ReviewDetClass>;
    let comp: ReviewDetClass;
    let reviewDetServiceStub: SinonStubbedInstance<ReviewDetService>;

    beforeEach(() => {
      reviewDetServiceStub = sinon.createStubInstance<ReviewDetService>(ReviewDetService);

      wrapper = shallowMount<ReviewDetClass>(ReviewDetUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          reviewDetService: () => reviewDetServiceStub,

          reviewService: () => new ReviewService(),

          notificationService: () => new NotificationService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.reviewDet = entity;
        reviewDetServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(reviewDetServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.reviewDet = entity;
        reviewDetServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(reviewDetServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
