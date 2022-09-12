import { createStore } from 'vuex'
import { postModule } from './PostMdule'

export default createStore({
  modules: {
    post: postModule,
  },
})
