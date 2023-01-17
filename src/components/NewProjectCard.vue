<template>
  <button 
    type="button"
    class="site__card"
    @click="createNewRepo"
    :disabled="commingSoon"
  >
    <div v-if="commingSoon" class="comming__soon">
      <BohrTypography
        tag="p"
        variant="subtitle2"
        textAlign="center"
        color="hsl(0, 0%, 100%)"
        class="comming__soon__text"
      >
        {{ $t('components.newProjectCard.commingSoon') }}
      </BohrTypography>
    </div>

    <div v-if="hasDocsPage" ref="helpLink" class="help__container">
      <BohrHelpLink :topic="projectData.name" color="hsla(21, 89%, 52%, 1)" />
    </div>

    <BohrBox variant="glass" class="image__container">
      <SkeletonLoading :isShowing="isPlaceholder" borderRadius="4px">
        <img class="site__image" :class="{ disabled: commingSoon }" :src="projectData.imageUrl" alt="site image" />
      </SkeletonLoading>
      <div class="image__hover__effect">
        <CheckIcon class="image__hover__check" :sizePx="48" />
        <BohrTypography variant="title3" color="hsla(0, 0%, 100%)">
          {{ $t('components.newProjectCard.selectThis') }}
        </BohrTypography>
      </div>
    </BohrBox>

    <div class="tag__container">
      <template v-for="tag in projectData.tags" :key="tag">
        <SkeletonLoading :isShowing="isPlaceholder" isInline>
          <CardTag :tag="tag" />
        </SkeletonLoading>
      </template>
    </div>
    
    <div class="site__info" :class="{ disabled: commingSoon }">
      <BohrTypography
        tag="h5"
        variant="title3"
        color="hsl(0, 0%, 100%)"
        class="site__card-title"
      >
      <SkeletonLoading :isShowing="isPlaceholder">
        {{ projectData.name }}
      </SkeletonLoading>  
      </BohrTypography>
      <BohrTypography
        tag="p"
        variant="body1"
        color="hsl(0, 0%, 100%)"
        class="site__card-description"
      >
        <SkeletonLoading :isShowing="isPlaceholder">
          {{ projectData.description }}
        </SkeletonLoading>
      </BohrTypography>

      <BohrTypography tag="p" variant="body3" textAlign="center" color="var(--project-url)">
        <SkeletonLoading :isShowing="isPlaceholder">
          {{ $t('common.createdBy') }}: <a class="author__link">{{ projectData.createdBy }}</a>
        </SkeletonLoading>
      </BohrTypography>
    </div>
  </button>
</template>

<script lang="ts">
import BohrBox from '@/components/BohrBox.vue';
import BohrHelpLink from '@/components/BohrHelpLink.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import CardTag from '@/components/CardTag.vue';
import CheckIcon from '@/components/icons/CheckIcon.vue';
import SkeletonLoading from '@/components/SkeletonLoading.vue';
import { defineComponent } from 'vue';

const fakeData = {
  name: 'project-name',
  createdBy: 'username',
  description: 'this is a placeholder card description',
  imageUrl: '',
  tags: ["front", "back"],
}

export default defineComponent({
  name: "NewProjectCard",
  components: {
    CardTag,
    BohrBox,
    BohrTypography,
    SkeletonLoading,
    BohrHelpLink,
    CheckIcon,
  },
  props: {
    projectData: {
      type: Object,
      default: () => fakeData,
    },
    commingSoon: Boolean,
    isPlaceholder: Boolean,
  },
  computed:{
    hasDocsPage() {
      return [
        'dashboard-template',
        'portfolio-template',
        'gatsby-portfolio-template',
        'dashboard-template-dev',
        'portfolio-template-dev',
        'gatsby-portfolio-template-dev',
      ].includes(this.projectData.name);
    },
  },
  methods: {
    createNewRepo(e: MouseEvent){
      const isHelpClick = (this.$refs.helpLink as HTMLDivElement)?.contains(e.target as Node);
      const sampleUrl = this.projectData?.githubUrl;

      if (isHelpClick || !sampleUrl) return;

      this.$router.push({ name: "CreateRepository", query: { sampleUrl: sampleUrl }})
    },

    analyticsTrack() {
      const { id, title } = this.projectData;
      const value = `${id} = ${title}`;

      (this as any).$gtag.event('select_template', {
        'event_category': 'engagement',
        'event_label': 'new_repository',
        'value': value,
      });
    }
  },
});
</script>

<style scoped>
  .site__card {
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;

    text-align: center;
    padding: 0;
    border-radius: 4px;
    border: none;
    background: none;
    cursor: pointer;
  }  
  
  .site__card:disabled {
    cursor: not-allowed;
  }

  .comming__soon {
    background: red;
    color: white;
    text-transform: uppercase;
    position: absolute;
    top: 21px;
    right: -35px;
    transform: rotate(45deg);
    z-index: 10;
    width: 180px;
    height: 60px;
    padding-top: 7px;
    background-image: linear-gradient(hsl(21, 89%, 52%) 32.81%, hsl(355, 78%, 60%), 30px, hsl(355, 52%, 24%) 30px);

    mask-image: url('/assets/svg/comming-soon-mask.svg');
    mask-position: center top;
    mask-repeat: no-repeat;
  }

  .comming__soon__text {
    text-shadow: -1px 1px 3px hsla(0, 0%, 0%, 0.25),
                 -1px -1px 0px hsla(0, 0%, 100%, 0.1),
                 1px -1px 0px hsla(0, 0%, 100%, 0.1),
                 -1px 1px 0px hsla(0, 0%, 100%, 0.1),
                 1px 1px 0px hsla(0, 0%, 100%, 0.1);
  }

  .help__container {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
    background-color: hsl(0, 0%, 0%);
    border-radius: 99999px;
  }

  .image__container {
    position: relative;
    width: 100%;
    padding-top: 56.25%;
  }

  .image__container > div {
    position: absolute;
    inset: 0;
  }  

  .site__image {
    position: absolute;
    inset: 0;
    width: 100%;
    border-radius: 4px;
    
    object-fit: cover;
  }

  .image__hover__effect {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    height: 100%;
    background-color: hsla(0, 0%, 0%, 0.75);
    transition: opacity var(--transition);  
    opacity: 0;
  }

  .site__card:focus .image__hover__effect,
  .site__card:hover .image__hover__effect {
    opacity: 1;
  }

  .image__hover__effect::before {
    content: '';
    opacity: 1;
    position: absolute;
    inset: 0;
    border-radius: 4px;
    border: 2px solid transparent;
    background-image: linear-gradient(0deg, #E84856, #F16622, #F4CD3B); 
    background-origin: border-box;
    pointer-events: none;

    -webkit-mask: linear-gradient(#fff 0 0) padding-box,
                  linear-gradient(#fff 0 0);
            mask: linear-gradient(#fff 0 0) padding-box,
                  linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude; 
  }

  .image__hover__check {
    filter: drop-shadow(0px 0px 5px #F4CC3A);
  }

  .tag__container {
    display: flex;
    justify-content: center;
    gap: 8px;
  }

  .site__info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .site__info.disabled {
    opacity: 0.75;
  }
  
  .site__image.disabled {
    opacity: 0.25;
  }

  .site__card-title {
    margin: 22px 0 5px;
  }

  .site__card-description {
    margin: 0 0 15px;
  }

  .author__link {
    font-weight: 700;
    text-decoration: none;
    color:  #F6AE2D;
  }
</style>