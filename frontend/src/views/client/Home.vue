<template>
<div>
 <div class="lp-hero__image">
        <div class="container">
            <div class="lp-hero__text">
                <h1>{{$t('testyouskills')}}</h1>
                <p>
                    {{$t('school_university_subjects')}}
                </p>
               
                <button @click="$router.push('/choose-subject')" class="general-btn yellow-btn">
                    {{$t('chooseSubject')}}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="10"
                        viewBox="0 0 20 10"
                    >
                        <path
                            id="black-arrow"
                            d="M15.012,3.75H0v2.5H15.012V10L20,5,15.012,0Z"
                        ></path>
                    </svg>
                </button>
              
            </div>
        </div>
    </div>
    <Subjects></Subjects>
    <Faq></Faq>
</div>
</template>
<script>
import Subjects from './components/Subjects';
import Faq from './components/Faq';
export default {
    data: () => ({}),
    components: {
        Subjects,
        Faq
    }
};
</script>

