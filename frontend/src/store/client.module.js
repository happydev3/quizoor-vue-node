import ClientService from '../services/client.service';

import {
  GETSUBJECTITEMS,
  GETLEVLEITEMS,
  GETTRACKITEMS,
  UPDATEQUIZITEM,
  GETESTITEM,
  GETALLSUBJECT,
  SEARCHSUBJECT
} from './actionType';

import {
  GETSUBJECTITEMSSUCCESS,
  GETLEVELITEMSSUCCESS,
  GETTRACKITEMSSUCCESS,
  UPDATEQUIZITEMSUCCESS,
  GETALLSUBJECTSUCCESS,
  SEARCHSUBJECTSUCCESS
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
  localeSubjectItems: [],
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
  },
  [GETALLSUBJECT](context, rdata) {
    return ClientService.getAllSubjectItems(rdata).then(
      res => {
        context.commit(GETALLSUBJECTSUCCESS, res);
      }
    )
  },
  [SEARCHSUBJECT](context, rdata) {
    console.log(rdata);
    return ClientService.searchSubject(rdata).then(
      res => {
        context.commit(SEARCHSUBJECTSUCCESS, res);
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
      state.chapterSummary = res.data.quizItems[0].chapterContent;
      state.chapterName = res.data.quizItems[0].chapterName;
    }
  },
  [UPDATEQUIZITEMSUCCESS](state, res) {
    state.quizItems = res.data.quizItems;
    state.chapterSummary = res.data.chapterItems.content;
    state.chapterName = res.data.chapterItems.name;
  },
  [GETALLSUBJECTSUCCESS](state, res) {
    state.localeSubjectItems = res.data;
  },
  [SEARCHSUBJECTSUCCESS](state, res) {
    state.subjectItems = res.data;
  }
}

export default {
  state,
  actions,
  mutations
}
