import { VueGtag } from 'vue-gtag';
import { LiveBlocksClient } from './LiveBlocks';
import { Mq } from './VueMediaQueries';

declare module 'vue' {
  interface ComponentCustomProperties {
    $mq: Mq
    $liveBlocks: LiveBlocksClient
    $gtag: VueGtag
  }
}