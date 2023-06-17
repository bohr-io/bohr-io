<template>
  <div 
    class="tooltip-container"
  >
    <component
      :is="profileUrlInternal ? 'a' : 'div'"
      :href="profileUrlInternal"
      rel="noreferrer"
      target="_blank"
      class="presence__avatar__container"
    >
    <img 
      class="last__devs__avatar__image" 
      :src="avatarUrl" 
      :alt="username" 
      :class="[tooltip]" 
    />
    </component>
    <aside class="tooltip-top">
      <div :class="[tooltip]">
        <img class="tooltip-avatar" :src="avatarUrl" :alt="username" :class="[tooltip]" />
        <p class="username">{{ username }}</p>
        <BohrPlan :select-plan="plan || 'FREE'" class="bohr__plan" />
        <div class="button-group">
          <div class="code__links">
            <BohrIconButton
              component="a"
              :href="mainSiteUrl"
              target="_blank"
              rel="noreferrer"
              :label="mainSiteUrl ? mainSiteUrl : ''"
              :backgroundColor="mainSiteUrl ? '#F6AE2D' : '#999'"
              :withoutHoverEffect="true"
              disabled="disable_button"
            >
              <NewWIndowIcon :sizePx="18" color="#111B22" />
            </BohrIconButton>
            <span class="separator"></span>
            <BohrIconButton
              component="a"
              :href="githubUrl"
              target="_blank"
              rel="noreferrer"
              :label="githubUrl ? githubUrl : ''"
            >
              <GithubIcon />
            </BohrIconButton>
            <BohrIconButton
              component="a"
              :href="linkedinUrl"
              target="_blank"
              rel="noreferrer"
              :label="linkedinUrl ? linkedinUrl : ''"
              :class="{'linkedin-active': linkedinUrl, 'linkedin-inactive': !linkedinUrl}"
            >
            >
              <img
                src="/assets/svg/linkedin.svg"
                role="presentation"
                alt=""
                class="linkedin__logo"
                :class="{'linkedin__logo-color': linkedinUrl, 'linkedin__logo-bw': !linkedinUrl}"
              />
            </BohrIconButton>
            <span class="separator"></span>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script lang="ts">
import BohrPlan from './BohrMainBar/BohrPlan.vue'
import BohrIconButton from '@/components/BohrIconButton.vue';
import NewWIndowIcon from '@/components/icons/NewWIndowIcon.vue';
import GithubIcon from '@/components/icons/GithubIcon.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    BohrPlan,
    BohrIconButton,
    NewWIndowIcon,
    GithubIcon
  },
  props: {
    colorSeed: {
      type: Number,
      default: 0,
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    username: {
      type: String,
      default: '',
    },
    plan: {
      type: String,
      default: '',
    },
    mainSiteUrl: {
      type: String,
      default: '',
    },
    githubUrl: {
      type: String,
      default: '',
    },
    linkedinUrl: {
      type: String,
      default: '',
    },
    sizePx: {
      type: Number,
      default: 30,
    },
    profileUrl: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      profileUrlInternal: this.profileUrl && (this.profileUrl.startsWith('https://') ? this.profileUrl : `https://${this.profileUrl}`)
    };
  },
  computed: {
    tooltip() {
      switch(this.plan) {
        case 'FREE':
        return 'plan-free'
        case 'PRO':
          return 'plan-pro';
        case 'PIONEER':
          return 'plan-pioneiro';
        case 'BUSINESS':
          return 'plan-business';
        default:
          return 'plan-free';
      }
    }
  }
});
</script>

<style scoped>

.tooltip-container {
  position: relative;
}
.presence__avatar__container {
  display: inline-block;
  position: relative;
  padding-top: 15px;
  margin-top: -15px;
}

.tooltip {
  border: 1px solid ;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 9999;
}

.plan-free {
  color: #53DD6C;
  background: rgba(8, 10, 11, 0.9);
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.3);
  border: 2px solid;
  border-image: linear-gradient(180deg, #55DDE0, #53DD6C);
  border-image-slice: 1;
}

.plan-pro {
  color: #CC5AB3;
  background: rgba(8, 10, 11, 0.9);
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.3);
  border: 2px solid;
  border-image: linear-gradient(180deg, #55DDE0, #CC5AB3);
  border-image-slice: 1;
}

.plan-pioneiro {
  color: #F26419;
  background: rgba(8, 10, 11, 0.9);
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.3);
  border: 2px solid;
  border-image: linear-gradient(180deg, #F6AE2D, #F26419, #E84855);
  border-image-slice: 1;
}

.plan-business {
  color: #E84855;
  background: rgba(8, 10, 11, 0.9);
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.3);
  border: 2px solid;
  border-image: linear-gradient(180deg, #E84855, #365C73);
  border-image-slice: 1;
}

.tooltip-top {
  display: none;
  position: absolute;
  bottom: 80px;
  transform: translateX(-32%);
}

.tooltip-container:hover .tooltip-top {
  display: block;
}

.tooltip-top > div::after {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-style: solid;
  border-width: 8px 8px 0 8px;
  border-color: currentColor transparent transparent transparent;
}

.bohr__plan {
  position: initial;
  margin: 22px 22px 22px 35px;
}

.code__links {
  display: flex;
  align-items: center;
  padding: 0px 0px 0px 30px;
  right: 0;
  top: 0;
}

.code__links a {
  width: 32px;
  height: 32px;
}

.tooltip p {
  color: white;
  text-align: center;
}

.button-group {
  padding-bottom: 23px;
}

.tooltip .button-group {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.tooltip .button-group a {
  display: inline-block;
  padding: 5px 10px;
  background-color: #ccc;
  color: #fff;
  text-decoration: none;
}

.tooltip .button-group a:hover {
  background-color: #aaa;
}

.tooltip-content {
  position: absolute;
  top: -150%;
  left: 0;
  transform: translateX(-50%);
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  display: block;
}

.username {
  text-align: center;
  color: white;
  font-size: 14px;
}
.tooltip-content p {
  margin: 0;
}

.tooltip-content .button-group {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.tooltip-content .button-group a {
  display: inline-block;
  padding: 5px 10px;
  background-color: #ccc;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
}

.tooltip-content .button-group a:hover {
  background-color: #aaa;
}

.tooltip-avatar {
  width: 105px;
  height: 105px;
  border: 2px solid;
  border-radius: 9999px;
  margin: 22px 35px 0px 35px
}
.last__devs__avatar__image {
  border: 2px solid;
  border-radius: 9999px;
  height: 60px;
  width: 60px;
}

.linkedin__logo {
  width: 42px;
  height: 42px;
}

.linkedin__logo-bw {
  filter: grayscale(100%);
}

</style>