<template>
  <span style="display: flex; max-width:32px; height: auto;">
    <template v-if="iconName === 'All'">
      <BohrIcon :active="active"/>
    </template>
    <template v-if="iconName === 'Basics'">
      <BasicsIcon :active="active"/>
    </template>
    <template v-if="iconName === 'Authentication'">
      <AuthenticationIcon :active="active"/>
    </template>
    <template v-if="iconName === 'APIs'">
      <ApiIcon :active="active"/>
    </template>
    <template v-if="iconName === 'Back-end'">
      <BackendIcon :active="active"/>
    </template>
    <template v-if="iconName === 'CMS'">
      <CmsIcon :active="active"/>
    </template>
    <template v-if="iconName === 'Crypto, NFT & Metaverse'">
      <CryptoIcon :active="active"/>
    </template>
    <template v-if="iconName === 'Databases'">
      <DatabaseIcon :active="active"/>
    </template>
    <template v-if="iconName === 'Front-end'">
      <FrontendIcon :active="active"/>
    </template>
    <template v-if="iconName === 'Games'">
      <GamesIcon :active="active"/>
    </template>
    <template v-if="iconName === 'Payment'">
      <PaymentIcon :active="active"/>
    </template>
    <template v-if="iconName === 'Social'">
      <SocialIcon :active="active"/>
    </template>
    <template v-if="iconName === 'Startups Ideas'">
      <StartupsIcon :active="active"/>
    </template>
  </span>
</template>
<script>
import BohrIcon from "./filters/BohrIcon.vue"
import BasicsIcon from "./filters/BasicsIcon.vue"
import AuthenticationIcon from "./filters/AuthenticationIcon.vue"
import ApiIcon from "./filters/ApiIcon.vue"
import BackendIcon from "./filters/BackendIcon.vue"
import CmsIcon from "./filters/CmsIcon.vue"
import CryptoIcon from "./filters/CryptoIcon.vue"
import DatabaseIcon from "./filters/DatabaseIcon.vue"
import FrontendIcon from "./filters/FrontendIcon.vue"
import GamesIcon from "./filters/GamesIcon.vue"
import PaymentIcon from "./filters/PaymentIcon.vue"
import SocialIcon from "./filters/SocialIcon.vue"
import StartupsIcon from "./filters/StartupsIcon.vue"

export default {
  components:{
    BohrIcon,
    BasicsIcon,
    AuthenticationIcon,
    ApiIcon,
    BackendIcon,
    CmsIcon,
    CryptoIcon,
    DatabaseIcon,
    FrontendIcon,
    GamesIcon,
    PaymentIcon,
    SocialIcon,
    StartupsIcon,
  },
  props: {
    iconName: {
      type: String,
      default: null
    },
    active:{
      type: Boolean,
      default: false
    }
  }
}
</script>