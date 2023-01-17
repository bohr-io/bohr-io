import { getDeployGroup, getSiteSettings } from '@/services/api';
import { StoreRootState } from '@/types';
import { ActionTree } from 'vuex';
import { StoreSiteState } from '.';

type GetSitePayload = {
  orgName: string
  siteName: string
  deployGroupId?: string
}

function validateSiteSettings(settings: any) {
  return [
    Boolean(settings.auth),
    Boolean(settings.commands),
    Boolean(settings.general),
    Boolean(settings.vars),
  ].every((validation) => validation === true)
}

export const actions: ActionTree<StoreSiteState, StoreRootState> = {
  reset({ commit }) {
    commit('reset');
  },

  async changeContext({ state, dispatch, commit }, payload) {
    if (!state.org || !state.site) return;

    const dispatchPayload: Record<string, string> = {
      orgName: state.org,
      siteName: state.site,
    }

    if (payload && payload !== 'all') dispatchPayload.deployGroupId = payload;

    commit('clearSiteData');
    await dispatch('get', dispatchPayload);
  },

  async get({ commit }, payload: GetSitePayload) {
    const { orgName, siteName, deployGroupId } = payload;
    commit('allowSiteMutations');

    const [
      { data: settingsData, error: settingsError },
      { data: deployGroupData, error: deployGroupError },
    ] = await Promise.all([
      getSiteSettings(orgName, siteName, deployGroupId),
      getDeployGroup(orgName, siteName),
    ]);

    if (settingsError || deployGroupError) {
      throw new Error('failed to get site data');
    }

    const isValidSiteSettings = validateSiteSettings(settingsData.settings);
    const isValidSiteName = siteName === (deployGroupId ? settingsData.siteName : settingsData.name);

    if (!isValidSiteName || !isValidSiteSettings) {
      throw new Error('failed to get site data');
    }    

    if (
      settingsData.settings.auth?.basic && !Array.isArray(settingsData.settings.auth.basic)
    ) {
      settingsData.settings.auth.basic = [settingsData.settings.auth.basic];
    }

    const context = settingsData.siteId ? settingsData.id : undefined;

    commit('setOrgSite', { org: orgName, site: siteName });
    commit('setContext', context);
    commit('setDeployGroup', deployGroupData);
    commit('setData', settingsData);
  },
}
