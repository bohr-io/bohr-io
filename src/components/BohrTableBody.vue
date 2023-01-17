<template>
  <tbody class="table__body">
    <slot></slot>
  </tbody>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

});
</script>

<style scoped>
.table__body::before {
  content: '';
  display: table-row;
  height: 8px;
}  
</style>