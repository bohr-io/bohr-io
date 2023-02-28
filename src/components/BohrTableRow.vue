<template>
  <tr
    class="table__row"
    :class="{ link__row: isLink }"
    @click="isLink && $router.push(to)"
  >
    <slot></slot>
  </tr>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    isLink: Boolean,
    to: {
      type: [String, Object],
      default: '',
    },
  },
});
</script>

<style scoped>
.table__row:not(tbody .table__row:last-child) {
  border-bottom: 2px solid hsl(0, 0%, 100%, 0.1);
}

.link__row {
  position: relative;
  color: inherit;
  cursor: pointer;
}

.link__row:hover {
  cursor: pointer;
}

.link__row:hover > :first-child:before {
  content: '';
  position: absolute;
  display: block;
  inset: 1px 0 -1px;
  background-image: linear-gradient(90deg, hsla(0, 0%, 100%, 0.02) 0%, hsla(0, 0%, 100%, 0) 100%);
  pointer-events: none;
}
</style>