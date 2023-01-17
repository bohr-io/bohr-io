<template>
  <div class="linebox" @click="onClickItem()">
      <!-- <FolderIcon class="linebox__icon--folder"/> -->
      <FileIcon class="linebox__icon--file"/>
      <p class="linebox__text">{{ info.name ? info.name : 'File name'}}</p>
      <span class="linebox__subtext">{{info.data ? info.data : '14 files'}}</span>
  </div>
</template>
<script>
// import FolderIcon from '@/components/icons/fileSystem/FolderIcon.vue'
import FileIcon from '@/components/icons/fileSystem/FileIcon.vue'
export default {
  components: {
    // FolderIcon,
    FileIcon
  },
  props: {
    info: {
      type: Object,
      default: null
    }
  },

  methods:{
    onClickItem(){
      this.$emit("setItem", {
        title: "ClickedElement"
      })
    }
  }
}
</script>
<style scoped>
.linebox{
  display: flex;
  align-items: center;
  margin: 4px 0;
  padding: 8px 16px;
  background: hsla(0, 0%, 0%, 0.25);
  box-sizing: border-box;
  cursor: pointer;
  height: 48px;
}

.linebox:hover .linebox__text{
  text-decoration: underline;
}

.linebox__icon--folder{
  width: 32px;
  margin-right: 12px;
}

.linebox__icon--file{
  width: 24px;
  margin-right: 12px;
}

.linebox__text{
  font-weight: 700;
}

.linebox__subtext{
  font-size: 10px;
  color: hsla(0, 0%, 60%, 1);
  margin-left: auto;
}
</style>