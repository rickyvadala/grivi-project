import Component from 'vue-class-component';
import { Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class SeeMoreLessComponent extends Vue {
  @Prop() readonly text: string;
  @Prop({ default: 64 }) readonly textSize: number;
  more: boolean = false;
  profileText: SeeMoreText = {};

  created() {
    this.profileTextConfig(this.text);
  }

  toggleText() {
    this.more = !this.more;
  }

  buttonText(): string {
    return this.more ? 'See Less' : 'See More';
  }

  profileTextConfig(text: string) {
    this.profileText.less = text.substring(0, this.textSize);
    this.profileText.more = text.substring(this.textSize + 1, text.length);
  }
}

export interface SeeMoreText {
  less?: string;
  more?: string;
}
