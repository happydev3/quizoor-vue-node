import ClientService from '../services/client.service';

import {
  GETSUBJECTITEMS,
  GETLEVLEITEMS,
  GETTRACKITEMS,
  UPDATEQUIZITEM,
  GETESTITEM
} from './actionType';

import {
  GETSUBJECTITEMSSUCCESS,
  GETLEVELITEMSSUCCESS,
  GETTRACKITEMSSUCCESS,
  UPDATEQUIZITEMSUCCESS,
  // GETESTITEMSUCCESS
} from './mutationType';
const user  = JSON.parse(localStorage.getItem('user'));

const state = {
  refresh: false,
  user: user,
  levelItems: [],
  categories: [],
  chapterItems: [],
  subjectItems: [],
  quizItems: [],
  subjectInformation: [],
  chapterSummary: [],
  chapterName: '',
  // getTestItems: Object
}

const actions = {
  [GETSUBJECTITEMS](context, locale) {
    return ClientService.getSubjects(locale).then(
      res => {
        context.commit(GETSUBJECTITEMSSUCCESS, res);
      }
    )
  },
  [GETLEVLEITEMS](context, locale) {
    return ClientService.getSearchValue(locale).then(
      res => {
        context.commit(GETLEVELITEMSSUCCESS, res);
      }
    )
  },
  [GETTRACKITEMS](context, rdata) {
    console.log(rdata);
    return ClientService.getSearchTrakItems(rdata).then(
      res => {
        context.commit(GETTRACKITEMSSUCCESS, res);
      }
    )
  },
  [UPDATEQUIZITEM](context, rdata) {
    return ClientService.updateQuizItem(rdata).then(
      res => {
        context.commit(UPDATEQUIZITEMSUCCESS, res);
      }
    )
  },
  [GETESTITEM](context, rdata) {
    return ClientService.getTestItem(rdata).then(
      res => {
        // context.commit(GETESTITEMSUCCESS, res);
        return res;
      }
    )
  }
}

const mutations = {
  [GETSUBJECTITEMSSUCCESS](state, res) {
    state.subjectItems = res.data;
  },
  [GETLEVELITEMSSUCCESS](state, res) {
    state.levelItems = res.data;
  },
  [GETTRACKITEMSSUCCESS](state,res) {
    state.subjectInformation = res.data.subjectInformation
    state.chapterItems = res.data.chapterItems;
    if(res.data.quizItems.length == 0) {
      state.quizItems = ''; 
      state.chapterSummary = '';
      state.chapterName = '';
    } else if(res.data.quizItems.length > 0) {
      state.quizItems = res.data.quizItems;
      state.chapterSummary = res.data.quizItems[0].chapter.content;
      state.chapterName = res.data.quizItems[0].chapter.name;
    }
  },
  [UPDATEQUIZITEMSUCCESS](state, res) {
    state.quizItems = res.data.quizItems;
    state.chapterSummary = res.data.chapterItems.content;
    state.chapterName = res.data.chapterItems.name;
  },
  // [GETESTITEMSUCCESS](state, res) {
  //   state.getTestItems = res.data;
  // }
}

export default {
  state,
  actions,
  mutations
}