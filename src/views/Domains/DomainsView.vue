<template>
  <div class="domains__page">
    <header class="domains__header">
      <div>
        <BohrPageTitle :pageName="$tc('common.domain', 2)" />
        <BohrTypography tag="p" class="domains__subtitle">{{ $t('domains.subtitle') }}</BohrTypography>
      </div>
      <div class="domains__controls">
        <BohrCustomSelect
            v-if="filterOptions && filterOptions.length > 1"
            id="account-context-select"
            :aria-label="$t('common.account')"
            v-model="selectedFilter"
            :options="[
              { label: $t('projects.allAccounts'), value: 'all' },
              ...filterOptions.map((a) => ({ value: a })),
            ]"
          />
      </div>
      
    </header>
   
    <main class="domains__main">
      <ul class="domains__list">
        <li>
          <router-link
            class="add__button"
            :to="{ name: 'NewDomain' }"
          >
            <PlusIcon isGradient />  
            <BohrTypography variant="title3" class="add__text">
              {{ $t('domains.addLabel') }}
            </BohrTypography>
          </router-link>
        </li>        

        <template v-if="isFetchingData">
          <DomainCard v-for="placeholder in 3" :key="placeholder" isPlaceholder />
        </template>        

        <DomainCard v-for="domain in domains" :key="domain.id" :domain="domain" />
      </ul>
    </main>
  </div>
</template>

<script lang="ts">
import BohrCustomSelect from '@/components/BohrCustomSelect.vue';
import BohrPageTitle from '@/components/BohrPageTitle.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import DomainCard from '@/components/DomainCard.vue';
import PlusIcon from '@/components/icons/PlusIcon.vue';
import { getDomains } from '@/services/api';
import toastService from '@/services/ToastService';
import { Domain } from '@/types';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    BohrCustomSelect,
    BohrPageTitle,
    BohrTypography,
    PlusIcon,
    DomainCard,
},
  data() {
    return {
      isPlaceholder: location.hostname === 'bohr.io',
      rawDomains: [] as Domain[],
      isFetchingData: true,
      selectedFilter: localStorage.getItem('sitesFilter') || 'all',
    };
  },
  created() {
      this.getDomains();
  },
  watch: {
    selectedFilter() {
      localStorage.setItem('sitesFilter', this.selectedFilter);
    },
  },
  computed:{
    filterOptions() {
      return this.$store.state.me?.orgs;
    },

    domains(){
      if(!this.rawDomains) return [];
      if(this.selectedFilter === 'all') return this.rawDomains;
      return this.rawDomains.filter(({ username }) => username === this.selectedFilter)
    }
  },
  methods: {
    async getDomains() {
      const { data, error } = await getDomains();

      this.isFetchingData = false;

      if (error) {
        toastService.error(this.$t('domains.loadFail'));
        return;
      }

      this.rawDomains = data;
    },
  },
})
</script>

<style scoped>
.domains__page {
  display: flex;
  flex-direction: column;
  max-width: 1056px;
  margin-inline: auto;
}

.domains__header{
  display: flex;
  justify-content: space-between;
}

.domains__controls{
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
}

.domains__subtitle {
  margin-top: 24px;
  margin-bottom: 54px;
}

.domains__list {
  --columns: 1;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: 16px;
  padding: 0;
  margin-block: 60px 0;
}

.add__button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 207px;
  padding: 8px;
  background-color: hsla(0, 0%, 0%, 0.25);
  border-radius: 4px;
  border: 2px dashed hsl(0, 100%, 100%, 0.2);
  cursor: pointer;
  transition: box-shadow var(--transition);
  color: inherit;
}

.add__button:focus,
.add__button:hover {
  box-shadow: 0px 12px 36px 0px rgba(255, 0, 13, 0.3);
}

.add__button::before,
.add__button::before {
  content: "";
  opacity: 0;
  transition: opacity var(--transition);
  position: absolute;
  inset: -2px;
  z-index: 2;
  border-radius: 4px;
  border: 2px solid transparent;
  background-image: linear-gradient(0deg, #E84856, #F16622, #F4CD3B); 
  background-origin: border-box;
  pointer-events: none;

  -webkit-mask: linear-gradient(#fff 0 0) padding-box,
                linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) padding-box,
                linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude; 
}

.add__button:focus::before,
.add__button:hover::before {
  opacity: 1;
}

.no__domains {
  display: grid;
  place-content: center;
  height: 207px;
}

@media screen and (max-width: 767px){
  .domains__header{
    flex-direction: column;
  }
}

@media screen and (min-width:768px) {
  .domains__list {
    --columns: 2;
  }
}

@media screen and (min-width:992px) {
  .domains__list {
    --columns: 3;
  }
}

@media screen and (min-width:1200px) {
  .domains__list {
    --columns: 4;
  }
} 
</style>
