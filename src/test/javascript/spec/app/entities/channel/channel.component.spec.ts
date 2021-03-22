/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ChannelComponent from '@/entities/channel/channel.vue';
import ChannelClass from '@/entities/channel/channel.component';
import ChannelService from '@/entities/channel/channel.service';

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
  describe('Channel Management Component', () => {
    let wrapper: Wrapper<ChannelClass>;
    let comp: ChannelClass;
    let channelServiceStub: SinonStubbedInstance<ChannelService>;

    beforeEach(() => {
      channelServiceStub = sinon.createStubInstance<ChannelService>(ChannelService);
      channelServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ChannelClass>(ChannelComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          channelService: () => channelServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      channelServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllChannels();
      await comp.$nextTick();

      // THEN
      expect(channelServiceStub.retrieve.called).toBeTruthy();
      expect(comp.channels[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      channelServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeChannel();
      await comp.$nextTick();

      // THEN
      expect(channelServiceStub.delete.called).toBeTruthy();
      expect(channelServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
