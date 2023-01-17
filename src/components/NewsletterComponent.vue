<template>
  <section class="subscribe__container">
    <BohrTypography tag="h2" class="subscribe__title">
      {{ $t('newsletter.title') }}
    </BohrTypography>
    <BohrTypography variant="title2" class="subscribe__description">
      {{ $t('newsletter.description') }}
    </BohrTypography>
    <div class="">
      <form
        action="https://app.convertkit.com/forms/2857001/subscriptions"
        class="seva-form formkit-form"
        method="post"
        data-sv-form="2857001"
        data-uid="a693b76e6c"
        data-format="inline"
        data-version="5"
        data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now check your email to confirm the subscription!","redirect_url":""},"analytics":{"google":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":true,"url":"https://convertkit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
        min-width="400 500 600 700 800"
        target="_blank"
      >
        <div data-style="full">
          <div data-element="column" class="formkit-column">
            <div data-element="fields" class="seva-fields formkit-fields">
              <div class="content__newsletter">
                <div class="input-name__newsletter">
                  <label for="name" class="label__newsletter">{{ $t('newsletter.name') }}</label>
                  <input
                    class="input__newsletter"
                    aria-label="Name"
                    name="fields[first_name]"
                    required
                    :placeholder="$t('newsletter.name')"
                    type="text"
                    id="name"
                  />
                </div>
                <div class="input-email__newsletter">
                  <label for="email" class="label__newsletter">{{ $t('newsletter.email') }}</label>
                  <input
                    class="input__newsletter"
                    name="email_address"
                    aria-label="Email Address"
                    :placeholder="$t('newsletter.email')"
                    required
                    type="email"
                    id="email"
                  />
                </div>
              </div>
              
              <div class="btn__newsletter">
                <!-- <button
                  data-element="submit"
                  class="btn btn-orange-gradient border-0 btn-lg py-3 formkit-submit"
                >
                  I want to receive!
                </button> -->
                <BohrButton data-element="submit" class="btn__subscribe formkit-submit" @mousedown="gtagEvent">
                  <BohrTypography
                    variant="subtitle2"
                    color="hsl(0, 0%, 100%)"
                    class="discord__text"
                  >
                  {{ $t('newsletter.subscribe') }}
                  </BohrTypography>
                </BohrButton>
              </div>
            </div>
          </div>
        </div>
      </form>
  </div>
  </section>
  
</template>
<script lang="ts">
import BohrTypography from '@/components/BohrTypography.vue';
import BohrButton from '@/components/BohrButton.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    BohrTypography,
    BohrButton,
  },
  methods: {
    gtagEvent(e: MouseEvent) {
      if (![0, 1].includes(e.button)) {
        return;
      }

      this.$gtag.event('news_subscribe_internal', {
        'app_name': 'bohr.io',
        'screen_name': this.$route.name,
      });
    }
  },
});
</script>
<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.subscribe__container{
  margin-top: 140px;
  margin-bottom: 40px;
}
.subscribe__title{
  background-clip: text;
  background-image: linear-gradient(180deg, hsl(181, 69%, 61%) 0%, hsl(131, 67%, 60%) 100%);;
  color: transparent;
  font-weight: 700;
  font-size: 36px;
  line-height: 41px;
  letter-spacing: -0.04em;
}

.subscribe__description{
  font-weight: 400;
  max-width: 80%;
  margin-block: 24px 36px;
}

.btn__subscribe{
  padding: 16px 24px;
  border-radius: 10em;
}

.content__newsletter{
  display: flex; 
  gap: 12px; 
  box-sizing: border-box;
  margin-bottom: 24px;
}

.input-name__newsletter{
  flex: 1 1 auto;
}

.input-email__newsletter{
  flex: 2 1 auto;
}

.label__newsletter{
  display: block;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.input__newsletter{
  background: linear-gradient(180deg, transparent 0%, hsla(0, 0%, 100%, 0.05) 100%);
  border-radius: 4px;
  border: 1px solid hsl(0, 0%, 100%, 0.1);
  height: 40px;
  box-sizing: border-box;
  color: inherit;
  width: 100%;
  outline-offset: 2px;
  padding: 13px;
  margin-bottom: 12px;
  display: inline-flex;
}

.btn__newsletter{
  margin: 16px 0;
}

@media screen and (max-width: 767px) {
  .content__newsletter{
    display: block;
  }

  .input__newsletter{
    margin-bottom: 16px;
  }
}
</style>
