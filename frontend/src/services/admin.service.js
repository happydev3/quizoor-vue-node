import axios from 'axios';
import { API_URL } from '../services/config';
import authHeader from './auth.header';
// const chalk  = require('chalk');

class AdminService {

  //Level Management
  getLevel(rdata) {
    return axios.get(API_URL + 'getLevel/' + rdata.userID, { headers: authHeader() })
    .then(
      res => {
        return res;
      },
      error => {
        console.log(error);
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
  getAllUser() {
    return axios.get(API_URL + 'getAllUser', { headers: authHeader() }).then(
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
  updateUser(rdata) {
    console.log('_+_+_+_+_+_+__+_+_+_+_+_+_+_+_+_+_',rdata);
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
}

export default new AdminService();
