<template>
  <div class="user__menu" :class="{ open: isOpen, expanded: isExpanded }">
    <figure class="user__avatar">
      <img :src="userImg" alt="user avatar" />
    </figure>
    <div class="user__menu__actions">
      <div class="greetings__text__container">
        <span class="greetings__text">{{ $t('navBar.greetings') }}</span>
        <span class="user__username">{{ username }}</span>
        <span class="greetings__text">{{ ':-)' }}</span>
      </div>

      <!-- <UserOption
        @select="(value) => $store.dispatch('changeTheme', value)"
        :label="$t('common.theme')"
        :isExpanded="isExpanded"
        :options="themeOptions"
      /> -->

      <UserOption
        @select="changeLocale"
        :label="$t('common.language')"
        :isExpanded="isExpanded"
        :options="localeOptions"
      />
    
      <button class="logout__btn" @click="handleLogout">logout</button>
    </div>

    <button type="button" class="user__menu__btn" @click="isOpen = !isOpen" aria-label="toggle user menu">
        <img src="/assets/svg/main-bar/arrow.svg" alt="" />
    </button>
  </div>
</template>

<script lang="ts">
import removeCookies from '@/utils/removeCookies';
import { defineComponent } from 'vue';
import UserOption from './UserOption.vue';

export default defineComponent({
  components: { UserOption },
  props: ['isExpanded'],
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    userImg() { return this.$store.state.me?.avatarUrl || '/favicon.ico' },
    username() { return this.$store.state.me?.username },
    themeOptions() { return [
      {
        name: this.$t('navBar.theme.dark'),
        value: 'dark',
        icon: '/assets/svg/main-bar/theme/dark.svg',
        isDefault: this.$store.state.theme.selected === 'dark',
      },
      {
        name: this.$t('navBar.theme.light'),
        value: 'light',
        icon: '/assets/svg/main-bar/theme/light.svg',
        isDefault: this.$store.state.theme.selected === 'light',
      },
    ]},
    localeOptions() { return [
      {
        name: 'en-US',
        value: 'en-US',
        icon: '/assets/svg/main-bar/locale/en-us.svg',
        isDefault: this.$store.state.appLocale === 'en-US',
      },
      {
        name: 'pt-BR',
        value: 'pt-BR',
        icon: '/assets/svg/main-bar/locale/pt-br.svg',
        isDefault: this.$store.state.appLocale === 'pt-BR',
      },
    ]}
  },
  methods: {
    changeLocale(value: string) {
      this.$store.dispatch('changeLocale', value);
    },

    handleLogout() {
      removeCookies();
      window.location.href = '/';
    },
  }
});
</script>

<style scoped>
.user__menu {
  position: absolute;
  bottom: 0%;
  z-index: 1;
  background-image: linear-gradient(180deg, #20333E 0%, #0E171D 100%);
  width: 100%;
  height: 86px;
  transition: var(--transition);
}

.user__menu.open {
  height: calc(100vh - var(--logo-btn-height, 0px));
}

.user__menu.expanded {
  width: 192px;
}

.user__avatar {
  --mask-file-top:  url('/assets/svg/main-bar/mask-96-top.svg');
  --mask-file-bottom:  url('/assets/svg/main-bar/mask-96-bottom.svg');
  display: block;
  position: relative;
  margin: -5px 0 0;
  width: 96px;
  height: 96px;
  background-color: #20323E;
  -webkit-mask-image: var(--mask-file-top), var(--mask-file-bottom);
          mask-image: var(--mask-file-top), var(--mask-file-bottom);
  -webkit-mask-position: top center, bottom center;
          mask-position: top center, bottom center;
  -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
  transition: var(--transition);
}

.user__avatar::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  transition: var(--transition);
  background-color: #000;
  opacity: 0.75;
}

.user__menu.open .user__avatar::after {
  content: '';
  opacity: 0;
}

.user__avatar > img {
  width: 100%;
  height: 100%;
  transition: var(--transition);
}

.user__menu.expanded:not(.open) .user__avatar > img {
  object-position: 0px -50px;
}

.user__menu.expanded .user__avatar {
  --mask-file-top:  url('/assets/svg/main-bar/mask-192-top.svg');
  --mask-file-bottom:  url('/assets/svg/main-bar/mask-192-bottom.svg');
  width: 192px;
  height: 192px;
  margin: -6px 0 0;
}

.user__menu__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
  margin-top: 21px;
  padding-inline: 12px;
}

.greetings__text__container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user__username,
.greetings__text {
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
}

.user__username {
  font-weight: 700;
}

.user__menu.expanded .user__username {
  font-size: 16px;
  line-height: 18.4px;
}

.user__menu__btn {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 96px;
  height: 96px;
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
  transition: var(--transition);
}


.user__menu__btn img{
  filter: opacity(1) !important;
}

.user__menu__btn::after{
  content: url('/assets/svg/main-bar/mask-96-button.svg');
  position: absolute;
  left: 0;
  top: 5px;
  filter: opacity(0.01);
}

.user__menu__btn:hover::after{
  filter: opacity(1);
}

.user__menu.expanded .user__menu__btn {
  width: 192px;
}

.user__menu.expanded .user__menu__btn::after{
  top: 4px;
  content: url('/assets/svg/main-bar/mask-192-button.svg');
}

.user__menu.open .user__menu__btn > img {
  transform: rotateX(180deg);
}

.logout__btn {
  background: none;
  border: none;
  text-transform: uppercase;
  color: white;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  cursor: pointer;
}

.logout__btn:hover {
  color: #E84855;
}
</style>