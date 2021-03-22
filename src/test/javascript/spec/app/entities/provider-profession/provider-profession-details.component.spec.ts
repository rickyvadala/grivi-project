/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ProviderProfessionDetailComponent from '@/entities/provider-profession/provider-profession-details.vue';
import ProviderProfessionClass from '@/entities/provider-profession/provider-profession-details.component';
import ProviderProfessionService from '@/entities/provider-profession/provider-profession.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('ProviderProfession Management Detail Component', () => {
    let wrapper: Wrapper<ProviderProfessionClass>;
    let comp: ProviderProfessionClass;
    let providerProfessionServiceStub: SinonStubbedInstance<ProviderProfessionService>;

    beforeEach(() => {
      providerProfessionServiceStub = sinon.createStubInstance<ProviderProfessionService>(ProviderProfessionService);

      wrapper = shallowMount<ProviderProfessionClass>(ProviderProfessionDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { providerProfessionService: () => providerProfessionServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundProviderProfession = { id: 123 };
        providerProfessionServiceStub.find.resolves(foundProviderProfession);

        // WHEN
        comp.retrieveProviderProfession(123);
        await comp.$nextTick();

        // THEN
        expect(comp.providerProfession).toBe(foundProviderProfession);
      });
    });
  });
});
