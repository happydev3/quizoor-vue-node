<template>
  <section class="lp-subjects" :style="{ fontFamily: 'sans-serif'}">
    <div class="container">
      <header class="lp-subjects__header">
        <h2 class="lp-subjects__title">{{$t('curriculum')}}</h2>
      </header>
      <div class="lp-subjects__inner">
        <ul class="lp-subjects__list">
          <li class="lp-subjects__item" :style="{textAlign: 'start'}">
            <ul>
              <li class="subItem">
                <a href="/subject/5e2f67c3a486240017bb2b65">Algebra</a>
              </li>
              <li class="subItem">
                <a href="/subject/5e2f6811a486240017bb2b69">Calculus</a>
              </li>
              <li class="subItem">
                <a href="/subject/5e2f67ffa486240017bb2b68">Geometry</a>
              </li>
              <li class="subItem">
                <a href="/subject/5d6c6866b623c3001704fc2e">Infectious diseases</a>
              </li>
            </ul>
          </li>
          <li class="lp-subjects__item" :style="{textAlign: 'center'}">
            <ul>
              <li class="subItem">
                <a href="/subject/5d6c678cb623c3001704fc29">Neurological and Psychiatric disorders</a>
              </li>
              <li class="subItem">
                <a href="/subject/5e2f67efa486240017bb2b67">Precalculus</a>
              </li>
              <li class="subItem">
                <a href="/subject/5e2f67d7a486240017bb2b66">Statistics</a>
              </li>
              <li class="subItem">
                <a href="/subject/5d644665bbee830017617d5b">SubjectTest2</a>
              </li>
            </ul>
          </li>
          <li class="lp-subjects__item" :style="{textAlign: 'end'}">
            <ul>
              <li class="subItem">
                <a href="/subject/5e2f682aa486240017bb2b6a">Trigonometry</a>
              </li>
              <li class="subItem">
                <a href="/subject/5d6047b36bf5c00017955671">subjectTest</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  // name: 'the-subjects',
};
</script>
