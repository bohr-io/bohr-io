import { createClient, Client } from '@liveblocks/client';
import { App } from 'vue';

export type LiveBlocksClient = Client;

export default {
  install: (app: App, options: Parameters<typeof createClient>[0]) => {
    app.config.globalProperties.$liveBlocks = createClient(options);
  }
};
