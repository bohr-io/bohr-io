<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to"
    class="back__link"
  >
    <ArrowIcon :sizePx="9" direction="left" />
    <span class="back__link__text">
      {{ $t('common.back') }}
    </span>
  </component>
</template>

<script lang="ts">
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import { defineComponent, PropType } from 'vue';
import { RouterLink } from 'vue-router';

type ToProp = InstanceType<typeof RouterLink>["$props"]["to"]

export default defineComponent({
  components: {
    ArrowIcon
  },
  props: {
    to: {
      type: [String, Object] as PropType<ToProp>
    }
  },
})
</script>

<style scoped>
.back__link {
  display: flex;
  align-items: center;
  gap: 13.5px;
  width: max-content;
  position: relative;
  bottom: 36px;
  margin-bottom: -24px;
  padding-block: 6px;
  line-height: 12px;
  padding-inline: 10px 17px;
  background-color: hsla(0, 0%, 0%, 0.25);
  border: 0;
  border-radius: 999px;
  transition: background-color var(--transition);
}

.back__link:hover {
  background-color: hsla(0, 0%, 0%, 1);
}

.back__link__text {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 9px;
  color: hsla(0, 0%, 100%, 1);
}
</style>