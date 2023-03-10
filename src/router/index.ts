import { createRouter, createWebHistory } from 'vue-router';
import AppInstalledView from '../views/AppInstalledView.vue';
import CreateRepositoryView from '../views/CreateRepositoryView.vue';
import ImportRepositoryView from '../views/ImportRepositoryView.vue';
import DomainsView from '../views/Domains/DomainsView.vue';
import NewDomainView from '../views/Domains/NewDomainView.vue';
import DomainDetailView from '../views/Domains/DomainDetailView.vue';
import DnsDetailView from '../views/Domains/DnsDetailView.vue';
import HelpView from '../views/HelpView.vue';
import HomeView from '../views/HomeView.vue';
import NewView from '../views/NewView.vue';
import NewSiteView from '../views/NewSiteView.vue';
import OrgSettingsView from '../views/OrgSettings/OrgSettingsView.vue';
import OrgSettingsGeneralView from '../views/OrgSettings/OrgSettingsGeneralView.vue';
import ProfileView from '../views/ProfileView.vue';
import SiteDeploysView from '../views/Site/SiteDeploysView.vue';
import SiteOverviewView from '../views/Site/OverviewView.vue';
import SiteView from '../views/Site/SiteView.vue';
import SiteAnalyticsView from '../views/Site/SiteAnalyticsView.vue';
import SiteFilesView from '../views/Site/SiteFilesView.vue';
import SiteLogsView from '../views/Site/SiteLogsView.vue';
import SiteApiView from '../views/Site/SiteApiView.vue';
import SiteSettingsView from '../views/Site/SiteSettings/SiteSettingsView.vue';
import SiteSettingsAuthView from '../views/Site/SiteSettings/SiteSettingsAuthView.vue';
import SiteSettingsBuildDevView from '../views/Site/SiteSettings/SiteSettingsBuildDevView.vue';
import SiteSettingsDomainView from '../views/Site/SiteSettings/SiteSettingsDomainView.vue';
import SiteSettingsEnvVariablesView from '../views/Site/SiteSettings/SiteSettingsEnvVariablesView.vue';
import SiteSettingsGeneralView from '../views/Site/SiteSettings/SiteSettingsGeneralView.vue';
import SitesView from '../views/SitesView.vue';

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
    meta: { spotlightYPosition: '800px' },
  },
  {
    path: '/projects',
    name: 'Projects',
    component: SitesView,
  },
  {
    path: '/projects/new',
    name: 'New',
    component: NewView,
    meta: { mainBarPath: 'Projects' },
  },
  {
    path: '/newProject',
    name: 'NewProject',
    component: NewSiteView,
    meta: { mainBarPath: 'Projects' },
  },
  {
    path: '/domains',
    name: 'Domains',
    component: DomainsView,
    meta: { mainBarPath: 'Domains', helpLinkTopic: 'domains' },
  },
  {
    path: '/domains/new',
    name: 'NewDomain',
    component: NewDomainView,
    meta: { mainBarPath: 'Domains', isThinMainBar: true }
  },
  {
    path: '/domains/:domain',
    name: 'DomainDetail',
    component: DomainDetailView,
    meta: { mainBarPath: 'Domains', isThinMainBar: true }
  },
  {
    path: '/domains/:domain/:dns',
    name: 'DnsDetail',
    component: DnsDetailView,
    meta: { mainBarPath: 'Domains', isThinMainBar: true }
  },
  {
    path: '/help',
    name: 'Help',
    component: HelpView,
  },
  {
    path: '/$profile',
    name: 'Profile',
    component: ProfileView,
  },
  {
    path: '/:org/$settings',
    name: 'OrgSettings',
    component: OrgSettingsView,
    children: [
      { path: '', name: 'OrgSettingsGeneral', component: OrgSettingsGeneralView },
    ],
  },
  {
    path: '/createRepository',
    name: 'CreateRepository',
    component: CreateRepositoryView,
    meta: { routename: 'create repository', mainBarPath: 'Projects' },
  },
  {
    path: '/projects/new/import',
    name: 'ImportRepository',
    component: ImportRepositoryView,
    meta: { mainBarPath: 'Projects' },
  },
  
  {
    path: '/:org/:project',
    name: 'Project',
    component: SiteView,
    meta: { mainBarPath: 'Projects', isThinMainBar: true },
    children: [
      {
        path: '',
        name: 'ProjectOverview',
        component: SiteOverviewView,
        meta: { pageName: 'overview' },
      },
      {
        path: 'preview/:deployGroupType/:deployName',
        name: 'ProjectPreview',
        component: SiteOverviewView,
        meta: { pageName: 'overview' },
      },
      {
        path: '/:org/:project/$deploys',
        name: 'ProjectDeploys',
        component: SiteDeploysView,
        meta: { pageName: 'deploys' },
      },
      {
        path: '/:org/:project/analytics',
        name: 'ProjectAnalytics',
        component: SiteAnalyticsView,
        meta: { pageName: 'analytics' },
      },
      {
        path: '/:org/:project/files',
        name: 'ProjectFiles',
        component: SiteFilesView,
        meta: { pageName: 'files' },
      },
      {
        path: '/:org/:project/logs',
        name: 'ProjectLogs',
        component: SiteLogsView,
        meta: { pageName: 'logs', helpLinkTopic: 'logs' },
      },
      {
        path: '/:org/:project/api',
        name: 'ProjectApi',
        component: SiteApiView,
        meta: { pageName: 'api' },
      },
      {
        path: '/:org/:project/$settings',
        name: 'ProjectSettings',
        component: SiteSettingsView,
        meta: { pageName: 'settings', helpLinkTopic: 'projectSettings' },
    
        children: [
          { path: '', name: 'ProjectSettingsGeneral', component: SiteSettingsGeneralView, meta: { hideContextSelector: true } },
          { path: '$domain', name: "ProjectSettingsDomain", component: SiteSettingsDomainView },
          { path: '$environment-variables', name: "ProjectSettingsEnvVariables", component: SiteSettingsEnvVariablesView },
          { path: '$build-&-development', name: "ProjectSettingsBuildDev", component: SiteSettingsBuildDevView },
          { path: '$authentication', name: "ProjectSettingsAuth", component: SiteSettingsAuthView },
        ],
      },
    ],
  },
  {
    path: '/appInstalled',
    name: 'AppInstalled',
    component: AppInstalledView,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
})

export default router
