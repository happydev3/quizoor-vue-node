<template>
    <vs-card class="add-form">
      <div slot="header">
        <h3 v-if="routename == 'editCategories'">
          Category Edit Form
        </h3>
        <h3 v-if="routename == 'addCategories'">
          Category Add Form
        </h3>
      </div>
      <div class="vx-row">
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <vs-input class="w-full" label-placeholder="Name" v-validate="'required'" name="name" v-model="name" />
          <span class="text-danger text-sm"  v-show="errors.has('name')">{{ errors.first('name') }}</span>
        </div>
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <vs-select v-validate="'required'" v-model="level" name="level" autocomplete label="Level" class="w-full">
            <vs-select-item :key="index" :value="item.id" :text="item.name" v-for="(item,index) in levels" />
          </vs-select>
          <span class="text-danger text-sm"  v-show="errors.has('level')">{{ errors.first('level') }}</span>
        </div>
      </div>
      <div class="vx-row" :style="{marginTop: '10px'}">
        <div class="vx-col w-full">
          <vs-button class="mr-3 mb-2" @click.prevent="submitForm">Save</vs-button>
          <vs-button color="warning" type="border" class="mb-2" @click="name = level = '';">Reset</vs-button>
        </div>
      </div>
    </vs-card>
</template>
<script>
import { mapState } from 'vuex';
import AdminService from '@/services/admin.service.js';
import { GETLEVEL } from '@/store/actionType';
export default {
  data() {
    return {
      levels: [],
      name: '',
      level: '',
      categoryID: ''
    }
  },
  computed: {
     ...mapState({
      user: state => state.admin.user.user._id
    }),
    routename() {
      console.log('++++____+++++', this.$router.currentRoute.name)
      return this.$router.currentRoute.name
    }
  },
  methods: {
    submitForm() {
      this.$validator.validateAll().then(result => {
        if (result) {
          if (this.routename == 'editCategories') {
            let rdata = {
              categoryID: this.categoryID,
              level: this.level,
              name: this.name
            }
            console.log('+_++++++++++++++++++',rdata);
              return AdminService.editCategory(rdata).then(
                res => {
                  this.$vs.notify({ title: res.data.message, color:'success', position:'top-right' });
                  setTimeout(() => { this.$router.push('/admin/category-courses/categories') }, 500);
                }
              )
          } else if (this.routename == 'addCategories') {
              let rdata = {
                name: this.name,
                levelID: this.level,
                userID: this.user
              }
              console.log('+_++++++++++++++++++',rdata);
              return AdminService.addCategory(rdata).then(
                res => {
                  this.$vs.notify({ title: res.data.message, color:'success', position:'top-right' });
                  setTimeout(() => { this.$router.push('/admin/category-courses/categories') }, 500);
                }
              )
          }
        }
      })
    }
  },
  created() {
    this.$store.dispatch(GETLEVEL).then(
      res => {
        this.items = res.data;
        let tempData = [];
        this.items.map(function(item) {
          if(item.status == 'activated') {
            tempData.push({
              id: item._id,
              name: item.name
            })
          }
        })
        this.levels = tempData;
      },
      error => {
        console.log(error);
      }
    )
    if (this.routename == 'editCategories') {
      const id = this.$router.currentRoute.params.id;
      return AdminService.getCategoryById(id).then(
        res => {
          this.categoryID = res.data._id
          this.name = res.data.name;
          this.status = res.data.status;
          this.level = res.data.level;
          console.log(res);
        },
        error => {
          console.log(error)
        }
      )
    }
  }
}
</script>
