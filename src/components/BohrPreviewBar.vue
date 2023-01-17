<template>
  <div
    class="bohr__preview__bar"
    :class="{
      open: isPreviewOpen,
      'transitions__disabled': isTransitionsDisabled,
    }"
  >
    <div class="bohr__logo__wrapper" data-intro-anchor="close">
      <svg class="bohr__logo__bg" width="151" height="65" viewBox="0 0 151 65" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.25" fill-rule="evenodd" clip-rule="evenodd" d="M145.548 64.9549L0.0510075 65L0.000384143 1.00001L145.5 0.954897C148.479 11.4356 150.017 22.1135 150.026 32.9492C150.034 43.7878 148.512 54.4696 145.548 64.9549Z" fill="url(#paint0_radial_4445_17276)"/>
        <defs>
          <radialGradient id="paint0_radial_4445_17276" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0.0253109 33) rotate(-0.0177053) scale(150 250.701)">
            <stop stop-opacity="0.01"/>
            <stop offset="0.691973" stop-opacity="0.01"/>
            <stop offset="1"/>
          </radialGradient>
        </defs>
      </svg>
      <VTooltip :distance="2" style="height:100%">
        <button
          type="button"
          class="bohr__logo__container"
          @click="closePreview"
        >
          <BohrLogo iconColor="hsl(0, 0%, 100%)" />
        </button>
        <template #popper>
          {{ $t('components.previewBar.closeLabel') }}
        </template>
      </VTooltip>
    </div>

    <div class="breadcrumbs">
      <span class="breadcrumb">{{ $route.params.org }}</span>
      <span class="breadcrumb">{{ $route.params.project }}</span>
      <div class="context__select__container">
        <div class="context__view" v-if="selectedPreviewData">
            <i class="context__view__icon">
              <img
                v-if="selectedPreviewData.type === 'LOCALHOST'"
                :width="30"
                :height="30"
                :src="`https://github.com/${selectedPreviewData.name}.png`"
                :alt="selectedPreviewData.name"
              />
              <svg v-if="selectedPreviewData.type === 'BRANCH'" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="15" fill="#F6AE2D"/>
                <circle cx="12.8125" cy="8.4375" r="2.3125" stroke="#1B2A34" stroke-width="1.5"/>
                <circle cx="21.5625" cy="11.9375" r="2.3125" stroke="#1B2A34" stroke-width="1.5"/>
                <circle cx="12.8125" cy="22.4375" r="2.3125" stroke="#1B2A34" stroke-width="1.5"/>
                <line x1="13.125" y1="10.625" x2="13.125" y2="20.25" stroke="#1B2A34" stroke-width="1.5"/>
                <path d="M15 21.125C15 20.6875 15.1725 19.9815 15.4659 19.5128C15.7351 19.0827 16.1023 18.8193 16.5692 18.6108C17.2396 18.3113 17.936 18.1721 18.6628 18.096C19.1846 18.0415 19.6117 17.8612 20.0595 17.589C20.5127 17.3135 20.9531 16.9912 21.2729 16.5662C21.5298 16.2249 21.6977 15.8384 21.8538 15.4457C21.9131 15.2964 21.9667 15.1555 22 15" stroke="#1B2A34" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </i>
            <div class="context__view__selection">
              <div class="context__view__localhost" v-if="selectedPreviewData.type === 'LOCALHOST'">{{ selectedPreviewData.name }}'s <strong>localhost</strong></div>
              <div class="context__view__branch" v-if="selectedPreviewData.type === 'BRANCH'"><strong>branch: {{ selectedPreviewData.name }}</strong></div>
            </div>
            <!-- <div class="context__view__status">
              <svg class="status__indicator" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="10" height="10" />
              </svg>
              <span class="status__text">
                {{ $t('common.live') }}
              </span>
            </div> -->
            <div class="context__view__arrow">
              <ArrowIcon
                :sizePx="12"
                direction="bottom"
              />
            </div>
        </div>
        <select class="context__select" @change="handleChangePreview">
          <template v-if="selectedPreviewData">
            <optgroup
              v-for="(groupOptions, groupName) in previewOptions"
              :key="groupName"
              :label="groupName"
            >
              <option
                v-for="option in groupOptions"
                :key="option.liveUrl"
                :value="JSON.stringify({ type: groupName, name: option.name })"
                :selected="option.liveUrl === selectedPreviewData.liveUrl"
              >
                {{ option.name }}
              </option>
            </optgroup>
          </template>
        </select>
      </div>
    </div>

    <div class="layout__controls left__divider">
      <div
        class="layout__options"
        data-intro-anchor="layouts"
      >
        <BohrIconButton
          label="desktop layout"
          class="desktop__layout__button"
          withoutHoverEffect
          :class="{ selected: selectedLayout === 'desktop' }"
          @click="selectLayout('desktop')"
        >
          <DesktopIcon />
        </BohrIconButton>
        <BohrIconButton
          label="tablet layout"
          class="tablet__layout__button"
          withoutHoverEffect
          :class="{ selected: ['tabletPortrait', 'tabletLandscape'].includes(selectedLayout) }"
          @click="selectLayout(selectedLayout = selectedLayout === 'tabletLandscape' ? 'tabletPortrait' : 'tabletLandscape')"
        >
          <TabletIcon />
        </BohrIconButton>
        <BohrIconButton
          label="phone layout"
          class="phone__layout__button"
          withoutHoverEffect
          :class="{ selected: ['phoneLandscape', 'phonePortrait'].includes(selectedLayout) }"
          @click="selectLayout(selectedLayout = selectedLayout === 'phonePortrait' ? 'phoneLandscape' : 'phonePortrait')"
        >
          <PhoneIcon />
        </BohrIconButton>
        <BohrIconButton
          label="fun layout"
          class="fun__layout__button"
          withoutHoverEffect
          :class="{ selected: selectedLayout === 'fun' }"
          @click="selectLayout('fun')"
        >
          <CameraIcon />
        </BohrIconButton>
      </div>
    </div>

    <ul v-if="othersOnPreview && othersOnPreview.length > 0" class="presence__list left__divider">
      <li v-for="other in othersOnPreview.slice(0, othersOnPreview.length > 3 ? 2 : 3 )" :key="other.connectionId">
        <PresenceAvatar
          :avatarUrl="other.presence.avatarUrl"
          :username="other.presence.username"
          :colorSeed="other.connectionId"
        />
      </li>
      <li v-if="othersOnPreview.length > 3">
        <div class="presence__plus">+{{ othersOnPreview.length - 2 }}</div>
      </li>
    </ul>

    <div class="save__edit__controls left__divider">
      <VTooltip :disabled="hasEditablePreview" :distance="10">
        <BohrButton
          size="sm"
          @click="enableEdit"
          :disabled="!hasEditablePreview || isEditEnabled"
          data-intro-anchor="edit"
        >
          <template #iconLeft>
            <PencilIcon :sizePx="18" />
          </template>
          {{ $t('common.edit') }}
        </BohrButton>
        <template #popper>
          {{ $t('components.previewBar.disabledEditTooltip') }}
        </template>
      </VTooltip>

      <BohrButton
        size="sm"
        @click="saveContent"
        :disabled="!isEditEnabled"
        data-intro-anchor="save"
      >
        <template #iconLeft>
          <SaveIcon :sizePx="18" />
        </template>
        {{ $t('common.save') }}
      </BohrButton>
    </div>

    <div class="misc__controls left__divider">
      <BohrIconButton
        component="a"
        :href="previewUrl"
        target="_blank"
        rel="noreferrer"
        :label="previewUrl"
        backgroundColor="#F6AE2D"
        :withoutHoverEffect="true"
      >
        <NewWIndowIcon :sizePx="18" color="#111B22" />
      </BohrIconButton>
      <BohrIconButton
        component="a"
        :href="`https://github.com/${org}/${project}`"
        target="_blank"
        rel="noreferrer"
        :label="`https://github.com/${org}/${project}`"
        :withoutHoverEffect="true"
      >
        <GithubIcon :sizePx="32" />
      </BohrIconButton>
      <BohrIconButton
        component="a"
        :href="`https://github.dev/${org}/${project}`"
        target="_blank"
        rel="noreferrer"
        :label="`https://github.dev/${org}/${project}`"
        :withoutHoverEffect="true"
      >
        <VSCodeIcon :sizePx="32" type="round" />
      </BohrIconButton>
    </div>

    <div class="misc__controls left__divider">
      <BohrIconButton
        :label="$t('components.previewBar.closeLabel')"
        @click="closePreview"
        :withoutHoverEffect="true"
      >
        <XIcon :sizePx="24" color="#E84855" />
      </BohrIconButton>
    </div>
  </div>
</template>

<script lang="ts">
import BohrButton from '@/components/BohrButton.vue';
import BohrIconButton from '@/components/BohrIconButton.vue';
import BohrLogo from '@/components/BohrLogo.vue';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import CameraIcon from '@/components/icons/CameraIcon.vue';
import DesktopIcon from '@/components/icons/DesktopIcon.vue';
import GithubIcon from '@/components/icons/GithubIcon.vue';
import NewWIndowIcon from '@/components/icons/NewWIndowIcon.vue';
import PhoneIcon from '@/components/icons/PhoneIcon.vue';
import PencilIcon from '@/components/icons/PencilIcon.vue';
import SaveIcon from '@/components/icons/SaveIcon.vue';
import TabletIcon from '@/components/icons/TabletIcon.vue';
import VSCodeIcon from '@/components/icons/VSCodeIcon.vue';
import XIcon from '@/components/icons/XIcon.vue';
import PresenceAvatar from '@/components/PresenceAvatar.vue';
import { SitePreviewData } from '@/types';
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

const previewLayoutEventFactory = (layout: string) => new CustomEvent('previewLayout', { detail: layout });
const enablePreviewEditEvent = new CustomEvent('enablePreviewEdit');
const savePreviewContentEvent = new CustomEvent('savePreviewContent');

export default defineComponent({
  components: {
    XIcon,
    BohrButton,
    BohrIconButton,
    NewWIndowIcon,
    DesktopIcon,
    GithubIcon,
    TabletIcon,
    PhoneIcon,
    CameraIcon,
    PencilIcon,
    SaveIcon,
    BohrLogo,
    ArrowIcon,
    VSCodeIcon,
    PresenceAvatar,
  },
  emits: [],
  data() {
    return {
      selectedLayout: 'desktop',
      isEditEnabled: false,
      isMenuAllowed: true,
      org: this.$route.params.org,
      project: this.$route.params.project,
      isTransitionsDisabled: false,
    };
  },
  computed: {
    ...mapGetters({
      selectedPreviewData: 'site/selectedPreviewData',
      othersOnPreview: 'site/othersOnPreview',
      hasEditablePreview: 'site/hasEditablePreview',
    }),

    previewOptions() { return this.$store.getters['site/previewOptions'] as Record<string, SitePreviewData[]> },

    isPreviewOpen() { return this.$store.state.preview },

    previewUrl() {
      if (!this.selectedPreviewData) return '';
      if (this.selectedPreviewData.url.match(/^localhost$/)) return `http://${this.selectedPreviewData.url}`;
      return `https://${this.selectedPreviewData.url}`;
    },
  },
  watch: {
    isPreviewOpen() {
      if (!this.isPreviewOpen) {
        this.handleCloseSideEffects();
      }
    }
  },
  beforeMount() {
    window.addEventListener('blur', this.windowBlurCallback);
    window.addEventListener('keydown', this.handleKeyDown);
  },
  async mounted() {
    const { deployGroupType, deployName } = this.$route.params;
    if (deployGroupType && deployName) {
      await this.$nextTick();
      this.isTransitionsDisabled = true,
      setTimeout(() => this.isTransitionsDisabled = false, 1000);
    }
  },
  beforeUnmount() {
    window.removeEventListener('blur', this.windowBlurCallback);
    window.removeEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    selectLayout(layout: string) {
      this.selectedLayout = layout;
      document.dispatchEvent(previewLayoutEventFactory(layout));
    },    

    enableEdit() {
      this.isEditEnabled = true;
      document.dispatchEvent(enablePreviewEditEvent);
    },

    saveContent() {
      this.isEditEnabled = false;
      document.dispatchEvent(savePreviewContentEvent);
    },

    closePreview() {
      this.$store.commit('setPreview', false);
    },

    handleCloseSideEffects() {
      this.isEditEnabled = false;
      this.selectLayout('desktop');
      this.$store.commit('site/setSelectedPreview', {
        type: 'BRANCH',
        name: this.previewOptions.BRANCH[0].name,
      });

      this.$router.push({
        name: 'ProjectOverview',
        params: this.$route.params,
      });    
    },

    handleChangePreview(e: Event) {
      const { value } = (e.target as HTMLSelectElement);
      const { type, name } = JSON.parse(value);
      this.$store.commit('site/setSelectedPreview', {
        type,
        name,
      });
      this.$router.push({
        name: 'SitePreview',
        params: {
          ...this.$route.params,
          deployGroupType: type.toLowerCase(),
          deployName: name,
        },
      });
    },

    windowBlurCallback() {
      this.isMenuAllowed = false;
      setTimeout(() => this.isMenuAllowed = true, 100);
    },

    handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') this.closePreview();
    },
  },
});
</script>

<style scoped>
.bohr__preview__bar {
  display: flex;
  align-items: center;
  position: absolute;
  top: -64px;
  left: 0;
  right: 0;
  height: 64px;
  padding-right: 16px;
  background: linear-gradient(180deg, #20333E 0%, #0E171D 100%);
  transition: top 1s linear;

}

.bohr__preview__bar.open {
  top: 0;
}

.bohr__preview__bar.transitions__disabled {
  transition-duration: 0s !important;
}

.bohr__preview__bar.transitions__disabled * {
  transition-duration: 0s !important;
}

.bohr__logo__wrapper {
  position: relative;
  height: 100%;
}

.bohr__logo__bg {
  position: absolute;
  top: 0;
  left: 0;
}

.bohr__logo__container {
  position: relative;
  display: grid;
  place-items: center;
  width: 150px;
  height: 100%;
  border: none;
  cursor: pointer;
  background: none;
}

.breadcrumbs {
  display: flex;
  align-items: center;
  margin-left: 12px;
  font-size: 12px;
  line-height: 14px;
}

.breadcrumb {
  margin-left: 0.4em;
}

.context__select__container {
  position: relative;
  display: inline-block;
  min-width: 250px;
  margin-left: 16px;
}

.context__view {
  display: flex;
  align-items: center;
  height: 30px;
  background: #365C73;
  border: 2px solid #365C73;
  border-radius: 34px;
}

.context__view__icon {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  border-radius: 50%;
  overflow: hidden;
}

.context__view__selection {
  flex-grow: 1;
}

.context__view__localhost + .context__view__branch {
  font-size: 10px;
}

.context__view__arrow {
  width: 32px;
  text-align: center;
}

.context__view__status {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 16px;
}

.context__view__status .status__text {
  display: inline-block;
  font-weight: 700;
  font-size: 8px;
  line-height: 9px;
  color: hsl(0, 0%, 100%);
  padding: 0.5px 4px;
  text-transform: uppercase;
}

.context__view__status .status__indicator,
.context__view__status .status__text {
  background:  linear-gradient(180deg, hsl(202, 32%, 18%) 0%, hsl(204, 35%, 8%) 100%);
  box-shadow: 0 2px 4px hsla(216, 53%, 30%, 0.48);
  border: 1px solid hsla(0, 0%, 100%, 0.25);
  border-radius: 999px;
}

.context__view__status.live .status__indicator,
.context__view__status.live .status__text {
  background:  linear-gradient(180deg, hsl(21, 89%, 52%) 0%, hsl(355, 78%, 60%) 100%);
  box-shadow: none;
  border: 1px solid hsla(0, 0%, 100%, 0.5);
}


.context__select {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  appearance: none;
  border-radius: 2px;
  border: 1px solid #F1F1F1;
  padding: 8px 30px 8px 8px;
  font-weight: 700;
}

.breadcrumb::before {
  content: '/ ';
}

.breadcrumb:last-of-type::after {
  content: ' /';
}

.presence__list {
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 0 0 0 auto;
  padding: 0;
  list-style: none;
}

.presence__plus {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0666B5;
  border-radius: 50%;
  font-weight: 700;
}

.site__link {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  border: none;
  background-image: linear-gradient(180deg, hsl(21, 89%, 52%) 0%, hsl(355, 78%, 60%) 100%);
  border-radius: 1000px;
  padding: 10px 16px;
  color: hsl(0, 0%, 100%);
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
}

.layout__controls {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-grow: 1;
}

.layout__options {
  display: flex;
  width: 100%;
  height: 36px;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

.layout__options :deep(.bohr__icon__button) {
  height: 100%;
}

[class*="__layout__button"] :deep(.screen) {
  opacity: 0;
}

[class*="__layout__button"].selected :deep(.screen),
[class*="__layout__button"]:hover :deep(.screen) {
  opacity: 1;
}

/* [class*="__layout__button"] {
  position: relative;
}

[class*="__layout__button"]::after {
  content: '';
  position: absolute;
  opacity: 0;
  top: 1px;
  left: 1px;
  border-radius: 1px;
  background-image: linear-gradient(180deg, hsl(47, 89%, 59%) 0%, hsl(20, 88%, 54%) 53.99%, hsl(355, 78%, 60%) 100%);
  pointer-events: none;
}
      
.desktop__layout__button::after {
  width: 22px;
  height: 14px;
}

.tablet__layout__button::after {
  width: 22px;
  height: 14px;
}

.phone__layout__button::after {
  width: 8px;
  height: 14px;
}

.fun__layout__button::after {
  width: 18px;
  height: 10px;
}

[class*="__layout__button"].selected::after,
[class*="__layout__button"]:hover::after {
  opacity: 0.2;
} */

.save__edit__controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

@media screen and (max-width: 1365px) {
  .save__edit__controls :deep(.bohr__button .bohr__button__text) {
    display: none;
  }
}

.misc__controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.misc__controls :deep(.bohr__icon__button) {
  width: 32px;
  height: 32px;
}

.menu__dropdown {
  display: flex;
  flex-direction: column;
}

.menu__dropdown > a {
  color: inherit;
  padding: 10px;
}

.menu__dropdown > a:focus,
.menu__dropdown > a:hover {
   background-color: hsla(131, 67%, 60%, 0.5);
}


.left__divider {
  margin-left: 16px;
}
.left__divider:before {
  content: '';
  display: block;
  width: 1px;
  height: 24px;
  background: #fff;
  opacity: .15;
  margin: 0 4px;
}

.presence__list.left__divider:before {
  margin-right: 15px;
}

@media screen and (min-width: 1366px) {
  .layout__controls.left__divider,
  .presence__list.left__divider {
    margin-left: 0;
  }

  .layout__controls.left__divider:before,
  .presence__list.left__divider:before {
    display: none;
  }
}
</style>
