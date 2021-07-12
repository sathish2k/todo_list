import Head from 'next/head'
import TodoList from '../components/todo';
import {authInitialProps} from '../services/auth'

let Home = ()=> {
  
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
export default Home

Home.getInitialProps = authInitialProps()


