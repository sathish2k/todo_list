import Head from 'next/head'
import TodoList from '../components/todo'

export default function Home() {
  return (
    <div >
      <Head>
        <title>Todo List App</title>
        <meta name="description" content="Todo list app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TodoList />
    </div>
  )
}
