import Vue from 'vue'
import Vuex from 'vuex'
import todo from './modules/todo'
import { ITodoState, IRootState, ITodo } from '../types'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store<IRootState>({
  modules: {
    todo: todo
  }
});