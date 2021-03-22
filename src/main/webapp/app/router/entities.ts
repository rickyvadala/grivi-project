import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore

// prettier-ignore
const Region = () => import('@/entities/region/region.vue');
// prettier-ignore
const RegionUpdate = () => import('@/entities/region/region-update.vue');
// prettier-ignore
const RegionDetails = () => import('@/entities/region/region-details.vue');
// prettier-ignore
const Country = () => import('@/entities/country/country.vue');
// prettier-ignore
const CountryUpdate = () => import('@/entities/country/country-update.vue');
// prettier-ignore
const CountryDetails = () => import('@/entities/country/country-details.vue');
// prettier-ignore
const Location = () => import('@/entities/location/location.vue');
// prettier-ignore
const LocationUpdate = () => import('@/entities/location/location-update.vue');
// prettier-ignore
const LocationDetails = () => import('@/entities/location/location-details.vue');
// prettier-ignore
const LocationType = () => import('@/entities/location-type/location-type.vue');
// prettier-ignore
const LocationTypeUpdate = () => import('@/entities/location-type/location-type-update.vue');
// prettier-ignore
const LocationTypeDetails = () => import('@/entities/location-type/location-type-details.vue');
// prettier-ignore
const Department = () => import('@/entities/department/department.vue');
// prettier-ignore
const DepartmentUpdate = () => import('@/entities/department/department-update.vue');
// prettier-ignore
const DepartmentDetails = () => import('@/entities/department/department-details.vue');
// prettier-ignore
const Person = () => import('@/entities/person/person.vue');
// prettier-ignore
const PersonUpdate = () => import('@/entities/person/person-update.vue');
// prettier-ignore
const PersonDetails = () => import('@/entities/person/person-details.vue');
// prettier-ignore
const Company = () => import('@/entities/company/company.vue');
// prettier-ignore
const CompanyUpdate = () => import('@/entities/company/company-update.vue');
// prettier-ignore
const CompanyDetails = () => import('@/entities/company/company-details.vue');
// prettier-ignore
const ChannelSubscription = () => import('@/entities/channel-subscription/channel-subscription.vue');
// prettier-ignore
const ChannelSubscriptionUpdate = () => import('@/entities/channel-subscription/channel-subscription-update.vue');
// prettier-ignore
const ChannelSubscriptionDetails = () => import('@/entities/channel-subscription/channel-subscription-details.vue');
// prettier-ignore
const Channel = () => import('@/entities/channel/channel.vue');
// prettier-ignore
const ChannelUpdate = () => import('@/entities/channel/channel-update.vue');
// prettier-ignore
const ChannelDetails = () => import('@/entities/channel/channel-details.vue');
// prettier-ignore
const Post = () => import('@/entities/post/post.vue');
// prettier-ignore
const PostUpdate = () => import('@/entities/post/post-update.vue');
// prettier-ignore
const PostDetails = () => import('@/entities/post/post-details.vue');
// prettier-ignore
const Comment = () => import('@/entities/comment/comment.vue');
// prettier-ignore
const CommentUpdate = () => import('@/entities/comment/comment-update.vue');
// prettier-ignore
const CommentDetails = () => import('@/entities/comment/comment-details.vue');
// prettier-ignore
const Friendship = () => import('@/entities/friendship/friendship.vue');
// prettier-ignore
const FriendshipUpdate = () => import('@/entities/friendship/friendship-update.vue');
// prettier-ignore
const FriendshipDetails = () => import('@/entities/friendship/friendship-details.vue');
// prettier-ignore
const Notification = () => import('@/entities/notification/notification.vue');
// prettier-ignore
const NotificationUpdate = () => import('@/entities/notification/notification-update.vue');
// prettier-ignore
const NotificationDetails = () => import('@/entities/notification/notification-details.vue');
// prettier-ignore
const Profesion = () => import('@/entities/profesion/profesion.vue');
// prettier-ignore
const ProfesionUpdate = () => import('@/entities/profesion/profesion-update.vue');
// prettier-ignore
const ProfesionDetails = () => import('@/entities/profesion/profesion-details.vue');
// prettier-ignore
const Category = () => import('@/entities/category/category.vue');
// prettier-ignore
const CategoryUpdate = () => import('@/entities/category/category-update.vue');
// prettier-ignore
const CategoryDetails = () => import('@/entities/category/category-details.vue');
// prettier-ignore
const ProviderProfesion = () => import('@/entities/provider-profesion/provider-profesion.vue');
// prettier-ignore
const ProviderProfesionUpdate = () => import('@/entities/provider-profesion/provider-profesion-update.vue');
// prettier-ignore
const ProviderProfesionDetails = () => import('@/entities/provider-profesion/provider-profesion-details.vue');
// prettier-ignore
const Question = () => import('@/entities/question/question.vue');
// prettier-ignore
const QuestionUpdate = () => import('@/entities/question/question-update.vue');
// prettier-ignore
const QuestionDetails = () => import('@/entities/question/question-details.vue');
// prettier-ignore
const ReviewQuestion = () => import('@/entities/review-question/review-question.vue');
// prettier-ignore
const ReviewQuestionUpdate = () => import('@/entities/review-question/review-question-update.vue');
// prettier-ignore
const ReviewQuestionDetails = () => import('@/entities/review-question/review-question-details.vue');
// prettier-ignore
const Reaction = () => import('@/entities/reaction/reaction.vue');
// prettier-ignore
const ReactionUpdate = () => import('@/entities/reaction/reaction-update.vue');
// prettier-ignore
const ReactionDetails = () => import('@/entities/reaction/reaction-details.vue');
// prettier-ignore
const Review = () => import('@/entities/review/review.vue');
// prettier-ignore
const ReviewUpdate = () => import('@/entities/review/review-update.vue');
// prettier-ignore
const ReviewDetails = () => import('@/entities/review/review-details.vue');
// prettier-ignore
const ReviewDet = () => import('@/entities/review-det/review-det.vue');
// prettier-ignore
const ReviewDetUpdate = () => import('@/entities/review-det/review-det-update.vue');
// prettier-ignore
const ReviewDetDetails = () => import('@/entities/review-det/review-det-details.vue');
// prettier-ignore
const Profession = () => import('@/entities/profession/profession.vue');
// prettier-ignore
const ProfessionUpdate = () => import('@/entities/profession/profession-update.vue');
// prettier-ignore
const ProfessionDetails = () => import('@/entities/profession/profession-details.vue');
// prettier-ignore
const ProviderProfession = () => import('@/entities/provider-profession/provider-profession.vue');
// prettier-ignore
const ProviderProfessionUpdate = () => import('@/entities/provider-profession/provider-profession-update.vue');
// prettier-ignore
const ProviderProfessionDetails = () => import('@/entities/provider-profession/provider-profession-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default [
  {
    path: '/region',
    name: 'Region',
    component: Region,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/region/new',
    name: 'RegionCreate',
    component: RegionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/region/:regionId/edit',
    name: 'RegionEdit',
    component: RegionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/region/:regionId/view',
    name: 'RegionView',
    component: RegionDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/country',
    name: 'Country',
    component: Country,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/country/new',
    name: 'CountryCreate',
    component: CountryUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/country/:countryId/edit',
    name: 'CountryEdit',
    component: CountryUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/country/:countryId/view',
    name: 'CountryView',
    component: CountryDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/location',
    name: 'Location',
    component: Location,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/location/new',
    name: 'LocationCreate',
    component: LocationUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/location/:locationId/edit',
    name: 'LocationEdit',
    component: LocationUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/location/:locationId/view',
    name: 'LocationView',
    component: LocationDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/location-type',
    name: 'LocationType',
    component: LocationType,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/location-type/new',
    name: 'LocationTypeCreate',
    component: LocationTypeUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/location-type/:locationTypeId/edit',
    name: 'LocationTypeEdit',
    component: LocationTypeUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/location-type/:locationTypeId/view',
    name: 'LocationTypeView',
    component: LocationTypeDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/department',
    name: 'Department',
    component: Department,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/department/new',
    name: 'DepartmentCreate',
    component: DepartmentUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/department/:departmentId/edit',
    name: 'DepartmentEdit',
    component: DepartmentUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/department/:departmentId/view',
    name: 'DepartmentView',
    component: DepartmentDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/person',
    name: 'Person',
    component: Person,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/person/new',
    name: 'PersonCreate',
    component: PersonUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/person/:personId/edit',
    name: 'PersonEdit',
    component: PersonUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/person/:personId/view',
    name: 'PersonView',
    component: PersonDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/company',
    name: 'Company',
    component: Company,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/company/new',
    name: 'CompanyCreate',
    component: CompanyUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/company/:companyId/edit',
    name: 'CompanyEdit',
    component: CompanyUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/company/:companyId/view',
    name: 'CompanyView',
    component: CompanyDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/channel-subscription',
    name: 'ChannelSubscription',
    component: ChannelSubscription,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/channel-subscription/new',
    name: 'ChannelSubscriptionCreate',
    component: ChannelSubscriptionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/channel-subscription/:channelSubscriptionId/edit',
    name: 'ChannelSubscriptionEdit',
    component: ChannelSubscriptionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/channel-subscription/:channelSubscriptionId/view',
    name: 'ChannelSubscriptionView',
    component: ChannelSubscriptionDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/channel',
    name: 'Channel',
    component: Channel,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/channel/new',
    name: 'ChannelCreate',
    component: ChannelUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/channel/:channelId/edit',
    name: 'ChannelEdit',
    component: ChannelUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/channel/:channelId/view',
    name: 'ChannelView',
    component: ChannelDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/post',
    name: 'Post',
    component: Post,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/post/new',
    name: 'PostCreate',
    component: PostUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/post/:postId/edit',
    name: 'PostEdit',
    component: PostUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/post/:postId/view',
    name: 'PostView',
    component: PostDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/comment',
    name: 'Comment',
    component: Comment,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/comment/new',
    name: 'CommentCreate',
    component: CommentUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/comment/:commentId/edit',
    name: 'CommentEdit',
    component: CommentUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/comment/:commentId/view',
    name: 'CommentView',
    component: CommentDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/friendship',
    name: 'Friendship',
    component: Friendship,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/friendship/new',
    name: 'FriendshipCreate',
    component: FriendshipUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/friendship/:friendshipId/edit',
    name: 'FriendshipEdit',
    component: FriendshipUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/friendship/:friendshipId/view',
    name: 'FriendshipView',
    component: FriendshipDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/notification',
    name: 'Notification',
    component: Notification,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/notification/new',
    name: 'NotificationCreate',
    component: NotificationUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/notification/:notificationId/edit',
    name: 'NotificationEdit',
    component: NotificationUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/notification/:notificationId/view',
    name: 'NotificationView',
    component: NotificationDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/profesion',
    name: 'Profesion',
    component: Profesion,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/profesion/new',
    name: 'ProfesionCreate',
    component: ProfesionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/profesion/:profesionId/edit',
    name: 'ProfesionEdit',
    component: ProfesionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/profesion/:profesionId/view',
    name: 'ProfesionView',
    component: ProfesionDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/category/new',
    name: 'CategoryCreate',
    component: CategoryUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/category/:categoryId/edit',
    name: 'CategoryEdit',
    component: CategoryUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/category/:categoryId/view',
    name: 'CategoryView',
    component: CategoryDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/provider-profesion',
    name: 'ProviderProfesion',
    component: ProviderProfesion,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/provider-profesion/new',
    name: 'ProviderProfesionCreate',
    component: ProviderProfesionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/provider-profesion/:providerProfesionId/edit',
    name: 'ProviderProfesionEdit',
    component: ProviderProfesionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/provider-profesion/:providerProfesionId/view',
    name: 'ProviderProfesionView',
    component: ProviderProfesionDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/question',
    name: 'Question',
    component: Question,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/question/new',
    name: 'QuestionCreate',
    component: QuestionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/question/:questionId/edit',
    name: 'QuestionEdit',
    component: QuestionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/question/:questionId/view',
    name: 'QuestionView',
    component: QuestionDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/review-question',
    name: 'ReviewQuestion',
    component: ReviewQuestion,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/review-question/new',
    name: 'ReviewQuestionCreate',
    component: ReviewQuestionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/review-question/:reviewQuestionId/edit',
    name: 'ReviewQuestionEdit',
    component: ReviewQuestionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/review-question/:reviewQuestionId/view',
    name: 'ReviewQuestionView',
    component: ReviewQuestionDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/reaction',
    name: 'Reaction',
    component: Reaction,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/reaction/new',
    name: 'ReactionCreate',
    component: ReactionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/reaction/:reactionId/edit',
    name: 'ReactionEdit',
    component: ReactionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/reaction/:reactionId/view',
    name: 'ReactionView',
    component: ReactionDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/review',
    name: 'Review',
    component: Review,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/review/new',
    name: 'ReviewCreate',
    component: ReviewUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/review/:reviewId/edit',
    name: 'ReviewEdit',
    component: ReviewUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/review/:reviewId/view',
    name: 'ReviewView',
    component: ReviewDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/review-det',
    name: 'ReviewDet',
    component: ReviewDet,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/review-det/new',
    name: 'ReviewDetCreate',
    component: ReviewDetUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/review-det/:reviewDetId/edit',
    name: 'ReviewDetEdit',
    component: ReviewDetUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/review-det/:reviewDetId/view',
    name: 'ReviewDetView',
    component: ReviewDetDetails,
    meta: { authorities: [Authority.USER] },
  },

  {
    path: '/location',
    name: 'Location',
    component: Location,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/location/new',
    name: 'LocationCreate',
    component: LocationUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/location/:locationId/edit',
    name: 'LocationEdit',
    component: LocationUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/location/:locationId/view',
    name: 'LocationView',
    component: LocationDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/channel-subscription',
    name: 'ChannelSubscription',
    component: ChannelSubscription,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/channel-subscription/new',
    name: 'ChannelSubscriptionCreate',
    component: ChannelSubscriptionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/channel-subscription/:channelSubscriptionId/edit',
    name: 'ChannelSubscriptionEdit',
    component: ChannelSubscriptionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/channel-subscription/:channelSubscriptionId/view',
    name: 'ChannelSubscriptionView',
    component: ChannelSubscriptionDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/channel',
    name: 'Channel',
    component: Channel,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/channel/new',
    name: 'ChannelCreate',
    component: ChannelUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/channel/:channelId/edit',
    name: 'ChannelEdit',
    component: ChannelUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/channel/:channelId/view',
    name: 'ChannelView',
    component: ChannelDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/comment',
    name: 'Comment',
    component: Comment,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/comment/new',
    name: 'CommentCreate',
    component: CommentUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/comment/:commentId/edit',
    name: 'CommentEdit',
    component: CommentUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/comment/:commentId/view',
    name: 'CommentView',
    component: CommentDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/friendship',
    name: 'Friendship',
    component: Friendship,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/friendship/new',
    name: 'FriendshipCreate',
    component: FriendshipUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/friendship/:friendshipId/edit',
    name: 'FriendshipEdit',
    component: FriendshipUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/friendship/:friendshipId/view',
    name: 'FriendshipView',
    component: FriendshipDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/notification',
    name: 'Notification',
    component: Notification,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/notification/new',
    name: 'NotificationCreate',
    component: NotificationUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/notification/:notificationId/edit',
    name: 'NotificationEdit',
    component: NotificationUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/notification/:notificationId/view',
    name: 'NotificationView',
    component: NotificationDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/profesion',
    name: 'Profesion',
    component: Profesion,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/profesion/new',
    name: 'ProfesionCreate',
    component: ProfesionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/profesion/:profesionId/edit',
    name: 'ProfesionEdit',
    component: ProfesionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/profesion/:profesionId/view',
    name: 'ProfesionView',
    component: ProfesionDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/provider-profesion',
    name: 'ProviderProfesion',
    component: ProviderProfesion,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/provider-profesion/new',
    name: 'ProviderProfesionCreate',
    component: ProviderProfesionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/provider-profesion/:providerProfesionId/edit',
    name: 'ProviderProfesionEdit',
    component: ProviderProfesionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/provider-profesion/:providerProfesionId/view',
    name: 'ProviderProfesionView',
    component: ProviderProfesionDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/reaction',
    name: 'Reaction',
    component: Reaction,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/reaction/new',
    name: 'ReactionCreate',
    component: ReactionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/reaction/:reactionId/edit',
    name: 'ReactionEdit',
    component: ReactionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/reaction/:reactionId/view',
    name: 'ReactionView',
    component: ReactionDetails,
    meta: { authorities: [Authority.USER] },
  },

  {
    path: '/person',
    name: 'Person',
    component: Person,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/person/new',
    name: 'PersonCreate',
    component: PersonUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/person/:personId/edit',
    name: 'PersonEdit',
    component: PersonUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/person/:personId/view',
    name: 'PersonView',
    component: PersonDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/channel',
    name: 'Channel',
    component: Channel,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/channel/new',
    name: 'ChannelCreate',
    component: ChannelUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/channel/:channelId/edit',
    name: 'ChannelEdit',
    component: ChannelUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/channel/:channelId/view',
    name: 'ChannelView',
    component: ChannelDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/post',
    name: 'Post',
    component: Post,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/post/new',
    name: 'PostCreate',
    component: PostUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/post/:postId/edit',
    name: 'PostEdit',
    component: PostUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/post/:postId/view',
    name: 'PostView',
    component: PostDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/comment',
    name: 'Comment',
    component: Comment,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/comment/new',
    name: 'CommentCreate',
    component: CommentUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/comment/:commentId/edit',
    name: 'CommentEdit',
    component: CommentUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/comment/:commentId/view',
    name: 'CommentView',
    component: CommentDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/friendship',
    name: 'Friendship',
    component: Friendship,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/friendship/new',
    name: 'FriendshipCreate',
    component: FriendshipUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/friendship/:friendshipId/edit',
    name: 'FriendshipEdit',
    component: FriendshipUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/friendship/:friendshipId/view',
    name: 'FriendshipView',
    component: FriendshipDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/notification',
    name: 'Notification',
    component: Notification,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/notification/new',
    name: 'NotificationCreate',
    component: NotificationUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/notification/:notificationId/edit',
    name: 'NotificationEdit',
    component: NotificationUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/notification/:notificationId/view',
    name: 'NotificationView',
    component: NotificationDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/profession',
    name: 'Profession',
    component: Profession,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/profession/new',
    name: 'ProfessionCreate',
    component: ProfessionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/profession/:professionId/edit',
    name: 'ProfessionEdit',
    component: ProfessionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/profession/:professionId/view',
    name: 'ProfessionView',
    component: ProfessionDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/category/new',
    name: 'CategoryCreate',
    component: CategoryUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/category/:categoryId/edit',
    name: 'CategoryEdit',
    component: CategoryUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/category/:categoryId/view',
    name: 'CategoryView',
    component: CategoryDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/provider-profession',
    name: 'ProviderProfession',
    component: ProviderProfession,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/provider-profession/new',
    name: 'ProviderProfessionCreate',
    component: ProviderProfessionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/provider-profession/:providerProfessionId/edit',
    name: 'ProviderProfessionEdit',
    component: ProviderProfessionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/provider-profession/:providerProfessionId/view',
    name: 'ProviderProfessionView',
    component: ProviderProfessionDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/review-question',
    name: 'ReviewQuestion',
    component: ReviewQuestion,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/review-question/new',
    name: 'ReviewQuestionCreate',
    component: ReviewQuestionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/review-question/:reviewQuestionId/edit',
    name: 'ReviewQuestionEdit',
    component: ReviewQuestionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/review-question/:reviewQuestionId/view',
    name: 'ReviewQuestionView',
    component: ReviewQuestionDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/review',
    name: 'Review',
    component: Review,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/review/new',
    name: 'ReviewCreate',
    component: ReviewUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/review/:reviewId/edit',
    name: 'ReviewEdit',
    component: ReviewUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/review/:reviewId/view',
    name: 'ReviewView',
    component: ReviewDetails,
    meta: { authorities: [Authority.USER] },
  },

  {
    path: '/person',
    name: 'Person',
    component: Person,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/person/new',
    name: 'PersonCreate',
    component: PersonUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/person/:personId/edit',
    name: 'PersonEdit',
    component: PersonUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/person/:personId/view',
    name: 'PersonView',
    component: PersonDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/post',
    name: 'Post',
    component: Post,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/post/new',
    name: 'PostCreate',
    component: PostUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/post/:postId/edit',
    name: 'PostEdit',
    component: PostUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/post/:postId/view',
    name: 'PostView',
    component: PostDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/comment',
    name: 'Comment',
    component: Comment,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/comment/new',
    name: 'CommentCreate',
    component: CommentUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/comment/:commentId/edit',
    name: 'CommentEdit',
    component: CommentUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/comment/:commentId/view',
    name: 'CommentView',
    component: CommentDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/friendship',
    name: 'Friendship',
    component: Friendship,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/friendship/new',
    name: 'FriendshipCreate',
    component: FriendshipUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/friendship/:friendshipId/edit',
    name: 'FriendshipEdit',
    component: FriendshipUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/friendship/:friendshipId/view',
    name: 'FriendshipView',
    component: FriendshipDetails,
    meta: { authorities: [Authority.USER] },
  },
  // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
];
