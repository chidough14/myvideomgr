<template>
<v-container>
    <div>
    <v-tabs
      v-model="active"
      color="cyan"
      dark
      slider-color="yellow"
    >
      <v-tab
        v-for="n in playlists"
        :key="n.id"
        ripple
      >
       {{ n.name }}

      </v-tab>
      <v-tab-item
        v-for="pp in playlists"
        :key="pp.id"
      >
        <v-card flat>
          <v-card-text><b>Size:</b> {{ pp.entries.length }}</v-card-text>
          <v-card-text><b>Time:</b> {{ pp.updated_at  | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}</v-card-text>
          <h3>Videos</h3>
          <v-card-text v-for="vid in pp.entries" :key="vid.id"> <router-link :to="{name: 'SingleVideo', params: {id: vid.video_id}}">{{ vid.video_title }}</router-link></v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>

    <div class="text-xs-center mt-3">
      <v-btn @click="next">next tab</v-btn>
    </div>
  </div>
</v-container>

</template>


<script>
import axios from 'axios'
export default {
   created(){
     this.getplaylist()
   },
   data(){
     return {
       playlists: [],
       active: null
     }
   },
   methods: {

     getplaylist(){
       axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
       axios.get('http://localhost:8020/api/user/playlist')
       .then(response => {
         console.log(response)
         this.playlists = response.data
       })
     },
      next () {
     const pl = this.playlists.length

        const active = parseInt(this.active)
        this.active = (active <pl ? active + 1 : 0)
      }
   }
}
</script>
