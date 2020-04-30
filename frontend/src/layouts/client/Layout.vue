<template>
<div>
  <div class="grid-layout-container alignment-block" :style="{padding: '15px', background: 'blueviolet'}">
    <vs-row vs-align="center" vs-type="flex" vs-justify="center" vs-w="12">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="2" vs-sm="12" vs-xs="12">
          <router-link :to="'/'" ><img class="titleImg" :src="titleImg" /></router-link>
      </vs-col>
      <vs-col vs-type="flex"  vs-align="center"  vs-lg="4" vs-sm="12" vs-xs="12">
        <vs-input icon="search" class="subject-search" placeholder="Search for Subjects..." v-model="search" />
      </vs-col>
      <vs-col vs-type="flex"  vs-align="center" vs-lg="2" vs-sm="12" vs-xs="12">
        <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer" :style="{marginLeft: '20px'}">
          <span class="cursor-pointer flex i18n-locale"><img class="h-4 w-5" :src="require(`@/assets/images/flags/${$i18n.locale}.png`)" :alt="$i18n.locale" /><span class="hidden sm:block ml-2 language-select">{{ getCurrentLocaleData.lang }}</span></span>
          <vs-dropdown-menu class="w-48 i18n-dropdown vx-navbar-dropdown">
            <vs-dropdown-item @click="updateLocale('en')"><img class="h-4 w-5 mr-1" src="@/assets/images/flags/en.png" alt="en" /> &nbsp;English</vs-dropdown-item>
            <vs-dropdown-item @click="updateLocale('fr')"><img class="h-4 w-5 mr-1" src="@/assets/images/flags/fr.png" alt="fr" /> &nbsp;French</vs-dropdown-item>
            <vs-dropdown-item @click="updateLocale('de')"><img class="h-4 w-5 mr-1" src="@/assets/images/flags/de.png" alt="de" /> &nbsp;German</vs-dropdown-item>
            <vs-dropdown-item @click="updateLocale('pt')"><img class="h-4 w-5 mr-1" src="@/assets/images/flags/pt.png" alt="pt" /> &nbsp;Portuguese</vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </vs-col>
    </vs-row>
  </div>
    <vs-navbar v-model="activeItem" class="nabarx nav-front" :color="colorx">
      <vs-navbar-item class="subject-header" index="0" vs-w="2">
          <vs-button color="darkorchid" icon-pack="feather" icon="icon-menu" icon-after @click="toggleLevelMenu">{{ $t('Subjects') }}</vs-button>
          <div id="toggleLevelMenu" :style="{display: 'none'}">
            <div class="grid-layout-container alignment-block">
              <vs-row vs-align="center" vs-type="flex" vs-justify="center" vs-w="12">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="10">
                  <vs-collapse accordion>
                    <h4 class="searchItemHeader">Level</h4>
                    <li class="searchItemField" :key="index" v-for="(level,index) in searchItemLevels" @click="categoryMenuOpen(level._id)">
                      {{level.name}}
                    </li>
                  </vs-collapse>
                </vs-col>
              </vs-row>
            </div>
          </div>
          <div id="toggleCategoryMenu" v-if="isLevelMenu && isCategoryMenu && categoryMenuCheck">
            <div class="grid-layout-container alignment-block">
              <vs-row vs-align="center" vs-type="flex" vs-justify="center" vs-w="12">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="10">
                  <vs-collapse accordion>
                    <h4 class="searchItemHeader">Category</h4>
                    <li class="searchItemField" :key="index" v-for="(category,index) in searchItemCategories" @click="subjectMenuOpen(category._id)">
                      {{category.name}}
                    </li>
                  </vs-collapse>
                </vs-col>
              </vs-row>
            </div>
          </div>
          <div id="toggleSubjectMenu" v-if="isLevelMenu && isCategoryMenu && isSubjectMenu && subjectMenuCheck">
            <div class="grid-layout-container alignment-block">
              <vs-row vs-align="center" vs-type="flex" vs-justify="center" vs-w="12">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="10">
                  <vs-collapse accordion>
                    <h4 class="searchItemHeader">subject</h4>
                    <li class="searchItemField" :key="index" v-for="(subject,index) in searchItemSubjects" >
                      <router-link :to="'/track/' + subject._id" :style="{fontSize: '1rem', padding: '3px'}">{{subject.name}}</router-link>
                    </li>
                  </vs-collapse>
                </vs-col>
              </vs-row>
            </div>
          </div>
      </vs-navbar-item>
      <vs-navbar-item class="login-header" index="1" vs-offset="4" vs-w="2">
        <vs-button color="dark" type="flat" size="medium" v-if="this.loggedIn == false" @click="$router.push('/login')" :style="{fontSize: '1rem'}" :disabled="path == '/login'">Login</vs-button>
      </vs-navbar-item>
      <vs-navbar-item class="register-header" index="2" vs-w="2">
        <vs-button type="gradient" size="medium" v-if="this.loggedIn == false" @click="$router.push('/register')" :style="{fontSize: '1rem'}" :disabled="path == '/register'">Register</vs-button>
        <div class="the-navbar__user-meta flex items-center" :style="{marginLeft: '10px'}" v-if="this.loggedIn == true">
          <div class="text-right leading-tight hidden sm:block">
            <p class="font-semibold">{{ this.username }}</p>
          </div>
          <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
            <div class="con-img ml-3"><img src="@/assets/images/portrait/small/avatar-s-11.png" alt="" width="40" height="40" class="rounded-full shadow-md cursor-pointer block" /></div>
            <vs-dropdown-menu class="vx-navbar-dropdown">
              <ul style="min-width: 9rem" v-if="this.loggedIn">
                <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" @click="$router.push('/profile')"><feather-icon icon="UserIcon" svgClasses="w-4 h-4"></feather-icon> <span class="ml-2">{{$t('Profile')}}</span></li>
                <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" v-if="this.loggedIn && this.$store.getters.permission == 'superadmin' || this.$store.getters.permission == 'admin'" @click="$router.push('/admin')"><feather-icon icon="MailIcon" svgClasses="w-4 h-4"></feather-icon> <span class="ml-2">{{$t('Dashboard')}}</span></li>
                <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" v-if="this.loggedIn && this.$store.getters.permission == 'author'" @click="$router.push('/author')"><feather-icon icon="MailIcon" svgClasses="w-4 h-4"></feather-icon> <span class="ml-2">{{$t('Dashboard')}}</span></li>
                <vs-divider class="m-1"></vs-divider>
                <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" @click.prevent="logOut"><feather-icon icon="LogOutIcon" svgClasses="w-4 h-4"></feather-icon> <router-link :to="'/'" class="ml-2 logout" >Logout</router-link></li>
              </ul>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </vs-navbar-item>
    </vs-navbar>
  <router-view></router-view>
  <FrontFooter></FrontFooter>
</div>

</template>
<script>
import ClientService from '@/services/client.service.js';
import { mapState } from 'vuex';
import titleImg from "@/assets/images/logo/quiz.png";
import FrontFooter from './FrontFooter.vue';
import { LOGOUT, GETSUBJECTITEMS, GETLEVLEITEMS } from '../../store/actionType';
import '@/assets/css/frontend.css';
export default {
  data() {
    return {
      colorx:'darkorchid',
      activeItem: 0,
      search: "",
      titleImg: titleImg,
      isLevelMenu: false,
      // searchItemLevels: [],
      searchItemCategories: [],
      searchItemSubjects: [],
      SubjectItems:[],
      categoryMenuCheck: false,
      subjectMenuCheck: false
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
    isCategoryMenu() {
      if (this.searchItemCategories.length > 0) {
        return true;
      } return false;
    },
    isSubjectMenu() {
      if(this.searchItemSubjects.length > 0) {
        return true;
      } return false;
    },
    ...mapState({
      searchItemLevels: state => state.client.levelItems
    })
  },
  methods: {
    updateLocale(locale) {
        this.$i18n.locale = locale;
        this.categoryMenuCheck = false;
        this.subjectMenuCheck = false;
        this.$store.dispatch(GETSUBJECTITEMS, this.$i18n.locale);
        this.$store.dispatch(GETLEVLEITEMS, this.$i18n.locale);
    },
    logOut() {
      this.$store.dispatch(LOGOUT);
    },
    toggleLevelMenu() {
      var x = document.getElementById("toggleLevelMenu");
      if (x.style.display === "none") {
        x.style.display = "block";
        this.isLevelMenu = true;
      } else {
        x.style.display = "none";
        this.isLevelMenu = false;
        this.searchItemCategories = [];
        this.searchItemSubjects = [];
      }
    },
    categoryMenuOpen(id) {
      this.categoryMenuCheck = true;
      return ClientService.getSearchCategory(id).then(
        res => {
          return this.searchItemCategories = res.data
        }
      )
    },
    subjectMenuOpen(id) {
      this.subjectMenuCheck = true;
      return ClientService.getSearchSubject(id).then(
        res => {
          return this.searchItemSubjects = res.data;
        }
      )
    },
    moveTrack(id) {
      this.$router.push('/track/' + id);
    }
  },
  created() {
    this.$store.dispatch(GETSUBJECTITEMS, this.$i18n.locale);
    this.$store.dispatch(GETLEVLEITEMS, this.$i18n.locale);
  },
  components: {
    FrontFooter
  },
};
</script>
<style>
  #toggleLevelMenu {
    z-index: 999;
    position: absolute;
    width: 350px;
    padding: 10px 0;
    text-align: center;
    background-color: darkorchid;
    margin-top: 5px;
    -webkit-transition: ease-in 0.7s all !important;
    transition: ease-in 0.7s all !important;
    /* animation: animateleft 0.7s !important; */
  }
  #toggleCategoryMenu {
    z-index: 999;
    position: absolute;
    width: 350px;
    margin-left: 350px;
    padding: 10px 0;
    text-align: center;
    background-color: darkorchid;
    margin-top: 5px;
    -webkit-transition: ease-in 0.7s all !important;
    transition: ease-in 0.7s all !important;
    /* animation: animateleft 0.7s !important; */
  }
  #toggleSubjectMenu {
    z-index: 999;
    position: absolute;
    width: 350px;
    margin-left: 700px;
    padding: 10px 0;
    text-align: center;
    background-color: darkorchid;
    margin-top: 5px;
    -webkit-transition: ease-in 0.7s all !important;
    transition: ease-in 0.7s all !important;
    /* animation: animateleft 0.7s !important; */
  }
  .searchItemField {
    margin-top: 5px;
    color: bisque;
  }
  .searchItemHeader {
    color: yellow;
    text-decoration-line: underline;
  }
</style>

