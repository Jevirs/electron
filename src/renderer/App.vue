<template>
  <div id="app">
    <p>Info:</p>
    <p>{{info}}</p>

    
    <p>updateInfo</p>
    <p v-for="key in updateKeys" :key=key>
      {{key}}
    </p>
    <p v-for="val in updateVals" :key=val>
      {{val}}
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'electron-demo',
    data(){
      return{
        info: 'empty now',
        updateKeys: [],
        updateVals: []
      }
    },
    mounted(){
      this.$electron.ipcRenderer.on('message', (event, text) => {
          if(typeof text === 'object'){
            Object.keys(text).forEach((item, index) => {
              this.updateKeys.push(item);
              this.updateVals.push(text.item);
            })
          }else{
            this.info = text;
          }
      })  
    }
  }
</script>

<style>
  /* CSS */
</style>
