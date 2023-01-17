<template>
  <aside>
    <BohrBox shadowLess variant="outline-highlight" class="settings__nav__box">
      <nav>
        <ul class="settings__nav__list">
          <li class="settings__back__link">
            <router-link
              class="settings__nav__link"
              :to="{ name: 'ProjectOverview' }"
            >
              <ArrowIcon :sizePx="12" direction="left" />
              {{ $t('common.back') }}
            </router-link>
          </li>
          <template v-for="link in navLinks" :key="link.label">
            <li class="settings__nav__item">
              <router-link
                class="settings__nav__link"
                :class="{ 'settings__nav__link--current': routeMatches(link) }"
                :to="{ name: link.routename, params: $route.params }"
              >
                {{ link.label }}
              </router-link>
            </li>
          </template>
        </ul>
      </nav>
    </BohrBox>
  </aside>
</template>

<script>
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import BohrBox from '@/components/BohrBox.vue';

export default {
  components: {
    ArrowIcon,
    BohrBox,
  },
  props: {
    navLinks: Object,
  },
  methods: {
    routeMatches(item) {
      return this.$route.name === item.routename || (item.routeparent && this.$route.matched.find((route) => route.name === item.routeparent));
    }
  }
}
</script>

<style scoped>
.settings__nav__box {
  position: sticky;
  top: 48px;
  margin-right: 48px;
}

.settings__nav__list {
  list-style: none;
  padding: 0 0 36px;
  margin: auto;
  min-width: 105px;
}

.settings__back__link,
.settings__nav__item {
  position: relative;
  padding-inline: 24px;
}

.settings__back__link,
.settings__nav__item:where(:not(:last-child)) {
  margin-bottom: 36px;
}

.settings__back__link {
  padding: 24px;
  background-color: hsl(0, 100%, 0%, 0.2);
  border-top-right-radius: var(--border-radius);
  border-top-left-radius: var(--border-radius);

  border-bottom: 1px solid;
  border-image: linear-gradient(90deg, rgba(0, 0, 0, 0.0001) 0%, #000000 50%, transparent 100%);;
  border-image-slice: 1;
}

.settings__nav__link {
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  color: inherit;
  text-transform: capitalize;
  transition: color var(--transition);
  white-space: nowrap;
}

.settings__nav__link--current,
.settings__nav__link:focus,
.settings__nav__link:hover {
  color: #F26419;
}

:deep .settings__nav__link path {
  transition: fill var(--transition);
}

:deep .settings__nav__link:focus path,
:deep .settings__nav__link:hover path {
  fill: #F26419;
}

.settings__nav__link--current::before {
  content: '';
  display: block;
  position: absolute;
  top: -12px;
  left: -1px;
  bottom: -12px;
  width: 1px;
  background-image: linear-gradient(180deg, #F4CD3B 0.04%, #F16622 53.99%, #E84856 99.94%);
}

@media screen and (max-width: 1023px) {
  .settings__nav__box {
    margin-right: 0;
  }
}
</style>
