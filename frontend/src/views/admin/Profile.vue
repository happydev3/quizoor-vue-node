<template>
  <vs-row vs-w="12" vs-align="flex-start">
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="6" vs-sm="12" vs-xs="12" >
      <vs-card :style="{padding: '10px'}">
          <div slot="header">
            <h3>
              Name Change
            </h3>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/5 w-full">
              <span>First Name</span>
            </div>
            <div class="vx-col sm:w-4/5 w-full">
              <vs-input class="w-full" v-model="firstname" />
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/5 w-full">
              <span>Last Name</span>
            </div>
            <div class="vx-col sm:w-4/5 w-full">
              <vs-input class="w-full"  v-model="lastname" />
            </div>
          </div>
          <div class="vx-row">
            <div class="vx-col sm:w-4/5 w-full ml-auto">
              <vs-button class="mr-3 mb-2" @click="changeName">Submit</vs-button>
              <vs-button color="warning" type="border" class="mb-2" @click="firstname = lastname  = '';">Reset</vs-button>
            </div>
          </div>
      </vs-card>
    </vs-col>
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="6" vs-sm="12" vs-xs="12" >
      <vs-card :style="{padding: '10px'}">
          <div slot="header">
            <h3>
              Password Change
            </h3>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/5 w-full">
              <span>New Password</span>
            </div>
            <div class="vx-col sm:w-4/5 w-full">
              <vs-input ref="newPassword" class="w-full"  name="newPassword" v-model="newPassword" v-validate="'required|min:6|max:40'"/>
              <span class="text-danger text-sm"  v-show="errors.has('newPassword')">{{ errors.first('newPassword') }}</span>
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/5 w-full">
              <span>Confirm Password</span>
            </div>
            <div class="vx-col sm:w-4/5 w-full">
              <vs-input class="w-full" name="confirmPassword" v-model="confirmPassword" v-validate="'required|confirmed:newPassword'" />
              <span class="text-danger text-sm"  v-show="errors.has('confirmPassword')">{{ errors.first('confirmPassword') }}</span>
            </div>
          </div>
          <div class="vx-row">
            <div class="vx-col sm:w-4/5 w-full ml-auto">
              <vs-button class="mr-3 mb-2" @click="changePassword">Submit</vs-button>
              <vs-button color="warning" type="border" class="mb-2" @click="newPassword = confirmPassword = '';">Reset</vs-button>
            </div>
          </div>
      </vs-card>
    </vs-col>
  </vs-row>
</template>
<script>
import AdminService from '@/services/admin.service.js'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.initialState.user.user._id
    })
  },
  methods: {
    changeName() {
      let rdata = {
        id: this.user,
        firstname: this.firstname,
        lastname: this.lastname
      }
      return AdminService.changeName(rdata).then(
        res => {
          if(res.data.message == 'Name changed successfully') {
            this.$vs.notify({ title: res.data.message, color:'success', position:'top-right' });
          }
        }
      )
    },
    changePassword() {
    this.$validator.validate().then(isValid => {
        if (isValid) {
          let rdata = {
            id: this.user,
            newPassword: this.newPassword
          }
          return AdminService.changePassword(rdata).then(
            res => {
              if(res.data.message == 'Password changed successfully') {
                this.$vs.notify({ title: res.data.message, color:'success', position:'top-right' });
              }
            }
          )
        }
      })
    }
  }
}
</script>

