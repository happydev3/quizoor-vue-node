<template>
<div class="track-body">
    <h1 class="track-header">{{chapterName}}</h1>
    <vs-row class="track-content" vs-type="flex">
        <vs-col vs-lg="4" vs-sm="12" vs-xs="12">
            <vs-card class="subjectInformation" v-if="subjectInformation">
                <h4 class="levelName"><b>Level:</b> {{subjectInformation.level.name}}</h4>
                <h4 class="categoryName"><b>Category:</b> {{subjectInformation.category.name}}</h4>
                <h4 class="subjectName"><b>Subject:</b> {{subjectInformation.name}}</h4>
            </vs-card>
            <vs-card class="chapterInformation">
                <h4>Track</h4>
                <ul class="TrackItems">
                    <li class="chapterName" v-for="(chapterItem, index) in chapterItems" :key="index" @click="updateQuizItem(chapterItem._id)">{{chapterItem.name}}</li>
                </ul>
            </vs-card>
        </vs-col>
        
    
        <vs-col vs-lg="8" vs-sm="12" vs-xs="12">
            <vs-tabs >
                <vs-tab label="Chapter Summary">
                    <vs-card>
                        <div slot="header">
                            <h3 class="chapterSummaryheader">
                                Chapter Summnary
                            </h3>
                        </div>
                        <div class="chapterSummary" v-html="chapterSummary">{{chapterSummary}}</div>
                    </vs-card>
                </vs-tab>

                <vs-tab label="Quizes">
                 <vs-card v-for="(quizItem, index) in quizItems" :key="index">
                        <div class="chapterItemField">
                            <div class="quizInformation">
                                <vs-row>
                                    <h3 class="quizName">{{quizItem.name}}</h3>
                                </vs-row>
                                <vs-row>
                                    <vs-chip class="quizDifficulty" :color="getDifficultyColor(quizItem.difficulty)">{{quizItem.difficulty}}</vs-chip>
                                </vs-row>
                                <vs-row :style="{marginTop: '10px'}">
                                    <vs-chip color="warning">
                                        <vs-avatar />
                                        {{quizItem.author}}
                                    </vs-chip>
                                </vs-row>
                            </div>
                            <div class="testResultField">
                                <vs-button v-if="quizItem.completed == true" :color="rxColor" type="flat" icon-pack="feather" icon="icon-check" :style="{fontWeight: '600', paddingLeft: '0rem', paddingRight: '0rem'}">completed</vs-button>
                                <h5 class="testResult">result: {{quizItem.totalMark}}</h5>
                                <h5 class="questionNumber">{{quizItem.guessResult}}/{{quizItem.questionNumbers}} questions</h5>
                                <vs-button color="danger" type="gradient" @click="quizEnter(quizItem._id)" v-if="quizItem.completed == true">Pass again</vs-button>
                                <vs-button class="startTest" type="gradient" @click="quizEnter(quizItem._id)" v-if="quizItem.completed == false">Start test</vs-button>
                            </div>
                        </div>
                    </vs-card>
                </vs-tab>
            </vs-tabs>
           
           
        </vs-col>
    </vs-row>
</div>
</template>

<script>
import { GETTRACKITEMS, UPDATEQUIZITEM } from '@/store/actionType.js';
import { mapState } from 'vuex';
import { completedIcon } from '@/assets/images/logo/completed.png';
export default {
    data() {
        return {
            subjectId: null,
            completedIcon: completedIcon,
            rxColor: 'rgb(115, 1, 255)',
        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.initialState.user.user._id,
            subjectInformation: state => state.client.subjectInformation,
            chapterItems: state => state.client.chapterItems,
            quizItems: state => state.client.quizItems,
            chapterSummary: state => state.client.chapterSummary,
            chapterName: state => state.client.chapterName,
            quizHistories: state => state.client.quizHistories
        })
    },
    methods :{
        getDifficultyColor(difficulty) {
            if(difficulty == 'easy') return "primary"
            else if(difficulty == 'medium') return "warning"
            else if(difficulty == 'difficult') return "danger"
        },
        updateQuizItem(id) {
            let rdata = {
                id: id,
                user: this.user
            }
            this.$store.dispatch(UPDATEQUIZITEM, rdata);
        },
        quizEnter(id) {
            this.$router.push('/test/'+ id);
        }
    },
    watch: {
        '$route.params.id': function (id) {
            this.$store.dispatch(GETTRACKITEMS, id);
        },
    },
    created() {
        this.subjectId = this.$router.currentRoute.params.id;
        let rdata = {
            id: this.subjectId,
            user: this.user
        }
        this.$store.dispatch(GETTRACKITEMS, rdata);
    }
}
</script>

<style>
    .track-body {
        margin: 10px 10% 10px;
        padding: 50px;
    }
    .track-header {
        font-size: 40px;
        font-weight: 900;
        text-align: center;
    }
    .track-content {
        margin-top: 50px;
    }
    .chapterItemField {
        padding: 10px 10px 0px;
        display: flex;
    }
    .subjectInformation {
        padding: 10px;
    }
    .chapterInformation {
        padding: 10px;
    }
    .quizInformation {
        width: 70%;
        display: block;
    }
    .testResultField {
        display: block;
        width: 30%;
    }
    .quizName {
        font-weight: 600;
        padding-bottom: 20px;
    }
    .quizLevel {
        padding-bottom: 20px;
    }
    .completed{
        margin-bottom: 10px;
    }
    .testResult {
        margin-bottom: 10px;
        font-weight: 600;
    }
    .questionNumber {
        margin-bottom: 10px;
        font-weight: 600;
    }
    .levelName {
        padding: 10px;
    }
    .categoryName {
        padding: 10px;
    }
    .subjectName {
        padding: 10px;
    }
    .TrackItems {
        margin-top: 5px;
        font-size: 18px;
    }
    .chapterName {
        cursor: pointer;
        padding: 5px;
    }
    .chapterName:hover {
        background: rgb(211, 210, 210);
    } 
    .chapterSummary {
        font-size: 20px;
        padding: 10px;
    }
    .chapterSummaryheader {
        font-weight: 600;
        color: purple;
    }
    .startTest {
        background:linear-gradient(225deg, #FF416C 0%, #FF4B2B 100%);
    }
    @media(max-width:800px) {
        .track-body {
            margin: 0px;
            padding: 10px;
        }
        .track-header {
            font-size: 30px;
            font-weight: 700;
        }
    }
</style>