/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import FriendshipUpdateComponent from '@/entities/friendship/friendship-update.vue';
import FriendshipClass from '@/entities/friendship/friendship-update.component';
import FriendshipService from '@/entities/friendship/friendship.service';

import PersonService from '@/entities/person/person.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Friendship Management Update Component', () => {
    let wrapper: Wrapper<FriendshipClass>;
    let comp: FriendshipClass;
    let friendshipServiceStub: SinonStubbedInstance<FriendshipService>;

    beforeEach(() => {
      friendshipServiceStub = sinon.createStubInstance<FriendshipService>(FriendshipService);

      wrapper = shallowMount<FriendshipClass>(FriendshipUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          friendshipService: () => friendshipServiceStub,

          personService: () => new PersonService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.friendship = entity;
        friendshipServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(friendshipServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.friendship = entity;
        friendshipServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(friendshipServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
