<template>
  <div id="app">
    <header class="header">
      <h3>Todos</h3>
      <input autofocus autocomplete="off" placeholder="Добавьте новый элемент" @keyup.enter="addTodo">    
    </header>
    <main>
      <ul>
        <TodoItem v-for="(todo, index) in filteredTodos" :key="index" :todo="todo"/> 
      </ul>
      <button @click="done = !done">{{ done ? 'Посмотреть новые' : 'Посмотреть исполненные' }}</button>  
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TodoItem from '@/components/TodoItem.vue'
import { ITodo, ITodoGetter, IAddTodoAction } from './types'

@Component({
  components: {TodoItem} 
})
export default class App extends Vue {
  done: boolean = false

  get filteredTodos() {
    return this.$store.getters.filteredTodos(this.done)
  }
  addTodo (e:any) {
    const text = e.target.value
    if (text.trim()) {
      this.$store.dispatch('addTodo', text)
    }
    e.target.value = ''
  }
}
</script>

<style>
ul {
  margin: 30px 0;
  padding: 0;
}
</style>
