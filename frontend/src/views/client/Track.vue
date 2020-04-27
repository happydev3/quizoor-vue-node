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
            <vs-card>
                <div slot="header">
                    <h3 class="chapterSummaryheader">
                        Chapter Summnary
                    </h3>
                </div>
                <div class="chapterSummary" v-html="chapterSummary">{{chapterSummary}}</div>
            </vs-card>
            <vs-card v-for="(quizItem, index) in quizItems" :key="index">
                <div class="chapterItemField">
                    <div class="quizInformation">
                        <h3 class="quizName">{{quizItem.name}}</h3>
                        <vs-chip class="quizDifficulty" :color="getDifficultyColor(quizItem.difficulty)">{{quizItem.difficulty}}</vs-chip>
                    </div>
                    <div class="testResultField">
                        <h5 class="completed">completed</h5>
                        <h5 class="testResult">result</h5>
                        <h5 class="questionNumber">Question Numbers</h5>
                        <vs-button class="startTest" type="gradient" @click="quizEnter(quizItem._id)">Start test</vs-button>
                    </div>
                </div>
            </vs-card>
        </vs-col>
    </vs-row>
</div>
</template>

<script>
import { GETTRACKITEMS, UPDATEQUIZITEM } from '@/store/actionType.js';
import { mapState } from 'vuex';
export default {
    data() {
        return {
            subjectId: null
        }
    },
    computed: {
        ...mapState({
            subjectInformation: state => state.client.subjectInformation,
            chapterItems: state => state.client.chapterItems,
            quizItems: state => state.client.quizItems,
            chapterSummary: state => state.client.chapterSummary,
            chapterName: state => state.client.chapterName
        })
    },
    methods :{
        getDifficultyColor(difficulty) {
            if(difficulty == 'easy') return "primary"
            else if(difficulty == 'medium') return "warning"
            else if(difficulty == 'difficult') return "danger"
        },
        updateQuizItem(id) {
            console.log(id);
            this.$store.dispatch(UPDATEQUIZITEM, id);
        },
        quizEnter(id) {
            console.log(id);
            this.$router.push('/test/'+ id);
        }
    },
    watch: {
        '$route.params.id': function (id) {
            console.log(id);
            this.$store.dispatch(GETTRACKITEMS, id);
        }
    },
    created() {
        this.subjectId = this.$router.currentRoute.params.id;
        console.log(this.subjectId);
        this.$store.dispatch(GETTRACKITEMS, this.subjectId);
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
    }
    .testResultField {
        display: block;
        width: 30%;
        justify-content: flex-end;
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