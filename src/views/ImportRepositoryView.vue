<template>
  <div>
    <div v-if="!showCreatingProjectAnimation" class="import__page">
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
                :options="orgsWithApp"
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
              <BohrButton @click="handleImport(repo)" :disabled="isImporting">
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

    <GithubAppModal @appInstalled="handleGetMeLoop" />

    <LoadingAnimation v-if="showCreatingProjectAnimation"/>
  </div>
</template>

<script lang="ts">
import BackButton from '@/components/BackButton.vue';
import BohrBox from '@/components/BohrBox.vue';
import BohrButton from '@/components/BohrButton.vue';
import BohrCustomSelect from '@/components/BohrCustomSelect.vue';
import BohrPageTitle from '@/components/BohrPageTitle.vue';
import BohrTextField from '@/components/BohrTextField.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import GithubAppModal from '@/components/GithubAppModal.vue';
import PlusRegularIcon from '@/components/icons/PlusRegularIcon.vue';
import LoadingAnimation from '@/components/LoadingAnimation.vue';
import SkeletonLoading from '@/components/SkeletonLoading.vue';
import { getOverview, getRepoList, requestRepoImport } from '@/services/api';
import ToastService from '@/services/ToastService';
import { defineComponent } from 'vue';

type RepoData = { owner: string, name: string, private: boolean }

export default defineComponent({
  components: {
    BackButton,
    BohrBox,
    BohrCustomSelect,
    BohrButton,
    BohrPageTitle,
    BohrTextField,
    BohrTypography,
    PlusRegularIcon,
    LoadingAnimation,
    SkeletonLoading,
    GithubAppModal
  },
  data() {
    return {
      repos: [] as RepoData[],
      owner: '',
      searchInput: '',
      isLoading: true,
      isImporting: false,
      showCreatingProjectAnimation: false,
    };
  },
  computed: {
    username() {
      return this.$store.state.me?.username || '';
    },

    orgsWithApp(){
      return this.$store.state.me?.orgsWithApp || [];
    },
    options() {
      return Array.from(this.repos.reduce((options, cur) => options.add(cur.owner), new Set()));
    },

    reposOnDisplay() {
      return this.repos.filter(({ owner, name }) => this.owner === owner && name.match(new RegExp(this.searchInput, 'i')));
    },

    scoping(){
      return this.owner ? this.owner : (localStorage.getItem('sitesFilter') || this.username);
    },

    bohrGithubAppLink() {
      return window.location.host === 'bohr.io' 
        ? "https://github.com/apps/bohr-io/installations/new/"
        : "https://github.com/apps/bohr-rocks/installations/new/";
    },
  },
  created() {
    this.getRepoList();

    const selectedFilter = localStorage.getItem('sitesFilter');
    const owner = selectedFilter && selectedFilter !== 'all' ? selectedFilter : this.username;
    this.owner = this.orgsWithApp.includes(owner) ? owner : '';
  },
  methods: {
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
      }, 500)
    },

    async handleImport(repo: RepoData) {
      this.isImporting = true;
      const { error } = await requestRepoImport(repo.owner, repo.name);
      this.isImporting = false;

      this.showCreatingProjectAnimation = true;

      if (error) {
        this.showCreatingProjectAnimation = false;

        if (typeof error.code === 'number' || typeof error.code === 'string') {
          ToastService.error(this.$t(`importRepository.error.${error.code}`));
          return;
        }

        ToastService.error(this.$t('importRepository.error.generic'));
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
  margin-bottom: 137px;
}

.import__box {
  padding: 36px;
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
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.repo__card + .repo__card {
  border-top: 0.1px solid hsla(0, 0%, 100%, 0.1);
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
</style>
