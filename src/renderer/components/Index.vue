<template>
  <div>
      <p>Version:</p>
      <p>{{version}}</p>

      <button @click="update">UPDATE</button>
  </div>
</template>

<script>
export default {
  data(){
      return{
          version: '0.0.2'
      }
  },
  methods:{
      update(){
          console.log('update')
      }
  }
}
</script>

