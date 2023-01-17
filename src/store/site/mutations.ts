import { MutationTree } from 'vuex';
import { initialStoreSiteStateFactory, StoreSiteState } from '.';

export const mutations: MutationTree<StoreSiteState> = {
  allowSiteMutations(state) {
    state.isSiteMutationsAllowed = true;
  },

  setData(state, payload) {
    if (!state.isSiteMutationsAllowed) return;

    state.data = payload;
  },

  setContext(state, payload: string) {
    if (!state.isSiteMutationsAllowed) return;

    state.contextId = payload;
  },

  setDeployGroup(state, payload) {
    if (!state.isSiteMutationsAllowed) return;

    state.deployGroup = payload;
  },

  setOrgSite(state, payload: { org: string, site: string }) {
    if (!state.isSiteMutationsAllowed) return;

    state.org = payload.org;
    state.site = payload.site;
  },

  setSettings(state, payload) {
    if (!state.isSiteMutationsAllowed) return;

    if (!state.data) return;
    state.data.settings = payload;
  },

  setSelectedPreview(state, payload) {
    if (!state.isSiteMutationsAllowed) return;

    state.selectedPreview = payload;
  },

  setPreviewOptions(state, payload) {
    if (!state.isSiteMutationsAllowed) return;

    state.previewOptions = payload;
    if (!state.selectedPreview) {
      state.selectedPreview = {
        type: 'BRANCH',
        name: payload.BRANCH[0].name,
      }
    }
  },

  setOthersOnPreview(state, payload) {
    state.othersOnPreview = payload;
  },

  setHasEditablePreview(state, payload) {
    state.hasEditablePreview = payload;
  },

  reset(state) {
    Object.assign(state, initialStoreSiteStateFactory());
  },

  clearSiteData(state) {
    state.data = undefined;
  },
};
