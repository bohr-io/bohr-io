<template>
  <div class="newsite__page">
    <header class="newsite__header">
      <BohrTypography tag="p" variant="title3" class="newsite__breadcrumb">
        {{ $tc('common.project', 2)}}
      </BohrTypography>
      <BohrPageTitle pageName="New project" shadowText="Projects" shadowVerticalOffset="-21px" class="newsite__title" />
      <div class="newsite__flavor__text">
        <BohrTypography tag="p" variant="body1">
          To ensure you can easily update your project after deploying it, a Git repository must be created.
        </BohrTypography>
        <BohrTypography tag="p" variant="body1">
          Every push to that Git repository will be deployed automatically.
        </BohrTypography>
      </div>
    </header>

    <main class="new__site__main">
      <div class="intention__options" @mouseleave="intentionCardLeave()">
        <template v-for="(option, i) in interactionOptions" :key="option.title">
          <BohrBox
            :variant="intentionBoxVariant[i]"
            class="intention__card"
            :class="intentionBoxFadeClass(i)"
            @mouseover="intentionCardHover(i)"
          >
            <component :is="option.icon" :sizePx="128" isGradient />
            <BohrTypography tag="h3" variant="title3" class="option__title">
              {{ option.title }}
            </BohrTypography>
            <BohrTypography tag="p" variant="body1" class="option__description">
              {{ option.description }}
            </BohrTypography>
            <BohrButton
              component="router-link"
              :to="{ name: 'New', params: { org: username, type: option.type} }"
              size="lg"
              class="option__btn"
              @focus="intentionCardHover(i)"
              @blur="intentionCardLeave()"
            >
              {{ option.buttonText }}
            </BohrButton>
          </BohrBox>
        </template>
      </div>
      <router-link :to="{ name: 'New', params: { org: username } }" class="all__possibilities">
        <BohrIcon :sizePx="32" class="all__possibilities__logo" />
        <BohrTypography variant="title3">
          I don't know. Show me all possibilities!
        </BohrTypography>
        <ArrowIcon direction="right" :sizePx="16" class="all__possibilities__arrow" />
      </router-link>
    </main>
  </div>
</template>

<script>
import BohrPageTitle from '@/components/BohrPageTitle.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import BohrBox from '@/components/BohrBox.vue';
import BohrButton from '@/components/BohrButton.vue';
import APIIcon from '@/components/icons/APIIcon.vue';
import CMSIcon from '@/components/icons/CMSIcon.vue';
import FrontEndIcon from '@/components/icons/FrontEndIcon.vue';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import BohrIcon from '@/components/icons/BohrIcon.vue';

export default {
  components: {
    BohrPageTitle,
    BohrTypography,
    BohrBox,
    BohrButton,
    ArrowIcon,
    BohrIcon,
  },
  data() {
    return {
      breadcrumbs: ['projects'],
      intetionCardHovered: undefined,
    }
  },
  computed: {
    username() { return this.$store.state.me?.username },

    interactionOptions() {
      return [
        {
          title: this.$t('home.section.intention.options[0].title'),
          description: this.$t('home.section.intention.options[0].description'),
          buttonText: this.$t('home.section.intention.options[0].buttonText'),
          icon: FrontEndIcon,
          type: 'code'
        },
        {
          title: this.$t('home.section.intention.options[1].title'),
          description: this.$t('home.section.intention.options[1].description'),
          buttonText: this.$t('home.section.intention.options[1].buttonText'),
          icon: CMSIcon,
          type: 'content'
        },
        {
          title: this.$t('home.section.intention.options[2].title'),
          description: this.$t('home.section.intention.options[2].description'),
          buttonText: this.$t('home.section.intention.options[2].buttonText'),
          icon: APIIcon,
          type: 'integrate'
        },
      ];
    },

    intentionBoxVariant() {
      const highlightVariant = 'outline-highlight';
      const normalVariant = 'outline';
      const variantArr = [highlightVariant, highlightVariant, highlightVariant];

      if (this.intetionCardHovered === undefined) return variantArr;

      return variantArr.map((_, i) => {
        if (this.intetionCardHovered === i) return highlightVariant;
        return normalVariant;
      });
    },
  },
  methods: {
    intentionBoxFadeClass(i) {
      if (this.intetionCardHovered !== undefined && this.intetionCardHovered !== i) {
        return 'intention__card--fade';
      }

      return '';
    },

    intentionCardHover(i) {
      this.intetionCardHovered = i;
    },

    intentionCardLeave() {
      this.intetionCardHovered = undefined;
    },
  },
}
</script>

<style scoped>
.newsite__page {
  max-width: 1056px;
  margin-inline: auto;
}

.newsite__header {
  margin-top: 24px;
}

.newsite__breadcrumb {
  color: #C3A32E;
}

.newsite__breadcrumb::before {
  content: '/';
  color: #625217;
}

.newsite__title {
  margin-bottom: 24px;
}

.newsite__flavor__text {
  margin-bottom: 48px;
}

.intention__options {
  display: flex;
  gap: 58px
}

.intention__card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 32px;
  text-align: center;
  white-space: pre-line;
  transition: opacity var(--transition);
}

.intention__card--fade {
  opacity: 0.5;
}

.option__title {
  margin-top: 48px;
}

.option__description {
  margin-block: 8px 48px;
}

.option__btn {
  margin-top: auto;
  width: 152px;
}

.all__possibilities {
  display: flex;
  align-items: center;
  margin-top: 96px;
  margin-inline: auto;
  padding: 24px 34px;
  width: max-content;
  background-color: #16252E;
  border-radius: 4px;
  color: #FFFFFF;
  transition: background-color var(--transition);
  cursor: pointer;
}

.all__possibilities:focus,
.all__possibilities:hover {
  background-color: #365C73;
}

.all__possibilities__logo {
  margin-right: 34px;
}

.all__possibilities__arrow {
  margin-left: 66px;
}
</style>
