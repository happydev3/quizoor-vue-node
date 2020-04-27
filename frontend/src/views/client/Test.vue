<template>
<section class="quiz">
    <div class="container">
        <div class="quiz__page">
            <ul class="quiz__page-list">
                <!-- <li><button class="finished">1</button></li> -->
                <!-- <li><button class="active">2</button></li> -->
                <li v-for="(question, index) in questions" :key="index"><button>{{index+1}}</button></li>
            </ul>
        </div>
        <!-- Header -->
        <header class="quiz__top">
            <!-- Title -->
            <h3 class="track__title">{{name}}</h3>
        </header>
        <div class="quiz__inner">
            <!-- <div v-for="(question, index) in questions" :key="index"> -->
                <div class="quiz__inner-header" v-html="questions[questionIndex].content">{{questions[questionIndex].content}}</div>
                <ul>
                    <li class="quiz__choice" v-for="(answer, i) in questions[questionIndex].answers" :key="i">
                        <label class="container-box">
                            <strong>{{i+1}}</strong>
                            <input type="checkbox">
                            <span class="checkmark"></span>
                        </label>
                        <p v-html="answer.content">{{answer.content}}</p>
                    </li>
                </ul>
            <!-- </div> -->
            <div class="quiz__inner--footer">
                <!-- <div class="footer-chrono">01:30</div> -->
                <div class="send-right">
                    <div class="stop"><button>Stop quiz</button></div>
                    <div class="next">
                        <button @click="moveNextQuestion">Next question
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="10" viewBox="0 0 20 10">
                                <path id="black-arrow" fill="#ffffff" d="M15.012,3.75H0v2.5H15.012V10L20,5,15.012,0Z"></path>
                            </svg>
                        </button>
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
         questionIndex: 0
     }
 },
 computed: {
    //  ...mapState({
    //      testQuizItems: state => state.client.getTestItems
    //  })
 },
 created() {
     const quizId = this.$router.currentRoute.params.id;
     console.log(quizId);
     this.$store.dispatch(GETESTITEM, quizId).then(
         res => {
            this.name = res.data.name;
            this.questions = res.data.questions;
            this.questions.map(function(item) {
                console.log(item);
            })
            console.log(this.questions);
         }
     );
 },
 methods: {
     moveNextQuestion() {
         this.questionIndex++;
     }
 }  
}
</script>
	

