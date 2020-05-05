import AdminService from '../services/admin.service';

import {
  REMOVEDATA,
  CHANGESTATUS,
  ADDLEVEL,
  GETLEVEL,
  LEVELSELECT,
  CATEGORYSELECT,
  SUBJECTSELECT,
} from './actionType';

import {
  GETLEVELSUCCESS,
  SUCCESSADDLEVEL,
  LOADING,
  // SUCCESSDELETE
} from './mutationType';
import adminService from '../services/admin.service';

const user  = JSON.parse(localStorage.getItem('user'));

const state = {
  refresh: false,
  user: user,
  levels: [],
  categories: [],
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
    } else if(route == 'categories') {
      return AdminService.removeCategory(id).then(
        res => {
          return res;
        },
        error => {
          return error;
        }
      )
    } else if(route == 'subjects') {
      return AdminService.removeSubject(id).then(
        res => {
          return res;
        },
        error => {
          return error;
        }
      )
    } else if(route == 'chapters') {
      return AdminService.removeChapter(id).then(
        res => {
          return res;
        },
        error => {
          return error;
        }
      )
    } else if(route == 'quizz-all' || route == 'quizz-activated' || route == 'quizz-deactivated' || route == 'quizz-unchecked') {
      return AdminService.removeQuiz(id).then(
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
          return res;
        },
        error => {
          return error;
        }
      )
    } else if(route == 'users') {
      return AdminService.updateStatusUser(data).then(
        res => {
          return res;
        },
        error => {
          return error;
        }
      )
    } else if(route == 'categories') {
      return AdminService.updateStatusCategory(data).then(
        res => {
          return res;
        },
        error => {
          return error;
        }
      )
    } else if(route == 'subjects') {
      return AdminService.updateStatusSubject(data).then(
        res => {
          return res;
        },
        error => {
          return error;
        }
      )
    } else if(route == 'chapters') {
      return AdminService.updateStatusChapter(data).then(
        res => {
          return res;
        },
        error => {
          return error;
        }
      )
    } else if(route == 'quizz-all' || route == 'quizz-activated' || route == 'quizz-deactivated' || route == 'quizz-unchecked') {
      return adminService.updateStatusQuiz(data).then(
        res => {
          return res;
        },
        error =>{
          return error;
        }
      )
    }
  },
  [GETLEVEL](context) {
    // let locations = []
    // state.user.user.locations.map(function(item) {
    //   locations.push(item.value);
    // })
    let user = state.user.user._id
    return AdminService.getLevel(user).then(
      res => {
        context.commit(GETLEVELSUCCESS, res.data)
        return res;
      },
      error => {
        return error;
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
        return res;
      }
    )
  },
  [LEVELSELECT](context, rdata) {
    return adminService.getCategorybySelectedLevel(rdata).then(
      res => {
        return res;
      }
    ).catch(
      error => {
        return error;
      }
    )
  },
  [CATEGORYSELECT](context, rdata) {
    return adminService.getSubjectbySelectedCategory(rdata).then(
      res => {
        return res;
      }
    ).catch(
      error => {
        return error;
      }
    )
  },
  [SUBJECTSELECT](context, rdata) {
    return adminService.getChapterbySelectedSubject(rdata).then(
      res => {
        return res;
      },
      error => {
        return error;
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
