import axios from 'axios';
import { API_URL } from '../services/config';
import authHeader from './auth.header';
// const chalk  = require('chalk');

class AdminService {

  //Level Management
  getLevel(user) {
    return axios.get(API_URL + 'getLevel/' + user, { headers: authHeader() })
    .then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  addLevel(levelData) {
    return axios.post(API_URL + 'addLevel', {
      name: levelData.name,
      location: levelData.location,
      userID: levelData.userID
    }, { headers: authHeader() })
    .then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  removeLevel(id) {
    return axios.post(API_URL + 'removeLevel', {
      id: id
    }, { headers: authHeader() })
    .then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  updateStatuslevel(data) {
    return axios.post(API_URL + 'changeStatusLevel', {
      id: data.id,
      status: data.status
    }, { headers: authHeader() })
    .then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  getLevelById(id) {
    return axios.get(API_URL + 'getLevelById/' + id, { headers: authHeader() }).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  updateLevelById(rdata) {
    return axios.post(API_URL + 'updateLevelById', {
      id: rdata.id,
      name: rdata.name
    }, { headers: authHeader() }).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  multipleLevelDelete(list) {
    return axios.post(API_URL + "multipleDeleteLevel", {list: list}, { headers: authHeader() }).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }

  //User Management
  getAllUser(id) {
    return axios.get(API_URL + 'getAllUser/' + id, { headers: authHeader() }).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  updateStatusUser(data) {
    return axios.post(API_URL + 'changeStatusUser', {
      id: data.id,
      status: data.status
    }, { headers: authHeader() })
    .then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  removeUser(id) {
    return axios.post(API_URL + 'removeUser', {
      id: id
    }, { headers: authHeader() })
    .then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  multipleUserDelete(list) {
    return axios.post(API_URL + "multipleDeleteUser", {list: list}, { headers: authHeader() }).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  getUserById(id) {
    return axios.get(API_URL + 'getUserById/' + id, { headers: authHeader() }).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  addUser(rdata) {
    return axios.post(API_URL + 'addUser', {
      firstname: rdata.firstname,
      lastname: rdata.lastname,
      email: rdata.email,
      password: rdata.password,
      role: rdata.role,
      location: rdata.location
    }, { headers: authHeader() }).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  updateUser(rdata) {
    return axios.post(API_URL + 'updateUser', {
      userID: rdata.userID,
      firstname: rdata.firstname,
      lastname: rdata.lastname,
      email: rdata.email,
      password: rdata.password,
      status: rdata.status,
      role: rdata.role,
      location: rdata.location
    }, { headers: authHeader() }).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }

  //category
  addCategory(rdata) {
    return axios.post(API_URL + 'addCategory', {
      name: rdata.name,
      levelID: rdata.levelID,
      userID: rdata.userID
    }, { headers: authHeader() }).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    ).catch(
      error => {
        return error;
      }
    )
  }
  getCategory(rdata) {
    let id = rdata;
    return axios.get(API_URL + 'getCategory/' + id, { headers: authHeader() }).then(
      res => {
        return res;
      }
    ).catch (error => {
      return error;
    })
  }
  updateStatusCategory(data) {
    return axios.post(API_URL + 'changeStatusCatetory', {
      id: data.id,
      status: data.status
    }, { headers: authHeader() })
    .then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  removeCategory(id) {
    return axios.post(API_URL + 'removeCategory', {
      id: id
    }, { headers: authHeader() })
    .then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  multipleCategoryDelete(list) {
    return axios.post(API_URL + "multipleCategoryDelete", {list: list}, { headers: authHeader() }).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  getCategoryById(id) {
    return axios.get(API_URL + 'getCategoryById/' + id, { headers: authHeader() }).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  editCategory(rdata) {
    return axios.post(API_URL + 'editCategory', {
      categoryID: rdata.categoryID,
      name: rdata.name,
      level: rdata.level
    }, { headers: authHeader() }).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }


  //subjects
  getCategorybySelectedLevel(rdata) {
    return axios.get(API_URL + 'getCategorybySelectedLevel/' + rdata, { headers: authHeader() }).then(
      res => {
        return res;
      }
    ).catch(
      error => {
        return error;
      }
    )
  }
  addSubject(rdata) {
    return axios.post(API_URL + 'addSubject', {
      name: rdata.name,
      levelID: rdata.levelID,
      categoryID: rdata.categoryID,
      userID: rdata.userID
    }, { headers: authHeader() }).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    ).catch(
      error => {
        return error;
      }
    )
  }
  getSubject(rdata) {
    let id = rdata;
    return axios.get(API_URL + 'getSubject/' + id, { headers: authHeader() }).then(
      res => {
        return res;
      }
    ).catch (error => {
      return error;
    })
  }
  updateStatusSubject(data) {
    return axios.post(API_URL + 'updateStatusSubject', {
      id: data.id,
      status: data.status
    }, { headers: authHeader() })
    .then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  multipleSubjectDelete(list) {
    return axios.post(API_URL + "multipleSubjectDelete", {list: list}, { headers: authHeader() }).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  removeSubject(id) {
    return axios.post(API_URL + 'removeSubject', {
      id: id
    }, { headers: authHeader() })
    .then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  getSubjectById(id) {
    return axios.get(API_URL + 'getSubjectById/' + id, { headers: authHeader() }).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  editSubject(rdata) {
    return axios.post(API_URL + 'editSubject', {
      subjectID: rdata.subjectID,
      name: rdata.name,
      levelID: rdata.levelID,
      userID: rdata.userID,
      categoryID: rdata.categoryID
    }, { headers: authHeader() }).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }

  //chapter
  getSubjectbySelectedCategory(rdata) {
    return axios.get(API_URL + 'getSubjectbySelectedCategory/' + rdata, { headers: authHeader() }).then(
      res => {
        return res;
      }
    ).catch(
      error => {
        return error;
      }
    )
  }
  addChapter(rdata) {
    return axios.post(API_URL + 'addChapter', {
      name: rdata.name,
      levelID: rdata.levelID,
      categoryID: rdata.categoryID,
      subjectID: rdata.subjectID,
      userID: rdata.userID,
      content: rdata.content
    }, { headers: authHeader() }).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    ).catch(
      error => {
        return error;
      }
    )
  }
  getChapter(rdata) {
    let id = rdata;
    return axios.get(API_URL + 'getChapter/' + id, { headers: authHeader() }).then(
      res => {
        return res;
      }
    ).catch (error => {
      return error;
    })
  }
  updateStatusChapter(data) {
    return axios.post(API_URL + 'updateStatusChapter', {
      id: data.id,
      status: data.status
    }, { headers: authHeader() })
    .then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  removeChapter(id) {
    return axios.post(API_URL + 'removeChapter', {
      id: id
    }, { headers: authHeader() })
    .then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  multipleChapterDelete(list) {
    return axios.post(API_URL + "multipleChapterDelete", {list: list}, { headers: authHeader() }).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  getChapterById(id) {
    return axios.get(API_URL + 'getChapterById/' + id, { headers: authHeader() }).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  editChapter(rdata) {
    return axios.post(API_URL + 'editChapter', {
      chapterID: rdata.chapterID,
      name: rdata.name,
      levelID: rdata.levelID,
      userID: rdata.userID,
      categoryID: rdata.categoryID,
      subjectID: rdata.subjectID,
      content: rdata.content
    }, { headers: authHeader() }).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }

  //quiz
  getChapterbySelectedSubject(rdata) {
    return axios.get(API_URL + 'getChapterbySelectedSubject/' + rdata, { headers: authHeader() }).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  addQuiz(rdata) {
    return axios.post(API_URL + 'addQuiz', {
      user: rdata.user,
      level : rdata.level,
      category : rdata.category,
      subject : rdata.subject,
      chapter : rdata.chapter,
      name : rdata.name,
      difficulty : rdata.difficulty,
      questions : rdata.questions
    }, { headers: authHeader() }).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  getQuiz(rdata) {
    let id = rdata;
    return axios.get(API_URL + 'getQuiz/' + id, { headers: authHeader() }).then(
      res => {
        return res;
      }
    ).catch (error => {
      return error;
    })
  }
  getQuizDeactivated(rdata) {
    let id = rdata;
    return axios.get(API_URL + 'getQuizDeactivated/' + id, { headers: authHeader() }).then(
      res => {
        return res;
      }
    ).catch (error => {
      return error;
    })
  }
  getQuizActivated(rdata) {
    let id = rdata;
    return axios.get(API_URL + 'getQuizActivated/' + id, { headers: authHeader() }).then(
      res => {
        return res;
      }
    ).catch (error => {
      return error;
    })
  }

  getQuizUnchecked(rdata) {
    let id = rdata;
    return axios.get(API_URL + 'getQuizUnchecked/' + id, { headers: authHeader() }).then(
      res => {
        return res;
      }
    ).catch (error => {
      return error;
    })
  }
  updateStatusQuiz(data) {
    return axios.post(API_URL + 'updateStatusQuiz', {
      id: data.id,
      status: data.status
    }, { headers: authHeader() })
    .then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  multipleQuizDelete(list) {
    return axios.post(API_URL + "multipleQuizDelete", {list: list}, { headers: authHeader() }).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  removeQuiz(id) {
    return axios.post(API_URL + 'removeQuiz', {
      id: id
    }, { headers: authHeader() })
    .then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  getQuizById(id) {
    return axios.get(API_URL + 'getQuizById/' + id, { headers: authHeader() }).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  checkVerify(id) {
    return axios.get(API_URL + 'checkVerify/' + id, { headers :authHeader() }).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  editQuiz(rdata) {
    return axios.post(API_URL + 'editQuiz', {
      quizID: rdata.quizID,
      user: rdata.user,
      level : rdata.level,
      category : rdata.category,
      subject : rdata.subject,
      chapter : rdata.chapter,
      name : rdata.name,
      difficulty : rdata.difficulty,
      questions : rdata.questions
    }, { headers: authHeader() }).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }

  //profile

  changeName(rdata) {
    return axios.post(API_URL + 'changeName', {
      id : rdata.id,
      firstname: rdata.firstname,
      lastname: rdata.lastname
    }, { headers: authHeader() }).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }

  changePassword(rdata) {
    return axios.post(API_URL + 'changePassword', {
      id :rdata.id,
      newPassword: rdata.newPassword
    }, { headers: authHeader() }).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
}

export default new AdminService();
