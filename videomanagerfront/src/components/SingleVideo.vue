<template>
     <v-container>
        <h2>{{ video.snippet.title}}</h2>
        <br>
        <small>Channel: {{ video.snippet.channelTitle}}</small>
        <p>{{ video.snippet.publishedAt | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}</p>


        <div class="embed-responsive embed-responsive-16by9">
            <iframe :src="url" class="embed-responsive-item"></iframe>
        </div>

        <add-playlist :title="video"></add-playlist>

        <add-comment :username="username" :videoid="video_id"></add-comment>
     </v-container>
</template>

<script>
import axios from 'axios'
import AddPlaylist from './AddPlaylist.vue'
import AddComment from './AddComment.vue'
export default {
  components: {
    AddPlaylist, AddComment
  },
   mounted(){
     this.video_id = this.$route.params.id
     this.url = `https://www.youtube.com/embed/${this.video_id}`
     this.getVideo()
     this.getusername()
   },
   data(){
     return {
       video_id: '',
       video: '',
       url: '',
       username: ''
     }
   },
   methods: {
     getVideo(){
      /*  let BASE_URL = 'https://www.googleapis.com/youtube/v3/videos'

       let params = {
          part: 'snippet',
          key: 'AIzaSyAwMjgzgEWQH1VO9fIgZ1d76I4y1q91wNU',
          id: this.video_id,
          type: 'video'
       }

       axios.get(BASE_URL, {params})
       .then(response => {
         //console.log(response)
         this.video = response.data.items[0]
       }) */

       fetch('https://www.googleapis.com/youtube/v3/videos?part=snippet&key=AIzaSyAwMjgzgEWQH1VO9fIgZ1d76I4y1q91wNU&id='+this.video_id+'&type=video')
       .then(response => {
         return response.json()
       })
       .then(res => {
         this.video = res.items[0]
       })
     },
     getusername(){
       axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
       axios.get('http://localhost:8020/api/getuser')
       .then(response => {
         //console.log(response)
         this.username = response.data
       })
     }
   }
}
</script>

