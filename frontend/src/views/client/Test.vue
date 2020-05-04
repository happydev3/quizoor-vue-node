<template>
<section class="quiz">
    <div class="container">
        <header class="quiz__top">
            <h3 class="track__title">{{name}}</h3>
        </header>
        <div class="quiz__inner" v-if="popupActive == false">
            <vs-progress :height="12" :percent='this.percent' color="primary"></vs-progress>
            <div>
                <div class="quiz__inner-header" v-html="questions[questionIndex].content">{{questions[questionIndex].content}}</div>
                <ul v-if="questions[questionIndex].quizType == 'multiple' || questions[questionIndex].quizType == 'truefalse'">
                    <li v-for="(answer, i) in questions[questionIndex].answers" :key="i">
                        <div>
                            <vs-checkbox v-model="clientAnswers[i]" :style="{marginTop: '5px', marginLeft: '0px', marginRight: '0px'}"></vs-checkbox>
                        </div>
                        <label class="container-box" :style="{paddingLeft: '2px'}">
                            <strong>{{answerHeader[i]}}:</strong>
                        </label>
                        <p v-html="answer.content">{{answer.content}}</p>
                    </li>
                </ul>
                <ul v-if="questions[questionIndex].quizType == 'matching'">
                    <li class="quiz__choice" v-for="(answer, i) in questions[questionIndex].answers" :key="i" :style="{display: 'flex', justifyContent: 'space-between'}">
                        <div :style="{display: 'flex'}">
                            <label class="container-box" :style="{paddingLeft: '2px'}">
                                <strong>{{answerHeader[i]}}:</strong>
                            </label>
                            <p v-html="answer.content">{{answer.content}}</p>
                        </div>
                        <div>
                            <vs-select class="selectExample" v-model="clientAnswers[i]">
                                <vs-select-item :key="index" :value="item" :text="item" v-for="(item,index) in matchingValues" />
                            </vs-select>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="vx-col w-full mb-base correct-answer-field" v-if="isWrong == true">
               <vx-card title="Reason" title-color="success" subtitle="">
                    <p class="mb-3" v-html="questions[questionIndex].reason">{{questions[questionIndex].reason}}</p>
                </vx-card>
            </div>
            <div class="quiz__inner--footer">
                <div class="send-right">
                   <vs-button class="submitBtn" color="red" type="filled" icon-pack="feather" icon="icon-check" :style="{marginRight:'5px'}" @click="submitAnswer(questionIndex)" :disabled="isClick == true">Submit</vs-button>
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
		<div class="demo-alignment" v-if="popupActive == true">
            <div class="vx-col w-full mb-base correct-answer-field" v-for="(question, index) in questions" :key="index">
                <vx-card title-color="primary" :title='question.quizType'>
                    <vx-card title="QUESTION" title-color="success" subtitle="">
                         <p v-html="question.content">{{question.content}}</p>
                    </vx-card>
                    <vs-card title="Answers" title-color="warning" :style="{marginTop: '15px'}">
                        <table style="width:100%" class="border-collapse">
                            <tr>
                                <th class="p-2 border border-solid d-theme-border-grey-light correct-answer-header">Answers</th>
                                <th class="p-2 border border-solid d-theme-border-grey-light">value</th>
                            </tr>
                            <tr v-for="(answer, i) in question.answers" :key="i">
                                <td class="p-2 border border-solid d-theme-border-grey-light" v-html="answer.content">{{answer.content}}</td>
                                <td class="p-2 border border-solid d-theme-border-grey-light" :style="[answer.value == true ? {color: 'green'} : {color: 'red'}]">{{answer.value}}</td>
                            </tr>
                        </table>
                    </vs-card>
                     <vx-card title="Reason" title-color="success" subtitle="">
                        <p class="mb-3" v-html="question.reason">{{question.reason}}</p>
                    </vx-card>
                </vx-card>
            </div>
            <div>
                <h4>Your score: {{this.totalMark}}</h4>
                <h4>Your guessing result: {{this.totalPerfectResult}}</h4>
            </div>
            <div class="Gohome">
                <vs-button class="submitBtn" color="red" type="filled" icon-pack="feather" icon="icon-check" @click="goHome">Go Home</vs-button>
            </div>
        </div>
	</div>
</section>
</template>
<script>
import { GETESTITEM } from '@/store/actionType';
import ClientService from '@/services/client.service.js'
import { mapState } from 'vuex';
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
         isWrong: false,
         totalMark: 0,
         totalPerfectResult: 0,
         popupActive: false,
         answerHeader: [
            'A', 'B', 'C', 'D', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'
        ],
        matchingValues: []
     }
 },
 computed: {
     quizID() {
         return this.$router.currentRoute.params.id;
     },
     ...mapState({
         userID: state => state.auth.initialState.user.user._id
     })
 },
 created() {
     const quizId = this.$router.currentRoute.params.id;
     this.$store.dispatch(GETESTITEM, quizId).then(
         res => {
            this.name = res.data.name;
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
        if(this.questions[this.questionIndex].quizType == 'matching') {
        let tempValues = [];
            this.questions[this.questionIndex].answers.map(function(answer) {
                tempValues.push(answer.value);
            })
            let Values = tempValues;
           
            var currentIndex = Values.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;

                    // And swap it with the current element.
                    temporaryValue = Values[currentIndex];
                    Values[currentIndex] = Values[randomIndex];
                    Values[randomIndex] = temporaryValue;
            }
            console.log('________Values__________', Values);
            this.matchingValues = Values;
        }
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
        for(let i = 0; i < this.currentQuestion.answers.length; i++) {
            if(this.clientAnswers[i]) {
                if(this.clientAnswers[i] == this.currentQuestion.answers[i].value) {
                    rightCounter++;
                } else {
                    wrongCounter++;
                }
            }
        }
        if (rightCounter-wrongCounter > 0) {
            if(this.currentQuestion.quizType == 'multiple' || this.currentQuestion.quizType == 'truefalse') {
                getMark = (rightCounter-wrongCounter) * this.currentQuestion.mark/rightAnswer;
                console.log('getMark', getMark);
            } else if(this.currentQuestion.quizType == 'matching') {
                getMark = (rightCounter-wrongCounter) * this.currentQuestion.mark/this.currentQuestion.answers.length;
                console.log('getMark', getMark);
            }
        } else {
            getMark = 0;
        } 
        this.totalMark = this.totalMark + getMark;
        if(this.currentQuestion.quizType == 'multiple' || this.currentQuestion.quizType == 'truefalse') {
            if(rightAnswer == rightCounter) {
                if (wrongCounter == 0) {
                    this.totalPerfectResult++;
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
        } else {
            if(this.currentQuestion.answers.length == rightCounter) {
                this.totalPerfectResult++;
                this.$vs.notify({ time:9000, title:'Congratulation! You are correct!', text: 'You selected all right answers and get' + ' ' +  getMark + ' ' + 'mark', color:'success', position:'top-center' })
            } else {
                if (rightCounter > 0 && wrongCounter > 0) {
                    this.isWrong = true;
                    this.$vs.notify({time:9000,  title:'You are wrong!', text: 'You selected right answers ' + rightCounter + ' of '  + this.currentQuestion.answers.length + ', wrong answers of ' + wrongCounter  + ' and get ' +  getMark + ' mark', color:'warning', position:'top-center' })
                } else {
                    this.isWrong = true;
                    this.$vs.notify({time:9000,  title:'You are wrong!', text: 'You guessed nothing and get 0 mark', color:'danger', position:'top-center' })
                }
            }
        }
    },
    viewDetail() {
        if (this.questionIndex == this.totalResult - 1) {
            this.popupActive = true;
        }
    },
    goHome() {
        let rdata = {
            quizID: this.quizID,
            userID: this.userID,
            totalMark: this.totalMark,
            totalPerfectResult: this.totalPerfectResult
        }
        return ClientService.saveTestResult(rdata).then(
            res => {
                this.$vs.notify({ title: res.data.message, color:'success', position:'top-right' });
                this.$router.go(-1);
            }
        );
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
    .Gohome {
        width: 100%;
        display: flex;
        justify-content: end;
    }
</style>
	

