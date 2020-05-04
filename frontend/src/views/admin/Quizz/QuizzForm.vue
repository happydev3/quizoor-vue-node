
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
          </div>

          <!-- option -->

          <div class="optionsField" >
            <vs-button v-for="(item, j) in options" :key="j" :color="'#9ecc38'" :class="'optionField' + j" type="flat">
                <img class="optionImg" :src="require('@/assets/images/logo/option' + j + '.webp')" @click="selectOption(item.value, index)"/><br/>
                <span>{{item.label}}</span>
            </vs-button>
          </div>

          <quill-editor class="editor" v-model="question.content" :style="{marginBottom: '20px'}"></quill-editor>
          <vs-input-number class="mark" v-validate="'required'" min="1" max="5" color="success" v-model="question.mark"/>
          <div class="vx-col w-full between-field" :key="i" v-for="(answer, i) in question.answers">

            <div v-if="questions[index].quizType == 'multiple'">
              <vs-row vs-w="12" :style="{marginTop: '15px'}" v-if="windowWidth>1024">
                <vs-col  vs-w="1" vs-align="center" :style="{paddingTop: '20px'}"><h6>{{answerHeader[i]}}:</h6></vs-col>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="8">
                  <quill-editor v-model="answer.content" name="answerContent" v-validate="'required'"></quill-editor>
                </vs-col>
                <vs-col vs-w="2" vs-align="center">
                  <div :style="{paddingTop: '20px', display: 'flex', justifyContent: 'space-between'}">
                    <vs-checkbox v-model="answer.value">Is this right?</vs-checkbox>
                    <vs-button color="warning" type="filled" icon-pack="feather" icon="icon-archive" @click="deleteAnswer(index, i)"></vs-button>
                  </div>
                </vs-col>
              </vs-row>
              <!-- mobile responsive -->
              <vs-row vs-offset="1" vs-w="12" :style="{marginTop: '15px'}" v-if="windowWidth<=1024">
                <vs-col vs-w="12" vs-align="center" :style="{marginBottom: '10px'}"><h6>{{answerHeader[i]}}:</h6></vs-col>
                <vs-col vs-w="12" vs-type="flex" vs-justify="center" vs-align="center">
                  <quill-editor v-model="answer.content" name="answerContent" v-validate="'required'" :style="{marginBottom: '0px'}"></quill-editor>
                  <vs-button color="warning" type="filled" icon-pack="feather" icon="icon-archive" @click="deleteAnswer(index, i)" :style="{marginLeft: '10px'}"></vs-button>
                </vs-col>
                <vs-col vs-w="12" vs-sm="12" vs-align="center" :style="{marginTop: '10px'}">
                    <vs-checkbox v-model="answer.value">Is this right?</vs-checkbox>
                </vs-col>
              </vs-row>
            </div>

            <div v-if="questions[index].quizType == 'truefalse'">
              <vs-row vs-align="center" vs-type="flex" vs-justify="center" vs-w="12" :style="{marginTop: '15px'}">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                  <vs-col  vs-w="1" vs-align="center" :style="{paddingBottom: '10px'}"><h6>{{answerHeader[i]}}:</h6></vs-col>
                  <vs-input vs-offset="2" vs-w="8" v-model="answer.content" />
                  <vs-checkbox v-model="answer.value">Is this right?</vs-checkbox>
                </vs-col>
              </vs-row>
            </div>

            <div v-if="questions[index].quizType == 'matching'"> 
              <vs-row vs-w="12">
                <vs-col vs-w="1" vs-align="center" :style="{paddingTop: '20px'}"><h6>{{answerHeader[i]}}:</h6></vs-col>
                <vs-col  vs-w="5" vs-type="flex" vs-justify="center" vs-align="center">
                    <quill-editor v-model="answer.content" name="answerContent" :style="{marginBottom: '20px'}"></quill-editor>
                </vs-col>
                <vs-col vs-w="1"><img class="arrowIcon" :src="arrow" /></vs-col>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
                  <vs-textarea label="matching..." v-model="answer.value" :style="{marginBottom: '20px'}"/>
                </vs-col>
                <vs-col vs-w="1">
                  <vs-button :style="{marginTop: '45px'}" color="warning" type="filled" icon-pack="feather" icon="icon-archive" @click="deleteAnswer(index, i)"></vs-button>
                </vs-col>
              </vs-row>
            </div>

          </div>
          <vs-row vs-w="12">
            <vs-col  vs-w="1" vs-align="center" :style="{paddingTop: '20px'}"><h6>Reason:</h6></vs-col>
            <vs-col  vs-w="11" vs-type="flex" vs-justify="center" vs-align="center">
                <quill-editor v-model="question.reason" name="answerContent" :style="{marginBottom: '20px'}"></quill-editor>
            </vs-col>
          </vs-row>
          <div class="button-area">
              <vs-button color="success" type="border" :key="index" @click="addAnswer(index)" :disabled="questions[index].quizType == 'truefalse' && questions[index].answers.length > 1"> + Add Answer</vs-button>
              <vs-button color="success" type="border" :key="index+1" @click="addAnswerGroup(index)" :disabled="questions[index].quizType == 'truefalse' && questions[index].answers.length > 1"> + Add Answer Group</vs-button>
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
import vSelect from 'vue-select'
import { FormWizard, TabContent } from 'vue-form-wizard';
import { mapState } from 'vuex';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import AdminService from '@/services/admin.service.js';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import arrow from '@/assets/images/pages/arrow.png';
import { quillEditor } from 'vue-quill-editor';
import { GETLEVEL, LEVELSELECT, CATEGORYSELECT, SUBJECTSELECT } from '@/store/actionType';

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};
export default {
  data() {
    return {
      isActive: undefined,
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
      answers: [],
      QuizID: '',
      options : [
        {value: 'multiple', label: 'Multiple choice'},
        {value: 'truefalse', label: 'True or false'},
        {value: 'matching', label: 'Matching'}
      ],
      answerHeader: [
        'A', 'B', 'C', 'D', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'
      ],
      arrow: arrow
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
    if (this.routename == 'quizz-edit') {
    const id = this.$router.currentRoute.params.id;
    return AdminService.getQuizById(id).then(
      res => {
        this.QuizID = res.data._id
        this.name = res.data.name;
        this.status = res.data.status;
        this.level = res.data.level._id;
        this.category = res.data.category._id;
        this.subject = res.data.subject._id;
        this.chapter = res.data.chapter._id;
        this.difficulty = res.data.difficulty;
        // this.questions = res.data.questions;
        let tempQuiz = [];
        let questions = [];
        res.data.questions.map(function(question) {
          let quizType = question.quizType;
          let content =question.content;
          let mark = question.mark;
          let reason = question.reason;
          let tempAnswers = [];
          question.answers.map(function(item){
            let tvalue = undefined;
            if(item.value == 'true') {
                tvalue = true
            } else if(item.value == 'false') {
                tvalue = false
            } else {
                tvalue = item.value;
            }
            tempAnswers.push({
                content: item.content,
                value: tvalue
            })
          })
          let answers = tempAnswers;
            tempQuiz.push({
            quizType: quizType,
            content: content,
            mark: mark,
            answers: answers,
            reason: reason
            })
          questions = tempQuiz;
        })
         this.questions = questions;
      },
      error => {
        console.log(error)
      }
    )
  }
  },
  methods: {
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
    },
    onChange3() {
      this.$store.dispatch(SUBJECTSELECT, this.subject).then(
        res => {
          return this.chapters = res.data;
        }
      )
    },
    validateStep1() {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll('step-1').then(result => {
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
            if(this.routename == 'quizz-edit') {
              let rdata = {
                quizID: this.QuizID,
                user: this.user,
                level: this.level,
                category: this.category,
                subject: this.subject,
                chapter: this.chapter,
                name: this.name,
                difficulty: this.difficulty,
                questions: this.questions,
              } 
              console.log('______quiz edit data_____', rdata);
              return AdminService.editQuiz(rdata).then(
                res => {
                  if(res.data.message == 'successfully updated') {
                    this.$vs.notify({ title: res.data.message, color:'success', position:'top-right' });
                    setTimeout(() => { this.$router.push('/admin/quizz/all') }, 500);
                  } 
                }
              )

            } else if(this.routename == 'quizz-add') {
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
              console.log('______quiz add data_____', rdata);
              return AdminService.addQuiz(rdata).then(
                res => {
                  if(res.data.message == 'Quiz added successfully') {
                    this.$vs.notify({ title: res.data.message, color:'success', position:'top-right' });
                    setTimeout(() => { this.$router.push('/admin/quizz/all') }, 500);
                  } else if (res.data.message == 'This Chapter has already existed!') {
                    this.$vs.notify({ title: res.data.message, color:'warning', position:'top-right' });
                  }
                },
                error => {
                  console.log(error);
                }
              )
            }
          } else {
            reject("correct all values");
          }
        })
      })
    },
    addQuestion() {
      this.questions.push({
          content : '',
          mark: 1,
          quizType: '',
          answers : [],
          reason: ''
      })
    },
    selectOption(data, index) {
      this.questions[index].quizType = data;
      this.isActive == true;
      this.questions[index].answers = [];
      console.log(this.questions[index].quizType);
    },
    addAnswer(index) {
      if(this.questions[index].quizType == '') {
        this.$vs.notify({ title: 'Please select quesion type', color:'warning', position:'top-right' });
      } else {
        if (this.questions[index].quizType == 'multiple') {
          this.questions[index].answers.push({
            content: '',
            value: undefined
          })
        } else if (this.questions[index].quizType == 'truefalse') {
          this.questions[index].answers.push({
            content: 'true',
            value: undefined
          });
          this.questions[index].answers.push({
            content: 'false',
            value: undefined
          })
        } else if(this.questions[index].quizType == 'matching') {
          this.questions[index].answers.push({
            content: '',
            value: ''
          });
        }
      }
    },
    addAnswerGroup(index) {
      if(this.questions[index].quizType == '') {
        this.$vs.notify({ title: 'Please select quesion type', color:'warning', position:'top-right' });
      } else {
        if (this.questions[index].quizType == 'multiple') {
          for (let i=0; i<4; i++) {
            this.questions[index].answers.push({
              content: '',
              value: undefined
            })
          }
        } else if (this.questions[index].quizType == 'truefalse') {
          this.questions[index].answers.push({
            content: 'true',
            value: undefined
          });
          this.questions[index].answers.push({
            content: 'false',
            value: undefined
          })
        } else if(this.questions[index].quizType == 'matching') {
          for (let i=0; i<4; i++){
            this.questions[index].answers.push({
              content: '',
              value: ''
            });
          }
        }
      }
    },
    deleteQuestion(index) {
      if (this.questions.length <= 1) return;
      this.questions.splice(index, 1);
    },
    deleteAnswer(index, i) {
      if(this.questions[index].answers<=1) return;
      this.questions[index].answers.splice(i, 1);
    },
  },
  components: {
    FormWizard,
    TabContent,
    quillEditor,
    'v-select': vSelect
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
  .editor {
    height: 300px !important;
  }
  .mark {
    margin-top: 70px;
  }
  @media(max-width: 767px) and (min-width: 588px) {
    .mark {
      margin-top: 100px;
    }
  }
  @media(max-width: 587px) and (min-width: 457px) {
    .mark {
      margin-top: 120px;
    }
  }
  @media(max-width: 456px) and (min-width: 418px) {
    .mark {
      margin-top: 150px;
    }
  }
  @media(max-width: 417px) {
    .mark {
      margin-top: 180px;
    }
  }
  .optionsField {
    text-align: center;
    margin-left: 15%; 
    width: 70%;
    display: flex;
    padding: 10px;
  }
  .optionField0,
  .optionField1,
  .optionField2 {
    cursor: pointer;
    border-radius: 5px;
    width: 30%;
    margin-left: 10px;
    margin-right: 10px;
    padding: 10px;
    background-color: rgb(238, 232, 232);
  }
  .optionField active {
    background:green;
  }
  .optionImg {
    height: 20px;
  }
  @media(max-width: 650px) {
    .optionsField {
      width: 100%;
      margin-left: 0%;
    }
  }
  .arrowIcon {
    width: 40px;
    margin-top: 45px;
  }
</style>
