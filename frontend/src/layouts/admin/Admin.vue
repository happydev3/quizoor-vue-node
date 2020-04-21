<template>
    <div class="layout--main" :class="[navbarClasses, footerClasses, {'app-page': isAppPage}]">

        <vx-sidebar :sidebarItems="sidebarItems" :logo="require('../../assets/images/logo/logo.png')" parent=".layout--main" />

        <div id="content-area" :class="[contentAreaClass, {'show-overlay': bodyOverlay}]">

            <div id="content-overlay"></div>

            <div class="content-wrapper">

                <the-navbar :navbarColor="navbarColor" :class="[{'text-white': isNavbarDark && !isThemeDark}, {'text-base': !isNavbarDark && isThemeDark}]" />

                <div class="router-view">
                    <div class="router-content" :class="{'mt-0': navbarType == 'hidden'}">
                        <div class="content-area__content">
                            <back-to-top bottom="5%" visibleoffset="500" v-if="!hideScrollToTop">
                                <vs-button icon-pack="feather" icon="icon-arrow-up" class="shadow-lg" />
                            </back-to-top>
                            <transition :name="routerTransition" mode="out-in">
                                <router-view @changeRouteTitle="changeRouteTitle"></router-view>
                            </transition>
                        </div>
                    </div>
                </div>

            </div>
            <the-footer></the-footer>
        </div>
    </div>
</template>

<script>
import VxSidebar from '@/layouts/components/vx-sidebar/VxSidebar.vue';
import TheNavbar from '../components/TheNavbar.vue';
import TheFooter from '../components/TheFooter.vue';
import themeConfig from '@/../themeConfig.js';
import adminSidebarItems from "@/layouts/components/vx-sidebar/adminSidebarItems.js";
import authorSidebarItems from "@/layouts/components/vx-sidebar/authorSidebarItems.js";
import BackToTop from 'vue-backtotop'
import { updateSidebarWidth } from '../../store/actionType';
import { TOGGLE_IS_SIDEBAR_ACTIVE } from '../../store/mutationType';
export default {
    data() {
        return {
            navbarType: themeConfig.navbarType || 'floating',
            navbarColor: themeConfig.navbarColor || '#fff',
            footerType: themeConfig.footerType || 'static',
            routerTransition: themeConfig.routerTransition || 'none',
            isNavbarDark: false,
            routeTitle: this.$route.meta.pageTitle,
            // sidebarItems: adminSidebarItems,
            disableCustomizer: themeConfig.disableCustomizer,
            windowWidth: window.innerWidth, //width of windows
            hideScrollToTop: themeConfig.hideScrollToTop,
            disableThemeTour: themeConfig.disableThemeTour
        }
    },
    watch: {
        '$route'() {
            this.routeTitle = this.$route.meta.pageTitle;
        },
        isThemeDark(val) {
            if(this.navbarColor == "#fff" && val) {
                this.updateNavbarColor("#10163a")
            }else {
                this.updateNavbarColor("#fff")
            }
        },
    },
    computed: {
        permission() {
          return this.$store.getters.permission;
        },
        sidebarItems() {
          if(this.$store.getters.permission == 'superadmin' || this.$store.getters.permission == 'admin') {
            return adminSidebarItems;
          } else {
            return authorSidebarItems;
          }
        },
        isAppPage() {
            if(this.$route.path.includes('/apps/')) return true
            else return false
        },
        isThemeDark() { return this.$store.state.layout.theme == 'dark' },
        sidebarWidth() {
            return this.$store.state.layout.sidebarWidth;
        },
        bodyOverlay() {
            return this.$store.state.layout.bodyOverlay;
        },
        contentAreaClass() {
            if(this.sidebarWidth == "default") return "content-area-default"
            else if(this.sidebarWidth == "reduced") return "content-area-reduced"
            else if(this.sidebarWidth) return "content-area-full"
        },
        navbarClasses() {
            return {
                'navbar-hidden': this.navbarType == 'hidden',
                'navbar-sticky': this.navbarType == 'sticky',
                'navbar-static': this.navbarType == 'static',
                'navbar-floating': this.navbarType == 'floating',
            }
        },
        footerClasses() {
            return {
                'footer-hidden': this.footerType == 'hidden',
                'footer-sticky': this.footerType == 'sticky',
                'footer-static': this.footerType == 'static',
            }
        },
    },
    methods: {
        changeRouteTitle(title) {
            this.routeTitle = title;
        },
        updateNavbar(val) {
            if(val == 'static') this.updateNavbarColor("#fff")
            this.navbarType = val;
        },
        updateNavbarColor(val) {
            this.navbarColor = val;
            if(val == "#fff") this.isNavbarDark = false
            else this.isNavbarDark = true
        },
        updateFooter(val) {
            this.footerType = val;
        },
        updateRouterTransition(val) {
            this.routerTransition = val;
        },
        handleWindowResize(event) {
            this.windowWidth = event.currentTarget.innerWidth;
            this.setSidebarWidth();
        },
        setSidebarWidth() {
            if (this.windowWidth < 1200) {
                this.$store.commit(TOGGLE_IS_SIDEBAR_ACTIVE, false)
                this.$store.dispatch(updateSidebarWidth, 'no-sidebar')
                this.disableThemeTour = true;
            }
            else if(this.windowWidth < 1200) {
                this.$store.dispatch(updateSidebarWidth, 'reduced')
            }
            else {
                this.$store.commit(TOGGLE_IS_SIDEBAR_ACTIVE, true)
            }
        },
        toggleHideScrollToTop(val) {
            this.hideScrollToTop = val;
        }
    },
    components: {
        VxSidebar,
        TheNavbar,
        TheFooter,
        BackToTop
    },
    created() {
        this.setSidebarWidth();
        if(this.navbarColor == "#fff" && this.isThemeDark) {
            this.updateNavbarColor("#10163a")
        }else {
            this.updateNavbarColor(this.navbarColor)
        }
    }
}
</script>
