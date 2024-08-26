<template>
  <div class="logo__product__hunt">
    <a href="https://www.producthunt.com/products/bohr-io#bohr-io" target="_blank">
      <img class="product__hunt" src="../../public/assets/img/home/product-hunt.png" alt="Logo Product Hund" title="bohr.io was ranked daily #2 for July 4th, 2023">
    </a>
  </div>
  <div class="home__header">
    <h1 class="home__title">
      {{ $t('home.codeMore') }}
    </h1>
    <p class="home__back__message">
      {{ $t('home.manageLess') }}
    </p>
  </div>
  <main style="max-width: 1261px; margin-inline: auto; overflow: hidden;">
    <section>
      <div class="content__container bohr__video__container standard__block__margins--top standard__block__margins--bottom">
        <div class="bohr__showcase__wrapper">
          <video src="https://pub-e64fd5c7ffc34c26815f241028abf37f.r2.dev/bohr-showcase.mp4" type="video/mp4" id="bohr__showcase" class="bohr__showcase" width="1280" height="720" muted autoplay loop poster="/assets/img/home/home-showcase-thumbnail.jpg"></video>
        </div>
      </div>
    </section>
    <section id="for">
      <BohrBox class="bohr__box__standard__margin content__container frame__text__el frame__text__el__developers " :color="'orange'">
        <img class="frame__text__el--frame" src="../../public/assets/img/home/bohr-logo-texture.png" alt="bohr.io logo" role="presentation" data-aos="fade-right" data-aos-duration="300" data-aos-offset="300"/>
        <div class="frame__text__el--text">
          <h2 class="gradient__title text__bg-clip gradient__bg--sec-pri-ter" data-bohr-cms data-bohr-file="public/home.html" data-bohr-index="0" data-bohr-dist-file="home.html" data-bohr-dist-index="0">{{ $t('home.for.title') }}</h2>
          <p class="regular__text__just__code" data-bohr-cms data-bohr-file="public/home.html" data-bohr-index="1" data-bohr-dist-file="home.html" data-bohr-dist-index="1">{{ $t('home.for.text.0') }} <strong class="text__bg-clip gradient__bg--sec-pri-ter">{{ $t('home.for.text.1') }} </strong>{{ $t('home.for.text.2') }}</p>
        </div>
      </BohrBox>
    </section>
    <section id="compatible" class="compatible__section">
      <div class="content__container" data-aos="fade-up" data-aos-duration="300" data-aos-anchor-placement="top-center" data-aos-offset="-300">
        <h2 class="solid__title text__center">{{ $t('home.compatible.title') }}</h2>
        <ul class="tools__display">
          <li>
            <ul class="tools__display__line">
              <li>
                <img class="tool__on__display" width="50" height="50" src="../../public/assets/svg/home/next.svg" alt="next logo">
              </li>
              <li>
                <img class="tool__on__display" width="50" height="50" src="../../public/assets/svg/home/svelte.svg" alt="svelte logo">
              </li>
              <li>
                <img class="tool__on__display" width="50" height="50" src="../../public/assets/svg/home/angular.svg" alt="angular logo">
              </li>
              <li>
                <img class="tool__on__display" width="50" height="50" src="../../public/assets/svg/home/gatsby.svg" alt="gatsby logo">
              </li>
              <li>
                <img class="tool__on__display" width="50" height="50" src="../../public/assets/svg/home/remix.svg" alt="remix logo">
              </li>
              <li>
                <img class="tool__on__display" width="50" height="50" src="../../public/assets/svg/home/vue.svg" alt="vue logo">
              </li>
              <li>
                <img class="tool__on__display" width="50" height="50" src="../../public/assets/svg/home/tailwind.svg" alt="tailwind logo">
              </li>
              <li>
                <img class="tool__on__display" width="50" height="50" src="../../public/assets/svg/home/react.svg" alt="react logo">
              </li>
              <li>
                <img class="tool__on__display" width="50" height="50" src="../../public/assets/svg/home/solid.svg" alt="solid logo">
              </li>
              <li>
                <img class="tool__on__display" width="50" height="50" src="../../public/assets/svg/home/nuxt.svg" alt="nuxt logo">
              </li>
            </ul>
          </li>
          <li>
            <ul class="tools__display__line">
            </ul>
          </li>
        </ul>
      </div>
      <BohrBox class="content__container frame__text__el frame__text__el__estability" :color="'green'">
        <div class="frame__text__el--text" style="margin-top: -7px" data-aos="fade-up" data-aos-duration="300" data-aos-anchor-placement="top-center" data-aos-offset="-300">
          <h3 class="gradient__title text__bg-clip color__bohr__functions">{{ $t('home.compatible.bohrFunctions.title') }}</h3>
          <p class="regular__text__develop">{{ $t('home.compatible.bohrFunctions.text.0') }} <strong class="text__bg-clip color__bohr__functions">{{ $t('home.compatible.bohrFunctions.text.1')}}</strong> {{ $t('home.compatible.bohrFunctions.text.2')}} <strong class="text__bg-clip color__bohr__functions">{{ $t('home.compatible.bohrFunctions.text.3')}}</strong> {{ $t('home.compatible.bohrFunctions.text.4')}} </p>
        </div>
        <img class="frame__text__el--frame" src="../../public/assets/img/home/services-frame.png" alt="" role="presentation" data-aos="fade-right" data-aos-duration="300" data-aos-offset="300">
    </BohrBox>
    </section>
    <main class="home__main">
      <section class="sites__section">
        <BohrTypography tag="h2" variant="title2" color="#55DDE0" class="featured__projects">
          {{ $t('home.section.featuredProjects.title') }}
        </BohrTypography>
          <div class="sites__list">
            <NewSiteLink withText />
            <template v-for="project in featuredProjects" :key="`${project.org} - ${project.name}`">
              <SiteCard :project="project" />
            </template>
          </div>
          <div class="sites__all">
            <router-link class="sites__all__link" :to="{ name: 'FeaturedProjects' }">
              <BohrTypography
                variant="title3">
                {{ $t('home.section.featuredProjects.seeAll') }}
              </BohrTypography>
              <ArrowIcon direction="right" :sizePx="24" isGradient />
            </router-link>
          </div>
      </section>
    </main>
    <section id="features">
      <div class="community__content">
        <BohrBox class="content__container frame__text__el frame__text__el__community" :color="'purple'">
          <img class="frame__text__el--frame" src="../../public/assets/img/home/discord-frame.png" alt="" role="presentation" data-aos="fade-up" data-aos-duration="300" data-aos-offset="300">
          <div class="frame__text__el--text" style="margin-top: -50px;" data-aos="fade-right" data-aos-duration="300" data-aos-anchor-placement="top-center" data-aos-offset="-300">
            <h3 class="gradient__title text__bg-clip color__bohr__features__discord">{{ $t('home.community.title') }}</h3>
            <p class="regular__text__discord">
              <span>{{ $t('home.community.text.0') }}</span>
              <a href="https://discord.com/invite/p3hhfGg2Uy" target="_blank" rel="noreferrer" class="text__bg-clip color__bohr__features__discord" data-gtag-event="discord_link_community"> {{ $t('home.community.text.1') }} </a>
              <span> {{ $t('home.community.text.2') }} <strong>{{ $t('home.community.text.3') }} </strong></span>
            </p>
          </div>
        </BohrBox>
      </div>
      <div class="content__container frame__text__el">
        <div class="frame__text__el--text" data-aos="fade-up" data-aos-duration="300" data-aos-anchor-placement="top-center" data-aos-offset="-300">
          <h3 class="gradient__title text__bg-clip color__bohr__features__request">{{ $t('home.requests.title') }}</h3>
          <p class="regular__text">{{ $t('home.requests.text.0') }} <strong><a class="text__bg-clip color__bohr__features__request" href="https://bohr.io/terminal">{{ $t('home.requests.text.1') }}</a></strong> {{ $t('home.requests.text.2') }} <strong style="text-decoration: underline;" class="text__bg-clip color__bohr__features__request"><a href="https://www.npmjs.com/package/bohr" target="_blank"> {{ $t('home.requests.text.3') }} </a></strong> {{ $t('home.requests.text.4') }} <strong>{{ $t('home.requests.text.5') }}</strong> {{ $t('home.requests.text.6') }}</p>
        </div>
        <img class="frame__text__el--frame" src="../../public/assets/img/home/requests-frame.png" alt="" role="presentation" data-aos="fade-right" data-aos-duration="300" data-aos-offset="300">
      </div>
    </section>
    <section id="pricing">
      <div class="plans__block">
        <BohrBox class="content__container frame__text__el__requests" :color="'red'">
          <h2 class="solid__title text__center text__color" data-aos="fade-up" data-aos-duration="300" data-i18n="plans.blockTitle" data-aos-anchor-placement="top-center">{{ $t('home.plans.blockTitle') }}</h2>
          <ul class="plan__list">
            <li data-aos="fade-up" data-aos-duration="500" data-aos-anchor-placement="top-center">
              <BohrBox class="plan__option" :color="'red'">
                <img width="80" height="80" src="../../public/assets/svg/home/free-plan.svg" alt="paper airplane wireframe">
                <h3 class="plan__name string__color">{{ $t('home.plans.hobby.title') }}</h3>
                <span class="price__tag string__color">
                  {{ $t('home.plans.hobby.price') }}
                </span>
                <ul class="plan__benefits">
                  <li class="plan__benefit">
                    <img src="/assets/svg/home/plan-checkmark.svg" width="30" height="30" class="benefit__checkmark" role="presentation" alt=""/>
                    <span>{{ $t('home.plans.hobby.benefits.1.0') }}<strong class="string__color">{{ $t('home.plans.hobby.benefits.1.1') }}</strong>{{ $t('home.plans.hobby.benefits.1.2') }}</span>
                  </li>
                  <li class="plan__benefit">
                    <img src="/assets/svg/home/plan-checkmark.svg" width="30" height="30" class="benefit__checkmark" role="presentation" alt=""/>
                    <strong class="string__color">{{ $t('home.plans.hobby.benefits.2.0') }}</strong>
                  </li>
                </ul>
                <a class="btn" href="/projects/new" data-login data-gtag-event="plans_login" onclick="ttq.track('CompleteRegistration')">{{ $t('home.plans.hobby.cta') }}</a>
              </BohrBox>
            </li>
            <li data-aos="fade-up" data-aos-duration="500" data-aos-delay="250" data-aos-anchor-placement="top-center">
              <BohrBox class="plan__option" :color="'red'">
                <img width="80" height="80" src="../../public/assets/svg/home/pro-plan.svg" alt="airline airplane wireframe">
                <h3 class="plan__name string__color">{{ $t('home.plans.pro.title') }}</h3>
                <span class="price__tag string__color" data-i18n="plans.pro.price">
                  {{ $t('home.plans.pro.price') }}
                </span>
                <span class="price_tag string__color">
                  {{ $t('home.plans.pro.month') }}
                </span>
                <ul class="plan__benefits">
                  <li class="plan__benefit">
                    <img src="/assets/svg/home/plan-checkmark.svg" width="30" height="30" class="benefit__checkmark" role="presentation" alt=""/>
                    <span>{{ $t('home.plans.pro.benefits.1.0') }}<strong class="string__color">{{ $t('home.plans.pro.benefits.1.1') }}</strong>{{ $t('home.plans.pro.benefits.1.2') }}</span>
                  </li>
                  <li class="plan__benefit">
                    <img src="/assets/svg/home/plan-checkmark.svg" width="30" height="30" class="benefit__checkmark" role="presentation" alt=""/>
                    <span class="string__color"><strong> {{ $t('home.plans.pro.benefits.2.0') }}</strong></span>
                  </li>
                  <li class="plan__benefit">
                    <img src="/assets/svg/home/plan-checkmark.svg" width="30" height="30" class="benefit__checkmark" role="presentation" alt=""/>
                    <span>{{ $t('home.plans.pro.benefits.3.0') }}<strong class="string__color">{{ $t('home.plans.pro.benefits.3.1') }}</strong></span>
                  </li>
                  <li class="plan__benefit">
                    <img src="/assets/svg/home/plan-checkmark.svg" width="30" height="30" class="benefit__checkmark" role="presentation" alt=""/>
                    <span>{{ $t('home.plans.pro.benefits.4.0') }}<strong class="string__color">{{ $t('home.plans.pro.benefits.4.1') }}</strong></span>
                  </li>
                  <!-- <li class="plan__benefit">
                    <img src="/assets/svg/home/plan-checkmark.svg" width="30" height="30" class="benefit__checkmark" role="presentation" alt=""/>
                    <strong class="string__color">{{ $t('home.plans.pro.benefits.5.0') }}</strong>
                  </li> -->
                </ul>
                <em class="plan__disclaimer"><span>{{ $t('home.plans.pro.disclaimer.text') }}</span><a href="https://docs.bohr.io/docs/dominios-disponiveis" target="_blank">{{ $t('home.plans.pro.disclaimer.others') }}</a>.</em>
                <a class="btn" href="/api/stripe/payment" target="_blank" rel="noreferrer" data-gtag-event="plans_pro">{{ $t('home.plans.pro.cta') }}</a>
              </BohrBox>
            </li>
            <li data-aos="fade-up" data-aos-duration="500" data-aos-delay="500" data-aos-anchor-placement="top-center">
              <BohrBox class="plan__option plan__option--highlight" :color="'red'">
                <img width="80" height="80" src="../../public/assets/svg/home/enterprise-plan.svg" alt="spacerocket wireframe">
                <h3 class="plan__name">{{ $t('home.plans.startups.title') }}</h3>
                <ul class="plan__benefits">
                  <li class="plan__benefit">
                    <img src="/assets/svg/home/plan-checkmark.svg" width="30" height="30" class="benefit__checkmark" role="presentation" alt=""/>
                    <span><strong class="string__color">{{ $t('home.plans.startups.benefits.1.0') }}</strong>{{ $t('home.plans.startups.benefits.1.1') }}</span>
                  </li>
                  <li class="plan__benefit">
                    <img src="/assets/svg/home/plan-checkmark.svg" width="30" height="30" class="benefit__checkmark" role="presentation" alt=""/>
                    <span><strong class="string__color">{{ $t('home.plans.startups.benefits.2.0') }}</strong>{{ $t('home.plans.startups.benefits.2.1') }}</span>
                  </li>
                  <li class="plan__benefit">
                    <img src="/assets/svg/home/plan-checkmark.svg" width="30" height="30" class="benefit__checkmark" role="presentation" alt=""/>
                    <span>{{ $t('home.plans.startups.benefits.3.0') }}<strong class="string__color">{{ $t('home.plans.startups.benefits.3.1') }}</strong></span>
                  </li>
                  <li class="plan__benefit">
                    <img src="/assets/svg/home/plan-checkmark.svg" width="30" height="30" class="benefit__checkmark" role="presentation" alt=""/>
                    <span><strong class="string__color">{{ $t('home.plans.startups.benefits.4.0') }}</strong>{{ $t('home.plans.startups.benefits.4.1') }}</span>
                  </li>
                  <li class="plan__benefit">
                    <img src="/assets/svg/home/plan-checkmark.svg" width="30" height="30" class="benefit__checkmark" role="presentation" alt=""/>
                    <span><strong class="string__color">{{ $t('home.plans.startups.benefits.5.0') }}</strong>{{ $t('home.plans.startups.benefits.5.1') }}</span>
                  </li>
                </ul>
                <a class="btn" href="https://calendly.com/boemeke" target="_blank" rel="noreferrer" data-gtag-event="plans_enterprise">{{ $t('home.plans.startups.cta') }}</a>
              </BohrBox>
            </li>
          </ul>
        </BohrBox>
      </div>
    </section>
    <section class="start__content">
      <BohrTypography tag="h2" variant="title2" color="#55DDE0" class="section__title">
        {{ $t('home.section.lastDevs.title') }}
      </BohrTypography>
      <ul class="global__presence">
        <li v-for="other in lastDevs" :key="other.username">
          <LastDevs
            :username="other.username"
            :avatarUrl="other.avatarUrl"
            :plan="other.plan"
            :linkedinUrl="other.linkedinUrl"
            :githubUrl="other.githubUrl"
            :mainSiteUrl="other.mainSiteUrl"
            :sizePx="60"
          />
          </li>  
      </ul>
      <div class="start__content">
        <BohrButton
          class="btn btn--sm start__btn"
          component="a"
          :href="createNewProjectUrl"
          rel="noreferrer"
          :style="{ color: '#0E1710', fontSize: '27px' }"
        >
          {{ $t('home.start') }}
        </BohrButton>
      </div>
    </section>
  </main>
    <footer>
      <div class="content__container footer__content">
        <div class="footer__container">
          <div class="column">
            <img src="../../public/assets/svg/bohr.svg" alt="Logo da Empresa">
            <ul class="social__links">
              <a href="https://github.com/bohr-io" target="_blank">
                <img src="../../public/assets/svg/github-pb.svg" alt="github logo" />
              </a>
              <a href="https://blog.bohr.io/" target="_blank">
                <img src="../../public/assets/svg/bohr-logo.svg" alt="bohr logo" />
              </a>
              <a href="https://discord.bohr.io" target="_blank">
                <img src="../../public/assets/svg/discord-pb.svg" alt="discord logo" />
              </a>
              <a href="https://www.linkedin.com/company/bohr-io/" target="_blank">
                <img src="../../public/assets/svg/linkedin-pb.svg" alt="linkedin logo" />
              </a>
              <a href="https://www.youtube.com/@boemeke" target="_blank">
                <img src="../../public/assets/svg/youtube.svg" alt="youtube logo" />
              </a>
            </ul>
            <div class="">
              <form
                action="https://app.convertkit.com/forms/2857001/subscriptions"
                class="seva-form formkit-form"
                method="post"
                data-sv-form="2857001"
                data-uid="a693b76e6c"
                data-format="inline"
                data-version="5"
                data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now check your email to confirm the subscription!","redirect_url":""},"analytics":{"google":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":true,"url":"https://convertkit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
                min-width="400 500 600 700 800"
                target="_blank"
              >
                <div class="bohr__newsletter">
                  <h1>{{ $t('home.newsletter') }}</h1>
                  <div class="campo-email">
                    <input 
                      class="input__newsletter"
                      aria-label="Name"
                      name="fields[first_name]"
                      :placeholder="$t('newsletter.name')"
                      required
                      type="text"
                      id="name"
                    >
                  </div>
                  <div class="campo-email">
                    <input 
                      class="input__newsletter"
                      name="email_address"
                      aria-label="Email Address"
                      :placeholder="$t('newsletter.email')"
                      required
                      type="email"
                      id="email"
                    >
                    <div class="linha"></div>
                  </div>
                  <button data-element="submit" class="botao-enviar" @mousedown="gtagEvent">{{ $t('home.submit') }}</button>
                </div>
                <div class="line"></div>
              </form>
            </div>
          </div>
          <div class="column">
            <h4>Product</h4>
            <ul>
              <li><a href="/login">{{ $t('home.signup') }}</a></li>
              <li><a href="https://bohr.io/docs">{{ $t('home.documentation') }}</a></li>
              <li><a href="https://bohr.io/projects/new">{{ $t('home.templates') }}</a></li>
              <li><a href="https://www.npmjs.com/package/bohr" target="_blank">{{ $t('home.cli') }}</a></li>
              <li><a href="https://status.bohr.io/" target="_blank">{{ $t('home.status') }}</a></li>
              <li><a href="https://www.youtube.com/watch?v=QVdKlQExFxY" target="_blank">{{ $t('home.roadmap') }}</a></li>
            </ul>
          </div>
          <!-- <div class="column">
            <h4>Resources</h4>
            <ul>
              <li><a href="https://docs.bohr.io/docs/privacy%20policy">{{ $t('home.privacyPolice') }}</a></li>
              <li><a href="https://docs.bohr.io/docs/terms%20of%20use">{{ $t('home.termsOfUse') }}</a></li>
              <li><a href="https://docs.bohr.io/docs/fair%20use%20policy">{{ $t('home.fairUsePolicy') }}</a></li>
            </ul> 
          </div> -->
          <div class="column">
            <h4>Frameworks</h4>
            <ul>
              <li>  
                <router-link :to="{ name: 'Docs', params: { docPath: ['Frameworks', 'nextjs'] } }">
                  NextJS
                </router-link>
              </li>
              <!-- <li v-for="framework in frameworkDocs" :key="framework.path">
                <router-link
                  :to="{
                    name: 'Docs',
                    params: {
                      docPath: ['Frameworks', framework.path],
                    },
                  }"
                >
                  {{ framework.name }}
                </router-link>
              </li> -->
            </ul>
          </div>
          <div class="column">
            <h4>Company</h4>
            <ul>
              <li><a href="https://blog.bohr.io/">{{ $t('home.blog') }}</a></li>
              <li><a href="https://discord.bohr.io" target="_blank">{{ $t('home.community_company') }}</a></li>
              <li><a href="https://calendly.com/boemeke" target="_blank">{{ $t('home.contact') }}</a></li>
              <li><a href="#pricing">{{ $t('home.pricing') }}</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="content__container footer__links">
        <span>© 2023 bohr.io, inc.</span>
      </div>
    </footer>
</template>

<script lang="ts">
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import BohrBox from '@/components/BohrBox.vue';
import BohrButton from '@/components/BohrButton.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import SiteCard from '@/components/SiteCard.vue';
import LastDevs from '@/components/LastDevs.vue';
import NewSiteLink from '@/components/NewSiteLink.vue';
import { getLastDevs, getFeaturedProjects } from '@/services/api';
import { defineComponent } from 'vue';

interface StorageParse {
  data: any;
  expiry: number;
}

export default defineComponent({
  components: {
    BohrBox,
    BohrButton,
    BohrTypography,
    SiteCard,
    LastDevs,
    NewSiteLink,
    ArrowIcon,
  },
  data() {
    const hasVisitedBefore = Boolean(localStorage.getItem('hasVisitedBefore'));
    const isFirstVisitSession = Boolean(sessionStorage.getItem('isFirstVisitSession'));
    if (!hasVisitedBefore) {
      localStorage.setItem('hasVisitedBefore', 'true');
      sessionStorage.setItem('isFirstVisitSession', 'true');
    }
    return {
      frameworkDocs: [
        { path: "nuxt.js", name: "Nuxt.js" },
        { path: "svelte", name: "Svelte" },
        { path: "remix", name: "Remix" },
        { path: "solid.js", name: "SolidJS" },
        { path: "react", name: "React" },
        { path: "angularJS", name: "AngularJS" },
        { path: "gatsby", name: "Gatsby" },
        { path: "vue.js", name: "Vue.js" },
        { path: "tailwindcss", name: "Tailwind CSS" },
      ],
      displayWelcomeBackMessage: hasVisitedBefore && !isFirstVisitSession,
      featuredProjects: [],
      lastDevs: [] as any[]
    };
  },
  async beforeRouteEnter(to, from, next) {
    let currentTime =  new Date();
    let lastDevsPromise: Promise<any> | undefined;
    const lastDevsStorage = sessionStorage.getItem('lastDevs');
    const lastDevsStorageParse: StorageParse = lastDevsStorage && JSON.parse(lastDevsStorage);

    let featuredProjectsPromise: Promise<any> | undefined;
    const featuredProjectsStorage = sessionStorage.getItem('featuredProjects');
    const featuredProjectsStorageParse: StorageParse = featuredProjectsStorage && JSON.parse(featuredProjectsStorage);

    if (!lastDevsStorageParse || !lastDevsStorageParse.data || lastDevsStorageParse.expiry < currentTime.getTime()) { // TO DO: Check Expiry
      lastDevsPromise = getLastDevs()
    }

    if (!featuredProjectsStorageParse || !featuredProjectsStorageParse.data || featuredProjectsStorageParse.expiry < currentTime.getTime()) { // TO DO: Check Expiry
      featuredProjectsPromise = getFeaturedProjects(8)
    }

    const lastDevsResult = lastDevsStorageParse || await lastDevsPromise
    const featuredProjectsResult = featuredProjectsStorageParse || await featuredProjectsPromise

    next((vm: any) => {
      if (lastDevsPromise !== undefined || featuredProjectsPromise !== undefined) {
        currentTime = new Date();
        const expiry = currentTime.setMinutes(currentTime.getMinutes() + 5);
        sessionStorage.setItem('lastDevs', JSON.stringify({
          data: lastDevsResult.data,
          expiry
        }))
        sessionStorage.setItem('featuredProjects', JSON.stringify({
          data: featuredProjectsResult.data,
          expiry
        }))
      }
      vm.featuredProjects = featuredProjectsResult.data
      vm.lastDevs = lastDevsResult.data
    })
  },
  computed: {
    username() { return this.$store.state.me?.username },

    globalPresenceOther() { return this.$store.state.globalPresenceOther },

    isSmallTitle() { return ['es-ES', 'pt-BR'].includes(this.$i18n.locale) },
    
    createNewProjectUrl() {
      return "/projects/new";
    },
  },
  methods: {
    gtagEvent(e: MouseEvent) {
      if (![0, 1].includes(e.button)) {
        return;
      }
      this.$gtag.event('news_subscribe_internal', {
        'app_name': 'bohr.io',
        'screen_name': this.$route.name,
      });
    },
  }
});
</script>

<style scoped>

body {
  --black: #180B02;
  --gray: #9F9F9F;
  --white: #FFFFFF;
  --red: #3D151A;

  --primary-color: #F26419;
  --secondary-color: #E84855;
  --tertiary-color: #F4CC3A;
  --discord-color: #8D5ADF;

  font-family: "Helvetica", sans-serif;
  background-color: var(--black);
  color: var(--white);
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

footer {
  margin: -72px -48px -48px;
}

.scroll__lock {
  overflow: hidden;
}

.standard__block__margins--top {
  margin-top: 70px;
}

.standard__block__margins--bottom {
  margin-bottom: 70px;
}

@media screen and (min-width:768px) {
  .standard__block__margins--top {
    margin-top: 100px;
  }
  
  .standard__block__margins--bottom {
    margin-bottom: 100px;
  }
}

.logo__product__hunt {
  position: absolute;
  top: 55px;
  right: 10%;
}

.product__hunt {
  max-width: 100%;
  height: auto;
}

@media screen and (max-width:768px) {
  .product__hunt {
    max-width: 150px;
    height: auto;
  }
}

.bohr__box__standard__margin{
  margin-bottom: 0px;
}

.frame__text__el {
  display: grid;
  grid-template-areas: "frame" "text";
  justify-items: center;
  align-items: center;
  gap: 30px;
}

.frame__text__el__developers {
  padding: 100px;
  background-image: url(../../public/assets/img/home/shapes-bg.png);
}

.frame__text__el__estability {
  padding: 100px;
  background: linear-gradient(180deg, #53DD6C -800%, transparent);
}

.frame__text__el__community {
  padding: 100px;
  background: linear-gradient(180deg, #965CAA -800%, transparent);
}

.frame__text__el__requests {
  padding: 25px;
  background: linear-gradient(180deg, #E84855 -1000%, transparent);
}

.frame__text__el--frame {
  grid-area: frame;
  width: 100%;
  max-width: 100%;
  height: auto;
}

.frame__text__el--text {
  grid-area: text;
  text-align: center;
}

@media screen and (min-width:768px) {
  .frame__text__el {
    grid-template-areas: unset;
    grid-template-columns: 1fr 1fr;
    gap: clamp(20px, 8vw, 80px);
  }
  
  .frame__text__el--frame {
    grid-area: unset;
  }
  
  .frame__text__el--text {
    grid-area: unset;
    text-align: unset;
  }
}

.color__bohr__functions {
  background: #53DD6C;
}

.color__bohr__features__discord {
  background: #8D5ADF;
  font-weight: bold;
}

.color__bohr__features__request {
  background: #55DDE0;
}

.gradient__bg--sec-pri-ter {
  background: #F26419;
}

.gradient__bg--ter-pri-sec {
  background: linear-gradient(90deg, var(--tertiary-color), var(--primary-color), var(--secondary-color));
}

.gradient__bg--ter-pri {
  background: linear-gradient(90deg, var(--tertiary-color), 20%, var(--primary-color));
}

.gradient__bg--pri-sec-disc {
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color), 60%, var(--discord-color));
  }

.text__bg-clip {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.btn {
  border: none;
  border-radius: 8px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-size: 18px;
  font-weight: 700;
  padding: 13px 36px;
  line-height: 18px;
  background-color: #E84855;
  color: #000000;
  text-decoration: none;
}

.btn:hover,
.btn:focus {
  cursor: pointer;
  filter: brightness(0.85);
}

.btn--sm {
  padding: 9px 24px;
  line-height: 12px;
}

.btn--primary-color {
  background-color: var(--primary-color);
  color: var(--white);
}

.btn--secondary-color {
  background-color: var(--secondary-color);
  color: var(--white);
}

.btn--tertiary-color {
  background-color: var(--tertiary-color);
  color: var(--black);
}

.content__container {
  margin-inline: auto;
  padding-inline: 25px;
  max-width: 1180px;
}

@media screen and (min-width:768px) {
  .content__container {
    padding-inline: 50px;
  }
}

.page__title {
  font-size: 35px;
  font-weight: 700;
  margin-top: unset;
  margin-bottom: 40px;
  line-height: 1.1;
}

.page__title > span {
  display: block;
}

.page__title > span:nth-child(1) {
  font-size: 30px;
}

.page__title > span:nth-child(2) {
  font-size: 40px;
}

.page__subtitle {
  color: var(--gray);
  margin: 0 auto 44px;
  font-size: 16px;
  line-height: 1.5;
  max-width: 400px;
}

.gradient__title {
  font-size: 35px;
  font-weight: 700;
}

.solid__title {
  font-size: 28px;
  font-weight: 700;
}

.regular__text {
  font-size: 20px;
  line-height: 1.5;
}
.regular__text__just__code {
  font-size: 20px;
  line-height: 1.5;
}
.regular__text__develop {
  font-size: 20px;
  line-height: 1.5;
}
.regular__text__discord {
  font-size: 20px;
  line-height: 1.5;
}

.text__center {
  text-align: center;
}

.text__color {
  color: #E84855
}

@media screen and (min-width:768px) {
  .page__title > span:nth-child(1) {
    font-size: 35px;
  }
  
  .page__title > span:nth-child(2) {
    font-size: 45px;
  }

  .page__subtitle {
    font-size: 18px;
  }
}

@media screen and (min-width:992px) {
  .page__title > span:nth-child(1) {
    font-size: 55px;
  }
  
  .page__title > span:nth-child(2) {
    font-size: 70px;
  }

  .page__subtitle {
    font-size: 20px;
    max-width: 600px;
  }

  .gradient__title {
    font-size: 45px;
  }
  
  .solid__title {
    font-size: 35px;
  }
  
  .regular__text {
    font-size: 30px;
  }
  .regular__text__just__code {
    font-size: 24px;
    letter-spacing: 0.5px;
    line-height: 50px;
  }
  .regular__text__develop {
    font-size: 28px;
    letter-spacing: 0.5px;
    line-height: 50px;
  }
  .regular__text__discord {
    font-size: 30px;
    letter-spacing: 0.5px;
    line-height: 50px;
  }
}

.btn__margin{
  margin: 8px 0;
}

/* --------- Specific Rules --------- */

.lights {
  position: fixed;
  inset: 0;
  pointer-events: none;
  max-width: 1280px;
  margin-inline: auto;
  z-index: 10;
}

.light__1,
.light__2,
.light__3 {
  --animation-duration: 1250ms;
  --duration-variation: 50ms;
  position: absolute;
  filter: blur(90px);
  animation-name: light-pulse;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.light__1 {
  fill: var(--primary-color);
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  animation-duration: calc(var(--animation-duration) - var(--duration-variation));
}

.light__2 {
  fill: var(--secondary-color);
  bottom: 5%;
  right: 50%;
  transform: translateX(-50%);
  animation-duration: var(--animation-duration);
}

.light__3 {
  fill: var(--tertiary-color);
  right: 0;
  top: 20%;
  animation-duration: calc(var(--animation-duration) + var(--duration-variation));
}

header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
  transition: background-color 200ms linear;
  overflow: hidden;
  background-color: rgba(24, 11, 2, 0.95);
}

@supports (backdrop-filter: blur(0)) or (-webkit-backdrop-filter: blur(0)) {
  header {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    background-color: rgba(24, 11, 2, 0.5);
  }
}

.bohr__logo__btn {
  justify-self: flex-start;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: hsl(0, 100%, 100%);
}

.login__btn,
.dashboard__btn {
  height: 22px;
  text-decoration: none;
}

.header__actions {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}

.header__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 75px;
}

.header__actions {
  flex-direction: row;
  justify-content: flex-end;
}

.banner {
  background-position: center;
  margin-top: 180px;
  padding-bottom: 1px;
}

.banner__content {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

@media screen and (min-width:768px) {
  .banner__content {
    min-height: calc(100vh - 200px);
  }
}
.home__header {
  position: relative;
  margin-inline: auto;
  font-size: 240px;
  margin-bottom: 0.4583em;
  margin: 85px -48px 100px;
  padding-bottom: 40px;
}

.home__title {
  margin: 0;
  font-weight: 700;
  font-size: 1em;
  line-height: calc(1.15em - 0.1em);
  letter-spacing: -0.1em;
  text-align: center;
  padding-right: 0.1em;
  background: linear-gradient(180deg, #F6AE2D 0%, #F26419 0%, #E84855 100%);
  color: transparent;
  -webkit-background-clip: text;
          background-clip: text;
}

html[lang^="pt"] .home__title {
  font-size: .825em;
}

.home__title.small {
  font-size: 0.85em;
}


.home__back__message {
  margin: 0;
  position: absolute;
  left:50%;
  margin-left: -2.587em;
  top: 50%;
  margin-top: -0.04em;
  font-weight: 700;
  width: max-content;
  font-size: 0.7061em; /* 185px */
  letter-spacing: -0.1em;
  background: linear-gradient(180deg, #55DDE0 0%, #365C73 100%);
  color: transparent;
  -webkit-background-clip: text;
          background-clip: text;
  filter: drop-shadow(0px 0.05em 0.3125em #000000);
}

html[lang^="pt"] .home__back__message {
  font-size: .5em;
}

.home__back__message.small {
  font-size: 0.41666em;
}

@media screen and (max-width:1280px) {
  .home__title {
    font-size: 0.8em;
  }
  .home__back__message {
    font-size: 0.56488em;
    margin-top: -0.07em;
  }
}

.home__faster__message {
  position: absolute;
  bottom: -0.92em;
  left: 12%;
  z-index: 1;
  margin: 0;
  font-weight: 700;
  font-size: 0.667em;
  letter-spacing: -0.04em;
  background: linear-gradient(180deg, #55DDE0 0%, #53DD6C 100%);
  color:transparent;
  -webkit-background-clip: text;
          background-clip: text;
  filter: drop-shadow(0px 0.125em 0.78125em #000000);
  white-space:nowrap
}

.home__and__message {
  position: absolute;
  right: 1.20375em;
  bottom: 0.5125em;
  margin: 0;
  padding-right: 0.1em;
  font-weight: 700;
  font-size: 49px;
  letter-spacing: -0.1em;
  background: #F1F1F1;
  color: transparent;
  -webkit-background-clip: text;
          background-clip: text;
  filter: drop-shadow(0px 0.05em 0.3125em #000000);
}

.home__and__message.small {
  font-size: 0.41666em;
}

.home__deploy__message {
  width: 100%;
  right: 1.3em;
  bottom: -0.49em;
  margin: 0;
  padding-right: 0.1em;
  font-weight: 700;
  font-size: 10vw;
  letter-spacing: -0.1em;
  margin-left: 250px;
  margin-top: -120px;
  background: linear-gradient(180deg, #55DDE0 0%, #365C73 100%);
  color: transparent;
  -webkit-background-clip: text;
          background-clip: text;
  filter: drop-shadow(0px 0.05em 0.3125em #000000);
}

.home__deploy__message.small {
  font-size: 0.41666em;
}

.home__future__message {
  position: absolute;
  bottom: -7.61875em;
  margin: 0;
  padding-right: 0.1em;
  font-weight: 700;
  font-size: 24px; 
  letter-spacing: -0.1em;
  background: #F1F1F1;
  color: transparent;
  -webkit-background-clip: text;
          background-clip: text;
  filter: drop-shadow(0px 0.05em 0.3125em #000000);
  width: 100%;
  text-align: center;
}

.home__main {
  max-width: 1275px;
  margin-inline: auto;
}

.home__main > section + section {
  margin-top: 30px;
}
.scroll__indicator {
  margin-top: 44px;
  opacity: 75%;
}

.bohr__showcase__nav {
  display: flex;
  justify-content: center;
  margin: 30px auto;
  gap: clamp(20px, 3vw, 50px);
}

@media screen and (max-width:576px) {
  .bohr__showcase__nav {
    flex-wrap: wrap;
    max-width: 400px;
  }
}

.showcase__nav__btn {
  font-size: 20px;
  letter-spacing: 1px;
  color: #FFFFFF;
  padding: 7px 0;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  transition: 200ms linear;
  transition-property: color, border;
  cursor: pointer;
}

@media screen and (min-width:992px) {
  .showcase__nav__btn {
    font-size: 30px;
  }
}

.showcase__nav__btn.active,
.showcase__nav__btn:hover {
  color: #F16923;
}

.showcase__nav__btn.active {
  border-bottom-color: #F16923;
}

.bohr__video__container{
  padding-left: 0px;
  padding-right: 0px;
  margin-left: 0px;
  margin-right: 0px;
  max-width: 100%;
  margin-top: 0px;
}

.bohr__showcase__wrapper {
  box-sizing: border-box;
  position: relative;
  margin-inline: auto;
  padding-top: 56.25%;
  width: 100%;
  max-width: 1280px;
  border: 2px solid #F16923;
  background-color: #F16923;
  border-radius: 8px;
  overflow: hidden;
}

.bohr__showcase {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.video__text {
  opacity: 0;
  position: absolute;
  font-weight: 700;
  font-size: clamp(0px, 3vw, 55px);
  text-align: center;
  letter-spacing: 0.5px;
  pointer-events: none;
  width: min-content;
  transition: opacity 200ms linear;
  text-shadow: -1px -1px 2px #000000,
               -1px 1px 2px #000000,
               1px -1px 2px #000000,
               1px 1px 2px #000000;
}

.video__text.active {
  opacity: 1;
}

.video__text[data-showcase-time="1"] {
  bottom: 10%;
  left: 3%;
}

.video__text[data-showcase-time="9"] {
  top: 10%;
  right: 0.5%;
}

.video__text[data-showcase-time="22"] {
  top: 10%;
  left: 0.5%;
}

.video__text[data-showcase-time="30"] {
  bottom: 10%;
  left: 3%;
}

.video__text[data-showcase-time="36"] {
  bottom: 10%;
  right: 0.5%;
  max-width: 37%;
  width: unset;
}

.plans__block {
  position: relative;
  min-height: 480px;
  padding-block: 30px;
  padding-bottom: 0px;
  /* display: grid; */
  grid-template-areas: "frame" "text";
  justify-items: center;
  align-items: center;
  gap: 30px;
}

@media screen and (min-width:768px) {
  .plans__block {
    padding-top: 80px;
  }
}

@media screen and (max-width:400px) {
  .plans__block img {
    width: 40%;
    height: auto;
  }

  .price__tag {
    font-size: 18px;
  }
}

@media screen and (max-width:300px) {
  .plans__block img {
    display: none;
  }
}

.plans__block::before,
.plans__block::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
}

.plans__block::before {
  background-repeat: no-repeat;
  background-size: cover;
}

.plans__block::after {
  mix-blend-mode: normal;
  opacity: 0.3;
}

.plan__list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}

.plan__list > li {
  flex: 1;
}

@media screen and (min-width:992px) {
  .plan__list {
    flex-direction: row;
  }
}

.plan__option {
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 8px;
  background-color: #0006;
  min-height: 320px;
  padding: 24px 50px;
  text-align: center;
  color: var(--white);
  text-decoration: none;
  height: 100%;
}

.plan__name {
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-block: 5px 9px;
  color: var(--secondary-color);
}

.price__tag {
  --color: var(--white);

  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 24px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--color);
  border: 1px solid var(--color);
  border-radius: 5px;
  width: 80px;
  height: 60px;
}
.price_tag {
  --color: #E84855;

  position: absolute;
  top: 70px;
  right: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 13px;
  letter-spacing: 0.5px;
  font-family: 'Hind';
  width: 80px;
  height: 48px;
}


@media screen and (max-width:400px) {
  .price__tag {
    font-size: 18px;
    right: 5px
  }
  .price_tag {
    top: 45px;
    right: 5px
  }
}

@media screen and (max-width:300px) {
  .price__tag {
    display: none;
  }
  .price_tag {
    display: none;
  }
}

.plan__benefits {
  list-style: none;
  padding: 0;
  margin: 0 0 40px 0;
  text-align: left;
}

.plan__benefit {
  display: grid;
  grid-template-columns: 30px 1fr;
  gap: 8px;
  font-weight: 400;
  font-size: 15px;
  line-height: 30px;
  letter-spacing: 0.5px;
  margin-block: 12px;
}
.plan__startups {
  display: grid;
  gap: 8px;
  font-weight: 400;
  font-size: 15px;
  line-height: 30px;
  letter-spacing: 0.5px;
}

.plan__disclaimer {
  font-size: 14px;
  margin: -32px 0 24px;
  text-align: center;
}

.plan__disclaimer a {
  color: inherit;
}

.plan__option > .btn {
  margin-top: auto;
  flex: 0;
}

.enterprise__line__two {
  margin-top: 40px;
}

.plan__option--highlight {
  background-color: #3D151A;
}

.plan__option--highlight > img,
.plan__option--highlight .plan__benefit > img {
  filter: invert(0);
}

.plan__option--highlight .price__tag {
  --color: #E84855;
}

.plan__option--highlight > p,
.plan__option--highlight .plan__name,
.plan__option--highlight .plan__benefit,
.plan__option--highlight .plan__disclaimer {
  color: #FFFFFF;
}

.plan__option--highlight > .btn {
  background-color: #FFFFFF;
  color: #E84855;
}

.start__section,
.for__section {
  position: relative;
  padding-block: 30px;
}

@media screen and (min-width:768px) {
  .start__section,
  .for__section {
    padding-block: 60px;
  }
}

.start__section::before,
.for__section::before {
  content: '';
  position: absolute;
  inset: 0;
  mix-blend-mode: luminosity;
  pointer-events: none;
  z-index: -1;
}

.compatible__section {
  padding-top: 40px;
}

@media screen and (min-width:768px) {
  .compatible__section {
    padding-top: 70px;
  }
}

.tools__display {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 80px;
}

.tools__display__line {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
  gap: 50px;
}
.sites__page {
  max-width: 1056px;
  margin-inline: auto;
}
.featured__projects {
  margin-bottom: 40px;
  margin-top: 100px;
  padding: 10px;
  text-align: center;
  font-size: 45px;
  background: linear-gradient(180deg, #F4CC3A 0%, #F6AE2D 0%);
  color: transparent;
  -webkit-background-clip: text;
          background-clip: text;
}

@media screen and (max-width: 1023px) {
  .home__header {
    font-size: 20.25vw;
  }
}

.sites__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  list-style: none;
  padding: 0;
}

@media screen and (max-width: 695px) {
  .sites__list {
    display: block;
  }

  .site__card {
    margin: 30px 0px;
  }
}

.sites__all {
  display: flex;
  justify-content: flex-end;
}

.sites__all__link {
  display: flex;
  align-items: center;
}

.sites__all__link span {
  line-height: 2em;
  background: linear-gradient(180deg, #F26419 0%, #E84855 100%);
  color: transparent;
  -webkit-background-clip: text;
          background-clip: text;
}

.section__title {
  margin-bottom: 100px;
  margin-top: -30px;
  padding: 10px;
  padding-top: 0px;
  line-height: inherit;
  text-align: center;
  font-size: 45px;
  background: linear-gradient(180deg, #F6AE2D 0%, #F26419 0%, #E84855 100%);
  color: transparent;
  -webkit-background-clip: text;
          background-clip: text;
}

@media screen and (max-width:500px) {
  .section__title {
    font-size: 30px;
  }
}

@media screen and (max-width:500px) {
  .section__title {
    font-size: 30px;
  }
}

.global__presence {
  list-style: none;
  padding: 0px 55px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tool__on__display {
  height: auto;
  margin-right: 10px;
}

@media (max-width: 1280px) {
  .tools__display__line {
    flex-wrap: wrap;
    justify-content: center;
    gap: 3vw;
  }
}
@media (max-width: 768px) {
  .tool__on__display {
    flex: 0 0 calc(33.33% - 20px);
    margin-bottom: 10px;
  }
}

@media (max-width: 768px) {
  .column {
    flex-basis: 100%;
  }
}

@media (max-width: 500px) {
  .tool__on__display {
    flex: 0 0 calc(50% - 20px);
  }
}

.dev__experience {
  position: relative;
  margin-bottom: 60px;
}

.dev__experience::after,
.dev__experience::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
}

.dev__experience::before {
  background-image: url(/assets/img/home/dev-meeting.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: brightness(0.65);
}

.dev__experience::after {
  background-color: var(--primary-color);
  mix-blend-mode: overlay;
}

.dev__experience--content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  align-items: center;
  min-height: 100vh;
  max-width: 500px;
}

@media screen and (min-width:768px) {
  .dev__experience {
    margin-bottom: 100px;
  }

  .dev__experience--content {
    min-height: 500px;
  }
}

.powered__services {
  gap: clamp(20px, 5vw, 60px);
}

.community__content {
  padding-block: 70px;
}

@media screen and (min-width:768px) {
  .community__content {
    padding-block: 100px;
  }
}

.discord__link {
  color: var(--discord-color);
  font-weight: 700;
  text-decoration: none;
}

.discord__link:hover {
  filter: brightness(0.85);
}


.requests__block {
  padding-bottom: 70px;
}

.start__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 70px 0;
}

.start__text {
  margin: 0px;
  text-align: center;
  font-size: 117px;
  font-weight: 700;
  color: #F26419;
}
.start__text1 {
  position: relative;
  margin: 0px;
  right: -1.0375em;
  bottom: 0.3125em;
  text-align: center;
  font-size: 160PX;
  font-weight: 700;
  color: #55DDE0;
  
  
}
.start__text2 {
  position: relative;
  margin: 0px;
  right: 1.80375em;
  bottom: 1.6125em;
  text-align: center;
  font-size: 64px;
  font-weight: 700;
  color: #F4CC3A
}

.start__btn {
  padding: 20px 30px;
  background: linear-gradient(180deg, #55DDE0 0%, #365C73 100%);
  border-radius: 8px;
  color: #0E171D;
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: -1px;
}

.string__color {
  color: #E84855;
}

@media screen and (max-width: 1010px) {
  .home__and__message {
    right: -0.10375em;
    bottom: 0.0125em;
  }
  .start__text {
    font-size: 58px;
  }
  .start__text1 {
    font-size: 80px;
  }
  .start__text2 {
    font-size: 32px;
  }
}

@media screen and (max-width: 600px) {
  .home__and__message {
    font-size: 25px;
    right: -0.10375em;
    bottom: 0.0125em;
  }
  .home__future__message {
    font-size: 12px;
  }
  .start__text {
    font-size: 29px;
  }
  .start__text1 {
    font-size: 40px;
  }
  .start__text2 {
    font-size: 16px;
  }
}

@media screen and (min-width: 576px){
  .start__btn {
    padding-inline: 60px;
    font-size: 30px;
    line-height: 30px;
  }
}

@media screen and (min-width: 1024px) {
  .start__btn {
    padding-inline: 90px;
  }
}

@media screen and (min-width: 1280px) {
  .start__btn {
    padding-inline: 120px;
  }
}

@media screen and (max-width: 1398px) {
  .home__deploy__message {
    margin: -88px 0px 0px 423px;
    font-size: 123px;
  }
}
@media screen and (max-width: 1150px) {
  .home__deploy__message {
    margin: -60px 0px 0px 388px;
    right: 5.75em;
    font-size: 85px;
  }
}

@media screen and (max-width: 1010px) {
  .home__deploy__message {
    margin: -52px 0px 0px 146px;
    font-size: 80px;
  }
}

@media screen and (max-width: 600px) {
  .home__deploy__message {
    margin: -39px 0px 0px 23px;
    font-size: 60px;
  }
}

.discord__floating {
  position: fixed;
  bottom: 48px;
  right: 48px;
  display: grid;
  place-items: center;
  background-color: #5865F2;
  width: 48px;
  height: 48px;
  border-radius: 999px;
  transform-origin: bottom right;
  transform: scale(1.5);
  margin-top: -96px;
}

@supports (position: sticky) {
  .discord__floating {
    position: sticky;
    right: unset;
    left: calc(100% - 96px);
    margin-bottom: 48px;
  }
}

footer {
  padding-block: 60px;
  background-color: #000;
}

.footer__content {
  display: inherit;
}

.footer__links {
  flex-direction: column;
  flex-wrap: wrap;
}

.footer__link {
  color: #fff;
  text-decoration: none;
}

.footer__link:hover {
  cursor: pointer;
  color: var(--primary-color);
}

.line {
  border-top: 1px solid black;
  margin: 50px 0;
}

.column ul li a {
  text-decoration: none;
  color: white;
}

.bohr__newsletter {
  padding-top: 100px;
}

.bohr__newsletter a{
  text-decoration: none;
  color: white;
}

.bohr__newsletter h1 {
  font-size: 15px;
}

.footer__container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

ul li {
  margin-bottom: 5px;
}

.social__links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.social__links li {
  margin-right: 10px;
}

.newsletter input[type="text"]{
  width: 100%;
}

.campo-email {
  position: relative;
}

.campo-email input {
  border: none;
  border-bottom: 1px solid #FFFFFF;
  background-color: transparent;
  color: #FFFFFF;
  padding-bottom: 5px;
  width: 200px;
}

.campo-email .linha {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #FFFFFF;
  max-width: 150px;
}

.botao-enviar {
  background-color: transparent;
  color: #FFFFFF;
  padding: 3px 12px 3px 12px;
  border-radius: 5%;
  font-size: 9px;
  display: flex;
  margin: 6px 0 0 150px;
}

.locale__ghub__container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-left: auto;
}

.locale__btn {
  width: 45px;
  height: 30px;
  font-size: 0;
  background: var(--locale-icon-url);
  background-position: center;
  background-repeat: no-repeat;
  background-origin: border-box;
  background-size: cover;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  filter: grayscale();
}

.locale__btn:focus,
.locale__btn:hover {
  border-color: var(--primary-color);
  filter: unset;
}

.locale__btn--en {
  --locale-icon-url: url('/assets/img/en-US.jpg');
}

.locale__btn--es {
  --locale-icon-url: url('/assets/img/es-ES.jpg');
}

.locale__btn--pt {
  --locale-icon-url: url('/assets/img/pt-BR.jpg');
}

html[lang="en"] .locale__btn--en,
html[lang="es"] .locale__btn--es,
html[lang="pt"] .locale__btn--pt {
  filter: unset;
}

.bohr-github__link {
  filter: invert(1);
  align-self: flex-end;
}

.bohr-github__link:hover {
  filter: invert(1) brightness(0.85);
}

@media screen and (min-width:576px) {
  .footer__links {
    flex-direction: row;
    align-items: center;
  }

  .locale__ghub__container {
    display: flex;
  }

  .bohr-github__link {
    align-self: unset;
  }
}

@keyframes light-pulse {
  from {
    transform: scale(1);
    filter: blur(90px);
  }
  to {
    transform: scale(1.2);
    filter: blur(70px);
  }
}
</style>
