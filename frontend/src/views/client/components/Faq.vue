<template>
<section class="lp-faq" id="faq-section">
  <div class="container">
    <h2 class="faq">{{$t('FAQ')}}</h2>
    <vs-collapse accordion>
      <vs-collapse-item>
        <div slot="header">{{$t('faq1')}}</div>Any student for any major is welcome to take advantage of the unique perspective that Quizoor offer to students.
      </vs-collapse-item>
      <vs-collapse-item>
        <div slot="header">{{$t('faq2')}}</div>Our unique goal at Quizoor is to allow students to grow in confidence in their mastering of all difficult concepts that are taught in colleges and universities. That is why we build our questions around these concepts to reinforce their understanding and their application in various situations. After using Quizoor, you will not be that student who forget everything after the exam is done. You will find yourself remembering all the core concept of every lecture with ease.
      </vs-collapse-item>
      <vs-collapse-item>
        <div slot="header">{{$t('faq3')}}</div>For every quiz that you take on Quizoor, your score is saved so that you can see areas where you have done well and areas where you need to improve.
      </vs-collapse-item>
      <vs-collapse-item>
        <div slot="header">{{$t('faq4')}}</div>A five dollars membership fee is charged monthly on Quizoor so that we can continue to provide a high-quality service to our users.
      </vs-collapse-item>
    </vs-collapse>
  </div>
</section>
</template>
<script>
export default {

}
</script>
