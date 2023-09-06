<template>
    <div ref="previewLiveRoom" class="preview__live__room">
      <template v-for="other in othersToDisplay" :key="other.connectionId">
        <PreviewCursor
          v-if="other.presence.cursor && other.presence.cursor.view === viewOnDisplay"
          :x="other.presence.cursor.x"
          :y="other.presence.cursor.y"
          :username="other.presence.username"
          :colorSeed="other.connectionId"
        />
      </template>
      <slot></slot>
    </div>
</template>

<script lang="ts">
import PreviewCursor from '@/components/PreviewCursor.vue';
import { BaseUserMeta, LsonObject, Room } from '@liveblocks/client';
import { defineComponent } from 'vue';

type PreviewPresence = {
  username: string
  avatarUrl: string
  cursor: null | {
    x: number,
    y: number,
    view: 'deployPreview' | 'webEditor'
  }
}
type PreviewRoom = Room<PreviewPresence, LsonObject, BaseUserMeta, never>

export default defineComponent({
  components: {
    PreviewCursor,
  },
  data() {
    return {
      roomId: `${this.$route.params.org}/${this.$route.params.project}`,
      room: null as null | PreviewRoom,
      unsubArr: [] as (() => void)[],
    };
  },
  computed: {
    isPreviewOpen() { return this.$store.state.preview },

    viewOnDisplay() {
      return this.$store.state.isOverviewDeployPreview ? 'deployPreview' : 'webEditor';
    },

    othersToDisplay() {
      return this.$store.getters['site/othersOnPreview'];
    },
  },
  watch: {
    isPreviewOpen() {
      if (this.isPreviewOpen) {
        const room = this.$liveBlocks.enter(this.roomId, {
          initialPresence: {
            username: this.$store.state.me?.username as string,
            avatarUrl: this.$store.state.me?.avatarUrl as string,
            cursor: null,
          },
        });
        const othersUnsub = room.subscribe('others', this.updateOthers);
        this.unsubArr.push(othersUnsub);
        this.room = room;
        this.addMouseEvents();
        window.addEventListener('cursorPositionEvent', this.cursorPositionEventListener as any)
      } else {
        this.unsubArr.forEach((unsub) => unsub());
        this.$liveBlocks.leave(this.roomId);
        this.updateOthers([]);
        this.removeMouseEvents();
        window.removeEventListener('cursorPositionEvent', this.cursorPositionEventListener as any)
      }
    },
  },
  methods: {
    updateOthers(others: any) {
      this.$store.commit('site/setOthersOnPreview', others);
    },

    handlePointerLeave() {
      this.room?.updatePresence({ cursor: null });
    },

    addMouseEvents() {
      (this.$refs.previewLiveRoom as HTMLDivElement).addEventListener('pointerleave', this.handlePointerLeave);
    },

    removeMouseEvents() {
      (this.$refs.previewLiveRoom as HTMLDivElement).removeEventListener('pointerleave', this.handlePointerLeave);
    },

    cursorPositionEventListener({ detail }: CustomEvent<PreviewPresence['cursor']>) {
      this.room?.updatePresence({
        cursor: detail,
      })
    }
  },
});
</script>

<style scoped>
.preview__live__room {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
