<template>
  <div class="vars__container">
    <div class="vars__labels" :class="{ newrepo__variant: newRepoVariant }">
      <label id="varNameLabel">
        <BohrTypography variant="title4">{{ $t('common.name') }}</BohrTypography>
      </label>
      <label id="varValueLabel">
        <BohrTypography variant="title4">{{ $t('common.value') }}</BohrTypography>
      </label>
      <label id="varSecretLabel" class="secret__label">
        <BohrTypography variant="title4">{{ $t('common.secret') }}</BohrTypography>
      </label>
    </div>
    <fieldset v-for="(variable, i) in envVarsData" :key="i" class="variable__field" :class="{ newrepo__variant: newRepoVariant }">
      <SkeletonLoading :isShowing="isPlaceholder">
        <BohrTextField
          aria-labelledby="varNameLabel"
          placeholder="VAR_NAME"
          v-model="variable.key"
          :hasError="varsWithError.includes(variable.key)"
        />
      </SkeletonLoading>
      <SkeletonLoading :isShowing="isPlaceholder">
        <BohrTextField
          :type="variable.isSecret ? 'password' : 'text'"
          hiddenToggleDisabled
          aria-labelledby="varValueLabel"
          v-model="variable.value"
          :ref="varsWithError.includes(variable.key) ? 'errorFocus' : undefined"
        />
      </SkeletonLoading>
      <SkeletonLoading :isShowing="isPlaceholder">
        <BohrCheckBox
          aria-labelledby="varSecretLabel"
          v-model="variable.isSecret"
        />
      </SkeletonLoading>
      <BohrIconButton
        :label="$t('common.remove')"
        @click="removeVariable(i)"
      >
        <SkeletonLoading :isShowing="isPlaceholder" borderRadius="circle">
          <RedXIcon />
        </SkeletonLoading>
      </BohrIconButton>
    </fieldset>
  </div>
</template>

<script lang="ts">
import BohrCheckBox from '@/components/BohrCheckBox.vue';
import BohrIconButton from '@/components/BohrIconButton.vue';
import BohrTextField from '@/components/BohrTextField.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import RedXIcon from '@/components/icons/RedXIcon.vue';
import SkeletonLoading from '@/components/SkeletonLoading.vue';
import { SiteEnvVarField } from '@/types';
import { defineComponent, nextTick, PropType,  } from 'vue';

export default defineComponent({
  components: {
    BohrCheckBox,
    BohrIconButton,
    BohrTextField,
    BohrTypography,
    RedXIcon,
    SkeletonLoading,
  },
  props: {
    envVarsData: {
      type: Object as PropType<SiteEnvVarField[]>,
      required: true,
    },
    varsWithError: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    newRepoVariant: Boolean,
    isPlaceholder: Boolean,
  },
  mounted() {
    if (this.varsWithError.length > 0) {
      this.focusFirstWithError();
    }
  },
  emits: ['removeVar'],
  watch: {
    varsWithError() {
      nextTick(() => {
        this.focusFirstWithError();
      });
    }
  },
  methods: {
    removeVariable(i: number) {
      this.$emit('removeVar', i);
    },

    focusFirstWithError() {
      (this.$refs.errorFocus as (InstanceType<typeof BohrTextField>)[])[0].focus();
    },
  },
});
</script>

<style scoped>
.vars__container {
  width: 100%;
}

.vars__labels,
.variable__field {
  display: grid;
  grid-template-columns: repeat(2, 1fr) repeat(2, 28px);
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  align-items: center;
  gap: 24px;
  width: 100%;
  margin: 0;
}

@media screen and (min-width: 993px){
  .vars__labels.newrepo__variant,
  .variable__field.newrepo__variant {
    grid-template-columns: calc(50% - 14px) 1fr repeat(2, 28px);
  }
}

.secret__label {
  justify-self: center;
}

.vars__labels {
  justify-items: flex-start;
  margin-bottom: 8px;
}

.variable__field {
  padding: 0;
  border: none;
  margin-bottom: 16px;
}

.variable__field:not(:last-child) .new__var__button {
  display: none;
}
</style>