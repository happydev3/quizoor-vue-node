
<template>
<vs-card>
  <div slot="header">
    <h3 v-if="routename == 'quizz-edit'">
      Quiz Edit Form
    </h3>
    <h3 v-if="routename == 'quizz-add'">
      Quiz Add Form
    </h3>
  </div>
  <form-wizard color="rgba(var(--vs-primary), 1)" errorColor="rgba(var(--vs-danger), 1)" :title="null" :subtitle="null" finishButtonText="Submit">
    <tab-content title="Step 1" class="mb-5" icon="feather icon-home" :before-change="validateStep1">

      <!-- tab 1 content -->
      <form data-vv-scope="step-1">
      <div class="vx-row">
        <div class="vx-col w-full mb-2 between-field">
          <vs-select v-validate="'required'" v-model="level" name="level" @change="onChange1()" autocomplete label="Level" class="w-full">
            <vs-select-item :key="index" :value="item.id" :text="item.name" v-for="(item,index) in levels" />
          </vs-select>
          <span class="text-danger text-sm"  v-show="errors.has('level')">{{ errors.first('level') }}</span>
          <!-- <span class="text-danger"></span> -->
        </div>
        <div class="vx-col w-full mb-2 between-field">
          <vs-select v-validate="'required'" v-model="category" name="category" @change="onChange2()" autocomplete label="Category" class="w-full">
            <vs-select-item :key="index" :value="item._id" :text="item.name" v-for="(item,index) in categories" />
          </vs-select>
          <span class="text-danger"></span>
        </div>
        <div class="vx-col w-full mb-2 between-field">
          <vs-select v-validate="'required'" v-model="subject" name="subject" @change="onChange3()" autocomplete label="Subject" class="w-full">
            <vs-select-item :key="index" :value="item._id" :text="item.name" v-for="(item,index) in subjects" />
          </vs-select>
          <span class="text-danger"></span>
        </div>
        <div class="vx-col w-full mb-2 between-field">
          <vs-select v-validate="'required'" v-model="chapter" name="chapter"  autocomplete label="Chapter" class="w-full">
            <vs-select-item :key="index" :value="item._id" :text="item.name" v-for="(item,index) in chapters" />
          </vs-select>
          <span class="text-danger"></span>
        </div>
      </div>
      </form>
    </tab-content>

    <!-- tab 2 content -->
    <tab-content title="Step 2" class="mb-5" icon="feather icon-briefcase" :before-change="validateStep2">
      <form data-vv-scope="step-2">
      <div class="vx-row">
        <div class="vx-col w-full between-field">
          <vs-input label="Quiz Name" v-model="name" class="w-full mt-4" name="Name" v-validate="'required'" />
          <span class="text-danger"></span>
        </div>
        <div class="vx-col w-full mb-2 between-field">
          <vs-select v-validate="'required'" v-model="difficulty" name="difficulty" autocomplete label="Difficulty" class="w-full">
            <vs-select-item :key="index" :value="item.value" :text="item.name" v-for="(item,index) in difficulties" />
          </vs-select>
          <span class="text-danger"></span>
        </div>
      </div>
      </form>
    </tab-content>

    <!-- tab 3 content -->
    <tab-content title="Step 3" class="mb-5" icon="feather icon-image" :before-change="validateStep3">
      <form data-vv-scope="step-3">
        <vs-card :key="index" v-for="(question, index) in questions" >
          <div slot="header" :style="{display: 'flex', justifyContent: 'space-between'}">
            <h3>
              Question #{{index+1}}
            </h3>
            <vs-button color="danger" type="filled" icon-pack="feather" icon="icon-archive" @click="deleteQuestion(index)"></vs-button>
            <!-- <vs-button color="danger" size="small" type="filled" @click="deleteQuestion(index)">X</vs-button> -->
          </div>
          <quill-editor v-model="question.content" :style="{marginBottom: '20px'}"></quill-editor>
          <div class="vx-col w-full between-field" :key="i" v-for="(answer, i) in question.answers">
            <vs-row vs-w="12" :style="{marginTop: '15px'}" v-if="windowWidth>1024">
              <vs-col vs-offset="1" vs-w="1" vs-align="center" :style="{paddingTop: '20px'}"><h6>Answer{{i+1}}:</h6></vs-col>
              <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="8">
                <quill-editor v-model="answer.content" name="answerContent" v-validate="'required'"></quill-editor>
                <!-- <vs-textarea v-model="answer.content" name="answerContent" v-validate="'required'"/> -->
              </vs-col>
              <vs-col vs-w="2" vs-align="center">
                <div :style="{paddingTop: '20px', display: 'flex', justifyContent: 'space-between'}">
                  <vs-checkbox v-model="answer.value">Is this right?</vs-checkbox>
                  <vs-button color="warning" type="filled" icon-pack="feather" icon="icon-archive" @click="deleteAnswer(index, i)"></vs-button>
                  <!-- <vs-button color="warning" size="small" type="filled" @click="deleteAnswer(index, i)" :style="{padding: '0.5rem'}">X</vs-button> -->
                </div>
              </vs-col>
            </vs-row>
            <!-- mobile responsive -->
            <vs-row vs-offset="1" vs-w="12" :style="{marginTop: '15px'}" v-if="windowWidth<=1024">
              <vs-col vs-w="12" vs-align="center" :style="{marginBottom: '10px'}"><h6>Answer{{i+1}}:</h6></vs-col>
              <vs-col vs-w="12" vs-type="flex" vs-justify="center" vs-align="center">
                <quill-editor v-model="answer.content" name="answerContent" v-validate="'required'" :style="{marginBottom: '0px'}"></quill-editor>
                <!-- <vs-textarea v-model="answer.content" name="answerContent" v-validate="'required'" :style="{marginBottom: '0px'}"/> -->
                <vs-button color="warning" type="filled" icon-pack="feather" icon="icon-archive" @click="deleteAnswer(index, i)" :style="{marginLeft: '10px'}"></vs-button>
                <!-- <vs-button color="warning" size="small" type="filled" @click="deleteAnswer(index, i)" :style="{marginLeft: '10px', padding: '0.5rem'}">X</vs-button> -->
              </vs-col>
              <vs-col vs-w="12" vs-sm="12" vs-align="center" :style="{marginTop: '10px'}">
                  <vs-checkbox v-model="answer.value">Is this right?</vs-checkbox>
              </vs-col>
            </vs-row>
          </div>
          <div class="button-area">
              <vs-button color="success" type="border" :key="index" @click="addAnswer(index)"> + Add Answer</vs-button>
          </div>
        </vs-card>

        <div class="button-area">
          <vs-button color="success" type="filled" @click="addQuestion()"> + Add Question</vs-button>
        </div>
      </form>
    </tab-content>
  </form-wizard>
</vs-card>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard';
import { mapState } from 'vuex';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import AdminService from '@/services/admin.service.js';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import { quillEditor } from 'vue-quill-editor';
import { GETLEVEL, LEVELSELECT, CATEGORYSELECT, SUBJECTSELECT } from '@/store/actionType';

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};
export default {
  data() {
    return {
      level: "",
      levels: [],
      category: "",
      categories: [],
      subject: "",
      subjects: [],
      chapter: "",
      chapters: [],
      name: "",
      difficulty: "",
      difficulties: [
        { name: 'Easy', value: 'easy' },
        { name: 'Medium', value: 'medium' },
        { name: 'Difficult', value: 'difficult' }
      ],
      questions: [],
      content: `...`,
      answers: []
    }
  },
  computed: {
     ...mapState({
      user: state => state.admin.user.user._id,
      windowWidth: state => state.layout.windowWidth
    }),
    routename() {
      return this.$router.currentRoute.name
    }
  },
  created() {
    this.addQuestion();
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
  },
  methods: {
    onChange1() {
      this.$store.dispatch(LEVELSELECT, this.level).then(
        res => {
          console.log(res.data)
          this.category = ''
          this.subject = ''
          this.chapter = ''
          return this.categories = res.data;
        }
      )
    },
    onChange2() {
      this.$store.dispatch(CATEGORYSELECT, this.category).then(
        res => {
          console.log(res.data)
          this.subject = ''
          this.chapter = ''
          return this.subjects = res.data;
        }
      )
    },
    onChange3() {
      this.$store.dispatch(SUBJECTSELECT, this.subject).then(
        res => {
          console.log(res.data)
          this.chapter = ''
          return this.chapters = res.data;
        }
      )
    },
    validateStep1() {
      console.log('++++validateStep1++++');
      return new Promise((resolve, reject) => {
        this.$validator.validateAll('step-1').then(result => {
          console.log('++++++++result++++++++++', result)
          if (result) {
            resolve(true)
          } else {
            reject("correct all values");
          }
        })
      })
    },
    validateStep2() {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll("step-2").then(result => {
          if (result) {
            resolve(true)
          } else {
            reject("correct all values");
          }
        })
      })
    },
    validateStep3() {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll("step-3").then(result => {
          if (result) {
            let rdata = {
              user: this.user,
              level: this.level,
              category: this.category,
              subject: this.subject,
              chapter: this.chapter,
              name: this.name,
              difficulty: this.difficulty,
              questions: this.questions,
            }
            console.log(rdata);
            return AdminService.addQuiz(rdata).then(
              res => {
                console.log(res);
                this.$router.push('/admin/quizz/all')
              },
              error => {
                console.log(error);
              }
            )
          } else {
            reject("correct all values");
          }
        })
      })
    },
    addQuestion() {
      this.questions.push({
          content : '',
          answers : []
      })
    },
    addAnswer(index) {
      this.questions[index].answers.push({
        content: '',
        value: undefined
      })
    },
    deleteQuestion(index) {
      console.log(index);
      if (this.questions.length <= 1) return;
      this.questions.splice(index, 1);
    },
    deleteAnswer(index, i) {
      console.log(index, i);
      if(this.questions[index].answers<=1) return;
      this.questions[index].answers.splice(i, 1);
    }
  },
  components: {
    FormWizard,
    TabContent,
    quillEditor,
  }
}
</script>
<style scoped>
  .between-field {
    padding-bottom: 15px;
  }
  .button-area {
    padding: 10px;
    text-align: center;
  }
</style>
