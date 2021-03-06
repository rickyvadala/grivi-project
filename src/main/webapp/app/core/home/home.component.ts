import Component from 'vue-class-component';
import { Inject, Vue } from 'vue-property-decorator';
import LoginService from '@/account/login.service';
import LoginForm from '@/account/login-form/login-form.vue';
import Profile from "@/core/profile/profile.vue";

@Component({
  components: {
    'login-form': LoginForm,
    'profile': Profile,
  }
})
export default class Home extends Vue {
  @Inject('loginService')
  private loginService: () => LoginService;

  public openLogin(): void {
    this.loginService().openLogin((<any>this).$root);
  }

  public get authenticated(): boolean {
    return this.$store.getters.authenticated;
  }

  public get username(): string {
    return this.$store.getters.account ? this.$store.getters.account.login : '';
  }

  public getMainContainerHeight(): string {
    const navBarHeight = document.getElementsByClassName('jh-navbar')[0].clientHeight;
    return `calc(100vh - ${navBarHeight}px)`;
  }
}
