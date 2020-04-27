import axios from 'axios';
import { API_URL } from '../services/config';
import authHeader from './auth.header';

class ClientService {
  getSearchValue(rdata) {
    let location = rdata;
    console.log(location);
    return axios.get(API_URL + 'getSearchValue/' + location).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  getSearchCategory(rdata){
    let levelID = rdata;
    console.log(levelID)
    return axios.get(API_URL + 'getSearchCategory/' + levelID).then(
      res => {
        console.log(res);
        return res;
      },
      error => {
        return error;
      }
    )
  }
  getSearchSubject(rdata) {
    let categoryID = rdata;
    console.log(categoryID);
    return axios.get(API_URL + 'getSearchSubject/' + categoryID).then(
      res => {
        console.log(res);
        return res;
      },
      error => {
        return error;
      }
    )
  }
  getSubjects(rdata) {
    let location = rdata;
    return axios.get(API_URL + 'getSubjects/' + location).then(
      res => {
        return res;
      },
      error => {
        return error;
      }
    )
  }
  getSearchTrakItems(rdata) {
    return axios.get(API_URL + 'getSearchTrakItems/' + rdata, { headers: authHeader()} ).then(
      res => {
        console.log(res);
        return res;
      },
      error => {
        return error;
      }
    )
  }

  updateQuizItem(rdata) {
    return axios.get(API_URL + 'updateQuizItem/' + rdata, { headers: authHeader() }).then(
      res => {
        console.log(res);
        return res;
      },
      error => {
        return error; 
      }
    )
  }

  getTestItem(rdata) {
    return axios.get(API_URL + 'getTestItem/' + rdata, { headers: authHeader() }).then(
      res => {
        console.log(res);
        return res;
      },
      error => {
        return error;
      }
    )
  }
}
export default new ClientService();
