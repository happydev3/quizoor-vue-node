<template>
<vs-card class="add-form">
  <div slot="header">
    <h3 v-if="routename == 'usersEdit'">
      User Edit Form
    </h3>
    <h3 v-if="routename == 'usersAdd'">
      User Add Form
    </h3>
  </div>
  <div class="vx-row">
    <div class="vx-col sm:w-1/2 w-full mb-2">
      <vs-input class="w-full" label-placeholder="First Name"  v-validate="'required'" name="firstname" v-model="firstname" />
      <span class="text-danger text-sm"  v-show="errors.has('firstname')">{{ errors.first('firstname') }}</span>
    </div>
    <div class="vx-col sm:w-1/2 w-full mb-2">
      <vs-input class="w-full" label-placeholder="Last Name" v-validate="'required'" name="lastname" v-model="lastname" />
      <span class="text-danger text-sm"  v-show="errors.has('lastname')">{{ errors.first('lastname') }}</span>
    </div>
  </div>
  <div class="vx-row">
    <div class="vx-col sm:w-1/2 w-full mb-2">
      <vs-input class="w-full" label-placeholder="Email" v-validate="'required|email'" name="email" v-model="email" v-if="routename == 'usersEdit'" disabled/>
      <vs-input class="w-full" label-placeholder="Email" v-validate="'required|email'" name="email" v-model="email" v-if="routename == 'usersAdd'"/>
      <span class="text-danger text-sm"  v-show="errors.has('email')">{{ errors.first('email') }}</span>
    </div>
    <div class="vx-col sm:w-1/2 w-full mb-2">
      <vs-input class="w-full" label-placeholder="Password" v-validate="'required|min:6|max:10'" name="password" v-model="password" />
      <span class="text-danger text-sm"  v-show="errors.has('password')">{{ errors.first('password') }}</span>
    </div>
  </div>
  <div class="vx-row">
    <div class="vx-col sm:w-1/2 w-full mb-2">
      <vs-select v-validate="'required'" v-model="role" name="role" label="Role" class="w-full">
        <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in roles" />
      </vs-select>
      <span class="text-danger text-sm"  v-show="errors.has('role')">{{ errors.first('role') }}</span>
    </div>
    <div class="vx-col sm:w-1/2 w-full mb-2">
      <vs-select v-validate="'required'" v-model="location" name="location" multiple autocomplete label="Location" class="w-full">
        <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in locations" />
      </vs-select>
      <span class="text-danger text-sm"  v-show="errors.has('location')">{{ errors.first('location') }}</span>
    </div>
  </div>
  <div class="vx-row">
    <div class="vx-col w-full">
      <vs-button class="mr-3 mb-2" @click.prevent="submitForm">Save</vs-button>
      <vs-button color="warning" type="border" class="mb-2" @click="reset">Reset</vs-button>
    </div>
  </div>
</vs-card>
</template>
<script>
import AdminService from '@/services/admin.service.js'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      userID: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      role: "",
      status: "",
      roles: [
        { text: "Super Admin", value: 'superadmin' },
        { text: "Admin", value: 'admin' },
        { text: "Author", value: 'author' },
        { text: "User", value: 'user' },
      ],
      location: [],
    }
  },
  computed: {
    ...mapState({
      locations: state => state.auth.initialState.user.user.locations
    }),
    routename() {
      return this.$router.currentRoute.name
    }
  },
  created() {
    if (this.routename == 'usersEdit') {
      const id = this.$router.currentRoute.params.id;
      return AdminService.getUserById(id).then(
        res => {
          this.userID = res.data._id
          this.firstname = res.data.firstname;
          this.lastname = res.data.lastname;
          this.email = res.data.email;
          this.role = res.data.role;
          this.status = res.data.status;
          console.log(res);
        },
        error => {
          console.log(error)
        }
      )
    }
  },
  methods: {
    submitForm() {
      this.$validator.validateAll().then(result => {
        if (result) {
          if (this.routename == 'usersEdit') {
              let rdata = {}
              rdata.userID = this.userID;
              rdata.firstname = this.firstname;
              rdata.lastname = this.lastname;
              rdata.email = this.email;
              rdata.password = this.password;
              rdata.role = this.role;
              rdata.status = this.status;
              const templocation = [];
              for(let i =0; i < this.location.length; i++) {
                let item = this.location[i];
                if (item == 'en') {
                  templocation.push({text: 'English', value: 'en'})
                } else if(item == 'fr') {
                  templocation.push({text: 'French', value: 'fr'})
                } else if(item == 'de') {
                  templocation.push({text: 'German', value: 'de'})
                } else if(item == 'pt') {
                  templocation.push({text: 'Portugese', value: 'pt'})
                }
            }
            rdata.location = templocation;
            return AdminService.updateUser(rdata).then(
              res => {
                if(res.data.message == 'Updated successfully') {
                    this.$vs.notify({ title: res.data.message, color:'success', position:'top-right' });
                    setTimeout(() => { this.$router.history.push('/admin/users') }, 500);
                }
                console.log(res);
              },
              error => {
                return error;
              }
            )
          } else if (this.routename == 'usersAdd') {
              let rdata = {}
              rdata.firstname = this.firstname;
              rdata.lastname = this.lastname;
              rdata.email = this.email;
              rdata.password = this.password;
              rdata.role = this.role;
              const templocation = [];
              for(let i =0; i < this.location.length; i++) {
                let item = this.location[i];
                if (item == 'en') {
                  templocation.push({text: 'English', value: 'en'})
                } else if(item == 'fr') {
                  templocation.push({text: 'French', value: 'fr'})
                } else if(item == 'de') {
                  templocation.push({text: 'German', value: 'de'})
                } else if(item == 'pt') {
                  templocation.push({text: 'Portugese', value: 'pt'})
                }
            }
            rdata.location = templocation;
            console.log(rdata);
            return AdminService.addUser(rdata).then(
              res => {
                if(res.data.message == 'Added successfully') {
                    this.$vs.notify({ title: res.data.message, color:'success', position:'top-right' });
                    setTimeout(() => { this.$router.history.push('/admin/users') }, 500);
                }
                console.log(res);
              },
              error => {
                return error;
              }
            )
          }
        } else {
          // form have errors
        }
      })
    },
    reset() {
      this.firstname = '';
      this.lastname = '';
      this.email = '';
      this.password = '';
      this.role = '';
      this.location  = '';
    }
  },
}
</script>
<style lang="scss">
@import "@/assets/scss/custom/table.scss"
</style>

