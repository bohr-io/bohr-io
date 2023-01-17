<template>
  <main class="help__page">
    <BohrPageTitle :pageName="$t('common.help')" />
    <PlaceholderPage />
  </main>
</template>

<script>
import BohrPageTitle from '@/components/BohrPageTitle.vue';
import PlaceholderPage from '@/components/PlaceholderPage.vue';

export default {
  components: {
    BohrPageTitle,
    PlaceholderPage,
  }
}
</script>

<style scoped>
.help__page {
  display: flex;
  flex-direction: column;
  gap: 104px;
  max-width: 1056px;
  margin-inline: auto;
}
</style>
