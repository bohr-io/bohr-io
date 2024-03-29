<template>
  <main class="container">
    <template v-if="!showLoading">
      <BackButton :to="{ name: 'New' }" />
      <header class="header__container">
        <p class="header__comment">{{ $t('common.project', 2) }}</p>
        <h1 class="header__title">
          {{ $t('createRepository.title') }}
        </h1>
        <p class="header__description">
          {{ $t('createRepository.description') }}
        </p>
      </header>

      <div class="content__wrapper">
        <div class="card__new-repo">
          <div class="card__new-repo--body">
            <div class="template__info">
              <BohrTypography tag="h2" variant="title3" color="hsl(181, 69%, 61%)" textTransform="capitalize" class="template__title">
                {{ $t('common.template') }}
              </BohrTypography>
              <BohrTypography tag="p">
                {{ $t('common.name') }}: {{ templateName }}
              </BohrTypography>
              <BohrTypography tag="p">
                {{ $t('common.githubRepo') }}: <a :href="sampleUrl" target="_blank" rel="noreferrer">{{ sampleUrl }}</a>
              </BohrTypography>
            </div>
            <div>
              <BohrTypography tag="h2" variant="title3" color="hsl(181, 69%, 61%)" textTransform="capitalize" class="domain__title">
                {{ $t('common.domain') }}
              </BohrTypography>
              <SubdomainDomainFields
                v-model:subdomain="subdomain"
                v-model:domain="selectedDomain"
                :availableDomains="availableDomains"
                :isLoading="isFetchingTemplateData"
                hasStartingRandomSubdomain
              />
            </div>
            <div>
              <BohrTypography tag="h2" variant="title3" color="hsl(181, 69%, 61%)" class="git__title">
                {{ $t('createRepository.gitRepoTitle') }}
              </BohrTypography>
              <div class="form__inline">
                <div class="form__group">
                  <div data-intro-anchor="owner">
                    <label class="form__label">
                      {{ $t('createRepository.owner') }}
                    </label>
                    <BohrCustomSelect
                      :placeholder="$t('createRepository.ownerPlaceholder')"
                      :options="ownerOptions"
                      v-model="owner"
                      :validationStatus="!isValidOwner ? 'error' : ''"
                    >
                      <template #addon>
                        <a :href="bohrGithubAppLink" target="_blank" class="combo__addon">
                          <PlusRegularIcon /> {{ $t('createRepository.addGithub') }}
                        </a>
                      </template>
                    </BohrCustomSelect>
                  </div>
                  <div class="custom__checkbox">
                    <input type="checkbox" id="checkbox" v-model="privateGit">
                    <label for="checkbox" class="label">{{ $t('createRepository.privateGit') }}</label>
                  </div>
                </div>
                <div class="form__group">
                  <label class="form__label">{{ $t('createRepository.repositoryName') }}</label>
                  <input
                    type="text"
                    class="form__input"
                    v-model="repositoryName"
                    :placeholder="$t('createRepository.repositoryNamePlaceholder') "
                    @keyup.enter="publish"
                  />
                </div>
              </div>
            </div>
  
            <div>
              <BohrTypography tag="h2" variant="title3" color="hsl(181, 69%, 61%)" class="block__title">
                {{ $t('settings.buildDev.title') }}
              </BohrTypography>
              <p class="block__description">
                {{ $t('settings.buildDev.subtitle') }}
              </p>
  
              <div class="build__dev__field">
                <BohrTextField
                  id="build-command"
                  class="settings__field"
                  :label="$t('settings.buildDev.label.buildCommand')"
                  v-model="buildDev.BUILD_CMD"
                />
                <BohrTextField
                  id="root-directory"
                  class="settings__field"
                  :label="$t('settings.buildDev.label.rootDirectory')"
                  v-model="buildDev.DEPLOY_PATH"
                />
                <BohrTextField
                  id="output-directory"
                  class="settings__field"
                  :label="$t('settings.buildDev.label.outputDirectory')"
                  v-model="buildDev.PUBLIC_PATH"
                />
                <BohrTextField
                  id="install-command"
                  class="settings__field"
                  :label="$t('settings.buildDev.label.installCommand')"
                  v-model="buildDev.INSTALL_CMD"
                />
                <BohrTextField
                  id="development-command"
                  class="settings__field"
                  :label="$t('settings.buildDev.label.developmentCommand')"
                  v-model="buildDev.DEV_CMD"
                />
              </div>
            </div>

            <div class="environment__container">
              <BohrTypography tag="h2" variant="title3" color="hsl(181, 69%, 61%)" class="block__title">
                {{ $t('createRepository.environmentTitle') }}
              </BohrTypography>
              <p class="block__description">
                {{ $t('createRepository.environmentDescription') }}
              </p>
  
              <EnvVarsList
                :envVarsData="environments"
                @removeVar="removeVariable"
                :varsWithError="varsWithError"
                :isPlaceholder="isFetchingTemplateData"
                newRepoVariant
              />
  
              <div class="new__button__container">
                <BohrIconButton
                  :label="$t('settings.envVars.label.newVar')"
                  @click="addVariable"
                >
                  <GreenPlusIcon />
                </BohrIconButton>
              </div>
            </div>

            <div v-if="error && varsWithError" class="error__box">
              <BohrTypography tag="p" variant="subtitle2">
                {{ $t(`createRepository.error.publish.${error.error}`) }} {{ varsWithError.join(', ') }}
              </BohrTypography>
            </div>
          </div>
          <div class="card__new-repo--footer">
            <div class="publish__container">
              <BohrButton 
                size="lg"
                @click="publish"
              > 
                {{$t('createRepository.publish')}}
              </BohrButton>
            </div>
          </div>
        </div>
        <BohrBox v-if="readme" class="readme__box">
          <BohrTypography tag="h2" variant="title3" color="hsl(181, 69%, 61%)" textTransform="capitalize" class="readme__title">
            README
          </BohrTypography>
          <BohrIconButton
            component="a"
            :href="sampleUrl"
            target="_blank"
            rel="noreferrer"
            :label="sampleUrl"
            class="github__icon__link"
          >
            <GithubIcon />
          </BohrIconButton>
          <RepoReadme :markdown="readme" />
        </BohrBox>
      </div>
    </template>

    <ModalBase
      :isVisible="hasAuthError"
      @close="handleAuthErrorRedirect"
      width="50vw"
      min-width="200px"
      max-width="700px"
    >
      <div class="modal__content">
        <BohrTypography tag="h2" variant="title3" color="hsl(355, 78%, 60%)">
          {{ $t('createRepository.authError.title') }}
        </BohrTypography>
        <BohrTypography tag="p">
          {{ $t('createRepository.authError.text') }}
        </BohrTypography>
      </div>
      <div class="modal__actions">
        <BohrButton @click="handleAuthErrorRedirect">
          {{ $t('common.close') }}
        </BohrButton>
      </div>
    </ModalBase>

    <ModalBase
      :isVisible="hasScopeError"
      @close="handleScopeErrorRedirect"
      width="50vw"
      min-width="200px"
      max-width="700px"
    >
      <div class="modal__content">
        <BohrTypography tag="h2" variant="title3" color="hsl(355, 78%, 60%)">
          {{ $t('createRepository.scopeError.title') }}
        </BohrTypography>
        <BohrTypography tag="p">
          {{ $t('createRepository.scopeError.text') }}
        </BohrTypography>
      </div>
      <div class="modal__actions">
        <BohrButton @click="handleScopeErrorRedirect">
          {{ $t('createRepository.GoGithub') }}
        </BohrButton>
      </div>
    </ModalBase>

    <GithubAppModal @appInstalled="handleGetMeLoop" />

    <LoadingAnimation v-if="showLoading"/>
  </main>
</template>
<script lang="ts">
import BackButton from "@/components/BackButton.vue";
import BohrBox from "@/components/BohrBox.vue";
import BohrButton from "@/components/BohrButton.vue";
import BohrCustomSelect from "@/components/BohrCustomSelect.vue";
import BohrIconButton from '@/components/BohrIconButton.vue';
import BohrTextField from "@/components/BohrTextField.vue";
import BohrTypography from "@/components/BohrTypography.vue";
import EnvVarsList from "@/components/EnvVarsList.vue";
import GithubAppModal from '@/components/GithubAppModal.vue';
import GithubIcon from '@/components/icons/GithubIcon.vue';
import GreenPlusIcon from '@/components/icons/GreenPlusIcon.vue';
import PlusRegularIcon from '@/components/icons/PlusRegularIcon.vue';
import LoadingAnimation from '@/components/LoadingAnimation.vue';
import ModalBase from '@/components/ModalBase.vue';
import RepoReadme from '@/components/RepoReadme.vue';
import SubdomainDomainFields from "@/components/SubdomainDomainFields.vue";
import { createNewSite, getAvailableDomains, getTemplateData } from '@/services/api';
import toastService from '@/services/ToastService';
import { Domain, SiteEnvVarField } from '@/types';
import removeCookies from '@/utils/removeCookies';
import { defaultIntro } from '@/utils/siteIntro';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    BackButton,
    BohrBox,
    BohrButton,
    BohrCustomSelect,
    BohrIconButton,
    BohrTextField,
    BohrTypography,
    EnvVarsList,
    GithubIcon,
    GreenPlusIcon,
    PlusRegularIcon,
    LoadingAnimation,
    RepoReadme,
    ModalBase,
    GithubAppModal,
    SubdomainDomainFields,
  },

  data() {
    return {
      sampleUrl: "",
      subdomain: "",
      availableDomains: [] as Domain[],
      selectedDomain: location.host === 'bohr.io' ? 'bohr.io' : 'bohr.rocks',
      owner: '',
      repositoryName: "",
      templateName: "",
      privateGit: false,
      readme: undefined,
      buildDev: {
        BUILD_CMD: '',
        PUBLIC_PATH: '',
        INSTALL_CMD: '',
        DEV_CMD: '',
        DEPLOY_PATH: '',
      },
      environments: [
        {
          key: "",
          value: "",
          isSecret: false,
        },
      ] as SiteEnvVarField[],
      showLoading: false,
      error: null as null | { error: string, value: SiteEnvVarField[] },
      isValidOwner: true,
      isFetchingTemplateData: false,
      hasAuthError: false,
      hasScopeError: false,
    };
  },

  computed: {
    orgsWithApp(){
      return this.$store.state.me?.orgsWithApp || [];
    },

    ownerOptions() {
      return this.orgsWithApp.map((org) => ({ value: org }));
    },

    username() {
      return this.$store.state.me?.username || '';
    },

    varsWithError() {
      if (!Array.isArray(this.error?.value)) {
        return;
      }

      return this.error?.value?.map(({ key }) => key);
    },

    bohrGithubAppLink() {
      return window.location.host === "bohr.io"
        ? "https://github.com/apps/bohr-io/installations/new/"
        : "https://github.com/apps/bohr-rocks/installations/new/";
    },
  },

  watch: {
    'environments.length'() {
      if (this.environments.length === 0) this.addVariable();
    },

    owner() {
      this.isValidOwner = true;
    },
  },

  created() {
    const selectedFilter = localStorage.getItem('sitesFilter');
    const owner = selectedFilter && selectedFilter !== 'all' ? selectedFilter : this.username;

    this.owner = this.orgsWithApp.includes(owner) ? owner : ''
  },

  mounted(){
    if(!this.$route.query.sampleUrl){
      return this.$router.push({ name: 'New' })
    }

    this.getAvailableDomains();

    this.sampleUrl = this.$route.query.sampleUrl as string;
    const templateName = this.sampleUrl.split("/").pop() || '';
    this.repositoryName = templateName;
    this.templateName = templateName;

    this.getTemplateData();

    defaultIntro([{
      title: this.$t('intro.owner.title'),
      intro: this.$t('intro.owner.text'),
      element: '[data-intro-anchor="owner"]',
      position: 'top',
    }], this.$i18n.locale).start();
  },

  methods: {
    addVariable() {
      this.environments.push({
        key: "",
        value: "",
        isSecret: false,
      });
    },

    removeVariable(index: number) {
      this.environments.splice(index, 1);
    },

    setPrivateGit(){
      this.privateGit = !this.privateGit;
    },

    handleGetMeLoop(){
      setTimeout(async ()=> {
        await this.$store.dispatch('getMe');

        if(this.orgsWithApp?.includes(this.username as string)){
          this.owner = this.username;
          return;
        }

        return this.handleGetMeLoop();
      }, 500);
    },

    async getAvailableDomains() {
      const { data } = await getAvailableDomains();

      if (data) {
        this.availableDomains = data;
      }
    },

    async getTemplateData() {
      if (!this.repositoryName) return;
      this.isFetchingTemplateData = true;

      const { data, error } = await getTemplateData(this.repositoryName);

      this.isFetchingTemplateData = false;

      if (error) {
        toastService.error(this.$t('createRepository.getTemplateData.errorMessage'));
        return;
      }

      const environments: SiteEnvVarField[] = [];
      const buildVarsNames = Object.keys(this.buildDev);

      data.settings.vars.forEach((variable: SiteEnvVarField) => {
        if (buildVarsNames.includes(variable.key)) {
          this.buildDev[variable.key as keyof typeof this.buildDev] = variable.value;
        } else {
          environments.push(variable);
        }
      });

      if (environments.length) {
        this.environments = environments;
      }

      this.readme = data.readmeContent || undefined;
    },   

    async publish(){
      if(!this.owner){
        this.isValidOwner = false;
        return;
      }

      this.showLoading = true;
      this.error = null;

      const hasWebAdapter = this.environments.some((({ key, value }) => key === "BOHR_WEB_ADAPTER" && value === "1" ));

      const buildDevArr = Object.entries(this.buildDev)
        .map((([key, value]) => ({ key, value })))
        .filter(({ value }) => !!value);

      const environmentVars = [...this.environments, ...buildDevArr];

      const { data, error } = await createNewSite({ 
        orgName: this.owner, 
        sampleUrl: this.sampleUrl,
        privateRepo: this.privateGit,
        repo: this.repositoryName,
        environmentVars: environmentVars,
        domain: this.selectedDomain,
        subdomain: this.subdomain,
      });

      if (error) {
        if (['1001', '1003'].includes(error.error)) {
          this.error = error;
        } else if(error.code === 6) {
          removeCookies();
          this.hasAuthError = true;
        } else if(error.code === 8) {
          this.hasScopeError = true;
        } else {
          const errorMessageKeyPath = error.code
            ? `createRepository.error.publish.${error.code}`
            : 'createRepository.error.publish.generic';
          
          toastService.error(this.$t(errorMessageKeyPath));
        }

        this.showLoading = false;
        return;
      }

      const loadTimeout = hasWebAdapter ? 3000 : 1000;
      if (data.ret == 1) {
        setTimeout(() => {
          this.$router.push(`/${data.orgName}/${data.repoName}`)
          this.$store.dispatch('getMe');
        }, loadTimeout);
      }

      if(data.ret == 2){
        const url = `https://github.com/apps/bohr-io/installations/new/`;
        window.open(url, "_blank");
        this.showLoading = false;
      }
    },

    handleAuthErrorRedirect() {
      window.location.href = '/';
    },
    handleScopeErrorRedirect() {
      const isProd = window.location.hostname === "bohr.io"
      const clientId = isProd ? 'df2188333fde865a0c53' : 'bb19a44d65628bdae2ca';

      window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,read:user,read:org,user:email,public_repo,workflow;&redirect_uri=https://${window.location.hostname}/signin?bypass=1&state=|${window.location.href}`;
    },
  },
});
</script>
<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.container {
  max-width: 1152px;
  margin: 0 auto;
  font-family: "Helvetica", sans-serif;
}
.header__container {
  margin: 0 0 32px;
  position: relative;
}

.header__comment {
  color: #c3a32e;
  font-size: 18px;
  font-weight: 700;
  line-height: 21px;
  margin: 0;
}

.header__comment::before {
  content: "/";
  margin-right: 4px;
  color: #625217;
}

.header__title {
  color: #f4cc3a;
  font-weight: 700;
  font-size: 48px;
  line-height: 55px;
  margin: 0 0 24px;
}

.header__description {
  font-size: 14px;
  line-height: 18px;
  margin: 0;
  white-space: pre-line;
  display: none;
}

@media screen and (max-width: 992px){
  .header__container{
    padding-top: 20px;
  }
}

.btn__go-back{
  position: absolute;
  top: 0;
  right: 0;
  text-transform: uppercase;
  padding: 12px 20px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  color: #53dd6c;
  font-weight: 700;
  background: radial-gradient(47.72% 83.89% at 50% 100%, rgba(232, 73, 84, 0.25) 0%, rgba(14, 23, 29, 0.25) 100%), #0E171D;
  box-shadow: 0px 12px 36px rgba(83, 221, 108, 0.15);
  border-radius: 4px;
  border: 2px solid;
  border-image-slice: 1;
  border-width: 2px;
  border-image-source: linear-gradient(to bottom, #55dde0, #53dd6c);
  cursor: pointer;
}

.content__wrapper {
  display: flex;
  flex-direction: column;
  gap: 44px;
}

.card__new-repo {
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.0001) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  background-clip: border-box;
  min-width: 0;
  mix-blend-mode: normal;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  position: relative;
}

.card__new-repo::before {
  content: "";
  width: 100%;
  height: 1px;
  position: absolute;
  top: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.0001) 0%,
    #ffffff 50%,
    rgba(255, 255, 255, 0.0001) 100%
  );
  opacity: 1;
}

.card__new-repo::after {
  content: "";
  width: 100%;
  height: 1px;
  position: absolute;
  bottom: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.0001) 0%,
    #ffffff 50%,
    rgba(255, 255, 255, 0.0001) 100%
  );
  mix-blend-mode: normal;
  opacity: 0.5;
}

.card__new-repo--body{
  padding: 36px;
}

.template__info {
  margin-bottom: 40px;
}

.template__title,
.domain__title {
  margin-bottom: 16px;
}

.new__button__container {
  margin-left: auto;
  max-width: max-content;
}

.error__box {
  display: inline-block;
  padding: 10px;
  border-radius: 4px;
  border: 2px solid hsl(355, 78%, 60%);
}

.card__new-repo--footer{
  padding: 24px 36px;
  position: relative;
}

.card__new-repo--footer::before{
  content: "";
  width: 100%;
  height: 1px;
  position: absolute;
  top: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.0001) 0%,
    #ffffff 50%,
    rgba(255, 255, 255, 0.0001) 100%
  );
  opacity: 0.2;
}


.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 8px;
}

.row > * {
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  padding: 0 8px;
}

.col {
  flex: 1 0 0%;
}

.form__inline {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0px 24px;
}

@media screen and (max-width: 992px){
  .form__inline{
    display: grid;
    grid-template-columns: 1fr;
    gap: 0px 16px;
  }
}

.form__group{
  margin: 8px 0;
}

.form__label {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.form__input {
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1e-5) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  margin-bottom: 8px;
  color: var(--root-color);
}

.form__input:focus-visible{
  outline: none;
}

.form__input-group{
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1e-5) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  margin-bottom: 8px;
}

.form__input-group > input{
  position: relative;
  flex: 1 1 auto;
  width: 1%;
  min-width: 0;
  background: transparent;
  border: none;
  padding: 8px 28px 8px 12px;
  color: var(--root-color);
}

.form__input-group > input:focus{
  outline: none;
}

.form__input-group .btn__action{
  position: relative;
  z-index: 2;
  display: inline-block;
  padding: 6px 12px;
  text-align: center;
  vertical-align: middle;
  line-height: 1.5;
  height: 32px;
  background: transparent;
  border: none;
  cursor: pointer;
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

.build__dev__field {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.environment__container{
  margin-bottom: 20px;
}

.git__title,
.block__title {
  margin: 40px 0 16px;
}

.block__description {
  font-size: 14px;
  line-height: 16px;
  margin: 0 0 16px;
}

.environment__controls {
  display: flex;
  align-items: center;
  height: 40px; 
  margin-bottom: 8px;
}

.btn__environment {
  display: inline-flex;
  align-items: center;
  padding: 8px;
  margin: 0 4px;
  user-select: none;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  background: transparent;
  border: none;
}

.btn__environment:disabled{
  cursor: not-allowed;
  opacity: 0.5;
}

.publish__container {
  display: flex;
  justify-content: center;
  margin: auto;
}

.readme__box {
  position: relative;
  padding: 36px;
}

.readme__title {
  margin-bottom: 36px;
}

.github__icon__link {
  position: absolute;
  top: 36px;
  right: 36px;
}

.custom__checkbox{
  margin: 4px 0;
  display: block;
}
.custom__checkbox input[type="checkbox"] {
    opacity: 0;
    width: 0;
    height: 0;
}

.custom__checkbox label {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding-left: 32px;
    font-size: 14px;
    cursor: pointer;
}

.custom__checkbox label::before,
.custom__checkbox label::after {
    position: absolute;
    content: "";
    display: inline-block;
}

.custom__checkbox label::before{
  left: 0;
  width: 24px;
  height: 24px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 1e-05) 0%, rgba(255, 255, 255, 0.05) 100%);
  mix-blend-mode: normal;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.custom__checkbox label::after {
    left: 4px;
    top: 1px;
}

.custom__checkbox input[type="checkbox"] + label::after {
  content: url("/assets/svg/check-checkbox.svg");
  opacity: 0;
}

.custom__checkbox input[type="checkbox"]:checked + label::after {
  opacity: 1;
}

.error__select {
  border: 1px solid rgba(232, 72, 79, 1) !important;
}

.modal__content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.modal__actions {
  margin-top: 36px;
  margin-left: auto;
  width: max-content;
}
</style>
