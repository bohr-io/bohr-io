<template>
  <BohrBox class="analytics__chart__container">
    <highcharts
      :options="chartOptions"
    ></highcharts>
  </BohrBox>
</template>

<script lang="ts">
import Highcharts from 'highcharts';
import { Chart } from 'highcharts-vue';
import highchartAccessibility from 'highcharts/modules/accessibility';
import darkUnica from "highcharts/themes/dark-unica";
import BohrBox from '@/components/BohrBox.vue';
import { defineComponent, PropType } from 'vue';

darkUnica(Highcharts);
highchartAccessibility(Highcharts);

const invalidChartOptions = {
  title: {
    text: 'invalid chart options object'
  },
  series: [],
};

export default defineComponent({
  components: {
    BohrBox,
    highcharts: Chart
  },
  props: {
    data: {
      type: Array as PropType<Record<string, string | number>[]>,
      default: () => []
    },

    chartOptionsStr: {
      type: String,
      default: '',
    },
  },
  errorCaptured(error) {
    const err = error as Error;
    if (err.message.toLowerCase().includes('highcharts')) {
      return false;
    }
  },
  computed: {
    chartOptions() {
      try {
        const evaluatedFunc = eval(this.chartOptionsStr);
        return typeof evaluatedFunc === 'function'
          ? evaluatedFunc(this.data)
          : invalidChartOptions;  
      } catch {
        return invalidChartOptions;
      }
    },
  },
});
</script>

<style scoped>
.analytics__table__container {
  padding: 24px;
}
</style>