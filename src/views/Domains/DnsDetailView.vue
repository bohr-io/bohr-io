<template>
  <div class="dns__page">
    <BackButton :to="backTo" class="back__button" />
    <header class="dns__header">
      <BohrPageTitle
        :pageName="`${$t('common.edit')} DNS`"
        :pagePath="$t('common.domain', 2)"
        :shadowText="$t('common.domain', 2)"
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
            <BohrSelect :label="$t('domainDetail.dns.type')" v-model="dnsData.type" class="dns__form__type" :required="true" :disabled="true" :style="{ cursor: disableTTLField ? 'not-allowed' : 'pointer' }">
              <option value="" disabled>{{ $t('domainDetail.dns.typePlaceholder') }}</option>
              <option v-for="dnsType in dnsTypes" :key="dnsType" :value="dnsType">{{ dnsType }}</option>
            </BohrSelect>
            <BohrTextField
              :label="$t('domainDetail.dns.name')"
              :placeholder="$t('domainDetail.dns.namePlaceholder')"
              id="name-field"
              v-model="dnsData.name"
              class="dns__form__name"
              :required="true"
            />
            <BohrTextArea
              v-if=exhibitTarget
              :label="$t('domainDetail.dns.target')"
              :placeholder="$t('domainDetail.dns.targetPlaceholder')"
              id="content-field"
              v-model="dnsData.content"
              style="resize:none; height: 40px;"
              cols="35"
              rows="5"
              :required="true"
            />
            <BohrTextField
              v-if="exhibitContent"
              :label="$t('domainDetail.dns.content')"
              :placeholder="$t('domainDetail.dns.contentPlaceholder')"
              id="content-field"
              v-model="dnsData.content"
              class="dns__form__content"
              :required="true"
            />
            <BohrTextArea
              v-if="exhibitNameServer"
              :label="$t('domainDetail.dns.nameServer')"
              id="content-field"
              v-model="dnsData.nameserver"
              style="resize:none; height: 40px;"
              cols="35"
              rows="5"
              :required="true"
            />
            <BohrTextField
              type="number"
              v-if="exhibitUsage"
              :label="$t('domainDetail.dns.usage')"
              :placeholder="$t('domainDetail.dns.algorithmPlaceholder')"
              id="content-field"
              v-model="dnsData.usage"
              class="dns__form__usage"
              :required="true"
            />
            <BohrTextField
              type="number"
              v-if="exhibitSelectorAndmaTchingType"
              :label="$t('domainDetail.dns.selector')"
              :placeholder="$t('domainDetail.dns.algorithmPlaceholder')"
              id="content-field"
              v-model="dnsData.selector"
              class="dns__form__selector"
              :required="true"
            />
            <BohrTextField
              type="number"
              v-if="exhibitSelectorAndmaTchingType"
              :label="$t('domainDetail.dns.matchingType')"
              :placeholder="$t('domainDetail.dns.algorithmPlaceholder')"
              id="content-field"
              v-model="dnsData.matching_type"
              class="dns__form__matchingType"
              :required="true"
            />
            <BohrSelect
              :label="$t('domainDetail.dns.ttl')"
              id="ttl-field"
              v-model="dnsData.ttl"
              class="dns__form__ttl"
              :disabled="disableTTLField"
              :style="{ cursor: disableTTLField ? 'not-allowed' : 'pointer' }"
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
              type="number"
              v-if="exhibitFlags"
              :label="$t('domainDetail.dns.flags')"
              :placeholder="$t('domainDetail.dns.flagsPlaceholder')"
              id="content-field"
              v-model="dnsData.flags"
              class="dns__form__flags"
              :required="true"
            />
            <BohrSelect
              v-if="exhibitProtocol"
              :label="$t('domainDetail.dns.protocol')"
              id="ttl-field"
              v-model="dnsData.protocol"
              class="dns__form__protocol"
              :required="true"
            >
              <option v-for="protocolSrv in protocolSRV" :key="protocolSrv" :value="protocolSrv">{{ protocolSrv }}</option>
            </BohrSelect>
            <BohrTextField
              type="number"
              v-if="exhibitOrder"
              :label="$t('domainDetail.dns.order')"
              :placeholder="$t('domainDetail.dns.orderPlaceholder')"
              id="content-field"
              v-model="dnsData.order"
              class="dns__form__order"
              :required="true"
            />
            <BohrTextField
              type="number"
              v-if="exhibitTypeNAPTR"
              :label="$t('domainDetail.dns.preference')"
              :placeholder="$t('domainDetail.dns.preferencePlaceholder')"
              id="content-field"
              v-model="dnsData.preference"
              class="dns__form__preference"
              :required="true"
            />
            <BohrTextField
              v-if="exhibitTypeNAPTR"
              :label="$t('domainDetail.dns.flags')"
              :placeholder="$t('domainDetail.dns.flagsStringPlaceholder')"
              id="content-field"
              v-model="dnsData.flags"
              class="dns__form__flags"
              :required="true"
            />
            <BohrTextField
              v-if="exhibitService"
              :label="$t('domainDetail.dns.service')"
              :placeholder="$t('domainDetail.dns.servicePlaceholder')"
              id="content-field"
              v-model="dnsData.service"
              class="dns__form__service"
              :required="true"
            />
            <BohrTextField
              v-if="exhibitTypeNAPTR"
              :label="$t('domainDetail.dns.regex')"
              :placeholder="$t('domainDetail.dns.regexPlaceholder')"
              id="content-field"
              v-model="dnsData.regex"
              class="dns__form__regex"
              :required="true"
            />
            <BohrTextField
              v-if="exhibitTypeNAPTR"
              :label="$t('domainDetail.dns.replacement')"
              id="content-field"
              v-model="dnsData.replacement"
              class="dns__form__replacement"
              :required="true"
            />
            <BohrTextField
              type="number"
              v-if="exhibitPriority"
              :label="$t('domainDetail.dns.priority')"
              :placeholder="$t('domainDetail.dns.priorityPlaceholder')"
              id="dns-field"
              v-model="dnsData.priority"
              class="dns__form__priority"
              :required="true"
            />
            <BohrTextField
              type="number"
              v-if="exhibitWeight"
              :label="$t('domainDetail.dns.weight')"
              :placeholder="$t('domainDetail.dns.preferencePlaceholder')"
              id="dns-field"
              v-model="dnsData.weight"
              class="dns__form__weight"
              :required="true"
            />
            <BohrTextField
              type="number"
              v-if="exhibitPort"
              :label="$t('domainDetail.dns.port')"
              :placeholder="$t('domainDetail.dns.preferencePlaceholder')"
              id="dns-field"
              v-model="dnsData.port"
              class="dns__form__port"
              :required="true"
            />
            <BohrTextField
              v-if="exhibitCertType"
              :label="$t('domainDetail.dns.certType')"
              :placeholder="$t('domainDetail.dns.certTypePlaceholder')"
              id="dns-field"
              v-model="dnsData.cert_type"
              class="dns__form__certType"
              :required="true"
            />
            <BohrTextField
              v-if="exhibitKeyTag"
              :label="$t('domainDetail.dns.keyTag')"
              :placeholder="$t('domainDetail.dns.keyTagPlaceholder')"
              id="dns-field"
              v-model="dnsData.key_tag"
              class="dns__form__keyTag"
              :required="true"
            />
            <BohrTextField
              v-if="exhibitMailServer"
              :label="$t('domainDetail.dns.mailServer')"
              id="dns-field"
              v-model="dnsData.content"
              class="dns__form__mailServer"
              :required="true"
            />
            <BohrSelect
              v-if="exhibitDigestType"
              :label="$t('domainDetail.dns.digestType')"
              id="ttl-field"
              v-model="dnsData.digestType"
              class="dns__form__digestType"
              :required="true"
            >
              <option v-for="digestType in digestTypeds" :key="digestType" :value="digestType">{{ digestType }}</option>
            </BohrSelect>
            <BohrTextField
              v-if="exhibitAlgorithm"
              :label="$t('domainDetail.dns.algorithm')"
              :placeholder="$t('domainDetail.dns.algorithmPlaceholder')"
              id="dns-field"
              v-model="dnsData.algorithm"
              class="dns__form__algorithm"
              :required="true"
            />
            <BohrTextField
              type="number"
              v-if="exhibitType"
              :label="$t('domainDetail.dns.type')"
              :placeholder="$t('domainDetail.dns.algorithmPlaceholder')"
              id="dns-field"
              v-model="dnsData.type"
              class="dns__form__type"
              :required="true"
            />
            <BohrTextArea
              v-if="exhibitType"
              :label="$t('domainDetail.dns.fingerprint')"
              :placeholder="$t('domainDetail.dns.fingerprintPlaceholder')"
              id="content-field"
              v-model="dnsData.fingerprint"
              style="resize:none;"
              cols="35"
              rows="5"
              :required="true"
            />
            <BohrTextArea
              v-if="exhibitCertificate"
              :label="$t('domainDetail.dns.certificate')"
              :placeholder="$t('domainDetail.dns.certificatePlaceholder')"
              id="content-field"
              v-model="dnsData.certificate"
              style="resize:none; height: 40px;"
              cols="35"
              rows="5"
              :required="true"
            />
            <BohrTextArea
              v-if="exhibitPublicKey"
              :label="$t('domainDetail.dns.publicKey')"
              :placeholder="$t('domainDetail.dns.publicKeyPlaceholder')"
              id="content-field"
              v-model="dnsData.public_key"
              style="resize:none; height: 40px; display: flex"
              cols="35"
              rows="5"
              :required="true"
            />
            <BohrTextArea
              v-if="exhibitDigest"
              :label="$t('domainDetail.dns.digest')"
              :placeholder="$t('domainDetail.dns.digestPlaceholder')"
              id="content-field"
              v-model="dnsData.digest"
              style="resize:none; height: 40px;"
              cols="35"
              rows="5"
              :required="true"
            />
            <BohrTextArea
              v-if="exhibitValue"
              :label="$t('domainDetail.dns.value')"
              :placeholder="$t('domainDetail.dns.valuePlaceholder')"
              id="content-field"
              v-model="dnsData.value"
              style="resize:none;"
              cols="35"
              rows="5"
              :required="true"
            />
            <BohrSwitch id="proxy" label="proxy" v-model="dnsData.proxied" v-if="!disableProxy" class="position" />
          </div>
          <div class="bohr__text_area_container">
            <BohrTextArea
              :label="$t('domainDetail.dns.content')"
              :placeholder="$t('domainDetail.dns.contentPlaceholder')"
              id="content-field"
              v-model="dnsData.content"
              v-if="dnsData.type === 'TXT'"
              style="resize:none;"
              cols="35"
              rows="5"
              :required="true"
            />
          </div>
          <div v-if="exhibitTypeLoc" class="bohr__div__loc">
            <h3 class="bohr__text__loc"> {{ $t('domainDetail.dns.setLatitude') }} </h3>
          </div>
          <div class="bohr__input_loc">
            <BohrTextField
              type="number"
              v-if="exhibitTypeLoc"
              :label="$t('domainDetail.dns.degress')"
              id="dns-field"
              v-model="dnsData.lat_degrees"
              class="dns__form__degress"
              :required="true"
            />
            <BohrTextField
              type="number"
              v-if="exhibitTypeLoc"
              :label="$t('domainDetail.dns.minutes')"
              id="dns-field"
              v-model="dnsData.lat_minutes"
              class="dns__form__minutes"
              :required="true"
            />
            <BohrTextField
              type="number"
              v-if="exhibitTypeLoc"
              :label="$t('domainDetail.dns.seconds')"
              id="dns-field"
              v-model="dnsData.lat_seconds"
              class="dns__form__seconds"
              :required="true"
            />
            <BohrSelect
              v-if="exhibitTypeLoc"
              :label="$t('domainDetail.dns.direction')"
              id="ttl-field"
              v-model="dnsData.lat_direction"
              class="dns__form__ttl"
              :disabled="disableTTLField"
              :required="true"
            >
              <option v-for="direction_Lat in directionLat" :key="direction_Lat" :value="direction_Lat">{{ direction_Lat }}</option>  
            </BohrSelect>
        </div>
        <div v-if="exhibitTypeLoc" class="bohr__div__loc">
          <h3 class="bohr__text__loc"> {{ $t('domainDetail.dns.setLongitude') }} </h3>
        </div>
        <div class="bohr__input_loc">
          <BohrTextField
            type="number"
            v-if="exhibitTypeLoc"
            :label="$t('domainDetail.dns.degress')"
            id="dns-field"
            v-model="dnsData.long_degrees"
            class="dns__form__degressLog"
            :required="true"
          />
          <BohrTextField
            type="number"
            v-if="exhibitTypeLoc"
            :label="$t('domainDetail.dns.minutes')"
            id="dns-field"
            v-model="dnsData.long_minutes"
            class="dns__form__minutesLog"
            :required="true"
          />
          <BohrTextField
            type="number"
            v-if="exhibitTypeLoc"
            :label="$t('domainDetail.dns.seconds')"
            id="dns-field"
            v-model="dnsData.long_seconds"
            class="dns__form__secondsLog"
            :required="true"
          />
          <BohrSelect
            v-if="exhibitTypeLoc"
            :label="$t('domainDetail.dns.direction')"
            id="ttl-field"
            v-model="dnsData.long_direction"
            class="dns__form__ttl"
            :required="true"
            :disabled="disableTTLField"
            :style="{ cursor: disableTTLField ? 'not-allowed' : 'pointer' }"
          >
            <option v-for="direction_Long in directionLong" :key="direction_Long" :value="direction_Long">{{ direction_Long }}</option>  
          </BohrSelect>
        </div>
        <div v-if="exhibitTypeLoc" class="bohr__div__loc">
          <h3 class="bohr__text__loc"> {{ $t('domainDetail.dns.precision') }} </h3>
        </div>
        <div class="bohr__input_loc">
          <BohrTextField
          type="number"
          v-if="exhibitTypeLoc"
          :label="$t('domainDetail.dns.horizontal')"
          id="dns-field"
          v-model="dnsData.precision_horz"
          class="dns__form__horizontal"
          :required="true"
          />
          <BohrTextField
          type="number"
          v-if="exhibitTypeLoc"
          :label="$t('domainDetail.dns.vertical')"
          id="dns-field"
            v-model="dnsData.precision_vert"
            class="dns__form__vertical"
            :required="true"
          />
          <BohrTextField
            type="number"
            v-if="exhibitTypeLoc"
            :label="$t('domainDetail.dns.altitude')"
            id="dns-field"
            v-model="dnsData.altitude"
            class="dns__form__altitude"
            :required="true"
            />
            <BohrTextField
            type="number"
            v-if="exhibitTypeLoc"
            :label="$t('domainDetail.dns.size')"
            id="dns-field"
            v-model="dnsData.size"
            class="dns__form__size"
            :required="true"
            />
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
import { dnsTypes, ttlOptions, protocolSRV, digestTypeds, directionLat, directionLong } from '@/assets/cloudFlareDns';
import BackButton from '@/components/BackButton.vue';
import BohrBox from '@/components/BohrBox.vue';
import BohrButton from '@/components/BohrButton.vue';
import BohrSelect from '@/components/BohrSelect.vue';
import BohrSwitch from '@/components/BohrSwitch.vue';
import BohrPageTitle from '@/components/BohrPageTitle.vue';
import BohrTextField from '@/components/BohrTextField.vue';
import BohrTextArea from '@/components/BohrTextArea.vue';
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
    BohrTextArea,
    BohrTypography,
    ModalBase,
},
  data() {
    return {
      domainName: this.$route.params.domain as string,
      dnsId: this.$route.params.dns as string,
      dnsData: {
        id: '',
        type: '',
        name: '',
        priority: '',
        content: '',
        ttl: '1',
        proxied: false,
        protocol: '',
        digestType: '',
        cert_type: '',
        key_tag: '',
        algorithm: '',
        certificate: '',
        target: '',
        flags: '',
        public_key: '',
        digest: '',
        value: '',
        order: '',
        preference: '',
        service: '',
        regex: '',
        replacement: '',
        nameserver: '',
        usage: '',
        selector: '',
        matching_type: '',
        weight: '',
        port: '',
        fingerprint_type: '',
        fingerprint: '',
        lat_degrees: '',
        lat_minutes: '',
        lat_seconds: '',
        lat_direction: '',
        long_degrees: '',
        long_minutes: '',
        long_seconds: '',
        long_direction: '',
        precision_horz: '',
        precision_vert: '',
        altitude: '',
        size: '',
      },
      protocolSRV,
      digestTypeds,
      directionLat, 
      directionLong,
      isModalOpen: false,
      backTo: {
        name: 'DomainDetail',
        params: this.$route.params,
      },
      isDeleting: false,
      dnsTypes,
      ttlOptions,
      isDisabled: true,
    };
  },
  computed: {
    disableTTLField() {
      return this.dnsData.proxied && (this.dnsData.type === 'A' || this.dnsData.type === 'AAAA' || this.dnsData.type === 'CNAME');
    },
    disableProxy() {
      return this.dnsData.type === 'DNSKEY' || this.dnsData.type === 'TXT' || this.dnsData.type === 'DS' || this.dnsData.type === 'HTTPS' || this.dnsData.type === 'MX' || this.dnsData.type === 'NAPTR' || this.dnsData.type === 'NS' || this.dnsData.type === 'SMIMEA' || this.dnsData.type === 'SRV' || this.dnsData.type === 'SSHFP' || this.dnsData.type === 'SVCB' || this.dnsData.type === 'TLSA' || this.dnsData.type === 'URI' || this.dnsData.type === 'LOC';
    },

    exhibitContent() {
      return this.dnsData.type === 'A' || this.dnsData.type === 'AAAA' || this.dnsData.type !== 'CNAME' && this.dnsData.type !== 'DNSKEY' && this.dnsData.type !== 'DS' && this.dnsData.type !== 'HTTPS' && this.dnsData.type !== 'MX' && this.dnsData.type !== 'NAPTR' && this.dnsData.type !== 'NS' && this.dnsData.type !== 'SMIMEA' &&  this.dnsData.type !== 'SRV' && this.dnsData.type !== 'SSHFP' && this.dnsData.type !== 'SVCB' && this.dnsData.type !== 'TLSA' && this.dnsData.type !== 'TXT' &&  this.dnsData.type !== 'URI' && this.dnsData.type !== 'LOC';
    },

    exhibitTarget() {
      return this.dnsData.type === 'CNAME' || this.dnsData.type === 'HTTPS' || this.dnsData.type === 'SRV' || this.dnsData.type === 'SVCB'  || this.dnsData.type === 'URI'
    },

    exhibitNameServer() {
      return this.dnsData.type === 'NS'
    },

    exhibitUsage() {
      return this.dnsData.type === 'SMIMEA' || this.dnsData.type === 'TLSA'
    },

    exhibitSelectorAndmaTchingType() {
      return this.dnsData.type === 'SMIMEA' || this.dnsData.type === 'TLSA'
    },

    exhibitFlags() {
      return this.dnsData.type === 'DNSKEY'
    },

    exhibitProtocol() {
      return this.dnsData.type === 'DNSKEY' || this.dnsData.type === 'SRV'
    },

    exhibitOrder() {
      return this.dnsData.type === 'NAPTR'
    },
    
    exhibitTypeNAPTR() {
      return this.dnsData.type === 'NAPTR'
    },

    exhibitService() {
      return this.dnsData.type === 'NAPTR' || this.dnsData.type === 'SRV' 
    },

    exhibitPriority() {
      return this.dnsData.type === 'URI' || this.dnsData.type === 'SRV' || this.dnsData.type === 'MX' || this.dnsData.type === 'HTTPS' || this.dnsData.type === 'SVCB'
    },
    
    exhibitWeight() {
      return this.dnsData.type === 'SRV' || this.dnsData.type === 'URI'
    },

    exhibitPort() {
      return this.dnsData.type === 'SRV'
    },

    exhibitCertType() {
      return this.dnsData.type === 'CERT'
    },

    exhibitKeyTag() {
      return this.dnsData.type === 'CERT' || this.dnsData.type === 'DS'
    },

    exhibitMailServer() {
      return this.dnsData.type === 'MX'
    },

    exhibitDigestType() {
      return this.dnsData.type === 'DS'
    },

    exhibitAlgorithm() {
      return this.dnsData.type === 'CERT' || this.dnsData.type === 'DNSKEY' || this.dnsData.type === 'DS' || this.dnsData.type === 'SSHFP'
    },

    exhibitType() {
      return this.dnsData.type === 'SSHFP'
    },

    exhibitCertificate() {
      return this.dnsData.type === 'CERT' || this.dnsData.type === 'SMIMEA' || this.dnsData.type === 'TLSA'
    },

    exhibitPublicKey() {
      return this.dnsData.type === 'DNSKEY'
    },

    exhibitDigest() {
      return this.dnsData.type === 'DS'
    },

    exhibitValue() {
      return this.dnsData.type === 'HTTPS' || this.dnsData.type === 'SVCB'
    },

    exhibitTypeLoc() {
      return this.dnsData.type === 'LOC'
    },
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

.bohr__text_area_container {
  position: relative;
  display: grid;
  font-size: 12px;
  padding-top: 36px;
  padding-inline: 36px;
}
.position {
  order: 5
}

.dns__button {
  text-align: right;
}

.proxy__switch {
  padding: 0px 0px 0px 10px;
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

@media screen and (max-width: 850px) {
  .form__content{
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (max-width: 567px) {
  .form__content{
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (max-width: 550px) {
  .form__content{
    grid-template-columns: repeat(1, 1fr);
  }
}

@media screen and (max-width: 850px){
  .position{
    order: 1;
  }
}

@media screen and (max-width: 850px) {
  .bohr__input_loc{
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (max-width: 550px) {
  .bohr__input_loc{
    grid-template-columns: repeat(1, 1fr);
  }
}

</style>