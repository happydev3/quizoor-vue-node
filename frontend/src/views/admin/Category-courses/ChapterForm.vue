<template>
    <vs-card class="add-form">
      <div slot="header">
        <h3 v-if="routename == 'editChapters'">
          Chapter Edit Form
        </h3>
        <h3 v-if="routename == 'addChapters'">
          Chapter Add Form
        </h3>
      </div>
      <div class="vx-row">
        <div class="vx-col  w-full mb-2">
          <vs-input class="w-full" label-placeholder="Name" v-validate="'required'" name="name" v-model="name" />
          <span class="text-danger text-sm"  v-show="errors.has('name')">{{ errors.first('name') }}</span>
        </div>
        <div class="vx-col  w-full mb-2">
          <vs-select v-validate="'required'" v-model="level" name="level" @change="onChange1()" autocomplete label="Level" class="w-full">
            <vs-select-item :key="index" :value="item.id" :text="item.name" v-for="(item,index) in levels" />
          </vs-select>
          <span class="text-danger text-sm"  v-show="errors.has('level')">{{ errors.first('level') }}</span>
        </div>
        <div class="vx-col  w-full mb-2">
          <vs-select v-validate="'required'" v-model="category" name="category" @change="onChange2()" autocomplete label="Category" class="w-full">
            <vs-select-item :key="index" :value="item._id" :text="item.name" v-for="(item,index) in categories" />
          </vs-select>
          <span class="text-danger text-sm"  v-show="errors.has('category')">{{ errors.first('category') }}</span>
        </div>
        <div class="vx-col  w-full mb-2">
          <vs-select v-validate="'required'" v-model="subject" name="subject" autocomplete label="Subject" class="w-full">
            <vs-select-item :key="index" :value="item._id" :text="item.name" v-for="(item,index) in subjects" />
          </vs-select>
          <span class="text-danger text-sm"  v-show="errors.has('subject')">{{ errors.first('subject') }}</span>
        </div>
        <div class="vx-col  w-full mb-2">
          <quill-editor v-model="content"></quill-editor>
        </div>
      </div>
      <div class="vx-row" :style="{marginTop: '10px'}">
        <div class="vx-col w-full">
          <vs-button class="mr-3 mb-2" @click.prevent="submitForm">Save</vs-button>
          <vs-button color="warning" type="border" class="mb-2" @click="name = level = category = subject = '';">Reset</vs-button>
        </div>
      </div>
    </vs-card>
</template>
<script>
import { mapState } from 'vuex';
import AdminService from '@/services/admin.service.js';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { GETLEVEL, LEVELSELECT, CATEGORYSELECT } from '@/store/actionType';
export default {
  data() {
    return {
      levels: [],
      name: '',
      level: '',
      category: '',
      categories: [],
      subjectID: '',
      subjects: [],
      subject: '',
      content: `chapter summary`
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
  components: {
    quillEditor
  },
  methods: {
    submitForm() {
      this.$validator.validateAll().then(result => {
        if (result) {
          if (this.routename == 'editChapters') {
            let rdata = {
              chapterID: this.chapterID,
              name: this.name,
              levelID: this.level,
              userID: this.user,
              categoryID: this.category,
              subjectID: this.subject,
              content: this.content
            }
              return AdminService.editChapter(rdata).then(
                res => {
                  if(res.data.message == 'successfully updated') {
                    this.$vs.notify({ title: res.data.message, color:'success', position:'top-right' });
                    setTimeout(() => { this.$router.push('/admin/category-courses/chapters') }, 500);
                  } else if (res.data.message == 'This Chapter has already existed!') {
                    this.$vs.notify({ title: res.data.message, color:'warning', position:'top-right' });
                  }
                }
              )
          } else if (this.routename == 'addChapters') {
              let rdata = {
                name: this.name,
                levelID: this.level,
                userID: this.user,
                categoryID: this.category,
                subjectID: this.subject,
                content: this.content
              }
              return AdminService.addChapter(rdata).then(
                res => {
                  if(res.data.message == 'Successfully Added') {
                    this.$vs.notify({ title: res.data.message, color:'success', position:'top-right' });
                    setTimeout(() => { this.$router.push('/admin/category-courses/chapters') }, 500);
                  } else if (res.data.message == 'This Chapter has already existed!') {
                    this.$vs.notify({ title: res.data.message, color:'warning', position:'top-right' });
                  }
                }
              )
          }
        }
      })
    },
    onChange1() {
      this.$store.dispatch(LEVELSELECT, this.level).then(
        res => {
          return this.categories = res.data;
        }
      )
    },
    onChange2() {
      this.$store.dispatch(CATEGORYSELECT, this.category).then(
        res => {
          return this.subjects = res.data;
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
    if (this.routename == 'editChapters') {
      const id = this.$router.currentRoute.params.id;
      return AdminService.getChapterById(id).then(
        res => {
          this.chapterID = res.data._id
          this.name = res.data.name;
          this.status = res.data.status;
          this.level = res.data.level;
          this.category = res.data.category;
          this.subject = res.data.subject;
          this.content = res.data.content;
        },
        error => {
          console.log(error)
        }
      )
    }
  }
}
</script>
