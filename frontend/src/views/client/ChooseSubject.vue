<template>
    <div class="carousel-example">
        <swiper :options="swiperOption">
            <swiper-slide v-for="(subjectItem, index) in subjectItems" :key="index">
                <div>
                <h4 class="subjectItem-header">{{subjectItem.name}}</h4>
                <vs-button class="subjectItemButton" color="primary" type="filled"><router-link :to="'/track/' + subjectItem._id" :style="{color: 'white'}">Start</router-link></vs-button>
                </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>
<script>
import ClientService from '@/services/client.service.js';
import 'swiper/dist/css/swiper.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    data() {
        return {
            subjectItems:[],
            swiperOption: {
                slidesPerView: 4,
                slidesPerColumn: 2,
                spaceBetween: 30,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                breakpoints: {
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 40
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    }
                }
            }
        }
    },
    created() {
        let rdata = this.$i18n.locale;
        return ClientService.getAllSubjectItems(rdata).then(
            res => {
                console.log(res);
                this.subjectItems = res.data;
            }
        );
    },
    components: {
        swiper,
        swiperSlide
    }
}
</script>
<style lang="scss">
.carousel-example .swiper-container .swiper-slide {
    text-align: center;
    font-size: 20px;
    font-weight: 700;   
    // background-color: #eee;
    background-image: url('../../assets/images/pages/subjectItem.jpg');
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    min-height: 200px;
}
.subjectItem-header {
    font-weight: 600;
}
.subjectItemButton {
    margin-top: 10px;
}
</style>