/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ReactionComponent from '@/entities/reaction/reaction.vue';
import ReactionClass from '@/entities/reaction/reaction.component';
import ReactionService from '@/entities/reaction/reaction.service';

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
  describe('Reaction Management Component', () => {
    let wrapper: Wrapper<ReactionClass>;
    let comp: ReactionClass;
    let reactionServiceStub: SinonStubbedInstance<ReactionService>;

    beforeEach(() => {
      reactionServiceStub = sinon.createStubInstance<ReactionService>(ReactionService);
      reactionServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ReactionClass>(ReactionComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          reactionService: () => reactionServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      reactionServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllReactions();
      await comp.$nextTick();

      // THEN
      expect(reactionServiceStub.retrieve.called).toBeTruthy();
      expect(comp.reactions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      reactionServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeReaction();
      await comp.$nextTick();

      // THEN
      expect(reactionServiceStub.delete.called).toBeTruthy();
      expect(reactionServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
