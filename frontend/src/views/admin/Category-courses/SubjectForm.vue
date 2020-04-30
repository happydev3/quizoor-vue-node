<template>
    <vs-card class="add-form">
      <div slot="header">
        <h3 v-if="routename == 'editSubjects'">
          Subject Edit Form
        </h3>
        <h3 v-if="routename == 'addSubjects'">
          Subject Add Form
        </h3>
      </div>
      <div class="vx-row">
        <div class="vx-col  w-full mb-2">
          <vs-input class="w-full" label-placeholder="Name" v-validate="'required'" name="name" v-model="name" />
          <span class="text-danger text-sm"  v-show="errors.has('name')">{{ errors.first('name') }}</span>
        </div>
        <div class="vx-col  w-full mb-2">
          <vs-select v-validate="'required'" v-model="level" name="level" @change="onChange()" autocomplete label="Level" class="w-full">
            <vs-select-item :key="index" :value="item.id" :text="item.name" v-for="(item,index) in levels" />
          </vs-select>
          <span class="text-danger text-sm"  v-show="errors.has('level')">{{ errors.first('level') }}</span>
        </div>
        <div class="vx-col  w-full mb-2">
          <vs-select v-validate="'required'" v-model="category" name="category" autocomplete label="Category" class="w-full">
            <vs-select-item :key="index" :value="item._id" :text="item.name" v-for="(item,index) in categories"/>
          </vs-select>
          <span class="text-danger text-sm"  v-show="errors.has('category')">{{ errors.first('category') }}</span>
        </div>
      </div>
      <div class="vx-row" :style="{marginTop: '10px'}">
        <div class="vx-col w-full">
          <vs-button class="mr-3 mb-2" @click.prevent="submitForm">Save</vs-button>
          <vs-button color="warning" type="border" class="mb-2" @click="name = level = category = '';">Reset</vs-button>
        </div>
      </div>
    </vs-card>
</template>
<script>
import { mapState } from 'vuex';
import AdminService from '@/services/admin.service.js';
import { GETLEVEL, LEVELSELECT } from '@/store/actionType';
export default {
  data() {
    return {
      levels: [],
      name: '',
      level: '',
      category: '',
      categories: [],
      subjectID: ''
    }
  },
  computed: {
     ...mapState({
      user: state => state.admin.user.user._id
    }),
    routename() {
      return this.$router.currentRoute.name
    }
  },
  methods: {
    submitForm() {
      this.$validator.validateAll().then(result => {
        if (result) {
          if (this.routename == 'editSubjects') {
            let rdata = {
              subjectID: this.subjectID,
              name: this.name,
              levelID: this.level,
              userID: this.user,
              categoryID: this.category
            }
              return AdminService.editSubject(rdata).then(
                res => {
                  if(res.data.message == 'successfully updated') {
                    this.$vs.notify({ title: res.data.message, color:'success', position:'top-right' });
                    setTimeout(() => { this.$router.push('/admin/category-courses/subjects') }, 500);
                  } else if (res.data.message == 'This Subject has already existed!') {
                    this.$vs.notify({ title: res.data.message, color:'warning', position:'top-right' });
                  }
                }
              )
          } else if (this.routename == 'addSubjects') {
              let rdata = {
                name: this.name,
                levelID: this.level,
                userID: this.user,
                categoryID: this.category
              }
              return AdminService.addSubject(rdata).then(
                res => {
                  if(res.data.message == 'Successfully Added') {
                    this.$vs.notify({ title: res.data.message, color:'success', position:'top-right' });
                    setTimeout(() => { this.$router.push('/admin/category-courses/subjects') }, 500);
                  } else if (res.data.message == 'This Subject has already existed!') {
                    this.$vs.notify({ title: res.data.message, color:'warning', position:'top-right' });
                  }
                }
              )
          }
        }
      })
    },
    onChange() {
      this.$store.dispatch(LEVELSELECT, this.level).then(
        res => {
          return this.categories = res.data;
        }
      )
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
    if (this.routename == 'editSubjects') {
      const id = this.$router.currentRoute.params.id;
      return AdminService.getSubjectById(id).then(
        res => {
          this.subjectID = res.data._id
          this.name = res.data.name;
          this.status = res.data.status;
          this.level = res.data.level;
          this.category = res.data.category;
        },
        error => {
          console.log(error)
        }
      )
    }
  }
}
</script>
