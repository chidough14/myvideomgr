export default {
  state: {
    token: localStorage.getItem('token') || null
  },
  getters: {
    loggedIn(state){
       return state.token !== null
    }
  },
  mutations: {
    retreiveToken(state, payload){
      localStorage.setItem('token', payload)
     state.token = payload
    },
    destroyToken(state){
      localStorage.removeItem('token')
     state.token = null
    }
  }
}
