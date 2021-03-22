/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ChannelSubscriptionDetailComponent from '@/entities/channel-subscription/channel-subscription-details.vue';
import ChannelSubscriptionClass from '@/entities/channel-subscription/channel-subscription-details.component';
import ChannelSubscriptionService from '@/entities/channel-subscription/channel-subscription.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('ChannelSubscription Management Detail Component', () => {
    let wrapper: Wrapper<ChannelSubscriptionClass>;
    let comp: ChannelSubscriptionClass;
    let channelSubscriptionServiceStub: SinonStubbedInstance<ChannelSubscriptionService>;

    beforeEach(() => {
      channelSubscriptionServiceStub = sinon.createStubInstance<ChannelSubscriptionService>(ChannelSubscriptionService);

      wrapper = shallowMount<ChannelSubscriptionClass>(ChannelSubscriptionDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { channelSubscriptionService: () => channelSubscriptionServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundChannelSubscription = { id: 123 };
        channelSubscriptionServiceStub.find.resolves(foundChannelSubscription);

        // WHEN
        comp.retrieveChannelSubscription(123);
        await comp.$nextTick();

        // THEN
        expect(comp.channelSubscription).toBe(foundChannelSubscription);
      });
    });
  });
});
