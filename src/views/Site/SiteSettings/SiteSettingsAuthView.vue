<template>
  <SettingsCard>
    <template #content>
      <form id="auth-form" class="form__auth" @submit.prevent="saveAuth">
        <BohrTypography tag="h2" variant="title3" color="hsla(181, 69%, 61%, 1)">
          {{ $t('settings.auth.title') }}
          <BohrHelpLink topic="authentication" color="hsla(181, 69%, 61%, 1)" />
        </BohrTypography>
        <BohrTypography tag="p" variant="body1">{{ $t('settings.auth.subtitle') }}</BohrTypography>

        <BohrSelect
          id="auth-method"
          class="settings__field"
          :label="$t('settings.auth.method')"
          :value="authData.type"
          @change="changeMethod($event.target.value)"
          :isLoading="isLoading"
        >
          <option
            v-for="authMethod in authMethods"
            :value="authMethod"
            :key="authMethod"
            :selected="authMethod === authData.type"
          >
            {{ authMethod }}
          </option>
        </BohrSelect>

        <div class="auth__inputs" v-if="authData.type && authData.type !== 'none'">
          <template v-if="authData.type === 'basic'">
            <div class="basic__labels" v-if="authData.basic && hasBasicUser">
              <label id="usernameLabel">
                <BohrTypography variant="title4">
                  {{ $t('settings.auth.label.username') }}
                </BohrTypography>
              </label>
              <label id="passwordLabel">
                <BohrTypography variant="title4">
                  {{ $t('settings.auth.label.password') }}
                </BohrTypography>
              </label>
            </div>
            <template v-for="(userInputGroup, i) in authData.basic" :key="i">
              <fieldset class="auth__basic">
                <BohrTextField
                  aria-labelledby="usernameLabel"
                  :placeholder="$t('settings.auth.label.username')"
                  v-model="userInputGroup.username"
                  :isLoading="isLoading"
                />
                <BohrTextField
                  type="password"
                  aria-labelledby="passwordLabel"
                  :placeholder="$t('settings.auth.label.password')"
                  v-model="userInputGroup.password"
                  :isLoading="isLoading"
                />
                <SkeletonLoading :isShowing="isLoading" borderRadius="circle">
                  <BohrIconButton
                    :label="$t('common.remove')"
                    @click="removeUser(i)"
                  >
                    <RedXIcon />
                  </BohrIconButton>
                </SkeletonLoading>
              </fieldset>
            </template>
            <div class="new__basic__button__container">
              <SkeletonLoading :isShowing="isLoading" borderRadius="circle">
                <BohrIconButton
                  class="new__basic__button"
                  :label="$t('settings.auth.label.newUser')"
                  @click="addUser"
                >
                  <GreenPlusIcon />
                </BohrIconButton>
              </SkeletonLoading>
            </div>
          </template>

          <template v-if="authData.oauth && authData.type === 'oauth'">
            <fieldset class="auth__oauth">
              <BohrSelect
                id="provider-input"
                class="settings__field"
                :label="$t('settings.auth.label.provider')"
                v-model="authData.oauth.provider"
                :isLoading="isLoading"
              >
                <option value="" disabled>{{ $t('settings.auth.label.provider') }}</option>
                <option
                  v-for="provider in providers"
                  :value="provider.value"
                  :key="provider.value"
                >
                  {{ provider.label }}
                </option>
              </BohrSelect>
              <BohrTextField
                id="clientId-input"
                class="settings__field"
                :label="$t('settings.auth.label.clientId')"
                :placeholder="$t('settings.auth.label.clientId')"
                v-model="authData.oauth.clientId"
                :isLoading="isLoading"
              />
              <BohrTextField
                id="secret-input"
                class="settings__field"
                :label="$t('settings.auth.label.secret')"
                :placeholder="$t('settings.auth.label.secret')"
                v-model="authData.oauth.secret" type="password"
                :isLoading="isLoading"
              />
            </fieldset>
          </template>
        </div>

        <div class="form__section" v-if="authData.protect !== undefined">
          <BohrTypography tag="h2" variant="title3" color="#55DDE0">{{ $t('settings.auth.label.protect') }}</BohrTypography>
          <div class="bohr__radio__group">
            <div class="bohr__radio__container">
              <input type="radio" id="protect__both" value="both" v-model="authData.protect" :checked="authData.protect !== undefined || authData.protect === '' || authData.protect === null" />
              <label for="protect__both">{{ $t('settings.auth.label.frontendANDbackend') }}</label>
            </div>
            <div class="bohr__radio__container">
              <input type="radio" id="protect__backend" value="backend" v-model="authData.protect" />
              <label for="protect__backend">{{ $t('settings.auth.label.backendOnly') }}</label>
            </div>
            <div class="bohr__radio__container">
              <input type="radio" id="protect__frontend" value="frontend" v-model="authData.protect" />
              <label for="protect__frontend">{{ $t('settings.auth.label.frontendOnly') }}</label>
            </div>
          </div>
        </div>

        <div class="auth__bypassURLs" v-if="authData.bypassURLs">
          <div class="basic__labels">
            <label id="bypassURLsLabel">
              <BohrTypography variant="title4">
                {{ $t('settings.auth.label.bypassURLs') }}
              </BohrTypography>
            </label>
          </div>
          <template v-for="(bypassURLsInputGroup, i) in authData.bypassURLs" :key="i">
            <fieldset class="auth__basic">
              <BohrTextField
                aria-labelledby="bypassURLsLabel"
                :placeholder="$t('settings.auth.label.bypassURLExample')"
                v-model="bypassURLsInputGroup.value"
                :isLoading="isLoading"
              />
              <SkeletonLoading :isShowing="isLoading" borderRadius="circle">
                <BohrIconButton
                  :label="$t('common.remove')"
                  @click="removeBypassURL(i)"
                >
                  <RedXIcon />
                </BohrIconButton>
              </SkeletonLoading>
            </fieldset>
          </template>
          <div class="new__basic__button__container">
            <SkeletonLoading :isShowing="isLoading" borderRadius="circle">
              <BohrIconButton
                class="new__basic__button"
                :label="$t('settings.auth.label.newURL')"
                @click="addBypassURL"
              >
                <GreenPlusIcon />
              </BohrIconButton>
            </SkeletonLoading>
          </div>
        </div>

        <BohrTypography tag="p">
          {{ $t('common.learnMoreAbout') }} <a class="settings__link" href="https://docs.bohr.io/docs/autenticacao" target="_blank">{{ $t('settings.auth.title') }}</a>
        </BohrTypography>
        <BohrTypography tag="p">
          {{ $t('settings.auth.info') }}
        </BohrTypography>
      </form>
    </template>

    

    <template #actions>
      <BohrButton
        type="submit"
        form="auth-form"
        size="md"
        :disabled="isSaving"
      >
        {{ $t('common.save') }}
      </BohrButton>
    </template>
  </SettingsCard>
</template>

<script lang="ts">
import BohrButton from '@/components/BohrButton.vue';
import BohrHelpLink from '@/components/BohrHelpLink.vue';
import BohrIconButton from '@/components/BohrIconButton.vue';
import BohrSelect from '@/components/BohrSelect.vue';
import BohrTextField from '@/components/BohrTextField.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import GreenPlusIcon from '@/components/icons/GreenPlusIcon.vue';
import RedXIcon from '@/components/icons/RedXIcon.vue';
import SettingsCard from '@/components/SettingsCard.vue';
import SkeletonLoading from '@/components/SkeletonLoading.vue';
import { getProjectAuthSettings, updateProjectAuthSettings } from '@/services/api/projectSettings';
import { SiteAuthType, SiteBasicAuthField } from '@/types';
import cloneDeep from '@/utils/cloneDeep';
import isSavingComputed from '@/utils/isSavingComputed';
import { defineComponent } from 'vue';

type AuthData = {
  type: SiteAuthType
  basic?: SiteBasicAuthField[]
  oauth?: {
    provider: string
    clientId: string
    secret: string
  }
  protect?: string | null
  bypassURLs?: { value: string }[]
}

export default defineComponent({
  emits: ['successUpdate', 'failUpdate'],
  components: {
    BohrButton,
    BohrIconButton,
    BohrSelect,
    BohrTextField,
    BohrTypography,
    SettingsCard,
    SkeletonLoading,
    GreenPlusIcon,
    RedXIcon,
    BohrHelpLink
  },
  data() {
    const authMethods = ['none', 'basic', 'oauth'];
    const providers = [{ value: 'github', label: 'Github'}];
    return {
      authMethods,
      providers,
      initialAuthData: {} as AuthData,
      authData: {} as AuthData,
      isLoading: true,
    }
  },
  computed: {
    hasBasicUser() { return this.authData.basic && this.authData.basic.length > 0 },

    deployGroupId() { return this.$store.getters['site/contextId'] },

    ...isSavingComputed(),
  },
  watch: {
    deployGroupId() {
      this.initializeAuthData();
    },
  },
  mounted() {
    if (this.authData.protect || this.authData.protect === null) {
      this.authData.protect = 'both';
    }
  },
  created() {
    this.initializeAuthData();
  },
  methods: {
    async initializeAuthData() {
      this.isLoading = true;

      const org = this.$route.params.org as string;
      const project = this.$route.params.project as string;

      const { data } = await getProjectAuthSettings(org, project, this.deployGroupId);

      this.initialAuthData = cloneDeep(data);
      this.authData = data;

      if (data.type === 'basic') {
        this.addUser();
      }

      if (this.authData.type !== 'none' && !this.authData.bypassURLs) {
        this.authData.bypassURLs = [{ value: '' }];
      }

      this.isLoading = false;
    },

    changeMethod(method: SiteAuthType) {
      if (method === this.initialAuthData.type) {
        this.authData = this.initialAuthData;

        if (this.authData.type !== 'none') {
          if (this.authData.protect === undefined) {
            this.authData.protect = null;
          }
          if (this.authData.bypassURLs === undefined) {
            this.authData.bypassURLs = [{ value: '' }];
          }
        }
      } else {
        switch (method) {
          case 'basic': {
            this.authData = {
              type: 'basic',
              basic: [],
              protect: 'both',
              bypassURLs: []
            };
            this.addUser();
            this.addBypassURL();
            break;
          }

          case 'oauth': {
            this.authData = {
              type: 'oauth',
              oauth: {
                provider: '',
                clientId: '',
                secret: '',
              },
              protect: 'both',
              bypassURLs: []
            };
            this.addBypassURL();
            break;
          }

          case 'none':
          default: {
            this.authData = {
              type: 'none'
            };
            break;
          }
        }
      }
    },

    addUser() {
      this.authData.basic?.push({ username: '', password: '' });
    },

    removeUser(index: number) {
      this.authData.basic?.splice(index, 1);
      if (this.authData.basic?.length === 0) {
        this.addUser();
      }
    },

    addBypassURL() {
      this.authData.bypassURLs?.push({ value: '' });
    },

    removeBypassURL(index: number) {
      this.authData.bypassURLs?.splice(index, 1);
      if (this.authData.bypassURLs?.length === 0) {
        this.addBypassURL();
      }
    },

    async saveAuth() {
      if (this.isSaving) return;
      this.isSaving = true;
      
      const authProjectBody = {
        org: this.$route.params.org as string,
        project: this.$route.params.project as string,
        deployGroupId: this.deployGroupId,
        auth: { ...this.authData },
      }

      if (authProjectBody.auth.basic) {
        authProjectBody.auth.basic = authProjectBody.auth.basic.filter((user) => user.username !== '');
      }

      const { error } = await updateProjectAuthSettings(authProjectBody);
      this.isSaving = false

      if (error) {
        this.$emit('failUpdate');        
        return;
      }

      this.$emit('successUpdate');

      if (this.deployGroupId === authProjectBody.deployGroupId) {
        this.initialAuthData = this.authData;
      }
    },
  }
});
</script>

<style scoped>
  .form__auth {
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: stretch;
  }

  .auth__inputs {
    width: 100%;
    padding-top: 24px;
    border-top-width: 1px;
    border-top-style: solid;
    border-image-source: linear-gradient(90deg, transparent 0%, rgba(var(--color), 0.5) 50%, transparent 100%);;
    border-image-slice: 1;
  }

  .basic__labels,
  .auth__basic {
    display: grid;
    grid-template-columns: repeat(2, 1fr) repeat(1, 28px);
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    align-items: center;
    gap: 24px;
    width: 100%;
    margin: 0;
  }

  .auth__basic {
    border: none;
    padding: 0;
    margin-block: 16px;
  }
  .auth__bypassURLs .auth__basic {
    grid-template-columns: 1fr 28px;
  }

  .basic__labels {
    margin-bottom: 8px;
    font-weight: 700;
    text-transform: uppercase;
  }

  .basic__controls {
    display: flex;
    align-items: center;
  }

  .new__basic__button__container {
    margin-left: auto;
    width: min-content;
  }
  
  .auth__oauth {
    display: flex;
    gap: 16px;
    flex-direction: column;
    align-items: stretch;
    border: none;
    padding: 0;
  }

  .bohr__radio__container {
    display: flex;
    align-items: center;
    margin-block: 8px;
    gap: 10px;
  }

  .bohr__radio__container > input {
    position: relative;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 9999px;
    border: 1px solid hsl(0, 0%, 100%);
    background: linear-gradient(180deg, transparent 0%, hsla(0, 0%, 100%, 0.05) 100%);
  }

  .bohr__radio__container > input::after {
    content: '';
    position: absolute;
    inset: 5px;
    background: linear-gradient(180deg, #55DDE0 0%, #53DD6C 100%);
    border-radius: 9999px;
    opacity: 0;
  }

  .bohr__radio__container > input:checked::after {
    opacity: 1;
  }

  .bohr__radio__container > label {
    font-weight: 700;
    font-size: 12px;
  }

  .settings__link {
    font-size: 16px;
    font-weight: 700;
    color: #F6AE2D;
  }
</style>
