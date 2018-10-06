<template>
  <div>
    <li @click="addtoPlaylist">{{ playlist.name }}</li>
  </div>

</template>

<script>
import axios from 'axios'
export default {
    props: ['playlist', 'title'],
    methods: {
      addtoPlaylist(){
        let postData = {
          playlistId: this.playlist.id,
          videoId: this.$route.params.id,
          video_title: this.title
        }
        axios.post('http://localhost:8020/api/playlist-entry', postData)
        .then(response => {
          console.log(response)
          window.eventBus.$emit('successAdded', 'Video Added')
        })
      }
    }
}
</script>

