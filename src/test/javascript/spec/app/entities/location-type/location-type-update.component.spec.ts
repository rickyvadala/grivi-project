/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import LocationTypeUpdateComponent from '@/entities/location-type/location-type-update.vue';
import LocationTypeClass from '@/entities/location-type/location-type-update.component';
import LocationTypeService from '@/entities/location-type/location-type.service';

import LocationService from '@/entities/location/location.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('LocationType Management Update Component', () => {
    let wrapper: Wrapper<LocationTypeClass>;
    let comp: LocationTypeClass;
    let locationTypeServiceStub: SinonStubbedInstance<LocationTypeService>;

    beforeEach(() => {
      locationTypeServiceStub = sinon.createStubInstance<LocationTypeService>(LocationTypeService);

      wrapper = shallowMount<LocationTypeClass>(LocationTypeUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          locationTypeService: () => locationTypeServiceStub,

          locationService: () => new LocationService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.locationType = entity;
        locationTypeServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(locationTypeServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.locationType = entity;
        locationTypeServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(locationTypeServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
