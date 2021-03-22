/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ProviderProfessionComponent from '@/entities/provider-profession/provider-profession.vue';
import ProviderProfessionClass from '@/entities/provider-profession/provider-profession.component';
import ProviderProfessionService from '@/entities/provider-profession/provider-profession.service';

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
  describe('ProviderProfession Management Component', () => {
    let wrapper: Wrapper<ProviderProfessionClass>;
    let comp: ProviderProfessionClass;
    let providerProfessionServiceStub: SinonStubbedInstance<ProviderProfessionService>;

    beforeEach(() => {
      providerProfessionServiceStub = sinon.createStubInstance<ProviderProfessionService>(ProviderProfessionService);
      providerProfessionServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ProviderProfessionClass>(ProviderProfessionComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          providerProfessionService: () => providerProfessionServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      providerProfessionServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllProviderProfessions();
      await comp.$nextTick();

      // THEN
      expect(providerProfessionServiceStub.retrieve.called).toBeTruthy();
      expect(comp.providerProfessions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      providerProfessionServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeProviderProfession();
      await comp.$nextTick();

      // THEN
      expect(providerProfessionServiceStub.delete.called).toBeTruthy();
      expect(providerProfessionServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
