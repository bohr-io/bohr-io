<template>
  <SettingsCard v-if="isUserSettings">
    <template #content>
      <form id="main-project-form" @submit.prevent="saveMainProject">
        <BohrTypography tag="h2" variant="title3" color="#55DDE0">
          {{ $t('account.mainProject.title') }}
        </BohrTypography>
        <div class="setting__content">
          <BohrTypography tag="p">
            {{ $t('account.mainProject.text') }}
          </BohrTypography>
          <BohrSelect
            id="main-project"
            :label="$t('common.project')"
            v-model="mainProjectId"
            :isLoading="isLoading"
          >
            <option
              v-for="project in projects"
              :key="project.id"
              :value="project.id"
            >
              {{ project.name }}
            </option>
          </BohrSelect>
        </div>
      </form>
    </template>
    <template #actions>
      <BohrButton
        type="submit"
        form="main-project-form"
        size="md"
        :disabled="isSaving"
      >
        {{ $t('common.save') }}
      </BohrButton>
    </template>
  </SettingsCard>

  <SettingsCard v-if="isUserSettings">
    <template #content>
      <form id="email-form" @submit.prevent="saveEmail">
        <BohrTypography tag="h2" variant="title3" textTransform="capitalize" color="#55DDE0">
          {{ $t('common.email') }}
        </BohrTypography>
        <div class="setting__content">
          <BohrTypography tag="p">
            {{ $t('account.email.text') }}
          </BohrTypography>
          <BohrTextField
            id="email-field"
            :label="$t('common.email')"
            :isLoading="isLoading"
            v-model="email"
          />
        </div>
      </form>
    </template>
    <template #actions>
      <BohrButton
        type="submit"
        form="email-form"
        size="md"
        :disabled="isSaving"
      >
        {{ $t('common.save') }}
      </BohrButton>
    </template>
  </SettingsCard>
  
  <SettingsCard v-if="isUserSettings">
    <template #content>
      <form id="linkedin-form" @submit.prevent="saveLinkedin">
        <BohrTypography tag="h2" variant="title3" textTransform="capitalize" color="#55DDE0">
          {{ $t('common.linkedin') }}
        </BohrTypography>
        <div class="setting__content">
          <BohrTypography tag="p">
            {{ $t('account.linkedin.text') }}
          </BohrTypography>
          <BohrTextField
            id="linkedin-field"
            :label="$t('common.linkedin')"
            :isLoading="isLoading"
            v-model="linkedin"
          />
        </div>
      </form>
    </template>
    <template #actions>
      <BohrButton
        type="submit"
        form="linkedin-form"
        size="md"
        :disabled="isSaving"
      >
        {{ $t('common.save') }}
      </BohrButton>
    </template>
  </SettingsCard>

    <SettingsCard v-if="isAdmin || (isUserSettings && plan !== 'FREE')">
      <template #content>
        <BohrTypography tag="h2" variant="title3">
          {{ $t('account.billing.title') }}
        </BohrTypography>
        <div class="setting__content">
          <div>
            <BohrButton
              component="a"
              :href="stripeHref"
              target="_blank"
              rel="noreferrer"
            >
              {{ $t('account.billing.access') }}
            </BohrButton>
          </div>
        </div>
      </template>
    </SettingsCard>  
  
  <SettingsCard :isDanger="true">
    <template #content>
      <BohrTypography tag="h2" variant="title3" color="#E84855">
        {{ isUserSettings ? $t('account.delete.account.title') : $t('account.delete.org.title') }}
      </BohrTypography>
      <div class="setting__content">
        <BohrTypography tag="p" variant="body1">
          {{ isUserSettings ? $t('account.delete.account.text') : $t('account.delete.org.text') }}
        </BohrTypography>
        <div>
          <BohrButton
            class="danger__button"
            @click="showModal"
            :isDanger="true"
            :disabled="isSaving"
          >
            {{ $t('common.delete') }}
          </BohrButton>
        </div>

        <ModalBase
          :isVisible="isModalVisible"
          @close="closeModal"
        >
          <h3 class="delete__modal__title">
            {{ isUserSettings ? $t('account.delete.account.modal.title') : $t('account.delete.org.modal.title') }}
          </h3>

          <BohrTypography tag="p" class="delete__modal__text">
            {{ isUserSettings ? $t('account.delete.account.modal.desc') : $t('account.delete.org.modal.desc') }}
          </BohrTypography>
          
          <BohrTypography
            v-html="deleteConfirmationInstruction"
            tag="p"
            class="delete__modal__text"
          ></BohrTypography>

          <input
            type="text"
            :placeholder="isUserSettings ? $t('common.account') : $t('common.organization')"
            v-model="deleteConfirmationInputValue"
            class="delete__modal__confirmation"
          />

          <div class="delete__modal__buttons">
            <button
              type="button"
              class="delete__modal__button delete__modal__cancelBtn"
              @click="closeModal"
            >
              {{ $t('common.cancel') }}
            </button>
            <BohrButton
              type="button"
              isDanger
              :disabled="deleteConfirmationInputValue !== orgName"
              @click="deleteAccount"
            >
              {{ isUserSettings ? $t('account.delete.account.modal.deleteBtn') : $t('account.delete.org.modal.deleteBtn') }}
            </BohrButton>
          </div>
        </ModalBase>
      </div>
    </template>
  </SettingsCard>
</template>

<script lang="ts">
import BohrButton from '@/components/BohrButton.vue';
import BohrSelect from '@/components/BohrSelect.vue';
import BohrTextField from '@/components/BohrTextField.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import ModalBase from '@/components/ModalBase.vue';
import SettingsCard from '@/components/SettingsCard.vue';
import { getUserMainProject, getUserOwnProjects, requestDeleteAccount, updateLinkLinkedin, updateUserEmail, updateUserMainProject } from '@/services/api';
import toastService from '@/services/ToastService';
import isSavingComputed from '@/utils/isSavingComputed';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GeneralSettings',
  components: {
    BohrButton,
    BohrSelect,
    BohrTextField,
    BohrTypography,
    ModalBase,
    SettingsCard,
  },
  data() {
    return {
      mainProjectId: '',
      projects: [] as { name: string, id: string }[],
      isModalVisible: false,
      deleteConfirmationInputValue: '',
      isLoading: true,
      email: '',
      linkedin: '',
    }
  },
  computed: {
    plan() { return this.$store.state.me?.plan },
    orgName() { return this.$route.params.org },
    isUserSettings() { return this.orgName === this.user?.username },
    user() { return this.$store.state.me },
    isAdmin() { return this.$store.state.me?.isAdmin },
    stripeHref() {
      const querys = this.isAdmin ? `?username=${this.orgName}` : "";
      return "/api/stripe/portal" + querys;
    },
    ...isSavingComputed(),

    deleteConfirmationInstruction(){
      const modalKey = this.isUserSettings ? 'account' : 'org';
      return this.$t(`account.delete.${modalKey}.modal.confirm`, [`<strong>${this.orgName}</strong>`]);
    },
  },
  created() {
    this.initializeData();
  },
  methods: {
    async initializeData() {
      const [
        { data: ownProjectsData },
        { data: mainProjectData }
      ] = await Promise.all([
        getUserOwnProjects(),
        getUserMainProject(),
      ]);

      this.projects = ownProjectsData?.sites || [];
      this.mainProjectId = mainProjectData?.mainSite?.id || '';
      this.isLoading = false
      this.email = this.user?.email || '';
      this.linkedin = this.user?.linkedin || 'https://www.linkedin.com/in/';
    },

    async saveEmail() {
      if (this.isSaving) return;
      this.isSaving = true;

      const { error } = await updateUserEmail({
        email: this.email,
      });

      this.isSaving = false;

      if (error) {
        toastService.error(this.$t('account.email.errorMessage'));
        return;
      }

      toastService.success(this.$t('account.email.successMessage'));
    },

    async saveLinkedin() {
      if (this.isSaving) return;
      this.isSaving = true;

      const verification = "https://www.linkedin.com/in/";
      const linkedinValue = this.linkedin.trim();

      if (!linkedinValue.startsWith(verification)) {
        toastService.error(this.$t('account.linkedin.errorMessage'));
        this.isSaving = false;
        return;
      }

      const linkedinWithoutPrefix = linkedinValue.replace(verification, "");

      const { error } = await updateLinkLinkedin({
        linkedin: "https://linkedin.com/in/" + linkedinWithoutPrefix,
      });
      
      this.isSaving = false;

      if (error) {
        toastService.error(this.$t('account.linkedin.errorMessage'));
        return;
      }
      toastService.success(this.$t('account.linkedin.successMessage'));
    },

    async saveMainProject() {
      if (this.isSaving) return;
      this.isSaving = true;

      const { error } = await updateUserMainProject(this.mainProjectId);
      this.isSaving = false;

      if (error) {
        toastService.error(this.$t('account.mainProject.errorMessage'));
        return;
      }

      toastService.success(this.$t('account.mainProject.successMessage'));
    },

    showModal() {
      this.isModalVisible = true;
    },

    closeModal() {
      this.deleteConfirmationInputValue = '';
      this.isModalVisible = false;
    },

    async deleteAccount(){
      const { error } = await requestDeleteAccount();

      if (error) {
        this.closeModal();
        const message = this.isUserSettings
          ? this.$t('account.delete.account.errorMessage')
          : this.$t('account.delete.org.errorMessage');
        toastService.error(message);
        return;
      }

      document
        .cookie
        .split(";")
        .forEach((c) => {
          document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
      window.location.href = '/';
    }
  }
});
</script>

<style scoped>
  .setting__content {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 24px;
    margin-top: 16px;
  }

  .settings__link {
    font-size: 16px;
    font-weight: 700;
    color: #F6AE2D;
  }

  .align__right{
    margin-left: auto;
  }

  .delete__modal__title {
    font-weight: 700;
    font-size: 23px;
    line-height: 26px;
    letter-spacing: -0.04em;
    margin-block: 0 16px;
    color: hsla(355, 78%, 60%, 1);
  }
  .delete__modal__text{
    font-size: 20px;
    line-height: 1.5;
  }

  .delete__modal__text + .delete__modal__text {
    margin-top: 8px;
  }

  .delete__modal__confirmation {
    margin-block: 20px;
    padding: 10px 12px;
    width: 100%;
    box-sizing: border-box;
  }

  .delete__modal__buttons{
    display: flex;
    justify-content: space-between;
  }

  .delete__modal__button {
    padding: 13px 26px;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    border: none;
    border-radius: 2px;
  }

  .delete__modal__button:where(:not(:disabled)) {
    cursor: pointer;
  }

  .delete__modal__button:disabled {
    background-color: hsla(0, 0%, 50%, 1);
    color: hsla(0, 0%, 0%, 1);
  }

  .delete__modal__cancelBtn {
    background-color: hsl(0, 100%, 0%);
    color: hsla(0, 0%, 100%, 1);
  }

  .delete__modal__cancelBtn:where(:not(:disabled)):hover {
    background-color: hsl(0, 100%, 0%);
  }

  .delete__modal__deleteBtn {
    background-color: hsla(0, 0%, 100%, 1);
    color: hsla(355, 78%, 60%, 1);
  }

  .delete__modal__deleteBtn:where(:not(:disabled)):hover {
    background-color: hsla(0, 0%, 95%, 1);
  }
</style>
