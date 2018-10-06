<template>
<v-container>
  <notifications group="foo" :classes="notificationClass"/>
  <v-flex xs6>
    <h2>Register</h2>
       <form>
          <v-text-field
            v-validate="'required'"
            v-model="register.name"
            :error-messages="errors.collect('name')"
            label="Name"
            data-vv-name="name"
            required
          ></v-text-field>

          <v-text-field
            v-validate="'required|email'"
            v-model="register.email"
            :error-messages="errors.collect('email')"
            label="E-mail"
            data-vv-name="email"
            required
          ></v-text-field>

          <v-text-field
            v-validate="'required'"
            v-model="register.password"
            :error-messages="errors.collect('password')"
            label="Password"
            data-vv-name="password"
            type="password"
            required
          ></v-text-field>


          <v-btn @click="registerIt">submit</v-btn>
        </form>
  </v-flex>
</v-container>

</template>
<script>
 import Vue from 'vue'
  import VeeValidate from 'vee-validate'
  import axios from 'axios'
import { setTimeout } from 'timers';

  Vue.use(VeeValidate)

export default {
   $_veeValidate: {
      validator: 'new'
    },
    created(){
         this.$validator.localize('en', this.dictionary)
    },
    data(){
      return {
        register: {
          name: '',
          email: '',
          password: ''
        },
        checkbox: null,
        notificationClass: null,
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
    methods: {
      registerIt(){
         this.$validator.validateAll()
         axios.post('http://localhost:8020/api/register', {
           name: this.register.name,
           email: this.register.email,
           password: this.register.password
         })
         .then(response => {
           console.log(response)
           this.notificationClass = 'vue-notification success'
           this.$notify({
             group: 'foo',
             title: 'Success',
             text: 'Registered, you can now log in'
           })

           let self = this
           setTimeout(function(){
             self.$router.push({path: '/login'})
           }, 3000)
         })
      }
    }
}
</script>


