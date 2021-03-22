/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ReactionUpdateComponent from '@/entities/reaction/reaction-update.vue';
import ReactionClass from '@/entities/reaction/reaction-update.component';
import ReactionService from '@/entities/reaction/reaction.service';

import NotificationService from '@/entities/notification/notification.service';

import PersonService from '@/entities/person/person.service';

import PostService from '@/entities/post/post.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Reaction Management Update Component', () => {
    let wrapper: Wrapper<ReactionClass>;
    let comp: ReactionClass;
    let reactionServiceStub: SinonStubbedInstance<ReactionService>;

    beforeEach(() => {
      reactionServiceStub = sinon.createStubInstance<ReactionService>(ReactionService);

      wrapper = shallowMount<ReactionClass>(ReactionUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          reactionService: () => reactionServiceStub,

          notificationService: () => new NotificationService(),

          personService: () => new PersonService(),

          postService: () => new PostService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.reaction = entity;
        reactionServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(reactionServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.reaction = entity;
        reactionServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(reactionServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
