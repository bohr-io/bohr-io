<template>
  <div class="box__file box__file--background" @click="onClickItem()">
    <div class="gradient__anchor">
      <img class="box__file--image" src="https://i.imgur.com/ofsYttz.jpg" alt="">
      <div class="gradient__mask gradient__background"></div>
    </div>
    <div class="box__file--overlay">
      <!-- <div class="box__file--picture">
        <FolderIcon class="box__file--icon"/>
        <FileIcon class="box__file--icon"/>
      </div> -->
      <div class="box__file--info">
        <p class="box__file--text"> {{ info.name ? info.name : 'File name'}}</p>
        <span class="box__file--subtext">{{info.data ? info.data : '14 files'}}</span>
      </div>
    </div>
    
    
  </div>
</template>
<script>
// import FolderIcon from '@/components/icons/fileSystem/FolderIcon.vue'
// import FileIcon from '@/components/icons/fileSystem/FileIcon.vue'
export default {
  components: {
    // FolderIcon,
    // FileIcon
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
.box__file{
  position: relative;
  min-width: 150px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 2px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1e-5) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  box-sizing: border-box;
  border: 2px solid ;
  border-color: rgba(255, 255, 255, 0.1);
  border-image-slice: 1;
  cursor: pointer;
}

.box__file--background{
  border: solid 2px transparent !important;
  background-image: linear-gradient(#000000, #000000),
    linear-gradient(#000000, #000000);
  background-origin: border-box;
  background-clip: content-box, border-box;
}

.box__file--background:hover{
  position: relative;
  background-image: linear-gradient(#000000, #000000),
    linear-gradient(to bottom, #f4cd3b, #f16622, #e84856) !important;
}

.box__file:hover{
  border: 2px solid;
  border-radius: 4px;
  border-image-slice: 1;
  border-image-source: linear-gradient(180deg, #F4CD3B 0.04%, #F16622 53.99%, #E84856 99.94%);
}

.box__file--overlay{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.box__file--picture{
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.box__file--icon{
  padding-top: 24px;
  margin: 16px auto;
}

.box__file--info{
  margin-top: auto;
  text-align: center;
}

.box__file--text{
  margin-bottom: 0;
}

.box__file--subtext{
  font-size: 10px;
  color: hsla(0, 0%, 60%, 1);
}

.box__file--image{
  max-width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

.gradient__anchor{
  position: relative;
  overflow: hidden;
  cursor: default;
}

.gradient__mask{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-attachment: fixed;
}

.gradient__background {
  border-radius: 4px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 35%,
    rgba(0, 0, 0, 1) 80%
  );
  
}
</style>