/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ChannelSubscriptionUpdateComponent from '@/entities/channel-subscription/channel-subscription-update.vue';
import ChannelSubscriptionClass from '@/entities/channel-subscription/channel-subscription-update.component';
import ChannelSubscriptionService from '@/entities/channel-subscription/channel-subscription.service';

import PersonService from '@/entities/person/person.service';

import ChannelService from '@/entities/channel/channel.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('ChannelSubscription Management Update Component', () => {
    let wrapper: Wrapper<ChannelSubscriptionClass>;
    let comp: ChannelSubscriptionClass;
    let channelSubscriptionServiceStub: SinonStubbedInstance<ChannelSubscriptionService>;

    beforeEach(() => {
      channelSubscriptionServiceStub = sinon.createStubInstance<ChannelSubscriptionService>(ChannelSubscriptionService);

      wrapper = shallowMount<ChannelSubscriptionClass>(ChannelSubscriptionUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          channelSubscriptionService: () => channelSubscriptionServiceStub,

          personService: () => new PersonService(),

          channelService: () => new ChannelService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.channelSubscription = entity;
        channelSubscriptionServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(channelSubscriptionServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.channelSubscription = entity;
        channelSubscriptionServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(channelSubscriptionServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
