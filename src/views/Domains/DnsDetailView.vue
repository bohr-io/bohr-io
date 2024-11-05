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
            <!-- TYPE A-->
            <div style="display: contents;" v-if="dnsData.type === 'A'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="dnsData.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.content')"
                :placeholder="$t('domainDetail.dns.contentPlaceholder')"
                id="name-field"
                v-model="dnsData.content"
                class="dns__form__content"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="dnsData.ttl"
                class="dns__form__ttl"
                :disabled="disableTTLField"
              >
                <option
                  v-for="(label, value) in ttlOptions"
                  :key="value"
                  :value="value"
                  >
                  {{ label[$i18n.locale as 'pt-BR' | 'en-US'] }}
                </option>
              </BohrSelect>
              <BohrSwitch id="proxy" label="proxy" v-model="dnsData.proxied" v-if="!disableProxy" class="position" />
            </div>
            <!-- TYPE A -->
            <!-- TYPE AAAA-->
            <div style="display: contents;" v-if="dnsData.type === 'AAAA'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="dnsData.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.content')"
                :placeholder="$t('domainDetail.dns.contentPlaceholder')"
                id="name-field"
                v-model="dnsData.content"
                class="dns__form__content"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="dnsData.ttl"
                class="dns__form__ttl"
                :disabled="disableTTLField"
              >
                <option
                  v-for="(label, value) in ttlOptions"
                  :key="value"
                  :value="value"
                  >
                  {{ label[$i18n.locale as 'pt-BR' | 'en-US'] }}
                </option>
              </BohrSelect>
              <BohrSwitch id="proxy" label="proxy" v-model="dnsData.proxied" v-if="!disableProxy" class="position" />
            </div>
            <!-- TYPE AAAA -->
            <!-- TYPE CERT-->
            <div style="display: contents;" v-if="dnsData.type === 'CERT'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="dnsData.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="dnsData.ttl"
                class="dns__form__ttl"
                :disabled="disableTTLField"
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
                :label="$t('domainDetail.dns.algorithm')"
                :placeholder="$t('domainDetail.dns.algorithmPlaceholder')"
                id="name-field"
                v-model="dnsData.data.algorithm"
                class="dns__form__algorithm"
                :required="true"
              />
              <BohrTextArea
                :label="$t('domainDetail.dns.certificate')"
                :placeholder="$t('domainDetail.dns.certificatePlaceholder')"
                id="name-field"
                v-model="dnsData.data.certificate"
                class="dns__form__certificate"
                style="resize:none; height:40px; display: flex"
                cols="35"
                rows="5"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.keyTag')"
                :placeholder="$t('domainDetail.dns.keyTagPlaceholder')"
                id="name-field"
                v-model="dnsData.data.key_tag"
                class="dns__form__key_tag"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.type')"
                :placeholder="$t('domainDetail.dns.typePlaceholder')"
                id="name-field"
                v-model="dnsData.data.type"
                class="dns__form__type"
                :required="true"
              />
            </div>
            <!-- TYPE CERT -->
            <!-- TYPE CNAME-->
            <div style="display: contents;" v-if="dnsData.type === 'CNAME'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="dnsData.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.content')"
                :placeholder="$t('domainDetail.dns.contentPlaceholder')"
                id="name-field"
                v-model="dnsData.content"
                class="dns__form__content"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="dnsData.ttl"
                class="dns__form__ttl"
                :disabled="disableTTLField"
              >
                <option
                  v-for="(label, value) in ttlOptions"
                  :key="value"
                  :value="value"
                  >
                  {{ label[$i18n.locale as 'pt-BR' | 'en-US'] }}
                </option>
              </BohrSelect>
            </div>
            <!-- TYPE CNAME -->
            <!-- TYPE DNSKEY-->
            <div style="display: contents;" v-if="dnsData.type === 'DNSKEY'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="dnsData.name"
                class="dns__form__name"
                :required="true"
              />
            <BohrTextField
                :label="$t('domainDetail.dns.algorithm')"
                :placeholder="$t('domainDetail.dns.algorithmPlaceholder')"
                id="name-field"
                v-model="dnsData.data.algorithm"
                class="dns__form__algorithm"
                :required="true"
              />
            <BohrTextField
                :label="$t('domainDetail.dns.flags')"
                :placeholder="$t('domainDetail.dns.flagsPlaceholder')"
                id="name-field"
                v-model="dnsData.data.flags"
                class="dns__form__flags"
                :required="true"
              />
            <BohrTextField
              type="number"
              :label="$t('domainDetail.dns.protocol')"
              id="name-field"
              v-model="dnsData.data.protocol"
              class="dns__form__protocol"
              :required="true"
              />
            <BohrTextField
                :label="$t('domainDetail.dns.publicKey')"
                :placeholder="$t('domainDetail.dns.publicKeyPlaceholder')"
                id="name-field"
                v-model="dnsData.data.public_key"
                class="dns__form__public_key"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="dnsData.ttl"
                class="dns__form__ttl"
                :disabled="disableTTLField"
              >
                <option
                  v-for="(label, value) in ttlOptions"
                  :key="value"
                  :value="value"
                  >
                  {{ label[$i18n.locale as 'pt-BR' | 'en-US'] }}
                </option>
              </BohrSelect>
            </div>
            <!-- TYPE DNSKEY -->
            <!-- TYPE DS-->
            <div style="display: contents;" v-if="dnsData.type === 'DS'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="dnsData.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.algorithm')"
                :placeholder="$t('domainDetail.dns.algorithmPlaceholder')"
                id="name-field"
                v-model="dnsData.data.algorithm"
                class="dns__form__algorithm"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.digest')"
                :placeholder="$t('domainDetail.dns.digestPlaceholder')"
                id="name-field"
                v-model="dnsData.data.digest"
                class="dns__form__digest"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.digestType')"
                id="name-field"
                v-model="dnsData.data.digest_type"
                class="dns__form__digest_type"
                :required="true"
              >
                <option v-for="digest_Typeds in digestTypeds" :key="digest_Typeds.value" :value="digest_Typeds.value">{{ digest_Typeds.label }}</option>  
              </BohrSelect>
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.keyTag')"
                :placeholder="$t('domainDetail.dns.keyTagPlaceholder')"
                id="name-field"
                v-model="dnsData.data.key_tag"
                class="dns__form__key_tag"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="dnsData.ttl"
                class="dns__form__ttl"
                :disabled="disableTTLField"
              >
                <option
                  v-for="(label, value) in ttlOptions"
                  :key="value"
                  :value="value"
                  >
                  {{ label[$i18n.locale as 'pt-BR' | 'en-US'] }}
                </option>
              </BohrSelect>
            </div>  
            <!-- TYPE DS -->
            <!-- TYPE  HTTPS-->
            <div style="display: contents;" v-if="dnsData.type === 'HTTPS'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="dnsData.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.priority')"
                :placeholder="$t('domainDetail.dns.priorityPlaceholder')"
                id="name-field"
                v-model="dnsData.data.priority"
                class="dns__form__priority"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.target')"
                :placeholder="$t('domainDetail.dns.targetPlaceholder')"
                id="name-field"
                v-model="dnsData.data.target"
                class="dns__form__target"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.value')"
                :placeholder="$t('domainDetail.dns.valuePlaceholder')"
                id="name-field"
                v-model="dnsData.data.value"
                class="dns__form__value"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="dnsData.ttl"
                class="dns__form__ttl"
                :disabled="disableTTLField"
              >
                <option
                  v-for="(label, value) in ttlOptions"
                  :key="value"
                  :value="value"
                  >
                  {{ label[$i18n.locale as 'pt-BR' | 'en-US'] }}
                </option>
              </BohrSelect>
            </div>
            <!-- TYPE  HTTPS -->
            <!-- TYPE  LOC -->
            <div style="display: contents;" v-if="dnsData.type === 'LOC'">
              <BohrTextField
              :label="$t('domainDetail.dns.name')"
              :placeholder="$t('domainDetail.dns.namePlaceholder')"
              id="name-field"
              v-model="dnsData.name"
              class="dns__form__name"
              :required="true"
              />
              <BohrSelect
              :label="$t('domainDetail.dns.ttl')"
              id="ttl-field"
              v-model="dnsData.ttl"
              class="dns__form__ttl"
                :disabled="disableTTLField"
                >
                <option
                v-for="(label, value) in ttlOptions"
                :key="value"
                :value="value"
                  >
                  {{ label[$i18n.locale as 'pt-BR' | 'en-US'] }}
                </option>
              </BohrSelect>
            </div>
            <!-- TYPE  LOC -->
            <!-- TYPE  MX-->
            <div style="display: contents;" v-if="dnsData.type === 'MX'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="dnsData.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.content')"
                :placeholder="$t('domainDetail.dns.contentPlaceholder')"
                id="name-field"
                v-model="dnsData.content"
                class="dns__form__content"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.priority')"
                :placeholder="$t('domainDetail.dns.priorityPlaceholder')"
                id="name-field"
                v-model="dnsData.priority"
                class="dns__form__priority"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="dnsData.ttl"
                class="dns__form__ttl"
                :disabled="disableTTLField"
              >
                <option
                  v-for="(label, value) in ttlOptions"
                  :key="value"
                  :value="value"
                  >
                  {{ label[$i18n.locale as 'pt-BR' | 'en-US'] }}
                </option>
              </BohrSelect>
            </div>  
            <!-- TYPE  MX-->
            <!-- TYPE  NAPTR-->
            <div style="display: contents;" v-if="dnsData.type === 'NAPTR'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="dnsData.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.flags')"
                :placeholder="$t('domainDetail.dns.flagsPlaceholder')"
                id="name-field"
                v-model="dnsData.data.flags"
                class="dns__form__flags"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.order')"
                :placeholder="$t('domainDetail.dns.orderPlaceholder')"
                id="name-field"
                v-model="dnsData.data.order"
                class="dns__form__order"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.preference')"
                :placeholder="$t('domainDetail.dns.preferencePlaceholder')"
                id="name-field"
                v-model="dnsData.data.preference"
                class="dns__form__preference"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.regex')"
                :placeholder="$t('domainDetail.dns.regexPlaceholder')"
                id="name-field"
                v-model="dnsData.data.regex"
                class="dns__form__regex"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.replacement')"
                :placeholder="$t('domainDetail.dns.replacementPlaceholder')"
                id="name-field"
                v-model="dnsData.data.replacement"
                class="dns__form__replacement"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.service')"
                :placeholder="$t('domainDetail.dns.servicePlaceholder')"
                id="name-field"
                v-model="dnsData.data.service"
                class="dns__form__service"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="dnsData.ttl"
                class="dns__form__ttl"
                :disabled="disableTTLField"
              >
                <option
                  v-for="(label, value) in ttlOptions"
                  :key="value"
                  :value="value"
                  >
                  {{ label[$i18n.locale as 'pt-BR' | 'en-US'] }}
                </option>
              </BohrSelect>
            </div>
            <!-- TYPE  NAPTR-->
            <!-- TYPE  NS-->
            <div style="display: contents;" v-if="dnsData.type === 'NS'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="dnsData.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.content')"
                :placeholder="$t('domainDetail.dns.contentPlaceholder')"
                id="name-field"
                v-model="dnsData.content"
                class="dns__form__content"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="dnsData.ttl"
                class="dns__form__ttl"
                :disabled="disableTTLField"
              >
                <option
                  v-for="(label, value) in ttlOptions"
                  :key="value"
                  :value="value"
                  >
                  {{ label[$i18n.locale as 'pt-BR' | 'en-US'] }}
                </option>
              </BohrSelect>
            </div>
            <!-- TYPE  SMIMEA-->
            <div style="display: contents;" v-if="dnsData.type === 'SMIMEA'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="dnsData.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrTextArea
                :label="$t('domainDetail.dns.certificate')"
                :placeholder="$t('domainDetail.dns.certificatePlaceholder')"
                id="name-field"
                v-model="dnsData.data.certificate"
                class="dns__form__certificate"
                style="resize:none; height: 40px; display: flex"
                cols="35"
                rows="5"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.matchingType')"
                :placeholder="$t('domainDetail.dns.algorithmPlaceholder')"
                id="name-field"
                v-model="dnsData.data.matching_type"
                class="dns__form__matching_type"
                :required="true"
                />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.selector')"
                :placeholder="$t('domainDetail.dns.algorithmPlaceholder')"
                id="name-field"
                v-model="dnsData.data.selector"
                class="dns__form__selector"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.usage')"
                :placeholder="$t('domainDetail.dns.usagePlaceholder')"
                id="name-field"
                v-model="dnsData.data.usage"
                class="dns__form__usage"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="dnsData.ttl"
                class="dns__form__ttl"
                :disabled="disableTTLField"
              >
                <option
                  v-for="(label, value) in ttlOptions"
                  :key="value"
                  :value="value"
                  >
                  {{ label[$i18n.locale as 'pt-BR' | 'en-US'] }}
                </option>
              </BohrSelect>
            </div>
            <!-- TYPE  SRV-->
            <div style="display: contents;" v-if="dnsData.type === 'SRV'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="dnsData.data.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.port')"
                id="name-field"
                v-model="dnsData.data.port"
                class="dns__form__port"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.priority')"
                :placeholder="$t('domainDetail.dns.priorityPlaceholder')"
                id="name-field"
                v-model="dnsData.data.priority"
                class="dns__form__priority"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.protocol')"
                id="name-field"
                v-model="dnsData.data.proto"
                class="dns__form__proto"
                :required="true"
                >
                  <option v-for="protocol_SRV in protocolSRV" :key="protocol_SRV.value" :value="protocol_SRV.value">{{ protocol_SRV.label }}</option>  
              </BohrSelect>
              <BohrTextField
                :label="$t('domainDetail.dns.service')"
                :placeholder="$t('domainDetail.dns.servicePlaceholder')"
                id="name-field"
                v-model="dnsData.data.service"
                class="dns__form__service"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.target')"
                :placeholder="$t('domainDetail.dns.targetPlaceholder')"
                id="name-field"
                v-model="dnsData.data.target"
                class="dns__form__target"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.weight')"
                id="name-field"
                v-model="dnsData.data.weight"
                class="dns__form__weight"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="dnsData.ttl"
                class="dns__form__ttl"
                :disabled="disableTTLField"
              >
                <option
                  v-for="(label, value) in ttlOptions"
                  :key="value"
                  :value="value"
                  >
                  {{ label[$i18n.locale as 'pt-BR' | 'en-US'] }}
                </option>
              </BohrSelect>
            </div>
            <!-- TYPE  SRV-->
            <!-- TYPE  SSHFP-->
            <div style="display: contents;" v-if="dnsData.type === 'SSHFP'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="dnsData.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.algorithm')"
                :placeholder="$t('domainDetail.dns.algorithmPlaceholder')"
                id="name-field"
                v-model="dnsData.data.algorithm"
                class="dns__form__algorithm"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.type')"
                :placeholder="$t('domainDetail.dns.typePlaceholder')"
                id="name-field"
                v-model="dnsData.data.type"
                class="dns__form__type"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="dnsData.ttl"
                class="dns__form__ttl"
                :disabled="disableTTLField"
              >
                <option
                  v-for="(label, value) in ttlOptions"
                  :key="value"
                  :value="value"
                  >
                  {{ label[$i18n.locale as 'pt-BR' | 'en-US'] }}
                </option>
              </BohrSelect>
              <BohrTextArea
                :label="$t('domainDetail.dns.fingerprint')"
                :placeholder="$t('domainDetail.dns.fingerprintPlaceholder')"
                id="name-field"
                v-model="dnsData.data.fingerprint"
                class="dns__form__fingerprint"
                style="resize:none"
                cols="35"
                rows="5"
                :required="true"
              />
            </div>
            <!-- TYPE  SSHFP-->
            <!-- TYPE  SVCB-->
            <div style="display: contents;" v-if="dnsData.type === 'SVCB'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="dnsData.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.priority')"
                :placeholder="$t('domainDetail.dns.priorityPlaceholder')"
                id="name-field"
                v-model="dnsData.data.priority"
                class="dns__form__priority"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.target')"
                :placeholder="$t('domainDetail.dns.targetPlaceholder')"
                id="name-field"
                v-model="dnsData.data.target"
                class="dns__form__target"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.value')"
                :placeholder="$t('domainDetail.dns.valuePlaceholder')"
                id="name-field"
                v-model="dnsData.data.value"
                class="dns__form__value"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="dnsData.ttl"
                class="dns__form__ttl"
                :disabled="disableTTLField"
              >
                <option
                  v-for="(label, value) in ttlOptions"
                  :key="value"
                  :value="value"
                  >
                  {{ label[$i18n.locale as 'pt-BR' | 'en-US'] }}
                </option>
              </BohrSelect>
            </div>
            <!-- TYPE  SVCB-->
            <!-- TYPE  TLSA-->
            <div style="display: contents;" v-if="dnsData.type === 'TLSA'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="dnsData.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrTextArea
                :label="$t('domainDetail.dns.certificate')"
                :placeholder="$t('domainDetail.dns.certificatePlaceholder')"
                id="name-field"
                v-model="dnsData.data.certificate"
                class="dns__form__certificate"
                style="resize:none; height: 40px; display: flex"
                cols="35"
                rows="5"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.matchingType')"
                :placeholder="$t('domainDetail.dns.algorithmPlaceholder')"
                id="name-field"
                v-model="dnsData.data.matching_type"
                class="dns__form__matching_type"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.selector')"
                :placeholder="$t('domainDetail.dns.algorithmPlaceholder')"
                id="name-field"
                v-model="dnsData.data.selector"
                class="dns__form__selector"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.usage')"
                id="name-field"
                v-model="dnsData.data.usage"
                class="dns__form__usage"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="dnsData.ttl"
                class="dns__form__ttl"
                :disabled="disableTTLField"
              >
                <option
                  v-for="(label, value) in ttlOptions"
                  :key="value"
                  :value="value"
                  >
                  {{ label[$i18n.locale as 'pt-BR' | 'en-US'] }}
                </option>
              </BohrSelect>
            </div>
            <!-- TYPE  TLSA-->
            <!-- TYPE  TXT-->
            <div style="display: contents;" v-if="dnsData.type === 'TXT'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="dnsData.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrSelect
              :label="$t('domainDetail.dns.ttl')"
              id="ttl-field"
              v-model="dnsData.ttl"
              class="dns__form__ttl"
              :disabled="disableTTLField"
              >
              <option
              v-for="(label, value) in ttlOptions"
              :key="value"
              :value="value"
              >
                {{ label[$i18n.locale as 'pt-BR' | 'en-US'] }}
              </option>
            </BohrSelect>
            </div>
            <!-- TYPE  TXT-->
            <!-- TYPE URI-->
            <div style="display: contents;" v-if="dnsData.type === 'URI'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="dnsData.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.priority')"
                :placeholder="$t('domainDetail.dns.priorityPlaceholder')"
                id="name-field"
                v-model="dnsData.priority"
                class="dns__form__priority"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.content')"
                :placeholder="$t('domainDetail.dns.contentPlaceholder')"
                id="name-field"
                v-model="dnsData.data.content"
                class="dns__form__content"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.weight')"
                id="name-field"
                v-model="dnsData.data.weight"
                class="dns__form__weight"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="dnsData.ttl"
                class="dns__form__ttl"
                :disabled="disableTTLField"
              >
                <option
                  v-for="(label, value) in ttlOptions"
                  :key="value"
                  :value="value"
                  >
                  {{ label[$i18n.locale as 'pt-BR' | 'en-US'] }}
                </option>
              </BohrSelect>
            </div>
            <!-- TYPE URI -->
        </div>
        <div style="display: contents;" v-if="dnsData.type === 'LOC'">
              <div class="bohr__div__loc">
                <h3 class="bohr__text__loc"> {{ $t('domainDetail.dns.setLatitude') }} </h3>
              </div>
              <div class="bohr__input_loc">
                <BohrTextField
                  type="number"
                  :label="$t('domainDetail.dns.degress')"
                  id="name-field"
                  v-model="dnsData.data.lat_degrees"
                  class="dns__form__lat_degrees"
                  :required="true"
                />
                <BohrTextField
                  type="number"
                  :label="$t('domainDetail.dns.minutes')"
                  id="name-field"
                  v-model="dnsData.data.lat_minutes"
                  class="dns__form__lat_minutes"
                  :required="true"
                />
                <BohrTextField
                  type="number"  
                  :label="$t('domainDetail.dns.seconds')"
                  id="name-field"
                  v-model="dnsData.data.lat_seconds"
                  class="dns__form__lat_seconds"
                  :required="true"
                />
                <BohrSelect
                  :label="$t('domainDetail.dns.direction')"
                  id="ttl-field"
                  v-model="dnsData.data.lat_direction"
                  class="dns__form__ttl"
                  :required="true"
                >
                  <option v-for="direction_Lat in directionLat" :key="direction_Lat.value" :value="direction_Lat.value">{{ direction_Lat.label }}</option>  
                </BohrSelect>
              </div>
              <div class="bohr__div__loc">
                <h3 class="bohr__text__loc"> {{ $t('domainDetail.dns.setLongitude') }} </h3>
              </div>
              <div class="bohr__input_loc">
                <BohrTextField
                  type="number"
                  :label="$t('domainDetail.dns.degress')"
                  id="name-field"
                  v-model="dnsData.data.long_degrees"
                  class="dns__form__long_degrees"
                  :required="true"
                />
                <BohrTextField
                  type="number"
                  :label="$t('domainDetail.dns.minutes')"
                  id="name-field"
                  v-model="dnsData.data.long_minutes"
                  class="dns__form__long_minutes"
                  :required="true"
                />
                <BohrTextField
                  type="number"
                  :label="$t('domainDetail.dns.seconds')"
                  id="name-field"
                  v-model="dnsData.data.long_seconds"
                  class="dns__form__long_seconds"
                  :required="true"
                />
                <BohrSelect
                  :label="$t('domainDetail.dns.direction')"
                  id="ttl-field"
                  v-model="dnsData.data.long_direction"
                  class="dns__form__ttl"
                  :required="true"
                >
                  <option v-for="direction_Long in directionLong" :key="direction_Long.value" :value="direction_Long.value">{{ direction_Long.label }}</option>  
                </BohrSelect>
              </div>
              <div class="bohr__div__loc">
                <h3 class="bohr__text__loc"> {{ $t('domainDetail.dns.precision') }} </h3>
              </div>
              <div class="bohr__input_loc">
                <BohrTextField
                  type="number"
                  :label="$t('domainDetail.dns.horizontal')"
                  id="name-field"
                  v-model="dnsData.data.precision_horz"
                  class="dns__form__precision_horz"
                  :required="true"
                />
                <BohrTextField
                  type="number"
                  :label="$t('domainDetail.dns.vertical')"
                  id="name-field"
                  v-model="dnsData.data.precision_vert"
                  class="dns__form__precision_vert"
                  :required="true"
                />
                <BohrTextField
                  type="number"
                  :label="$t('domainDetail.dns.size')"
                  id="name-field"
                  v-model="dnsData.data.size"
                  class="dns__form__size"
                  :required="true"
                />
                <BohrTextField
                  type="number"
                  :label="$t('domainDetail.dns.altitude')"
                  id="name-field"
                  v-model="dnsData.data.altitude"
                  class="dns__form__altitude"
                  :required="true"
                />
              </div>
            </div>
            <div class="bohr__text_area_container" v-if="dnsData.type === 'TXT'">
              <BohrTextArea
                :label="$t('domainDetail.dns.content')"
                :placeholder="$t('domainDetail.dns.contentPlaceholder')"
                id="name-field"
                v-model="dnsData.content"
                class="dns__form__content"
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
        priority: 0,
        content: '',
        ttl: 1,
        proxied: false,
        data: {
          digest_type: '',
          protocol: '',
          content: '',
          proto: '',
          digestType: '',
          type: '',
          name: '',
          priority: 0,
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
          size: ''
        }
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

      this.dnsData.ttl = Number(this.dnsData.ttl);

      this.dnsData.priority = Number(this.dnsData.priority);
      if(this.dnsData.data?.priority)
        this.dnsData.data.priority = Number(this.dnsData.data.priority);

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
  watch: {
    'dnsData.data.priority': function(newPriority) {
      this.dnsData.priority = newPriority;
    }
  }
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