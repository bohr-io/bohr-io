<script lang="ts">
import { UserPresenceInfo } from '@/types';
import { BaseUserMeta, Client as LiveBlocksClient, createClient, LsonObject, Room } from '@liveblocks/core';
import { defineComponent } from 'vue';

type GlobalPresenceRoom = Room<{}, LsonObject, BaseUserMeta & { info: UserPresenceInfo }, never>

export default defineComponent({
  data() {
    return {
      liveBlocksClient: null as null | LiveBlocksClient,
      globalPresenceRoom: null as null | GlobalPresenceRoom,
      tryCounter: 0,
      unsubOthers: () => {},
      unsubErrors: () => {},
      bohrGlobalRoomId: '',
    };
  },
  mounted() {
    this.initLiveBlocks();
  },
  unmounted() {
    this.leaveLiveBlocks();
  },
  methods: {
    async initLiveBlocks() {
      if (window.location.host !== 'bohr.io' || this.tryCounter > 2) {
        return;
      }

      this.tryCounter++

      const res = await fetch('/api/liveblocks/global');

      if (!res.ok) {
        setTimeout(this.initLiveBlocks, 2000);
        return;
      }

      const data = await res.json();
      this.bohrGlobalRoomId = data.room;

      this.liveBlocksClient = createClient({
        authEndpoint: async () => {
          return data;
        }
      });

      const now = new Date();
      const lastInitDateString = localStorage.getItem('lastLiveBlocksInit');
      const lastInit = lastInitDateString ? new Date(lastInitDateString) : now;

      if (
        lastInitDateString &&
        (now.getTime() - lastInit.getTime()) < 5000
      ) {
        return;
      }

      localStorage.setItem('lastLiveBlocksInit', now.toString());

      this.globalPresenceRoom = this.liveBlocksClient.enter(this.bohrGlobalRoomId, {
        initialPresence: {},
      });

      this.globalPresenceRoom.subscribe('connection', (status) => {
        if (status === 'open' && this.globalPresenceRoom) {
          this.unsubOthers = this.globalPresenceRoom.subscribe('others', (others) => {
            this.$store.state.globalPresenceOther = others;
          });

          this.unsubErrors = this.globalPresenceRoom.subscribe('error', (error) => {
            if (error.code === 4005) {
              this.$store.state.globalPresenceOther = undefined;
              this.leaveLiveBlocks();
            }
          });
        }
      });
    },

    leaveLiveBlocks() {
      this.unsubOthers();
      this.unsubErrors();
      this.liveBlocksClient?.leave(this.bohrGlobalRoomId);
    },
  },
});
</script>