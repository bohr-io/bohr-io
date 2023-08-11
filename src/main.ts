import FloatingVue from "floating-vue";

import 'floating-vue/dist/style.css';
import Highcharts from 'highcharts';
import HighchartsVue from 'highcharts-vue';
import highchartAccessibility from 'highcharts/modules/accessibility';
import darkUnica from "highcharts/themes/dark-unica";
import VueCookies from 'vue-cookies';
import VueGtag from 'vue-gtag';
import VueResizeObserver from "vue-resize-observer";
import { ViteSSG } from 'vite-ssg'
import App from './App.vue';
import i18n from './i18n';
import LiveBlocks from './plugins/LiveBlocks';
import VueMediaQueries from "./plugins/VueMediaQueries";
import { routerOptions, beforeGuard } from './router';
import TawkMessengerVue from 'tawk-messenger-vue-3-ts';
import store from './store';
import TawkMessengerVue from 'tawk-messenger-vue-3-ts';


darkUnica(Highcharts);
highchartAccessibility(Highcharts);

const isProduction = window.location.host === 'bohr.io';

const vueGtagOptions = {
  enabled: isProduction,
  config: {
    id: 'G-ECLT0G7Y54',
  },
};

const TawkToOptions = {
  propertyId: '64c306c594cf5d49dc66e1dc',
  widgetId: '1h6ct4spk'
};

const floatingVueConfig = {
  themes: {
    tooltip: {
      delay: 0,
    },
  },
};

export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  routerOptions,
  // function to have custom setups
  ({ app, router, routes, isClient, initialState }) => {
    // install plugins etc.
    app
      .use(VueGtag, vueGtagOptions, router)
      .use(TawkMessengerVue, TawkToOptions)
      .use(HighchartsVue as any)
      .use(i18n)
      //.use(router)
      .use(store)
      .use(VueResizeObserver)
      .use(FloatingVue, floatingVueConfig)
      .use(VueCookies)
      .use(VueMediaQueries, {
        phone: 'screen and (max-width: 767px)',
        tablet: 'screen and (max-width: 1023px)',
        laptop: 'screen and (max-width: 1279px)'
      })
      .use(LiveBlocks, {
        authEndpoint: "/api/liveblocks/auth",
      });

    router.beforeEach(beforeGuard);
  },
);
