import Vue from 'vue';
import Component from 'vue-class-component';
import Ribbon from '@/core/ribbon/ribbon.vue';
import JhiFooter from '@/core/jhi-footer/jhi-footer.vue';
import JhiNavbar from '@/core/jhi-navbar/jhi-navbar.vue';
import LoginForm from '@/account/login-form/login-form.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPhoneVolume, faVideo, faComments } from '@fortawesome/free-solid-svg-icons';

library.add(faPhoneVolume, faVideo, faComments);

@Component({
  components: {
    ribbon: Ribbon,
    'jhi-navbar': JhiNavbar,
    'login-form': LoginForm,
    'jhi-footer': JhiFooter,
  },
})
export default class App extends Vue {}
