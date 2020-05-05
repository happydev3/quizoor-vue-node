<template>
<section class="lp-faq" id="faq-section">
  <div class="container">
    <h2 class="faq">{{$t('FAQ')}}</h2>
    <vs-collapse accordion>
      <vs-collapse-item>
        <div slot="header">{{$t('faq1')}}</div>{{$t('faqAnswer1')}}
      </vs-collapse-item>
      <vs-collapse-item>
        <div slot="header">{{$t('faq2')}}</div>{{$t('faqAnswer2')}}
      </vs-collapse-item>
      <vs-collapse-item>
        <div slot="header">{{$t('faq3')}}</div>{{$t('faqAnswer3')}}
      </vs-collapse-item>
      <vs-collapse-item>
        <div slot="header">{{$t('faq4')}}</div>{{$t('faqAnswer4')}}
      </vs-collapse-item>
    </vs-collapse>
  </div>
</section>
</template>
<script>
export default {

}
</script>
