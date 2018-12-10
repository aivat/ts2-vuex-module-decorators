import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { ITodoState, IRootState, ITodo } from '../../types'

const STORAGE_KEY = 'todos'

@Module
export default class Todo extends VuexModule {
   // todos: ITodoState = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos: any[] = []

    get filteredTodos() {
        return (completed: boolean) => {
            return Todo.state.todos.filter((todo:ITodo) => {return todo.done === completed})
        }
    }

    @Action({ rawError:true }) 
    async addTodo(text: string) {
        this.context.commit('ADD_TODO', {
            text,
            done: false
        })
    }

    @Action({ rawError:true }) 
    async removeTodo(todo: ITodo) {
        this.context.commit('ADD_TODO', todo)
    }

    @Action({ rawError:true }) 
    async toggleTodo(todo: ITodo) {
        this.context.commit('EDIT_TODO', {
            todo,
            done: !todo.done
        })
    }

    @Mutation
    ADD_TODO(todo: ITodo) {
        this.todos.push(todo)
    }

    @Mutation
    REMOVE_TODO(todo: ITodo) {
        this.todos.splice(this.todos.indexOf(todo), 1)
    }

    @Mutation
    EDIT_TODO({ todo, text = todo.text, done = todo.done } : { todo: ITodo, text: string, done: boolean }) {
        todo.text = text
        todo.done = done
    }
}
