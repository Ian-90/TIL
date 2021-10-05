import { NextPage } from 'next'
import TodoList from '../components/TodoList'
import { getTodosAPI } from '../lib/api'
import { wrapper } from '../store'
import { todoActions } from '../store/todo'

const App: NextPage = () => {
  return (
    <div>
      <TodoList />
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  store => async () => {
    try {
      const { data } = await getTodosAPI()
      store.dispatch(todoActions.setTodo(data))
      return { props: { todos: data } }
    } catch (e) {
      console.log(e)
      return { props: { todos: []} }
    }
})

export default App
