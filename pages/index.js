import Head from 'next/head'
import styles from '../styles/Home.module.css'
import TodoList from '../components/todo'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Todo List App</title>
        <meta name="description" content="Todo list app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TodoList />
    </div>
  )
}
