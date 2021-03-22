/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import PersonUpdateComponent from '@/entities/person/person-update.vue';
import PersonClass from '@/entities/person/person-update.component';
import PersonService from '@/entities/person/person.service';

import FriendshipService from '@/entities/friendship/friendship.service';

import ChannelSubscriptionService from '@/entities/channel-subscription/channel-subscription.service';

import ProviderProfessionService from '@/entities/provider-profession/provider-profession.service';

import ReactionService from '@/entities/reaction/reaction.service';

import ReviewService from '@/entities/review/review.service';

import CompanyService from '@/entities/company/company.service';

import LocationService from '@/entities/location/location.service';

import ChannelService from '@/entities/channel/channel.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Person Management Update Component', () => {
    let wrapper: Wrapper<PersonClass>;
    let comp: PersonClass;
    let personServiceStub: SinonStubbedInstance<PersonService>;

    beforeEach(() => {
      personServiceStub = sinon.createStubInstance<PersonService>(PersonService);

      wrapper = shallowMount<PersonClass>(PersonUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          personService: () => personServiceStub,

          friendshipService: () => new FriendshipService(),

          channelSubscriptionService: () => new ChannelSubscriptionService(),

          providerProfessionService: () => new ProviderProfessionService(),

          reactionService: () => new ReactionService(),

          reviewService: () => new ReviewService(),

          companyService: () => new CompanyService(),

          locationService: () => new LocationService(),

          channelService: () => new ChannelService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('load', () => {
      it('Should convert date from string', () => {
        // GIVEN
        const date = new Date('2019-10-15T11:42:02Z');

        // WHEN
        const convertedDate = comp.convertDateTimeFromServer(date);

        // THEN
        expect(convertedDate).toEqual(format(date, DATE_TIME_LONG_FORMAT));
      });

      it('Should not convert date if date is not present', () => {
        expect(comp.convertDateTimeFromServer(null)).toBeNull();
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.person = entity;
        personServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(personServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.person = entity;
        personServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(personServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
