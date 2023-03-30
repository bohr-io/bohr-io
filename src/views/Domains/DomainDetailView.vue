<template>
  <div class="domain__page">
    <BackButton :to="{ name: 'Domains' }" class="back__button" />
    <header class="domain__header">
      <BohrPageTitle
        :pageName="domainName"
        :pagePath="$tc('common.domain', 2)"
        :shadowText="$tc('common.domain', 2)"
        withoutTextTransform
      />
      <div class="code__links">
        <BohrIconButton
          component="a"
          :href="('https://' + domainName)"
          target="_blank"
          rel="noreferrer"
          :label="('https://' + domainName)"
          :backgroundColor="domainName ? '#F6AE2D' : '#999'"
          :withoutHoverEffect="true"
        >
          <NewWIndowIcon :sizePx="18" color="#111B22" />
        </BohrIconButton>
      </div>
      <BohrTypography tag="p" class="domain__subtitle">{{ $t('domainDetail.subtitle') }}</BohrTypography>
    </header>

    <main v-if="!isFetchingDomainData">
      <section v-if="hasNameserver">
        <BohrTypography tag="h2" variant="title2" color="hsl(181, 69%, 61%)" class="section__title">
          {{ $t('domainDetail.dns.title') }}
        </BohrTypography>
        <BohrBox
          component="form"
          class="dns__form"
          name="dns-form"
          @submit.prevent="submitNewDns"
        >
          <div class="form__content">
            <BohrSelect :label="$t('domainDetail.dns.type')" v-model="newDns.type" class="dns__form__type">
              <option value="" disabled>{{ $t('domainDetail.dns.typePlaceholder') }}</option>
              <option v-for="dnsType in dnsTypes" :key="dnsType" :value="dnsType">{{ dnsType }}</option>
            </BohrSelect>
            <BohrTextField
              :label="$t('domainDetail.dns.name')"
              :placeholder="$t('domainDetail.dns.namePlaceholder')"
              id="name-field"
              v-model="newDns.name"
              class="dns__form__name"
              />
              <BohrTextField
              :label="$t('domainDetail.dns.content')"
              :placeholder="$t('domainDetail.dns.contentPlaceholder')"
              id="content-field"
              v-model="newDns.content"
              v-if="newDns.type !== 'TXT'"
              class="dns__form__content"
              />
              <BohrSelect
              :label="$t('domainDetail.dns.ttl')"
              id="ttl-field"
              v-model="newDns.ttl"
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
            v-if="newDns.type === 'URI' || newDns.type === 'SRV' || newDns.type === 'MX'"
            :label="$t('domainDetail.dns.priority')"
            :placeholder="$t('domainDetail.dns.priorityPlaceholder')"
            id="dns-field"
            v-model="newDns.priority"
            class="dns__form__priority"
            />
            <BohrSwitch id="proxy" label="proxy" v-model="newDns.proxied" v-if="newDns.type !== 'TXT'" />
          </div>
          <div class="bohr__text_area_container">
            <BohrTextArea
              v-if="newDns.type === 'TXT'"
              style="resize:none;"
              :label="$t('domainDetail.dns.content')"
              :placeholder="$t('domainDetail.dns.contentPlaceholder')"
              id="content-field"
              cols="35"
              rows="5"
            />
        </div>
        <div class="form__actions">
          <BohrButton
            type="submit"
            class="add__dns__button"
            :disabled="isSaving"
            >
            <template #iconLeft>
              <PlusRegularIcon />
            </template>
            {{ $t('common.add') }}
          </BohrButton>
        </div>
        </BohrBox>
        <BohrTypography tag="h2" variant="title2" color="hsl(181, 69%, 61%)" class="section__subtitle">
          {{ $t('domainDetail.dns.subtitle') }}
        </BohrTypography>

        <BohrBox class="table__container">
          <BohrTable>
            <colgroup>
              <col span="1" style="width: 18.18%;">
              <col span="1" style="width: 23.23%;">
              <col span="1" style="width: 29.18%;">
              <col span="1" style="width: 22.41%;">
              <col span="1" style="width: 7%;">
            </colgroup>

            <BohrTableHead>
              <BohrTableRow>
                <BohrTableCell tag="th">
                  <BohrTypography variant="title4">
                    {{ $t('domainDetail.dns.type').toUpperCase() }}
                  </BohrTypography>
                </BohrTableCell>
                <BohrTableCell tag="th">
                  <BohrTypography variant="title4">
                    {{ $t('domainDetail.dns.name').toUpperCase() }}
                  </BohrTypography>
                </BohrTableCell>
                <BohrTableCell tag="th">
                  <BohrTypography variant="title4">
                    {{ $t('domainDetail.dns.content').toUpperCase() }}
                  </BohrTypography>
                </BohrTableCell>
                <BohrTableCell tag="th">
                  <BohrTypography variant="title4">
                    {{ $t('domainDetail.dns.ttl').toUpperCase() }}
                  </BohrTypography>
                </BohrTableCell>
                <BohrTableCell tag="th">
                  <BohrTypography variant="title4">
                    PROXY
                  </BohrTypography>
                </BohrTableCell>
                <BohrTableCell tag="th">
                </BohrTableCell>
              </BohrTableRow>
            </BohrTableHead>
            <BohrTableBody>
              <BohrTableRow v-if="dnsListData.length === 0">
                <td
                  colspan="100%"
                  class="nodata__message"
                >
                  <BohrTypography tag="p" variant="title2" textAlign="center" color="hsl(0, 0%, 40%)">
                    {{ $t('domainDetail.dns.noEntriesMessage') }}
                  </BohrTypography>
                </td>
              </BohrTableRow>
              <template v-for="dns in dnsListData" :key="dns.id">
                <BohrTableRow
                  :isLink="!isFetchingDnsData"
                  :to="{ name: 'DnsDetail', params: { domain: dns.domain, dns: dns.id } }"
                  class="dns__row"
                >
                  <BohrTableCell tag="th">
                    <BohrTypography variant="body1">
                      <SkeletonLoading :isShowing="isFetchingDnsData">
                        {{ dns.type }}
                      </SkeletonLoading>
                    </BohrTypography>
                  </BohrTableCell>
                  <BohrTableCell>
                    <BohrTypography variant="body1">
                      <SkeletonLoading :isShowing="isFetchingDnsData">
                        {{ dns.name }}
                      </SkeletonLoading>
                    </BohrTypography>
                  </BohrTableCell>
                  <BohrTableCell>
                    <BohrTypography variant="body1">
                      <SkeletonLoading :isShowing="isFetchingDnsData">
                        <div class="content__text" :title="dns.content">
                          {{ dns.content }}
                        </div>
                      </SkeletonLoading>
                    </BohrTypography>
                  </BohrTableCell>
                  <BohrTableCell>
                    <BohrTypography variant="body1">
                      <SkeletonLoading :isShowing="isFetchingDnsData">
                        {{ getTtlLabel(dns.ttl) }}
                      </SkeletonLoading>
                    </BohrTypography>
                  </BohrTableCell>
                  <BohrTableCell>
                    <SkeletonLoading :isShowing="isFetchingDnsData">
                      <BohrSwitch :id="'proxy' + dns.id" v-model="dns.proxied" readonly />
                    </SkeletonLoading>
                  </BohrTableCell>
                  <BohrTableCell>
                    <BohrButton v-show="!isFetchingDnsData" class="dns__edit_button">
                      {{ $t('common.edit') }}
                    </BohrButton>
                  </BohrTableCell>
                </BohrTableRow>
              </template>
            </BohrTableBody>
          </BohrTable>
        </BohrBox>
      </section>
  
      <section v-else>
        <BohrTypography tag="h2" variant="title2" color="hsl(181, 69%, 61%)" class="section__title">
          {{ $t('domainDetail.ns.title') }}
        </BohrTypography>
        <BohrTypography class="section__subtitle">
          {{ $t('domainDetail.ns.subtitle') }}
        </BohrTypography>
        <BohrBox class="nameservers__container">
          <ol class="nameserver__steps">
            <li class="nameserver__step">{{ $t('domainDetail.ns.steps.0') }}</li>
            <li class="nameserver__step">{{ $t('domainDetail.ns.steps.1') }}</li>
            <li class="nameserver__step">
              <span>{{ $t('domainDetail.ns.steps.2') }}</span>
              <ul class="nameservers__list">
                <li v-for="nameserver in nameServers" :key="nameserver" class="nameserver__item">
                  <BohrTextField
                    :value="nameserver"
                    readonly
                  />
                  <BohrButton
                    @click="handleCopy(nameserver)">
                    {{ $t('common.copy') }}
                  </BohrButton>
                </li>
              </ul>
            </li>
            <li class="nameserver__step">{{ $t('domainDetail.ns.steps.3') }}</li>
          </ol>
          <span class="registrars__warn">{{ $t('newDomain.registrarWarn') }}</span>
        </BohrBox>
      </section>

      <BohrBox component="section" variant="outline-danger" class="delete__section">
        <BohrTypography tag="h2" variant="title3" color="hsla(355, 78%, 60%, 1)">
          {{ $t('domainDetail.delete.title') }}
        </BohrTypography>
        <div class="delete__description">
          <BohrTypography>
            {{ $t('domainDetail.delete.desc[0]') }}
          </BohrTypography>
          <BohrTypography>
            {{ $t('domainDetail.delete.desc[1]') }}
          </BohrTypography>
          <BohrButton
            class="delete__button"
            isDanger
            @click="openModal"
          >
            {{ $t('common.delete') }}
          </BohrButton>
        </div>
        <ModalBase :isVisible="isModalOpen" @close="closeModal">
          <BohrTypography tag="h3" variant="title2" color="hsla(355, 78%, 60%, 1)">
            {{ $t('domainDetail.delete.confirmText').replace('--DOMAINNAME--', domainName) }}
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
      </BohrBox>
    </main>
  </div>
</template>

<script lang="ts">
import { dnsTypes, ttlOptions } from '@/assets/cloudFlareDns';
import BackButton from '@/components/BackButton.vue';
import BohrBox from '@/components/BohrBox.vue';
import BohrButton from '@/components/BohrButton.vue';
import BohrPageTitle from '@/components/BohrPageTitle.vue';
import BohrSelect from '@/components/BohrSelect.vue';
import BohrSwitch from '@/components/BohrSwitch.vue';
import BohrTable from '@/components/BohrTable.vue';
import BohrTableBody from '@/components/BohrTableBody.vue';
import BohrTableCell from '@/components/BohrTableCell.vue';
import BohrTableHead from '@/components/BohrTableHead.vue';
import BohrTableRow from '@/components/BohrTableRow.vue';
import BohrTextField from '@/components/BohrTextField.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import BohrTextArea from '@/components/BohrTextArea.vue';
import PlusRegularIcon from '@/components/icons/PlusRegularIcon.vue';
import ModalBase from '@/components/ModalBase.vue';
import SkeletonLoading from '@/components/SkeletonLoading.vue';
import { createDns, getDns, deleteDomain, getDomains } from '@/services/api';
import toastService from '@/services/ToastService';
import { Dns, Domain, Locale } from '@/types';
import isSavingComputed from '@/utils/isSavingComputed';
import { defineComponent } from 'vue';
import BohrIconButton from '@/components/BohrIconButton.vue';
import NewWIndowIcon from '@/components/icons/NewWIndowIcon.vue';

const fakeDns = {
  id: 'id',
  name: 'name',
  type: 'type',
  content: 'content',
  ttl: 0,
  priority: 0,
  proxied: true,
}

const initialNewDns = () => ({
  type: '',
  name: '',
  priority: '',
  content: '',
  ttl: '1',
  proxied: true,
});

export default defineComponent({
  components: {
    BackButton,
    BohrBox,
    BohrButton,
    BohrPageTitle,
    BohrSelect,
    BohrSwitch,
    BohrTable,
    BohrTableBody,
    BohrTableCell,
    BohrTableHead,
    BohrTableRow,
    BohrTextField,
    BohrTextArea,
    BohrTypography,
    PlusRegularIcon,
    ModalBase,
    SkeletonLoading,
    BohrIconButton,
    NewWIndowIcon,
},
  data() {
    return {
      isModalOpen: false,
      hasNameserver: false,
      newDns: initialNewDns(),
      domainData: null as null | Domain,
      dnsListData: [fakeDns, fakeDns, fakeDns] as Dns[],
      isFetchingDnsData: true,
      isFetchingDomainData: true,
      isDeleting: false,
      dnsTypes,
      ttlOptions,
    };
  },
  computed: {
    domainName() { return this.$route.params.domain as string },
    nameServers() {
      if (!this.domainData) return [' ', ' '];
      return this.domainData.nameServers;
    },
    selectedPreviewData() {
      return this.$store.getters['site/selectedPreviewData'];
    },

    previewUrl() {
      if (this.selectedPreviewData) {
        const url = this.selectedPreviewData.liveUrl || this.selectedPreviewData.url;
        return location.protocol + '//' + url;
      } else {
        return '';
      }
    },

    ...isSavingComputed(),
  },
  created() {
    this.getDomainData();
  },
  methods: {
    async getDomainData() {
      const { data, error } = await getDomains(this.domainName);
      this.isFetchingDomainData = false;

      if (error) {
        toastService.error(this.$t('domainDetail.domain.failedToGetData'));
        return;
      }

      this.domainData = data;

      if (data.status === 'ACTIVE') {
        this.hasNameserver = true;
        this.getDnsData();
      }
    },

    async getDnsData() {
      if (!this.domainData) return;
      const { data, error } = await getDns(this.domainData.name)

      this.isFetchingDnsData = false;

      if (error) {
        const errorMessage = error.code ? `errors.${error.code}` : 'domainDetail.dns.failedToGetData';

        toastService.error(this.$t(errorMessage));
        this.dnsListData = [];
      }

      this.dnsListData = data;
    },

    async submitNewDns() {
      if (this.isSaving || !this.domainData) return;
      this.isSaving = true;

      const { error } = await createDns(this.domainData.name, this.newDns);
      this.isSaving = false;

      if (error) {
        const errorMessage = error.code ? `errors.${error.code}` : 'domainDetail.dns.create.errorMessage';

        toastService.error(this.$t(errorMessage));
        return;
      }

      toastService.success(this.$t('domainDetail.dns.create.successMessage'));
      this.getDnsData();
      this.newDns = initialNewDns();
    },

    getTtlLabel(ttl: number) {
      const locale = this.$i18n.locale as Locale;

      if (ttl in ttlOptions) {
        return ttlOptions[String(ttl) as keyof typeof ttlOptions][locale];
      }

      return ttl + ' s';
    },

    openModal() {
      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
    },

    handleCopy(value: string) {
      navigator.clipboard.writeText(value);
    },

    async handleDelete() {
      if (this.isDeleting) return;
      this.isDeleting = true;
      const { error } = await deleteDomain(this.domainName);
      this.isDeleting = false;

      if (error) {
        this.isModalOpen = false;
        toastService.error(this.$t('domainDetail.delete.errorMessage'));
        return
      }

      this.$router.push({ name: 'Domains' });
      toastService.success(this.$t('domainDetail.delete.successMessage'));
    }
  },
});
</script>

<style scoped>
.domain__page {
  position: relative;
  max-width: 1152px;
  margin-inline: auto;
}

.form__content {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(4, 1fr) auto;
}

.form__actions {
  display: flex;
  justify-content: end;
}

.bohr__text_area_container {
  position: relative;
  display: grid;
  font-size: 12px;
}

.domain__header {
    display: inline-flex;
}

.code__links {
    display: flex;
    justify-content: end;
    position: absolute;
    right: 5px;
    top: 35px;
}

.code__links a {
  width: 32px;
  height: 32px;
}

.domain__subtitle {
  margin-top: 24px;
  margin-bottom: 104px;
}

.dns__form {
  display: grid;
  flex-wrap: wrap;
  gap: 8px;
  padding: 36px;
  margin-bottom: 55px;
}

.dns__form > :nth-child(1) {
  flex-grow: 1.05;
}

.dns__form > :nth-child(2) {
  flex-grow: 1.6;
}

.dns__form > :nth-child(3) {
  flex-grow: 3;
}

.dns__form > :nth-child(4) {
  flex-grow: 0.82;
}

.add__dns__button {
  margin-top: 21.8px;
  flex: unset; 
}

.section__title {
  margin-block: 8px 24px;
  margin-bottom: 8px;
}

.section__subtitle {
  margin-block: 8px 24px;
}

.table__container {
  width: 100%;
  padding: 24px 32px 8px;
  box-sizing: border-box;
}

.table__container :deep(.table__cell) {
  vertical-align: middle;
}

.table__container :deep(.bohr__switch) {
  margin: 0;
}

.nodata__message {
  height: 48px;
  text-align: center;
}

.dns__edit_button {
  margin-block: -16px;
  visibility: hidden;
}

.dns__row:hover .dns__edit_button {
  visibility: visible;
}

.modal__actions {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  margin-top: 20px;
}

.nameservers__container {
  padding: 64px;
}

.nameserver__steps {
  list-style: none;
  counter-reset: step;
  margin-block: 0;
  padding-left: 64px;
}

.nameserver__step {
  display: flex;
  align-items: center;
  column-gap: 24px;
  flex-wrap: wrap;
  counter-increment: step;
}

.nameserver__step + .nameserver__step {
  margin-top: 16px;
}

.nameserver__step::before {
  content: counter(step);
  font-weight: 700;
  font-size: 48px;
  text-transform: uppercase;
  color: #FFFFFF;
  opacity: 0.1;
}

.nameservers__list {
  list-style: none;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin: 8px;
}

.nameserver__item {
  display: flex;
  gap: 8px;
}

.registrars__warn {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  margin-top: 65px;
  padding: 16px;
  text-align: center;
  background: hsl(47, 61%, 12%);
  border: 1px solid hsl(47, 62%, 24%);
  border-radius: 4px;
}

.delete__section {
  margin-top: 81px;
  padding: 36px;
}

.delete__description {
  margin-top: 16px;
}

.delete__button {
  margin-top: 24px;
}

.content__text{
  min-width: 200px;
  max-width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media screen and (max-width: 767px) {
  .nameservers__container {
    padding: 32px 16px;
  }

  .nameserver__steps {
    padding-left: 0;
  }

  .nameservers__list {
    padding: 0;
  }
}

@media screen and (max-width: 767px) {
  .code__links {
    top: -10px;
  }
}

</style>
