/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ChannelUpdateComponent from '@/entities/channel/channel-update.vue';
import ChannelClass from '@/entities/channel/channel-update.component';
import ChannelService from '@/entities/channel/channel.service';

import ChannelSubscriptionService from '@/entities/channel-subscription/channel-subscription.service';

import NotificationService from '@/entities/notification/notification.service';

import PersonService from '@/entities/person/person.service';

import CategoryService from '@/entities/category/category.service';

import ProfessionService from '@/entities/profession/profession.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Channel Management Update Component', () => {
    let wrapper: Wrapper<ChannelClass>;
    let comp: ChannelClass;
    let channelServiceStub: SinonStubbedInstance<ChannelService>;

    beforeEach(() => {
      channelServiceStub = sinon.createStubInstance<ChannelService>(ChannelService);

      wrapper = shallowMount<ChannelClass>(ChannelUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          channelService: () => channelServiceStub,

          channelSubscriptionService: () => new ChannelSubscriptionService(),

          notificationService: () => new NotificationService(),

          personService: () => new PersonService(),

          categoryService: () => new CategoryService(),

          professionService: () => new ProfessionService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.channel = entity;
        channelServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(channelServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.channel = entity;
        channelServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(channelServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
