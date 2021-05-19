import Component from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class ReviewHeaderComponent extends Vue {
  @Prop({ required: true }) readonly fullName: string;
  @Prop({ required: true }) readonly activity: string;
  @Prop({ required: true }) readonly rating: number;
  @Prop({ required: false }) readonly reviews: Array<number>;
}
