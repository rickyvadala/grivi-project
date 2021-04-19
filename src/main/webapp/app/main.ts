// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.common with an alias.
import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './app.vue';
import Vue2Filters from 'vue2-filters';
import router from './router';
import * as config from './shared/config/config';
import * as bootstrapVueConfig from './shared/config/config-bootstrap-vue';
import JhiItemCountComponent from './shared/jhi-item-count.vue';
import JhiSortIndicatorComponent from './shared/sort/jhi-sort-indicator.vue';
import InfiniteLoading from 'vue-infinite-loading';
import AuditsService from './admin/audits/audits.service';

import HealthService from './admin/health/health.service';
import MetricsService from './admin/metrics/metrics.service';
import LogsService from './admin/logs/logs.service';
import ActivateService from './account/activate/activate.service';
import RegisterService from './account/register/register.service';
import UserManagementService from '@/admin/user-management/user-management.service';

import LoginService from './account/login.service';
import AccountService from './account/account.service';

import '../content/scss/vendor.scss';
import AlertService from '@/shared/alert/alert.service';
import TranslationService from '@/locale/translation.service';
import ConfigurationService from '@/admin/configuration/configuration.service';

/* tslint:disable */

import RegionService from '@/entities/region/region.service';
import CountryService from '@/entities/country/country.service';
import LocationService from '@/entities/location/location.service';
import LocationTypeService from '@/entities/location-type/location-type.service';
import DepartmentService from '@/entities/department/department.service';
import PersonService from '@/entities/person/person.service';
import CompanyService from '@/entities/company/company.service';
import ChannelSubscriptionService from '@/entities/channel-subscription/channel-subscription.service';
import ChannelService from '@/entities/channel/channel.service';
import PostService from '@/entities/post/post.service';
import CommentService from '@/entities/comment/comment.service';
import FriendshipService from '@/entities/friendship/friendship.service';
import NotificationService from '@/entities/notification/notification.service';
import CategoryService from '@/entities/category/category.service';
import QuestionService from '@/entities/question/question.service';
import ReviewQuestionService from '@/entities/review-question/review-question.service';
import ReactionService from '@/entities/reaction/reaction.service';
import ReviewService from '@/entities/review/review.service';
import ReviewDetService from '@/entities/review-det/review-det.service';
import ProfessionService from '@/entities/profession/profession.service';
import ProviderProfessionService from '@/entities/provider-profession/provider-profession.service';
// jhipster-needle-add-entity-service-to-main-import - JHipster will import entities services here

/* tslint:enable */
Vue.config.productionTip = false;
config.initVueApp(Vue);
config.initFortAwesome(Vue);
bootstrapVueConfig.initBootstrapVue(Vue);
Vue.use(Vue2Filters);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('jhi-item-count', JhiItemCountComponent);
Vue.component('jhi-sort-indicator', JhiSortIndicatorComponent);
Vue.component('infinite-loading', InfiniteLoading);

const i18n = config.initI18N(Vue);
const store = config.initVueXStore(Vue);

const alertService = new AlertService(store);
const translationService = new TranslationService(store, i18n);
const loginService = new LoginService();
const accountService = new AccountService(store, translationService, router);

router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next('/not-found');
  }

  if (to.meta && to.meta.authorities && to.meta.authorities.length > 0) {
    accountService.hasAnyAuthorityAndCheckAuth(to.meta.authorities).then(value => {
      if (!value) {
        sessionStorage.setItem('requested-url', to.fullPath);
        next('/forbidden');
      } else {
        next();
      }
    });
  } else {
    // no authorities, so just proceed
    next();
  }
});

/* tslint:disable */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  provide: {
    loginService: () => loginService,
    activateService: () => new ActivateService(),
    registerService: () => new RegisterService(),
    userService: () => new UserManagementService(),
    auditsService: () => new AuditsService(),
    healthService: () => new HealthService(),
    configurationService: () => new ConfigurationService(),
    logsService: () => new LogsService(),
    metricsService: () => new MetricsService(),
    alertService: () => alertService,
    translationService: () => translationService,
    regionService: () => new RegionService(),
    countryService: () => new CountryService(),
    locationService: () => new LocationService(),
    locationTypeService: () => new LocationTypeService(),
    departmentService: () => new DepartmentService(),
    personService: () => new PersonService(),
    companyService: () => new CompanyService(),
    channelSubscriptionService: () => new ChannelSubscriptionService(),
    channelService: () => new ChannelService(),
    postService: () => new PostService(),
    commentService: () => new CommentService(),
    friendshipService: () => new FriendshipService(),
    notificationService: () => new NotificationService(),
    categoryService: () => new CategoryService(),
    questionService: () => new QuestionService(),
    reviewQuestionService: () => new ReviewQuestionService(),
    reactionService: () => new ReactionService(),
    reviewService: () => new ReviewService(),
    reviewDetService: () => new ReviewDetService(),
    professionService: () => new ProfessionService(),
    providerProfessionService: () => new ProviderProfessionService(),
    // jhipster-needle-add-entity-service-to-main - JHipster will import entities services here
    accountService: () => accountService,
  },
  i18n,
  store,
});
