<template>
  <main class="container">
    <BackButton :to="{ name: 'Projects' }" />
    <header class="header__container">
      <p class="header__comment">{{ $tc('common.project', 2) }}</p>
      <h1 class="header__title">
        {{ $t('new.header.title') }}
        <BohrHelpLink topic="templates" color="hsla(47, 89%, 59%, 1)" class="header__help__link" />
      </h1>
      <p class="header__description">
        {{ $t('createRepository.description') }}
      </p>
    </header>

    <div class="import__block">
      <router-link 
        :to="{ name: 'ImportRepository' }"
        class="import__link" 
      >
        {{ $t('common.importGithub') }}
      </router-link>
      <BohrHelpLink topic="import" color="hsla(181, 69%, 61%, 1)" />
    </div>

    <section class="template__section" data-intro-anchor="template">
      <BohrTypography tag="h2" variant="title2" color="hsl(181, 69%, 61%)">
        {{ $t('new.officialTemplates.title') }}
      </BohrTypography>
      <div class="newsite__list">
        <template v-if="isLoading">
          <NewProjectCard :isPlaceholder="true" />
          <NewProjectCard :isPlaceholder="true" />
          <NewProjectCard :isPlaceholder="true" />
        </template>
        
        <template v-for="template in templates.official" :key="template.id">
          <NewProjectCard
            :projectData="template"
            :commingSoon="template.commingSoon"
          />
        </template>
      </div>
    </section>

    <section class="template__section" v-if="templates.community.length > 0">
      <BohrTypography tag="h2" variant="title2" color="hsl(181, 69%, 61%)">
        {{ $t('new.communityTemplates.title') }}
      </BohrTypography>
      <div class="newsite__list">
        <template v-for="template in templates.community" :key="template.id">
          <NewProjectCard
            :projectData="template"
            :commingSoon="template.commingSoon"
          />
        </template>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import BackButton from "@/components/BackButton.vue";
import BohrHelpLink from "@/components/BohrHelpLink.vue";
import BohrTypography from "@/components/BohrTypography.vue";
import NewProjectCard from "@/components/NewProjectCard.vue";
import { defaultIntro } from "@/utils/siteIntro";
import { getTemplates } from '@/services/api';
import { defineComponent } from 'vue';
import { TemplateData } from '@/types';

type Templates = {
  official: TemplateData[]
  community: TemplateData[]
}

export default defineComponent({
  components: {
    BackButton,
    BohrHelpLink,
    BohrTypography,
    NewProjectCard,
},
  data() {
    return {
      isLoading: true,
      templatesData: [] as TemplateData[],
    }
  },

  computed: {
    templates() {
      return this.templatesData.reduce((acc, cur) => {
        const templateCategory = cur.createdBy === 'bohr-io'
          ? 'official'
          : 'community';

        acc[templateCategory].push(cur);
        return acc;
      }, { official: [], community: [] } as Templates)
    },
  },

  created(){
    this.getAllData()
  },

  updated(){
    defaultIntro([{
      title: this.$t('intro.template.title'),
      intro: this.$t('intro.template.text'),
      element: '[data-intro-anchor="template"]',
    }], this.$i18n.locale).setOption('scrollToElement', false).start();
  },

  methods:{
    async getAllData(){
      const { data } = await getTemplates();

      this.templatesData = data || [];
      this.isLoading = false;
      this.$store.commit('setIsLoading', this.isLoading);
    },
  }
});
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  font-family: "Helvetica", sans-serif;
}

.header__container {
  margin: 0 0 32px;
  position: relative;
}

.header__comment {
  color: #c3a32e;
  font-size: 18px;
  font-weight: 700;
  line-height: 21px;
  margin: 0;
}

.header__comment::before {
  content: "/";
  margin-right: 4px;
  color: #625217;
}

.header__title {
  color: #f4cc3a;
  font-weight: 700;
  font-size: 48px;
  line-height: 55px;
  margin: 0 0 24px;
}

.header__help__link {
  position: relative;
  top: -20px;
  left: -10px;
}

.header__description {
  font-size: 14px;
  line-height: 18px;
  margin: 0;
  white-space: pre-line;
  display: none;
}

@media screen and (max-width: 992px){
  .header__container{
    padding-top: 20px;
  }
}

.import__link{
  text-decoration: underline;
}

.import__block{
  display: block;
  text-align: right;
  margin-bottom: 20px;
}

.template__section {
  margin-block: 20px 80px;
}

.template__section > h2 {
  margin-bottom: 20px;
}

.newsite__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(358px, 1fr));
  column-gap: 24px;
  row-gap: 48px;
}

@media screen and (max-width: 767px) {
  .newsite__list {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
}
</style>
