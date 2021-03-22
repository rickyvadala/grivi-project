/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import FriendshipDetailComponent from '@/entities/friendship/friendship-details.vue';
import FriendshipClass from '@/entities/friendship/friendship-details.component';
import FriendshipService from '@/entities/friendship/friendship.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Friendship Management Detail Component', () => {
    let wrapper: Wrapper<FriendshipClass>;
    let comp: FriendshipClass;
    let friendshipServiceStub: SinonStubbedInstance<FriendshipService>;

    beforeEach(() => {
      friendshipServiceStub = sinon.createStubInstance<FriendshipService>(FriendshipService);

      wrapper = shallowMount<FriendshipClass>(FriendshipDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { friendshipService: () => friendshipServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundFriendship = { id: 123 };
        friendshipServiceStub.find.resolves(foundFriendship);

        // WHEN
        comp.retrieveFriendship(123);
        await comp.$nextTick();

        // THEN
        expect(comp.friendship).toBe(foundFriendship);
      });
    });
  });
});
