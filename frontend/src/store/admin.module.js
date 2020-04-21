import AdminService from '../services/admin.service';

import {
  REMOVEDATA,
  CHANGESTATUS,
  ADDLEVEL,
  GETLEVEL
} from './actionType';

import {
  GETLEVELSUCCESS,
  SUCCESSADDLEVEL,
  LOADING,
  // SUCCESSDELETE
} from './mutationType';

const user  = JSON.parse(localStorage.getItem('user'));

const state = {
  refresh: false,
  user: user,
  levels: [],
  popuplevelshow: false,
}

const actions = {
  [REMOVEDATA](context, rdata) {
    let id = rdata.id;
    let route = rdata.route;
    if(route == 'level') {
      return AdminService.removeLevel(id).then(
        res => {
          return res;
        },
        error => {
          return error;
        }
      )
    } else if(route == 'users') {
      return AdminService.removeUser(id).then(
        res => {
          return res;
        },
        error => {
          return error;
        }
      )
    }
  },
  [CHANGESTATUS](context, rdata) {
    let route = rdata.route;
    let data = {
      id: rdata.id,
      status: rdata.status
    }
    if(route == 'level') {
      return AdminService.updateStatuslevel(data).then(
        res => {
          return res
        },
        error => {
          return error;
        }
      )
    } else if(route == 'users') {
      return AdminService.updateStatusUser(data).then(
        res => {
          return res
        },
        error => {
          return error;
        }
      )
    }
  },
  [GETLEVEL](context) {
    let locations = []
    state.user.user.locations.map(function(item) {
      locations.push(item.value);
    })
    return AdminService.getLevel(locations).then(
      res => {
        context.commit(GETLEVELSUCCESS, res.data)
        return res;
      },
      error => {
        console.log(error);
      }
    )
  },
  [ADDLEVEL](context, rdata) {
    let levelData = {
      name: rdata.name,
      location: rdata.location,
      userID: rdata.userID
    }
    return AdminService.addLevel(levelData).then(
      res => {
        context.commit(SUCCESSADDLEVEL, res);
      }
    )
  }
}

const mutations = {
  [LOADING](state) {
    state.user = user;
  },
  [SUCCESSADDLEVEL](state) {
      state.refresh = true;
  },
  [GETLEVELSUCCESS](state, res) {
      state.levels = res;
  }
}

export default {
  state,
  actions,
  mutations
}
