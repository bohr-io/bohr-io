<template>
  <SettingsCard>
    <template #content>
      <form id="env-form" class="form__env" @submit.prevent="saveVariables">
        <BohrTypography tag="h2" variant="title3" color="#55DDE0">
          {{ $t('settings.envVars.title') }}
          <BohrHelpLink topic="envVars" color="hsla(181, 69%, 61%, 1)" />
        </BohrTypography>
        <BohrTypography tag="p">{{ $t('settings.envVars.subtitle') }}</BohrTypography>

        <EnvVarsList
          :envVarsData="envVarsData"
          @removeVar="removeVariable"
          :varsWithError="varsWithError"
          :isPlaceholder="isLoading"
        />

        <div class="new__button__container">
          <BohrIconButton
            :label="$t('settings.envVars.label.newVar')"
            @click="addVariable"
          >
            <GreenPlusIcon />
          </BohrIconButton>
        </div>
        
        <div v-if="error" class="error__box">
          <BohrTypography tag="p" variant="subtitle2">
            {{ $t(`errors.${error.error}`) }} {{ varsWithError?.join(', ') }}
          </BohrTypography>
        </div>
        <BohrTypography tag="p">
          {{ $t('common.learnMoreAbout') }} <a class="settings__link" href="https://docs.bohr.io/docs/variaveis-de-ambiente" target="_blank">{{ $t('settings.envVars.title') }}</a>
        </BohrTypography>
      </form>
    </template>

    <template #actions>
      <BohrButton
        type="submit"
        form="env-form"
        :disabled="isSaving"
      >
        {{ $t('common.save') }}
      </BohrButton>
    </template>
  </SettingsCard>
</template>

<script lang="ts">
import BohrButton from '@/components/BohrButton.vue';
import BohrHelpLink from '@/components/BohrHelpLink.vue';
import BohrIconButton from '@/components/BohrIconButton.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import EnvVarsList from '@/components/EnvVarsList.vue';
import GreenPlusIcon from '@/components/icons/GreenPlusIcon.vue';
import SettingsCard from '@/components/SettingsCard.vue';
import { SiteEnvVarField } from '@/types/index';
import { defineComponent } from 'vue';
import { getProjectVarsSettings, updateProjectVarsSettings } from '@/services/api/projectSettings';
import isSavingComputed from '@/utils/isSavingComputed';

const blankEnvVars = () => ({ key: '', value: '' });

export default defineComponent({
  emits: ['successUpdate', 'failUpdate'],
  components: {
    BohrButton,
    BohrIconButton,
    BohrTypography,
    SettingsCard,
    EnvVarsList,
    GreenPlusIcon,
    BohrHelpLink
  },
  data() {
    return {
      envVarsData: [blankEnvVars()] as SiteEnvVarField[],
      error: null as null | { error: string, value: SiteEnvVarField[] },
      isLoading: true,
    }
  },
  computed: {
    deployGroupId() {
      return this.$store.getters['site/contextId'];
    },

    ...isSavingComputed(),

    varsWithError() {
      return this.error?.value.map(({ key }) => key);
    },
  },
  watch: {
    deployGroupId() {
      this.initializeSettingsData();
    },
  },
  created() {
    this.initializeSettingsData();
  },
  methods: {
    async initializeSettingsData() {
      this.isLoading = true;
      const org = this.$route.params.org as string;
      const project = this.$route.params.project as string;

      const { data } = await getProjectVarsSettings(org, project, this.deployGroupId);

      if (data && Array.isArray(data) && data.length > 0) {
        this.envVarsData = this.sortVariablesByName(data);
      } else {
        this.envVarsData = [blankEnvVars()];
      }

      this.isLoading = false;
    },

    sortVariablesByName(variables: SiteEnvVarField[]) {
      return [...variables].sort((var1, var2) => {
        const key1 = var1.key.toLowerCase();
        const key2 = var2.key.toLowerCase();

        if (key1 < key2) return -1;
        if (key1 > key2) return 1;
        return 0;
      });
    },

    addVariable() {
      this.envVarsData.push(blankEnvVars());
    },

    removeVariable(index: number) {
      this.envVarsData.splice(index, 1);

      if (this.envVarsData.length === 0) {
        this.addVariable();
      }
    },

    async saveVariables() {
      if (this.isSaving) return;
      this.isSaving = true;
      this.error = null;

      const deployGroupId = this.deployGroupId;
      const vars = this.sortVariablesByName(this.envVarsData).filter(({ key, value }) => !!key || !!value);

      const { error } = await updateProjectVarsSettings({
        org: this.$route.params.org as string,
        project: this.$route.params.project as string,
        deployGroupId,
        vars,
      });

      this.isSaving = false;

      if (error) {
        if (error.value) this.error = error;
        else this.$emit('failUpdate');
        return;
      }

      this.$emit('successUpdate');
    },
  }
});
</script>

<style scoped>
.form__env {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
}

.new__vars__title {
  margin-bottom: 12px;
}

.new__button__container {
  margin-top: -28px;
  margin-left: auto;
}

.error__box {
  padding: 10px;
  border-radius: 4px;
  border: 2px solid hsl(355, 78%, 60%);
}

.settings__link {
  font-size: 16px;
  font-weight: 700;
  color: #F6AE2D;
}
</style>
