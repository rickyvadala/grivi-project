/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ChannelDetailComponent from '@/entities/channel/channel-details.vue';
import ChannelClass from '@/entities/channel/channel-details.component';
import ChannelService from '@/entities/channel/channel.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Channel Management Detail Component', () => {
    let wrapper: Wrapper<ChannelClass>;
    let comp: ChannelClass;
    let channelServiceStub: SinonStubbedInstance<ChannelService>;

    beforeEach(() => {
      channelServiceStub = sinon.createStubInstance<ChannelService>(ChannelService);

      wrapper = shallowMount<ChannelClass>(ChannelDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { channelService: () => channelServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundChannel = { id: 123 };
        channelServiceStub.find.resolves(foundChannel);

        // WHEN
        comp.retrieveChannel(123);
        await comp.$nextTick();

        // THEN
        expect(comp.channel).toBe(foundChannel);
      });
    });
  });
});
