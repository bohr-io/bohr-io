import { App, reactive } from 'vue';

export type Mq = { [key: string]: boolean }

export default {
  install: (app: App, options: { [key: string]: string }) => {
    app.config.globalProperties.$mq = reactive(Object.keys(options).reduce((acc, val) => {
      if (window.matchMedia !== undefined) {
        const mq = window.matchMedia(options[val]);
        
        mq.addEventListener('change', (event: MediaQueryListEvent) => {
          app.config.globalProperties.$mq[val] = event.matches;
        })
        
        return {
          ...acc,
          [val]: mq.matches
        }
      } else {
        return {
          ...acc,
          [val]: val === 'laptop'
        }
      }
    }, {}));
  }
};
