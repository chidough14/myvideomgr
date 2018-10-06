import Home from './components/Home.vue'
import About from './components/About.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Logout from './components/Logout.vue'
import SingleVideo from './components/SingleVideo.vue'
import Playlist from './components/Playlist.vue'

const  routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresVisitor: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresVisitor: true }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/playlist',
    name: 'Playlist',
    component: Playlist,
    meta: { requiresAuth: true }
  },
  {
    path: '/singlevideo/:id',
    name: 'SingleVideo',
    component: SingleVideo,
    meta: { requiresAuth: true }
  }
]



export default routes
