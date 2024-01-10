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
  email: string;
  linkedin: string;
  isAdmin: boolean;
}

export type Projects = {
  orgs?: Org[]
  orgsWithApp?: Org[]
  sites?: Site[]
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
  lastDevsOther?: Others<{}, BaseUserMeta & { info: LastDevsInfo }>
  finishedAuthRequest: boolean,
  isOverviewDeployPreview: boolean,
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

export type SiteImportBuildDevData = {
  BUILD_CMD: string
  PUBLIC_PATH: string
  INSTALL_CMD: string
  DEV_CMD: string
  DEPLOY_PATH: string
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
  domain: string,
  type: string,
  name?: string,
  priority?: any,
  content?: string,
  ttl: number,
  proxied: boolean,
  data?: {
    protocol?: string,
    digestType?: string,
    type?: string,
    name?: string,
    priority?: any,
    key_tag?: string,
    algorithm?: string,
    certificate?: string,
    target?: string,
    flags?: string,
    public_key?: string,
    digest?: string,
    value?: string,
    order?: string,
    preference?: string,
    service?: string,
    regex?: string,
    replacement?: string,
    nameserver?: string,
    usage?: string,
    selector?: string,
    matching_type?: string,
    weight?: string,
    port?: string,
    fingerprint_type?: string,
    fingerprint?: string,
    lat_degrees?: string,
    lat_minutes?: string,
    lat_seconds?: string,
    lat_direction?: string,
    long_degrees?: string,
    long_minutes?: string,
    long_seconds?: string,
    long_direction?: string,
    precision_horz?: string,
    precision_vert?: string,
    altitude?: string,
    size?: string,
  }
}

export interface NewDnsData {
  type?: string;
  name?: string;
  priority?: any;
  content?: string;
  ttl?: string;
  proxied?: boolean;
  data?: {
    digest_type?: any,
    protocol?: any;
    content?: any;
    proto?: any;
    digestType?: any;
    type?: any;
    name?: any;
    priority?: any;
    key_tag?: any;
    algorithm?: any;
    certificate?: any;
    target?: any;
    flags?: any;
    public_key?: any;
    digest?: any;
    value?: any;
    order?: any;
    preference?: any;
    service?: any;
    regex?: any;
    replacement?: any;
    nameserver?: any;
    usage?: any;
    selector?: any;
    matching_type?: any;
    weight?: any;
    port?: any;
    fingerprint?: any;
    lat_degrees?: any;
    lat_minutes?: any;
    lat_seconds?: any;
    lat_direction?: any;
    long_degrees?: any;
    long_minutes?: any;
    long_seconds?: any;
    long_direction?: any;
    precision_horz?: any;
    precision_vert?: any;
    altitude?: any;
    size?: any;
  }
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

export type LastDevsInfo = {
  username: string
  avatarUrl: string
  plan: string
  mainSiteUrl: string
  githubUrl: string
  linkedinUrl: string
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

export type Project = {
  commitAuthor: string
  commitDate: string
  commitMessage: string
  commitUrl: string
  createdAt: Date
  createdBy: string
  favicon: string
  githubUrl: string
  imageUrl: string
  name: string
  stars: number
  url: string
}

export type ValidationStatus = '' | 'error' | 'warn' | 'success'
