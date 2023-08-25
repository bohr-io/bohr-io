import { StoreRootState } from '@/types';
import cloneDeep from '@/utils/cloneDeep';
import { GetterTree } from 'vuex';
import { StoreSiteState } from '.';

export const getters: GetterTree<StoreSiteState, StoreRootState> = {
  data(state) {
    return state.data;
  },

  mainBranch(state) {
    return state.data?.settings.general.main_branch;
  },

  domainUrl(state) {
    return cloneDeep(state.data?.url);
  },

  contextId(state) {
    return cloneDeep(state.contextId);
  },

  projectId(state) {
    return cloneDeep(state.data?.id);
  },

  deployGroup(state) {
    return cloneDeep(state.deployGroup);
  },

  selectedPreviewData(state) {
    const { selectedPreview, previewOptions } = state;
    if (!selectedPreview) return;
    const selectedTypeArr = previewOptions?.[selectedPreview.type.toUpperCase()];
    const selectedData = selectedTypeArr?.find(({ name }) => name === selectedPreview.name);
    return cloneDeep(selectedData);
  },

  previewOptions(state) {
    return cloneDeep(state.previewOptions);
  },

  othersOnPreview(state) {
    return cloneDeep(state.othersOnPreview);
  },

  hasEditablePreview(state) {
    return state.hasEditablePreview;
  },
};
