<template>
  <div>
    <div v-if="!showCreatingProjectAnimation && !repoConfiguring" class="import__page">
      <BackButton :to="{ name: 'New' }" />
      <header class="import__header">
        <BohrPageTitle :pageName="$t('importRepository.title')" />
      </header>
      <main>
        <BohrBox class="import__box">
          <BohrTypography tag="h2" variant="title3" color="hsl(181, 69%, 61%)">
            {{ $t('importRepository.importTitle') }}
          </BohrTypography>
          <div class="filter__options">
            <div class="owner__field">
              <label class="owner__label">
                {{ $t('createRepository.owner') }}
              </label>
              <BohrCustomSelect 
                :placeholder="$t('createRepository.ownerPlaceholder')"
                :options="ownerOptions"
                v-model="owner"
              >
                <template #addon>
                  <a :href="bohrGithubAppLink" target="_blank" class="combo__addon">
                    <PlusRegularIcon /> {{ $t('createRepository.addGithub') }}
                  </a>
                </template>
              </BohrCustomSelect>
            </div>
            <BohrTextField
              id="search-input"
              :label="'search'"
              v-model="searchInput"
            />
          </div>
          <ul class="repo__list">
            <template v-if="isLoading">
              <li v-for="i in 3" :key="`fakeRepo${i}`" class="repo__card">
                <SkeletonLoading :isShowing="true">
                  <BohrTypography>
                    fakeRepoName
                  </BohrTypography>
                </SkeletonLoading>
                <SkeletonLoading :isShowing="true">
                  <BohrButton>
                    {{ $t('common.import') }}
                  </BohrButton>
                </SkeletonLoading>
              </li>
            </template>
            
            <li v-for="repo in reposOnDisplay" :key="`${repo.owner}/${repo.name}`" class="repo__card">
              <BohrTypography>
                {{ repo.name }}
              </BohrTypography>
              <a
                v-if="repo.imported"
                :href="`/${owner}/${repo.name}`"
                target="_blank"
                class="imported__link"
              >
                {{ $t('importRepository.alreadyImported') }}
                <NewWIndowIcon :sizePx="12" color="hsl(181deg 69% 60%)" />
              </a>
              <BohrButton @click="handleImportConfigure(repo)" :disabled="isImporting || repo.imported">
                {{ $t('common.import') }}
              </BohrButton>
            </li>
          </ul>
  
          <div v-if="!isLoading && reposOnDisplay.length === 0" class="no__repos">
            <BohrTypography tag="p" variant="title2" textAlign="center" color="hsl(0, 0%, 40%)">
              {{ $t('importRepository.noReposMessage') }}
            </BohrTypography>
          </div>
  
          <BohrTypography tag="p" style="margin-top:20px">
            {{ $t('importRepository.cantFind') }}
            <a
              :href="bohrGithubAppLink"
              target="_blank"
              style="color:orange"
            >
              {{ $t('importRepository.checkPermissions') }}
            </a>
          </BohrTypography>
        </BohrBox>
        <div class="import__video">
          <BohrTypography tag="h2" variant="title3" color="hsl(181, 69%, 61%)">
            {{  $t('importRepository.videoTitle')  }}
          </BohrTypography>
          <div class="video__container">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/0ctGM494f_Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </div>
        </div>
      </main>
    </div>

    <template v-if="!showCreatingProjectAnimation && repoConfiguring">
      <main class="container">
        <BackButton @click="repoConfiguring = undefined" />
        <header class="header__container">
          <p class="header__comment">{{ $t('common.project', 2) }}</p>
          <h1 class="header__title">
            {{ $t('importRepository.configureTitle') }}
          </h1>
        </header>

        <div class="content__wrapper">
          <div class="card__new-repo">
            <div class="card__new-repo--body">
              <div class="template__info">
                <BohrTypography tag="h2" variant="title3" color="hsl(181, 69%, 61%)" textTransform="capitalize" class="template__title">
                  {{ $t('common.project') }}
                </BohrTypography>
                <BohrTypography tag="p">
                  {{ $t('common.githubRepo') }}: <a :href="repoUrl" target="_blank" rel="noreferrer">{{ repoUrl }}</a>
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
                  :isLoading="repoConfiguring === undefined"
                  :hasStartingRandomSubdomain="!subdomain"
                />
              </div>

              <div>
                <BohrTypography tag="h2" variant="title3" color="hsl(181, 69%, 61%)" class="block__title">
                  {{ $t('settings.buildDev.title') }}
                </BohrTypography>
                <p class="block__description">
                  {{ $t('settings.buildDev.subtitle') }}
                </p>

                <label class="input__framework">
                  {{ $t('settings.buildDev.frameworkPreset') }}
                  <BohrSelect
                    class="settings__field"
                    v-model="selectedFramework"
                    :isLoading="isLoading"
                  >
                    <option class="disabled-option" value="" disabled>
                      {{ $t('settings.buildDev.selectFramework') }}
                    </option>
                    <option
                      v-for="framework in availableFrameworks"
                      :value="framework"
                      :key="framework"
                    >
                      {{ framework }}
                    </option>
                    <option class="disabled-option" value="" disabled>
                      {{ $t('settings.buildDev.importExisting') }}
                    </option>
                    
                    <option class=""
                      v-for="site in allProjectsCommands"
                      :value="site.name"
                      :key="site.name"
                    >
                      {{ site.name }}
                    </option>
                  </BohrSelect>
                </label>        

                <div class="build__dev__field">
                    <BohrTextField
                      id="build-command"
                      class="settings__field"
                      :label="$t('settings.buildDev.label.buildCommand')"
                      v-model="buildDevData.buildCommand"
                      :isLoading="isLoading"
                    />
                    <BohrTextField
                      id="root-directory"
                      class="settings__field"
                      :label="$t('settings.buildDev.label.rootDirectory')"
                      v-model="buildDevData.rootDirectory"
                      :isLoading="isLoading"
                    />
                    <BohrTextField
                      id="output-directory"
                      class="settings__field"
                      :label="$t('settings.buildDev.label.outputDirectory')"
                      v-model="buildDevData.outputDirectory"
                      :isLoading="isLoading"
                    />
                    <BohrTextField
                      id="install-command"
                      class="settings__field"
                      :label="$t('settings.buildDev.label.installCommand')"
                      v-model="buildDevData.installCommand"
                      :isLoading="isLoading"
                    />
                    <BohrTextField
                      id="development-command"
                      class="settings__field"
                      :label="$t('settings.buildDev.label.developmentCommand')"
                      v-model="buildDevData.developmentCommand"
                      :isLoading="isLoading"
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
                  {{ $t(`errors.${error.error}`) }} {{ varsWithError.join(', ') }}
                </BohrTypography>
              </div>
            </div>
            <div class="card__new-repo--footer">
              <div class="publish__container">
                <BohrButton 
                  size="lg"
                  @click="handleImport(repoConfiguring as RepoData)"
                  :disabled="isImporting"
                > 
                  {{$t('common.import')}}
                </BohrButton>
              </div>
            </div>
          </div>
        </div>
      </main>
    </template>

    <GithubAppModal @appInstalled="handleGetMeLoop" />

    <LoadingAnimation v-if="showCreatingProjectAnimation && !repoConfiguring"/>
  </div>
</template>

<script lang="ts">
import BackButton from '@/components/BackButton.vue';
import BohrBox from '@/components/BohrBox.vue';
import BohrButton from '@/components/BohrButton.vue';
import BohrCustomSelect from '@/components/BohrCustomSelect.vue';
import BohrIconButton from '@/components/BohrIconButton.vue';
import BohrPageTitle from '@/components/BohrPageTitle.vue';
import BohrSelect from '@/components/BohrSelect.vue';
import BohrTextField from '@/components/BohrTextField.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import EnvVarsList from "@/components/EnvVarsList.vue";
import frameworkSettingsPresets from '@/assets/frameworkSettingsPresets';
import GithubAppModal from '@/components/GithubAppModal.vue';
import GreenPlusIcon from '@/components/icons/GreenPlusIcon.vue';
import NewWIndowIcon from '@/components/icons/NewWIndowIcon.vue';
import PlusRegularIcon from '@/components/icons/PlusRegularIcon.vue';
import LoadingAnimation from '@/components/LoadingAnimation.vue';
import SkeletonLoading from '@/components/SkeletonLoading.vue';
import SubdomainDomainFields from "@/components/SubdomainDomainFields.vue";
import { getAvailableDomains, getOverview, getRepoList, getProjectsCommands, requestRepoImport } from '@/services/api';
import ToastService from '@/services/ToastService';
import { Domain, SiteEnvVarField, SiteImportBuildDevData, SiteBuildDevData } from '@/types';
import { defineComponent, toRaw } from 'vue';

type RepoData = { owner: string, name: string, private: boolean, imported: boolean }
const blankBuildDevData = (): SiteBuildDevData => ({
  framework: '',
  buildCommand: '',
  rootDirectory: '',
  outputDirectory: '',
  installCommand: '',
  developmentCommand: '',
});


export default defineComponent({
  components: {
    BackButton,
    BohrBox,
    BohrCustomSelect,
    BohrIconButton,
    BohrButton,
    BohrPageTitle,
    BohrSelect,
    BohrTextField,
    BohrTypography,
    PlusRegularIcon,
    LoadingAnimation,
    SkeletonLoading,
    GithubAppModal,
    GreenPlusIcon,
    NewWIndowIcon,
    SubdomainDomainFields,
    EnvVarsList,
  },
  data(): {
    repos: RepoData[]
    owner: string
    searchInput: string
    isLoading: boolean
    isImporting: boolean
    showCreatingProjectAnimation: boolean
    repoConfiguring?: RepoData,
    subdomain: string,
    projectsCommands: any
    availableFrameworks: any
    initialBuildDevData: any
    buildDevData: any
    selectedFramework: string
    availableDomains: Domain[]
    selectedDomain: string
    environments: SiteEnvVarField[]
    buildDev: SiteImportBuildDevData
    error: null | { error: string, value: SiteEnvVarField[] }
  } {
    return {
      availableFrameworks: Object.keys(frameworkSettingsPresets).sort(),
      initialBuildDevData: blankBuildDevData(),
      buildDevData: blankBuildDevData(),
      selectedFramework: '',      
      projectsCommands: getProjectsCommands(),
      repos: [],
      owner: '',
      searchInput: '',
      isLoading: true,
      isImporting: false,
      showCreatingProjectAnimation: false,
      repoConfiguring: undefined,
      subdomain: "",
      availableDomains: [] as Domain[],
      selectedDomain: "bohr.io",
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
      ],
      error: null,
    };
  },
  computed: {
    username() {
      return this.$store.state.me?.username || '';
    },

    orgsWithApp(){
      return this.$store.state.me?.orgsWithApp || [];
    },

    ownerOptions() {
      return this.orgsWithApp.map((org) => ({ value: org }));
    },

    options() {
      return Array.from(this.repos.reduce((options, cur) => options.add(cur.owner), new Set()));
    },

    reposOnDisplay() {
      return this.repos.filter(({ owner, name }) => this.owner === owner && name.match(new RegExp(this.searchInput, 'i')));
    },

    allProjectsCommands() {
      return this.projectsCommands;
    },

    scoping(){
      return this.owner ? this.owner : (localStorage.getItem('sitesFilter') || this.username);
    },

    bohrGithubAppLink() {
      return window.location.host === 'bohr.io' 
        ? "https://github.com/apps/bohr-io/installations/new/"
        : "https://github.com/apps/bohr-rocks/installations/new/";
    },

    repoUrl() {
      return this.repoConfiguring
        ? `https://github.com/${ this.repoConfiguring.owner }/${ this.repoConfiguring.name }`
        : "";
    },

    buildVars() {
      return this.buildDevData;
    },

    varsWithError() {
      if (!Array.isArray(this.error?.value)) {
        return;
      }

      return this.error?.value?.map(({ key }) => key);
    }
  },
  watch: {
    selectedFramework() {
      if (this.selectedFramework in frameworkSettingsPresets) {
        this.buildDevData = {
          framework: this.selectedFramework,
          ...frameworkSettingsPresets[this.selectedFramework as keyof typeof frameworkSettingsPresets],
        };
        return;
      } else {
        let project:any =  Object.values(toRaw(this.projectsCommands)).find((project:any) => project.name === this.selectedFramework);
        if(project){
          this.buildDevData = {
            framework: '',
            buildCommand: project.commands.build_command,
            developmentCommand: project.commands.development_command,
            installCommand: project.commands.install_command,
            outputDirectory: project.commands.output_directory,
            rootDirectory: project.commands.root_directory,
          }
          return;
        }
      }
      this.buildDevData = blankBuildDevData();
    }
  },
  created() {
    this.getRepoList(); 
    this.getProjectsCommands();
    this.getAvailableDomains();
    const selectedFilter = localStorage.getItem('sitesFilter');
    const owner = selectedFilter && selectedFilter !== 'all' ? selectedFilter : this.username;
    this.owner = this.orgsWithApp.includes(owner) ? owner : '';
  },
  methods: {
    async getProjectsCommands() {
      const { data } = await getProjectsCommands();
      this.projectsCommands = data;
    },
    async getRepoList() {
      const { data } = await getRepoList();
      this.repos = data;
      this.isLoading = false;
    },

    handleGetSiteLoop(org: any, project: any){
      setTimeout(async ()=> {
        const { status } = await getOverview(org, project);
        
        if( status === 200){
          return this.$router.push({
            name: 'ProjectOverview',
            params: {
              org: org,
              project: project,
            }
          })
        }

        return this.handleGetSiteLoop(org, project)
      }, 1000)
    },

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

    handleImportConfigure(repo: RepoData) {
      this.repoConfiguring = repo;
    },

    async getAvailableDomains() {
      const { data } = await getAvailableDomains();

      if (data) {
        this.availableDomains = data;
      }
    },    

    async handleImport(repo: RepoData) {
      const populateEnvironmentVariables = async (buildDevArray: any) => {
        let parsedVars:any = [];
        buildDevArray.map((variable:any) => {
          switch (variable.key) {
            case "framework":
              parsedVars.push({key: 'framework', value: variable.value})
              break;
            case "buildCommand":
              parsedVars.push({key: 'BUILD_CMD', value: variable.value})
              break;
            case "rootDirectory":
              parsedVars.push({key: 'PUBLIC_PATH', value: variable.value})
              break;
            case "installCommand":
              parsedVars.push({key: 'INSTALL_CMD', value: variable.value})
              break;
            case "outputDirectory":
              parsedVars.push({key: 'DEPLOY_PATH', value: variable.value})
              break;
            case "developmentCommand":
              parsedVars.push({key: 'DEV_CMD', value: variable.value})
              break;
            default:
              break;
          }
        });
        return parsedVars;
      };  

      this.error = null;
      this.isImporting = true;

      const buildDevArray = Object.entries(this.buildVars)
        .map((([key, value]) => ({ key, value})))
        .filter(({ value }) => !!value);

      const parsedVariables: any = await populateEnvironmentVariables(buildDevArray)
      const environmentVars:any = [...this.environments, ...parsedVariables];
      
      const { error } = await requestRepoImport(repo.owner, repo.name, this.selectedDomain, this.subdomain, environmentVars);
      this.isImporting = false;
      
      this.showCreatingProjectAnimation = true;
      this.repoConfiguring = undefined;

      if (error) {
        this.repoConfiguring = repo;
        this.showCreatingProjectAnimation = false;

        if (['1001', '1003'].includes(error.error)) {
          this.error = error;
          return;
        }

        const errorMessageKeyPath = error.code
            ? `importRepository.error.${error.code}`
            : 'importRepository.error.generic';
          
        ToastService.error(this.$t(errorMessageKeyPath));
      } else {
        this.handleGetSiteLoop(repo.owner , repo.name)
      }

    },

    handleGetMeLoop(){
      setTimeout(async ()=> {
        await this.$store.dispatch('getMe');

        if(this.orgsWithApp?.includes(this.username as string)){
          this.owner = this.username;
          this.getRepoList();
          return;
        }

        return this.handleGetMeLoop();
      }, 500);
    },
  }
  
})

</script>

<style scoped>
.import__page {
  display: flex;
  flex-direction: column;
  max-width: 1056px;
  margin-inline: auto;
}

.import__header {
  margin-bottom: 32px;
}

.import__box {
  padding: 36px;
}

.disabled-option {
  font-size: 18px;
  font-weight: 600; 
  color: hsla(0, 0%, 40%, 1) !important; 
}

.filter__options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 16px;
}

.owner__field {
  font-size: 0;
}

.owner__label {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 8px;
  text-transform: uppercase;
}
.input__framework {
  display: flex;
  flex-direction: column;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px;
  margin-bottom: 15px;
}

.input__framework .bohr__select__container {
  margin-top: 8px;  
}

:deep(.settings__field) {
  width: 100%;
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

.repo__list {
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
  max-height: 400px;
  overflow-y: scroll;
}

.build__dev__field {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* width */
.repo__list::-webkit-scrollbar {
  width: 4px;
}

/* Track */
.repo__list::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* Handle */
.repo__list::-webkit-scrollbar-thumb {
  background-color: hsla(0, 0%, 75%, 1);
  border-radius: 10px;
}

.repo__card {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.repo__card + .repo__card {
  border-top: 0.1px solid hsla(0, 0%, 100%, 0.1);
}

.imported__link {
  margin-left: auto;
}

.no__repos {
  margin-block: 20px 30px;
}

.import__video {
  margin-top: 50px;
}

.video__container {
  width: max-content;
  margin-top: 50px;
  margin-inline: auto;
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

.template__title {
  margin-bottom: 16px;
}

.domain__title,
.block__title {
  margin: 40px 0 16px;
}
.block__description {
  font-size: 14px;
  line-height: 16px;
  margin: 0 0 16px;
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

.publish__container {
  display: flex;
  justify-content: center;
  margin: auto;
}
</style>
