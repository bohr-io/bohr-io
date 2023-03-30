<template>
  <h1 :class="[planClass]">{{ selectPlan }}</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PlanComponent',
  props: {
    selectPlan: {
      type: String,
      required: false,
    },
  },
  computed: {
    planClass() {
      switch (this.selectPlan) {
        case 'FREE':
          return 'plan plan-free'
        case 'PRO':
          return 'plan plan-pro';
        case 'PIONEER':
          return 'plan plan-pioneiro';
        case 'BUSINESS':
          return 'plan plan-business';
        default:
          return 'plan plan-free';
      }
    }
  }
});
</script>

<style scoped>

.plan {
  display: flex;
  font-size: 12px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 8px 8px 8px;
  margin: 18% 18% 18% 15%;
  position: absolute;
  bottom: 85px;
  width: 50%;
  border: 2px solid;
  border-image: linear-gradient(180deg, #55DDE0, #53DD6C);
  border-image-slice: 1;
  border-radius: 4px;
}

.plan.expanded {
  width: 50%;
}

.plan-free {
  color: #53DD6C;
  background: radial-gradient(47.72% 83.89% at 50% 100%, rgba(232, 73, 84, 0.25) 0%, rgba(14, 23, 29, 0.25) 100%), #0E171D;
  box-shadow: 0px 12px 36px rgba(83, 221, 108, 0.15);
  border: 2px solid;
  border-image: linear-gradient(180deg, #55DDE0, #53DD6C);
  border-image-slice: 1;
}

.plan-pro {
  color: #CC5AB3;
  background: radial-gradient(47.72% 83.89% at 50% 100%, rgba(232, 73, 84, 0.25) 0%, rgba(14, 23, 29, 0.25) 100%), #0E171D;
  box-shadow: 0px 12px 36px rgba(204, 90, 179, 0.15);
  border: 2px solid;
  border-image: linear-gradient(180deg, #55DDE0, #CC5AB3);
  border-image-slice: 1;
}

.plan-pioneiro {
  color: #F26419;
  background: radial-gradient(47.72% 83.89% at 50% 100%, rgba(232, 73, 84, 0.25) 0%, rgba(14, 23, 29, 0.25) 100%), #0E171D;
  box-shadow: 0px 12px 36px rgba(242, 100, 25, 0.15);
  border: 2px solid;
  border-image: linear-gradient(180deg, #55DDE0, #CC5AB3);
  border-image-slice: 1;
}

.plan-business {
  color: #E84855;
  background: radial-gradient(47.72% 83.89% at 50% 100%, rgba(232, 73, 84, 0.25) 0%, rgba(14, 23, 29, 0.25) 100%), #0E171D;
  box-shadow: 0px 12px 36px rgba(232, 72, 86, 0.15);
  border: 2px solid;
  border-image: linear-gradient(180deg, #E84855, #365C73);
  border-image-slice: 1;
}
</style>