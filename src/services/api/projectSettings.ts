import { SiteAuthType, SiteBasicAuthField, SiteEnvVarField } from '@/types';
import bohrFetch from '@/utils/bohrFetch';
import { getSiteSettings } from '.';

export { getSiteSettings };

export async function getProjectAuthSettings(...args: Parameters<typeof getSiteSettings>) {
  const bohrRes = await getSiteSettings(...args);

  if (bohrRes.error) {
    return bohrRes;
  }

  return {
    ...bohrRes,
    data: bohrRes.data.settings.auth,
  };
}

type UpdateProjectAuthSettings = {
  org: string
  project: string
  deployGroupId?: string
  auth: {
    type: SiteAuthType
    basic?: SiteBasicAuthField[]
    oauth?: {
      provider: string
      clientId: string
      secret: string
    }
  }
}

export async function updateProjectAuthSettings(authSettingsData: UpdateProjectAuthSettings) {
  return await bohrFetch('/api/site/settings_auth', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      siteOrg: authSettingsData.org,
      siteName: authSettingsData.project,
      deployGroupId: authSettingsData.deployGroupId,
      auth: authSettingsData.auth,
    }),
  });
}

export async function getProjectBuildDevSettings(...args: Parameters<typeof getSiteSettings>) {
  const bohrRes = await getSiteSettings(...args);

  if (bohrRes.error) {
    return bohrRes;
  }

  const camelCaseCommands = {
    framework: bohrRes.data.settings.commands.framework,
    buildCommand: bohrRes.data.settings.commands.build_command,
    rootDirectory: bohrRes.data.settings.commands.root_directory,
    outputDirectory: bohrRes.data.settings.commands.output_directory,
    installCommand: bohrRes.data.settings.commands.install_command,
    developmentCommand: bohrRes.data.settings.commands.development_command,
  };

  return {
    ...bohrRes,
    data: camelCaseCommands,
  };
}

type UpdateProjectBuildDevSettingsData = {
  org: string
  project: string
  deployGroupId?: string
  commands: {
    framework: string
    buildCommand: string
    rootDirectory: string
    outputDirectory: string
    installCommand: string
    developmentCommand: string
  }
}

export async function updateProjectBuildDevSettings(buildDevSettingsData: UpdateProjectBuildDevSettingsData) {
  return await bohrFetch('/api/site/settings_buildvars', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      siteOrg: buildDevSettingsData.org,
      siteName: buildDevSettingsData.project,
      deployGroupId: buildDevSettingsData.deployGroupId,
      commands: {
        framework: buildDevSettingsData.commands.framework || '',
        build_command: buildDevSettingsData.commands.buildCommand || '',
        root_directory: buildDevSettingsData.commands.rootDirectory || '',
        output_directory: buildDevSettingsData.commands.outputDirectory || '',
        install_command: buildDevSettingsData.commands.installCommand || '',
        development_command: buildDevSettingsData.commands.developmentCommand || '',
      },
    }),
  });
}
export async function getProjectVarsSettings(...args: Parameters<typeof getSiteSettings>) {
  const bohrRes = await getSiteSettings(...args);

  if (bohrRes.error) {
    return bohrRes;
  }

  return {
    ...bohrRes,
    data: bohrRes.data.settings.vars,
  };
}

type UpdateProjectVarsSettingsData = {
  org: string
  project: string
  deployGroupId?: string
  vars: SiteEnvVarField[]
}

export async function updateProjectVarsSettings(varsSettingsData: UpdateProjectVarsSettingsData) {
  return await bohrFetch('/api/site/settings_vars', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      orgName: varsSettingsData.org,
      siteName: varsSettingsData.project,
      deployGroupId: varsSettingsData.deployGroupId,
      vars: varsSettingsData.vars,
    }),
  });
}

export async function getProjectGeneralSettings(...args: Parameters<typeof getSiteSettings>) {
  const bohrRes = await getSiteSettings(...args);

  if (bohrRes.error) {
    return bohrRes;
  }

  return {
    ...bohrRes,
    data: {
      domainUrl: bohrRes.data.url,
      showInPortfolio: bohrRes.data.showInPortfolio,
      generalData: {
        mainBranch: bohrRes.data.settings.general.main_branch,
        nodeVersion: bohrRes.data.settings.general.node_version,
        rootDirectory: bohrRes.data.settings.general.root_directory,
      },
    },
  };
}

type UpdateProjectGeneralSettingsData = {
  org: string
  project: string
  showInPortfolio: boolean
  deployGroupId?: string
  general: {
    nodeVersion: string
    rootDirectory: string
    mainBranch: string
  }
}

export async function updateProjectGeneralSettings(generalSettingsData: UpdateProjectGeneralSettingsData) {
  return await bohrFetch('/api/site/settings_general', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      siteOrg: generalSettingsData.org,
      siteName: generalSettingsData.project,
      showInPortfolio: generalSettingsData.showInPortfolio,
      deployGroupId: generalSettingsData.deployGroupId,
      general: {
        node_version: generalSettingsData.general.nodeVersion,
        root_directory: generalSettingsData.general.rootDirectory,
        main_branch: generalSettingsData.general.mainBranch,
      },
    }),
  });
}

type UpdateProjectUrlSettings = {
  org: string
  project: string
  deployGroupId?: string
  url: string
}

export async function updateProjectUrlSettings(urlSettingsData: UpdateProjectUrlSettings) {
  return await bohrFetch('/api/site/settings_url', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      siteOrg: urlSettingsData.org,
      siteName: urlSettingsData.project,
      deployGroupId: urlSettingsData.deployGroupId,
      url: urlSettingsData.url,
    }),
  });
}

export async function getProjectTemplateSettings(org: string, project: string) {
  const bohrRes = await bohrFetch(`/api/site/settings_template/${org}/${project}`);

  if (bohrRes.error) return bohrRes;

  bohrRes.data.tags = JSON.parse(bohrRes.data.tags);
  return bohrRes;
}

type UpdateProjectTemplateData = {
  org: string,
  project: string,
  isTemplate: boolean,
  description: string,
  tags: string[],
}

export async function updateProjectTemplateSettings({ org, project, isTemplate, description, tags}: UpdateProjectTemplateData) {
  return bohrFetch('/api/site/settings_template', {
    method: 'PUT',
    body: JSON.stringify({
      siteOrg: org,
      siteName: project,
      isTemplate: isTemplate,
      description,
      tags: JSON.stringify(tags),
    }),
  });
}

export async function deleteSite(org: string, site: string) {
  return await bohrFetch(`/api/site/${org}/${site}`, {
    method: 'DELETE'
  });
}
