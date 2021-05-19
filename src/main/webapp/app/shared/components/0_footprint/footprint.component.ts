import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class FootprintComponent extends Vue {
  text: string = 'footprint-works';
}
