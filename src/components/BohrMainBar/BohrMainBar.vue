<template>
  <aside class="bohr__sidebar" :class="{ expanded: isExpanded, hidden: isHidden, 'mobile-hidden': mobileHidden }" @click.self="toggleMobileSidebar">
    <div class="bohr__sidebar__wrapper">
      <button class="bohr__sidebar__toggle" @click="toggleMobileSidebar">
        <svg v-if="mobileHidden" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447715 0.447715 0 1 0H15C15.5523 0 16 0.447715 16 1C16 1.55228 15.5523 2 15 2H1C0.447715 2 0 1.55228 0 1ZM0 11C0 10.4477 0.447715 10 1 10H15C15.5523 10 16 10.4477 16 11C16 11.5523 15.5523 12 15 12H1C0.447715 12 0 11.5523 0 11ZM1 5C0.447715 5 0 5.44772 0 6C0 6.55228 0.447715 7 1 7H15C15.5523 7 16 6.55228 16 6C16 5.44772 15.5523 5 15 5H1Z" fill="white"/>
        </svg>
        <svg v-if="!mobileHidden" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15 0C14.4477 0 14 0.447715 14 1V15C14 15.5523 14.4477 16 15 16C15.5523 16 16 15.5523 16 15V1C16 0.447715 15.5523 0 15 0ZM10.9497 8.0498C10.9497 7.49752 10.502 7.0498 9.94967 7.0498H3.36452L5.94975 4.46458C6.34027 4.07406 6.34027 3.44089 5.94975 3.05037C5.55922 2.65984 4.92606 2.65984 4.53553 3.05037L0.292893 7.29301C-0.0976311 7.68353 -0.0976311 8.3167 0.292893 8.70722L0.310467 8.72438L4.53599 12.9499C4.92651 13.3404 5.55968 13.3404 5.9502 12.9499C6.34072 12.5594 6.34072 11.9262 5.9502 11.5357L3.46432 9.0498H9.94967C10.502 9.0498 10.9497 8.60209 10.9497 8.0498Z" fill="white"/>
        </svg>
      </button>
      <a href="/" class="bohr__logo__btn">
        <div class="logo__container">
          <img src="/assets/svg/main-bar/bohr-logo-icon.svg" alt="" />
          <img v-if="isExpanded" src="/assets/svg/main-bar/bohr-logo-text.svg" alt="" />
        </div>
      </a>
      <nav class="bohr__nav">
        <ul>
          <template v-for="(link, i) in links" :key="link">
            <li
              class="bohr__nav-link__wrapper"
              @mouseenter="highlightedLink = i"
              @mouseleave="highlightedLink = undefined"
              @click="toggleMobileSidebar"
              v-tooltip="{
                content: link.label,
                placement: 'right',
                distance: 12,
                disabled: isExpanded,
              }"
            >
              <router-link
                v-if="link.route"
                class="bohr__nav-link"
                :to="link.route"
                @focus="highlightedLink = i"
                @blur="highlightedLink = undefined"
              >
                <NavIcon
                  class="bohr__nav-link__icon"
                  :iconName="link.iconName"
                  :isHighlighted="highlightedLink === i || (link.route && routeMatches(link))"
                />
                <span class="bohr__nav-link__text">{{ link.label }}</span>
              </router-link>

              <a
                v-else
                class="bohr__nav-link"
                :href="link.href"
                target="_blank"
                rel="noreferrer"
                @focus="highlightedLink = i"
                @blur="highlightedLink = undefined"
                @mousedown="(e) => [0, 1].includes(e.button) && gtagEvent(link.gtagEventName)"
              >
                <NavIcon
                  class="bohr__nav-link__icon"
                  :iconName="link.iconName"
                  :isHighlighted="highlightedLink === i || (link.route && routeMatches(link))"
                />
                <span class="bohr__nav-link__text">{{ link.label }}</span>
              </a>
            </li>
          </template>
        </ul>
      </nav>
      <client-only>
        <BohrButton
          v-if="plan === 'FREE' && getMe"
          class="button__upgrade"
          component="a"
          href="https://bohr.io/api/stripe/payment"
        >
          UPGRADE
        </BohrButton>
        <BohrButton
          v-if="!getMe"
          class="button__login"
          :color="'tertiary'"
          component="a"
          href="/login"
          @mousedown="gtagEvent('login_button')"
        >
          Login
        </BohrButton>
        <template #placeholder>
          <div class="me__loader">
            <SkeletonLoading :isShowing="true" width="100%" height="78px"></SkeletonLoading>
          </div>
        </template>
      </client-only>
      <BohrPlan v-if="getMe" :select-plan="plan" class="bohr__plan"></BohrPlan> 
      <BohrUserMenu :isExpanded="isExpanded" />
    </div>
  </aside>
</template>

<script lang="ts">
import BohrUserMenu from './UserMenu.vue';
import NavIcon from './NavIcon.vue';
import BohrPlan from './BohrPlan.vue';
import BohrButton from '@/components/BohrButton.vue';
import SkeletonLoading from '@/components/SkeletonLoading.vue';
import { defineComponent } from 'vue';
import { RouteLocationNamedRaw } from 'vue-router';

type LinkItem = {
  label: string
  iconName: string
  route: RouteLocationNamedRaw
  href?: string
  routeParent?: string,
  gtagEventName?: string,
  isPublic?: boolean,
}

export default defineComponent({
  name: 'BohrMainBar',
  components: {
    BohrUserMenu,
    NavIcon,
    BohrPlan,
    BohrButton,
    SkeletonLoading,
  },
  data() {
    return {
      isExpanded: false,
      highlightedLink: undefined as undefined | number,
      mobileHidden: true,
      pointerStartPosition: { x: 0, y: 0 },
      pointerEndPosition: { x: 0, y: 0 },
    }
  },
  computed: {
    getMe() { return this.$store.state.me as any },
    plan() { return this.$store.state.me?.plan || 'FREE' },
    // isExpanded() { return !this.$route.meta.isThinMainBar },

    isHidden() { return this.$store.state.preview },

    links() {
      const linkSideBar = [
        {
          label: this.$t('common.home'),
          isPublic: true,
          iconName: 'HomeIcon',
          route: { name: 'NewHome' },
        },
        {
          label: this.$t('common.project', 2),
          isPublic: true,
          iconName: 'SitesIcon',
          route: { name: 'Projects' },
        },
        {
          label: 'docs',
          iconName: 'DocsIcon',
          isPublic: true,
          route: this.$mq.tablet ? null : { name: 'Docs' },
          href: 'https://docs.bohr.io/',
          gtagEventName: 'mainbar_link_docs'
        },
        {
          label: this.$t('common.domain', 2),
          isPublic: true,
          iconName: 'DomainsIcon',
          route: { name: 'Domains' },
        },
        {
          label: this.$t('common.help'),
          isPublic: true,
          iconName: 'DiscordIcon',
          route: { name: 'Help' },
        },
        {
          label: this.$t('common.account'),
          iconName: 'AccountIcon',
          route: { name: 'OrgSettingsGeneral', params: { org: this.$store.state.me?.username } },
          routeParent: 'OrgSettings',
        },
      ] as LinkItem[];
      return linkSideBar.filter((link) => link.isPublic || !!this.getMe)
    }
  },
  created() {
    document.addEventListener('touchstart', this.touchStartListener as any);
    document.addEventListener('touchmove', this.touchMoveListener as any);
    document.addEventListener('touchend', this.touchEndListener as any);
  },
  unmounted() {
    document.removeEventListener('touchstart', this.touchStartListener as any);
    document.removeEventListener('touchmove', this.touchMoveListener as any);
    document.removeEventListener('touchend', this.touchEndListener as any);
  },
  methods: {
    routeMatches(item: LinkItem) {
      return Boolean(
        this.$route.name === item.route.name ||
        (item.routeParent && this.$route.matched.find((route) => route.name === item.routeParent)) ||
        this.$route.meta.mainBarPath === item.route.name
      );
    },
    toggleMobileSidebar() {
      this.mobileHidden = !this.mobileHidden, 1;
    },

    touchStartListener(e: TouchEvent) {
      if (window.visualViewport?.offsetLeft) return;
      const { clientX, clientY } = e.touches[0];
      this.pointerStartPosition = {
        x: clientX,
        y: clientY,
      };
    },

    touchMoveListener(e: TouchEvent) {
      if (window.visualViewport?.offsetLeft) return;
      const { clientX, clientY } = e.touches[0];
      this.pointerEndPosition = {
        x: clientX,
        y: clientY,
      };
    },

    touchEndListener() {
      if (window.visualViewport?.offsetLeft) return;
      const verticalMovement = Math.abs(this.pointerStartPosition.y - this.pointerEndPosition.y);
      if (verticalMovement > 15) return;

      const horizontalMovement = this.pointerEndPosition.x - this.pointerStartPosition.x;
      if (horizontalMovement > 0) this.mobileHidden = false;
      if (horizontalMovement < 0) this.mobileHidden = true;

      this.pointerStartPosition = { x: 0, y: 0 };
      this.pointerEndPosition = { x: 0, y: 0 };
    },

    gtagEvent(name?: string) {
      if (!name) return;
      this.$gtag.event(name, {
        'app_name': 'bohr.io',
        'screen_name': this.$route.name,
      });
    }
  }
});
</script>

<style scoped>
.bohr__sidebar {
  --nav-shadow-color: hsl(191, 100%, 50%, 0.5);
  --logo-btn-height: 99px;

  position: sticky;
  top: 0;
  width: var(--sidebar-width);
  height: 100vh;
  overflow: hidden;
  transition: var(--transition);
  flex-shrink: 0;
}

.me__loader {
  position: absolute;
  width: 70%;
  bottom: 85px;
  margin: 0% 18% 18% 15%;
}

.button__upgrade {
  display: flex;
  font-size: 12px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 8px 8px 8px;
  margin: 0% 18% 18% 15%;
  position: absolute;
  bottom: 130px;
  width: 70%;
  border: 2px solid transparent;
  background: linear-gradient(180deg, #55DDE0 0%, #53DD6C 100%);
  box-shadow: 0px 12px 36px rgba(83, 221, 108, 0.15);
  border-image-slice: 1;
  border-radius: 4px;
}

.button__login {
  display: flex;
  font-size: 16px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 8px 8px 8px;
  margin: 0% 18% 18% 15%;
  position: absolute;
  bottom: 85px;
  width: 70%;
  border: 2px solid transparent;
  border-image-slice: 1;
  border-radius: 4px;
}

.button__login:deep(.bohr__button__text) {
  color: black;
  margin: 8px 8px 8px 8px;
}

.img__button__login {
  width: 22px;
  height: 22px;
  margin-bottom: 3px;
}

.button__upgrade a {
  color: white;
}

.bohr__sidebar.expanded .bohr__plan {
  width: 60%;
}

.bohr__sidebar.expanded .img__button__login {
  margin-bottom: -4px;
}

.bohr__sidebar.expanded {
  width: var(--sidebar-width-expanded);
}

.bohr__sidebar.hidden {
  transform: translateX(-100%);
}

.bohr__sidebar__toggle {
  display: none;
}

.bohr__sidebar__wrapper {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(180deg, hsl(202, 32%, 18%) 0%, hsl(204, 35%, 8%) 100%);
}

.bohr__logo__btn {
  position: relative;
  display: block;
  width: 100%;
  height: var(--logo-btn-height);
  cursor: pointer;
  background-image: url('/assets/svg/main-bar/logo-bg-96.svg');
}

.logo__container {
  position: absolute;
  top: 50%;
  left: 30px;
  z-index: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
  
.logo__container::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  z-index: -1;
  transition: box-shadow var(--transition);
}

.bohr__logo__btn:focus .logo__container,
.bohr__logo__btn:hover .logo__container {
  z-index: 1;
}

.bohr__logo__btn:focus .logo__container::before,
.bohr__logo__btn:hover .logo__container::before {
  box-shadow: 0px 0px 25px 12px var(--nav-shadow-color);
}

.bohr__sidebar.expanded .bohr__logo__btn {
  background-image: url('/assets/svg/main-bar/logo-bg-192.svg');
}

.bohr__nav {
  margin-top: 48px;
}

.bohr__nav ul {
  display: flex;
  gap: 37px;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0 36px;
  list-style: none;
  box-sizing: border-box;
  width: 100%;
}

.bohr__nav-link__wrapper {
  width: 100%;
  cursor: pointer;
}

.bohr__nav-link__wrapper:focus,
.bohr__nav-link__wrapper:hover {
  z-index: 1;
}

.bohr__nav-link {
  position: relative;
  display: flex;
  gap: 16px;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  color: white;
  font-weight: 700;
  text-transform: uppercase;
  text-decoration: none;
}

.bohr__nav-link__icon {
  pointer-events: none;
}

.bohr__nav-link__text {
  display: none;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
}

.bohr__sidebar.expanded .bohr__nav-link__text {
  display: initial;
}

@media screen and (max-width: 1279px) {
  .bohr__sidebar {
    position: fixed;
    overflow: visible;
    z-index: 1;
  }

  .bohr__sidebar:before {
    content: "";
    display: block;
    position: fixed;
    top: 0;
    bottom: 0; 
    left: 0;
    right: 0;
    background: #000;
    opacity: .5;
  }

  .bohr__sidebar.hidden:before {
    display: none;
  }

  .bohr__sidebar.mobile-hidden {
    transform: translateX(-100%);
  }

  .bohr__sidebar__wrapper {
    position: relative;
    z-index: 1;
  }

  .bohr__sidebar__toggle {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    padding: 16px;
    top: 0;
    left: 0;
    overflow: hidden;
    border: 0;
    background: none;
    transition: transform var(--transition);
  }

  .bohr__sidebar .bohr__sidebar__toggle {
    transform: translateX(var(--sidebar-width));
  }

  .bohr__sidebar.expanded .bohr__sidebar__toggle {
    transform: translateX(var(--sidebar-width-expanded));
  }
}
</style>

<style>
@media screen and (max-width: 1279px) {
  .bohr__sidebar + .bohr__app__content {
    transform: translateX(var(--sidebar-width));
  }

  .bohr__sidebar.expanded + .bohr__app__content {
    transform: translateX(var(--sidebar-width-expanded));
  }

  .bohr__sidebar.hidden + .bohr__app__content,
  .bohr__sidebar.mobile-hidden + .bohr__app__content {
    transform: translateX(0);
  }   
}
</style>
