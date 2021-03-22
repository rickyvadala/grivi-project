/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ProfessionUpdateComponent from '@/entities/profession/profession-update.vue';
import ProfessionClass from '@/entities/profession/profession-update.component';
import ProfessionService from '@/entities/profession/profession.service';

import ProviderProfessionService from '@/entities/provider-profession/provider-profession.service';

import ChannelService from '@/entities/channel/channel.service';

import ReviewQuestionService from '@/entities/review-question/review-question.service';

import CategoryService from '@/entities/category/category.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Profession Management Update Component', () => {
    let wrapper: Wrapper<ProfessionClass>;
    let comp: ProfessionClass;
    let professionServiceStub: SinonStubbedInstance<ProfessionService>;

    beforeEach(() => {
      professionServiceStub = sinon.createStubInstance<ProfessionService>(ProfessionService);

      wrapper = shallowMount<ProfessionClass>(ProfessionUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          professionService: () => professionServiceStub,

          providerProfessionService: () => new ProviderProfessionService(),

          channelService: () => new ChannelService(),

          reviewQuestionService: () => new ReviewQuestionService(),

          categoryService: () => new CategoryService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.profession = entity;
        professionServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(professionServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.profession = entity;
        professionServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(professionServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
