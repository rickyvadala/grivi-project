import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';
import SeeMoreLessComponent from '@/shared/components/see-more-less/see-more-less.vue';
import ReviewCardComponent from '@/shared/components/review-card/review-card.vue';
import ReviewHeaderComponent from '@/shared/components/review-card/review-header/review-header.vue';
import ContactButtonsComponent from '@/shared/components/contact-buttons/contact-buttons.vue';
import ProfileBannerComponent from '@/shared/components/profile-banner/profile-banner.vue';

@Component({
  components: {
    SeeMoreLessComponent,
    ReviewCardComponent,
    ReviewHeaderComponent,
    ContactButtonsComponent,
    ProfileBannerComponent,
  },
})
export default class Profile extends Vue {
  fullName: string = 'Nico Puto';
  activity: string = 'Catador de nepes';
  rating: number = 4.62;
  reviews: Array<number> = [1, 2, 3, 4, 5, 6, 7];
  text: string =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum iste iusto magni voluptas impedit vitae neque aut eaque repudiandae laboriosam in, minima totam animi sunt aliquam? Architecto at esse labore?';
  date: Date = new Date();
}
