<template>
  <section class="logging">
    <div class="logging__inner">
      <div class="tab">
        <router-link :to="'register'"><button class="tablinks" id="defaultOpenSignup">Sign Up</button></router-link>
        <router-link :to="'login'"><button class="tablinks" id="defaultOpenSignin">Log In</button></router-link>
      </div>

      <div id="signin" class="tabcontent" style="display: block;">
        <div class="row">
          <div class="col-100">
            <div class="box-container">
              <form name="form" @submit.prevent="handleLogin">
                <div class="row">
                  <div class="col">
                    <div class="top-social">
                      <a class="google-ico" href="/">Sign Up with Google</a>
                      <a class="facebook-ico" href="/">Sign Up with Facebook</a>
                    </div>

                    <label for="email">Email</label>
                    <input
                      v-model= "email"
                      v-validate="'required'"
                      type="text"
                      id="email"
                      name="email"
                      placeholder
                      class="email"
                    />
                    <div
                      v-if="errors.has('email')"
                      class="alert-danger"
                      role="alert"
                    >Email is required!
                    </div>
                    <div class="passign">
                      <label for="password">Password</label>
                      <input
                        v-model= "password"
                        v-validate="'required'"
                        type="password"
                        class="firsti password"
                        id="password"
                        name="password"
                        placeholder
                      />
                      <div
                        v-if="errors.has('password')"
                        class="alert-danger"
                        role="alert"
                      >Password is required!</div>
                    </div>
                  </div>
                </div>
                <div class="forgot">
                  <a href="/ResetPassword">Forgot password ?</a>
                </div>
                <div class="creat-account">
                  <button>
                    Let me in
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
import { LOGIN } from '@/store/actionType';
export default {
  name: 'Login',
  data() {
    return {
      message: '',
      loading: false,
      email: '',
      password: '',
      successful: false
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
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.email && this.password) {
          let user = {
            email: this.email,
            password: this.password
          }
          this.$store.dispatch(LOGIN, user).then(
            res => {
              this.successful = true;
              if(res && res.token) {
                this.$vs.notify({ title:'Login successfully', text: 'Welcome to Quizoor', color:'success', position:'top-right' })
                console.log('this.$store.getters.permission',this.$store.getters.permission)
                if(this.$store.getters.permission == "superadmin" || this.$store.getters.permission == "admin") {
                    this.$router.push('/admin');
                  } else if (this.$store.getters.permission == "author") {
                    this.$router.push('/author');
                  } else if(this.$store.getters.permission == "user") {
                  this.$router.push('/');
                }
              } else {
                this.$vs.notify({ title:'Login Valid Error', text: 'Please check Input field', color:'danger', position:'top-right' })
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
