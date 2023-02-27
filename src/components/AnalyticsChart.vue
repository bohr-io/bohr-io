<template>
  <BohrBox class="analytics__chart__container">
    <highcharts
      :options="chartOptions"
    ></highcharts>
  </BohrBox>
</template>

<script lang="ts">
import BohrBox from '@/components/BohrBox.vue';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  components: {
    BohrBox,
  },
  props: {
    data: {
      type: Array as PropType<Record<string, string | number>[]>,
      default: () => []
    }
  },
  computed: {
    chartOptions() {
      const series = this.data?.map(({ cnt, path, status }) => ({
        name: `${path} - (${status})`,
        data: [Number(cnt)]
      }));

      return {
        chart: {
                type: 'column'
            },
            title: {
                text: 'Fruit Consumption'
            },
            xAxis: {
                categories: ['path']
            },
            yAxis: {
                title: {
                    text: 'cnt'
                }
            },
            series,
      };
    }
  },
});
</script>

<style scoped>
.analytics__table__container {
  padding: 24px;
}
</style>