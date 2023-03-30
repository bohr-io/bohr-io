import { BaseUserMeta, Others } from '@liveblocks/client'
import { Plan } from '@prisma/client'
export type Me = {
  username: string
  name: string
  avatarUrl: string
  orgs: Org[]
  orgsWithApp: Org[]
  sites: Site[]
  plan: Plan;
  email: string
}

export type Org = string

export type Site = {
  name: string
  url: string
  org: string
  favicon: string
  blurhashSettings: {
    blurhash: string
    width: number
    heigth: number
    punch: number
  }
}

export type ToastData = {
  id: string
  message: string
  type: 'success' | 'warn' | 'error' | 'tip'
  action?: {
    function: () => void
    text: string
  }
}

export type StoreRootState = {
  me: Me | null
  lastMe: number
  theme: {
    default: string
    selected: string
  }
  preview: boolean
  toastData: ToastData[] | null
  appLocale: string
  isLoading: boolean
  isSaving: boolean
  isProdEnv: boolean
  globalPresenceOther?: Others<{}, BaseUserMeta & { info: UserPresenceInfo }>
}

export type SiteEnvVarField = {
  key: string
  value: string
  isSecret?: boolean
}

export type SiteBasicAuthField = {
  username: string
  password: string
}

export type SiteBuildDevData = {
  framework: string
  buildCommand: string
  rootDirectory: string
  outputDirectory: string
  installCommand: string
  developmentCommand: string
}

export type SiteAuthType = 'none' | 'basic' | 'oauth'

export type DeployType = 'BRANCH' | 'PR' | 'TAG'

export type DeployGroup = {
  deployId: string
  hash: string
  id: string
  name: string
  status: string
  type: DeployType
  url: string
  liveUrl?: string
  updatedAt: string
  userName: string
  githubActionsRunId: string
}

export type LocalhostData = {
  userName: string
  userImage: string
  deployGroupName: string
  hash: string
  deployGroupUpdatedAt: string
  updatedAt: string
  status: string
  url: string
}

export type SitePreviewData = {
  name: string
  url: string
  liveUrl: string
  type: string
  status: string
}

export type PreviewLayout = 'desktop' | 'tablet' | 'phone' | 'fun'

export type Locale = 'en-US' | 'pt-BR'

export type Dns = {
  id: string
  name: string
  type: string
  content: string
  ttl: number
  priority: number
  proxied: boolean
  domain: string
}

export type Domain = {
  id: string
  name: string
  username: string
  status: string
  faviconUrl?: string
  nameServers?: string[]
}

export type UserPresenceInfo = {
  username: string
  avatarUrl: string
  mainSiteUrl: string
}

export type TemplateData = {
  name: string
  url: string
  tags: string
  settings: string
  imageUrl: string
  githubUrl: string
  description: string
  readmeContent: string
  createdBy: string
  createdAt: Date
  commingSoon: boolean
}

export type ValidationStatus = '' | 'error' | 'warn' | 'success'
