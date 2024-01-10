<template>
  <div class="domain__page">
    <BackButton :to="{ name: 'Domains' }" class="back__button" />
    <header class="domain__header">
      <BohrPageTitle
        :pageName="domainName"
        :pagePath="$t('common.domain', 2)"
        :shadowText="$t('common.domain', 2)"
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
            <BohrSelect :label="$t('domainDetail.dns.type')" v-model="newDns.type" class="dns__form__type" :required="true">
              <option value="" disabled>{{ $t('domainDetail.dns.typePlaceholder') }}</option>
              <option v-for="dnsType in dnsTypes" :key="dnsType" :value="dnsType">{{ dnsType }}</option>
            </BohrSelect>
            <!-- TYPE A-->
            <div style="display: contents;" v-if="newDns.type === 'A'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="newDns.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.content')"
                :placeholder="$t('domainDetail.dns.contentPlaceholder')"
                id="name-field"
                v-model="newDns.content"
                class="dns__form__content"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="newDns.ttl"
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
              <BohrSwitch id="proxy" label="proxy" v-model="newDns.proxied" v-if="!disableProxy" class="position" />
            </div>
            <!-- TYPE A -->
            <!-- TYPE AAAA-->
            <div style="display: contents;" v-if="newDns.type === 'AAAA'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="newDns.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.content')"
                :placeholder="$t('domainDetail.dns.contentPlaceholder')"
                id="name-field"
                v-model="newDns.content"
                class="dns__form__content"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="newDns.ttl"
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
              <BohrSwitch id="proxy" label="proxy" v-model="newDns.proxied" v-if="!disableProxy" class="position" />
            </div>
            <!-- TYPE AAAA -->
            <!-- TYPE CERT-->
            <div style="display: contents;" v-if="newDns.type === 'CERT'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="newDns.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="newDns.ttl"
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
                v-model="newDns.data.algorithm"
                class="dns__form__algorithm"
                :required="true"
              />
              <BohrTextArea
                :label="$t('domainDetail.dns.certificate')"
                :placeholder="$t('domainDetail.dns.certificatePlaceholder')"
                id="name-field"
                v-model="newDns.data.certificate"
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
                v-model="newDns.data.key_tag"
                class="dns__form__key_tag"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.type')"
                :placeholder="$t('domainDetail.dns.typePlaceholder')"
                id="name-field"
                v-model="newDns.data.type"
                class="dns__form__type"
                :required="true"
              />
            </div>
            <!-- TYPE CERT -->
            <!-- TYPE CNAME-->
            <div style="display: contents;" v-if="newDns.type === 'CNAME'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="newDns.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.content')"
                :placeholder="$t('domainDetail.dns.contentPlaceholder')"
                id="name-field"
                v-model="newDns.content"
                class="dns__form__content"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="newDns.ttl"
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
            <div style="display: contents;" v-if="newDns.type === 'DNSKEY'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="newDns.name"
                class="dns__form__name"
                :required="true"
              />
            <BohrTextField
                :label="$t('domainDetail.dns.algorithm')"
                :placeholder="$t('domainDetail.dns.algorithmPlaceholder')"
                id="name-field"
                v-model="newDns.data.algorithm"
                class="dns__form__algorithm"
                :required="true"
              />
            <BohrTextField
                :label="$t('domainDetail.dns.flags')"
                :placeholder="$t('domainDetail.dns.flagsPlaceholder')"
                id="name-field"
                v-model="newDns.data.flags"
                class="dns__form__flags"
                :required="true"
              />
            <BohrTextField
              type="number"
              :label="$t('domainDetail.dns.protocol')"
              id="name-field"
              v-model="newDns.data.protocol"
              class="dns__form__protocol"
              :required="true"
              />
            <BohrTextField
                :label="$t('domainDetail.dns.publicKey')"
                :placeholder="$t('domainDetail.dns.publicKeyPlaceholder')"
                id="name-field"
                v-model="newDns.data.public_key"
                class="dns__form__public_key"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="newDns.ttl"
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
            <div style="display: contents;" v-if="newDns.type === 'DS'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="newDns.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.algorithm')"
                :placeholder="$t('domainDetail.dns.algorithmPlaceholder')"
                id="name-field"
                v-model="newDns.data.algorithm"
                class="dns__form__algorithm"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.digest')"
                :placeholder="$t('domainDetail.dns.digestPlaceholder')"
                id="name-field"
                v-model="newDns.data.digest"
                class="dns__form__digest"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.digestType')"
                id="name-field"
                v-model="newDns.data.digest_type"
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
                v-model="newDns.data.key_tag"
                class="dns__form__key_tag"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="newDns.ttl"
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
            <div style="display: contents;" v-if="newDns.type === 'HTTPS'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="newDns.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.priority')"
                :placeholder="$t('domainDetail.dns.priorityPlaceholder')"
                id="name-field"
                v-model="newDns.data.priority"
                class="dns__form__priority"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.target')"
                :placeholder="$t('domainDetail.dns.targetPlaceholder')"
                id="name-field"
                v-model="newDns.data.target"
                class="dns__form__target"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.value')"
                :placeholder="$t('domainDetail.dns.valuePlaceholder')"
                id="name-field"
                v-model="newDns.data.value"
                class="dns__form__value"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="newDns.ttl"
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
            <div style="display: contents;" v-if="newDns.type === 'LOC'">
              <BohrTextField
              :label="$t('domainDetail.dns.name')"
              :placeholder="$t('domainDetail.dns.namePlaceholder')"
              id="name-field"
              v-model="newDns.name"
              class="dns__form__name"
              :required="true"
              />
              <BohrSelect
              :label="$t('domainDetail.dns.ttl')"
              id="ttl-field"
              v-model="newDns.ttl"
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
            <div style="display: contents;" v-if="newDns.type === 'MX'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="newDns.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.content')"
                :placeholder="$t('domainDetail.dns.contentPlaceholder')"
                id="name-field"
                v-model="newDns.content"
                class="dns__form__content"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.priority')"
                :placeholder="$t('domainDetail.dns.priorityPlaceholder')"
                id="name-field"
                v-model="newDns.priority"
                class="dns__form__priority"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="newDns.ttl"
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
            <div style="display: contents;" v-if="newDns.type === 'NAPTR'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="newDns.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.flags')"
                :placeholder="$t('domainDetail.dns.flagsPlaceholder')"
                id="name-field"
                v-model="newDns.data.flags"
                class="dns__form__flags"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.order')"
                :placeholder="$t('domainDetail.dns.orderPlaceholder')"
                id="name-field"
                v-model="newDns.data.order"
                class="dns__form__order"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.preference')"
                :placeholder="$t('domainDetail.dns.preferencePlaceholder')"
                id="name-field"
                v-model="newDns.data.preference"
                class="dns__form__preference"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.regex')"
                :placeholder="$t('domainDetail.dns.regexPlaceholder')"
                id="name-field"
                v-model="newDns.data.regex"
                class="dns__form__regex"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.replacement')"
                :placeholder="$t('domainDetail.dns.replacementPlaceholder')"
                id="name-field"
                v-model="newDns.data.replacement"
                class="dns__form__replacement"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.service')"
                :placeholder="$t('domainDetail.dns.servicePlaceholder')"
                id="name-field"
                v-model="newDns.data.service"
                class="dns__form__service"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="newDns.ttl"
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
            <div style="display: contents;" v-if="newDns.type === 'NS'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="newDns.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.content')"
                :placeholder="$t('domainDetail.dns.contentPlaceholder')"
                id="name-field"
                v-model="newDns.content"
                class="dns__form__content"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="newDns.ttl"
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
            <div style="display: contents;" v-if="newDns.type === 'SMIMEA'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="newDns.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrTextArea
                :label="$t('domainDetail.dns.certificate')"
                :placeholder="$t('domainDetail.dns.certificatePlaceholder')"
                id="name-field"
                v-model="newDns.data.certificate"
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
                v-model="newDns.data.matching_type"
                class="dns__form__matching_type"
                :required="true"
                />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.selector')"
                :placeholder="$t('domainDetail.dns.algorithmPlaceholder')"
                id="name-field"
                v-model="newDns.data.selector"
                class="dns__form__selector"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.usage')"
                :placeholder="$t('domainDetail.dns.usagePlaceholder')"
                id="name-field"
                v-model="newDns.data.usage"
                class="dns__form__usage"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="newDns.ttl"
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
            <div style="display: contents;" v-if="newDns.type === 'SRV'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="newDns.data.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.port')"
                id="name-field"
                v-model="newDns.data.port"
                class="dns__form__port"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.priority')"
                :placeholder="$t('domainDetail.dns.priorityPlaceholder')"
                id="name-field"
                v-model="newDns.data.priority"
                class="dns__form__priority"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.protocol')"
                id="name-field"
                v-model="newDns.data.proto"
                class="dns__form__proto"
                :required="true"
                >
                  <option v-for="protocol_SRV in protocolSRV" :key="protocol_SRV.value" :value="protocol_SRV.value">{{ protocol_SRV.label }}</option>  
              </BohrSelect>
              <BohrTextField
                :label="$t('domainDetail.dns.service')"
                :placeholder="$t('domainDetail.dns.servicePlaceholder')"
                id="name-field"
                v-model="newDns.data.service"
                class="dns__form__service"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.target')"
                :placeholder="$t('domainDetail.dns.targetPlaceholder')"
                id="name-field"
                v-model="newDns.data.target"
                class="dns__form__target"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.weight')"
                id="name-field"
                v-model="newDns.data.weight"
                class="dns__form__weight"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="newDns.ttl"
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
            <div style="display: contents;" v-if="newDns.type === 'SSHFP'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="newDns.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.algorithm')"
                :placeholder="$t('domainDetail.dns.algorithmPlaceholder')"
                id="name-field"
                v-model="newDns.data.algorithm"
                class="dns__form__algorithm"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.type')"
                :placeholder="$t('domainDetail.dns.typePlaceholder')"
                id="name-field"
                v-model="newDns.data.type"
                class="dns__form__type"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="newDns.ttl"
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
                v-model="newDns.data.fingerprint"
                class="dns__form__fingerprint"
                style="resize:none"
                cols="35"
                rows="5"
                :required="true"
              />
            </div>
            <!-- TYPE  SSHFP-->
            <!-- TYPE  SVCB-->
            <div style="display: contents;" v-if="newDns.type === 'SVCB'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="newDns.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.priority')"
                :placeholder="$t('domainDetail.dns.priorityPlaceholder')"
                id="name-field"
                v-model="newDns.data.priority"
                class="dns__form__priority"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.target')"
                :placeholder="$t('domainDetail.dns.targetPlaceholder')"
                id="name-field"
                v-model="newDns.data.target"
                class="dns__form__target"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.value')"
                :placeholder="$t('domainDetail.dns.valuePlaceholder')"
                id="name-field"
                v-model="newDns.data.value"
                class="dns__form__value"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="newDns.ttl"
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
            <div style="display: contents;" v-if="newDns.type === 'TLSA'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="newDns.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrTextArea
                :label="$t('domainDetail.dns.certificate')"
                :placeholder="$t('domainDetail.dns.certificatePlaceholder')"
                id="name-field"
                v-model="newDns.data.certificate"
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
                v-model="newDns.data.matching_type"
                class="dns__form__matching_type"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.selector')"
                :placeholder="$t('domainDetail.dns.algorithmPlaceholder')"
                id="name-field"
                v-model="newDns.data.selector"
                class="dns__form__selector"
                :required="true"
              />
              <BohrTextField
                type="number"
                :label="$t('domainDetail.dns.usage')"
                id="name-field"
                v-model="newDns.data.usage"
                class="dns__form__usage"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="newDns.ttl"
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
            <div style="display: contents;" v-if="newDns.type === 'TXT'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="newDns.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrSelect
              :label="$t('domainDetail.dns.ttl')"
              id="ttl-field"
              v-model="newDns.ttl"
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
            <div style="display: contents;" v-if="newDns.type === 'URI'">
              <BohrTextField
                :label="$t('domainDetail.dns.name')"
                :placeholder="$t('domainDetail.dns.namePlaceholder')"
                id="name-field"
                v-model="newDns.name"
                class="dns__form__name"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.priority')"
                :placeholder="$t('domainDetail.dns.priorityPlaceholder')"
                id="name-field"
                v-model="newDns.priority"
                class="dns__form__priority"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.content')"
                :placeholder="$t('domainDetail.dns.contentPlaceholder')"
                id="name-field"
                v-model="newDns.data.content"
                class="dns__form__content"
                :required="true"
              />
              <BohrTextField
                :label="$t('domainDetail.dns.weight')"
                id="name-field"
                v-model="newDns.data.weight"
                class="dns__form__weight"
                :required="true"
              />
              <BohrSelect
                :label="$t('domainDetail.dns.ttl')"
                id="ttl-field"
                v-model="newDns.ttl"
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
        <div style="display: contents;" v-if="newDns.type === 'LOC'">
              <div class="bohr__div__loc">
                <h3 class="bohr__text__loc"> {{ $t('domainDetail.dns.setLatitude') }} </h3>
              </div>
              <div class="bohr__input_loc">
                <BohrTextField
                  type="number"
                  :label="$t('domainDetail.dns.degress')"
                  id="name-field"
                  v-model="newDns.data.lat_degrees"
                  class="dns__form__lat_degrees"
                  :required="true"
                />
                <BohrTextField
                  type="number"
                  :label="$t('domainDetail.dns.minutes')"
                  id="name-field"
                  v-model="newDns.data.lat_minutes"
                  class="dns__form__lat_minutes"
                  :required="true"
                />
                <BohrTextField
                  type="number"  
                  :label="$t('domainDetail.dns.seconds')"
                  id="name-field"
                  v-model="newDns.data.lat_seconds"
                  class="dns__form__lat_seconds"
                  :required="true"
                />
                <BohrSelect
                  :label="$t('domainDetail.dns.direction')"
                  id="ttl-field"
                  v-model="newDns.data.lat_direction"
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
                  v-model="newDns.data.long_degrees"
                  class="dns__form__long_degrees"
                  :required="true"
                />
                <BohrTextField
                  type="number"
                  :label="$t('domainDetail.dns.minutes')"
                  id="name-field"
                  v-model="newDns.data.long_minutes"
                  class="dns__form__long_minutes"
                  :required="true"
                />
                <BohrTextField
                  type="number"
                  :label="$t('domainDetail.dns.seconds')"
                  id="name-field"
                  v-model="newDns.data.long_seconds"
                  class="dns__form__long_seconds"
                  :required="true"
                />
                <BohrSelect
                  :label="$t('domainDetail.dns.direction')"
                  id="ttl-field"
                  v-model="newDns.data.long_direction"
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
                  v-model="newDns.data.precision_horz"
                  class="dns__form__precision_horz"
                  :required="true"
                />
                <BohrTextField
                  type="number"
                  :label="$t('domainDetail.dns.vertical')"
                  id="name-field"
                  v-model="newDns.data.precision_vert"
                  class="dns__form__precision_vert"
                  :required="true"
                />
                <BohrTextField
                  type="number"
                  :label="$t('domainDetail.dns.size')"
                  id="name-field"
                  v-model="newDns.data.size"
                  class="dns__form__size"
                  :required="true"
                />
                <BohrTextField
                  type="number"
                  :label="$t('domainDetail.dns.altitude')"
                  id="name-field"
                  v-model="newDns.data.altitude"
                  class="dns__form__altitude"
                  :required="true"
                />
              </div>
            </div>
            <div class="bohr__text_area_container" v-if="newDns.type === 'TXT'">
              <BohrTextArea
                :label="$t('domainDetail.dns.content')"
                :placeholder="$t('domainDetail.dns.contentPlaceholder')"
                id="name-field"
                v-model="newDns.content"
                class="dns__form__content"
                :required="true"
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
        <BohrBox class="cards__container">
          <BohrTable>
            <template v-for="dns in dnsListData" :key="dns.id">
            <BohrTableRow
              :isLink="!isFetchingDnsData"
              :to="{ name: 'DnsDetail', params: { domain: dns.domain, dns: dns.id } }"
              class="dns__row"
              >
                <BohrCard class="dns__card">
                  <BohrTypography variant="title4">
                    {{ $t('domainDetail.dns.type').toUpperCase() }}: <SkeletonLoading :isShowing="isFetchingDnsData">{{ dns.type }} </SkeletonLoading>
                  </BohrTypography>
                  <BohrTypography variant="title4">
                    {{ $t('domainDetail.dns.name').toUpperCase() }}: <SkeletonLoading :isShowing="isFetchingDnsData">{{ dns.name }} </SkeletonLoading>
                  </BohrTypography>              
                  <BohrTypography variant="title4">
                    {{ $t('domainDetail.dns.content').toUpperCase() }}: <SkeletonLoading :isShowing="isFetchingDnsData">{{ dns.content }} </SkeletonLoading>
                  </BohrTypography>              
                  <div class="dns__button" style="display: flex; align-items: center;">
                    <BohrButton v-show="!isFetchingDnsData" class="dns__edit_button">
                      {{ $t('common.edit') }}
                    </BohrButton>
                  </div>
                  <BohrTypography variant="title4">
                    {{ $t('domainDetail.dns.ttl').toUpperCase() }}: <SkeletonLoading :isShowing="isFetchingDnsData">{{ dns.ttl }}</SkeletonLoading>
                  </BohrTypography>
                  <BohrTypography variant="title4" style="display: flex; align-items: center;">
                    PROXY: <div class="proxy__switch"><BohrSwitch :id="'proxy' + dns.id" v-model="dns.proxied" readonly/></div>
                  </BohrTypography>
                </BohrCard>
              </BohrTableRow>
            </template>
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
import { dnsTypes, ttlOptions, protocolSRV, digestTypeds, directionLat, directionLong } from '@/assets/cloudFlareDns';
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
import { Dns, Domain, Locale, NewDnsData } from '@/types';
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
  data: {
    digest_type: 'digest_type',
    protocol: 'protocol',
    content: 'content',
    type: 'type',
    name: 'name',
    priority: 0,
    key_tag: 'key_tag',
    algorithm: 'algorithm',
    certificate: 'certificate',
    target: 'target',
    proto: 'proto',
    publicKey: 'publicKey',
    digestType: 1,
    digest: 'digest',
    value: 'value',
    nameserver: 'nameserver',
    usage: 'usage',
    selector: 'selector',
    matching_type: 'matching_type',
    flags: 'flags',
    order: 'order',
    preference: 'preference',
    service: 'service',
    regex: 'regex',
    replacement: 'replacement',
    weight: 'weight',
    port: 'port',
    fingerprint: 'fingerprint',
    lat_degrees: 'lat_degrees',
    lat_minutes: 'lat_minutes',
    lat_seconds: 'lat_seconds',
    lat_direction: 'lat_direction',
    directionLat: 'directionLat',
    long_degrees: 'long_degrees',
    long_minutes: 'long_minutes',
    long_seconds: 'long_seconds',
    long_direction: 'long_direction',
    precision_horz: 'precision_horz',
    precision_vert: 'precision_vert',
    altitude: 'altitude',
    size: 'size'
  }
}

const initialNewDns = () => ({
  type: '',
  name: '',
  priority: '',
  content: '',
  ttl: '1',
  proxied: false,
  data: {
    digest_type: '',
    protocol: '',
    content: '',
    proto: '',
    digestType: '',
    type: '',
    name: '',
    priority: '',
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
      dnsListData: [fakeDns, fakeDns, fakeDns] as unknown as Dns[],
      isFetchingDnsData: true,
      isFetchingDomainData: true,
      isDeleting: false,
      dnsTypes,
      ttlOptions,
      protocolSRV,
      digestTypeds,
      directionLat, 
      directionLong,
      formFields: {initialNewDns}
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

    disableTTLField() {
      return this.newDns.proxied && (['A', 'AAAA', 'CNAME', 'CERT', 'SRV'].includes(this.newDns.type));
    },

    disableProxy() {
      return ['DNSKEY', 'TXT', 'DS', 'HTTPS', 'MX', 'NAPTR', 'NS', 'SMIMEA', 'SRV', 'SSHFP', 'SVCB', 'TLSA', 'URI', 'LOC'].includes(this.newDns.type);
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

      let dnsData: NewDnsData = this.newDns;

      dnsData.priority = Number(dnsData.priority);
      if(dnsData.data?.priority)
        dnsData.data.priority = Number(dnsData.data.priority);

      dnsData = Object.fromEntries(Object.entries(dnsData).filter(([key, value]) => (value !== '' && value !== null)))
      if(dnsData.data !== undefined && dnsData.data !== null) {
        dnsData.data = Object.fromEntries(Object.entries(dnsData.data).filter(([key, value]) => (value !== '' && value !== null)))
      }

      const { error } = await createDns(this.domainData.name, dnsData);
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
  watch: {
    'newDns.data.priority': function(newPriority) {
      this.newDns.priority = newPriority;
    }
  }
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

.dns__button {
  text-align: right;
}

.proxy__switch {
  padding: 0px 0px 0px 10px;
}

.form__actions {
  display: flex;
  justify-content: flex-end;
}

.bohr__text_area_container {
  position: relative;
  display: grid;
  font-size: 12px;
}

.bohr__input_loc {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(4, 1fr) auto;
}

.domain__header {
    display: inline-flex;
}

.bohr__div__loc {
  margin: 10px 10px -15px 0px;
}

.bohr__text__loc {
  font-size: 16px;
  text-align: left;
}

.code__links {
    display: flex;
    justify-content: flex-end;
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
  display: block;
  width: 100%;
  padding: 24px 32px 8px;
  box-sizing: border-box;
}

.cards__container {
  display: none;
  width: 100%;
  padding: 24px 32px 8px;
  box-sizing: border-box;
}

/* Estilos para telas pequenas */
@media (max-width: 767px) {
  .table__container {
    display: none;
  }
  .cards__container {
    display: block;
    grid-template-columns: repeat(2, 1fr);
  }
  .dns__edit_button {
  margin-block: -16px;
  visibility: hidden;
  margin-left: 80%;
}

  .dns__row:hover .dns__edit_button {
    visibility: visible;
}
}

.table__container :deep(.table__cell) {
  vertical-align: middle;
}

.table__container :deep(.bohr__switch) {
  margin: 0;
}

.bohr__text__area {
  height: 40px;
}

.grid-template-columns-3 {
  grid-template-columns: repeat(3, 1fr) auto;
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
  .code__links {
    top: -10px;
  }
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