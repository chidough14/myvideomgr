<template>

        <v-container grid-list-md>
          <v-layout row wrap>

            <v-flex xs12 sm6>
              <v-text-field
                v-model="searchstring"
                solo
                label="Search"
                clearable
                @keyup.enter="searchYoutube"
              ></v-text-field>
            </v-flex>

            <v-layout row wrap>
                <v-flex xs3 v-for="(video, index) in videos" :key="index">
                  <v-card>
                    <v-img
                      aspect-ratio="2.75"
                      :src="video.snippet.thumbnails.medium.url"
                    ></v-img>

                    <v-card-title primary-title>
                      <div>
                        <h3 class="headline mb-0">{{ video.snippet.title}}</h3>
                        <div>{{ video.snippet.description}}</div>
                      </div>
                    </v-card-title>

                    <v-card-actions>
                      <router-link :to="{name: 'SingleVideo', params: {id: video.id.videoId}}"><v-btn flat color="orange">Show video</v-btn></router-link>
                    </v-card-actions>
                  </v-card>
                </v-flex>
            </v-layout>


          </v-layout>
        </v-container>

</template>


<script>
import axios from 'axios'
export default {
   created(){
     this.searchstring = (localStorage.getItem('search')) ? localStorage.getItem('search') : 'vue'
     this.searchYoutube()
   },
   data(){
     return {
       searchstring: '',
       //searchstring2: '',
       videos: []
     }
   },
   methods: {
     searchYoutube(){
       let BASE_URL = 'https://www.googleapis.com/youtube/v3/search'

        let params = {
        part: 'snippet',
        key: 'AIzaSyAwMjgzgEWQH1VO9fIgZ1d76I4y1q91wNU',
        q: this.searchstring,
        maxResults: 10,
        type: 'video'
       }

       axios.get(BASE_URL, { params })
       .then(response => {
         console.log(response)
         this.videos = response.data.items
         localStorage.setItem('search', this.searchstring)
       })
     }
   }
}
</script>
