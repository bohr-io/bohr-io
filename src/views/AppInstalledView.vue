<template>
  <div>
    <h1 class="page__title">{{$t('common.appInstalled')}}</h1>
  </div>
</template>
<script>

export default {
  mounted(){
    const broadcast = new BroadcastChannel("broadcast");
    broadcast.postMessage("appInstalled");
    
    broadcast.onmessage = (msg) => {
      if(msg.data === 'Done'){
        window.close();
      }

      return broadcast.close()
    }

    setTimeout(()=>{
      this.$router.push('home')
    }, 5000);
  }
}
</script>
<style scoped>
.page__title{
  color: #f4cc3a;
  font-weight: 700;
  font-size: 48px;
}
</style>
