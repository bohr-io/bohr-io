import { SiteEnvVarField, TemplateData } from '@/types';
import bohrFetch from '@/utils/bohrFetch';

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
    window.location.href = '/'
    document.cookie = "BohrSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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

export async function requestRepoImport(owner: string, repo: string) {
  return await bohrFetch('/api/site/import', {
    method: 'PUT',
    body: JSON.stringify({
      orgName: owner,
      repoName: repo,
    })
  });
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
