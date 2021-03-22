/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import NotificationUpdateComponent from '@/entities/notification/notification-update.vue';
import NotificationClass from '@/entities/notification/notification-update.component';
import NotificationService from '@/entities/notification/notification.service';

import ReviewDetService from '@/entities/review-det/review-det.service';

import PostService from '@/entities/post/post.service';

import ReactionService from '@/entities/reaction/reaction.service';

import ReviewService from '@/entities/review/review.service';

import ChannelService from '@/entities/channel/channel.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Notification Management Update Component', () => {
    let wrapper: Wrapper<NotificationClass>;
    let comp: NotificationClass;
    let notificationServiceStub: SinonStubbedInstance<NotificationService>;

    beforeEach(() => {
      notificationServiceStub = sinon.createStubInstance<NotificationService>(NotificationService);

      wrapper = shallowMount<NotificationClass>(NotificationUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          notificationService: () => notificationServiceStub,

          reviewDetService: () => new ReviewDetService(),

          postService: () => new PostService(),

          reactionService: () => new ReactionService(),

          reviewService: () => new ReviewService(),

          channelService: () => new ChannelService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.notification = entity;
        notificationServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(notificationServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.notification = entity;
        notificationServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(notificationServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
