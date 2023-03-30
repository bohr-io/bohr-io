<template>
  <ModalBase
    class="email__modal"
    :isVisible="isVisible"
    width="80vw"
    maxWidth="856px"
  >
    <form @submit.prevent="save">
      <BohrTypography tag="h2" variant="title2" color="hsl(355, 78%, 60%)">
        {{ $t('components.emailModal.title') }}
      </BohrTypography>
      <BohrTypography tag="p" variant="title2" class="email__modal__text">
        {{ $t('components.emailModal.text') }}
      </BohrTypography>
      <ModalTextField
        id="email-modal-field"
        :label="$t('common.email')"
        :placeholder="$t('common.email')"
        type="email"
        v-model="email"
      />
      <div class="newletter__container">
        <ModalCheckBox
          id="newsletter-subscribe"
          :label="$t('components.emailModal.newsCheckBox')"
          v-model="receiveNews"
        />
      </div>
      <div class="email__modal__buttons">
        <BohrButton
          size="lg"
          type="submit"
          :disabled="isSaving"
        >
          {{ $t('common.save') }}
        </BohrButton>
      </div>
      <button
        class="close__btn"
        type="button"
        :title="$t('components.emailModal.closeBtn')"
        v-tooltip="{
          content: $t('components.emailModal.closeBtn'),
          placement: 'bottom',
        }"
      >
        <XIcon isGradient>
          <template #gradient>
            <stop offset="100%" style="stop-color:#CCCCCC;stop-opacity:1" />
          </template>
        </XIcon>
      </button>
    </form>
  </ModalBase>
</template>

<script lang="ts">
import BohrButton from '@/components/BohrButton.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import XIcon from '@/components/icons/XIcon.vue';
import ModalBase from '@/components/ModalBase.vue';
import ModalCheckBox from '@/components/ModalCheckBox.vue';
import ModalTextField from '@/components/ModalTextField.vue';
import toastService from '@/services/ToastService';
import isSavingComputed from '@/utils/isSavingComputed';
import { defineComponent } from 'vue';
import { updateUserEmail } from '@/services/api/index';

export default defineComponent({
  components: {
    BohrButton,
    ModalTextField,
    BohrTypography,
    ModalBase,
    ModalCheckBox,
    XIcon,
  },
  data() {
    return {
      isVisible: false,
      email: '',
      receiveNews: true,
    }
  },
  computed: {
    ...isSavingComputed(),

    me() {
      return this.$store.state.me;
    },
  },
  watch: {
    me() {
      if (this.me && !this.me.email) {
        this.isVisible = true;
      }
    },
  },
  methods: {
    async save() {
      this.isSaving = true;

      const { error } = await updateUserEmail({
        email: this.email,
        receiveNews: this.receiveNews,
      })

      this.isSaving = false;

      if (error) {
        toastService.error(this.$t('components.emailModal.errorMessage'))
        return;
      }

      this.isVisible = false;
      toastService.success(this.$t('components.emailModal.successMessage'));
    },
  },
});
</script>

<style scoped>
.email__modal__text {
  font-weight: 400;
  margin-block: 10px 15px;
}

.newletter__container {
  margin-top: 20px;
}
.email__modal__buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
}
.close__btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
}
</style>