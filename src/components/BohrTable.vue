<template>
  <table class="table">
    <slot></slot>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

});
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}  
</style>