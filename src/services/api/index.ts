import { SiteEnvVarField, TemplateData } from '@/types';
import bohrFetch from '@/utils/bohrFetch';

type CreateAnalyticsQueryData = {
  orgName: string
  repoName: string
  name: string
  query: string
  chartSettings: {
    viewType: 'chart' | 'table'
    optionsGenerator: string
  }
}

export async function createAnalyticsQuery(analyticsQueryData: CreateAnalyticsQueryData) {
  const bohrRes = await bohrFetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify({
      ...analyticsQueryData,
      chartSettings: JSON.stringify(analyticsQueryData.chartSettings),
    }),
  });

  if (bohrRes.error) return bohrRes;

  bohrRes.data.chartSettings = JSON.parse(bohrRes.data.chartSettings);

  return bohrRes;
}

type NewSiteData = {
  orgName: string, 
  sampleUrl: string,
  privateRepo: boolean,
  repo: string,
  environmentVars: SiteEnvVarField[],
  domain: string,
  subdomain: string,
}

export async function createNewSite(data: NewSiteData) {
  return await bohrFetch('/api/new', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

type NewDnsData = {
  type: string,
  name: string,
  content: string,
  ttl: string,
}

export async function createDns(domain: string, dnsData: NewDnsData) {
  return await bohrFetch('/api/dns', {
    method: 'POST',
    body: JSON.stringify({
      domain,
      ...dnsData,
      ttl: Number(dnsData.ttl),
    }),
  });
}

export async function createDomain(username: string, name: string) {
  return await bohrFetch('/api/domain', {
    method: 'POST',
    body: JSON.stringify({
      username,
      name,
    }),
  });
}

export async function deleteAnalyticsQuery(queryId: string) {
  return await bohrFetch(`/api/analytics/${queryId}`, {
    method: 'DELETE',
  });
}

export async function deleteDns(id: string) {
  return await bohrFetch(`/api/dns/${id}`, {
    method: 'DELETE',
  });
}

export async function deleteDomain(domain: string) {
  return await bohrFetch(`/api/domain/${domain}`, {
    method: 'DELETE',
  })
}

type AnalyticsExecutionRequest = {
  owner: string
  project: string
  query: string
  startDate: string
  endDate: string
}

export async function executeAnalyticsQuery(data: AnalyticsExecutionRequest) {
  return await bohrFetch('/api/analytics/execute', {
    method: 'POST',
    body: JSON.stringify({
      orgName: data.owner,
      repoName: data.project,
      query: data.query,
      startDate: data.startDate,
      endDate: data.endDate,
    }),
  });
}

export async function getAnalyticsQuerys(projectId: string) {
  const bohrRes = await bohrFetch(`/api/analytics/${projectId}`);

  if (bohrRes.error) return bohrRes;

  bohrRes.data.forEach((query: any) => {
    query.chartSettings = JSON.parse(query.chartSettings);
    return bohrRes;
  })

  return bohrRes;
}

export async function getAvailableDomains() {
  return await bohrFetch('/api/domain/available');
}

export async function getDeploys(org: string, site: string) {
  return await bohrFetch(`/api/site/deploy/${org}/${site}`);
}

export async function getDeployGroup(org: string, site: string) {
  return await bohrFetch(`/api/site/deploy_group/${org}/${site}`);
}

export async function getDns(domain: string, dnsId?: string) {
  const url = dnsId ? `/api/dns/${domain}/${dnsId}` : `/api/dns/${domain}`
  return await bohrFetch(url);
}

export async function getDomains(domainName?: string) {
  const url = domainName ? `/api/domain/${domainName}` : '/api/domain';
  return await bohrFetch(url);
}

export async function getMe() {
  const bohrRes = await bohrFetch('/api/user/getMe');
  if (bohrRes.status === 401) {
    document.cookie = "BohrSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = '/login?redirect=' + window.location.href;
    return { data: null };
  }

  return bohrRes;
}

export async function getOverview(org: string, site: string) {
  return await bohrFetch(`/api/site/${org}/${site}`);
}

export async function getRandomSubDomainSlug() {
  return await bohrFetch('/api/domain/subdomainslug');
}

export async function getSiteSettings(org: string, site: string, deployGroupId?: string) {
  const url = deployGroupId
    ? `/api/site/settings/${org}/${site}?deployGroupId=${deployGroupId}`
    : `/api/site/settings/${org}/${site}`;

  const bohrRes = await bohrFetch(url);

  if (bohrRes.error) return bohrRes;

  bohrRes.data.settings = JSON.parse(bohrRes.data.settings)
  return bohrRes;
}

export async function getTemplates() {
  const bohrRes = await bohrFetch<TemplateData[]>('/api/site/template');

  if (bohrRes.error) {
    return bohrRes
  }

  const parsedData = bohrRes.data?.map((template) => ({
    ...template,
    tags: JSON.parse(template.tags),
  }));

  bohrRes.data = parsedData || null;

  return bohrRes;
}

export async function getTemplateData(repoName: string) {
  const bohrRes = await bohrFetch(`/api/site/template/${repoName}`);

  if (bohrRes.error) return bohrRes;

  bohrRes.data.settings = JSON.parse(bohrRes.data.settings)
  return bohrRes;
}

export async function getRepoList() {
  return await bohrFetch('/api/repository');
}

export async function getUserMainProject() {
  return await bohrFetch<{ mainSite: { name: string, id: string } }>('/api/user/mainSite');
}

export async function getUserOwnProjects() {
  return await bohrFetch<{ sites: { name: string, id: string }[] }>('/api/user/sites');
}

export async function getUserToken() {
  return await bohrFetch('/api/user/token');
}

export async function requestDeleteAccount() {
  return await bohrFetch('/api/user/delete', {
    method: 'DELETE',
  });
}

export async function requestRepoImport(owner: string, repo: string, domain: string, subdomain: string, environmentVars: SiteEnvVarField[]) {
  return await bohrFetch('/api/site/import', {
    method: 'PUT',
    body: JSON.stringify({
      orgName: owner,
      repoName: repo,
      domain,
      subdomain,
      environmentVars
    })
  });
}

type UpdateAnalyticsQueryData = {
  orgName: string
  repoName: string
  name: string
  query: string
  chartSettings: {
    viewType: 'chart' | 'table'
    optionsGenerator: string
  }
  queryId: string
  isDefault: boolean
}

export async function updateAnalyticsQuery(analyticsQueryData: UpdateAnalyticsQueryData) {
  return await bohrFetch('/api/analytics/', {
    method: 'PATCH',
    body: JSON.stringify({
      ...analyticsQueryData,
      chartSettings: JSON.stringify(analyticsQueryData.chartSettings),
    }),
  })
}

type UpdateDnsData = {
  id: string,
  name: string,
  content: string,
  ttl: string,
}

export async function updateDns(dnsData: UpdateDnsData) {
  return await bohrFetch(`/api/dns/${dnsData.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      ...dnsData,
      ttl: Number(dnsData.ttl)
    }),
  });
}

type UpdateUserEmailData = {
  email: string
  receiveNews?: boolean
}

export async function updateUserEmail(data: UpdateUserEmailData) {
  return await bohrFetch('/api/user/email', {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export async function updateUserMainProject(projectId: string) {
  return await bohrFetch('/api/user/mainSite', {
    method: 'PUT',
    body: JSON.stringify({
      siteId: projectId,
    }),
  });
}

export async function validateSubdomain(domain: string, subdomain: string) {
  const url = `/api/domain/is_available?domain=${domain}&subdomain=${subdomain}`;
  return await bohrFetch(url);
}
