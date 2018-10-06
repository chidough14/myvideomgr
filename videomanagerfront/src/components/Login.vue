<template>
<v-container>
  <v-flex xs6>
    <h2>Login</h2>
    <form>
        <v-text-field
          v-validate="'required|email'"
          v-model="login.email"
          :error-messages="errors.collect('email')"
          label="E-mail"
          data-vv-name="email"
          required
        ></v-text-field>

        <v-text-field
          v-validate="'required'"
          v-model="login.password"
          :error-messages="errors.collect('password')"
          label="Password"
          data-vv-name="password"
          type="password"
          required
        ></v-text-field>

        <v-btn @click="logitIn">submit</v-btn>
      </form>
  </v-flex>

</v-container>

</template>
<script>
  import Vue from 'vue'
  import VeeValidate from 'vee-validate'
  import axios from 'axios'

  Vue.use(VeeValidate)

  export default {
    $_veeValidate: {
      validator: 'new'
    },

    data(){
      return {
        login: {
           email: '',
           password: ''
        },
         checkbox: null,
          dictionary: {
            attributes: {
              email: 'E-mail Address'
              // custom attributes
            },
            custom: {
              name: {
                required: () => 'Name can not be empty',
                max: 'The name field may not be greater than 10 characters'
                // custom messages
              },
              select: {
                required: 'Select field is required'
              }
            }
          }
      }
    },

    mounted () {
      this.$validator.localize('en', this.dictionary)
    },

    methods: {

     logitIn(){
       this.$validator.validateAll()
       axios.post('http://localhost:8020/api/login', {
         email: this.login.email,
         password: this.login.password
       })
       .then(response => {
         console.log(response)
         const token = response.data.access_token
         this.$store.commit('retreiveToken', token)
         this.$router.push('/')
       })
     }
    }
  }
</script>

