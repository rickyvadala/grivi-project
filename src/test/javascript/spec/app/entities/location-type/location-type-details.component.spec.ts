/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import LocationTypeDetailComponent from '@/entities/location-type/location-type-details.vue';
import LocationTypeClass from '@/entities/location-type/location-type-details.component';
import LocationTypeService from '@/entities/location-type/location-type.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('LocationType Management Detail Component', () => {
    let wrapper: Wrapper<LocationTypeClass>;
    let comp: LocationTypeClass;
    let locationTypeServiceStub: SinonStubbedInstance<LocationTypeService>;

    beforeEach(() => {
      locationTypeServiceStub = sinon.createStubInstance<LocationTypeService>(LocationTypeService);

      wrapper = shallowMount<LocationTypeClass>(LocationTypeDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { locationTypeService: () => locationTypeServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundLocationType = { id: 123 };
        locationTypeServiceStub.find.resolves(foundLocationType);

        // WHEN
        comp.retrieveLocationType(123);
        await comp.$nextTick();

        // THEN
        expect(comp.locationType).toBe(foundLocationType);
      });
    });
  });
});
