import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import ReviewHeaderComponent from '@/shared/components/review-card/review-header/review-header.vue';
import SeeMoreLessComponent from '@/shared/components/see-more-less/see-more-less.vue';

@Component({
  components: {
    ReviewHeaderComponent,
    SeeMoreLessComponent,
  },
})
export default class ReviewCardComponent extends Vue {
  @Prop({ required: true }) readonly fullName: string;
  @Prop({ required: true }) readonly activity: string;
  @Prop({ required: true }) readonly rating: number;
  @Prop({ required: false }) readonly reviews: Array<number>;
  @Prop({ required: false }) readonly text: string;
  @Prop({ required: true }) date: Date;
}
