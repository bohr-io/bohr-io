<template>
  <BohrBox class="analytics__table__container">
    <div>
      <BohrTable>
        <BohrTableHead>
          <BohrTableRow>
            <BohrTableCell v-for="column in tableColumns" :key="column">
              {{ column }}
            </BohrTableCell>
          </BohrTableRow>
        </BohrTableHead>
        <BohrTableBody>
          <BohrTableRow v-for="row, index in data" :key="index">
            <BohrTableCell v-for="column in row" :key="column">
              {{ column }}
            </BohrTableCell>
          </BohrTableRow>
        </BohrTableBody>
      </BohrTable>
    </div>
  </BohrBox>
</template>

<script lang="ts">
import BohrBox from '@/components/BohrBox.vue';
import BohrTable from '@/components/BohrTable.vue';
import BohrTableBody from '@/components/BohrTableBody.vue';
import BohrTableCell from '@/components/BohrTableCell.vue';
import BohrTableHead from '@/components/BohrTableHead.vue';
import BohrTableRow from '@/components/BohrTableRow.vue';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  components: {
    BohrBox,
    BohrTable,
    BohrTableHead,
    BohrTableRow,
    BohrTableCell,
    BohrTableBody
},
  props: {
    data: {
      type: Array as PropType<Record<string, string | number>[]>,
      default: () => []
    }
  },
  computed: {
    tableColumns() {
      if (this.data.length === 0) return [];

      const columnsNames = Object.keys(this.data[0]);
      return columnsNames;
    },
  },
});
</script>

<style scoped>
.analytics__table__container {
  padding: 24px;
  white-space: nowrap;
}

.analytics__table__container > div {
  overflow: auto clip;
}
</style>