/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ProfessionComponent from '@/entities/profession/profession.vue';
import ProfessionClass from '@/entities/profession/profession.component';
import ProfessionService from '@/entities/profession/profession.service';

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
  describe('Profession Management Component', () => {
    let wrapper: Wrapper<ProfessionClass>;
    let comp: ProfessionClass;
    let professionServiceStub: SinonStubbedInstance<ProfessionService>;

    beforeEach(() => {
      professionServiceStub = sinon.createStubInstance<ProfessionService>(ProfessionService);
      professionServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ProfessionClass>(ProfessionComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          professionService: () => professionServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      professionServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllProfessions();
      await comp.$nextTick();

      // THEN
      expect(professionServiceStub.retrieve.called).toBeTruthy();
      expect(comp.professions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      professionServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeProfession();
      await comp.$nextTick();

      // THEN
      expect(professionServiceStub.delete.called).toBeTruthy();
      expect(professionServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
