<template>
  <div>
    <vs-navbar v-model="activeItem" class="nabarx nav-front">
      <div slot="title">
        <vs-navbar-title>
            <router-link :to="'/'" ><img class="titleImg" :src="titleImg" /></router-link>
        </vs-navbar-title>
      </div>
      <vs-navbar-item class="subject-header" index="0">
        <vs-dropdown>
          <a class="a-icon" v-bind:style="{ fontSize: '15px' }" href.prevent>
            {{ $t('Subjects') }}
            <vs-icon class icon="expand_more"></vs-icon>
          </a>

          <vs-dropdown-menu>
            <vs-dropdown-item to="/components/">Option 1</vs-dropdown-item>
            <vs-dropdown-item>Option 2</vs-dropdown-item>

            <vs-dropdown-group vs-collapse vs-label="Group Collapse" vs-icon="add">
              <vs-dropdown-item>Option Collapse 1</vs-dropdown-item>
              <vs-dropdown-item>Option Collapse 2</vs-dropdown-item>
              <vs-dropdown-group>
                <vs-dropdown-item>Sub Options 1</vs-dropdown-item>
                <vs-dropdown-item>Sub Options 2</vs-dropdown-item>

                <vs-dropdown-group vs-collapse>
                  <vs-dropdown-item vs-label="Sub Collapse">Sub Collapse 1</vs-dropdown-item>
                  <vs-dropdown-item>Sub Collapse 2</vs-dropdown-item>
                </vs-dropdown-group>
              </vs-dropdown-group>
            </vs-dropdown-group>

            <vs-dropdown-item divider>Option 3</vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </vs-navbar-item>
      <vs-input
        icon="search"
        class="subject-search"
        placeholder="Search for Subjects..."
        v-model="search"
      />

      <vs-navbar-item class="login-header" index="1">
        <vs-button color="dark" type="flat" size="medium" v-if="this.loggedIn == false" @click="$router.push('/login')" :style="{fontSize: '1rem'}" :disabled="path == '/login'">Login</vs-button>
        <!-- <vs-button color="dark" type="flat" size="small" v-if="this.loggedIn == true"><router-link class="logoutlink" :to="'/'">{{this.username}}</router-link></vs-button> -->
      </vs-navbar-item>
      <vs-navbar-item class="register-header" index="2">
        <vs-button type="gradient" size="medium" v-if="this.loggedIn == false" @click="$router.push('/register')" :style="{fontSize: '1rem'}" :disabled="path == '/register'">Register</vs-button>
        <!-- <vs-button type="gradient" size="small" v-if="this.loggedIn == true" @click.prevent="logOut" :style="{fontSize: '1rem'}"><router-link class="logoutlink" :to="'/'">Logout</router-link></vs-button> -->
        <div class="the-navbar__user-meta flex items-center" :style="{marginLeft: '10px'}" v-if="this.loggedIn == true">
          <div class="text-right leading-tight hidden sm:block">
            <p class="font-semibold">{{ this.username }}</p>
          </div>
          <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
            <div class="con-img ml-3"><img src="../../assets/images/portrait/small/avatar-s-11.png" alt="" width="40" height="40" class="rounded-full shadow-md cursor-pointer block"></div>
            <vs-dropdown-menu class="vx-navbar-dropdown">
              <ul style="min-width: 9rem" v-if="this.loggedIn">
                <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"><feather-icon icon="UserIcon" svgClasses="w-4 h-4"></feather-icon> <span class="ml-2">{{$t('Profile')}}</span></li>
                  <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" v-if="this.loggedIn && this.$store.getters.permission == 'superadmin' || this.$store.getters.permission == 'admin'" @click="$router.push('/admin')"><feather-icon icon="MailIcon" svgClasses="w-4 h-4"></feather-icon> <span class="ml-2">{{$t('Dashboard')}}</span></li>
                  <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" v-if="this.loggedIn && this.$store.getters.permission == 'author'" @click="$router.push('/author')"><feather-icon icon="MailIcon" svgClasses="w-4 h-4"></feather-icon> <span class="ml-2">{{$t('Dashboard')}}</span></li>
                  <vs-divider class="m-1"></vs-divider>
                  <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" @click.prevent="logOut"><feather-icon icon="LogOutIcon" svgClasses="w-4 h-4"></feather-icon> <router-link :to="'/'" class="ml-2 logout" >Logout</router-link></li>
              </ul>
            </vs-dropdown-menu>
          </vs-dropdown>
			</div>
      </vs-navbar-item>
      <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer" :style="{marginLeft: '20px'}">
        <span class="cursor-pointer flex i18n-locale"><img class="h-4 w-5" :src="require(`@/assets/images/flags/${$i18n.locale}.png`)" :alt="$i18n.locale" /><span class="hidden sm:block ml-2">{{ getCurrentLocaleData.lang }}</span></span>
        <vs-dropdown-menu class="w-48 i18n-dropdown vx-navbar-dropdown">
          <vs-dropdown-item @click="updateLocale('en')"><img class="h-4 w-5 mr-1" src="@/assets/images/flags/en.png" alt="en" /> &nbsp;English</vs-dropdown-item>
          <vs-dropdown-item @click="updateLocale('fr')"><img class="h-4 w-5 mr-1" src="@/assets/images/flags/fr.png" alt="fr" /> &nbsp;French</vs-dropdown-item>
          <vs-dropdown-item @click="updateLocale('de')"><img class="h-4 w-5 mr-1" src="@/assets/images/flags/de.png" alt="de" /> &nbsp;German</vs-dropdown-item>
          <vs-dropdown-item @click="updateLocale('pt')"><img class="h-4 w-5 mr-1" src="@/assets/images/flags/pt.png" alt="pt" /> &nbsp;Portuguese</vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>
    </vs-navbar>
    <router-view></router-view>
    <FrontFooter></FrontFooter>
  </div>
</template>
<script>
import '@/assets/css/frontend.css';
import titleImg from "../../assets/images/logo/quiz.png";
import FrontFooter from './FrontFooter.vue';
import { LOGOUT } from '../../store/actionType';
export default {
  data() {
    return {
      activeItem: 0,
      search: "",
      titleImg: titleImg,
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.initialState.status.loggedIn;
    },
    path () {
      return this.$route.path;
    },
    username() {
      if (this.$store.state.auth.initialState.status.loggedIn) {
        if (this.$store.state.auth.initialState && this.$store.state.auth.initialState.user) {
          return  this.$store.state.auth.initialState.user.user.firstname + " " + this.$store.state.auth.initialState.user.user.lastname;
        }
      } else {
          return ''
      }
    },
    // I18N
    getCurrentLocaleData() {
        const locale = this.$i18n.locale;
        if (locale == "en") return { flag: "us", lang: 'English' }
        else if (locale == "pt") return { flag: "br", lang: 'Portuguese' }
        else if (locale == "fr") return { flag: "fr", lang: 'French' }
        else if (locale == "de") return { flag: "de", lang: 'German' }
    },
  },
  methods: {
    updateLocale(locale) {
        this.$i18n.locale = locale;
    },
    logOut() {
      this.$store.dispatch(LOGOUT);
    }
  },
  components: {
    FrontFooter,
  },
};
</script>
<style scoped>
  .logoutlink {
    padding: 0rem 1rem;
  }
</style>
