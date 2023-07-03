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
            <BohrSelect :label="$t('domainDetail.dns.type')" v-model="newDns.type" class="dns__form__type" :required="true">
              <option value="" disabled>{{ $t('domainDetail.dns.typePlaceholder') }}</option>
              <option v-for="dnsType in dnsTypes" :key="dnsType" :value="dnsType">{{ dnsType }}</option>
            </BohrSelect>
            <BohrTextField
              :label="$t('domainDetail.dns.name')"
              :placeholder="$t('domainDetail.dns.namePlaceholder')"
              id="name-field"
              v-model="newDns.name"
              class="dns__form__name"
              :required="true"
            />
            <BohrTextArea
              v-if=exhibitTarget
              :label="$t('domainDetail.dns.target')"
              :placeholder="$t('domainDetail.dns.targetPlaceholder')"
              id="content-field"
              v-model="newDns.content"
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
              v-model="newDns.content"
              class="dns__form__content"
              :required="true"
            />
            <BohrTextArea
              v-if="exhibitNameServer"
              :label="$t('domainDetail.dns.nameServer')"
              id="content-field"
              v-model="newDns.nameserver"
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
              v-model="newDns.usage"
              class="dns__form__usage"
              :required="true"
            />
            <BohrTextField
              type="number"
              v-if="exhibitSelectorAndmaTchingType"
              :label="$t('domainDetail.dns.selector')"
              :placeholder="$t('domainDetail.dns.algorithmPlaceholder')"
              id="content-field"
              v-model="newDns.selector"
              class="dns__form__selector"
              :required="true"
            />
            <BohrTextField
              type="number"
              v-if="exhibitSelectorAndmaTchingType"
              :label="$t('domainDetail.dns.matchingType')"
              :placeholder="$t('domainDetail.dns.algorithmPlaceholder')"
              id="content-field"
              v-model="newDns.matching_type"
              class="dns__form__matchingType"
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
              v-if="exhibitFlags"
              :label="$t('domainDetail.dns.flags')"
              :placeholder="$t('domainDetail.dns.flagsPlaceholder')"
              id="content-field"
              v-model="newDns.flags"
              class="dns__form__flags"
              :required="true"
            />
            <BohrSelect
              v-if="exhibitProtocol"
              :label="$t('domainDetail.dns.protocol')"
              id="ttl-field"
              v-model="newDns.protocol"
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
              v-model="newDns.order"
              class="dns__form__order"
              :required="true"
            />
            <BohrTextField
              type="number"
              v-if="exhibitTypeNAPTR"
              :label="$t('domainDetail.dns.preference')"
              :placeholder="$t('domainDetail.dns.preferencePlaceholder')"
              id="content-field"
              v-model="newDns.preference"
              class="dns__form__preference"
              :required="true"
            />
            <BohrTextField
              v-if="exhibitTypeNAPTR"
              :label="$t('domainDetail.dns.flags')"
              :placeholder="$t('domainDetail.dns.flagsStringPlaceholder')"
              id="content-field"
              v-model="newDns.flags"
              class="dns__form__flags"
              :required="true"
            />
            <BohrTextField
              v-if="exhibitService"
              :label="$t('domainDetail.dns.service')"
              :placeholder="$t('domainDetail.dns.servicePlaceholder')"
              id="content-field"
              v-model="newDns.service"
              class="dns__form__service"
              :required="true"
            />
            <BohrTextField
              v-if="exhibitTypeNAPTR"
              :label="$t('domainDetail.dns.regex')"
              :placeholder="$t('domainDetail.dns.regexPlaceholder')"
              id="content-field"
              v-model="newDns.regex"
              class="dns__form__regex"
              :required="true"
            />
            <BohrTextField
              v-if="exhibitTypeNAPTR"
              :label="$t('domainDetail.dns.replacement')"
              id="content-field"
              v-model="newDns.replacement"
              class="dns__form__replacement"
              :required="true"
            />
            <BohrTextField
              type="number"
              v-if="exhibitPriority"
              :label="$t('domainDetail.dns.priority')"
              :placeholder="$t('domainDetail.dns.priorityPlaceholder')"
              id="dns-field"
              v-model="newDns.priority"
              class="dns__form__priority"
              :required="true"
            />
            <BohrTextField
              type="number"
              v-if="exhibitWeight"
              :label="$t('domainDetail.dns.weight')"
              :placeholder="$t('domainDetail.dns.preferencePlaceholder')"
              id="dns-field"
              v-model="newDns.weight"
              class="dns__form__weight"
              :required="true"
            />
            <BohrTextField
              type="number"
              v-if="exhibitPort"
              :label="$t('domainDetail.dns.port')"
              :placeholder="$t('domainDetail.dns.preferencePlaceholder')"
              id="dns-field"
              v-model="newDns.port"
              class="dns__form__port"
              :required="true"
            />
            <BohrTextField
              v-if="exhibitCertType"
              :label="$t('domainDetail.dns.certType')"
              :placeholder="$t('domainDetail.dns.certTypePlaceholder')"
              id="dns-field"
              v-model="newDns.cert_type"
              class="dns__form__certType"
              :required="true"
            />
            <BohrTextField
              v-if="exhibitKeyTag"
              :label="$t('domainDetail.dns.keyTag')"
              :placeholder="$t('domainDetail.dns.keyTagPlaceholder')"
              id="dns-field"
              v-model="newDns.key_tag"
              class="dns__form__keyTag"
              :required="true"
            />
            <BohrTextField
              v-if="exhibitMailServer"
              :label="$t('domainDetail.dns.mailServer')"
              id="dns-field"
              v-model="newDns.content"
              class="dns__form__mailServer"
              :required="true"
            />
            <BohrSelect
              v-if="exhibitDigestType"
              :label="$t('domainDetail.dns.digestType')"
              id="ttl-field"
              v-model="newDns.digestType"
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
              v-model="newDns.algorithm"
              class="dns__form__algorithm"
              :required="true"
            />
            <BohrTextField
              type="number"
              v-if="exhibitType"
              :label="$t('domainDetail.dns.type')"
              :placeholder="$t('domainDetail.dns.algorithmPlaceholder')"
              id="dns-field"
              v-model="newDns.type"
              class="dns__form__type"
              :required="true"
            />
            <BohrTextArea
              v-if="exhibitType"
              :label="$t('domainDetail.dns.fingerprint')"
              :placeholder="$t('domainDetail.dns.fingerprintPlaceholder')"
              id="content-field"
              v-model="newDns.fingerprint"
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
              v-model="newDns.certificate"
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
              v-model="newDns.public_key"
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
              v-model="newDns.digest"
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
              v-model="newDns.value"
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
              v-model="newDns.lat_degrees"
              class="dns__form__degress"
              :required="true"
            />
            <BohrTextField
              type="number"
              v-if="exhibitTypeLoc"
              :label="$t('domainDetail.dns.minutes')"
              id="dns-field"
              v-model="newDns.lat_minutes"
              class="dns__form__minutes"
              :required="true"
            />
            <BohrTextField
              type="number"
              v-if="exhibitTypeLoc"
              :label="$t('domainDetail.dns.seconds')"
              id="dns-field"
              v-model="newDns.lat_seconds"
              class="dns__form__seconds"
              :required="true"
            />
            <BohrSelect
              v-if="exhibitTypeLoc"
              :label="$t('domainDetail.dns.direction')"
              id="ttl-field"
              v-model="newDns.lat_direction"
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
            v-model="newDns.long_degrees"
            class="dns__form__degressLog"
            :required="true"
          />
          <BohrTextField
            type="number"
            v-if="exhibitTypeLoc"
            :label="$t('domainDetail.dns.minutes')"
            id="dns-field"
            v-model="newDns.long_minutes"
            class="dns__form__minutesLog"
            :required="true"
          />
          <BohrTextField
            type="number"
            v-if="exhibitTypeLoc"
            :label="$t('domainDetail.dns.seconds')"
            id="dns-field"
            v-model="newDns.long_seconds"
            class="dns__form__secondsLog"
            :required="true"
          />
          <BohrSelect
            v-if="exhibitTypeLoc"
            :label="$t('domainDetail.dns.direction')"
            id="ttl-field"
            v-model="newDns.long_direction"
            class="dns__form__ttl"
            :required="true"
          >
            <option v-for="direction_Long in directionLong" :key="direction_Long" :value="direction_Long">{{ direction_Long }}</option>  
          </BohrSelect>
          <BohrSwitch id="proxy" label="proxy" v-model="newDns.proxied" v-if="!disableProxy" class="position" />
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
            v-model="newDns.precision_horz"
            class="dns__form__horizontal"
            :required="true"
          />
          <BohrTextField
            type="number"
            v-if="exhibitTypeLoc"
            :label="$t('domainDetail.dns.vertical')"
            id="dns-field"
            v-model="newDns.precision_vert"
            class="dns__form__vertical"
            :required="true"
          />
          <BohrTextField
            type="number"
            v-if="exhibitTypeLoc"
            :label="$t('domainDetail.dns.altitude')"
            id="dns-field"
            v-model="newDns.altitude"
            class="dns__form__altitude"
            :required="true"
          />
          <BohrTextField
            type="number"
            v-if="exhibitTypeLoc"
            :label="$t('domainDetail.dns.size')"
            id="dns-field"
            v-model="newDns.size"
            class="dns__form__size"
            :required="true"
          />
        </div>
        <div class="bohr__text_area_container">
          <BohrTextArea
            :label="$t('domainDetail.dns.content')"
            :placeholder="$t('domainDetail.dns.contentPlaceholder')"
            id="content-field"
            v-model="newDns.content"
            v-if="newDns.type === 'TXT'"
            style="resize:none;"
            cols="35"
            rows="5"
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
  cert_type: 'cert-type',
  key_tag: 'key_tag',
  algorithm: 'algorithm',
  certificate: 'certificate',
  target: 'target',
  protocol: 0,
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
  fingerprint_type: 'fingerprint_type',
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
  size: 'size',
}

const initialNewDns = () => ({
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
});

interface NewDnsData {
  type: string;
  name: string;
  ttl: string;
}

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
      return this.newDns.proxied && (this.newDns.type === 'A' || this.newDns.type === 'AAAA' || this.newDns.type === 'CNAME');
    },

    disableProxy() {
      return this.newDns.type === 'DNSKEY' || this.newDns.type === 'TXT' || this.newDns.type === 'DS' || this.newDns.type === 'HTTPS' || this.newDns.type === 'MX' || this.newDns.type === 'NAPTR' || this.newDns.type === 'NS' || this.newDns.type === 'SMIMEA' || this.newDns.type === 'SRV' || this.newDns.type === 'SSHFP' || this.newDns.type === 'SVCB' || this.newDns.type === 'TLSA' || this.newDns.type === 'URI' || this.newDns.type === 'LOC';
    },

    exhibitContent() {
      return this.newDns.type === 'A' || this.newDns.type === 'AAAA' || this.newDns.type !== 'CNAME' && this.newDns.type !== 'DNSKEY' && this.newDns.type !== 'DS' && this.newDns.type !== 'HTTPS' && this.newDns.type !== 'MX' && this.newDns.type !== 'NAPTR' && this.newDns.type !== 'NS' && this.newDns.type !== 'SMIMEA' &&  this.newDns.type !== 'SRV' && this.newDns.type !== 'SSHFP' && this.newDns.type !== 'SVCB' && this.newDns.type !== 'TLSA' && this.newDns.type !== 'TXT' &&  this.newDns.type !== 'URI' && this.newDns.type !== 'LOC';
    },

    exhibitTarget() {
      return this.newDns.type === 'CNAME' || this.newDns.type === 'HTTPS' || this.newDns.type === 'SRV' || this.newDns.type === 'SVCB'  || this.newDns.type === 'URI'
    },

    exhibitNameServer() {
      return this.newDns.type === 'NS'
    },

    exhibitUsage() {
      return this.newDns.type === 'SMIMEA' || this.newDns.type === 'TLSA'
    },

    exhibitSelectorAndmaTchingType() {
      return this.newDns.type === 'SMIMEA' || this.newDns.type === 'TLSA'
    },

    exhibitFlags() {
      return this.newDns.type === 'DNSKEY'
    },

    exhibitProtocol() {
      return this.newDns.type === 'DNSKEY' || this.newDns.type === 'SRV'
    },

    exhibitOrder() {
      return this.newDns.type === 'NAPTR'
    },
    
    exhibitTypeNAPTR() {
      return this.newDns.type === 'NAPTR'
    },

    exhibitService() {
      return this.newDns.type === 'NAPTR' || this.newDns.type === 'SRV' 
    },

    exhibitPriority() {
      return this.newDns.type === 'URI' || this.newDns.type === 'SRV' || this.newDns.type === 'MX' || this.newDns.type === 'HTTPS' || this.newDns.type === 'SVCB'
    },
    
    exhibitWeight() {
      return this.newDns.type === 'SRV' || this.newDns.type === 'URI'
    },

    exhibitPort() {
      return this.newDns.type === 'SRV'
    },

    exhibitCertType() {
      return this.newDns.type === 'CERT'
    },

    exhibitKeyTag() {
      return this.newDns.type === 'CERT' || this.newDns.type === 'DS'
    },

    exhibitMailServer() {
      return this.newDns.type === 'MX'
    },

    exhibitDigestType() {
      return this.newDns.type === 'DS'
    },

    exhibitAlgorithm() {
      return this.newDns.type === 'CERT' || this.newDns.type === 'DNSKEY' || this.newDns.type === 'DS' || this.newDns.type === 'SSHFP'
    },

    exhibitType() {
      return this.newDns.type === 'SSHFP'
    },

    exhibitCertificate() {
      return this.newDns.type === 'CERT' || this.newDns.type === 'SMIMEA' || this.newDns.type === 'TLSA'
    },

    exhibitPublicKey() {
      return this.newDns.type === 'DNSKEY'
    },

    exhibitDigest() {
      return this.newDns.type === 'DS'
    },

    exhibitValue() {
      return this.newDns.type === 'HTTPS' || this.newDns.type === 'SVCB'
    },

    exhibitTypeLoc() {
      return this.newDns.type === 'LOC'
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

      const dnsData: NewDnsData = {
        type: this.domainData.name as string,
        name: '',
        ttl: '',
      };
      for (const key in this.newDns) {
        const value = this.newDns[key as keyof typeof this.newDns];
        if (value !== undefined && value !== null && value !== '') {
          dnsData[key as keyof NewDnsData] = value.toString();
        }
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
