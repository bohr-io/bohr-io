<template>
  <aside>
    <BohrBox shadowLess variant="outline-highlight" class="site__nav__box">
      <nav>
        <ul class="site__nav__list">
          <template v-for="link in links" :key="link.label">
            <li v-if="!link.isHidden || isPublic" class="site__nav__item">
              <router-link
                class="site__nav__link"
                :class="{ 'site__nav__link--current': routeMatches(link) }"
                :to="{
                  name: link.routename,
                  params: {
                    org: $route.params.org,
                    site: $route.params.site,
                  }
                }"
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

<script lang="ts">
import BohrBox from '@/components/BohrBox.vue';
import { defineComponent } from 'vue';

type LinkItem = {
  label: string;
  routename: string;
  routeparent?: string;
}

export default defineComponent({
  name: 'BohrSiteBar',
  components: {
    BohrBox
  },
  props: {
    isPublic: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      isExpanded: false,
    }
  },
  computed: {
    links() {
      if (this.isPublic) return this.publicLinks;
      else return this.privateLinks;
    },
    privateLinks() {
      return [
        {
          label: this.$t('common.overview'),
          routename: 'ProjectOverview',
        },
        {
          label: this.$t('common.deploys'),
          routename: 'ProjectDeploys',
        },
        {
          label: this.$t('common.analytics'),
          routename: 'ProjectAnalytics',
        },
        {
          label: this.$t('common.files'),
          routename: 'ProjectFiles',
          isHidden: window.location.host ==='bohr.io'
        },
        {
          label: this.$t('common.logs'),
          routename: 'ProjectLogs',
        },
        {
          label: this.$t('common.settings'),
          routename: 'ProjectSettingsGeneral',
          routeparent: 'ProjectSettings',
        },
        {
          label: this.$t('common.api'),
          routename: 'ProjectApi',
          isHidden: window.location.host === 'bohr.io',
        },
      ];
    },
    publicLinks() {
      return [
        {
          label: this.$t('common.overview'),
          routename: 'ProjectOverviewPublic',
          isHidden: undefined,
        },
        {
          label: this.$t('common.deploys'),
          routename: 'ProjectDeploys',
          isHidden: undefined,
        },
        {
          label: this.$t('common.logs'),
          routename: 'ProjectLogs',
          isHidden: undefined,
        },
      ]
    }
  },
  methods: {
    routeMatches(item: LinkItem) {
      return this.$route.name === item.routename || (item.routeparent && this.$route.matched.find((route) => route.name === item.routeparent));
    }
  }
});
</script>

<style scoped>
.site__nav__box {
  position: sticky;
  top: 48px;
  margin-right: 48px;
}

.site__nav__list {
  list-style: none;
  padding: 36px 24px;
  margin: auto;
  min-width: 105px;
}

.site__nav__item {
  position: relative;
}

.site__nav__item:where(:not(:last-child)) {
  margin-bottom: 36px;
}

.site__nav__link {
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  color: inherit;
  text-transform: capitalize;
  transition: color var(--transition);
}

.site__nav__link--current,
.site__nav__link:focus,
.site__nav__link:hover {
  color: #F26419;
}

.site__nav__link--current::before {
  content: '';
  display: block;
  position: absolute;
  top: -12px;
  left: -25px;
  bottom: -12px;
  width: 1px;
  background-image: linear-gradient(180deg, #F4CD3B 0.04%, #F16622 53.99%, #E84856 99.94%);
}

@media screen and (max-width: 1023px) {
  .site__nav__box {
    margin-right: 0;
  }
}
</style>
