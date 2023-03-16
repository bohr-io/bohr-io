<template>
  <header class="page__header">
    <figure class="site__favicon">
      <img src="/favicon.ico" alt="" />
    </figure>
    <div class="header__text">
      <BohrPageTitle :pageName="pageName" />
      <div v-if="breadcrumbs" class="page__breadcrumb">
        <template v-for="breadcrumb in breadcrumbs" :key="breadcrumb">
          <BohrTypography variant="title3" color="#C3A32E" class="breadcrumb__item">{{ breadcrumb }}</BohrTypography>
        </template>
      </div>
    </div>
  </header>  
</template>

<script>
import BohrPageTitle from '@/components/BohrPageTitle.vue';
import BohrTypography from '@/components/BohrTypography.vue';

export default {
  components: {
    BohrPageTitle,
    BohrTypography,
  },
  props: {
    flavorText: String,

    pageName: {
      type: String,
      required: true,
    },

    breadcrumbs: {
      type: Object,
      validator(value) { return Array.isArray(value) && value.every((crumb) => typeof crumb === 'string') }
    },
  },
  computed: {
    flavorTextLines() { return this.flavorText.split('\n') },
  }
}
</script>

<style scoped>
.page__header {
  margin-bottom: 40px;
}
  
.site__favicon {
  display: inline-block;
  margin: 0;
  width: 52px;
  height: 52px;
  border-radius: 16px;
  overflow: hidden;
  background-color: #000000;
  padding: 10px;
}

.site__favicon > img {
  width: 100%;
}

.header__text {
  display: inline-block;
  margin-left: 16px;
}

.breadcrumb__item {
  display: inline-block;
}

.breadcrumb__item:where(:not(:first-of-type))::before {
  content: '/';
  display: inline-block;
  margin: 8px;
  color: #625217;
}

</style>