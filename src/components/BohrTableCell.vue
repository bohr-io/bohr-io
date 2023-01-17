<template>
  <component
    :is="tag"
    class="table__cell"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    tag: {
      type: String as PropType<'th' | 'td'>,
      default: 'td',
    },
  },
});
</script>

<style scoped>
.table__cell {
  box-sizing: border-box;
  text-align: start;
}

.table__cell:last-child {
  text-align: end;
}

thead .table__cell {
  padding-bottom: 10px;
  padding-inline: 8px;
}

tbody .table__cell {
  padding-block: 16px;
  padding-inline: 8px;
}
</style>