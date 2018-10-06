<template>
   <h2>hello</h2>
</template>

<script>
import axios from 'axios'
export default {
  created(){
     this.token = localStorage.getItem('token')
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token

     axios.post('http://localhost:8020/api/logout')
     .then(response => {
       console.log(response)
       this.$store.commit('destroyToken')
       this.$router.push('/')
     })
  },
  data(){
    return {
      token: ''
    }
  }
}
</script>

