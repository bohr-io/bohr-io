<template>
  <PlaceholderPage v-if="underConstruction"/>
  <section v-else class="">
    <div class="toolbar">
      <select class="test__select">
        <option value="">main</option>
      </select>
      <div class="">
        <select class="select__order" name="" id="">
          <option value="a-z" selected>A-Z</option>   
        </select>
      </div>
      <div class="switcher__view">
        <button class="switcher__view--btn" @click.prevent="changeView">
          <AppListViewIcon :active="listView ? true : false"/>
        </button>
        <button class="switcher__view--btn" @click.prevent="changeView">
          <LineListViewIcon :active="!listView ? true : false"/>
        </button>
      </div>
      <div class="form__input-group">
        <img src="../../../public/assets/svg/search.svg" alt="">
        <input type="text" v-model="search">
      </div>
      <button class="btn__add" color="primary" @click.prevent="add()">
        <PlusRegularIcon />
        Add
      </button>
    </div>
    <div v-if="listView" class="grid__files" >
      <FileExibition :info="info" @set-item="getEvent"/>
      <FileExibition :info="info" @set-item="getEvent"/>
      <FileExibition :info="info" @set-item="getEvent"/>
      <FileExibition :info="info" @set-item="getEvent"/>
      <FileExibition :info="info" @set-item="getEvent"/>
    </div>
    <div v-else>
      <FileExibitionLine :info="info" @set-item="getEvent"/>
      <FileExibitionLine :info="info" @set-item="getEvent"/>
      <FileExibitionLine :info="info" @set-item="getEvent"/>
      <FileExibitionLine :info="info" @set-item="getEvent"/>
      <FileExibitionLine :info="info" @set-item="getEvent"/>
    </div>
  </section>
  
</template>

<script>
import AppListViewIcon from '@/components/icons/AppListViewIcon.vue';
import LineListViewIcon from '@/components/icons/LineListViewIcon.vue';
import PlusRegularIcon from '@/components/icons/PlusRegularIcon.vue';

import FileExibition from '@/components/FileExibition.vue';
import FileExibitionLine from '@/components/FileExibitionLine.vue';
import PlaceholderPage from '@/components/PlaceholderPage.vue';

export default {
  components: {
    AppListViewIcon,
    LineListViewIcon,
    PlusRegularIcon,
    FileExibition,
    FileExibitionLine,
    PlaceholderPage
  },

  data(){
    return {
      listView: true,
      underConstruction: false,
      info:{
        name: '',
        data: ''
      },
      search: ""
    }
  },

  mounted(){
    if(window.location.host === "bohr.io"){
      this.underConstruction = true
    }
  },

  methods:{
    changeView(){
      this.listView = !this.listView;
    },
    add(){
      console.log("Add")
    },
    getEvent(value){
      console.log(value)
    }
  }
}
</script>
<style scoped>
.toolbar{
  display: flex; 
  gap: 8px; 
  margin-bottom: 8px;
}

.form__input-group{
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1e-5) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  margin-bottom: 8px;
  box-sizing: border-box;
}

.form__input-group > input{
  position: relative;
  flex: 1 1 auto;
  width: 1%;
  min-width: 0;
  background: transparent;
  border: none;
  padding: 8px 4px 8px 4px;
  color: var(--root-color);
}

.form__input-group > img{
  margin: 0 12px;
}
.form__input-group > input:focus{
  outline: none;
}

.btn__add{
  display: inline-flex;
  align-items: center;
  border-radius: 2px;
  padding: 0 12px;
  height: 40px;
  color: hsla(360, 100%, 100%, 1);
  background: linear-gradient(hsla(21, 89%, 52%, 1), hsla(355, 78%, 60%, 1));
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  /* box-sizing: border-box; */
}

.btn__add svg{
  margin: 0 4px;
}

.select__order{
  color: hsla(360, 100%, 100%, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1e-5) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  padding: 0 8px;
  height: 40px;
  border-radius: 4px;
}

.switcher__view{
  position: relative;
  display: flex;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1e-5) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  height: 40px;
  box-sizing: border-box;
  border-radius: 4px;
}

.switcher__view--btn{
  display: inline-flex;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  box-sizing: border-box;
}

.grid__files{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 0 16px;
}

.test__select{
  background:  linear-gradient(180deg, #F4CC3A 0%, #F6AE2D 100%) !important;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 13px;
  box-sizing: border-box;
  color: hsla(0, 0%, 0%, 1);
  min-width: 200px;
}
</style>