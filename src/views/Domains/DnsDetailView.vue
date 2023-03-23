<template>
  <div class="dns__page">
    <BackButton :to="backTo" class="back__button" />
    <header class="dns__header">
      <BohrPageTitle
        :pageName="`${$t('common.edit')} DNS`"
        :pagePath="$tc('common.domain', 2)"
        :shadowText="$tc('common.domain', 2)"
      />
      <BohrTypography tag="p" class="dns__subtitle">{{ $t('dnsDetail.subtitle') }}</BohrTypography>
    </header>
    <main>
      <BohrBox
        component="form"
        class="dns__form"
        name="namespace-form"
        @submit.prevent="submitForm"
      >
        <div class="form__content">
          <BohrSelect :label="$t('domainDetail.dns.type')" v-model="dnsData.type" class="dns__form__type" :disabled="true">
            <option value="" disabled>{{ $t('domainDetail.dns.typePlaceholder') }}</option>
            <option v-for="dnsType in dnsTypes" :key="dnsType" :value="dnsType">{{ dnsType }}</option>
          </BohrSelect>
          <BohrTextField :label="$t('domainDetail.dns.name')" id="name-field" v-model="dnsData.name" />
          <BohrTextField :label="$t('domainDetail.dns.content')" id="content-field" v-model="dnsData.content" />
          <BohrSelect
            :label="$t('domainDetail.dns.ttl')"
            id="ttl-field"
            v-model="dnsData.ttl"
            class="dns__form__ttl"
          >
            <option
            v-for="(label, value) in ttlOptions"
              :key="value"
              :value="value"
            >
              {{ label[$i18n.locale as 'pt-BR' | 'en-US'] }}
            </option>
          </BohrSelect>
          <BohrTextField
            v-if="dnsData.type === 'URI' || dnsData.type === 'SRV' || dnsData.type === 'MX'"
            :label="$t('domainDetail.dns.priority')"
            :placeholder="$t('domainDetail.dns.priorityPlaceholder')"
            id="dns-field"
            v-model="dnsData.priority"
            class="dns__form__priority"
          />
          <BohrSwitch v-if="dnsData.type !== 'TXT'" id="proxy" label="proxy" v-model="dnsData.proxied" />
        </div>
        <div class="form__actions">
          <BohrButton
            type="button"
            variant="ghost"
            isDanger
            class="delete__button"
            @click="openModal"
          >
            {{ $t('common.delete') }}
          </BohrButton>
          <BohrButton
            type="submit"
            class="submit__button"
            :disabled="isSaving"
          >
            {{ $t('dnsDetail.saveLabel') }}
          </BohrButton>
        </div>
      </BohrBox>
      <ModalBase :isVisible="isModalOpen" @close="closeModal">
        <BohrTypography tag="h3" variant="title2" color="hsla(355, 78%, 60%, 1)">
          {{ $t('dnsDetail.delete.confirmText').replace('--DNSNAME--', dnsData.name) }}
        </BohrTypography>
        <div class="modal__actions">
          <BohrButton
            color="black"
            @click="closeModal"
          >
            {{ $t('common.cancel') }}
          </BohrButton>
          <BohrButton
            isDanger
            @click="handleDelete"
            :disabled="isDeleting"
          >
            {{ $t('common.delete') }}
          </BohrButton>
        </div>
      </ModalBase>
    </main>
  </div>
</template>

<script lang="ts">
import { dnsTypes, ttlOptions } from '@/assets/cloudFlareDns';
import BackButton from '@/components/BackButton.vue';
import BohrBox from '@/components/BohrBox.vue';
import BohrButton from '@/components/BohrButton.vue';
import BohrSelect from '@/components/BohrSelect.vue';
import BohrSwitch from '@/components/BohrSwitch.vue';
import BohrPageTitle from '@/components/BohrPageTitle.vue';
import BohrTextField from '@/components/BohrTextField.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import ModalBase from '@/components/ModalBase.vue';
import toastService from '@/services/ToastService';
import { defineComponent } from 'vue';
import { deleteDns, getDns, updateDns } from '@/services/api';
import isSavingComputed from '@/utils/isSavingComputed';

export default defineComponent({
  components: {
    BackButton,
    BohrBox,
    BohrButton,
    BohrSelect,
    BohrSwitch,
    BohrPageTitle,
    BohrTextField,
    BohrTypography,
    ModalBase,
},
  data() {
    return {
      domainName: this.$route.params.domain as string,
      dnsId: this.$route.params.dns as string,
      dnsData: {
        id: '',
        name: '',
        type: '',
        priority: 0,
        content: '',
        ttl: '1',
        proxied: false,
      },
      isModalOpen: false,
      backTo: {
        name: 'DomainDetail',
        params: this.$route.params,
      },
      isDeleting: false,
      dnsTypes,
      ttlOptions,
    };
  },
  computed: {
    ...isSavingComputed(),
  },
  created() {
    this.getDnsData();  
  },
  methods: {
    async getDnsData() {
      const { data, error } = await getDns(this.domainName, this.dnsId);

      if (error) {
        const errorMessage = error.code ? `errors.${error.code}` : 'dnsDetail.get.errorMessage';

        toastService.error(this.$t(errorMessage));
        return;
      }

      this.dnsData = data;
    },

    async submitForm() {
      if (this.isSaving) return;
      this.isSaving = true;

      const { error } = await updateDns(this.dnsData);

      this.isSaving = false;

      if (error) {
        const errorMessage = error.code ? `errors.${error.code}` : 'dnsDetail.save.errorMessage';

        toastService.error(this.$t(errorMessage));

        return;
      }

      this.$router.push(this.backTo);
      toastService.success(this.$t('dnsDetail.save.successMessage'));
    },

    openModal() {
      this.isModalOpen = true;
    },
    
    closeModal() {
      this.isModalOpen = false;
    },

    async handleDelete() {
      if (this.isDeleting) return;
      this.isDeleting = true;

      const { error } = await deleteDns(this.dnsData.id);

      this.isDeleting = false;

      if (error) {
        this.closeModal();

        const errorMessage = error.code ? `errors.${error.code}` : 'dnsDetail.delete.errorMessage';

        toastService.error(this.$t(errorMessage));
        return;
      }

      toastService.success(this.$t('dnsDetail.delete.successMessage'));
      this.$router.push(this.backTo)
    },
  },
});
</script>

<style scoped>
.dns__page {
  display: flex;
  flex-direction: column;
  max-width: 1152px;
  margin-inline: auto;
}

.dns__subtitle {
  margin-top: 24px;
  margin-bottom: 40px;
}

.form__content {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(4, 1fr) auto;
  padding-top: 36px;
  padding-inline: 36px;
}

.form__actions {
  display: flex;
  justify-content: space-between;
  background-color: hsla(0, 0%, 0%, 0.2);
  border-radius: 0px 0px 7px 7px;
  margin-top: 50px;
  padding-block: 24px;
  padding-inline: 36px;
}

.modal__actions {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  margin-top: 20px;
}
</style>