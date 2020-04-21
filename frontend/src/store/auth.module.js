import AuthService from '../services/auth.service';
import {
  LOGIN,
  REGISTER,
  LOGOUT
} from './actionType';

import {
  SUCCESSLOGIN,
  LOGINFAILURE,
  LOGOUTSUCCCESS,
  SUCCESSREGISTER,
  REGISTERFAILURE
} from './mutationType';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

const state = {
  initialState
}
const actions = {
  [LOGIN](context, user) {
    return AuthService.login(user).then(
      res => {
        if(res) {
          context.commit(SUCCESSLOGIN, res);
          return Promise.resolve(res.data);
        } else {
          context.commit(LOGINFAILURE);
        }
      },
      error => {
        context.commit(LOGINFAILURE);
        return Promise.reject(error);
      }
    );
  },
  [LOGOUT](context) {
    AuthService.logout();
    context.commit(LOGOUTSUCCCESS);
  },
  [REGISTER](context, user) {
    return AuthService.register(user).then(
      res => {
        if (res) {
          context.commit(SUCCESSREGISTER, res);
          return Promise.resolve(res.data);
        } else {
          context.commit(REGISTERFAILURE);
        }
      },
      error => {
        context.commit(REGISTERFAILURE);
        return Promise.reject(error);
      }
    );
  }
}
const mutations = {
  [SUCCESSLOGIN](state, user) {
    state.initialState.status.loggedIn = true;
    state.initialState.user = user.data;
  },
  [LOGINFAILURE](state) {
    state.initialState.status.loggedIn = false;
    state.initialState.user = null;
  },
  [LOGOUTSUCCCESS](state) {
    state.initialState.status.loggedIn = false;
    state.initialState.user = null;
  },
  [SUCCESSREGISTER](state, user) {
    state.initialState.status.loggedIn = true;
    state.initialState.user = user.data;
  },
  [REGISTERFAILURE](state) {
    state.initialState.status.loggedIn = false;
  }
}

const getters = {
  permission(state) {
    return state.initialState.user.user.role;
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
