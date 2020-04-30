<template>
<section class="quiz">
    <div class="container">
        <header class="quiz__top">
            <h3 class="track__title">{{name}}</h3>
            <vs-progress :height="12" :percent='this.percent' color="primary"></vs-progress>
        </header>
        <div class="quiz__inner">
            <div>
                <div class="quiz__inner-header" v-html="questions[questionIndex].content">{{questions[questionIndex].content}}</div>
                <ul>
                    <li class="quiz__choice" v-for="(answer, i) in questions[questionIndex].answers" :key="i">
                        <div>
                            <vs-checkbox v-model="clientAnswers[i]" :style="{marginTop: '5px', marginLeft: '0px', marginRight: '0px'}"></vs-checkbox>
                        </div>
                        <label class="container-box" :style="{paddingLeft: '2px'}">
                            <strong>{{ i+1 }}</strong>
                        </label>
                        <p v-html="answer.content">{{answer.content}}</p>
                    </li>
                </ul>
            </div>
            <div class="vx-col w-full mb-base correct-answer-field" v-if="isWrong == true">
                <vx-card title="Correct Result">
                <table style="width:100%" class="border-collapse">
                    <tr>
                        <th class="p-2 border border-solid d-theme-border-grey-light correct-answer-header">Answers</th>
                        <th class="p-2 border border-solid d-theme-border-grey-light">value</th>
                    </tr>
                    <tr v-for="(answer, i) in questions[questionIndex].answers" :key="i">
                        <td class="p-2 border border-solid d-theme-border-grey-light" v-html="answer.content">{{answer.content}}</td>
                        <td class="p-2 border border-solid d-theme-border-grey-light" :style="[answer.value == true ? {color: 'green'} : {color: 'red'}]">{{answer.value}}</td>
                    </tr>
                </table>
                </vx-card>
            </div>
            <div class="quiz__inner--footer">
                <div class="send-right">
                   <vs-button class="submitBtn" color="red" type="filled" icon-pack="feather" icon="icon-check" :style="{marginRight:'5px'}" @click="submitAnswer(questionIndex)" v-if="isClick == true" disabled>Submit</vs-button>
                   <vs-button class="submitBtn" color="red" type="filled" icon-pack="feather" icon="icon-check" :style="{marginRight:'5px'}" @click="submitAnswer(questionIndex)" v-if="isClick == false">Submit</vs-button>
                    <div class="next">
                        <vs-button color="primary" type="filled" v-if="questionIndex != totalResult-1 && isClick == false" disabled>Next question
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="10" viewBox="0 0 20 10">
                                <path id="black-arrow" fill="#ffffff" d="M15.012,3.75H0v2.5H15.012V10L20,5,15.012,0Z"></path>
                            </svg>
                        </vs-button>
                        <vs-button color="primary" type="filled" @click="moveNextQuestion" v-if="questionIndex != totalResult-1 && isClick == true">Next question
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="10" viewBox="0 0 20 10">
                                <path id="black-arrow" fill="#ffffff" d="M15.012,3.75H0v2.5H15.012V10L20,5,15.012,0Z"></path>
                            </svg>
                        </vs-button>
                        <vs-button color="primary" type="filled" @click="viewDetail" v-if="questionIndex == totalResult-1 && isClick == false" disabled>Complete
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="10" viewBox="0 0 20 10">
                                <path id="black-arrow" fill="#ffffff" d="M15.012,3.75H0v2.5H15.012V10L20,5,15.012,0Z"></path>
                            </svg>
                        </vs-button>
                        <vs-button color="primary" type="filled" @click="viewDetail" v-if="questionIndex == totalResult-1 && isClick == true">Complete
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="10" viewBox="0 0 20 10">
                                <path id="black-arrow" fill="#ffffff" d="M15.012,3.75H0v2.5H15.012V10L20,5,15.012,0Z"></path>
                            </svg>
                        </vs-button>
                    </div>
                </div>
            </div>
        </div>
			
	</div>
</section>
</template>
<script>
import { GETESTITEM } from '@/store/actionType';
// import { mapState } from 'vuex';
export default {
 data() {
     return {
         name: '',
         questions: [],
         questionIndex: 0,
         clientAnswers: [],
         currentQuestion: Object,
         totalResult: 0,
         percent: 0,
         isClick: false,
         isWrong: false
     }
 },
 computed: {
    //  ...mapState({
    //      testQuizItems: state => state.client.getTestItems
    //  })
 },
 created() {
     const quizId = this.$router.currentRoute.params.id;
     this.$store.dispatch(GETESTITEM, quizId).then(
         res => {
            this.name = res.data.name;
            this.questions = res.data.questions;
            this.questions.map(function(item) {
                console.log(item);
            })
            this.totalResult = this.questions.length;
            this.percent = 100 / this.totalResult;
         }
     );
 },
 methods: {
    moveNextQuestion() {
        this.questionIndex++;
        this.clientAnswers = [];
        this.isClick = false;
        this.isWrong = false;
        this.percent = 100 * (this.questionIndex + 1) / this.totalResult;
    },
    submitAnswer(questionIndex) {
        this.isClick = true;
        this.currentQuestion = this.questions[questionIndex];
        let rightAnswer = 0;
        let rightCounter = 0;
        let wrongCounter = 0;
        let getMark = 0;
        this.currentQuestion.answers.map(function(answer){
            if(answer.value == true) {
                rightAnswer++;
            }
        })
        console.log('rightAnswer', rightAnswer);
        for(let i = 0; i < this.currentQuestion.answers.length; i++) {
            if(this.clientAnswers[i]) {
                if(this.clientAnswers[i] == this.currentQuestion.answers[i].value) {
                    rightCounter++;
                } else {
                    wrongCounter++;
                }
            } else {
                console.log('false')
            }
        }
        if (rightCounter-wrongCounter > 0) {
            getMark = (rightCounter-wrongCounter) * this.currentQuestion.mark/rightAnswer;
        } else {
            getMark = 0;
        } 
        console.log('rightCounter', rightCounter);
        if(rightAnswer == rightCounter) {
            if (wrongCounter == 0) {
                this.$vs.notify({ time:9000, title:'Congratulation! You are correct!', text: 'You selected all right answers and get' + ' ' +  getMark + ' ' + 'mark', color:'success', position:'top-center' })
            } else if (wrongCounter > 0) {
                this.isWrong = true;
                this.$vs.notify({ time:9000, title:'You are wrong!', text: 'You selected all right answers but you selected wrong answers of ' + wrongCounter + ' and get' + ' ' +  getMark  + ' ' + 'mark', color:'warning', position:'top-center' })
            }
        } else {
            if (rightCounter > 0 && wrongCounter > 0) {
                this.isWrong = true;
                this.$vs.notify({time:9000,  title:'You are wrong!', text: 'You selected right answers' +  ' ' + rightCounter + 'of' + ' ' + rightAnswer + ', wrong answers of' + ' ' + wrongCounter  + 'and get' + ' ' +  getMark + ' ' + 'mark', color:'warning', position:'top-center' })
            } else {
                this.isWrong = true;
                this.$vs.notify({time:9000,  title:'You are wrong!', text: 'You guessed nothing and get 0 mark', color:'danger', position:'top-center' })
            }
        }
    },
    viewDetail() {
        console.log();
    }
 }  
}
</script>
<style>
    .track__title {
        text-align: center;
        padding-bottom: 10px;
    }
    .correct-answer-header {
        text-align: center;
    }
    .correct-answer-field {
        transition: opacity 1s;
    }
</style>
	

