<template>
  <section class="loading__block">
    <div class="loading__displays">
      <div class="update__block">
        <span class="text__update" :class="isShowEffect ? 'fade-in-bottom' : 'fade-out-top'">{{stepText}}</span>
      </div>
      <div class="detail__block">
        <span class="text__details" :class="isDetailsEffect ? 'fade-in-bottom' : 'fade-out-top'">{{detailsText}}</span>
      </div>
    </div>
    <div class="logo__container">
      <BohrAnimatedLogo class="logo__size" />
    </div>
  </section>
</template>
<script>
import BohrAnimatedLogo from "@/components/BohrAnimatedLogo.vue";
export default {
  components: {
    BohrAnimatedLogo,
  },

  data() {
    return {
      steps: [],
      stepText: "",
      details: [],
      detailsText: "",
      isShowEffect: false,
      isDetailsEffect: false
    };
  },

  mounted(){
    this.steps = [
      this.$t('loadingAnimation.steps.step1'), 
      this.$t('loadingAnimation.steps.step2'), 
      this.$t('loadingAnimation.steps.step3'), 
      this.$t('loadingAnimation.steps.step4')
    ];

    this.details = [
      this.$t('loadingAnimation.details.detail1'),
      this.$t('loadingAnimation.details.detail2')
    ];
    
    this.updateLoading(this.steps);
    this.updateDetails(this.details);
  },

  methods:{
    updateLoading(array) {
      for (let i = 0; i < array.length; i++) {
        setTimeout(() => {
          this.isShowEffect = false;
          const element = array[i];
          this.isShowEffect = true;
          this.stepText = element;

          if (i !== array.length - 1) {
            setTimeout(() => {
              this.isShowEffect = undefined;
            }, 2500);
          }
        }, i * 3500);
      }
    },

    updateDetails(array){
      for (let i = 0; i < array.length; i++) {
        setTimeout(() => {
          this.isDetailsEffect = false;
          const element = array[i];
          this.isDetailsEffect = true;
          this.detailsText = element;
          setTimeout(() => {
              this.isDetailsEffect = undefined;
          }, 3000);
        }, i * 4500);
      }
    }
  }
};
</script>
<style scoped>
.logo__container {
  margin-top: 120px;
  display: flex;
  justify-content: center;
}

.logo__size {
  width: 300px;
  height: 300px;
  margin: 0 auto;
  display: block;
}

.loading__block {
  display: block;
  position: relative;
  padding: 16px 0;
}

.loading__displays {
  display: flex;
}

.update__block {
  display: block;
  position: relative;
  flex: 1 1 auto;
}

.detail__block {
  display: block;
  position: relative;
  flex: 1 1 auto;
  text-align: right !important;
}

.text__update {
  margin: 8px 0;
  color: hsl(47, 89%, 59%);
  font-size: 36px;
  font-weight: 700;
  display: block;
}

.text__update:after {
  content: " . ";
  animation: dots-yellow 1s steps(5, end) infinite;
}

.text__details {
  margin-top: 16px !important;
  text-align: right !important;
  font-size: 24px;
  font-weight: 700;
  color: hsl(181, 69%, 61%);
  display: block;
  white-space: pre;
}

@keyframes dots-yellow {
  0%,
  20% {
    color: hsl(0, 0%, 0%);
    text-shadow: 0.25em 0 0 hsl(0, 0%, 0%), 0.5em 0 0 hsl(0, 0%, 0%);
  }
  40% {
    color: hsl(47, 89%, 59%);
    text-shadow: 0.25em 0 0 hsl(0, 0%, 0%), 0.5em 0 0 hsl(0, 0%, 0%);
  }
  60% {
    text-shadow: 0.25em 0 0 hsl(47, 89%, 59%), 0.5em 0 0 hsl(0, 0%, 0%);
  }
  80%,
  100% {
    text-shadow: 0.25em 0 0 hsl(47, 89%, 59%), 0.5em 0 0 hsl(47, 89%, 59%);
  }
}

@keyframes dots-blue {
  0%,
  20% {
    color: hsl(0, 0%, 0%);
    text-shadow: 0.25em 0 0 hsl(0, 0%, 0%), 0.5em 0 0 hsl(0, 0%, 0%);
  }
  40% {
    color: hsl(181, 69%, 61%);
    text-shadow: 0.25em 0 0 hsl(0, 0%, 0%), 0.5em 0 0 hsl(0, 0%, 0%);
  }
  60% {
    text-shadow: 0.25em 0 0 hsl(181, 69%, 61%), 0.5em 0 0 hsl(0, 0%, 0%);
  }
  80%,
  100% {
    text-shadow: 0.25em 0 0 hsl(181, 69%, 61%), 0.5em 0 0 hsl(181, 69%, 61%);
  }
}

@keyframes slide-update {
  0% {
    top: 64px;
    -webkit-transform: translateY(48px) scale(0);
    transform: translateY(48px) scale(0);
    -webkit-transform-origin: bottom left;
    transform-origin: bottom left;
    opacity: 0;
  }

  33.4% {
    top: 40px;
    -webkit-transform: translateY(24px) scale(0.5);
    transform: translateY(24px) scale(0.5);
    -webkit-transform-origin: bottom left;
    transform-origin: bottom left;
    opacity: 0.35;
  }

  66.6% {
    top: 16px;
    -webkit-transform: translateY(0) scale(1);
    transform: translateY(0) scale(1);
    -webkit-transform-origin: bottom left;
    transform-origin: bottom left;
    opacity: 1;
  }

  100% {
    -webkit-transform: translateY(-300px);
    transform: translateY(-300px);
    opacity: 0;
  }
}

@keyframes last-slide-update {
  0% {
    top: 64px;
    -webkit-transform: translateY(48px) scale(0);
    transform: translateY(48px) scale(0);
    -webkit-transform-origin: bottom left;
    transform-origin: bottom left;
    opacity: 0;
  }

  33.4% {
    top: 40px;
    -webkit-transform: translateY(24px) scale(0.5);
    transform: translateY(24px) scale(0.5);
    -webkit-transform-origin: bottom left;
    transform-origin: bottom left;
    opacity: 0.35;
  }

  66.6% {
    top: 16px;
    -webkit-transform: translateY(0) scale(1);
    transform: translateY(0) scale(1);
    -webkit-transform-origin: bottom left;
    transform-origin: bottom left;
    opacity: 1;
  }

  100% {
    top: 16px;
    -webkit-transform: translateY(0) scale(1);
    transform: translateY(0) scale(1);
    -webkit-transform-origin: bottom left;
    transform-origin: bottom left;
    opacity: 1;
  }
}

@keyframes slide-detail {
  0% {
    top: 64px;
    -webkit-transform: translateY(48px) scale(0);
    transform: translateY(48px) scale(0);
    -webkit-transform-origin: bottom right;
    transform-origin: bottom right;
    opacity: 0;
  }

  33.4% {
    top: 40px;
    -webkit-transform: translateY(24px) scale(0.5);
    transform: translateY(24px) scale(0.5);
    -webkit-transform-origin: bottom right;
    transform-origin: bottom right;
    opacity: 0.35;
  }

  66.6% {
    top: 16px;
    -webkit-transform: translateY(0) scale(1);
    transform: translateY(0) scale(1);
    -webkit-transform-origin: bottom right;
    transform-origin: bottom right;
    opacity: 1;
  }

  100% {
    -webkit-transform: translateY(-300px);
    transform: translateY(-300px);
    opacity: 0;
  }
}

@keyframes last-slide-detail {
  0% {
    top: 64px;
    -webkit-transform: translateY(48px) scale(0);
    transform: translateY(48px) scale(0);
    -webkit-transform-origin: bottom right;
    transform-origin: bottom right;
    opacity: 0;
  }

  33.4% {
    top: 40px;
    -webkit-transform: translateY(24px) scale(0.5);
    transform: translateY(24px) scale(0.5);
    -webkit-transform-origin: bottom right;
    transform-origin: bottom right;
    opacity: 0.35;
  }

  66.6% {
    top: 16px;
    -webkit-transform: translateY(0) scale(1);
    transform: translateY(0) scale(1);
    -webkit-transform-origin: bottom right;
    transform-origin: bottom right;
    opacity: 1;
  }

  100% {
    top: 16px;
    -webkit-transform: translateY(0) scale(1);
    transform: translateY(0) scale(1);
    -webkit-transform-origin: bottom right;
    transform-origin: bottom right;
    opacity: 1;
  }
}
</style>

<style scoped>
.fade-in-bottom {
  -webkit-animation: fade-in-bottom 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)
    both;
  animation: fade-in-bottom 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@-webkit-keyframes fade-in-bottom {
  0% {
    -webkit-transform: translateY(50px);
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes fade-in-bottom {
  0% {
    -webkit-transform: translateY(50px);
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
.fade-out-top {
  -webkit-animation: fade-out-top 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: fade-out-top 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@-webkit-keyframes fade-out-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px);
    opacity: 0;
  }
}
@keyframes fade-out-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px);
    opacity: 0;
  }
}
</style>
