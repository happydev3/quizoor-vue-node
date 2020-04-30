<template>
  <vs-card>
    <div slot="header">
      <h3>
        Quiz Detail
      </h3>
    </div>
    <vs-tabs :color="colorx">
      <vs-tab @click="colorx = 'success'" label="Informations">
        <div class="con-tab-ejemplo">
          <vs-table hoverFlat :data="quiz">
                <template slot="thead">
                    <vs-th>Informations</vs-th>
                    <vs-th>Values</vs-th>
                </template>
                <template>
                    <vs-tr>
                        <vs-td>Name</vs-td>
                        <vs-td>{{ name }}</vs-td>
                    </vs-tr>
                    <vs-tr>
                        <vs-td>Difficulty</vs-td>
                        <vs-td>{{ difficulty }}</vs-td>
                    </vs-tr>
                    <vs-tr>
                        <vs-td>Level</vs-td>
                        <vs-td>{{ level }}</vs-td>
                    </vs-tr>
                    <vs-tr>
                        <vs-td>Category</vs-td>
                        <vs-td>{{ category }}</vs-td>
                    </vs-tr>
                    <vs-tr>
                        <vs-td>Subject</vs-td>
                        <vs-td>{{ subject }}</vs-td>
                    </vs-tr>
                    <vs-tr>
                        <vs-td>Chapter</vs-td>
                        <vs-td>{{ chapter }}</vs-td>
                    </vs-tr>
                    <vs-tr>
                        <vs-td>User</vs-td>
                        <vs-td>{{ user }}</vs-td>
                    </vs-tr>
                    <vs-tr>
                        <vs-td>Status</vs-td>
                        <vs-td :style="{color: 'green'}" v-if="this.status == 'activated'">{{this.status}}</vs-td>
                        <vs-td :style="{color: 'orange'}" v-if="this.status == 'deactivated'">{{this.status}}</vs-td>
                    </vs-tr>
                </template>
            </vs-table>
            <vs-button :style="{marginTop: '10px'}" color="success" type="filled" v-if="verification == 'unchecked'" @click="checkVerify">Check Verify</vs-button>
        </div>
      </vs-tab>
      <vs-tab @click="colorx = 'rgb(16, 233, 179)'" label="Questions">
        <div class="con-tab-ejemplo">
          <ul>
            <li :key="index" v-for="(question, index) in questions">
              <h2 class="question-header"> - question #{{index}}</h2>
              <div class="question-content" v-html="question.content">{{question.content}}</div>
                <vs-table hoverFlat class="table-answers" :data="question.answers">
                    <template slot="thead">
                        <vs-th>Answers</vs-th>
                        <vs-th>Is this right?</vs-th>
                    </template>
                    <template>
                        <vs-tr :key="i" v-for="(answer, i) in question.answers">
                            <vs-td v-html="answer.content">{{answer.content}}</vs-td>
                            <vs-td :style="{color: 'green'}" v-if="answer.value == true">Yes</vs-td>
                            <vs-td :style="{color: 'red'}" v-if="answer.value == false">No</vs-td>
                        </vs-tr>
                    </template>
                </vs-table>
            </li>
          </ul>
        </div>
      </vs-tab>
    </vs-tabs>
  </vs-card>
</template>
<script>
import AdminService from '@/services/admin.service.js';
export default {
  data() {
    return {
      quiz: Object,
      id: '',
      name: '',
      level: '',
      category: '',
      subject: '',
      chapter: '',
      difficulty: '',
      user: '',
      status: '',
      verification: '',
      questions: [],
      colorx:'success'
    }
  },
  computed: {
    userId() {
      return this.$router.currentRoute.params.id;
    }
  },
  created() {
    return AdminService.getQuizById(this.userId).then(
      res => {
        this.id = res.data._id;
        this.name = res.data.name;
        this.level = res.data.level.name;
        this.category = res.data.category.name;
        this.subject = res.data.subject.name;
        this.chapter = res.data.chapter.name;
        this.difficulty = res.data.difficulty;
        this.user = res.data.user.firstname + ' ' + res.data.user.lastname;
        this.status = res.data.status;
        this.verification = res.data.verification;
        this.questions = res.data.questions;
      },
      error => {
        console.log(error);
      }
    )
  },
  methods: {
    checkVerify() {
      return AdminService.checkVerify(this.id).then(
        res => {
          this.$vs.notify({ title:res.data.message, color:'success', position:'top-right' })
          setTimeout(function(){ window.location.reload() }, 500);
        },
        error => {
          return error;
        }
      )
    }
  }
}
</script>
<style scoped>
  .question-header {
    margin-top: 10px;
    margin-bottom: 10px;
    color: green;
    font-size: 20px;
    font-weight: 500;
    font-family: fantasy;
  }
  .table-answers {
    margin-top: 10px;
  }
  .question-content img {
    width: 50% !important;
  }
</style>
