import axios from 'axios';
import { API_URL } from '../services/config';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password
      })
      .then(
          response => {
            if (response && response.data && response.data.token) {
              localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response;
          },
          error => {
            console.log('_______________________err_____________________________',error)
          }
      )
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'register', {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password
    })
    .then(
        response => {
            console.log(response)
            if (response && response.data && response.data.token) {
              localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response;
        },
        error => {
          console.log('_______________________err_____________________________',error)
        }
    )
  }
}

export default new AuthService();
