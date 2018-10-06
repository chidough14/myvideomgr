<template>
  <v-layout row justify-center>
    <notifications group="foo" :classes="notificationClass"/>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-btn slot="activator" color="primary" dark>Add Playlist</v-btn>
      <v-card>


         <div>
           <ul>
             <playlist-item v-for="(playlist, index) in playlists" :key="index" :playlist="playlist" :title="title.snippet.title"></playlist-item>
           </ul>
         </div>

        <v-form>
          <v-text-field
          v-model="name"
            label="Add Playlist"
            required
          ></v-text-field>

          <v-checkbox
          v-model="is_private"
            label="Private"
            required
          ></v-checkbox>
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="green darken-1" flat @click.native="addPlaylist">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import axios from 'axios'
import PlaylistItem from './PlayListItem.vue'
  export default {
    components: {
    PlaylistItem
    },
    props: ['title'],
    created(){
      this.getPlaylists()
      window.eventBus.$on('successAdded', data => {
        this.notificationClass = 'vue-notification success'
           this.$notify({
             group: 'foo',
             title: 'Success',
             text: data
           })
      })
    },
    data () {
      return {
        dialog: false,
        playlists: [],
        name: '',
        is_private: false,
        notificationClass: null
      }
    },
    methods: {
      getPlaylists(){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
        axios.get('http://localhost:8020/api/user/playlist')
        .then(response => {
          //console.log(response)
          this.playlists = response.data
        })
      },
      addPlaylist(){
         axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
         axios.post('http://localhost:8020/api/playlist', {
            name: this.name,
            is_private: this.is_private
         })
         .then(response => {
           console.log(response)
           this.playlists.unshift(response.data)
           this.name = ''
           this.is_private = false
         })
      }
    }
  }
</script>

