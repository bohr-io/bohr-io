import { DeployGroup, DeployType, SiteBasicAuthField, SiteEnvVarField, SitePreviewData, StoreRootState } from '@/types';
import { Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';

type StoreSiteSettings = {
  auth: {
    type: string
    basic?: SiteBasicAuthField[]
    oauth?: {
      provider: string
      client_id: string
      secret: string
    }
  }
  vars: SiteEnvVarField[]
  commands: {
    framework: string
    build_command: string
    root_directory: string
    output_directory: string
    install_command: string
    development_command: string
  }
  general: {
    node_version: string
    root_directory: string
    main_branch: string
  }
}

type StoreSiteData = {
  id: string
  userId: string
  name: string
  settings: StoreSiteSettings
  url: string
  icon: string
  createdAt: string
  updatedAt: string
}

export type StoreSiteState = {
  isSiteMutationsAllowed: boolean
  org?: string
  site?: string
  contextId?: string
  data?: StoreSiteData
  deployGroup?: DeployGroup[]
  selectedPreview?: {
    type: DeployType | 'LOCALHOST'
    name: string
  }
  previewOptions?: Record<string, SitePreviewData[]>
  othersOnPreview: {
    connectionId: number
    presence: {
      username: string
      avatarUrl: string
    }
  }[],
  hasEditablePreview: boolean,
}

export const initialStoreSiteStateFactory = (): StoreSiteState => ({
  isSiteMutationsAllowed: false,
  org: undefined,
  site: undefined,
  contextId: undefined,
  data: undefined,
  deployGroup: undefined,
  selectedPreview: undefined,
  previewOptions: undefined,
  othersOnPreview: [],
  hasEditablePreview: false,
});

const site: Module<StoreSiteState, StoreRootState> = {
  namespaced: true,
  state: initialStoreSiteStateFactory(),
  mutations,
  actions,
  getters,
}

export default site;
