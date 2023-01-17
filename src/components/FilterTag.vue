<template>
<span
  :class="[
    isChildren ? 'filter__children' : 'filter__checkbox',
    isChecked && !isChildren ? 'filter__checkbox--active' : '',
    isChildren && isChecked ? 'filter__children--active' : '',
  ]"
  @click="checking()"
>
  <input type="hidden" name="tagId" :value="tag.id">
  {{tag.title}}
</span>
  
</template>
<script>
export default {
  data(){
    return {
      isChecked: false
    }
  },
  props:{
    tag:{
      type: Object,
      default: null
    },
    isChildren:{
      type: Boolean,
      default: false
    }
  },
  methods:{
    checking(){
      this.isChecked = !this.isChecked
    }
  }
}
</script>
<style scoped>
.filter__checkbox{
  display: inline-block;
  padding: 8px 16px;
  border-radius: 10rem;
  font-family: "Helvetica", sans-serif;
  font-size: 12px;
  line-height: 1.5;
  font-weight: 500;
  background-color: #CCCCCC;
  margin: 4px 8px 10px;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  cursor: pointer;
}

.filter__checkbox--active{
  position: relative;
  color: #ffffff !important;
  background-color: #F16622 !important;
}

.filter__checkbox--active::after{
  position: absolute;
  width: 0px;
    content: "";
    border-right:8px solid transparent;
    border-left:8px solid transparent;
    border-top: 12px solid #F16622;
    bottom: -10px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;

}

.filter__children{
  display: inline-block;
  padding: 6px 12px;
  border-radius: 10rem;
  font-family: "Helvetica", sans-serif;
  font-size: 11px;
  line-height: 1.5;
  font-weight: 500;
  background-color: #CCCCCC;
  margin: 6px 8px;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  cursor: pointer;
}

.filter__children--active{
  color: #ffffff !important;
  background-color: #F16622 !important;
}
</style>