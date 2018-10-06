<template>
     <v-toolbar>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>Title</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down" v-if="!loggedIn">
          <router-link to="/login"  tag='v-list-tile'><v-btn flat>Login</v-btn></router-link>
          <router-link to="/register"  tag='v-list-tile'><v-btn flat>Register</v-btn></router-link>

        </v-toolbar-items>

        <v-toolbar-items class="hidden-sm-and-down" v-else>
          <router-link to="/logout"  tag='v-list-tile'><v-btn flat>Logout</v-btn></router-link>
          <router-link :to="{name: 'Playlist'}"  tag='v-list-tile'><v-btn flat>Playlist</v-btn></router-link>
        </v-toolbar-items>
      </v-toolbar>
</template>

<script>
export default {
    computed: {
      loggedIn(){
        return this.$store.getters.loggedIn
      }
    }
}
</script>

