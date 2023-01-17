<template>
  <div class="site__context__container">
    <select name="site-context" class="site__context" @change="changeContext">
      <option v-if="hasAllDeploysContext" value="all">{{ $t("common.allDeploys")}}</option>
      <optgroup
        v-for="(groupOptions, groupName) in projectContexts"
        :key="groupName"
        :label="groupName"
      >
        <option
          v-for="option in groupOptions"
          :key="option.id"
          :value="option.id"
          :selected="selectedContext === option.id"
        >
          {{ option.name }}
        </option>
      </optgroup>
    </select>
    <ArrowIcon
      :sizePx="16"
      isGradient
      direction="bottom"
      class="site__context__arrow"
    >
      <template #gradient>
        <stop offset="100%" style="stop-color:#000;stop-opacity:1" />
      </template>
    </ArrowIcon>
  </div>
</template>

<script lang="ts">
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    ArrowIcon,
  },
  emits: ['change'],
  props: {
    hasAllDeploysContext: Boolean
  },
  data() {
    return {
      selectedContext: 'all'
    }
  },
  computed: {
    projectContexts(): Record<string, { name: string, id: string }[]> {
      const contextMap = {
        'BRANCH': 'Branch',
        'PR': 'Pull Request',
        'TAG': 'Tag'
      };

      const contextData = this.$store.getters['site/deployGroup']?.reduce((acc: any, cur: any) => {
        const optgroup = contextMap[cur.type as keyof typeof contextMap];
        
        if (!acc[optgroup]) acc[optgroup] = [];

        acc[optgroup] = [
          ...acc[optgroup],
          { name: cur.name, id: cur.id }
        ];

        return acc;
      }, {})

      return contextData;
    },

    defaultContext() { return this.$store.getters['site/mainBranch'] || ' ' },
  },
  watch: {
    projectContexts() {
      this.setDefaultSelected();
    },

    defaultContext() {
      this.setDefaultSelected();
    },

    selectedContext() {
      this.$emit('change', this.selectedContext);
    },
  },
  created() {
    this.setDefaultSelected()
  },
  methods: {
    changeContext(e: Event) {
      this.selectedContext = (e.target as HTMLSelectElement).value;
    },

    setDefaultSelected() {
      if (!this.projectContexts || this.hasAllDeploysContext) return;
      const defaultContext = this.projectContexts['Branch'].find(({ name }: any) => name === this.defaultContext);
      if (defaultContext && this.selectedContext === 'all') this.selectedContext = defaultContext.id;
    }
  }
});
</script>

<style scoped>
.site__context__container {
  position: relative;
}

.site__context {
  appearance: none;
  width: 100%;
  padding: 19px;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  background-image: linear-gradient(180deg, #F4CC3A 0%, #F6AE2D 100%);
  border-radius: 4px;
  border: none;
}

.site__context__arrow {
  pointer-events: none;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}
</style>
