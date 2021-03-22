/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ReviewQuestionUpdateComponent from '@/entities/review-question/review-question-update.vue';
import ReviewQuestionClass from '@/entities/review-question/review-question-update.component';
import ReviewQuestionService from '@/entities/review-question/review-question.service';

import QuestionService from '@/entities/question/question.service';

import CategoryService from '@/entities/category/category.service';

import ProfessionService from '@/entities/profession/profession.service';

import ProviderProfessionService from '@/entities/provider-profession/provider-profession.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('ReviewQuestion Management Update Component', () => {
    let wrapper: Wrapper<ReviewQuestionClass>;
    let comp: ReviewQuestionClass;
    let reviewQuestionServiceStub: SinonStubbedInstance<ReviewQuestionService>;

    beforeEach(() => {
      reviewQuestionServiceStub = sinon.createStubInstance<ReviewQuestionService>(ReviewQuestionService);

      wrapper = shallowMount<ReviewQuestionClass>(ReviewQuestionUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          reviewQuestionService: () => reviewQuestionServiceStub,

          questionService: () => new QuestionService(),

          categoryService: () => new CategoryService(),

          professionService: () => new ProfessionService(),

          providerProfessionService: () => new ProviderProfessionService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.reviewQuestion = entity;
        reviewQuestionServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(reviewQuestionServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.reviewQuestion = entity;
        reviewQuestionServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(reviewQuestionServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
