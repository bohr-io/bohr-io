<template>
  <div class="card__tag" >
    <span>{{ tag }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    tag: {
      type: String,
      required: true,
    }
  },
});
</script>

<style scoped>
.card__tag {
  display: inline-block;
  padding: 3px 6px;
  font-size: 8px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;

  background: linear-gradient(180deg, hsl(202, 32%, 18%) 0%, hsl(204, 35%, 8%) 100%);
  border: 1px solid hsl(0, 0%, 0%);
  border-radius: 2px;
  color: hsl(0, 0%, 100%);
}
</style>