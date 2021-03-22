/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ProfessionDetailComponent from '@/entities/profession/profession-details.vue';
import ProfessionClass from '@/entities/profession/profession-details.component';
import ProfessionService from '@/entities/profession/profession.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Profession Management Detail Component', () => {
    let wrapper: Wrapper<ProfessionClass>;
    let comp: ProfessionClass;
    let professionServiceStub: SinonStubbedInstance<ProfessionService>;

    beforeEach(() => {
      professionServiceStub = sinon.createStubInstance<ProfessionService>(ProfessionService);

      wrapper = shallowMount<ProfessionClass>(ProfessionDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { professionService: () => professionServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundProfession = { id: 123 };
        professionServiceStub.find.resolves(foundProfession);

        // WHEN
        comp.retrieveProfession(123);
        await comp.$nextTick();

        // THEN
        expect(comp.profession).toBe(foundProfession);
      });
    });
  });
});
