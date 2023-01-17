<template>
  <section>
    <BohrBox :variant="isDanger ? 'outline-danger' : 'outline'" class="settings__card">
      <div class="settings__card__content">
        <slot name="content"></slot>
      </div>
      <div v-if="$slots.actions" class="settings__card__actions">
        <slot name="actions"></slot>
      </div>
    </BohrBox>
  </section>
</template>

<script>
import BohrBox from '@/components/BohrBox';

export default {
  name: 'SettingsCard',
  components: {
    BohrBox,
  },
  props: {
    isDanger: Boolean,
  }
}
</script>

<style scoped>
  .settings__card__content {
    padding: 36px;
  }
  
  .settings__card__actions {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 13px;
    padding: 24px 36px;
    background-color: hsla(0, 100%, 0%, 0.2);
    border-bottom-right-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
    
    border-top-width: 1px;
    border-top-style: solid;
    border-image-source: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
    border-image-slice: 1;
  }
</style>