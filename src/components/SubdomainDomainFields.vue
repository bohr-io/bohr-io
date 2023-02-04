<template>
  <div class="domain__fields">
    <BohrTextField
      :label="$t('common.subdomain')"
      id="subdomain-field"
      v-model="subdomainValue"
      :validationStatus="subdomainValidationStatus"
      :isLoading="isLoading"
    />
    <span class="domain__dot">.</span>
    <div style="font-size:0">
      <label class="label">
        {{ $t('common.domain') }}
      </label>
      <BohrCustomSelect 
        :options="domainOptions"
        v-model="domainValue"
        :isLoading="isLoading"
      >
        <template #addon>
          <a href="/domains/new" target="_blank" class="combo__addon">
            <PlusRegularIcon /> {{ $t('createRepository.addDomain') }}
          </a>
        </template>
      </BohrCustomSelect>
    </div>
    <div v-if="error" class="error__box">
      <BohrTypography tag="p" variant="subtitle2">
        {{ $t(`errors.${error}`) }}
      </BohrTypography>
    </div>
  </div>
</template>

<script lang="ts">
import BohrCustomSelect from "@/components/BohrCustomSelect.vue";
import BohrTextField from "@/components/BohrTextField.vue";
import BohrTypography from "@/components/BohrTypography.vue";
import PlusRegularIcon from '@/components/icons/PlusRegularIcon.vue';
import { getRandomSubDomainSlug, validateSubdomain } from '@/services/api';
import toastService from '@/services/ToastService';
import { Domain, ValidationStatus } from '@/types';
import { defineComponent, nextTick, PropType } from 'vue';

export default defineComponent({
  components: {
    BohrCustomSelect,
    BohrTypography,
    BohrTextField,
    PlusRegularIcon,
  },
  props: {
    hasStartingRandomSubdomain: Boolean,
    isLoading: Boolean,
    currentProjectUrl: String,

    domain: {
      type: String,
      required: true,
    },
    
    subdomain: {
      type: String,
      required: true,
    },

    availableDomains: {
      type: Object as PropType<Domain[]>,
      required: true,
    },
  },
  emits: ['update:domain', 'update:subdomain'],
  data() {
    return {
      subdomainValidationStatus: "" as ValidationStatus,
      subdomainValidationTimeout: 0,
      allowSubdomainValidation: false,
      error: '',
    };
  },
  computed: {
    domainValue: {
      get() { return this.domain },
      set(value: string) { this.$emit('update:domain', value) },
    },

    subdomainValue: {
      get() { return this.subdomain },
      set(value: string) { this.$emit('update:subdomain', value) },
    },

    domainOptions() {
      const activeDomains =  this.availableDomains
        .map((domain) => ({
          value: domain.name,
          disabled: domain.status !== 'ACTIVE',
        }));

      return [ { value: 'bohr.io' }, ...activeDomains ];
    },

    isCurrentProjectUrl() {
      const inputUrl = this.subdomain ? `${this.subdomain}.${this.domain}` : this.domain
      return inputUrl === this.currentProjectUrl;
    },
  },
  watch: {
    domain() {
      this.validateSubdomain();
    },

    subdomain() {
      this.validateSubdomain();
    },
  },
  mounted() {
    this.getSlug();
  },
  methods: {
    async getSlug() {
      if (!this.hasStartingRandomSubdomain) {
        this.allowSubdomainValidation = true;
        return;
      }

      const { data } = await getRandomSubDomainSlug();

      if (data) {
        this.subdomainValue = data.subdomain;
      }

      nextTick(() => this.allowSubdomainValidation = true);
    },

    async validateSubdomain() {
      if (!this.allowSubdomainValidation || this.isCurrentProjectUrl) {
        this.subdomainValidationStatus = '';
        return;
      }

      this.subdomainValidationStatus = 'warn';

      clearTimeout(this.subdomainValidationTimeout);
      this.subdomainValidationTimeout = setTimeout(async () => {
        const { data, error } = await validateSubdomain(this.domain, this.subdomain);

        if (error) {
          if (['1003'].includes(error.error)) {
          this.error = error.error;
          this.subdomainValidationStatus = 'error';
        } else {
          toastService.error(this.$t('createRepository.validateSubdomain.errorMessage'));
        }

          return;
        }

        this.error = '';
        this.subdomainValidationStatus = data.isAvailable ? 'success' : 'error';
      }, 500);
    },
  },
});
</script>

<style scoped>
.domain__fields {
  display: grid;
  grid-template-columns: 1fr 4px 1fr;
  gap: 10px;
}

.domain__dot {
  font-size: 12px;
  font-weight: 700;
  align-self: flex-end;
  margin-bottom: 8px;
}

.label {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.combo__addon {
  display: block;
  width: 100%;
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px 12px;
  background-color: transparent;
  cursor: pointer;
  text-align: center;
  color: hsl(0, 0%, 100%);
  font-size: 14px;
}

.combo__addon:focus,
.combo__addon:hover {
  background-image: linear-gradient(180deg, hsl(21, 89%, 52%) 0%, hsl(355, 78%, 60%) 100%);
}

.error__box {
  display: inline-block;
  padding: 10px;
  border-radius: 4px;
  border: 2px solid hsl(355, 78%, 60%);
}
</style>