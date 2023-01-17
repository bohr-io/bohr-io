<template>
  <div class="domain__page">
    <BackButton :to="{ name: 'Domains' }" class="back__button" />
    <header class="domain__header">
      <BohrPageTitle :pageName="$t('newDomain.title')" :pagePath="$t('newDomain.path')" />
      <BohrTypography tag="p" class="domain__subtitle">{{ $t('newDomain.subtitle') }}</BohrTypography>
    </header>
    <main>
      <BohrBox
        component="form"
        class="domain__form"
        name="namespace-form"
        @submit.prevent="submitForm"
      >
        <div class="form__content">
          <div class="fields__container">
            <BohrSelect :label="$t('newDomain.owner.label')" id="owner-field" v-model="selectedOwner">
              <option value="" disabled>{{ $t('newDomain.owner.placeholder') }}</option>
              <template v-for="owner in owners" :key="owner">
                <option :value="owner">
                  {{ owner }}
                </option>
              </template>
            </BohrSelect>
            <BohrTextField
              id="domain-field"
              :label="$t('common.domain')"
              v-model="domainField"
              :placeholder="$t('newDomain.domainPlaceholder')"
              autoFocus
            />
          </div>
        </div>
        <div class="form__actions">
          <BohrButton
            type="submit"
            class="submit__button"
            :disabled="isSaving"
          >
            {{ $t('newDomain.addLabel') }}
          </BohrButton>
        </div>
      </BohrBox>
      <ModalBase :isVisible="isModalOpen" withCloseBtn @close="error = ''">
        {{ error }}
      </ModalBase>
    </main>
  </div>
</template>

<script lang="ts">
import BackButton from '@/components/BackButton.vue';
import BohrBox from '@/components/BohrBox.vue';
import BohrButton from '@/components/BohrButton.vue';
import BohrPageTitle from '@/components/BohrPageTitle.vue';
import BohrSelect from '@/components/BohrSelect.vue';
import BohrTextField from '@/components/BohrTextField.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import ModalBase from '@/components/ModalBase.vue';
import { createDomain } from '@/services/api';
import toastService from '@/services/ToastService';
import isSavingComputed from '@/utils/isSavingComputed';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    BackButton,
    BohrBox,
    BohrButton,
    BohrPageTitle,
    BohrSelect,
    BohrTextField,
    BohrTypography,
    ModalBase
},
  data() {
    return {
      selectedOwner: '',
      domainField: '',
      error: '',
      selectedFilter: localStorage.getItem('sitesFilter') || 'all',
    };
  },
  computed: {
    defaultUser() { return this.$store.state.me?.username },
    owners() { return this.$store.state.me?.orgs },
    isModalOpen() { return Boolean(this.error) },
    ...isSavingComputed(),
  },
  beforeMount() {
    const { defaultUser, owners } = this;

    this.selectedOwner =
      this.selectedFilter !== 'all' && this.selectedFilter
        ? this.selectedFilter
        : defaultUser && owners?.includes(defaultUser)
        ? defaultUser
        : '';
  },

  methods: {
    handleCopy(value: string) {
      navigator.clipboard.writeText(value);
    },
    
    async submitForm() {
      if (this.isSaving) return;
      this.isSaving = true;

      const { error } = await createDomain(this.selectedOwner, this.domainField);
      this.isSaving = false;

      
      if (error) {
        if (['1', '2'].includes(error.error)) {
          this.error = this.$t(`newDomain.modalError.${error.error}`);
          return;
        }

        toastService.error(this.$t('newDomain.create.errorMessage'));
        return;
      }

      toastService.success(this.$t('newDomain.create.successMessage'));
      this.$router.push({ name: 'DomainDetail', params: { domain: this.domainField } });
    },
  },
});
</script>

<style scoped>
.domain__page {
  display: flex;
  flex-direction: column;
  max-width: 1056px;
  margin-inline: auto;
}

.domain__subtitle {
  margin-top: 24px;
  margin-bottom: 104px;
}

.form__content {
  padding-block: 36px 50px;
  padding-inline: 36px;
}

.fields__container {
  display: grid;
  gap: 24px;
  grid-auto-flow: column;
}

.form__actions {
  display: grid;
  place-items: center;
  background-color: hsla(0, 0%, 0%, 0.2);
  border-radius: 0px 0px 7px 7px;
  padding-block: 24px;
  padding-inline: 36px;

  border-top-width: 1px;
  border-top-style: solid;
  border-image-source: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
  border-image-slice: 1;
}
</style>
