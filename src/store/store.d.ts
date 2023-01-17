import { StoreRootState } from '@/types'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<StoreRootState>
  }
}
