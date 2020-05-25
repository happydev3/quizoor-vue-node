<template>
  <section class="logging">
    <div class="logging__inner">
      <div class="tab">
        <router-link :to="'register'"><button class="tablinks" id="defaultOpenSignup">Sign Up</button></router-link>
        <router-link :to="'login'"><button class="tablinks" id="defaultOpenSignin">Log In</button></router-link>
      </div>
      <div id="signup" class="tabcontent" style="display: block;">
        <div class="row">
          <div class="col-100">
            <div class="box-container">
              <form id="formSignup" name="form" @submit.prevent="handleRegister">
                <div class="row">
                  <div class="col">
                    <div class="flex">
                      <div>
                        <label for="fname">First Name</label>
                        <input
                          v-model = "firstname"
                          v-validate = "'required|max:20'"
                          type="text"
                          id="fname"
                          class="fname firsti"
                          name="firstname"
                          placeholder
                        />
                        <div
                          v-if="submitted && errors.has('firstname')"
                          class="alert-danger"
                        >{{errors.first('firstname')}}</div>
                      </div>
                      <div>
                        <label for="lname">Last Name</label>
                        <input
                          v-model = "lastname"
                          v-validate = "'required|max:20'"
                          type="text"
                          id="lname"
                          class="fname"
                          name="lastname"
                          placeholder
                        />
                        <div
                          v-if="submitted && errors.has('lastname')"
                          class="alert-danger"
                        >{{errors.first('lastname')}}</div>
                      </div>
                    </div>
                    <label for="email">Email</label>
                    <input
                      v-model = "email"
                      v-validate = "'required|email|max:50'"
                      type="text"
                      id="email"
                      name="email"
                      placeholder
                      class="email"
                    />
                    <div
                      v-if="submitted && errors.has('email')"
                      class="alert-danger"
                    >{{errors.first('email')}}</div>
                    <div class="flex">
                      <div>
                        <label for="password">Password</label>
                        <input
                          v-model = "password"
                          v-validate = "'required|min:6|max:40'"
                          type="password"
                          class="firsti password"
                          id="password"
                          name="password"
                          ref="password"
                          placeholder
                        />
                        <div
                          v-if="submitted && errors.has('password')"
                          class="alert-danger"
                        >{{errors.first('password')}}</div>
                      </div>
                      <div>
                        <label for="confirmPassword">Confirm password</label>
                        <input
                          v-validate="'required|confirmed:password'"
                          type="password"
                          id="confirmPassword"
                          class="password"
                          name="confirmPassword"
                          placeholder
                        />
                        <div
                          v-if="submitted && errors.has('confirmPassword')"
                          class="alert-danger"
                        >{{errors.first('confirmPassword')}}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="creat-account">
                  <button>
                    Create an account
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="10"
                      viewBox="0 0 20 10"
                    >
                      <path
                        id="black-arrow"
                        fill="#ffffff"
                        d="M15.012,3.75H0v2.5H15.012V10L20,5,15.012,0Z"
                      />
                    </svg>
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
// import { mapState } from "vuex";
import { REGISTER } from '@/store/actionType';
export default {
  name: 'register',
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      submitted: false,
      successful: '',
      message: ''
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.initialState.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/admin');
    }
  },
  methods: {
    handleRegister() {
      let user = {
        firstname : this.firstname,
        lastname : this.lastname,
        email : this.email,
        password: this.password
      }
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch(REGISTER, user).then(
            res => {
              this.successful = true;
              if(res.token) {
                this.$vs.notify({ title:'Register successfully', text: 'WELCOME TO ALLQUIZZ', color:'success', position:'top-right' })
                if(this.$store.getters.permission == "superadmin" || this.$store.getters.permission == "admin") {
                    this.$router.push('/admin');
                  } else if (this.$store.getters.permission == "author") {
                    this.$router.push('/author');
                  } else if(this.$store.getters.permission == "user") {
                  this.$router.push('/');
                }
              } else {
                  this.$vs.notify({ title:'Register Error', text: 'Please check Input field', color:'danger', position:'top-right' })
              }
            }
          );
        }
      });
    }
  }
}
</script>
<style scoped>
  .alert-danger {
    color: red;
    padding-top: 5px;
  }
  .alert.alert-danger {
    border-radius: 3px;
    padding: 5px;
    margin-bottom: 5px;
    text-align: center;
    color: white;
    background-color: orangered;
  }
</style>
