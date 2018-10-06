<template>
    <v-container>
      <v-flex xs6>
          <v-textarea
          name="input-7-1"
          box
          label="Add Comment"
          auto-grow
          v-model="comment"
        ></v-textarea>

        <v-btn  color="blue" @click="savecomment">Submit</v-btn>
      </v-flex>


      <v-flex xs6  v-for="co in usercomments" :key="co.id">
         <v-card color="cyan darken-2" >

              <v-card-title primary-title>
                <div>
                  <div>{{ co.body }} </div>
                </div>
              </v-card-title><hr>
              <v-badge left>
                <b>Posted by :</b><span>{{ co.user.name }}</span>
                <b>At: </b><span>{{ co.created_at   | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}</span>
              </v-badge>
          </v-card>
          <br>
      </v-flex>
    </v-container>
</template>

<script>
import axios from 'axios'
import Pusher from 'pusher-js'
export default {
  created(){
       this.subscribe()
       this.getcomments(this.videoid)
  },
  data(){
    return {
      comment: '',
      usercomments: []
    }
  },
    props: ['videoid', 'username'],
    methods: {
      subscribe(){
          let pusher = new Pusher('dff874c0a56ee1bb0cd2', { cluster: 'eu' })
          pusher.subscribe('comment')
          pusher.bind('comment_added', data => {
              //console.log(data)
              if(data.comment.body.video_id !== this.videoid){
                } else {
                this.usercomments.unshift(data.comment.body)
              }
          })
      },
      savecomment(){
         let comm = {
              body: this.comment,
               video_id: this.videoid,
                user: { name: this.username},
                created_at: new Date()
            }

         axios.post('/api/comment', {
           body: comm
         })
         .then(response => {
           axios.post('http://localhost:8020/api/user/comments', {
             body: this.comment,
             video_id: this.videoid
           })
           .then(response => {
             console.log(response)
             this.comment = ''
           })
         })

      },
      getcomments(videoid){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
        axios.get('http://localhost:8020/api/user/comments/'+ videoid)
        .then(response => {
          this.usercomments = response.data
          console.log(response)
        })
      }
    }
}
</script>

