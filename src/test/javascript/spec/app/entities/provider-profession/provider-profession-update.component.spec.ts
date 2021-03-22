/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ProviderProfessionUpdateComponent from '@/entities/provider-profession/provider-profession-update.vue';
import ProviderProfessionClass from '@/entities/provider-profession/provider-profession-update.component';
import ProviderProfessionService from '@/entities/provider-profession/provider-profession.service';

import ReviewQuestionService from '@/entities/review-question/review-question.service';

import PersonService from '@/entities/person/person.service';

import ProfessionService from '@/entities/profession/profession.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('ProviderProfession Management Update Component', () => {
    let wrapper: Wrapper<ProviderProfessionClass>;
    let comp: ProviderProfessionClass;
    let providerProfessionServiceStub: SinonStubbedInstance<ProviderProfessionService>;

    beforeEach(() => {
      providerProfessionServiceStub = sinon.createStubInstance<ProviderProfessionService>(ProviderProfessionService);

      wrapper = shallowMount<ProviderProfessionClass>(ProviderProfessionUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          providerProfessionService: () => providerProfessionServiceStub,

          reviewQuestionService: () => new ReviewQuestionService(),

          personService: () => new PersonService(),

          professionService: () => new ProfessionService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.providerProfession = entity;
        providerProfessionServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(providerProfessionServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.providerProfession = entity;
        providerProfessionServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(providerProfessionServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
