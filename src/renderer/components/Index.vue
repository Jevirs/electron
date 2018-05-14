<template>
  <div>
      <p>this is a router-view</p>
      <p>version: 0.0.3</p>
  </div>
</template>

<script>
export default {
  data(){
      return{
      }
  },
  mounted(){
    let ipcRenderer = this.$electron.ipcRenderer;

    ipcRenderer.on('asynchronous-reply', (event, arg) => {
      console.log(arg) // prints "pong"
    })
    ipcRenderer.send('asynchronous-message', 'ping')
    
    console.log(ipcRenderer.sendSync('synchronous-message', 'sync-ping')) // prints "pong"
    
  }
}
</script>

