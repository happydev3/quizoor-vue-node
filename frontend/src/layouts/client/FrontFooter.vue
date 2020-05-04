<template>
  <footer class="footer">
      <div class="footer__container container">
        <div class="footer__left-part">
          <div class="footer__logo">
            <img class="titleImg" :src="titleImg" alt="Quizoor" draggable="false" />
          </div>
          <div class="footer__copyright">
            <p>© quizoor | {{ new Date().getFullYear() }}</p>
          </div>
          <ul class="f-social">
            <li class="f-social__item f-social__item--facebook">
              <a
                class="f-social__link"
                target="_blank"
                rel="noopener"
                aria-label="Visiter ma page Facebook"
                href="https://www.facebook.com/Quizoor/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xlink="http://www.w3.org/1999/xlink"
                  width="19.532"
                  height="19.532"
                  viewBox="0 0 19.532 19.532"
                >
                  <defs>
                    <clipPath id="clip-path">
                      <rect width="19.532" height="19.532" fill="none" />
                    </clipPath>
                  </defs>
                  <g
                    id="Icons_Social_24-facebook"
                    data-name="Icons/Social/24-facebook"
                    clip-path="url(#clip-path)"
                  >
                    <g id="facebook">
                      <path
                        id="Shape"
                        d="M16.9,0H2.632A2.632,2.632,0,0,0,0,2.632V16.9a2.632,2.632,0,0,0,2.632,2.632H9.669l.012-6.98H7.868a.428.428,0,0,1-.428-.426l-.009-2.25a.428.428,0,0,1,.428-.43h1.81V7.273a3.552,3.552,0,0,1,3.791-3.9h1.847a.428.428,0,0,1,.428.428V5.7a.428.428,0,0,1-.428.428H14.174c-1.224,0-1.461.582-1.461,1.435V9.447H15.4a.428.428,0,0,1,.425.478l-.267,2.25a.428.428,0,0,1-.425.378H12.725l-.012,6.98H16.9A2.632,2.632,0,0,0,19.532,16.9V2.632A2.632,2.632,0,0,0,16.9,0Z"
                        fill="#475993"
                      />
                    </g>
                  </g>
                </svg>
              </a>
            </li>
            <li class="f-social__item f-social__item--instagram">
              <a
                class="f-social__link"
                target="_blank"
                rel="noopener"
                aria-label="Visiter ma page Instagram"
                href="https://www.instagram.com/quizoor/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xlink="http://www.w3.org/1999/xlink"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <defs>
                    <clipPath id="clip-path">
                      <rect width="20" height="20" fill="none" />
                    </clipPath>
                    <linearGradient
                      id="linear-gradient"
                      x1="0.5"
                      y1="0.997"
                      x2="0.5"
                      y2="0.008"
                      gradientUnits="objectBoundingBox"
                    >
                      <stop offset="0" stop-color="#e09b3d" />
                      <stop offset="0.3" stop-color="#c74c4d" />
                      <stop offset="0.6" stop-color="#c21975" />
                      <stop offset="1" stop-color="#7024c4" />
                    </linearGradient>
                    <linearGradient
                      id="linear-gradient-2"
                      y1="1.461"
                      y2="-0.452"
                      href="#linear-gradient"
                    />
                    <linearGradient
                      id="linear-gradient-3"
                      y1="6.581"
                      y2="-1.4"
                      href="#linear-gradient"
                    />
                  </defs>
                  <g
                    id="Icons_Social_24-instagram"
                    data-name="Icons/Social/24-instagram"
                    clip-path="url(#clip-path)"
                  >
                    <g id="instagram" transform="translate(0 0)">
                      <path
                        id="Shape"
                        d="M14.042,20H5.958A5.965,5.965,0,0,1,0,14.042V5.958A5.965,5.965,0,0,1,5.958,0h8.084A5.965,5.965,0,0,1,20,5.958v8.084A5.965,5.965,0,0,1,14.042,20ZM5.958,2.012A3.95,3.95,0,0,0,2.012,5.958v8.084a3.951,3.951,0,0,0,3.946,3.947h8.084a3.951,3.951,0,0,0,3.947-3.947V5.958a3.951,3.951,0,0,0-3.947-3.946Z"
                        fill="url(#linear-gradient)"
                      />
                      <path
                        id="Shape-2"
                        data-name="Shape"
                        d="M5,10a5,5,0,1,1,5-5A5.006,5.006,0,0,1,5,10ZM5,1.945A3.055,3.055,0,1,0,8.055,5,3.059,3.059,0,0,0,5,1.945Z"
                        transform="translate(5 5)"
                        fill="url(#linear-gradient-2)"
                      />
                      <circle
                        id="Oval"
                        cx="1.199"
                        cy="1.199"
                        r="1.199"
                        transform="translate(13.485 3.507)"
                        fill="url(#linear-gradient-3)"
                      />
                    </g>
                  </g>
                </svg>
              </a>
            </li>
            <li class="f-social__item f-social__item--twitter">
              <a
                class="f-social__link"
                target="_blank"
                rel="noopener"
                aria-label="Visit my Twitter"
                href="https://twitter.com/quizoor"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xlink="http://www.w3.org/1999/xlink"
                  width="20.615"
                  height="17.148"
                  viewBox="0 0 20.615 17.148"
                >
                  <defs>
                    <clipPath id="clip-path">
                      <rect width="20.615" height="17.148" fill="none" />
                    </clipPath>
                  </defs>
                  <g
                    id="Icons_Social_24-twitter"
                    data-name="Icons/Social/24-twitter"
                    transform="translate(0 0)"
                    clip-path="url(#clip-path)"
                  >
                    <g id="twitter" transform="translate(0 -0.025)">
                      <path
                        id="Shape"
                        d="M20.287,1.995a8.163,8.163,0,0,1-1.421.479A4.432,4.432,0,0,0,20.035.611h0A.232.232,0,0,0,19.7.34h0a8.2,8.2,0,0,1-2.173.9.554.554,0,0,1-.136.017.576.576,0,0,1-.38-.145A4.444,4.444,0,0,0,14.065,0a4.752,4.752,0,0,0-1.408.217,4.306,4.306,0,0,0-2.9,3.1A4.741,4.741,0,0,0,9.65,4.956a.159.159,0,0,1-.04.125.165.165,0,0,1-.123.056H9.472A11.654,11.654,0,0,1,1.462.856h0a.232.232,0,0,0-.381.03h0a4.449,4.449,0,0,0,.723,5.4A3.983,3.983,0,0,1,.79,5.9h0a.232.232,0,0,0-.345.2h0a4.45,4.45,0,0,0,2.6,4.1H2.946a4,4,0,0,1-.749-.071h0a.232.232,0,0,0-.265.3h0a4.454,4.454,0,0,0,3.518,3.03A8.2,8.2,0,0,1,.857,14.85H.343a.34.34,0,0,0-.333.257.352.352,0,0,0,.169.389,12.2,12.2,0,0,0,6.13,1.653,12.366,12.366,0,0,0,5.238-1.111,11.567,11.567,0,0,0,3.833-2.872,12.591,12.591,0,0,0,2.347-3.93,12.416,12.416,0,0,0,.8-4.3V4.865a.756.756,0,0,1,.283-.589,8.784,8.784,0,0,0,1.767-1.94h0a.232.232,0,0,0-.287-.342Z"
                        transform="translate(0 0.025)"
                        fill="#76a9ea"
                      />
                    </g>
                  </g>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <nav class="f-nav">
          <ul class="f-nav__list"></ul>
          <ul class="f-nav__list">
            <li class="f-nav__item">
              <p class="f-nav__link js-smooth-scroll" href></p>
            </li>
          </ul>
          <ul class="f-nav__list">
            <li class="f-nav__item">
              <p class="f-nav__link js-smooth-scroll" href>Company</p>
            </li>
            <li class="f-nav__item">
              <a class="f-nav__link js-smooth-scroll" href="/aboutUs">About us</a>
            </li>
            <li class="f-nav__item">
              <a class="f-nav__link js-smooth-scroll" href="/contactUs">Contact us</a>
            </li>
          </ul>
          <ul class="f-nav__list">
            <li class="f-nav__item">
              <p class="f-nav__link js-smooth-scroll" href>We accept</p>
            </li>
            <li class="f-nav__item ib">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xlink="http://www.w3.org/1999/xlink"
                width="46"
                height="30"
                viewBox="0 0 46 30"
              >
                <defs>
                  <pattern
                    id="pattern"
                    preserveAspectRatio="none"
                    width="100%"
                    height="100%"
                    viewBox="0 0 1200 391"
                  >
                    <image width="1200" height="391" href="cb-image.png" />
                  </pattern>
                </defs>
                <g id="cb" transform="translate(-942 -45)">
                  <rect
                    id="Rectangle_17"
                    data-name="Rectangle 17"
                    width="46"
                    height="30"
                    rx="4"
                    transform="translate(942 45)"
                    fill="#1c4095"
                  />
                  <g id="Visa_2014_logo_detail.svg" transform="translate(948 55)">
                    <rect
                      id="Visa_2014_logo_detail.svg-2"
                      data-name="Visa_2014_logo_detail.svg"
                      width="34"
                      height="11"
                      fill="url(#pattern)"
                    />
                    <rect
                      id="Visa_2014_logo_detail.svg-3"
                      data-name="Visa_2014_logo_detail.svg"
                      width="34"
                      height="11"
                      fill="#fff"
                    />
                  </g>
                </g>
              </svg>
            </li>
            <li class="f-nav__item ib">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xlink="http://www.w3.org/1999/xlink"
                width="46"
                height="30"
                viewBox="0 0 46 30"
              >
                <defs>
                  <pattern
                    id="pattern"
                    preserveAspectRatio="none"
                    width="100%"
                    height="100%"
                    viewBox="0 0 381 229"
                  >
                    <image width="381" height="229" href="master-card-image.png" />
                  </pattern>
                </defs>
                <g id="master-card" transform="translate(-996 -45)">
                  <rect
                    id="Rectangle_17_Copy"
                    data-name="Rectangle 17 Copy"
                    width="46"
                    height="30"
                    rx="4"
                    transform="translate(996 45)"
                    fill="#231849"
                  />
                  <rect
                    id="Mastercard-PNG-Clipart"
                    width="28"
                    height="17"
                    transform="translate(1005 52)"
                    fill="url(#pattern)"
                  />
                </g>
              </svg>
            </li>
            <li class="f-nav__item ib">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xlink="http://www.w3.org/1999/xlink"
                width="46"
                height="30"
                viewBox="0 0 46 30"
              >
                <defs>
                  <radialGradient
                    id="radial-gradient"
                    cx="0.219"
                    cy="0.246"
                    r="0.682"
                    gradientUnits="objectBoundingBox"
                  >
                    <stop offset="0" stop-color="#87baeb" />
                    <stop offset="1" stop-color="#2e77bc" />
                  </radialGradient>
                  <pattern
                    id="pattern"
                    preserveAspectRatio="none"
                    width="100%"
                    height="100%"
                    viewBox="0 0 384 132"
                  >
                    <image width="384" height="132" href="amex-image.png" />
                  </pattern>
                </defs>
                <g id="amex" transform="translate(-1050 -45)">
                  <rect
                    id="Rectangle_17_Copy_2"
                    data-name="Rectangle 17 Copy 2"
                    width="46"
                    height="30"
                    rx="4"
                    transform="translate(1050 45)"
                    fill="url(#radial-gradient)"
                  />
                  <g id="american-express-logo-icon-90373" transform="translate(1054 54)">
                    <rect
                      id="american-express-logo-icon-90373-2"
                      data-name="american-express-logo-icon-90373"
                      width="39"
                      height="13"
                      fill="url(#pattern)"
                    />
                    <rect
                      id="american-express-logo-icon-90373-3"
                      data-name="american-express-logo-icon-90373"
                      width="39"
                      height="13"
                      fill="#fff"
                    />
                  </g>
                </g>
              </svg>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
</template>
<script>
import titleImg from "../../assets/images/logo/quiz.png";
export default {
  name : 'FrontFooter',
  data: () => ({
    titleImg: titleImg
  })
}
</script>
