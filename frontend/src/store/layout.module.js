import navbarSearchAndPinList from '../layouts/components/navbarSearchAndPinList.js'
import themeConfig from '@/../themeConfig.js'
import colors from '@/../themeConfig.js'
import {
  updateSidebarWidth,
  toggleContentOverlay,
  updateTheme,
  updateWindowWidth,
  updateStarredPage,
  arrangeStarredPagesLimited,
  arrangeStarredPagesMore
} from './actionType'

import {
  UPDATE_SIDEBAR_WIDTH,
  UPDATE_SIDEBAR_ITEMS_MIN,
  TOGGLE_REDUCE_BUTTON,
  TOGGLE_CONTENT_OVERLAY,
  TOGGLE_IS_SIDEBAR_ACTIVE,
  UPDATE_THEME,
  UPDATE_WINDOW_BREAKPOINT,
  UPDATE_PRIMARY_COLOR,
  UPDATE_WINDOW_WIDTH,
  UPDATE_STARRED_PAGE,
  ARRANGE_STARRED_PAGES_LIMITED,
  ARRANGE_STARRED_PAGES_MORE
} from './mutationType'

const state = {
  isSidebarActive: true,
  breakpoint: null,
  sidebarWidth: "default",
  reduceButton: themeConfig.sidebarCollapsed,
  bodyOverlay: false,
  sidebarItemsMin: false,
  theme: themeConfig.theme || 'light',
  navbarSearchAndPinList: navbarSearchAndPinList,
  themePrimaryColor: colors.primary,
  starredPages: navbarSearchAndPinList.data.filter((page) => page.highlightAction),
  userRole: null,
  windowWidth: null,
}

const actions = {

  [updateSidebarWidth]({ commit }, width) {
    commit('UPDATE_SIDEBAR_WIDTH', width);
  },
  [toggleContentOverlay]({ commit }) {
    commit('TOGGLE_CONTENT_OVERLAY');
  },
  [updateTheme]({ commit }, val) {
    commit('UPDATE_THEME', val);
  },
  [updateWindowWidth]({ commit }, width) {
    commit('UPDATE_WINDOW_WIDTH', width);
  },


  // ////////////////////////////////////////////
  // COMPONENT
  // ////////////////////////////////////////////

  // VxAutoSuggest
  [updateStarredPage]({ commit }, payload) {
    commit('UPDATE_STARRED_PAGE', payload)
  },

  //  The Navbar
  [arrangeStarredPagesLimited]({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_LIMITED', list)
  },
  [arrangeStarredPagesMore]({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_MORE', list)
  },
}

const mutations = {

  // ////////////////////////////////////////////
  // SIDEBAR & UI UX
  // ////////////////////////////////////////////

  [UPDATE_SIDEBAR_WIDTH](state, width) {
      state.sidebarWidth = width;
  },
  [UPDATE_SIDEBAR_ITEMS_MIN](state, val) {
      state.sidebarItemsMin = val;
  },
  [TOGGLE_REDUCE_BUTTON](state, val) {
      state.reduceButton = val;
  },
  [TOGGLE_CONTENT_OVERLAY](state, val) {
      state.bodyOverlay = val;
  },
  [TOGGLE_IS_SIDEBAR_ACTIVE](state, value) {
      state.isSidebarActive = value;
  },
  [UPDATE_THEME](state, val) {
      state.theme = val;
  },
  [UPDATE_WINDOW_BREAKPOINT](state, val) {
      state.breakpoint = val;
  },
  [UPDATE_PRIMARY_COLOR](state, val) {
      state.themePrimaryColor = val;
  },
  [UPDATE_WINDOW_WIDTH](state, width) {
    state.windowWidth = width;
  },


  // ////////////////////////////////////////////
  // COMPONENT
  // ////////////////////////////////////////////

  // VxAutoSuggest
  [UPDATE_STARRED_PAGE](state, payload) {
      // find item index in search list state
      const index = state.navbarSearchAndPinList.data.findIndex((item) => item.index == payload.index)
      // update the main list
      state.navbarSearchAndPinList.data[index].highlightAction = payload.val;

      // if val is true add it to starred else remove
      if(payload.val) {
          state.starredPages.push(state.navbarSearchAndPinList.data[index])
      }else {
          // find item index from starred pages
          const index = state.starredPages.findIndex((item) => item.index == payload.index)
          // remove item using index
          state.starredPages.splice(index, 1);
      }
  },

  // The Navbar
  [ARRANGE_STARRED_PAGES_LIMITED](state, list) {
      const starredPagesMore = state.starredPages.slice(10);
      state.starredPages = list.concat(starredPagesMore);
  },
  [ARRANGE_STARRED_PAGES_MORE](state, list) {
      let downToUp = false
      let lastItemInStarredLimited = state.starredPages[10];
      const starredPagesLimited = state.starredPages.slice(0, 10);
      state.starredPages = starredPagesLimited.concat(list);

      state.starredPages.slice(0,10).map((i) => {
          if(list.indexOf(i) > -1) downToUp = true
      })
      if(!downToUp) {
          state.starredPages.splice(10, 0, lastItemInStarredLimited);
      }
  },
}

const getters = {

	// COMPONENT
		// vx-autosuggest
	// starredPages: state => state.navbarSearchAndPinList.data.filter((page) => page.highlightAction),
}

export default {
  state,
  getters,
  actions,
  mutations,
}

